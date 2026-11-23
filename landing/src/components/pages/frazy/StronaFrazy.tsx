import Link from '@/i18n/Link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Button } from '@/components/ui/Button';
import { HeroRoli } from '@/components/ui/HeroRoli';
import { Section, Bullets } from '@/components/ui/Section';
import { DEMO_URL, appLinks } from '@/content/navigation';
import { pages } from '@/content/pages';
import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';

/**
 * Podstrona pod frazę z wyszukiwarki – „ewidencja przebiegu pojazdu",
 * „diety kierowcy za granicą", „program TMS dla busów".
 *
 * Podstrony obszarowe (`/co-robi/*`) sprzedają makietą i jednym zdaniem.
 * Ta strona ma odpowiedzieć na pytanie wpisane w Google, więc niesie
 * więcej tekstu: nagłówki `h2` mówią językiem zapytań, akapity tłumaczą,
 * jak to działa, a odnośniki prowadzą do podstron i do pomocy.
 *
 * Nagłówek `h1` to fraza (`eyebrow` z `content/pages.ts`), slogan pod nią
 * jest tylko dużym tekstem – patrz `HeroRoli`.
 */

export type SekcjaFrazy = {
  /** Nagłówek `h2` – fraza, której ktoś szuka, nie hasło marki. */
  naglowek: string;
  /** Akapity; mogą zawierać odnośniki (`@/i18n/Link`). */
  akapity: React.ReactNode[];
  punkty?: string[];
  /** Zrzut albo rysowana makieta pod tekstem. */
  makieta?: React.ReactNode;
};

export type Odnosnik = { href: string; tytul: string; opis: string };

export type TrescFrazy = {
  sekcje: SekcjaFrazy[];
  /** „Zobacz też" – podstrony i artykuły pomocy. */
  odnosniki: { naglowek: string; pozycje: Odnosnik[] };
  pytania: { naglowek: string; pozycje: [string, string][] };
};

const CTA: Tlumaczenia<{ naglowek: string; tresc: string; demo: string; zapis: string }> = {
  pl: {
    naglowek: 'Sprawdź na danych przykładowej firmy.',
    tresc:
      'Demo otwiera się bez zakładania konta, tylko do odczytu. Własne konto firmy założysz z ekranu logowania, pierwsze 14 dni bez opłat.',
    demo: 'Zobacz demo',
    zapis: 'Zaloguj się',
  },
  en: {
    naglowek: 'Try it on a sample company’s data.',
    tresc:
      'The demo opens without an account and is read-only. You can create your own company account from the sign-in screen, with the first 14 days free.',
    demo: 'See the demo',
    zapis: 'Log in',
  },
};

/** Nagłówek z `\n` – łamany tylko na desktopie, jak na pozostałych podstronach. */
function Wiersze({ tekst }: { tekst: string }) {
  const linie = tekst.split('\n');
  return (
    <>
      {linie.map((l, i) => (
        <span key={l}>
          {l}
          {i < linie.length - 1 && (
            <>
              {' '}
              <br className="hidden lg:inline" />
            </>
          )}
        </span>
      ))}
    </>
  );
}

function Sekcja({ sekcja, tone }: { sekcja: SekcjaFrazy; tone: 'paper' | 'mist' }) {
  return (
    <Section tone={tone} spacing="py-20 lg:py-28">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {sekcja.naglowek}
        </h2>
        <div
          data-reveal
          className="flex flex-col gap-5 text-[16px] leading-relaxed text-pretty lg:text-body [&_a]:text-blue"
        >
          {sekcja.akapity.map((a, i) => (
            <p key={i}>{a}</p>
          ))}
          {sekcja.punkty && <Bullets items={sekcja.punkty} />}
        </div>
      </div>
      {sekcja.makieta && (
        <div data-reveal className="mt-12 lg:mt-16">
          {sekcja.makieta}
        </div>
      )}
    </Section>
  );
}

export function StronaFrazy({
  slug,
  jezyk,
  tresc,
}: {
  /** Klucz w `content/pages.ts`, np. `co-robi/ewidencja-przebiegu`. */
  slug: string;
  jezyk: Jezyk;
  tresc: TrescFrazy;
}) {
  const strona = pages[jezyk][slug];
  const cta = CTA[jezyk];

  return (
    <>
      <Header />
      <main>
        <HeroRoli
          nadtytul={strona.eyebrow ?? strona.title}
          tytul={<Wiersze tekst={strona.heading} />}
          lead={strona.lead}
        />

        {tresc.sekcje.map((s, i) => (
          <Sekcja key={s.naglowek} sekcja={s} tone={i % 2 === 0 ? 'mist' : 'paper'} />
        ))}

        <Section tone="ink" spacing="py-20 lg:py-28">
          <div className="flex flex-col gap-6 lg:max-w-[760px] lg:gap-8">
            <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
              {cta.naglowek}
            </h2>
            <p data-reveal className="text-lead-m text-pretty text-ink-muted lg:text-lead">
              {cta.tresc}
            </p>
            <div data-reveal className="flex flex-col gap-2.5 lg:flex-row lg:gap-3">
              <Button href={DEMO_URL} fullWidth className="lg:w-auto">
                {cta.demo}
              </Button>
              <Button href={appLinks.login} variant="secondaryDark" fullWidth className="lg:w-auto">
                {cta.zapis}
              </Button>
            </div>
          </div>
        </Section>

        <Section spacing="py-20 lg:py-28">
          <div className="flex flex-col gap-8 lg:gap-12">
            <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
              {tresc.odnosniki.naglowek}
            </h2>
            <div data-reveal-group className="grid gap-2.5 lg:grid-cols-3 lg:gap-4">
              {tresc.odnosniki.pozycje.map((o) => (
                <Link
                  key={o.href}
                  href={o.href}
                  data-reveal
                  className="flex flex-col gap-2 rounded-card border border-line bg-white p-5 text-ink shadow-card transition-colors hover:border-blue lg:p-6"
                >
                  <span className="text-[17px] font-semibold tracking-[-0.01em]">{o.tytul}</span>
                  <span className="text-[15px] leading-relaxed text-muted">{o.opis}</span>
                </Link>
              ))}
            </div>
          </div>
        </Section>

        <Akordeon heading={tresc.pytania.naglowek} items={tresc.pytania.pozycje} tone="mist" />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
