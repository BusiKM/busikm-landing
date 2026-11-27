import { NextResponse } from 'next/server';

/**
 * Ostatni kurs średni EUR z tabeli A NBP dla kalkulatora (`/kalkulator`).
 *
 * Przez własną trasę, a nie wprost z przeglądarki: kurs zmienia się raz na
 * dzień roboczy, więc trzymamy go w pamięci podręcznej po naszej stronie
 * (3 godziny) i nie wysyłamy każdego odwiedzającego do api.nbp.pl.
 *
 * Trasa jest dynamiczna, a pamięć podręczną ma samo zapytanie do NBP.
 * Dzięki temu błędu NBP nie zapamiętujemy na trzy godziny: przy następnym
 * wejściu pytamy znowu. Strona przy błędzie zostawia puste pole do wpisania.
 */
export const dynamic = 'force-dynamic';

const NBP = 'https://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json';
const TRZY_GODZINY = 3 * 60 * 60;

type OdpowiedzNbp = { rates?: { no?: unknown; effectiveDate?: unknown; mid?: unknown }[] };

export async function GET() {
  try {
    const odp = await fetch(NBP, {
      headers: { Accept: 'application/json' },
      next: { revalidate: TRZY_GODZINY },
      signal: AbortSignal.timeout(5000),
    });
    if (!odp.ok) throw new Error(`NBP ${odp.status}`);
    const dane = (await odp.json()) as OdpowiedzNbp;
    const kurs = dane.rates?.[0];
    if (
      !kurs ||
      typeof kurs.mid !== 'number' ||
      !(kurs.mid > 0) ||
      typeof kurs.effectiveDate !== 'string' ||
      typeof kurs.no !== 'string'
    ) {
      throw new Error('NBP: nieoczekiwany format');
    }
    return NextResponse.json(
      { ok: true, kurs: kurs.mid, data: kurs.effectiveDate, tabela: kurs.no },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=10800' } },
    );
  } catch (e) {
    console.error('[kurs-eur]', e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
