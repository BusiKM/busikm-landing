import { Makieta } from '@/components/ui/Makieta';
import { biezacyJezyk } from '@/i18n/serwer';

const DEV = process.env.NODE_ENV === 'development';

/**
 * Wycinek prawdziwego ekranu aplikacji – jeden panel (kolejka, czat, raport)
 * zamiast całego laptopa. Na stronie jest duży i czytelny bez powiększania,
 * a kliknięcie otwiera go w pełnej rozdzielczości jak każdą makietę.
 *
 * Wymiary pliku podajemy wprost, bo od nich zależą proporcje pudła – bez nich
 * strona skakałaby po doczytaniu obrazu.
 */
export function Wycinek({
  plik,
  alt,
  szer,
  wys,
  dark = false,
  className = '',
}: {
  /** Nazwa pliku w `public/mockups`, zwykle `mockup-<obszar>-<ekran>-wycinek.png`. */
  plik: string;
  alt: string;
  szer: number;
  wys: number;
  /** Na ciemnej sekcji krawędź z palety ciemnej. */
  dark?: boolean;
  className?: string;
}) {
  const pl = biezacyJezyk() === 'pl';
  return (
    <div
      className={`relative overflow-hidden rounded-card border bg-white shadow-card ${
        dark ? 'border-line-dark-2' : 'border-line'
      } ${className}`}
      style={{ aspectRatio: `${szer} / ${wys}` }}
    >
      <Makieta
        src={`/mockups/${plik}`}
        alt={alt}
        sizes="(max-width: 1024px) 100vw, 640px"
        imgClassName="object-cover object-top"
        etykietaPowieksz={pl ? 'Powiększ' : 'Enlarge'}
        etykietaZamknij={pl ? 'Zamknij' : 'Close'}
        unoptimized={DEV}
      />
    </div>
  );
}
