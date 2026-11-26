/**
 * Kalkulator „Ile zostaje z kursu?” (`/kalkulator`): samo liczenie, bez React.
 *
 * Bez importów z `@/`, bo testy uruchamia wprost `node --test`
 * (`kalkulator.test.ts`), który nie zna aliasów ze `tsconfig`.
 *
 * Kwoty liczymy w groszach i zaokrąglamy na każdym kroku, który widać na
 * ekranie (przychód, paliwo, suma kosztów). Dzięki temu wiersze na stronie
 * zawsze się sumują: „Przychód - Koszty” daje dokładnie „Zostaje”.
 */

export type Waluta = 'EUR' | 'PLN';
export type TrybPaliwa = 'kwota' | 'km';

/** Pola formularza dokładnie tak, jak je wpisano (tekst). */
export type Pola = {
  fracht: string;
  waluta: Waluta;
  kurs: string;
  trybPaliwa: TrybPaliwa;
  paliwo: string;
  spalanie: string;
  cenaLitra: string;
  oplaty: string;
  diety: string;
  inne: string;
  km: string;
};

export type Wynik = {
  przychod: number;
  paliwo: number;
  koszty: number;
  zostaje: number;
  /** `null`, gdy kilometrów nie podano (zamiast dzielenia przez zero). */
  zaKm: number | null;
  /** Jest fracht i co najmniej jeden koszt: wynik ma sens. */
  pelny: boolean;
};

export const PUSTE: Pola = {
  fracht: '',
  waluta: 'EUR',
  kurs: '',
  trybPaliwa: 'kwota',
  paliwo: '',
  spalanie: '',
  cenaLitra: '',
  oplaty: '',
  diety: '',
  inne: '',
  km: '',
};

/** Liczby z rolki „Krok 4”. Kurs zostaje bieżący z NBP. */
export const PRZYKLAD: Omit<Pola, 'kurs'> = {
  ...PUSTE,
  fracht: '590',
  waluta: 'EUR',
  trybPaliwa: 'kwota',
  paliwo: '430',
  oplaty: '140',
  diety: '120',
  inne: '',
  km: '500',
};

/** Kurs z rolki, gdy NBP nie odpowie, a ktoś kliknie przykład. */
export const KURS_Z_ROLKI = 4.24;

/**
 * Tekst z pola na liczbę. Przyjmuje „1 234,5”, „1234.5” i „1.234,5”.
 * Puste albo niezrozumiałe pole to 0, bo kalkulator liczy na żywo
 * i nie może wyświetlać błędu przy każdej literówce.
 */
export function liczba(tekst: string): number {
  let t = tekst.replace(/[\s ]/g, '');
  if (t === '') return 0;
  const przecinek = t.lastIndexOf(',');
  const kropka = t.lastIndexOf('.');
  if (przecinek !== -1 && kropka !== -1) {
    // Separatorem dziesiętnym jest ten znak, który stoi dalej.
    t = przecinek > kropka ? t.replace(/\./g, '').replace(',', '.') : t.replace(/,/g, '');
  } else {
    t = t.replace(',', '.');
  }
  if (!/^\d*\.?\d*$/.test(t)) return 0;
  const n = Number(t);
  return Number.isFinite(n) ? n : 0;
}

const grosze = (zl: number) => Math.round(zl * 100);

/** Paliwo z kilometrów: km × spalanie l/100 km × cena za litr. */
export function paliwoZKm(km: number, spalanie: number, cenaLitra: number): number {
  return grosze((km * spalanie * cenaLitra) / 100) / 100;
}

export function policz(p: Pola): Wynik {
  const fracht = liczba(p.fracht);
  const przychodGr = grosze(p.waluta === 'EUR' ? fracht * liczba(p.kurs) : fracht);

  const paliwo =
    p.trybPaliwa === 'km'
      ? paliwoZKm(liczba(p.km), liczba(p.spalanie), liczba(p.cenaLitra))
      : liczba(p.paliwo);
  const paliwoGr = grosze(paliwo);

  const pozostaleGr = [p.oplaty, p.diety, p.inne].reduce((s, v) => s + grosze(liczba(v)), 0);
  const kosztyGr = paliwoGr + pozostaleGr;
  const zostajeGr = przychodGr - kosztyGr;
  const km = liczba(p.km);

  return {
    przychod: przychodGr / 100,
    paliwo: paliwoGr / 100,
    koszty: kosztyGr / 100,
    zostaje: zostajeGr / 100,
    zaKm: km > 0 ? zostajeGr / 100 / km : null,
    pelny: fracht > 0 && kosztyGr > 0,
  };
}

/**
 * Polski zapis liczby: spacja (niełamliwa) co trzy cyfry, przecinek
 * dziesiętny. Bez `Intl`, bo `pl-PL` nie grupuje liczb czterocyfrowych
 * („1811,60”), a w rolce jest „1 811,60”.
 */
export function format(n: number, miejsca = 2): string {
  const [calosc, ulamek] = Math.abs(n).toFixed(miejsca).split('.');
  const grupy = calosc.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const minus = n < 0 && Number(Math.abs(n).toFixed(miejsca)) !== 0 ? '-' : '';
  return `${minus}${grupy}${ulamek ? `,${ulamek}` : ''}`;
}

export const zl = (n: number) => `${format(n)} zł`;

/** Data z API NBP (RRRR-MM-DD) w zapisie DD.MM.RRRR. */
export function dataNbp(data: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(data);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : data;
}
