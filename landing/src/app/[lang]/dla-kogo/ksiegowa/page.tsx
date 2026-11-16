import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { HeroRoli } from '@/components/ui/HeroRoli';
import { ScenaDnia } from '@/components/ui/ScenaDnia';
import { PrzekreslonaLista } from '@/components/ui/PrzekreslonaLista';
import { ZakresRoli, type KolumnaZakresu } from '@/components/ui/ZakresRoli';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { miesiacKsiegowej } from '@/components/pages/ksiegowa-rola/miesiac';

export const generateMetadata = metadataPodstrony('dla-kogo/ksiegowa');

type Tresc = {
  nadtytul: string;
  tytul: string;
  lead: string;
  osNaglowek: string;
  nieRobisz: string[];
  zakres: { naglowek: string; kolumny: [KolumnaZakresu, KolumnaZakresu]; nota: string };
  pytaniaNaglowek: string;
  pytania: [string, string][];
};

const TEKSTY: Tlumaczenia<Tresc> = {
  pl: {
    nadtytul: 'Dokumenty dla księgowej firmy transportowej',
    tytul: 'Koniec miesiąca w jednym kliknięciu.',
    lead: 'Dane wpadają przez cały miesiąc. Ty wybierasz miesiąc, klikasz „Pobierz paczkę dla biura” i masz komplet w formacie swojego programu (plan Firma).',
    osNaglowek: 'Twój miesiąc z BusiKM.',
    nieRobisz: [
      'prosisz o brakujące paragony',
      'przepisujesz delegacje z kartek',
      'przeliczasz waluty ręcznie',
      'sprawdzasz, czy ktoś nie zmienił danych wstecz',
      'dzwonisz po kursy z tabeli',
    ],
    zakres: {
      naglowek: 'Co robisz, a czego nie zmieniasz.',
      kolumny: [
        {
          nadtytul: 'Robisz',
          pozycje: ['Faktury, korekty i wpłaty', 'Koszty i przebieg', 'Płace, diety i delegacje', 'Zamknięcie miesiąca'],
          tresc: 'Wszystko za wybrany okres.',
        },
        {
          nadtytul: 'Nie zmieniasz',
          pozycje: ['Zleceń i tras', 'Mapy floty'],
          tresc: 'Widzisz je, ale prowadzi je dyspozytor.',
          przygaszona: true,
        },
      ],
      nota: 'Pracujesz w firmie albo obsługujesz ją z zewnątrz - dostajesz zaproszenie mailem i własny dostęp. Każda firma zaprasza Cię osobno. Paczka dla biura, dekrety FK, rejestry VAT, JPK_V7M i lista płac są w planie Firma. W planie Start masz dostęp do panelu i ewidencji przebiegu, a pliki do programu przygotowujesz sama. Plan Firma firma wybierze przy dowolnej liczbie busów.',
    },
    pytaniaNaglowek: 'Trzy pytania',
    pytania: [
      [
        'Czy będę musiała się przestawiać?',
        'Nie. W planie Firma pobierasz gotowy plik i wczytujesz go do programu, którego już używasz.',
      ],
      [
        'Obsługuję dziewięć firm. Jak to wygląda?',
        'Każda firma zaprasza Cię osobno, mailem, i w każdej masz własny dostęp. W BusiKM jedno konto to jedna firma.',
      ],
      [
        'Co, gdy w danych czegoś brakuje?',
        'Zobaczysz to przed pobraniem, w sześciu krokach miesiąca. Przy każdym braku masz odnośnik prosto do miejsca, w którym go uzupełnisz.',
      ],
    ],
  },
  en: {
    nadtytul: 'Documents for a transport company’s accountant',
    tytul: 'Month-end in one click.',
    lead: 'Data comes in all month. You pick the month, click “Download the package for the office” and have everything in your accounting software’s format (Business plan).',
    osNaglowek: 'Your month with BusiKM.',
    nieRobisz: [
      'chase missing receipts',
      'copy business trips off scraps of paper',
      'convert currencies by hand',
      'check nobody has changed past data',
      'phone round for exchange rates',
    ],
    zakres: {
      naglowek: 'What you do, and what you don’t change.',
      kolumny: [
        {
          nadtytul: 'You handle',
          pozycje: ['Invoices, corrections and payments', 'Costs and mileage', 'Payroll, allowances and business trips', 'Month-end close'],
          tresc: 'Everything for the period you choose.',
        },
        {
          nadtytul: 'You don’t change',
          pozycje: ['Orders and routes', 'The fleet map'],
          tresc: 'You can see them, but the dispatcher runs them.',
          przygaszona: true,
        },
      ],
      nota: 'Whether you work in the company or look after it from outside, you get an email invitation and your own access. Each company invites you separately. The office pack, journal entries, VAT registers, JPK_V7M and the payroll list are in the Business plan. In the Start plan you have access to the panel and mileage logs, and prepare the files for your software yourself. A company can choose the Business plan for any fleet size.',
    },
    pytaniaNaglowek: 'Three questions',
    pytania: [
      [
        'Will I have to change how I work?',
        'No. In the Business plan you download a ready file and import it into the software you already use.',
      ],
      [
        'I look after nine companies. How does that work?',
        'Each company invites you separately by email, and you get your own access in each. In BusiKM, one account is one company.',
      ],
      [
        'What if something is missing from the data?',
        'You’ll see it before you download, in the six month-end steps. Every gap comes with a link straight to where you fill it in.',
      ],
    ],
  },
};

/**
 * Księgowa – strona roli wg projektu „BusiKM Dla księgowej" z Claude Design
 * (design/13-ksiegowa). Treść: docs/landing/05, rozdział B3.
 *
 * Rytm inny niż na pozostałych stronach ról: oś jest miesięczna, nie godzinowa.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <>
      <Header />
      <main>
        <HeroRoli nadtytul={t.nadtytul} tytul={t.tytul} lead={t.lead} />
        <ScenaDnia naglowek={t.osNaglowek} momenty={miesiacKsiegowej[jezyk]} urzadzenie="laptop" />
        <PrzekreslonaLista rzeczy={t.nieRobisz} />
        <ZakresRoli
          naglowek={t.zakres.naglowek}
          kolumny={t.zakres.kolumny}
          nota={t.zakres.nota}
        />
        <Akordeon heading={t.pytaniaNaglowek} items={t.pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
