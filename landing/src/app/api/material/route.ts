import { NextResponse } from 'next/server';

import { firma } from '@/content/firma';
import { MATERIALY, czyMaterial } from '@/content/materialy';
import { LIMITY_ZAPISU } from '@/content/zapisy';
import { zapiszNaPrzepisy, type WynikKlaviyo } from '@/lib/klaviyo';
import { bezpiecznie } from '@/lib/mail-formularza';
import { mailMaterialu } from '@/lib/mail-materialu';

/**
 * Mail z linkiem do ściągi PDF i (za zgodą) zapis na listę „Przepisy”.
 *
 * Wołane z okienka przed pobraniem na `/itd` i `/ksef`. Pobranie PDF nie czeka na tę
 * trasę: plik ściąga się od razu po kliknięciu, a mail idzie w tle.
 *
 * Trasa jest publiczna, więc:
 * - materiał tylko z listy `MATERIALY` (temat i link maila są nasze),
 * - brzmienie zgody bierze `zapiszNaPrzepisy` z `content/zgoda`, nie z żądania,
 * - pułapka na boty i prosty limit na adres IP i na adres e-mail, żeby nikt
 *   nie zrobił z nas wysyłarki maili na cudze adresy. Limit żyje w pamięci
 *   instancji, więc jest przybliżony (Vercel ma kilka instancji), ale na
 *   skryptowe zalewanie wystarcza.
 *
 * Bez `RESEND_API_KEY` mail nie idzie i trasa mówi to wprost; strona pokazuje
 * wtedy, że ściąga się pobrała, ale maila nie będzie.
 */

export const runtime = 'nodejs';

const OKNO_MS = 10 * 60 * 1000;
const NA_IP = 5;
const NA_ADRES = 2;
const proby = new Map<string, number[]>();

/** Zwraca `true`, gdy klucz przekroczył limit w oknie. Liczy próbę. */
function ponadLimit(klucz: string, limit: number): boolean {
  const teraz = Date.now();
  const swieze = (proby.get(klucz) ?? []).filter((t) => teraz - t < OKNO_MS);
  swieze.push(teraz);
  proby.set(klucz, swieze);
  // Sprzątanie, żeby mapa nie rosła bez końca na długo żyjącej instancji.
  if (proby.size > 5000) {
    for (const [k, czasy] of proby) {
      if (czasy.every((t) => teraz - t >= OKNO_MS)) proby.delete(k);
    }
  }
  return swieze.length > limit;
}

type Wysylka = 'wyslany' | 'pominiety' | 'blad';

async function wyslij(dane: {
  klucz: string | undefined;
  od: string;
  do: string;
  temat: string;
  html: string;
  tekst?: string;
  odpowiedzNa?: string;
}): Promise<Wysylka> {
  if (!dane.klucz) return 'pominiety';
  try {
    const odp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${dane.klucz}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: dane.od,
        to: [dane.do],
        subject: dane.temat,
        html: dane.html,
        ...(dane.tekst ? { text: dane.tekst } : {}),
        ...(dane.odpowiedzNa ? { reply_to: dane.odpowiedzNa } : {}),
      }),
    });
    return odp.ok ? 'wyslany' : 'blad';
  } catch {
    return 'blad';
  }
}

function opisKlaviyo(k: WynikKlaviyo | null): string {
  if (!k) return 'bez zgody';
  if (k.ok) return 'zapisany na listę Przepisy';
  return `nie zapisany, dopisz ręcznie w Klaviyo (lista Przepisy): ${'pominiete' in k ? k.pominiete : k.blad}`;
}

export async function POST(request: Request) {
  let dane: Record<string, unknown>;
  try {
    dane = await request.json();
  } catch {
    return NextResponse.json({ ok: false, blad: 'niepoprawne dane' }, { status: 400 });
  }

  // Bot wypełnił ukryte pole: udajemy sukces, nic nie robimy.
  if (dane.pulapka) return NextResponse.json({ ok: true, mail: 'pominiety' });

  const email = String(dane.email ?? '').trim().toLowerCase().slice(0, LIMITY_ZAPISU.email);
  const zgoda = dane.zgoda === true;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !czyMaterial(dane.material)) {
    return NextResponse.json({ ok: false, blad: 'brak lub złe pola' }, { status: 400 });
  }
  const material = MATERIALY[dane.material];

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'brak';
  if (ponadLimit(`ip:${ip}`, NA_IP) || ponadLimit(`mail:${email}`, NA_ADRES)) {
    return NextResponse.json({ ok: false, blad: 'za dużo prób' }, { status: 429 });
  }

  // Zapis na listę najpierw: gdyby coś miało się nie udać, ważniejsza jest
  // zgoda w Klaviyo niż wygoda maila (link do PDF człowiek już ma).
  const klaviyo = zgoda ? await zapiszNaPrzepisy({ email, zrodlo: material.klucz }) : null;

  const klucz = process.env.RESEND_API_KEY;
  const od = process.env.POWIADOM_OD || 'BusiKM <formularz@busikm.pl>';
  const tresc = mailMaterialu(material);
  const mail = await wyslij({
    klucz,
    od,
    do: email,
    temat: tresc.temat,
    html: tresc.html,
    tekst: tresc.tekst,
    odpowiedzNa: firma.email,
  });

  // Powiadomienie dla nas tylko o nowym zapisie na listę. Sam mail z PDF
  // bez zgody to nie kontakt do obsłużenia.
  if (zgoda) {
    await wyslij({
      klucz,
      od,
      do: process.env.POWIADOM_NA || firma.email,
      temat: `BusiKM: zapis na listę Przepisy (${material.klucz})`,
      html: `<div style="font-family:system-ui,-apple-system,sans-serif;color:#0A0A0B;line-height:1.6;font-size:14px">
        <p style="margin:0 0 8px">Nowy zapis na maile o zmianach przepisów: <b>${bezpiecznie(email)}</b>, strona busikm.pl${bezpiecznie(material.strona)}.</p>
        <p style="margin:0">Klaviyo: ${bezpiecznie(opisKlaviyo(klaviyo))}</p>
      </div>`,
    });
  }

  return NextResponse.json({ ok: mail === 'wyslany', mail, klaviyo });
}
