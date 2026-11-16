import { Section } from '@/components/ui/Section';
import { Wycinek } from '@/components/ui/Wycinek';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{ tytul: string; tresc: string; alt: string }> = {
  pl: {
    tytul: 'Zysk na pierwszym ekranie',
    tresc: 'Na pulpicie, pod sprawami na dziś: przychód netto, koszty i wynik, obok poprzedni tydzień, miesiąc albo rok.',
    alt: 'Pulpit, sekcja „Finanse, listopad 2026”: przychód netto, koszty, wynik z marżą i należności, przy każdej liczbie zmiana względem października i postęp celu miesiąca, obok przełącznik tydzień, miesiąc, rok.',
  },
  en: {
    tytul: 'Profit on the first screen',
    tresc: 'On the dashboard, below today’s tasks: net revenue, costs and result, next to the previous week, month or year.',
    alt: 'The dashboard’s “Finance, November 2026” section: net revenue, costs, result with margin and receivables, each with the change against October and progress to the monthly goal, plus a week, month, year switch.',
  },
};

/** 01 – finanse z pulpitu, które właściciel widzi zaraz po zalogowaniu. */
export function ZyskNaPierwszymEkranie() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-16">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              01
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.tytul}
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-muted lg:text-lead">
            {t.tresc}
          </p>
        </div>

        <div data-reveal>
          <Wycinek plik="mockup-zysk-pulpit-wycinek.png" alt={t.alt} szer={2280} wys={590} />
        </div>
      </div>
    </Section>
  );
}
