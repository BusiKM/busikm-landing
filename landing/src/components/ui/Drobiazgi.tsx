import { createElement } from 'react';
import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';
import { ikonaKafelka } from '@/components/ui/ikony-kafelkow';

const NAGLOWEK: Tlumaczenia<string> = {
  pl: 'Drobiazgi, które widać dopiero w robocie.',
  en: 'Small things you only notice once you’re using it.',
};

/**
 * „Drobiazgi, które widać dopiero w robocie" – siatka kafelków zamykająca
 * każdą podstronę, plus wiersz z odnośnikami do ról.
 */
export function Drobiazgi({
  naglowek,
  kafelki,
  stopka,
  tone = 'ink',
}: {
  naglowek?: string;
  kafelki: readonly string[];
  /** Wiersz pod siatką – zwykle „Kto tego używa". */
  stopka?: React.ReactNode;
  tone?: 'paper' | 'mist' | 'ink';
}) {
  const dark = tone === 'ink';
  const tytul = naglowek ?? NAGLOWEK[biezacyJezyk()];

  return (
    <Section tone={tone}>
      <div className="flex flex-col gap-10 lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {tytul}
        </h2>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-4">
          {kafelki.map((k) => (
            <Kafelek key={k} tekst={k} dark={dark} />
          ))}
        </div>

        {stopka && (
          <p
            /* Odnośnik koloruje sekcja, nie strona: na ciemnym tle marka
               #0B5FFF daje tylko 3,86:1, więc potrzebny jest jaśniejszy
               wariant. Strony przekazują sam tekst odnośnika bez klasy. */
            className={`border-t pt-10 text-[16px] leading-relaxed lg:pt-16 lg:text-body ${
              dark
                ? 'border-line-dark text-ink-muted [&_a]:text-blue-light'
                : 'border-line text-muted [&_a]:text-blue'
            }`}
          >
            {stopka}
          </p>
        )}
      </div>
    </Section>
  );
}

/** Kafelek z ikoną w niebieskim kwadracie nad tekstem. */
export function Kafelek({ tekst, dark }: { tekst: string; dark: boolean }) {
  return (
    <div
      data-reveal
      className={`flex flex-col gap-3.5 rounded-card p-4.5 text-[15px] font-semibold lg:min-h-30 lg:gap-5 lg:p-7 lg:text-body ${
        dark ? 'border border-line-dark bg-surface' : 'border border-line bg-white'
      }`}
    >
      <span
        aria-hidden
        className={`flex size-9 items-center justify-center rounded-xl lg:size-10 ${
          dark ? 'bg-blue/15 text-blue-light' : 'bg-blue-soft text-blue'
        }`}
      >
        {createElement(ikonaKafelka(tekst), { className: 'size-[18px] lg:size-5', strokeWidth: 2 })}
      </span>
      {tekst}
    </div>
  );
}
