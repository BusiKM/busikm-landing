import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { linkAppStore, linkGooglePlay, type MiejsceSklepu } from '@/content/sklepy';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{ opis: string; appStore: string; googlePlay: string }> = {
  pl: {
    opis: 'Aplikacja dla kierowców',
    appStore: 'W App Store',
    googlePlay: 'W Google Play',
  },
  en: {
    opis: 'The app for drivers',
    appStore: 'On the App Store',
    googlePlay: 'On Google Play',
  },
};

/**
 * Aplikacja w obu sklepach bez odznak: ikona, nazwa i dwa odnośniki
 * tekstowe. Apple dopuszcza jedną odznakę App Store na układ, a nazwy
 * sklepów wolno pisać w tekście. Stąd kafel w stopce (jest na każdej
 * stronie) i w sekcji aplikacji na stronie głównej (odznaki są już w hero).
 * Tylko przy `iosWSklepie`, do tego czasu oba miejsca zostają jak były.
 */
export function KafelAplikacji({ miejsce }: { miejsce: MiejsceSklepu }) {
  const jezyk = biezacyJezyk();
  const t = TEKSTY[jezyk];
  const linki = [
    { href: linkAppStore(jezyk), label: t.appStore },
    { href: linkGooglePlay(miejsce), label: t.googlePlay },
  ];
  return (
    <div className="flex w-fit items-start gap-3.5 rounded-card border border-line-dark-2 py-3.5 pr-5 pl-3.5">
      <Image
        src="/aplikacja/busikm-kierowca-512.png"
        alt=""
        width={512}
        height={512}
        className="size-11 flex-none rounded-[23%]"
      />
      <div>
        <div className="text-[15px] font-semibold text-paper">BusiKM Kierowca</div>
        <div className="mt-px text-[13px] text-ink-muted">{t.opis}</div>
        <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5">
          {linki.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[14px] font-medium text-paper transition-colors hover:text-blue-light"
            >
              {l.label}
              <ArrowUpRight aria-hidden className="size-[15px] text-ink-muted" strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
