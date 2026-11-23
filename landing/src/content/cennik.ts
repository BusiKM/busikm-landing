/**
 * Plany i ceny – jedno źródło.
 *
 * Wyjęte z komponentu sekcji, bo te same liczby czyta budownik danych
 * strukturalnych (`components/seo/schema.ts`), a ten działa po stronie
 * serwera. Wartość wyeksportowana z modułu oznaczonego `'use client'`
 * dociera do serwera jako odsyłacz do komponentu klienckiego, nie jako
 * tablica – stąd osobny plik.
 *
 * Rozjazd między ceną w cenniku a ceną w wyniku wyszukiwania Google zgłasza
 * jako „niezgodna cena" i odbiera wynik rozszerzony, więc te liczby muszą
 * pochodzić z jednego miejsca.
 *
 * Liczby i identyfikatory stoją raz, w `CENY` – obie wersje językowe biorą
 * je stąd, więc cena po angielsku nie może rozjechać się z polską.
 */

import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';
import type { PlanId } from '@/content/zainteresowanie';

/**
 * Stawka VAT w procentach. Jedna stała dla całej strony: zmiana stawki to
 * zmiana tej liczby, a kwoty brutto przeliczą się wszędzie same.
 */
export const VAT_PROCENT = 23;

/** Kolejny pojazd w planie Firma ponad 10 w cenie, netto miesięcznie. */
export const CENA_POJAZDU = 29;

/** Pojazdy w cenie planu Firma. */
export const POJAZDY_W_FIRMIE = 10;

/**
 * Kwota brutto z kwoty netto, zaokrąglona do grosza.
 *
 * Liczone w groszach na liczbach całkowitych, żeby 149 × 1,23 nie wyszło
 * jako 183,26999… i nie zaokrągliło się w złą stronę.
 */
export function brutto(netto: number): number {
  return Math.round(netto * (100 + VAT_PROCENT)) / 100;
}

/**
 * Kwota do pokazania: po polsku „1 490” albo „183,27”, po angielsku „1,490”
 * albo „183.27”. Tysiące rozdzielone zawsze, także przy czterech cyfrach
 * (polska norma domyślnie zostawia „1490”). Grosze tylko tam, gdzie są.
 */
export function kwota(n: number, jezyk: Jezyk, grosze = false): string {
  return new Intl.NumberFormat(jezyk === 'pl' ? 'pl-PL' : 'en-GB', {
    minimumFractionDigits: grosze ? 2 : 0,
    maximumFractionDigits: grosze ? 2 : 0,
    useGrouping: 'always',
  }).format(n);
}

/** Kwota z walutą: „183,27 zł” albo „PLN 183.27”. */
export function zWaluta(n: number, jezyk: Jezyk, grosze = false): string {
  return jezyk === 'pl' ? `${kwota(n, jezyk, grosze)} zł` : `PLN ${kwota(n, jezyk, grosze)}`;
}

/** Linia pod ceną netto: „183,27 zł brutto (z 23% VAT)”. */
export function liniaBrutto(netto: number, jezyk: Jezyk): string {
  const b = zWaluta(brutto(netto), jezyk, true);
  return jezyk === 'pl'
    ? `${b} brutto (z ${VAT_PROCENT}% VAT)`
    : `${b} gross (incl. ${VAT_PROCENT}% VAT)`;
}

/** Grupa pozycji w karcie planu, z małym nadtytułem. */
export type GrupaPlanu = {
  tytul: string;
  pozycje: readonly string[];
};

export type Plan = {
  /** Identyfikator do adresu – patrz `content/zainteresowanie.ts`. */
  id: PlanId;
  name: string;
  /**
   * Kwoty netto w złotych. Sprzedawca jest czynnym podatnikiem VAT, więc do
   * każdej faktury dolicza 23% VAT. Brutto liczy `brutto()`, nigdy nie
   * wpisujemy go ręcznie.
   */
  monthly: number;
  yearly: number;
  /** Parametry planu – w karcie jako małe pigułki pod ceną. */
  specs: readonly string[];
  /** Nagłówek listy funkcji. */
  naglowekListy: string;
  grupy: readonly GrupaPlanu[];
  highlighted: boolean;
};

/*
 * Zasada podziału (decyzja właściciela 16.11.2026, zgodna z backendem):
 * Start prowadzi całą firmę - zlecenia, trasy, kierowcy, faktury, koszty,
 * mapa floty, zysk na kursie i raporty kosztów. Księgowa ma dostęp do panelu
 * i ewidencji, ale pliki do swojego programu przygotowuje sama. Firma dokłada
 * większą flotę i wszystko, co trafia do programu księgowej. „Polecany od
 * 4 busów” to tylko rekomendacja - Firmę można wybrać przy każdej flocie.
 */
const CENY = [
  { id: 'start', monthly: 149, yearly: 1490, highlighted: false },
  { id: 'firma', monthly: 299, yearly: 2990, highlighted: true },
] as const;

/** Cena netto planu za miesiąc albo rok – dla kalkulatora i tabeli. */
export function cenaPlanu(id: PlanId, okres: 'monthly' | 'yearly'): number {
  return CENY.find((c) => c.id === id)![okres];
}

type Tekst = Pick<Plan, 'name' | 'specs' | 'naglowekListy' | 'grupy'>;

const TEKSTY: Tlumaczenia<Record<PlanId, Tekst>> = {
  pl: {
    start: {
      name: 'Start',
      specs: ['1-3 pojazdy', 'kierowcy bez limitu', 'pracownicy biura bez limitu'],
      naglowekListy: 'Cała firma w jednym miejscu',
      grupy: [
        {
          tytul: 'Zlecenia i trasy',
          pozycje: [
            'Zlecenia i dyspozytornia z czatem do każdego zlecenia',
            'Mapa floty na żywo',
            'Trasy GPS i ewidencja przebiegu w PDF (art. 86a)',
            'CMR z podpisem w aplikacji kierowcy',
          ],
        },
        {
          tytul: 'Kierowcy',
          pozycje: [
            'Aplikacja BusiKM Kierowca, działa też bez zasięgu',
            'Czas pracy i przerwy kierowców',
            'Diety i delegacje',
            'Przypomnienia o kończących się dokumentach (e-mail i push)',
          ],
        },
        {
          tytul: 'Pieniądze',
          pozycje: [
            'Faktury KSeF z przypomnieniami o płatności',
            'Koszty i paragony ze zdjęć',
            'Zysk na każdym kursie i raporty kosztów floty',
            'Dostęp dla księgowej do panelu i ewidencji przebiegu',
          ],
        },
      ],
    },
    firma: {
      name: 'Firma',
      specs: ['1-50 pojazdów', 'kierowcy bez limitu', 'pracownicy biura bez limitu'],
      naglowekListy: 'Wszystko ze Start, a do tego:',
      grupy: [
        {
          tytul: 'Większa flota',
          pozycje: ['10 pojazdów w abonamencie, kolejne po 29 zł netto, do 50'],
        },
        {
          tytul: 'Księgowość bez przepisywania',
          pozycje: [
            'Paczka dla biura jednym kliknięciem: komplet plików za miesiąc w jednym ZIP',
            'Dekrety do Comarch ERP Optima, Insert GT i Symfonii',
            'Rejestry VAT sprzedaży i zakupów w Excelu',
            'JPK_V7M po zamknięciu miesiąca',
            'Lista płac kierowców',
            'Delegacje i diety w formacie programu księgowego',
          ],
        },
      ],
    },
  },
  en: {
    start: {
      name: 'Start',
      specs: ['1-3 vehicles', 'unlimited drivers', 'unlimited office staff'],
      naglowekListy: 'Your whole company in one place',
      grupy: [
        {
          tytul: 'Orders and routes',
          pozycje: [
            'Orders and dispatch with chat per order',
            'Live fleet map',
            'GPS routes and mileage log in PDF',
            'CMR signed in the driver app',
          ],
        },
        {
          tytul: 'Drivers',
          pozycje: [
            'BusiKM Kierowca driver app, works offline',
            'Driver working time and breaks',
            'Per diems and business trips',
            'Document expiry reminders (e-mail and push)',
          ],
        },
        {
          tytul: 'Money',
          pozycje: [
            'KSeF invoices with payment reminders',
            'Costs and receipts from photos',
            'Profit per trip and fleet cost reports',
            'Accountant access to the panel and mileage logs',
          ],
        },
      ],
    },
    firma: {
      name: 'Business',
      specs: ['1-50 vehicles', 'unlimited drivers', 'unlimited office staff'],
      naglowekListy: 'Everything in Start, plus:',
      grupy: [
        {
          tytul: 'Bigger fleet',
          pozycje: ['10 vehicles included, PLN 29 net for each extra one, up to 50'],
        },
        {
          tytul: 'Accounting without retyping',
          pozycje: [
            'Monthly office pack in one ZIP',
            'Journal entries for Comarch ERP Optima, Insert GT and Symfonia',
            'VAT sales and purchase registers in Excel',
            'JPK_V7M after month close',
            'Driver payroll list',
            'Business trips in your accounting software format',
          ],
        },
      ],
    },
  },
};

function wJezyku(jezyk: Jezyk): readonly Plan[] {
  return CENY.map((c) => ({ ...c, ...TEKSTY[jezyk][c.id] }));
}

export const plans: Tlumaczenia<readonly Plan[]> = {
  pl: wJezyku('pl'),
  en: wJezyku('en'),
};
