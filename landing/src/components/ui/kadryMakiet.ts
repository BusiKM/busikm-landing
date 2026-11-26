import { nazwaPlikuMakiety } from '@/content/podpisyMakiet';

/**
 * Kadr lupy na telefonie: która część pliku makiety ma wypełnić ekran.
 *
 * Pliki makiet mają dużo pustego tła. Telefon w pliku 3200x2400 zajmuje
 * niecałą jedną trzecią szerokości, a laptop ma ramkę i podstawę. Na
 * komputerze to nie przeszkadza, bo lupa ma do dyspozycji duży ekran.
 * Na telefonie cały plik musi się zmieścić w 375 px szerokości, więc
 * telefon w lupie wychodził mniejszy niż na stronie (zmierzone 26.11.2026:
 * 0,57-0,77 raza). Dlatego lupa na telefonie pokazuje tylko kadr: sam
 * telefon albo sam ekran laptopa.
 *
 * Liczby to piksele pliku, wyznaczone z kanału alfa (obszar nieprzezroczysty
 * z marginesem około 25 px na cień). Nowa makieta w tym samym szablonie
 * (`-phone.png` 3200x2400 z jednym telefonem albo `-desktop.png` w ramce
 * laptopa 2016x1270) nie potrzebuje wpisu. Wpis jest potrzebny tylko dla
 * pliku w innym układzie, inaczej lupa pokaże zły wycinek.
 */
export type Kadr = {
  /** Rozmiar całego pliku. */
  szer: number;
  wys: number;
  /** Wycinek do pokazania. */
  x: number;
  y: number;
  w: number;
  h: number;
};

/** Jeden telefon na środku pliku 3200x2400. */
const JEDEN_TELEFON: Kadr = { szer: 3200, wys: 2400, x: 1100, y: 200, w: 1000, h: 2000 };

/** Ekran laptopa w ramce 2016x1270 (bez ramki i podstawy). */
const EKRAN_LAPTOPA: Kadr = { szer: 2016, wys: 1270, x: 238, y: 76, w: 1540, h: 946 };

/** Telefon w pionowym pliku 1226x2064. */
const TELEFON_PION: Kadr = { szer: 1226, wys: 2064, x: 107, y: 11, w: 1010, h: 2030 };

/** Pliki w innym układzie niż szablon. */
const WYJATKI: Record<string, Kadr> = {
  'mockup-hero-telefon-phone.png': TELEFON_PION,
  'mockup-koszty-paragon-phone.png': TELEFON_PION,
  'mockup-kierowca-telefony-phone.png': { szer: 3200, wys: 2400, x: 670, y: 220, w: 1860, h: 1960 },
  'mockup-kierowca-hero-phone.png': { szer: 2400, wys: 1800, x: 640, y: 140, w: 1125, h: 1660 },
  'mockup-kierowca-hero-trzy-phone.png': { szer: 1600, wys: 1200, x: 80, y: 100, w: 1440, h: 1070 },
};

/**
 * Kadr dla adresu makiety albo `null`, gdy lupa ma pokazać cały plik
 * (wycinki i dokumenty nie mają pustego tła).
 */
export function kadrMakiety(src: string): Kadr | null {
  const plik = nazwaPlikuMakiety(src);
  if (WYJATKI[plik]) return WYJATKI[plik];
  if (plik.endsWith('-phone.png')) return JEDEN_TELEFON;
  if (plik.endsWith('-desktop.png')) return EKRAN_LAPTOPA;
  return null;
}
