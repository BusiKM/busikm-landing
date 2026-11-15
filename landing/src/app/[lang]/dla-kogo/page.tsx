import Link from '@/i18n/Link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { HeroRoli } from '@/components/ui/HeroRoli';
import { Section } from '@/components/ui/Section';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';

export const generateMetadata = metadataPodstrony('dla-kogo');

type Rola = { href: string; nazwa: string; gdzie: string; zdanie: string };

const TEKSTY: Tlumaczenia<{
  nadtytul: string;
  tytul: React.ReactNode;
  lead: string;
  naglowek: string;
  wiecej: string;
  role: Rola[];
}> = {
  pl: {
    nadtytul: 'Cztery role',
    tytul: (
      <>
        Cztery osoby. <br className="hidden lg:inline" />
        Jeden system.
      </>
    ),
    lead: 'Każdy widzi swoje. A w małej firmie właściciel bywa też dyspozytorem - jego konto widzi wszystko.',
    naglowek: 'Wybierz swoją rolę',
    wiecej: 'Zobacz więcej →',
    role: [
      {
        href: '/dla-kogo/wlasciciel',
        nazwa: 'Właściciel',
        gdzie: 'W przeglądarce',
        zdanie: 'Przychód, koszty i zysk widzisz na pierwszym ekranie, a całą flotę na mapie.',
      },
      {
        href: '/dla-kogo/dyspozytor',
        nazwa: 'Dyspozytor',
        gdzie: 'W przeglądarce',
        zdanie: 'Kolejka zleceń i mapa floty są obok siebie, a do kierowcy piszesz z karty zlecenia.',
      },
      {
        href: '/dla-kogo/ksiegowa',
        nazwa: 'Księgowa',
        gdzie: 'W przeglądarce',
        zdanie: 'Komplet dokumentów za miesiąc pobierasz jednym przyciskiem, w formacie Twojego programu (plan Firma).',
      },
      {
        href: '/dla-kogo/kierowca',
        nazwa: 'Kierowca',
        gdzie: 'W telefonie',
        zdanie: 'Zlecenia, przerwy i koszty masz w jednej aplikacji BusiKM Kierowca.',
      },
    ],
  },
  en: {
    nadtytul: 'Four roles',
    tytul: (
      <>
        Four people. <br className="hidden lg:inline" />
        One system.
      </>
    ),
    lead: 'Everyone sees their own part. And in a small company the owner is often the dispatcher too - the owner’s account sees everything.',
    naglowek: 'Pick your role',
    wiecej: 'See more →',
    role: [
      {
        href: '/dla-kogo/wlasciciel',
        nazwa: 'Owner',
        gdzie: 'In the browser',
        zdanie: 'Revenue, costs and profit on the first screen, and the whole fleet on the map.',
      },
      {
        href: '/dla-kogo/dyspozytor',
        nazwa: 'Dispatcher',
        gdzie: 'In the browser',
        zdanie: 'The order queue and the fleet map side by side, and you message the driver from the order card.',
      },
      {
        href: '/dla-kogo/ksiegowa',
        nazwa: 'Accountant',
        gdzie: 'In the browser',
        zdanie: 'The month’s full set of documents in one click, in the format your software reads (Business plan).',
      },
      {
        href: '/dla-kogo/kierowca',
        nazwa: 'Driver',
        gdzie: 'On the phone',
        zdanie: 'Orders, breaks and costs in one app, BusiKM Kierowca.',
      },
    ],
  },
};

/**
 * Dla kogo – rozdzielnik na cztery strony ról. Nagłówek jak na stronach ról
 * (HeroRoli), niżej cztery kafelki z jednym zdaniem i odnośnikiem.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <>
      <Header />
      <main>
        <HeroRoli nadtytul={t.nadtytul} tytul={t.tytul} lead={t.lead} />

        <Section tone="mist" spacing="py-20 lg:py-32">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.naglowek}
          </h2>
          <ul
            data-reveal-group
            className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-4"
          >
            {t.role.map((rola) => (
              <li key={rola.href} data-reveal className="flex">
                <Link
                  href={rola.href}
                  className="flex w-full flex-col gap-3 rounded-card border border-line bg-white p-6 text-ink shadow-card transition-colors hover:border-blue lg:p-7"
                >
                  <span className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">
                    {rola.gdzie}
                  </span>
                  <span className="text-h3-m font-semibold lg:text-h3">
                    {rola.nazwa}
                  </span>
                  <span className="flex-1 text-[15px] leading-relaxed text-muted lg:text-[16px]">
                    {rola.zdanie}
                  </span>
                  <span className="text-[15px] font-medium text-blue">{t.wiecej}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
