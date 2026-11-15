/**
 * Cienka pionowa kreska między elementami jednego wiersza (okruszki, stopki,
 * paski okien w makietach). Zastępuje znak-separator w tekście: kolor bierze
 * z otoczenia (`bg-current`), więc pasuje i na jasnym, i na ciemnym tle.
 */
export function Rozdzielacz({ className = 'mx-3' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-[0.85em] w-px flex-none self-center bg-current align-[-0.1em] opacity-30 ${className}`}
    />
  );
}
