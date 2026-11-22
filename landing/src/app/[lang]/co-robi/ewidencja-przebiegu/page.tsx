import Link from '@/i18n/Link';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { ListaTras } from '@/components/mockups/trasy/ListaTras';
import { StronaFrazy, type TrescFrazy } from '@/components/pages/frazy/StronaFrazy';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';

export const generateMetadata = metadataPodstrony('co-robi/ewidencja-przebiegu');

/**
 * Ewidencja przebiegu pojazdu – strona pod frazę „ewidencja przebiegu
 * pojazdu program".
 *
 * Każde zdanie o działaniu ma pokrycie w aplikacji: zapis trasy i trasa
 * poza zleceniem (busikm-mobile, BKM-1952), prywatna przerwa (BKM-2626),
 * potwierdzanie i zatwierdzanie oraz PDF ewidencji (busikm-backend,
 * `mileage_report.html`). Zdanie o VAT-26 jest przepisane z artykułu pomocy
 * `przejazdy-i-kilometrowka`, nie dopisane tutaj.
 */
function tresc(jezyk: Jezyk): TrescFrazy {
  const makieta = (
    <MockupSlot
      file="mockup-trasy-przebieg-desktop.png"
      label={TEKSTY[jezyk].makieta.label}
      note={TEKSTY[jezyk].makieta.note}
      ratio="4:3"
    >
      <ListaTras />
    </MockupSlot>
  );

  if (jezyk === 'en') {
    return {
      sekcje: [
        {
          naglowek: 'What a vehicle mileage log is and why it’s a chore',
          akapity: [
            'A mileage log is a record of every trip a vehicle makes: the date, where from and where to, the purpose and the distance. In a company running vans it usually lives in a notebook in the cab or a spreadsheet in the office, and someone fills it in at the end of the month from memory and from fuel receipts.',
            'That’s where the mistakes come from. A missing trip, kilometres that don’t add up with the odometer, a purpose written in later. In BusiKM nobody copies kilometres from the odometer into a notebook. The route appears by itself, with the date and the distance.',
          ],
        },
        {
          naglowek: 'The route is recorded from the driver’s phone',
          akapity: [
            <>
              The <Link href="/co-robi/aplikacja-kierowcy">BusiKM Kierowca app</Link> records the
              route from “Start the day” to the final odometer reading at “End trip”. The driver
              doesn’t switch anything on; the phone can stay in their pocket. There’s no tracker to
              fit in the van, because the position comes from the driver’s phone. The same route
              shows on the <Link href="/co-robi/trasy-i-mapa">fleet map and in route history</Link>.
            </>,
            'When the phone loses signal, the route keeps saving on the phone and is sent once the signal is back. If the phone was switched off, the office adds the trip by hand with the New trip button.',
          ],
          punkty: [
            'Kilometres from the route, not from an odometer reading copied out by hand',
            'Odometer photo when the day starts',
            'Route list filtered by driver, vehicle, year and month',
            'A replayable trip trace',
          ],
          makieta,
        },
        {
          naglowek: 'A trip without an order counts too',
          akapity: [
            'Not every kilometre comes from an order. A trip to the garage, moving the van between bases, an empty run. The driver starts such a trip in the app outside an order: picks the vehicle, the type (business or private), the purpose for a business trip and enters the odometer reading. Every kilometre goes into the log.',
            'Business trip purposes: goods delivery, empty run, vehicle service, technical trip or other. If a trip was classified wrongly, you change it with Change classification, right up to the export to the accounting system.',
          ],
        },
        {
          naglowek: 'A private break stops the recording',
          akapity: [
            'Under way the driver can pause the route recording with one tap: “Private break?” and Pause. They pick a reason: private break, overnight stop or other. While the break lasts, the location is not recorded, and the kilometres from that time don’t count towards the mileage or the log.',
            'Recording comes back with the next stage of the order, or when the driver taps Resume. Outside working time the position isn’t collected at all: recording lasts from “Start the day” to “End trip”.',
          ],
        },
        {
          naglowek: 'Confirmation, approval and month-end close',
          akapity: [
            'Every trip goes through two pairs of hands. First the driver confirms their trips; until then a trip has the status Waiting for driver. Then the owner confirms or rejects it, several at once if needed: tick the trips and click Confirm selected.',
            <>
              At the end, in Settlements, Mileage log, the owner or the accountant clicks Approve
              log. When drivers are behind with confirming, Remind drivers sends them a reminder. The
              month can’t be closed until the mileage log is approved, and once it’s closed nobody
              changes the trips after the fact. Step by step:{' '}
              <Link href="/pomoc/przejazdy-i-kilometrowka">Trips and mileage log</Link>.
            </>,
          ],
        },
        {
          naglowek: 'The mileage log step by step',
          akapity: [
            'This is what a month of the mileage log looks like for one van. Nobody in the office writes a single kilometre; the office only checks and approves.',
          ],
          punkty: [
            'The driver starts the day in the app and takes a photo of the odometer',
            'The route records itself, also for trips outside an order',
            'For a private break the driver pauses the recording',
            'The driver confirms their trips',
            'The owner checks the type and purpose, then confirms or rejects',
            'The owner or the accountant approves the vehicle’s log for the month',
            'The log goes out as a PDF and, in the Business plan, in the office pack',
          ],
        },
        {
          naglowek: 'Where to find it and who sees it',
          akapity: [
            'The log for each vehicle is in Settlements, Mileage log. From there you go to the vehicle’s trips, and you’ll reach the same list from the vehicle card, on the Mileage and trips tab.',
            'Settlements are seen by the owner and the accountant. The dispatcher doesn’t have them in the menu, and the driver sees and confirms only their own trips in the app.',
          ],
        },
        {
          naglowek: 'Mileage log PDF and export for your accountant',
          akapity: [
            'The approved log downloads as a PDF for each vehicle and month. At the top: the company, the vehicle and the period. In the table: no., date, trip purpose, route (from and to), kilometres and a column for the driver’s signature.',
            <>
              In the Business plan, mileage logs are also part of the{' '}
              <Link href="/co-robi/dane-dla-ksiegowej">office pack</Link>, alongside accounting
              entries, VAT registers, payroll and business trips. Every file stays in File history
              and can be downloaded again for 30 days. How to export:{' '}
              <Link href="/pomoc/eksport-dla-ksiegowej">Export to accounting software</Link>.
            </>,
          ],
        },
        {
          naglowek: 'Mileage log and VAT on the vehicle',
          akapity: [
            'A mileage log is needed to deduct 100% VAT on a vehicle registered on the VAT-26 form. A vehicle with private kilometres deducts 50%. That’s why every trip in BusiKM has a type: business or private.',
            'The statutory mileage rates, per diems and NBP exchange rates are in Settings, Statutory rates. They’re view-only; we take them from the regulations.',
          ],
        },
        {
          naglowek: 'In which plan and what it costs',
          akapity: [
            <>
              Routes and the mileage log are in both plans, including Start at PLN 149 net a month for
              up to 3 vehicles. You pay for vehicles, not people: drivers and office staff are
              unlimited. Details on the <Link href="/cennik">pricing page</Link>, and the whole
              system in one place: <Link href="/program-tms-dla-busow">van TMS</Link>.
            </>,
            'If you cancel, the account stays read-only, and you download your mileage logs, invoices and exports.',
          ],
        },
      ],
      odnosniki: {
        naglowek: 'Read next',
        pozycje: [
          {
            href: '/co-robi/trasy-i-mapa',
            tytul: 'Routes and fleet map',
            opis: 'Where every van is, without calling. GPS from the driver’s phone.',
          },
          {
            href: '/co-robi/diety-i-delegacje',
            tytul: 'Per diems and business trips',
            opis: 'Days in each country from the route, per diems and overnight allowances.',
          },
          {
            href: '/co-robi/dane-dla-ksiegowej',
            tytul: 'Data for your accountant',
            opis: 'Logs, registers and payroll in one pack (Business plan).',
          },
          {
            href: '/pomoc/przejazdy-i-kilometrowka',
            tytul: 'Help: trips and mileage log',
            opis: 'Confirmation and approval, step by step.',
          },
          {
            href: '/pomoc/trasa-kierowcy',
            tytul: 'Help: the driver’s route',
            opis: 'What the driver does in the app from start to finish.',
          },
          {
            href: '/pomoc/zamkniecie-miesiaca',
            tytul: 'Help: month-end close',
            opis: 'Six steps, with a link to everything missing.',
          },
        ],
      },
      pytania: {
        naglowek: 'Questions about the mileage log',
        pozycje: [
          [
            'Do I need a tracker in the van?',
            'No. The route comes from the driver’s phone and the BusiKM Kierowca app. Nothing is fitted in the vehicle.',
          ],
          [
            'What if the driver forgot to start the day?',
            'The office adds the trip by hand with the New trip button. It then goes through confirmation and approval like any other.',
          ],
          [
            'Is the driver tracked after hours?',
            'No. Recording lasts from “Start the day” to “End trip”, and the driver can pause it for a private break. The kilometres from the break don’t go into the log.',
          ],
          [
            'Can a trip be changed after the month is closed?',
            'No. Closing the month locks changes to trips, invoices and payroll for that month, and the office files become final.',
          ],
        ],
      },
    };
  }

  return {
    sekcje: [
      {
        naglowek: 'Czym jest ewidencja przebiegu pojazdu i dlaczego to męczy',
        akapity: [
          'Ewidencja przebiegu to zapis każdego przejazdu auta: data, skąd i dokąd, cel wyjazdu i liczba kilometrów. W firmie z busami zwykle żyje w zeszycie w kabinie albo w arkuszu w biurze, a ktoś uzupełnia ją na koniec miesiąca z pamięci i z paragonów za paliwo.',
          'Stąd biorą się błędy. Brakujący przejazd, kilometry, które nie zgadzają się z licznikiem, cel dopisany po fakcie. W BusiKM nikt nie przepisuje kilometrów z licznika do zeszytu. Trasa pojawia się sama, z datą i przebiegiem.',
        ],
      },
      {
        naglowek: 'Trasa zapisuje się z telefonu kierowcy',
        akapity: [
          <>
            Aplikacja <Link href="/co-robi/aplikacja-kierowcy">BusiKM Kierowca</Link> zapisuje
            trasę od „Zacznij dzień” do licznika końcowego przy „Zakończ trasę”. Kierowca niczego
            nie włącza, telefon może zostać w kieszeni. Nie montujesz lokalizatora w busie, bo
            pozycja pochodzi z telefonu kierowcy. Tę samą trasę widać na{' '}
            <Link href="/co-robi/trasy-i-mapa">mapie floty i w historii tras</Link>.
          </>,
          'Gdy telefon traci zasięg, trasa zapisuje się dalej w telefonie i dochodzi, kiedy wróci sygnał. Jeśli telefon był wyłączony, biuro dopisze przejazd ręcznie przyciskiem Nowa trasa.',
        ],
        punkty: [
          'Kilometry z trasy, nie z licznika przepisanego ręcznie',
          'Zdjęcie licznika na starcie dnia',
          'Lista tras z filtrem po kierowcy, pojeździe, roku i miesiącu',
          'Ślad przejazdu do odtworzenia',
        ],
        makieta,
      },
      {
        naglowek: 'Przejazd bez zlecenia też trafia do ewidencji',
        akapity: [
          'Nie każdy kilometr wynika ze zlecenia. Wyjazd do serwisu, przestawienie busa między bazami, pusty dojazd. Kierowca zaczyna taką trasę w aplikacji poza zleceniem: wybiera pojazd, typ (służbowa albo prywatna), cel dla trasy służbowej i wpisuje stan licznika. Każdy kilometr trafia do ewidencji.',
          'Cele trasy służbowej: dostawa towaru, przejazd bez ładunku, serwis pojazdu, przejazd techniczny albo inne. Gdy przejazd został źle sklasyfikowany, zmienisz to przyciskiem Zmień klasyfikację, aż do eksportu do programu księgowego.',
        ],
      },
      {
        naglowek: 'Prywatna przerwa wstrzymuje zapis',
        akapity: [
          'W trasie kierowca może wstrzymać zapis jednym dotknięciem: „Przerwa prywatna?” i Wstrzymaj. Wybiera powód: przerwa prywatna, nocleg albo inny powód. Na czas przerwy lokalizacja nie jest zapisywana, a kilometry z tego czasu nie liczą się do przebiegu ani do ewidencji.',
          'Zapis wraca przy następnym etapie zlecenia albo gdy kierowca dotknie Wznów. Poza pracą pozycja w ogóle nie jest zbierana: zapis trwa od „Zacznij dzień” do „Zakończ trasę”.',
        ],
      },
      {
        naglowek: 'Potwierdzenie, zatwierdzenie i zamknięcie miesiąca',
        akapity: [
          'Każdy przejazd przechodzi przez dwie ręce. Najpierw kierowca potwierdza swoje trasy, do tego czasu trasa ma stan Oczekuje na kierowcę. Potem właściciel potwierdza albo odrzuca, także kilka naraz: zaznacza trasy i klika Potwierdź zaznaczone.',
          <>
            Na koniec w Rozliczenia, Ewidencja przebiegu, właściciel albo księgowa klika Zatwierdź
            ewidencję. Gdy kierowcy zalegają z potwierdzeniem, przycisk Przypomnij kierowcom wyśle
            im przypomnienie. Miesiąca nie zamkniesz bez zatwierdzonej ewidencji, a po zamknięciu
            nikt nie zmienia tras wstecz. Krok po kroku:{' '}
            <Link href="/pomoc/przejazdy-i-kilometrowka">Przejazdy i ewidencja przebiegu</Link>.
          </>,
        ],
      },
      {
        naglowek: 'Ewidencja przebiegu krok po kroku',
        akapity: [
          'Tak wygląda miesiąc ewidencji jednego busa. Nikt w biurze nie wpisuje ani jednego kilometra, biuro tylko sprawdza i zatwierdza.',
        ],
        punkty: [
          'Kierowca zaczyna dzień w aplikacji i robi zdjęcie licznika',
          'Trasa zapisuje się sama, także przy przejeździe poza zleceniem',
          'Na prywatną przerwę kierowca wstrzymuje zapis',
          'Kierowca potwierdza swoje trasy',
          'Właściciel sprawdza typ i cel, potem potwierdza albo odrzuca',
          'Właściciel albo księgowa zatwierdza ewidencję pojazdu za miesiąc',
          'Ewidencja wychodzi w PDF, a w planie Firma także w paczce dla biura',
        ],
      },
      {
        naglowek: 'Gdzie to znaleźć i kto to widzi',
        akapity: [
          'Ewidencję każdego pojazdu znajdziesz w Rozliczenia, Ewidencja przebiegu. Stamtąd przejdziesz do tras pojazdu, a tę samą listę otworzysz z karty pojazdu, z zakładki Przebieg i przejazdy.',
          'Rozliczenia widzą właściciel i księgowa. Dyspozytor nie ma ich w menu, a kierowca widzi i potwierdza w aplikacji tylko swoje trasy.',
        ],
      },
      {
        naglowek: 'Ewidencja przebiegu w PDF i eksport dla księgowej',
        akapity: [
          'Zatwierdzoną ewidencję pobierasz w PDF, osobno dla każdego pojazdu i miesiąca. Na górze dane firmy, pojazd i okres rozliczeniowy. W tabeli: liczba porządkowa, data, cel wyjazdu, trasa skąd i dokąd, kilometry i miejsce na podpis kierowcy.',
          <>
            W planie Firma ewidencje przebiegu są też w{' '}
            <Link href="/co-robi/dane-dla-ksiegowej">paczce dla biura</Link>, obok dekretów,
            rejestrów VAT, płac i delegacji. Każdy plik zostaje
            w Historii plików i pobierzesz go ponownie przez 30 dni. Jak to zrobić:{' '}
            <Link href="/pomoc/eksport-dla-ksiegowej">Eksport do programu księgowego</Link>.
          </>,
        ],
      },
      {
        naglowek: 'Ewidencja przebiegu a VAT od busa',
        akapity: [
          'Ewidencja przebiegu jest potrzebna do odliczenia 100% VAT od pojazdu zgłoszonego na VAT-26. Pojazd z prywatnymi kilometrami odlicza 50%. Dlatego każda trasa w BusiKM ma typ: służbowa albo prywatna.',
          'Stawki kilometrówki, diety i kursy NBP zobaczysz w Ustawienia, Stawki z przepisów. Są tylko do podglądu, bierzemy je z przepisów.',
        ],
      },
      {
        naglowek: 'W którym planie i ile to kosztuje',
        akapity: [
          <>
            Trasy i ewidencja przebiegu są w obu planach, także w Start za 149 zł netto miesięcznie dla
            maksymalnie 3 pojazdów. Płacisz za pojazdy, nie za ludzi: kierowcy i biuro bez limitu.
            Szczegóły w <Link href="/cennik">cenniku</Link>, a cały system w jednym miejscu:{' '}
            <Link href="/program-tms-dla-busow">program TMS dla busów</Link>.
          </>,
          'Po rezygnacji konto zostaje do odczytu i pobierasz z niego ewidencje przebiegu, faktury i eksporty.',
        ],
      },
    ],
    odnosniki: {
      naglowek: 'Przeczytaj też',
      pozycje: [
        {
          href: '/co-robi/trasy-i-mapa',
          tytul: 'Trasy i mapa floty',
          opis: 'Gdzie jest każdy bus, bez dzwonienia. GPS z telefonu kierowcy.',
        },
        {
          href: '/co-robi/diety-i-delegacje',
          tytul: 'Diety i delegacje',
          opis: 'Dni w każdym kraju z trasy, diety i noclegi kierowcy.',
        },
        {
          href: '/co-robi/dane-dla-ksiegowej',
          tytul: 'Dane dla księgowej',
          opis: 'Ewidencje, rejestry i płace w jednej paczce (plan Firma).',
        },
        {
          href: '/pomoc/przejazdy-i-kilometrowka',
          tytul: 'Pomoc: przejazdy i ewidencja',
          opis: 'Potwierdzanie i zatwierdzanie krok po kroku.',
        },
        {
          href: '/pomoc/trasa-kierowcy',
          tytul: 'Pomoc: trasa kierowcy',
          opis: 'Co kierowca robi w aplikacji od startu do końca.',
        },
        {
          href: '/pomoc/zamkniecie-miesiaca',
          tytul: 'Pomoc: zamknięcie miesiąca',
          opis: 'Sześć kroków z odnośnikiem do każdego braku.',
        },
      ],
    },
    pytania: {
      naglowek: 'Pytania o ewidencję przebiegu',
      pozycje: [
        [
          'Czy potrzebuję lokalizatora w busie?',
          'Nie. Trasa pochodzi z telefonu kierowcy i aplikacji BusiKM Kierowca. W pojeździe niczego nie montujesz.',
        ],
        [
          'Co, gdy kierowca zapomniał zacząć dzień?',
          'Biuro dopisze przejazd ręcznie przyciskiem Nowa trasa. Dalej przechodzi przez potwierdzenie i zatwierdzenie jak każdy inny.',
        ],
        [
          'Czy kierowca jest śledzony po godzinach?',
          'Nie. Zapis trwa od „Zacznij dzień” do „Zakończ trasę”, a na prywatną przerwę kierowca może go wstrzymać. Kilometry z przerwy nie trafiają do ewidencji.',
        ],
        [
          'Czy trasę da się zmienić po zamknięciu miesiąca?',
          'Nie. Zamknięcie blokuje zmiany w trasach, fakturach i płacach z tego miesiąca, a pliki dla biura stają się ostateczne.',
        ],
      ],
    },
  };
}

const TEKSTY: Tlumaczenia<{ makieta: { label: string; note: string } }> = {
  pl: {
    makieta: {
      label: 'Przebieg i przejazdy auta (desktop, tryb nocny)',
      note: 'Karta pojazdu WX4821K, zakładka „Przebieg i przejazdy”: ewidencja przebiegu do VAT miesiąc po miesiącu, z kilometrami i liczbą przejazdów, pod spodem lista przejazdów z trasą, kierowcą i kilometrami.',
    },
  },
  en: {
    makieta: {
      label: 'Vehicle mileage and trips (desktop, dark mode)',
      note: 'Vehicle card WX4821K, “Mileage and trips” tab: the VAT mileage log month by month with kilometres and number of trips, and below it the list of trips with route, driver and kilometres.',
    },
  },
};

export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  return <StronaFrazy slug="co-robi/ewidencja-przebiegu" jezyk={jezyk} tresc={tresc(jezyk)} />;
}
