/**
 * Dane dla wyszukiwarek – jedno źródło.
 *
 * Wszystko, co dotyczy widoczności strony w Google, wychodzi stąd: adresy
 * kanoniczne, mapa strony, dane strukturalne i metadane podstron. Jeżeli
 * dochodzi nowa podstrona, dopisujesz ją w `trasy` – inaczej nie trafi
 * do `sitemap.xml`.
 */

import { artykuly } from '@/content/pomoc';
import type { Tlumaczenia } from '@/i18n/jezyki';

/** Adres produkcyjny. Kanoniczne adresy i mapa strony budują się na nim. */
export const serwis = {
  url: 'https://busikm.pl',
  nazwa: 'BusiKM',
  /** Obraz do podglądu w mediach społecznościowych – w `public/`. */
  ogImage: '/og-image/og-image.jpg',
  /** Znak firmowy dla danych strukturalnych. Google woli rastrowy, kwadratowy. */
  logo: '/web-app-manifest-512x512.png',
} as const;

/**
 * Tytuł i opis strony głównej w obu językach.
 *
 * `tytul` to tytuł w wyniku wyszukiwania. Nie jest to hasło z nagłówka.
 * Nagłówek „Kierowca jedzie. Reszta dzieje się sama." sprzedaje komuś, kto
 * już jest na stronie – ale nie zawiera ani jednego słowa, które ktoś wpisuje
 * w Google. Tytuł prowadzi frazą, której szuka właściciel firmy transportowej,
 * i dopiero potem podaje markę.
 *
 * `opisOg` to krótsza wersja do podglądu w mediach społecznościowych. Wersja
 * dla Google ma 150 znaków i gubi na telefonie końcówkę o demo – czyli
 * jedyne wezwanie do działania w całym podglądzie. Dopóki rejestracja jest
 * zamknięta, 14 dni bez opłat pada wyłącznie jako przyszłość („od otwarcia
 * kont"), nie jako oferta na dziś.
 */
export const opisSerwisu: Tlumaczenia<{ tytul: string; opis: string; opisOg: string }> = {
  pl: {
    tytul: 'Program dla firmy transportowej z busami do 3,5 t | BusiKM',
    opis:
      'Program TMS dla busów 2,5-3,5 t: zlecenia, faktury KSeF, ewidencja przebiegu, czas pracy kierowcy i diety w jednym miejscu. Od 149 zł netto miesięcznie.',
    opisOg:
      'Zlecenia, faktury KSeF, ewidencja przebiegu i czas pracy kierowców w jednym programie. Dla busów 2,5-3,5 t. Demo bez konta, 14 dni bez opłat.',
  },
  en: {
    tytul: 'Software for transport companies running vans | BusiKM',
    opis:
      'A TMS for 2.5-3.5 t vans: orders, KSeF invoices, mileage log, driver working time and per diems in one place. From PLN 149 net a month.',
    opisOg:
      'Orders, KSeF invoices, mileage log and driver working time in one app. For 2.5-3.5 t vans. Demo with no account, 14 days free.',
  },
};

/**
 * Data ostatniej zmiany treści – trafia do `sitemap.xml` jako `lastmod`.
 *
 * Trzymana ręcznie, bo alternatywy kłamią: data budowania zmienia się przy
 * każdym wdrożeniu, a czas pliku po `git clone` na Vercelu jest czasem
 * klonowania, nie edycji. Google ignoruje `lastmod`, któremu przestaje ufać,
 * więc lepiej mieć datę rzadszą i prawdziwą.
 *
 * Aktualizuj przy istotnej zmianie treści strony – nie przy poprawce literówki.
 */
const ZMIENIONO = '2026-09-03';

/** Dzień, w którym weszły podstrony pod frazy (TMS, ewidencja, diety) i poradniki. */
const NOWE = '2026-11-15';

/** Poradniki o przepisach w centrum pomocy – dostają datę wejścia, nie ogólną. */
const PORADNIKI = ['ksef-dla-przewoznika-2027', 'tachograf-w-busie-od-lipca-2026'];

export type Priorytet = 0.2 | 0.3 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
export type Czestotliwosc = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type Trasa = {
  /** Ścieżka od korzenia, bez ukośnika na końcu. Strona główna to `''`. */
  sciezka: string;
  priorytet: Priorytet;
  czestotliwosc: Czestotliwosc;
  zmieniono?: string;
};

/**
 * Strony wystawione wyszukiwarkom. Kolejność jest kolejnością w `sitemap.xml`
 * – od najważniejszej.
 */
export const trasy: Trasa[] = [
  { sciezka: '', priorytet: 1, czestotliwosc: 'weekly' },

  { sciezka: '/cennik', priorytet: 0.9, czestotliwosc: 'monthly' },
  { sciezka: '/program-tms-dla-busow', priorytet: 0.9, czestotliwosc: 'monthly', zmieniono: NOWE },
  { sciezka: '/demo', priorytet: 0.8, czestotliwosc: 'monthly' },

  { sciezka: '/co-robi/aplikacja-kierowcy', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/dyspozytornia', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/trasy-i-mapa', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/czas-pracy', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/zlecenia-i-faktury', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/koszty-i-paragony', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/rentownosc', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/dane-dla-ksiegowej', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/dokumenty-i-terminy', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/ewidencja-przebiegu', priorytet: 0.8, czestotliwosc: 'monthly', zmieniono: NOWE },
  { sciezka: '/co-robi/diety-i-delegacje', priorytet: 0.8, czestotliwosc: 'monthly', zmieniono: NOWE },

  { sciezka: '/dla-kogo', priorytet: 0.7, czestotliwosc: 'monthly', zmieniono: NOWE },
  { sciezka: '/dla-kogo/wlasciciel', priorytet: 0.7, czestotliwosc: 'monthly' },
  { sciezka: '/dla-kogo/dyspozytor', priorytet: 0.7, czestotliwosc: 'monthly' },
  { sciezka: '/dla-kogo/ksiegowa', priorytet: 0.7, czestotliwosc: 'monthly' },
  { sciezka: '/dla-kogo/kierowca', priorytet: 0.7, czestotliwosc: 'monthly' },

  // Rolka prawie codziennie, stąd częstotliwość i data z dnia uruchomienia.
  { sciezka: '/rolki', priorytet: 0.6, czestotliwosc: 'daily', zmieniono: '2026-11-06' },

  { sciezka: '/pomoc', priorytet: 0.6, czestotliwosc: 'monthly' },
  { sciezka: '/pomoc/pierwsze-kroki', priorytet: 0.6, czestotliwosc: 'monthly' },
  // Artykuły pomocy dopisują się same. Wypisywanie ich tutaj znaczyłoby, że
  // nowa instrukcja trafia do serwisu, ale nie do mapy strony – i nikt tego
  // nie zauważy, bo strona działa.
  ...artykuly.map(
    (a): Trasa => ({
      sciezka: `/pomoc/${a.slug}`,
      priorytet: 0.5,
      czestotliwosc: 'monthly',
      zmieniono: PORADNIKI.includes(a.slug) ? NOWE : undefined,
    }),
  ),
  { sciezka: '/kontakt', priorytet: 0.5, czestotliwosc: 'yearly' },

  {
    sciezka: '/prywatnosc',
    priorytet: 0.2,
    czestotliwosc: 'yearly',
    // Polityka zawężona do samej strony busikm.pl (BKM-2787).
    zmieniono: '2026-10-25',
  },
];

export const dataZmiany = (t: Trasa) => new Date(t.zmieniono ?? ZMIENIONO);

/**
 * Strony wyłączone z indeksu.
 *
 * `/dla-kogo` była tu, dopóki była szkieletem z jednym zdaniem. Dziś ma
 * własną treść (cztery role z opisem i odnośnikami), więc stoi w `trasy`.
 *
 * `/zaloguj` to formularz zapisu na listę, a `/status` – stan usługi, który
 * zmienia się z godziny na godzinę. Żadna z nich nie odpowiada na pytanie
 * zadane w wyszukiwarce, a obie rozmywają ocenę serwisu. Dlatego nie ma ich
 * też w `trasy` – mapa strony nie może wskazywać adresu, którego zabraniamy
 * indeksować.
 */
export const nieindeksowane = ['/zaloguj', '/status'];

/**
 * Ścieżki, których roboty nie mają po co odwiedzać.
 *
 * Świadomie **nie ma tu `/_next/`**. Google renderuje stronę tak jak
 * przeglądarka i potrzebuje do tego skryptów oraz arkuszy – zablokowanie
 * katalogu z zasobami to klasyczny sposób na to, żeby robot zobaczył
 * pustą stronę zamiast treści.
 */
export const zablokowane = ['/api/'];
