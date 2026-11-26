'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { kadrMakiety, type Kadr } from '@/components/ui/kadryMakiet';
import { useJezyk } from '@/i18n/klient';

/** Szerokość toru, który pokazuje miejsce przewinięcia w lupie na telefonie. */
const TOR = 120;

type Suwak = { szer: number; lewo: number } | null;

/** Położenie suwaka pod przewijanym kadrem albo `null`, gdy kadr mieści się na ekranie. */
function policzSuwak(p: HTMLDivElement): Suwak {
  const zakres = p.scrollWidth - p.clientWidth;
  if (zakres <= 1) return null;
  const szer = (TOR * p.clientWidth) / p.scrollWidth;
  return { szer, lewo: ((TOR - szer) * p.scrollLeft) / zakres };
}

/** Kadr poziomy otwiera się na środku: boki są ucięte i przewija się je palcem. */
function naSrodek(p: HTMLDivElement, ustaw: (s: Suwak) => void) {
  p.scrollLeft = (p.scrollWidth - p.clientWidth) / 2;
  ustaw(policzSuwak(p));
}

/**
 * Zrzut aplikacji w pudle makiety z podglądem na cały ekran.
 *
 * Na stronie makieta jest mała – laptop zajmuje pół kolumny, więc tekstu
 * na ekranie aplikacji nie da się przeczytać. Kliknięcie w makietę albo
 * w lupę w rogu otwiera ten sam plik w pełnej rozdzielczości nad stroną.
 * Zamyka się kliknięciem w dowolne miejsce, klawiszem Esc albo krzyżykiem.
 *
 * Na telefonie (poniżej `lg`) lupa pokazuje kadr z `kadryMakiet.ts`, bez
 * pustego tła pliku. Kadr pionowy (telefon) wypełnia prawie cały ekran.
 * Kadr poziomy (ekran laptopa, dwa telefony, szerokie wycinki) dostaje
 * wysokość, przy której da się go czytać, otwiera się na środku, a boki
 * przewija się palcem. Na komputerze lupa jest taka jak wcześniej.
 */
export function Makieta({
  src,
  alt,
  sizes,
  unoptimized,
  imgClassName,
  imgStyle,
  etykietaPowieksz,
  etykietaZamknij,
  laptop = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  unoptimized: boolean;
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
  etykietaPowieksz: string;
  etykietaZamknij: string;
  /** Makieta w ramce laptopa 2016x1270 – lupa siada w rogu ekranu, nie pudła. */
  laptop?: boolean;
}) {
  const okno = useRef<HTMLDialogElement>(null);
  // Obraz w pełnej rozdzielczości trafia do dokumentu dopiero po pierwszym
  // otwarciu. Ukryty <dialog> nie wstrzymuje pobierania <img>, więc bez tego
  // każda makieta ściągała się dwa razy – raz zoptymalizowana na stronie,
  // raz jako pełny PNG – i strona główna ważyła prawie 8 MB (Lighthouse w CI).
  const [otwierany, setOtwierany] = useState(false);
  const pas = useRef<HTMLDivElement | null>(null);
  const [suwak, setSuwak] = useState<Suwak>(null);
  // Wycinki i dokumenty nie mają kadru w tabeli, więc lupa bierze cały plik
  // i jego proporcje poznaje dopiero po wczytaniu.
  const [calyPlik, setCalyPlik] = useState<Kadr | null>(null);
  const kadr = kadrMakiety(src) ?? calyPlik;
  const przesun = useJezyk() === 'pl' ? 'Przesuń w bok' : 'Swipe sideways';

  const odswiezSuwak = () => {
    if (pas.current) setSuwak(policzSuwak(pas.current));
  };
  // Pas przewijania powstaje dopiero po pierwszym otwarciu (albo po wczytaniu
  // pliku bez kadru), więc środkuje go sam przy wejściu do dokumentu. Kolejne
  // otwarcia środkuje `otworz`. Stała funkcja, bo nowa przy każdym renderze
  // wołałaby się przy każdym przesunięciu palcem i wracała na środek.
  const podepnijPas = useCallback((p: HTMLDivElement | null) => {
    pas.current = p;
    if (p) naSrodek(p, setSuwak);
  }, []);

  // Obrót telefonu zmienia wysokość kadru, a z nią zakres przewijania.
  useEffect(() => {
    if (!otwierany) return;
    const poZmianie = () => {
      if (pas.current) setSuwak(policzSuwak(pas.current));
    };
    window.addEventListener('resize', poZmianie);
    return () => window.removeEventListener('resize', poZmianie);
  }, [otwierany]);

  const otworz = () => {
    setOtwierany(true);
    okno.current?.showModal();
    if (pas.current) naSrodek(pas.current, setSuwak);
  };

  return (
    <>
      <button
        type="button"
        onClick={otworz}
        aria-label={`${etykietaPowieksz}: ${alt}`}
        // Najechanie kursorem lekko przybliża makietę (2%), żeby było widać,
        // że da się ją powiększyć. Tailwind 4 włącza `hover:` tylko przy
        // myszce, więc na telefonie makieta stoi w miejscu.
        className="group absolute inset-0 block cursor-zoom-in transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
        style={{ containerType: 'size' }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className={imgClassName} style={imgStyle} unoptimized={unoptimized} />
        {laptop ? (
          // Pudło bywa 4:3, a laptop 16:10 – róg pudła wypada wtedy w pustym
          // marginesie pod laptopem. Wewnętrzna warstwa ma proporcje pliku,
          // a lupa stoi w rogu ekranu (ekran: 238..1778 x 76..1022 px).
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: 'min(100cqw, calc(100cqh * 2016 / 1270))', aspectRatio: '2016 / 1270' }}
          >
            <Lupa className="right-[13.5%] bottom-[22%]" />
          </span>
        ) : (
          <Lupa className="right-2 bottom-2 lg:right-3 lg:bottom-3" />
        )}
      </button>

      <dialog
        ref={okno}
        // Zamyka kliknięcie w dowolne miejsce – w obraz też. Nikt nie szuka
        // krzyżyka w rogu ekranu, kiedy obraz i tak zajmuje cały widok.
        onClick={() => okno.current?.close()}
        className="m-auto cursor-zoom-out max-h-[94vh] max-w-[96vw] overflow-visible bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm max-lg:m-0 max-lg:h-dvh max-lg:max-h-none max-lg:w-screen max-lg:max-w-none"
      >
        {/* Telefon: sam kadr, pionowy prawie na cały ekran, poziomy z przewijaniem. */}
        <div className="flex h-full w-full flex-col justify-center lg:hidden">
          {otwierany && !kadr && (
            // eslint-disable-next-line @next/next/no-img-element -- tylko odczyt proporcji pliku bez kadru
            <img
              src={src}
              alt=""
              className="hidden"
              onLoad={(e) => {
                const { naturalWidth: szer, naturalHeight: wys } = e.currentTarget;
                setCalyPlik({ szer, wys, x: 0, y: 0, w: szer, h: wys });
              }}
            />
          )}
          {otwierany && kadr && kadr.w / kadr.h < 0.8 && (
            <div className="flex min-h-0 flex-1 items-center justify-center px-2 pt-[60px] pb-5">
              <Kadrowany
                src={src}
                alt={alt}
                kadr={kadr}
                style={{ width: `min(100vw - 16px, (100dvh - 80px) * ${(kadr.w / kadr.h).toFixed(4)})` }}
              />
            </div>
          )}
          {otwierany && kadr && kadr.w / kadr.h >= 0.8 && (
            <>
              <div
                ref={podepnijPas}
                onScroll={odswiezSuwak}
                className="w-full overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <Kadrowany
                  src={src}
                  alt={alt}
                  kadr={kadr}
                  className="mx-auto"
                  style={{
                    width: `min((100dvh - 170px) * ${(kadr.w / kadr.h).toFixed(4)}, 230vw)`,
                  }}
                />
              </div>
              {suwak && (
                <div className="mt-5 flex flex-col items-center gap-2.5 text-[13px] font-medium text-paper">
                  <div className="relative h-1 rounded-full bg-paper/20" style={{ width: TOR }}>
                    <div className="absolute top-0 h-1 rounded-full bg-paper" style={{ width: suwak.szer, left: suwak.lewo }} />
                  </div>
                  <span className="flex items-center gap-2 rounded-full bg-paper/12 px-3.5 py-[7px]">
                    <ChevronLeft className="size-4" aria-hidden />
                    {przesun}
                    <ChevronRight className="size-4" aria-hidden />
                  </span>
                </div>
              )}
            </>
          )}
          <button
            type="button"
            onClick={() => okno.current?.close()}
            aria-label={etykietaZamknij}
            className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-ink/80 text-paper shadow-card"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="relative max-lg:hidden">
          {otwierany && (
            // eslint-disable-next-line @next/next/no-img-element -- pełna rozdzielczość pliku, bez optymalizatora
            <img src={src} alt={alt} className="block max-h-[94vh] w-auto max-w-[96vw] object-contain" />
          )}
          <button
            type="button"
            onClick={() => okno.current?.close()}
            aria-label={etykietaZamknij}
            className="absolute top-2 right-2 flex size-10 items-center justify-center rounded-full bg-ink/80 text-paper shadow-card"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </dialog>
    </>
  );
}

/** Wycinek pliku: ramka o proporcjach kadru, obraz przesunięty tak, żeby kadr ją wypełnił. */
function Kadrowany({
  src,
  alt,
  kadr,
  className = '',
  style,
}: {
  src: string;
  alt: string;
  kadr: Kadr;
  className?: string;
  style: React.CSSProperties;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ ...style, aspectRatio: `${kadr.w} / ${kadr.h}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- pełna rozdzielczość pliku, bez optymalizatora */}
      <img
        src={src}
        alt={alt}
        className="absolute max-w-none"
        style={{
          width: `${(kadr.szer / kadr.w) * 100}%`,
          left: `${(-kadr.x / kadr.w) * 100}%`,
          top: `${(-kadr.y / kadr.h) * 100}%`,
        }}
      />
    </div>
  );
}

function Lupa({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute flex size-8 items-center justify-center rounded-full bg-ink/70 text-paper opacity-80 shadow-card backdrop-blur transition-[opacity,scale] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:opacity-100 motion-reduce:group-hover:scale-100 lg:size-9 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
      </svg>
    </span>
  );
}
