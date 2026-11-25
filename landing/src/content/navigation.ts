import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';
import { dokumentyUslugi } from '@/content/dokumenty/uslugi';

/**
 * Nawigacja – jedno źródło dla paska, menu mobilnego i stopki.
 * Treść wg docs/landing/03-architektura-informacji.md.
 *
 * Wszystkie odnośniki są polskie – na stronie angielskiej zamienia je
 * `i18n/Link` (albo `lokalizuj`). Teksty idą w obu językach. Wyjątkiem są
 * dokumenty prawne usługi: prowadzą wprost do aplikacji (app.busikm.pl)
 * i w obu językach mają ten sam adres, bo istnieje tylko wersja polska.
 *
 * Każda pozycja niesie korzyść (`label`) i zdanie wyjaśnienia (`benefit`) –
 * nawigacja ma sprzedawać, nie wypisywać nazwy modułów.
 */

/**
 * Panel firmy: logowanie i rejestracja. Produkcja to app.busikm.pl,
 * staging ustawia `NEXT_PUBLIC_PANEL_URL=https://staging.busikm.pl`.
 * Stoi na górze pliku, bo czytają go teksty menu poniżej.
 */
export const PANEL_URL = (process.env.NEXT_PUBLIC_PANEL_URL || 'https://app.busikm.pl').replace(
  /\/$/,
  '',
);

export type NavLeaf = {
  href: string;
  label: string;
  benefit: string;
  /** Gdzie ta rola pracuje – nadtytuł na karcie w menu „Dla kogo". */
  device?: string;
};

export type NavGroup = {
  /** Nagłówek kolumny w menu – szary, wersalikami. */
  heading: string;
  items: NavLeaf[];
};

export type NavEntry =
  | { kind: 'link'; href: string; label: string }
  | {
      kind: 'mega';
      label: string;
      /**
       * Prefiks działu – służy wyłącznie do podświetlenia pozycji, gdy
       * czytelnik jest na którejś z jej podstron. Sama pozycja nigdzie
       * nie prowadzi: jest tylko wyzwalaczem menu.
       */
      href: string;
      groups: NavGroup[];
      promo?: { href: string; label: string; benefit: string };
      /** Wąskie menu w jednej kolumnie zamiast pełnej szerokości. */
      compact?: boolean;
      /** Karty zamiast listy – układ z arkusza „Dla kogo". */
      cards?: boolean;
    };

type Teksty = {
  coRobi: NavGroup[];
  dlaKogo: NavGroup[];
  menu: { coRobi: string; dlaKogo: string; cennik: string; rolki: string; pomoc: string };
  promo: { label: string; benefit: string };
  pomoc: NavLeaf[];
  rolesNote: string;
  stopka: { firma: string; prawne: string; items: NavLeaf[]; dokumenty: NavLeaf[] };
  zacznij: { demo: NavLeaf; login: NavLeaf };
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    coRobi: [
      {
        heading: 'W trasie',
        items: [
          {
            href: '/co-robi/aplikacja-kierowcy',
            label: 'Aplikacja kierowcy',
            benefit: 'Zlecenia, przerwy i koszty w jednej aplikacji',
          },
          {
            href: '/co-robi/trasy-i-mapa',
            label: 'Trasy i mapa floty',
            benefit: 'Widzisz, gdzie jest każdy bus. Bez dzwonienia',
          },
          {
            href: '/co-robi/czas-pracy',
            label: 'Czas pracy i przerwy',
            benefit: 'Wiesz, kiedy kierowca musi stanąć',
          },
          {
            href: '/co-robi/ewidencja-przebiegu',
            label: 'Ewidencja przebiegu',
            benefit: 'Kilometry z trasy, bez przepisywania licznika',
          },
        ],
      },
      {
        heading: 'W biurze',
        items: [
          {
            href: '/co-robi/dyspozytornia',
            label: 'Dyspozytornia',
            benefit: 'Cały dzień pracy na jednym ekranie',
          },
          {
            href: '/co-robi/zlecenia-i-faktury',
            label: 'Zlecenia i faktury',
            benefit: 'Ze zlecenia robi się faktura. Do KSeF jednym przyciskiem',
          },
          {
            href: '/co-robi/rentownosc',
            label: 'Ile zostaje',
            benefit: 'Zysk na każdym kursie, na bieżąco',
          },
        ],
      },
      {
        heading: 'Na koniec miesiąca',
        items: [
          {
            href: '/co-robi/koszty-i-paragony',
            label: 'Koszty i paragony',
            benefit: 'Zdjęcie zamiast reklamówki pod siedzeniem',
          },
          {
            href: '/co-robi/dane-dla-ksiegowej',
            label: 'Dane dla księgowej',
            benefit: 'Komplet dokumentów jednym przyciskiem (plan Firma)',
          },
          {
            href: '/co-robi/dokumenty-i-terminy',
            label: 'Dokumenty i terminy',
            benefit: 'Nic nie wygaśnie po cichu',
          },
          {
            href: '/co-robi/diety-i-delegacje',
            label: 'Diety i delegacje',
            benefit: 'Dni w każdym kraju liczone z trasy',
          },
        ],
      },
    ],
    dlaKogo: [
      {
        heading: 'Cztery role',
        items: [
          {
            href: '/dla-kogo/wlasciciel',
            label: 'Właściciel',
            benefit: 'Co pilne dziś, a niżej przychód, koszty i wynik',
            device: 'Przeglądarka',
          },
          {
            href: '/dla-kogo/dyspozytor',
            label: 'Dyspozytor',
            benefit: 'Zlecenia, mapa i kierowca w jednym miejscu',
            device: 'Przeglądarka',
          },
          {
            href: '/dla-kogo/ksiegowa',
            label: 'Księgowa',
            benefit: 'Komplet dokumentów jednym przyciskiem (plan Firma)',
            device: 'Przeglądarka',
          },
          {
            href: '/dla-kogo/kierowca',
            label: 'Kierowca',
            benefit: '„Zacznij dzień” i w drogę. Resztą zajmuje się telefon',
            device: 'Telefon',
          },
        ],
      },
    ],
    menu: {
      coRobi: 'Co robi',
      dlaKogo: 'Dla kogo',
      cennik: 'Cennik',
      rolki: 'Rolki',
      pomoc: 'Pomoc',
    },
    promo: {
      label: 'Zobacz demo',
      benefit: 'Wejdź bez konta i zobacz aplikację na danych przykładowej firmy.',
    },
    pomoc: [
      { href: '/pomoc', label: 'Centrum pomocy', benefit: 'Odpowiedzi na najczęstsze pytania' },
      {
        href: '/pomoc/pierwsze-kroki',
        label: 'Pierwsze kroki',
        benefit: 'Od konta do pierwszej faktury',
      },
      { href: '/kontakt', label: 'Kontakt', benefit: 'Odpisujemy tego samego dnia' },
      { href: '/status', label: 'Status usługi', benefit: 'Czy wszystko działa' },
    ],
    rolesNote:
      'W małej firmie właściciel bywa też dyspozytorem - konto właściciela widzi wszystko.',
    stopka: {
      firma: 'Firma',
      prawne: 'Prawne',
      items: [
        { href: '/program-tms-dla-busow', label: 'Program TMS dla busów', benefit: '' },
        { href: '/cennik', label: 'Cennik', benefit: '' },
        { href: '/rolki', label: 'Rolki', benefit: '' },
        { href: '/demo', label: 'Demo', benefit: '' },
        { href: '/pomoc', label: 'Pomoc', benefit: '' },
        { href: '/kontakt', label: 'Kontakt', benefit: '' },
        { href: '/status', label: 'Status usługi', benefit: '' },
      ],
      dokumenty: [
        { href: dokumentyUslugi.regulamin, label: 'Regulamin', benefit: '' },
        { href: dokumentyUslugi.prywatnosc, label: 'Polityka prywatności usługi', benefit: '' },
        { href: dokumentyUslugi.powierzenie, label: 'Umowa powierzenia', benefit: '' },
        { href: dokumentyUslugi.podprocesorzy, label: 'Podprocesorzy', benefit: '' },
        { href: dokumentyUslugi.retencja, label: 'Polityka retencji', benefit: '' },
        { href: '/prywatnosc', label: 'Polityka prywatności strony', benefit: '' },
      ],
    },
    zacznij: {
      demo: {
        href: '/demo',
        label: 'Zobacz demo',
        benefit: 'Bez konta, na danych przykładowej firmy',
      },
      login: {
        href: `${PANEL_URL}/login/`,
        label: 'Zaloguj się',
        benefit: 'Nowe konto założysz z ekranu logowania',
      },
    },
  },
  en: {
    coRobi: [
      {
        heading: 'On the road',
        items: [
          {
            href: '/co-robi/aplikacja-kierowcy',
            label: 'Driver app',
            benefit: 'Orders, breaks and costs in one app',
          },
          {
            href: '/co-robi/trasy-i-mapa',
            label: 'Routes and fleet map',
            benefit: 'See where every van is. No phone calls',
          },
          {
            href: '/co-robi/czas-pracy',
            label: 'Working time and breaks',
            benefit: 'Know when a driver has to stop',
          },
          {
            href: '/co-robi/ewidencja-przebiegu',
            label: 'Mileage log',
            benefit: 'Kilometres from the route, no odometer copying',
          },
        ],
      },
      {
        heading: 'In the office',
        items: [
          {
            href: '/co-robi/dyspozytornia',
            label: 'Dispatch',
            benefit: 'The whole working day on one screen',
          },
          {
            href: '/co-robi/zlecenia-i-faktury',
            label: 'Orders and invoices',
            benefit: 'An order turns into an invoice. Off to KSeF in one click',
          },
          {
            href: '/co-robi/rentownosc',
            label: 'What you keep',
            benefit: 'Profit on every job, as it happens',
          },
        ],
      },
      {
        heading: 'At month end',
        items: [
          {
            href: '/co-robi/koszty-i-paragony',
            label: 'Costs and receipts',
            benefit: 'A photo instead of a bag of receipts under the seat',
          },
          {
            href: '/co-robi/dane-dla-ksiegowej',
            label: 'Data for your accountant',
            benefit: 'The full document pack in one click (Business plan)',
          },
          {
            href: '/co-robi/dokumenty-i-terminy',
            label: 'Documents and deadlines',
            benefit: 'Nothing expires without you knowing',
          },
          {
            href: '/co-robi/diety-i-delegacje',
            label: 'Per diems and business trips',
            benefit: 'Days in each country counted from the route',
          },
        ],
      },
    ],
    dlaKogo: [
      {
        heading: 'Four roles',
        items: [
          {
            href: '/dla-kogo/wlasciciel',
            label: 'Owner',
            benefit: 'What’s urgent today, then revenue, costs and result',
            device: 'Browser',
          },
          {
            href: '/dla-kogo/dyspozytor',
            label: 'Dispatcher',
            benefit: 'Orders, map and drivers in one place',
            device: 'Browser',
          },
          {
            href: '/dla-kogo/ksiegowa',
            label: 'Accountant',
            benefit: 'The full document pack in one click (Business plan)',
            device: 'Browser',
          },
          {
            href: '/dla-kogo/kierowca',
            label: 'Driver',
            benefit: '“Start the day” and go. The phone handles the rest',
            device: 'Phone',
          },
        ],
      },
    ],
    menu: {
      coRobi: 'Features',
      dlaKogo: 'Who it’s for',
      cennik: 'Pricing',
      rolki: 'Reels',
      pomoc: 'Help',
    },
    promo: {
      label: 'See the demo',
      benefit: 'Walk in without an account and see the app on a sample company’s data.',
    },
    pomoc: [
      { href: '/pomoc', label: 'Help centre', benefit: 'Answers to the most common questions' },
      {
        href: '/pomoc/pierwsze-kroki',
        label: 'Getting started',
        benefit: 'From sign-up to your first invoice',
      },
      { href: '/kontakt', label: 'Contact', benefit: 'We reply the same day' },
      { href: '/status', label: 'Service status', benefit: 'Is everything working' },
    ],
    rolesNote:
      'In a small company the owner is often the dispatcher too - the owner’s account sees everything.',
    stopka: {
      firma: 'Company',
      prawne: 'Legal',
      items: [
        { href: '/program-tms-dla-busow', label: 'Van TMS', benefit: '' },
        { href: '/cennik', label: 'Pricing', benefit: '' },
        { href: '/rolki', label: 'Reels', benefit: '' },
        { href: '/demo', label: 'Demo', benefit: '' },
        { href: '/pomoc', label: 'Help', benefit: '' },
        { href: '/kontakt', label: 'Contact', benefit: '' },
        { href: '/status', label: 'Service status', benefit: '' },
      ],
      dokumenty: [
        { href: dokumentyUslugi.regulamin, label: 'Terms of Service', benefit: '' },
        { href: dokumentyUslugi.prywatnosc, label: 'Service Privacy Policy', benefit: '' },
        { href: dokumentyUslugi.powierzenie, label: 'Data Processing Agreement', benefit: '' },
        { href: dokumentyUslugi.podprocesorzy, label: 'Subprocessors', benefit: '' },
        { href: dokumentyUslugi.retencja, label: 'Retention Policy', benefit: '' },
        { href: '/prywatnosc', label: 'Website Privacy Policy', benefit: '' },
      ],
    },
    zacznij: {
      demo: {
        href: '/demo',
        label: 'See the demo',
        benefit: 'No account, on a sample company’s data',
      },
      login: {
        href: `${PANEL_URL}/login/`,
        label: 'Log in',
        benefit: 'New accounts start from the sign-in screen',
      },
    },
  },
};

/**
 * Wejście do demo w aplikacji – przykładowa firma, wybór roli przy wejściu,
 * tylko do odczytu, sesja na godzinę.
 *
 * Adres pochodzi ze zmiennej `NEXT_PUBLIC_DEMO_URL` (Vercel → Environment
 * Variables), żeby przejście demo ze stagingu na produkcję było zmianą jednej
 * wartości, bez commita. Domyślnie produkcja (app.busikm.pl). Podgląd
 * develop może wskazać demo na stagingu tą samą zmienną w Preview.
 *
 * `appLinks.demo` prowadzi prosto do aplikacji (przyciski „Zobacz demo”),
 * a pozycje menu `/demo` – na stronę landingu, która mówi, czego się
 * spodziewać, i ma ten sam przycisk.
 */
export const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || 'https://app.busikm.pl/demo/';

/**
 * Adresy aplikacji – w jednym miejscu.
 *
 * `login` prowadzi do logowania w panelu, a stamtąd jest przejście do
 * rejestracji (BKM-1858). Tak działa „Zaloguj się” w pasku i w menu.
 * `rejestracja` idzie wprost do zakładania konta: tam, gdzie czytelnik już
 * zdecydował (cennik, kalkulator, Pierwsze kroki). `/zaloguj` na landingu tylko
 * przekierowuje do panelu, żeby stare odnośniki i zakładki działały.
 *
 * `trial` prowadzi na cennik: najpierw wybór planu, potem rejestracja.
 */
export const appLinks = {
  trial: '/cennik',
  demo: DEMO_URL,
  login: `${PANEL_URL}/login/`,
  rejestracja: `${PANEL_URL}/register/`,
} as const;

/** Nawigacja w danym języku – pasek, menu mobilne i stopka. */
export function nawigacja(jezyk: Jezyk) {
  const t = TEKSTY[jezyk];

  const navigation: NavEntry[] = [
    {
      kind: 'mega',
      label: t.menu.coRobi,
      href: '/co-robi',
      groups: t.coRobi,
      promo: { href: appLinks.demo, ...t.promo },
    },
    { kind: 'mega', label: t.menu.dlaKogo, href: '/dla-kogo', groups: t.dlaKogo, cards: true },
    { kind: 'link', href: '/cennik', label: t.menu.cennik },
    // Rolki mówią po polsku – po angielsku prowadzi do nich tylko stopka.
    ...(jezyk === 'pl' ? [{ kind: 'link' as const, href: '/rolki', label: t.menu.rolki }] : []),
    {
      kind: 'mega',
      label: t.menu.pomoc,
      href: '/pomoc',
      compact: true,
      groups: [{ heading: t.menu.pomoc, items: t.pomoc }],
    },
  ];

  return {
    coRobi: t.coRobi,
    dlaKogo: t.dlaKogo,
    navigation,
    /** Nota pod menu „Dla kogo" – role są zbiorem, nie wyborem. */
    rolesNote: t.rolesNote,
    /**
     * Dwa wezwania przypięte do dołu menu na telefonie: demo dla nowych,
     * logowanie dla tych, którzy już mają konto.
     */
    menuStart: { demo: t.zacznij.demo, login: t.zacznij.login },
    /** Kolumny stopki – bez dokumentów prawnych, te mają własny pasek na dole. */
    kolumnyStopki: [
      { heading: t.menu.coRobi, items: t.coRobi.flatMap((g) => g.items) },
      { heading: t.menu.dlaKogo, items: t.dlaKogo[0].items },
      { heading: t.stopka.firma, items: t.stopka.items },
    ],
    dokumenty: t.stopka.dokumenty,
  };
}
