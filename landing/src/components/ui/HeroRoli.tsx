import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { appLinks } from '@/content/navigation';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/**
 * Głównym wejściem jest demo, drugi przycisk prowadzi do logowania
 * w panelu, a stamtąd do rejestracji – tak samo jak na stronie głównej.
 */
const PRZYCISKI: Tlumaczenia<{ zapis: string; demo: string }> = {
  pl: { zapis: 'Zaloguj się', demo: 'Zobacz demo' },
  en: { zapis: 'Log in', demo: 'See the demo' },
};

/**
 * Nagłówek strony roli – wyrównany do lewej, bez makiety pod spodem.
 *
 * Podstrony obszarowe otwierają się wyśrodkowanym nagłówkiem i dużym ekranem;
 * strona roli zaczyna od słów i od razu przechodzi w oś dnia.
 *
 * Nagłówkiem `h1` jest `nadtytul`, nie slogan. Slogan („Wiesz, ile zostaje")
 * sprzedaje komuś, kto już jest na stronie, ale nie zawiera słów, które ktoś
 * wpisuje w wyszukiwarkę – a `h1` jest po tytule najmocniejszym sygnałem,
 * o czym jest strona. Dlatego `nadtytul` powinien nieść frazę
 * („Program TMS dla busów 2,5-3,5 t"), a slogan zostaje dużym tekstem.
 */
export function HeroRoli({
  nadtytul,
  tytul,
  lead,
  tone = 'paper',
}: {
  nadtytul: string;
  tytul: React.ReactNode;
  lead: string;
  tone?: 'paper' | 'ink';
}) {
  const dark = tone === 'ink';
  const t = PRZYCISKI[biezacyJezyk()];

  return (
    <section
      className={`relative overflow-hidden px-6 py-24 lg:px-12 lg:py-40 ${
        dark ? 'bg-ink text-paper' : 'bg-paper'
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-size-[80px_80px] lg:bg-size-[120px_120px] ${
          dark
            ? 'bg-[linear-gradient(rgba(250,250,250,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(250,250,250,.035)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(10,10,11,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.035)_1px,transparent_1px)]'
        }`}
      />

      <Container className="relative flex flex-col gap-6 lg:gap-8">
        {/* Fraza z nadtytułu jest nagłówkiem strony, slogan pod nią – tylko
            wielkim tekstem. Wygląd bez zmian: h1 dostaje klasy nadtytułu
            (`Eyebrow`), a slogan klasy dawnego h1. */}
        <h1
          className={`text-[12px] font-medium tracking-[0.1em] uppercase lg:text-caption ${
            dark ? 'text-ink-muted' : 'text-muted'
          }`}
        >
          {nadtytul}
        </h1>
        <p
          data-reveal
          className="max-w-[1120px] text-display-m font-bold text-balance lg:text-display"
        >
          {tytul}
        </p>
        <p
          data-reveal
          className={`max-w-[700px] text-lead-m text-pretty lg:text-lead ${
            dark ? 'text-ink-muted' : 'text-muted'
          }`}
        >
          {lead}
        </p>
        <div data-reveal className="mt-2 flex flex-col gap-2.5 lg:flex-row lg:gap-3">
          <Button href={appLinks.demo} fullWidth className="lg:w-auto">
            {t.demo}
          </Button>
          <Button href={appLinks.login} variant="secondary" fullWidth className="lg:w-auto">
            {t.zapis}
          </Button>
        </div>
      </Container>
    </section>
  );
}
