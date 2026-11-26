import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import { Szukaj } from '@/components/pages/pomoc/Szukaj';
import { grupyWyszukiwarki } from '@/content/pomoc';
import type { Tlumaczenia } from '@/i18n/jezyki';
import Link from '@/i18n/Link';
import { ChevronRight, FileDown } from 'lucide-react';

export const generateMetadata = metadataPodstrony('pomoc');

/**
 * Ściągi z serii „5 kroków” (rolki na Facebooku). Tylko po polsku, bo to
 * polskie przepisy i strony istnieją tylko w tym języku. Stopka nie ma
 * działu poradników, więc wejście stoi tutaj.
 */
const SCIAGI: readonly { href: string; tytul: string; opis: string }[] = [
  {
    href: '/itd',
    tytul: 'Kontrola tachografu w busie: checklista',
    opis: 'Pięć rzeczy do sprawdzenia przed kontrolą ITD, PDF do wydruku',
  },
];

const TEKSTY: Tlumaczenia<{ naglowek: React.ReactNode; lead: string; przycisk: string }> = {
  pl: {
    naglowek: (
      <>
        Nie znalazłeś? <br className="hidden lg:inline" />
        Napisz.
      </>
    ),
    lead: 'Odpisujemy tego samego dnia roboczego. Nie ma tu formularzy zgłoszeniowych z numerem sprawy.',
    przycisk: 'Napisz do nas',
  },
  en: {
    naglowek: (
      <>
        Couldn’t find it? <br className="hidden lg:inline" />
        Write to us.
      </>
    ),
    lead: 'We reply the same working day. No support tickets, no case numbers.',
    przycisk: 'Write to us',
  },
};

/**
 * Centrum pomocy – wg projektu „BusiKM Pomoc" z Claude Design
 * (design/19-pomoc). Treść: docs/landing/05, rozdział C5.
 *
 * Ktoś tu trafia zniecierpliwiony, więc wyszukiwarka jest pierwszą rzeczą,
 * którą widzi, i filtruje kategorie na żywo. Bez makiet produktu.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <>
      <Header />
      <main>
        <Szukaj grupy={grupyWyszukiwarki(jezyk)} />

        {jezyk === 'pl' && (
          <section className="-mt-8 bg-paper px-6 pb-16 [font-feature-settings:'calt'_0] lg:-mt-12 lg:px-12 lg:pb-24">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-4">
              <h2 className="text-[22px] font-bold tracking-[-0.015em] lg:text-[28px]">
                Ściągi i kalkulator
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SCIAGI.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group flex items-start gap-3.5 rounded-[16px] border border-line bg-white p-4 text-ink transition-colors hover:border-blue hover:text-ink lg:p-5"
                  >
                    <span className="flex size-10 flex-none items-center justify-center rounded-[11px] bg-blue-soft text-blue">
                      <FileDown className="size-5" aria-hidden />
                    </span>
                    <span className="flex flex-col gap-1">
                      <b className="text-[16px] leading-snug">{s.tytul}</b>
                      <span className="text-[14px] leading-snug text-muted">{s.opis}</span>
                    </span>
                    <ChevronRight className="mt-2.5 ml-auto size-4.5 flex-none text-muted group-hover:text-blue" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Section tone="ink" spacing="py-20 lg:py-28">
          <div className="flex flex-col items-center gap-6 text-center lg:gap-8">
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.naglowek}
            </h2>
            <p
              data-reveal
              className="max-w-[640px] text-lead-m text-pretty text-ink-muted lg:text-lead"
            >
              {t.lead}
            </p>
            <div data-reveal>
              <Button href="/kontakt">{t.przycisk}</Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
