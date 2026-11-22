import Image from 'next/image';
import { Smartphone } from 'lucide-react';
import { KafelAplikacji } from '@/components/ui/KafelAplikacji';
import { OdznakiSklepow } from '@/components/ui/OdznakiSklepow';
import { iosWSklepie, linkGooglePlay, odznakaGooglePlay, type MiejsceSklepu } from '@/content/sklepy';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/**
 * Gdzie pobrać BusiKM Kierowca. Jeden wzór na wszystkich ciemnych sekcjach
 * o aplikacji: oficjalna odznaka Google Play i obok „Wkrótce na iPhone”,
 * a po publikacji w App Store obie odznaki.
 *
 * Odznaka Google Play to plik od Google w języku strony (`odznakaGooglePlay`),
 * bez zmian kolorów i proporcji. Wytyczne: co najmniej 28 px wysokości,
 * wolne miejsce wokół równe 1/4 wysokości, tu odstęp `gap-3` przy 48 px.
 * App Store ma tylko tekst i ikonę, bo odznaki Apple nie wolno używać dla
 * aplikacji, której jeszcze nie ma w sklepie. Opis: `content/sklepy.ts`.
 *
 * Przy `iosWSklepie` obie oficjalne odznaki (`OdznakiSklepow`), App Store
 * pierwsza, ramka 44 px (Apple wymaga co najmniej 40).
 */

const TEKSTY: Tlumaczenia<{ pobierz: string; wkrotce: string; iphone: string; kod: string }> = {
  pl: {
    pobierz: 'BusiKM Kierowca w Google Play',
    wkrotce: 'Wkrótce',
    iphone: 'na iPhone',
    kod: 'Kod zaproszenia dostajesz od swojej firmy.',
  },
  en: {
    pobierz: 'Get BusiKM Kierowca on Google Play',
    wkrotce: 'Coming soon',
    iphone: 'for iPhone',
    kod: 'Your company sends you the invitation code.',
  },
};

export function StoreBadges({
  miejsce,
  bezOdznak = false,
}: {
  miejsce: MiejsceSklepu;
  /** Kafel z odnośnikami zamiast odznak, gdy strona ma już odznakę App Store. */
  bezOdznak?: boolean;
}) {
  const t = TEKSTY[biezacyJezyk()];
  if (iosWSklepie) {
    return (
      <div className="flex flex-col gap-3">
        {bezOdznak ? (
          <KafelAplikacji miejsce={miejsce} />
        ) : (
          <OdznakiSklepow miejsce={miejsce} rozmiar="sekcja" />
        )}
        <p className="text-[13px] text-ink-muted">{t.kod}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={linkGooglePlay(miejsce)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.pobierz}
          className="block shrink-0 transition-opacity hover:opacity-85"
        >
          {/* Plik ma 646 × 250, z ramką odznaki w środku. */}
          <Image
            src={odznakaGooglePlay[biezacyJezyk()]}
            alt=""
            width={646}
            height={250}
            className="h-12 w-auto"
          />
        </a>
        <div className="flex h-12 items-center gap-2.5 rounded-btn border border-line-dark-2 px-4">
          <Smartphone aria-hidden className="size-5 text-ink-muted" strokeWidth={1.75} />
          <div className="leading-tight">
            <div className="text-[10px] text-ink-muted">{t.wkrotce}</div>
            <div className="text-[13px] font-semibold text-paper lg:text-caption">{t.iphone}</div>
          </div>
        </div>
      </div>
      <p className="text-[13px] text-ink-muted">{t.kod}</p>
    </div>
  );
}
