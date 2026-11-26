'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check } from 'lucide-react';

import { appLinks } from '@/content/navigation';
import { zdarzenieGa } from '@/lib/ga';
import {
  KURS_Z_ROLKI,
  PRZYKLAD,
  PUSTE,
  dataNbp,
  format,
  policz,
  zl,
  type Pola,
  type TrybPaliwa,
  type Waluta,
} from '@/lib/kalkulator';

/**
 * Kalkulator „Ile zostaje z kursu?”. Wygląd i kolejność pól jak w makiecie
 * z rolki „Krok 4” (busikm-video/.capture-cache/kalkulator), żeby widz
 * z Facebooka rozpoznał ekran.
 *
 * Wszystko liczy się w przeglądarce (`lib/kalkulator.ts`), nic nie trafia na
 * serwer. Jedyne zapytanie to kurs EUR z NBP przez `/api/kurs-eur`.
 *
 * GA4 (tylko po zgodzie na statystykę, `zdarzenieGa` sam to sprawdza):
 * `kalkulator_przyklad` przy kliknięciu przykładu i `kalkulator_wynik` raz na
 * wizytę, przy pierwszym pełnym wyniku (fracht i co najmniej jeden koszt).
 * Bez kwot w parametrach.
 */

type KursNbp =
  | { stan: 'laduje' }
  | { stan: 'blad' }
  | { stan: 'ok'; kurs: number; data: string };

const FLAGA_WYNIKU = 'busikm:kalkulator-wynik';

/** Pole liczby: zostawia cyfry, spacje, przecinek i kropkę. */
const tylkoLiczba = (v: string) => v.replace(/[^\d\s ,.]/g, '');

export function Kalkulator() {
  const [pola, setPola] = useState<Pola>(PUSTE);
  const [nbp, setNbp] = useState<KursNbp>({ stan: 'laduje' });
  const wynikWyslany = useRef(false);

  const wynik = useMemo(() => policz(pola), [pola]);
  const ustaw = <K extends keyof Pola>(klucz: K, wartosc: Pola[K]) =>
    setPola((p) => ({ ...p, [klucz]: wartosc }));

  useEffect(() => {
    let aktualne = true;
    fetch('/api/kurs-eur')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { ok?: boolean; kurs?: number; data?: string }) => {
        if (!aktualne) return;
        if (!d.ok || typeof d.kurs !== 'number' || typeof d.data !== 'string') throw new Error('format');
        const kurs = d.kurs;
        setNbp({ stan: 'ok', kurs, data: d.data });
        // Nie nadpisujemy kursu, który ktoś zdążył wpisać sam.
        setPola((p) => (p.kurs ? p : { ...p, kurs: format(kurs, 4) }));
      })
      .catch(() => {
        if (aktualne) setNbp({ stan: 'blad' });
      });
    return () => {
      aktualne = false;
    };
  }, []);

  useEffect(() => {
    if (!wynik.pelny || wynikWyslany.current) return;
    wynikWyslany.current = true;
    if (typeof window === 'undefined' || !window.gtag) return;
    try {
      if (sessionStorage.getItem(FLAGA_WYNIKU)) return;
      sessionStorage.setItem(FLAGA_WYNIKU, '1');
    } catch {
      // Bez dostępu do sessionStorage liczy się sama flaga w pamięci strony.
    }
    zdarzenieGa('kalkulator_wynik', { waluta: pola.waluta, paliwo: pola.trybPaliwa });
  }, [wynik.pelny, pola.waluta, pola.trybPaliwa]);

  const wstawPrzyklad = () => {
    setPola((p) => ({
      ...PRZYKLAD,
      kurs: p.kurs || (nbp.stan === 'ok' ? format(nbp.kurs, 4) : format(KURS_Z_ROLKI, 4)),
    }));
    zdarzenieGa('kalkulator_przyklad');
  };

  const kursNbpTekst = nbp.stan === 'ok' ? format(nbp.kurs, 4) : null;
  const kursZNbp = kursNbpTekst !== null && pola.kurs === kursNbpTekst;

  return (
    <div className="mx-auto max-w-[1040px] px-5 pt-6 pb-16 lg:px-0 lg:pt-14 lg:pb-24">
      <div className="lg:max-w-[640px]">
        <p className="text-[13px] font-bold tracking-[0.08em] text-blue uppercase">Kalkulator</p>
        <h1 className="mt-2 text-[32px] leading-[1.08] font-extrabold tracking-[-0.03em] lg:text-[48px]">
          Ile zostaje z kursu?
        </h1>
        <p className="mt-2 text-[15px] leading-normal text-muted lg:mt-3 lg:text-[17px]">
          Wpisz fracht i koszty trasy. Liczy się w przeglądarce, bez konta, nic nie zapisujemy.
        </p>
        <button
          type="button"
          onClick={wstawPrzyklad}
          className="mt-4 inline-flex h-10 cursor-pointer items-center rounded-full border border-blue/20 bg-blue-soft px-4 text-[14px] font-semibold text-blue transition-colors hover:bg-blue/15"
        >
          Wstaw przykład: Wiedeń - Kalisz
        </button>
      </div>

      <div className="lg:mt-4 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-8">
        <div>
          <Karta tytul="Przychód">
            <Pole
              id="fracht"
              etykieta="Fracht"
              jednostka={pola.waluta}
              wartosc={pola.fracht}
              zmien={(v) => ustaw('fracht', v)}
              obok={
                <Przelacznik<Waluta>
                  etykieta="Waluta frachtu"
                  wartosc={pola.waluta}
                  zmien={(v) => ustaw('waluta', v)}
                  opcje={[
                    ['EUR', 'EUR'],
                    ['PLN', 'PLN'],
                  ]}
                />
              }
            />
            {pola.waluta === 'EUR' && (
              <Pole
                id="kurs"
                etykieta="Kurs EUR/PLN"
                jednostka="zł"
                wartosc={pola.kurs}
                zmien={(v) => ustaw('kurs', v)}
                podpis={
                  kursZNbp && nbp.stan === 'ok' ? (
                    <span className="inline-flex items-center gap-1.5 font-semibold text-green-ink">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden />
                      Kurs średni NBP, tabela A z {dataNbp(nbp.data)}
                    </span>
                  ) : nbp.stan === 'ok' ? (
                    <span>
                      Kurs wpisany ręcznie.{' '}
                      <button
                        type="button"
                        onClick={() => ustaw('kurs', format(nbp.kurs, 4))}
                        className="cursor-pointer font-semibold text-blue underline-offset-2 hover:underline"
                      >
                        Wróć do kursu NBP z {dataNbp(nbp.data)}
                      </button>
                    </span>
                  ) : nbp.stan === 'blad' ? (
                    <span>Nie udało się pobrać kursu z NBP. Wpisz kurs sam.</span>
                  ) : (
                    <span>Pobieramy kurs z NBP…</span>
                  )
                }
              />
            )}
            <Suma etykieta="Przychód" kwota={wynik.przychod} />
          </Karta>

          <Karta tytul="Koszty trasy">
            {pola.trybPaliwa === 'kwota' ? (
              <Pole
                id="paliwo"
                etykieta="Paliwo"
                jednostka="zł"
                wartosc={pola.paliwo}
                zmien={(v) => ustaw('paliwo', v)}
                obok={<PrzelacznikPaliwa tryb={pola.trybPaliwa} zmien={(v) => ustaw('trybPaliwa', v)} />}
              />
            ) : (
              <div className="flex flex-col gap-3.5">
                <Pole
                  id="km"
                  etykieta="Paliwo: kilometry trasy"
                  jednostka="km"
                  wartosc={pola.km}
                  zmien={(v) => ustaw('km', v)}
                  obok={<PrzelacznikPaliwa tryb={pola.trybPaliwa} zmien={(v) => ustaw('trybPaliwa', v)} />}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Pole
                    id="spalanie"
                    etykieta="Spalanie"
                    jednostka="l/100"
                    wartosc={pola.spalanie}
                    zmien={(v) => ustaw('spalanie', v)}
                  />
                  <Pole
                    id="cena-litra"
                    etykieta="Cena za litr"
                    jednostka="zł"
                    wartosc={pola.cenaLitra}
                    zmien={(v) => ustaw('cenaLitra', v)}
                  />
                </div>
                <p className="-mt-1.5 text-[12.5px] text-muted">
                  Paliwo: <b className="text-ink tabular-nums">{zl(wynik.paliwo)}</b>. Te kilometry idą też do wyniku za
                  kilometr.
                </p>
              </div>
            )}
            <Pole id="oplaty" etykieta="Opłaty drogowe" jednostka="zł" wartosc={pola.oplaty} zmien={(v) => ustaw('oplaty', v)} />
            <Pole id="diety" etykieta="Diety kierowcy" jednostka="zł" wartosc={pola.diety} zmien={(v) => ustaw('diety', v)} />
            <Pole
              id="inne"
              etykieta="Inne koszty (nocleg, parking)"
              jednostka="zł"
              wartosc={pola.inne}
              zmien={(v) => ustaw('inne', v)}
            />
            {pola.trybPaliwa === 'kwota' && (
              <Pole id="km" etykieta="Kilometry (opcjonalnie)" jednostka="km" wartosc={pola.km} zmien={(v) => ustaw('km', v)} />
            )}
            <Suma etykieta="Koszty razem" kwota={wynik.koszty} />
          </Karta>
        </div>

        <div className="lg:sticky lg:top-24 lg:mt-4.5">
          <section aria-label="Wynik" className="mt-4.5 rounded-[18px] bg-blue px-4.5 py-5 text-white lg:mt-0 lg:px-6 lg:py-6">
            <p className="text-[14px] font-semibold text-white/80">Zostaje</p>
            <p className="mt-1 mb-3.5 text-[44px] leading-none font-extrabold tracking-[-0.03em] tabular-nums">
              {zl(wynik.zostaje)}
            </p>
            <dl className="grid grid-cols-[1fr_auto] gap-y-2 text-[15px]">
              <dt className="text-white/80">Przychód</dt>
              <dd className="text-right font-bold tabular-nums">{zl(wynik.przychod)}</dd>
              <dt className="text-white/80">Koszty</dt>
              <dd className="text-right font-bold tabular-nums">{zl(wynik.koszty)}</dd>
              <dt className="text-white/80">Za kilometr</dt>
              <dd className="text-right font-bold tabular-nums">
                {wynik.zaKm === null ? '-' : `${format(wynik.zaKm)} zł/km`}
              </dd>
            </dl>
            <p className="mt-3.5 text-[13.5px] leading-snug text-white/80">
              To jeszcze przed leasingiem, ubezpieczeniem i pensją kierowcy.
            </p>
          </section>
          <p className="mt-2.5 text-[12px] leading-normal text-muted">
            Przykład Wiedeń - Kalisz: ok. 500 km, paliwo 430 zł, opłaty drogowe 140 zł, diety 120 zł, fracht 590 EUR.
          </p>
          <div className="mt-4.5 text-[14.5px] leading-normal">
            W BusiKM to samo liczy się przy każdym kursie, z paragonami kierowcy z trasy.
            <br />
            <a
              href={appLinks.demo}
              className="mt-2.5 inline-flex h-11 items-center rounded-full bg-ink px-4.5 font-semibold text-white transition-colors hover:bg-ink/85 hover:text-white"
            >
              Zobacz demo bez konta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Karta({ tytul, children }: { tytul: string; children: React.ReactNode }) {
  return (
    <section className="mt-4.5 rounded-[18px] border border-line bg-white px-4 py-4.5 lg:px-6 lg:py-6">
      <h2 className="mb-3 text-[17px] font-bold tracking-[-0.01em]">{tytul}</h2>
      <div className="flex flex-col gap-3.5">{children}</div>
    </section>
  );
}

function Pole({
  id,
  etykieta,
  jednostka,
  wartosc,
  zmien,
  obok,
  podpis,
}: {
  id: string;
  etykieta: string;
  jednostka: string;
  wartosc: string;
  zmien: (v: string) => void;
  obok?: React.ReactNode;
  podpis?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-muted">
        {etykieta}
      </label>
      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <input
            id={id}
            inputMode="decimal"
            autoComplete="off"
            enterKeyHint="next"
            value={wartosc}
            onChange={(e) => zmien(tylkoLiczba(e.target.value))}
            aria-describedby={podpis ? `${id}-podpis` : undefined}
            className="h-12 w-full rounded-btn border border-line bg-white pr-14 pl-3.5 text-[18px] font-semibold text-ink tabular-nums outline-none focus:border-blue focus:ring-3 focus:ring-blue/15"
          />
          <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[15px] font-semibold text-muted">
            {jednostka}
          </span>
        </div>
        {obok}
      </div>
      {podpis && (
        <p id={`${id}-podpis`} className="mt-1.5 min-h-[18px] text-[12.5px] text-muted">
          {podpis}
        </p>
      )}
    </div>
  );
}

function Przelacznik<T extends string>({
  etykieta,
  wartosc,
  zmien,
  opcje,
}: {
  etykieta: string;
  wartosc: T;
  zmien: (v: T) => void;
  opcje: [T, string][];
}) {
  return (
    <div role="radiogroup" aria-label={etykieta} className="flex h-12 flex-none rounded-btn bg-mist p-1">
      {opcje.map(([v, tekst]) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={wartosc === v}
          onClick={() => zmien(v)}
          className={`flex cursor-pointer items-center rounded-[9px] px-3.5 text-[14px] font-semibold transition-colors ${
            wartosc === v ? 'bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]' : 'text-muted hover:text-ink'
          }`}
        >
          {tekst}
        </button>
      ))}
    </div>
  );
}

function PrzelacznikPaliwa({ tryb, zmien }: { tryb: TrybPaliwa; zmien: (v: TrybPaliwa) => void }) {
  return (
    <Przelacznik<TrybPaliwa>
      etykieta="Sposób liczenia paliwa"
      wartosc={tryb}
      zmien={zmien}
      opcje={[
        ['kwota', 'Kwota'],
        ['km', 'Z km'],
      ]}
    />
  );
}

function Suma({ etykieta, kwota }: { etykieta: string; kwota: number }) {
  return (
    <div className="flex items-baseline justify-between border-t border-line pt-3.5 text-[15px] font-semibold">
      <span>{etykieta}</span>
      <strong className="text-[20px] font-extrabold tabular-nums">{zl(kwota)}</strong>
    </div>
  );
}
