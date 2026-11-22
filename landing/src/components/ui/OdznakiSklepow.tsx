import Image from 'next/image';
import {
  iosWSklepie,
  linkAppStore,
  linkGooglePlay,
  odznakaAppStore,
  odznakaGooglePlay,
  type MiejsceSklepu,
} from '@/content/sklepy';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{ appStore: string; googlePlay: string }> = {
  pl: {
    appStore: 'BusiKM Kierowca w App Store',
    googlePlay: 'BusiKM Kierowca w Google Play',
  },
  en: {
    appStore: 'Download BusiKM Kierowca on the App Store',
    googlePlay: 'Get BusiKM Kierowca on Google Play',
  },
};

/**
 * Rozmiary liczone od wysokości widocznej ramki, wspólnej dla obu odznak.
 *
 * App Store: plik SVG to sama odznaka, więc wysokość pliku = wysokość ramki.
 * Google Play: plik PNG 646 × 250 ma przezroczysty margines 29 px u góry
 * i u dołu, ramka zajmuje 192 px. Wysokość pliku = ramka × 250 / 192,
 * a ujemny margines (ramka × 29 / 192) zjada pustkę, żeby obie stały równo.
 *
 * Odstęp między odznakami to co najmniej 1/4 wysokości ramki: tyle wolnego
 * pola wymagają i Apple, i Google. Apple wymaga też co najmniej 40 px
 * wysokości na ekranie.
 *
 * - `hero`: ramka 48 px na telefonie, 56 px na desktopie, odstęp 14 i 16 px.
 * - `sekcja`: ramka 44 px, odstęp 12 px.
 */
const ROZMIARY = {
  hero: {
    rzad: 'gap-3.5 lg:gap-4',
    appStore: 'h-12 w-auto lg:h-14',
    googlePlay: 'h-[62.5px] w-auto lg:h-[72.92px]',
    googleMargines: '-my-[7.25px] lg:-my-[8.46px]',
  },
  sekcja: {
    rzad: 'gap-3',
    appStore: 'h-11 w-auto',
    googlePlay: 'h-[57.29px] w-auto',
    googleMargines: '-my-[6.65px]',
  },
} as const;

/**
 * Oficjalne odznaki sklepów, bez zmian w plikach. App Store stoi pierwsza,
 * tak każą wytyczne Apple przy odznakach kilku platform, i pojawia się
 * dopiero przy `iosWSklepie` (licencja Apple). Jedna odznaka App Store na
 * stronę: dlatego stopka i sekcja aplikacji na stronie głównej mają zamiast
 * odznak `KafelAplikacji`.
 */
export function OdznakiSklepow({
  miejsce,
  rozmiar,
  priorytet = false,
}: {
  miejsce: MiejsceSklepu;
  rozmiar: keyof typeof ROZMIARY;
  priorytet?: boolean;
}) {
  const jezyk = biezacyJezyk();
  const t = TEKSTY[jezyk];
  const r = ROZMIARY[rozmiar];
  return (
    <div className={`flex flex-wrap items-center ${r.rzad}`}>
      {iosWSklepie && (
        <a
          href={linkAppStore(jezyk)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.appStore}
          className="block shrink-0 transition-opacity hover:opacity-85"
        >
          <Image
            src={odznakaAppStore[jezyk]}
            alt=""
            width={120}
            height={40}
            unoptimized
            priority={priorytet}
            className={r.appStore}
          />
        </a>
      )}
      <a
        href={linkGooglePlay(miejsce)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.googlePlay}
        className={`block shrink-0 transition-opacity hover:opacity-85 ${r.googleMargines}`}
      >
        <Image
          src={odznakaGooglePlay[jezyk]}
          alt=""
          width={646}
          height={250}
          priority={priorytet}
          className={r.googlePlay}
        />
      </a>
    </div>
  );
}
