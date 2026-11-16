/**
 * Blok w karcie – dwa takie stoją obok siebie, gdy dwa punkty dzielą jedną
 * sekcję. Na górze numer, nagłówek i zdanie, na dole makieta.
 */
export function KartaBloku({
  numer,
  tytul,
  tresc,
  tone = "mist",
  rowno = false,
  children,
}: {
  numer: string;
  tytul: string;
  tresc: string;
  tone?: "mist" | "surface";
  /**
   * Dwie karty obok siebie z wyrównanymi wierszami: numer, nagłówek, akapit
   * i makieta zaczynają się na tej samej wysokości, choć nagłówki mają różną
   * liczbę linii. Rodzic musi mieć `lg:grid-rows-[auto_auto_auto_1fr]`.
   */
  rowno?: boolean;
  children: React.ReactNode;
}) {
  const dark = tone === "surface";

  return (
    <div
      data-reveal
      className={`flex flex-col justify-between gap-8 rounded-panel p-7 lg:gap-10 lg:p-14 ${
        dark ? "border border-line-dark bg-surface" : "bg-mist"
      } ${rowno ? "lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-y-5" : ""}`}
    >
      <div
        className={`flex flex-col gap-4 lg:gap-5 ${rowno ? "lg:contents" : ""}`}
      >
        <div
          className={`text-[13px] font-semibold tracking-[0.06em] lg:text-caption ${
            dark ? "text-blue-light" : "text-blue"
          }`}
        >
          {numer}
        </div>
        <h2 className="text-h2-m font-semibold text-balance lg:text-h2">
          {tytul}
        </h2>
        <p
          className={`text-[16px] leading-relaxed lg:text-body ${
            dark ? "text-ink-muted" : "text-muted"
          }`}
        >
          {tresc}
        </p>
      </div>

      {rowno ? <div className="lg:mt-5 lg:self-end">{children}</div> : children}
    </div>
  );
}
