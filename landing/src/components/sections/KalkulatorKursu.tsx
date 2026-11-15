'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { appLinks } from '@/content/navigation';
import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';

type Pole = 'fracht' | 'kurs' | 'km' | 'spalanie' | 'cena' | 'oplaty' | 'diety';

/** Kolejność pól w siatce dwóch kolumn – szerokie pole opłat idzie na koniec, przez całą szerokość. */
const KOLEJNOSC: readonly Pole[] = ['fracht', 'kurs', 'km', 'spalanie', 'cena', 'diety', 'oplaty'];

/**
 * Wartości startowe – przykładowy kurs do Belgii. Tekstem, bo pole trzyma
 * to, co człowiek wpisał, także przecinek i niedokończoną liczbę.
 */
const START: Tlumaczenia<Record<Pole, string>> = {
  pl: { fracht: '1110', kurs: '4,2845', km: '1070', spalanie: '10', cena: '6,29', oplaty: '125', diety: '523' },
  en: { fracht: '1110', kurs: '4.2845', km: '1070', spalanie: '10', cena: '6.29', oplaty: '125', diety: '523' },
};

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  pola: Record<Pole, string>;
  zostaje: string;
  przychod: string;
  paliwo: string;
  pozostale: string;
  marza: string;
  naKm: string;
  nota: string;
  demo: string;
  locale: string;
}> = {
  pl: {
    naglowek: 'Policz swój kurs',
    pola: {
      fracht: 'Fracht (EUR)',
      kurs: 'Kurs euro (zł)',
      km: 'Kilometry',
      spalanie: 'Spalanie (l/100 km)',
      cena: 'Cena paliwa (zł/l)',
      oplaty: 'Opłaty drogowe, nocleg, parking (zł)',
      diety: 'Diety kierowcy (zł)',
    },
    zostaje: 'Zostaje z kursu',
    przychod: 'Przychód',
    paliwo: 'Paliwo',
    pozostale: 'Pozostałe koszty',
    marza: 'Marża',
    naKm: 'Na kilometr',
    nota: 'BusiKM liczy to sam przy każdym kursie, z paragonów kierowcy i kursu NBP.',
    demo: 'Zobacz demo',
    locale: 'pl-PL',
  },
  en: {
    naglowek: 'Work out your own job',
    pola: {
      fracht: 'Freight (EUR)',
      kurs: 'Euro exchange rate (PLN)',
      km: 'Kilometres',
      spalanie: 'Fuel use (l/100 km)',
      cena: 'Fuel price (PLN/l)',
      oplaty: 'Tolls, overnight stay, parking (PLN)',
      diety: 'Driver’s allowances (PLN)',
    },
    zostaje: 'What you keep from the job',
    przychod: 'Revenue',
    paliwo: 'Fuel',
    pozostale: 'Other costs',
    marza: 'Margin',
    naKm: 'Per kilometre',
    nota: 'BusiKM works this out by itself on every job, from the driver’s receipts and the NBP rate.',
    demo: 'See the demo',
    locale: 'en-GB',
  },
};

/** „4,28", „4.28" i „1 110" na liczbę. Puste albo nieczytelne pole liczy się jako zero. */
function liczba(tekst: string): number {
  const n = Number(tekst.replace(/[\s ]/g, '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function formaty(jezyk: Jezyk) {
  const locale = TEKSTY[jezyk].locale;
  const zl = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
    // Po polsku Intl nie rozdziela tysięcy w liczbach czterocyfrowych
    // („3537 zł”). Reszta strony pisze „3 435 zł”, więc tu też.
    useGrouping: 'always',
  });
  const zlGrosze = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const procent = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 });
  return { zl, zlGrosze, procent };
}

/**
 * Kalkulator kursu w sekcji „Ile zostaje” – to samo działanie, które
 * aplikacja robi sama przy każdym zleceniu: fracht po kursie euro minus
 * paliwo i reszta kosztów.
 *
 * Bez biblioteki i bez zapisu: liczy w przeglądarce przy każdej zmianie.
 */
export function KalkulatorKursu() {
  const jezyk = useJezyk();
  const t = TEKSTY[jezyk];
  const id = useId();
  const [wartosci, setWartosci] = useState<Record<Pole, string>>(START[jezyk]);

  const v = Object.fromEntries(KOLEJNOSC.map((p) => [p, liczba(wartosci[p])])) as Record<Pole, number>;
  const przychod = v.fracht * v.kurs;
  const paliwo = (v.km * v.spalanie * v.cena) / 100;
  const pozostale = v.oplaty + v.diety;
  const zostaje = przychod - paliwo - pozostale;
  const marza = przychod > 0 ? zostaje / przychod : 0;
  const naKm = v.km > 0 ? zostaje / v.km : 0;

  const { zl, zlGrosze, procent } = formaty(jezyk);

  const wiersze: readonly (readonly [string, string])[] = [
    [t.przychod, zl.format(Math.round(przychod))],
    [t.paliwo, `${zl.format(-Math.round(paliwo))}`],
    [t.pozostale, `${zl.format(-Math.round(pozostale))}`],
    [t.marza, procent.format(marza)],
    [t.naKm, zlGrosze.format(naKm)],
  ];

  return (
    <div
      data-reveal
      className="grid gap-8 rounded-panel border border-line-dark bg-surface p-5 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:p-12"
    >
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => e.preventDefault()}
        aria-labelledby={`${id}-naglowek`}
      >
        <h3
          id={`${id}-naglowek`}
          className="text-[22px] font-semibold tracking-[-0.01em] lg:text-h3"
        >
          {t.naglowek}
        </h3>
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 lg:gap-x-4">
          {KOLEJNOSC.map((pole) => (
            <div
              key={pole}
              className={`flex flex-col justify-end gap-1.5 ${pole === 'oplaty' ? 'col-span-2' : ''}`}
            >
              <label htmlFor={`${id}-${pole}`} className="text-[13px] leading-snug text-ink-muted lg:text-[14px]">
                {t.pola[pole]}
              </label>
              <input
                id={`${id}-${pole}`}
                name={pole}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={wartosci[pole]}
                onChange={(e) => setWartosci((w) => ({ ...w, [pole]: e.target.value }))}
                className="h-12 w-full min-w-0 rounded-btn border border-line-dark-2 bg-surface-3 px-3.5 text-[16px] text-paper tabular-nums outline-none focus:border-blue focus-visible:ring-2 focus-visible:ring-blue/40"
              />
            </div>
          ))}
        </div>
      </form>

      <div className="flex flex-col gap-6">
        <div aria-live="polite" aria-atomic="true" className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="text-[12px] font-medium tracking-[0.1em] text-ink-muted uppercase lg:text-caption">
              {t.zostaje}
            </div>
            <div
              className={`text-[44px] leading-none font-bold tracking-[-0.04em] tabular-nums lg:text-[64px] ${
                zostaje < 0 ? 'text-ink-muted' : 'text-paper'
              }`}
            >
              {zl.format(Math.round(zostaje))}
            </div>
          </div>

          <dl className="flex flex-col border-t border-line-dark text-[15px] lg:text-body">
            {wiersze.map(([nazwa, wartosc]) => (
              <div key={nazwa} className="flex justify-between gap-4 border-b border-line-dark py-2.5">
                <dt className="text-ink-muted">{nazwa}</dt>
                <dd className="text-right font-semibold tabular-nums">{wartosc}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="text-[14px] leading-relaxed text-ink-muted lg:text-[15px]">{t.nota}</p>
        <div>
          <Button href={appLinks.demo} fullWidth className="lg:w-auto">
            {t.demo}
          </Button>
        </div>
      </div>
    </div>
  );
}
