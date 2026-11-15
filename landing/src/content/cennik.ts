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
   * Kwoty końcowe w złotych, tysiące rozdzielone spacją. MOVGRANTO jest
   * zwolniona z VAT (art. 113), więc na fakturze stoi stawka „zw.” i nie ma
   * czego doliczać.
   */
  monthly: string;
  yearly: string;
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
  { id: 'start', monthly: '149', yearly: '1 490', highlighted: false },
  { id: 'firma', monthly: '299', yearly: '2 990', highlighted: true },
] as const;

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
          pozycje: ['10 pojazdów w abonamencie, kolejne po 29 zł, do 50'],
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
          pozycje: ['10 vehicles included, PLN 29 for each extra one, up to 50'],
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
