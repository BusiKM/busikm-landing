import Link from '@/i18n/Link';

export type PunktDolaczony = readonly [string, string];
export type OdnosnikWiecej = { href: string; label: string };

/**
 * Wiersz punktów pod treścią sekcji – to, co zostało na stronie głównej
 * z sekcji wchłoniętej przez sąsiednią (mapa w dyspozytorni, czas pracy
 * w aplikacji kierowcy, koszty i księgowa przy fakturach).
 *
 * Najmocniejsze dwa do czterech zdań i odnośnik „Więcej” do podstrony,
 * na której stoi cała reszta. Strona główna ma prowadzić dalej, a nie
 * opowiadać wszystkiego sama.
 */
export function Dolaczone({
  punkty,
  wiecej,
  dark = false,
}: {
  punkty: readonly PunktDolaczony[];
  wiecej: readonly OdnosnikWiecej[];
  dark?: boolean;
}) {
  const kolumny = punkty.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
  const linia = dark ? 'border-line-dark' : 'border-line';
  const drugi = dark ? 'text-ink-muted' : 'text-muted';
  const odnosnik = dark
    ? 'text-blue-light hover:text-paper'
    : 'text-blue hover:text-blue-dark';

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div data-reveal-group className={`grid gap-5 sm:grid-cols-2 lg:gap-8 ${kolumny}`}>
        {punkty.map(([tytul, tresc]) => (
          <div key={tytul} data-reveal className={`flex flex-col gap-1.5 border-t pt-4 lg:pt-5 ${linia}`}>
            <div className="text-[16px] font-semibold lg:text-body">{tytul}</div>
            <div className={`text-[14px] leading-relaxed lg:text-[15px] ${drugi}`}>{tresc}</div>
          </div>
        ))}
      </div>

      <div data-reveal className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
        {wiecej.map((w) => (
          <Link
            key={w.href}
            href={w.href}
            className={`text-[15px] font-semibold underline-offset-4 hover:underline lg:text-body ${odnosnik}`}
          >
            {w.label} <span aria-hidden>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
