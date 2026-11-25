import { NextResponse } from 'next/server';

import { firma } from '@/content/firma';
import { tematy, LIMITY } from '@/lib/wiadomosci';
import { zapiszWKlaviyo } from '@/lib/klaviyo';
import { mailFormularza } from '@/lib/mail-formularza';
import { czyJezyk } from '@/i18n/jezyki';

/**
 * Powiadomienie o nowej wiadomości z formularza kontaktowego.
 *
 * Wysyłka przez Resend, tak jak w movgranto-homepage. Wywoływane po zapisie
 * do Firestore i traktowane jako „najlepsze staranie": błąd tutaj nie może
 * wywrócić formularza, bo zgłoszenie już jest w bazie.
 *
 * Wymagane zmienne: `RESEND_API_KEY`, `POWIADOM_NA`, `POWIADOM_OD`.
 * Bez klucza zwracamy 200 z adnotacją – brak konfiguracji to stan
 * przejściowy, nie awaria.
 *
 * ## Kiedy adres trafia na listę
 *
 * **Tylko przy `zgoda === true`.** Tutaj zgoda jest nieobowiązkowa, bo usługą
 * jest odpowiedź na pytanie – a osoba, która o nią nie prosiła, nie może
 * wylądować w newsletterze. To jest ten warunek, o którym najłatwiej
 * zapomnieć przy późniejszym eksporcie, więc filtr siedzi tu, w kodzie,
 * a nie w cudzej głowie przy ręcznym imporcie.
 */

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const klucz = process.env.RESEND_API_KEY;
  const doKogo = process.env.POWIADOM_NA || firma.email;
  const odKogo = process.env.POWIADOM_OD || 'BusiKM <formularz@busikm.pl>';

  let dane: Record<string, unknown>;
  try {
    dane = await request.json();
  } catch {
    return NextResponse.json({ ok: false, blad: 'niepoprawne dane' }, { status: 400 });
  }

  const imie = String(dane.imie ?? '').slice(0, LIMITY.imie);
  const email = String(dane.email ?? '').slice(0, LIMITY.email);
  const tresc = String(dane.tresc ?? '').slice(0, LIMITY.tresc);
  const temat = String(dane.temat ?? '');
  const zgoda = dane.zgoda === true;
  // Język formularza – tylko z listy; brak albo nieznany to polski.
  const jezyk = czyJezyk(dane.jezyk) ? dane.jezyk : 'pl';

  // Ta sama walidacja co w regułach Firestore – trasa jest publiczna,
  // więc nie zakładamy, że wywołał ją nasz własny formularz.
  const poprawny =
    imie.length > 0 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) &&
    tresc.length > 0 &&
    (tematy as readonly string[]).includes(temat);

  if (!poprawny) {
    return NextResponse.json({ ok: false, blad: 'brak lub złe pola' }, { status: 400 });
  }

  // Bez zgody adres nie ma czego szukać na liście – zostaje w bazie
  // wyłącznie po to, żeby dało się odpowiedzieć na pytanie.
  const klaviyo = zgoda
    ? await zapiszWKlaviyo({ imie, email, zrodlo: 'formularz', jezyk })
    : ({ ok: false, pominiete: 'bez zgody marketingowej' } as const);

  // Sprawdzenie klucza Resend dopiero tutaj, po Klaviyo. Odwrotna kolejność
  // sprawiłaby, że brak konfiguracji poczty cicho blokowałby zapis kontaktu
  // na listę – a to lista jest tu rzeczą trwałą, powiadomienie tylko wygodą.
  if (!klucz) {
    return NextResponse.json({ ok: false, pominiete: 'brak RESEND_API_KEY', klaviyo }, { status: 200 });
  }

  const mail = mailFormularza({ imie, email, tresc, temat, jezyk, zgoda, klaviyo });

  try {
    const odp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${klucz}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: odKogo,
        to: [doKogo],
        // Dzięki temu „Odpowiedz" w kliencie pocztowym trafia wprost do
        // osoby, która napisała, a nie do adresu nadawcy technicznego.
        reply_to: email,
        subject: mail.temat,
        html: mail.html,
        // Wersja tekstowa obok HTML-a: część programów pocztowych i filtrów
        // spamu gorzej ocenia mail bez niej.
        text: mail.tekst,
      }),
    });

    if (!odp.ok) {
      return NextResponse.json({ ok: false, blad: await odp.text(), klaviyo }, { status: 502 });
    }
    return NextResponse.json({ ok: true, klaviyo });
  } catch (e) {
    return NextResponse.json({ ok: false, blad: String(e) }, { status: 500 });
  }
}
