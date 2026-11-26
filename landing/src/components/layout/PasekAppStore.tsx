'use client';

import type { Ref } from 'react';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';
import { linkGooglePlay } from '@/content/sklepy';

/**
 * Ciemny pasek nad nawigacją: BusiKM Kierowca jeszcze nie jest w App Store.
 *
 * Stoi nad przyklejonym nagłówkiem, więc przy przewijaniu odjeżdża razem
 * z treścią, a nawigacja zostaje. Pokazuje go `Header`, dopóki nie jest
 * włączone `iosWSklepie`. Po publikacji w App Store pasek znika sam, razem
 * z włączeniem odznaki Apple, bez zmiany kodu.
 *
 * Na komputerze pełne zdanie, na telefonie krótsze, żeby pasek zmieścił się
 * w dwóch liniach. Twarde spacje (` `) trzymają „App Store” i „Google
 * Play” w jednej linii, a jednoliterowe „w” i „z” przy następnym słowie.
 */
const TEKSTY: Tlumaczenia<{ pelny: string; krotki: string; sklep: string }> = {
  pl: {
    pelny:
      'Aplikacja BusiKM Kierowca jest chwilowo niedostępna w App Store w Polsce. Czekamy na zatwierdzenie przez Apple. Na Androida pobierzesz ją już z ',
    krotki: 'BusiKM Kierowca na iPhone’a wkrótce w App Store. Na Androida już w ',
    sklep: 'Google Play',
  },
  en: {
    pelny:
      'The BusiKM Kierowca app is not on the App Store yet. We are waiting for approval from Apple. On Android, get it on ',
    krotki: 'BusiKM Kierowca for iPhone is coming soon to the App Store. On Android, get it on ',
    sklep: 'Google Play',
  },
};

export function PasekAppStore({ ref }: { ref?: Ref<HTMLDivElement> }) {
  const t = TEKSTY[useJezyk()];

  return (
    <div
      ref={ref}
      className="bg-ink px-5 py-[9px] text-center text-[13px] leading-[18px] text-balance text-paper lg:px-12 lg:text-[14px] lg:leading-5"
    >
      <span className="lg:hidden">{t.krotki}</span>
      <span className="hidden lg:inline">{t.pelny}</span>
      <a
        href={linkGooglePlay('pasek')}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-white underline underline-offset-[3px] transition-opacity hover:text-white hover:opacity-80"
      >
        {t.sklep}
      </a>
      .
    </div>
  );
}
