import Link from '@/i18n/Link';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { MapaFloty } from '@/components/mockups/MapaFloty';
import { StronaFrazy, type TrescFrazy } from '@/components/pages/frazy/StronaFrazy';
import { plans } from '@/content/cennik';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';

export const generateMetadata = metadataPodstrony('program-tms-dla-busow');

/**
 * Program TMS dla busów – strona zbiorcza pod zapytania ogólne: „program
 * dla firmy transportowej", „program TMS dla busów", „system do zarządzania
 * transportem".
 *
 * Prowadzi do każdej podstrony `/co-robi/*` i do cennika. Ceny bierze
 * z `content/cennik.ts`, żeby nie rozjechały się z cennikiem i z danymi
 * strukturalnymi. Porównanie z systemami dla ciężarówek jest bez nazw
 * i bez liczb – mówi tylko o tym, jak BusiKM jest zbudowany.
 */
function tresc(jezyk: Jezyk): TrescFrazy {
  const m = TEKSTY[jezyk];
  const p = plans[jezyk];
  const start = p.find((x) => x.id === 'start')!;
  const firma = p.find((x) => x.id === 'firma')!;
  const mapa = (
    <MockupSlot file="mockup-mapa-flota-desktop.png" label={m.label} note={m.note} ratio="16:10">
      <MapaFloty />
    </MockupSlot>
  );

  if (jezyk === 'en') {
    return {
      sekcje: [
        {
          naglowek: 'Who this TMS is for',
          akapity: [
            'For transport companies running 2.5-3.5 t vans, at home and abroad. From one owner who drives and does the paperwork in the evening, to a company with a dispatcher, a dozen drivers and an outside accountant. Trailers and semi-trailers don’t count towards the plan, so a van with a trailer is still one vehicle.',
            <>
              Each of the four people sees their own part: the{' '}
              <Link href="/dla-kogo/wlasciciel">owner</Link> and the{' '}
              <Link href="/dla-kogo/dyspozytor">dispatcher</Link> in the browser, the{' '}
              <Link href="/dla-kogo/ksiegowa">accountant</Link> in the browser with their own
              access, the <Link href="/dla-kogo/kierowca">driver</Link> on the phone. In a small
              company the owner is often the dispatcher too, and the owner’s account sees
              everything.
            </>,
          ],
        },
        {
          naglowek: 'What the van TMS does: on the road',
          akapity: [
            <>
              The driver works in the <Link href="/co-robi/aplikacja-kierowcy">BusiKM Kierowca
              app</Link> on iPhone or Android: orders, navigation in Apple Maps, Google Maps or
              Waze, costs from a receipt photo, breaks logged even without signal.
            </>,
            <>
              The route records from the driver’s phone, so you see{' '}
              <Link href="/co-robi/trasy-i-mapa">where every van is</Link> without fitting a tracker.{' '}
              <Link href="/co-robi/czas-pracy">Working time</Link> counts itself: driving, breaks and
              rest, with a reminder before the break is due. From the same route come the{' '}
              <Link href="/co-robi/ewidencja-przebiegu">mileage log</Link> and the days in each
              country for <Link href="/co-robi/diety-i-delegacje">per diems</Link>.
            </>,
          ],
          makieta: mapa,
        },
        {
          naglowek: 'What the van TMS does: in the office',
          akapity: [
            <>
              <Link href="/co-robi/dyspozytornia">Dispatch</Link> puts the order queue and the fleet
              map on one screen. The system orders the stops and works out the time, and a route
              change reaches the driver straight away.
            </>,
            <>
              The order becomes the invoice: <Link href="/co-robi/zlecenia-i-faktury">one button
              sends it to KSeF</Link>, and the client gets a PDF with a QR code once KSeF assigns
              the number. The driver adds{' '}
              <Link href="/co-robi/koszty-i-paragony">costs and receipts</Link> on the road, so{' '}
              <Link href="/co-robi/rentownosc">what you keep</Link> on each job is visible as it
              happens, not at the end of the quarter.
            </>,
          ],
        },
        {
          naglowek: 'What the van TMS does: at month end',
          akapity: [
            <>
              Your accountant picks the month and downloads the{' '}
              <Link href="/co-robi/dane-dla-ksiegowej">office pack</Link>: accounting entries for
              Comarch Optima, Insert GT or Symfonia, VAT registers, payroll and per diems, business
              trips and mileage logs (Business plan). The system says what’s missing before the month
              is closed.
            </>,
            <>
              Insurance, inspections, driving licences, medicals and the tachograph sit in{' '}
              <Link href="/co-robi/dokumenty-i-terminy">documents and deadlines</Link>, with a
              reminder well before anything expires.
            </>,
          ],
        },
        {
          naglowek: 'A day in a van company with BusiKM',
          akapity: [
            'In the morning the dispatcher assigns an order to a driver and a vehicle. The driver sees it in the app, opens navigation with one tap and sets off. When the client asks where the load is, you check the map instead of calling the driver, and the client can see the arrival time on the tracking page.',
            'If the client changes the unloading address mid-run, you change the route and the driver gets it straight away. At the fuel station the driver takes a photo of the receipt and picks the order. After unloading the order becomes an invoice and goes to KSeF. In the evening nobody copies anything into a spreadsheet.',
          ],
        },
        {
          naglowek: 'One account instead of four',
          akapity: [
            'Instead of a tracker, working time software, a separate system for orders and invoices and a spreadsheet you keep yourself, you have one account and one invoice for the subscription. The data doesn’t need moving between programs, because the order, the route, the cost and the invoice are the same record.',
          ],
        },
        {
          naglowek: 'How a van TMS differs from a TMS for lorries',
          akapity: [
            'BusiKM was built for 2.5-3.5 t vans from the start, not cut down from a system for lorries. You can see it in a few places:',
          ],
          punkty: [
            'GPS from the driver’s phone, with no tracker to fit',
            'You pay for vehicles, not people: drivers and office are unlimited',
            'Trailers don’t count towards the plan',
            'No rollout, training or meeting with a salesperson',
            'Per diems, mileage log and KSeF invoices in the same place as the orders',
            'The tachograph records, BusiKM shows the driver how much longer they can drive',
          ],
        },
        {
          naglowek: 'Pricing: from PLN 149 a month',
          akapity: [
            <>
              {start.name}: PLN {start.monthly} a month for up to 3 vehicles. {firma.name}: PLN{' '}
              {firma.monthly} a month with 10 vehicles included, PLN 29 a month for each additional
              one, up to 50. Paying yearly, two months are free: PLN {start.yearly} or PLN{' '}
              {firma.yearly}.
            </>,
            <>
              These are final prices: MOVGRANTO is VAT-exempt, so there’s nothing to add. Start runs
              the whole company, including the live fleet map, profit per trip and fleet cost
              reports. The Business plan adds a bigger fleet and files for your accountant’s
              software: the monthly office pack, journal entries, VAT registers, JPK_V7M and the
              payroll list. You can choose it for any fleet size. Full comparison on the{' '}
              <Link href="/cennik">pricing page</Link>.
            </>,
          ],
        },
        {
          naglowek: 'Your data stays yours',
          akapity: [
            'Servers in Europe, in Frankfurt. A daily encrypted backup with a second provider. You can see who changed what and when, and once a month is closed nobody changes invoices, routes or payroll after the fact. The owner’s account can be protected with a code from the phone at sign-in.',
            'You can cancel at any time, with no fixed-term contract. After you cancel, the account stays read-only: you download invoices, mileage logs, summaries and exports in files you can open without us.',
          ],
        },
        {
          naglowek: 'The first route on day one',
          akapity: [
            'You add a vehicle, invite a driver, and the driver gets a code by email, enters it in the app and sets a password. The first route shows up at your end the same day. You load your clients from a CSV file instead of retyping them. The office works in the browser, so there’s nothing to install on the computer, and the driver installs the app on their phone themselves.',
            <>
              Rules for vans are changing too. Read what changes{' '}
              <Link href="/pomoc/ksef-dla-przewoznika-2027">with KSeF from 1 January 2027</Link>{' '}
              and{' '}
              <Link href="/pomoc/tachograf-w-busie-od-lipca-2026">
                with the tachograph in vans from 1 July 2026
              </Link>
              .
            </>,
          ],
        },
      ],
      odnosniki: {
        naglowek: 'Read next',
        pozycje: [
          {
            href: '/cennik',
            tytul: 'Pricing',
            opis: 'What you’ll pay for your number of vehicles.',
          },
          {
            href: '/demo',
            tytul: 'Demo',
            opis: 'A sample company, no account, read-only.',
          },
          {
            href: '/pomoc/pierwsze-kroki',
            tytul: 'Getting started',
            opis: 'From creating an account to your first invoice.',
          },
          {
            href: '/pomoc/ksef-dla-przewoznika-2027',
            tytul: 'KSeF for carriers',
            opis: 'What changes from 1 January 2027.',
          },
          {
            href: '/pomoc/tachograf-w-busie-od-lipca-2026',
            tytul: 'Tachograph in vans',
            opis: 'What applies to 2.5-3.5 t vans from 1 July 2026.',
          },
          {
            href: '/kontakt',
            tytul: 'Contact',
            opis: 'Ask whether BusiKM handles your case.',
          },
        ],
      },
      pytania: {
        naglowek: 'Questions about the van TMS',
        pozycje: [
          [
            'Is it only for international transport?',
            'No. Domestic companies use orders, invoices, the mileage log and the working time summary just the same. International jobs add the EU driving counters and per diems abroad.',
          ],
          [
            'Do I need a tracker in every van?',
            'No. The position comes from the driver’s phone and the BusiKM Kierowca app.',
          ],
          [
            'Does BusiKM replace the tachograph?',
            'No. The tachograph records and is required by law. BusiKM shows the driver on the phone how much longer they can drive and reminds them about the break.',
          ],
          [
            'Can I try it before I pay?',
            'Yes. The demo works now, without an account. When accounts open, the first 14 days are free.',
          ],
        ],
      },
    };
  }

  return {
    sekcje: [
      {
        naglowek: 'Dla kogo jest ten program TMS',
        akapity: [
          'Dla firm transportowych z busami 2,5-3,5 t, w kraju i za granicą. Od jednego właściciela, który jeździ, a wieczorem robi papiery, po firmę z dyspozytorem, kilkunastoma kierowcami i księgową z zewnątrz. Przyczepy i naczepy nie liczą się do abonamentu, więc bus z przyczepą to nadal jeden pojazd.',
          <>
            Każda z czterech osób widzi swoje:{' '}
            <Link href="/dla-kogo/wlasciciel">właściciel</Link> i{' '}
            <Link href="/dla-kogo/dyspozytor">dyspozytor</Link> w przeglądarce,{' '}
            <Link href="/dla-kogo/ksiegowa">księgowa</Link> w przeglądarce z własnym dostępem,{' '}
            <Link href="/dla-kogo/kierowca">kierowca</Link> w telefonie. W małej firmie właściciel
            bywa też dyspozytorem, a konto właściciela widzi wszystko.
          </>,
        ],
      },
      {
        naglowek: 'Co robi program TMS dla busów: w trasie',
        akapity: [
          <>
            Kierowca pracuje w aplikacji{' '}
            <Link href="/co-robi/aplikacja-kierowcy">BusiKM Kierowca</Link> na iPhone albo
            Androida: zlecenia, nawigacja w Apple Maps, Google Maps albo Waze, koszt ze zdjęcia
            paragonu, przerwy zapisane nawet bez zasięgu.
          </>,
          <>
            Trasa zapisuje się z telefonu kierowcy, więc{' '}
            <Link href="/co-robi/trasy-i-mapa">widzisz, gdzie jest każdy bus</Link>, bez
            montowania lokalizatora. <Link href="/co-robi/czas-pracy">Czas pracy</Link> liczy się
            sam: jazda, przerwy i odpoczynki, z przypomnieniem przed przerwą. Z tej samej trasy
            powstaje <Link href="/co-robi/ewidencja-przebiegu">ewidencja przebiegu</Link> i dni
            w każdym kraju do <Link href="/co-robi/diety-i-delegacje">diet</Link>.
          </>,
        ],
        makieta: mapa,
      },
      {
        naglowek: 'Co robi program TMS dla busów: w biurze',
        akapity: [
          <>
            <Link href="/co-robi/dyspozytornia">Dyspozytornia</Link> to kolejka zleceń i mapa
            floty na jednym ekranie. System ustawia kolejność postojów i liczy czas, a zmiana trasy
            trafia do kierowcy od razu.
          </>,
          <>
            Ze zlecenia robi się faktura:{' '}
            <Link href="/co-robi/zlecenia-i-faktury">jednym przyciskiem idzie do KSeF</Link>,
            a klient dostaje PDF z kodem QR, gdy KSeF nada numer. Kierowca dodaje{' '}
            <Link href="/co-robi/koszty-i-paragony">koszty i paragony</Link> w trasie, więc{' '}
            <Link href="/co-robi/rentownosc">ile zostaje</Link> z każdego kursu widać na bieżąco,
            nie po kwartale.
          </>,
        ],
      },
      {
        naglowek: 'Co robi program TMS dla busów: na koniec miesiąca',
        akapity: [
          <>
            Księgowa wybiera miesiąc i pobiera{' '}
            <Link href="/co-robi/dane-dla-ksiegowej">paczkę dla biura</Link>: dekrety do Comarch
            Optima, Insert GT albo Symfonii, rejestry VAT, płace i diety, delegacje i ewidencje
            przebiegu (plan Firma). System sam mówi, czego brakuje, zanim miesiąc zostanie
            zamknięty.
          </>,
          <>
            Ubezpieczenia, przeglądy, prawa jazdy, badania i tachograf siedzą w{' '}
            <Link href="/co-robi/dokumenty-i-terminy">dokumentach i terminach</Link>,
            z przypomnieniem na długo przed tym, zanim coś wygaśnie.
          </>,
        ],
      },
      {
        naglowek: 'Dzień w firmie z busami z BusiKM',
        akapity: [
          'Rano dyspozytor przypisuje zlecenie kierowcy i pojazdowi. Kierowca widzi je w aplikacji, otwiera nawigację jednym dotknięciem i rusza. Gdy klient pyta, gdzie jest ładunek, sprawdzasz mapę zamiast dzwonić do kierowcy, a klient widzi godzinę dojazdu na stronie śledzenia.',
          'Gdy klient zmieni adres rozładunku w trakcie kursu, zmieniasz trasę, a kierowca dostaje ją od razu. Na stacji kierowca robi zdjęcie paragonu i wybiera zlecenie. Po rozładunku ze zlecenia robi się faktura i idzie do KSeF. Wieczorem nikt niczego nie przepisuje do arkusza.',
        ],
      },
      {
        naglowek: 'Jedno konto zamiast czterech',
        akapity: [
          'Zamiast lokalizatora, programu do czasu pracy, osobnego systemu do zleceń i faktur oraz arkusza prowadzonego samemu masz jedno konto i jedną fakturę za abonament. Danych nie trzeba przenosić między programami, bo zlecenie, trasa, koszt i faktura to ten sam zapis.',
        ],
      },
      {
        naglowek: 'Czym różni się od TMS-u dla ciężarówek',
        akapity: [
          'BusiKM od początku powstawał pod busy 2,5-3,5 t, a nie jako okrojona wersja systemu dla tirów. Widać to w kilku miejscach:',
        ],
        punkty: [
          'GPS z telefonu kierowcy, bez montowania lokalizatora',
          'Płacisz za pojazdy, nie za ludzi: kierowcy i biuro bez limitu',
          'Przyczepy nie liczą się do abonamentu',
          'Bez wdrożenia, szkolenia i spotkania z handlowcem',
          'Diety, ewidencja przebiegu i faktury KSeF w tym samym miejscu co zlecenia',
          'Tachograf zapisuje, BusiKM pokazuje kierowcy, ile jeszcze może jechać',
        ],
      },
      {
        naglowek: 'Cennik: od 149 zł miesięcznie',
        akapity: [
          <>
            {start.name}: {start.monthly} zł miesięcznie, do 3 pojazdów. {firma.name}:{' '}
            {firma.monthly} zł miesięcznie, 10 pojazdów w cenie, 29 zł miesięcznie za każdy
            kolejny, do 50. Przy płatności rocznej dwa miesiące gratis: {start.yearly} zł albo{' '}
            {firma.yearly} zł.
          </>,
          <>
            To ceny końcowe: MOVGRANTO jest zwolniona z VAT, więc nie ma czego doliczać. Start
            prowadzi całą firmę, łącznie z mapą floty na żywo, zyskiem na kursie i raportami
            kosztów floty. Plan Firma dokłada większą flotę i pliki do programu księgowej: paczkę
            dla biura, dekrety, rejestry VAT, JPK_V7M i listę płac. Wybierzesz go przy dowolnej
            liczbie busów. Pełne porównanie w{' '}
            <Link href="/cennik">cenniku</Link>.
          </>,
        ],
      },
      {
        naglowek: 'Twoje dane zostają Twoje',
        akapity: [
          'Serwery w Europie, we Frankfurcie. Kopia codziennie, zaszyfrowana, u drugiego dostawcy. Widać, kto co zmienił i kiedy, a po zamknięciu miesiąca nikt nie zmienia wstecz faktur, tras ani płac. Konto właściciela zabezpieczysz kodem z telefonu przy logowaniu.',
          'Rezygnujesz w dowolnej chwili, bez umowy na czas określony. Po rezygnacji konto zostaje do odczytu: pobierasz faktury, ewidencje przebiegu, zestawienia i eksporty w plikach, które otworzysz bez nas.',
        ],
      },
      {
        naglowek: 'Pierwsza trasa pierwszego dnia',
        akapity: [
          'Dodajesz pojazd, zapraszasz kierowcę, a kierowca dostaje kod mailem, wpisuje go w aplikacji i ustawia hasło. Pierwsza trasa pojawia się u Ciebie tego samego dnia. Klientów wczytasz z pliku CSV, zamiast przepisywać kartotekę. Biuro pracuje w przeglądarce, więc niczego nie instalujesz na komputerze, a kierowca sam instaluje aplikację na telefonie.',
          <>
            Przepisy dla busów też się zmieniają. Przeczytaj, co się zmienia{' '}
            <Link href="/pomoc/ksef-dla-przewoznika-2027">z KSeF od 1 stycznia 2027</Link>{' '}
            i{' '}
            <Link href="/pomoc/tachograf-w-busie-od-lipca-2026">
              z tachografem w busie od 1 lipca 2026
            </Link>
            .
          </>,
        ],
      },
    ],
    odnosniki: {
      naglowek: 'Przeczytaj też',
      pozycje: [
        {
          href: '/cennik',
          tytul: 'Cennik',
          opis: 'Ile zapłacisz przy swojej liczbie pojazdów.',
        },
        {
          href: '/demo',
          tytul: 'Demo',
          opis: 'Przykładowa firma, bez konta, tylko do odczytu.',
        },
        {
          href: '/pomoc/pierwsze-kroki',
          tytul: 'Pierwsze kroki',
          opis: 'Od założenia konta do pierwszej faktury.',
        },
        {
          href: '/pomoc/ksef-dla-przewoznika-2027',
          tytul: 'KSeF dla przewoźnika',
          opis: 'Co się zmienia od 1 stycznia 2027.',
        },
        {
          href: '/pomoc/tachograf-w-busie-od-lipca-2026',
          tytul: 'Tachograf w busie',
          opis: 'Co obowiązuje busy 2,5-3,5 t od 1 lipca 2026.',
        },
        {
          href: '/kontakt',
          tytul: 'Kontakt',
          opis: 'Zapytaj, czy BusiKM poradzi sobie z Twoim przypadkiem.',
        },
      ],
    },
    pytania: {
      naglowek: 'Pytania o program TMS dla busów',
      pozycje: [
        [
          'Czy to tylko dla transportu międzynarodowego?',
          'Nie. Firmy krajowe tak samo korzystają ze zleceń, faktur, ewidencji przebiegu i podsumowania czasu pracy. Przy kursach za granicę dochodzą liczniki jazdy według przepisów UE i diety zagraniczne.',
        ],
        [
          'Czy potrzebuję lokalizatora w każdym busie?',
          'Nie. Pozycja pochodzi z telefonu kierowcy i aplikacji BusiKM Kierowca.',
        ],
        [
          'Czy BusiKM zastępuje tachograf?',
          'Nie. Tachograf zapisuje i jest wymagany prawem. BusiKM pokazuje kierowcy w telefonie, ile jeszcze może jechać, i przypomina o przerwie.',
        ],
        [
          'Czy mogę sprawdzić, zanim zapłacę?',
          'Tak. Demo działa już teraz, bez zakładania konta. Gdy otworzymy konta, pierwsze 14 dni jest bez opłat.',
        ],
      ],
    },
  };
}

const TEKSTY: Tlumaczenia<{ label: string; note: string }> = {
  pl: {
    label: 'Mapa floty (desktop 1440)',
    note: 'Dyspozytornia: mapa Europy ze znacznikami aut i filtrami „Wszystkie”, „W trasie”, „Wolne”, „Serwis”, obok kolejka kursów, nad nimi liczniki dnia.',
  },
  en: {
    label: 'Fleet map (desktop 1440)',
    note: 'Dispatch: a map of Europe with vehicle markers and “All”, “On the road”, “Free”, “Service” filters, the run queue alongside, the day’s counters above.',
  },
};

export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  return <StronaFrazy slug="program-tms-dla-busow" jezyk={jezyk} tresc={tresc(jezyk)} />;
}
