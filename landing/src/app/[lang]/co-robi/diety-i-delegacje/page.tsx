import Link from '@/i18n/Link';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DniWKrajach } from '@/components/mockups/czas/DniWKrajach';
import { RozliczenieKierowcy } from '@/components/mockups/ksiegowa/RozliczenieKierowcy';
import { StronaFrazy, type TrescFrazy } from '@/components/pages/frazy/StronaFrazy';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';

export const generateMetadata = metadataPodstrony('co-robi/diety-i-delegacje');

/**
 * Diety i delegacje – strona pod frazy „diety kierowcy za granicą",
 * „ryczałt za nocleg kierowcy".
 *
 * Opisuje to, co robi aplikacja (busikm-web: Rozliczenia → Płace i diety,
 * Ustawienia → Diety i wypłaty kierowców; busikm-backend: `payroll`), a nie
 * przepisy. Stawek, progów godzinowych i zwolnień podatkowych świadomie tu
 * nie ma – nie występują w materiałach, które właściciel opublikował, a liczba
 * podana z pamięci starzeje się po cichu.
 */
function tresc(jezyk: Jezyk): TrescFrazy {
  const m = TEKSTY[jezyk];
  const kraje = <DniWKrajach />;
  const rozliczenie = (
    <MockupSlot file="mockup-ksiegowa-diety-desktop.png" label={m.label} note={m.note} ratio="4:3">
      <RozliczenieKierowcy />
    </MockupSlot>
  );

  if (jezyk === 'en') {
    return {
      sekcje: [
        {
          naglowek: 'Driver per diems abroad without counting days on paper',
          akapity: [
            'The driver gets back from a week-long run through Germany and the Netherlands and the office has to work out per diems, overnight allowances and pay. Usually that means piecing it together from tachograph printouts, fuel receipts and the driver’s memory: when did they cross the border, where did they sleep, how many days were in which country.',
            'In BusiKM the days abroad come from the route the driver’s phone records anyway. Nobody counts them by hand, and the office starts from numbers rather than from a pile of paper.',
          ],
        },
        {
          naglowek: 'Days in each country counted from the route',
          akapity: [
            <>
              The <Link href="/co-robi/aplikacja-kierowcy">BusiKM Kierowca app</Link> records the
              route from “Start the day” to “End trip”. From it BusiKM works out how many days and
              hours the driver spent in each country. You can correct them by hand if things looked
              different. The same days are on the{' '}
              <Link href="/co-robi/czas-pracy">monthly working time record</Link>.
            </>,
          ],
          makieta: kraje,
        },
        {
          naglowek: 'Per diems and overnight allowances, abroad and at home',
          akapity: [
            'At month end the owner or the accountant clicks Settle allowances. BusiKM works out per diems and overnight allowances from the days abroad and from domestic business trips, shows any gaps in the GPS data, and adds the amounts to each driver’s settlement.',
            'In the driver’s settlement every trip abroad has its own row: dates, country, time abroad, per diems, overnight allowances and the amount in PLN, with the exchange rate used. Domestic business trips are listed separately: full days, part days and cab overnight stops as a flat-rate allowance.',
          ],
          punkty: [
            'Per diem amounts in the country’s currency and in PLN',
            'The NBP rate written next to the amount, so it can be checked',
            'A trip corrected by hand while the settlement is still a draft',
            'Advances paid and driver costs to refund in the same settlement',
          ],
          makieta: rozliczenie,
        },
        {
          naglowek: 'Rates and the cab overnight allowance in settings',
          akapity: [
            'Per diem and overnight rates come from the regulations; BusiKM shows them in Settings, Statutory rates, with the date they apply from. We update them ourselves when the regulations change.',
            'In Settings, Drivers’ per diems and pay, you decide what the app can’t know on its own: which rules define a driver’s business trip, whether the per diem abroad follows the regulation or your own daily rate (no lower than the domestic per diem), how the cab overnight stop is settled, the payday and which day’s euro rate to use. A change applies to settlements that haven’t been approved yet. Approved and paid ones stay as they were.',
          ],
        },
        {
          naglowek: 'Driver costs abroad and advances',
          akapity: [
            <>
              Abroad the driver often pays out of their own pocket. In the app, next to the receipt,
              they choose how it was paid. A cost paid with their own money lands in Costs under To
              refund to drivers and goes into their settlement, next to the per diems. More in{' '}
              <Link href="/co-robi/koszty-i-paragony">costs and receipts</Link>.
            </>,
            'The same settlement holds the advances paid before the trip and deductions, such as a driver’s fine. At the end you see one amount to settle with the driver, instead of three lists to match up.',
          ],
        },
        {
          naglowek: 'A month of per diems in BusiKM',
          akapity: [
            'Until the day of the exchange rate you chose in the settings, the amounts are provisional. Every change to the per diem settings is saved in the company history, with the person and the date.',
          ],
          punkty: [
            'The driver drives with the app, and the route records itself',
            'BusiKM counts the days and hours in each country',
            'At month end you click Settle allowances and see the gaps before confirming',
            'You check each driver’s settlement and correct a trip while it’s still a draft',
            'You approve payroll and per diems',
            'Your accountant downloads the payroll and business trips, or the whole pack (Business plan)',
            'You close the month',
          ],
        },
        {
          naglowek: 'Per diems in the job result',
          akapity: [
            <>
              Per diems are a cost of the driver’s work, so BusiKM can include them in the result of
              the job. A day’s per diem is split between the orders of that day, in proportion to
              time. That way <Link href="/co-robi/rentownosc">what you keep</Link> on a run already
              accounts for the driver, not just fuel and tolls.
            </>,
          ],
        },
        {
          naglowek: 'Payroll in Excel or CSV and business trips for the office',
          akapity: [
            'BusiKM doesn’t calculate income tax advances or social security contributions. That’s the job of the accountant’s payroll software. It does prepare everything that software needs: base pay, overtime, bonuses, domestic and foreign per diems, the overnight allowance, advances and deductions, each line with a code the accountant maps once.',
            <>
              The payroll and per diems download as Excel or CSV, and drivers’ business trips as a
              ZIP. Both are in the <Link href="/co-robi/dane-dla-ksiegowej">office pack</Link>,
              which also holds accounting entries, VAT registers and{' '}
              <Link href="/co-robi/ewidencja-przebiegu">mileage logs</Link>. For the office there’s
              also a summary of how much of the per diems and overnight allowances is free of
              income tax and of social security. These files are in the Business plan, which you
              can choose for any fleet size.
            </>,
          ],
        },
        {
          naglowek: 'Approval and month-end close',
          akapity: [
            <>
              Payroll and per diems are one of the six steps of the month: invoices, costs, mileage
              log, payroll and per diems, tax returns and the close. The month can’t be closed until
              the drivers’ settlements are approved, and once it’s closed nobody changes them after
              the fact. Step by step: <Link href="/pomoc/zamkniecie-miesiaca">Month-end close</Link>.
            </>,
            <>
              Settlements are seen by the owner and the accountant; the dispatcher doesn’t have them
              in the menu. The accountant can be from an outside firm. Files for accounting
              software are in the Business plan, details on the{' '}
              <Link href="/cennik">pricing page</Link>.
            </>,
          ],
        },
      ],
      odnosniki: {
        naglowek: 'Read next',
        pozycje: [
          {
            href: '/co-robi/czas-pracy',
            tytul: 'Working time and breaks',
            opis: 'Driving, breaks and the monthly record from the same route.',
          },
          {
            href: '/co-robi/ewidencja-przebiegu',
            tytul: 'Mileage log',
            opis: 'Kilometres from the route, confirmation and a ready PDF.',
          },
          {
            href: '/co-robi/dane-dla-ksiegowej',
            tytul: 'Data for your accountant',
            opis: 'Payroll, business trips and registers in one pack (Business plan).',
          },
          {
            href: '/pomoc/eksport-dla-ksiegowej',
            tytul: 'Help: export for your accountant',
            opis: 'Which file comes in which format.',
          },
          {
            href: '/pomoc/zamkniecie-miesiaca',
            tytul: 'Help: month-end close',
            opis: 'Six steps, with a link to everything missing.',
          },
          {
            href: '/program-tms-dla-busow',
            tytul: 'Van TMS',
            opis: 'The whole system for a van company in one place.',
          },
        ],
      },
      pytania: {
        naglowek: 'Questions about per diems',
        pozycje: [
          [
            'Does the driver have to log border crossings?',
            'No. The days in each country come from the route recorded on the phone. If something looked different, you correct it by hand.',
          ],
          [
            'Does BusiKM calculate the whole salary?',
            'No. It prepares the components: pay, per diems, allowances, advances and deductions. Tax and contributions are calculated by your accountant’s payroll software.',
          ],
          [
            'Can I use my own per diem rate abroad?',
            'Yes, in the per diem settings. The app won’t accept a rate lower than the domestic per diem.',
          ],
          [
            'Where does the exchange rate for per diems come from?',
            'From NBP. In the settings you choose which day’s rate to use, and the rate sits next to every amount in the settlement.',
          ],
        ],
      },
    };
  }

  return {
    sekcje: [
      {
        naglowek: 'Diety kierowcy za granicą bez liczenia dni na kartce',
        akapity: [
          'Kierowca wraca z tygodniowego kursu przez Niemcy i Holandię, a biuro ma policzyć diety, noclegi i wypłatę. Zwykle oznacza to składanie wszystkiego z wydruków z tachografu, paragonów za paliwo i pamięci kierowcy: kiedy przekroczył granicę, gdzie spał, ile dni był w którym kraju.',
          'W BusiKM dni za granicą biorą się z trasy, którą telefon kierowcy i tak zapisuje. Nikt ich nie liczy ręcznie, a biuro zaczyna od liczb, a nie od sterty papierów.',
        ],
      },
      {
        naglowek: 'Dni w każdym kraju liczone z trasy',
        akapity: [
          <>
            Aplikacja <Link href="/co-robi/aplikacja-kierowcy">BusiKM Kierowca</Link> zapisuje
            trasę od „Zacznij dzień” do „Zakończ trasę”. Z niej BusiKM liczy, ile dni i godzin
            kierowca spędził w każdym kraju. Możesz je poprawić ręcznie, jeśli coś wyglądało
            inaczej. Te same dni są na{' '}
            <Link href="/co-robi/czas-pracy">miesięcznej karcie czasu pracy</Link>.
          </>,
        ],
        makieta: kraje,
      },
      {
        naglowek: 'Diety i noclegi za granicą i w kraju',
        akapity: [
          'Na koniec miesiąca właściciel albo księgowa klika Rozlicz diety. BusiKM liczy diety i noclegi z dni za granicą i z delegacji w kraju, pokazuje braki w danych GPS i dopisuje kwoty do rozliczeń kierowców.',
          'W rozliczeniu kierowcy każdy wyjazd za granicę ma osobny wiersz: daty, kraj, czas za granicą, diety, noclegi i kwotę w złotych, razem z kursem, po którym ją przeliczono. Delegacje w kraju są wypisane osobno: pełne doby, niepełne doby i noclegi w kabinie jako ryczałt.',
        ],
        punkty: [
          'Diety w walucie kraju i w złotych',
          'Kurs NBP zapisany przy kwocie, do sprawdzenia',
          'Poprawka wyjazdu, dopóki rozliczenie jest szkicem',
          'Zaliczki i koszty kierowcy do zwrotu w tym samym rozliczeniu',
        ],
        makieta: rozliczenie,
      },
      {
        naglowek: 'Stawki i ryczałt za nocleg w kabinie w ustawieniach',
        akapity: [
          'Stawki diet i noclegów pochodzą z przepisów, BusiKM pokazuje je w Ustawienia, Stawki z przepisów, z datą, od której obowiązują. Aktualizujemy je sami, gdy przepisy się zmienią.',
          'W Ustawienia, Diety i wypłaty kierowców, decydujesz o tym, czego aplikacja sama nie wie: według jakich zasad kierowca jest w podróży służbowej, czy dieta za granicą idzie według rozporządzenia, czy według własnej stawki za dobę (nie niższej niż dieta w kraju), jak rozliczasz nocleg w kabinie, kiedy wypłacasz i z którego dnia bierzesz kurs euro. Zmiana dotyczy rozliczeń, których jeszcze nie zatwierdzono. Zatwierdzone i wypłacone zostają bez zmian.',
        ],
      },
      {
        naglowek: 'Koszty kierowcy za granicą i zaliczki',
        akapity: [
          <>
            Za granicą kierowca często płaci z własnej kieszeni. W aplikacji przy paragonie wybiera,
            czym zapłacił. Koszt zapłacony z własnych pieniędzy trafia w Kosztach do zakładki Do
            zwrotu kierowcom i do jego rozliczenia, obok diet. Więcej w{' '}
            <Link href="/co-robi/koszty-i-paragony">kosztach i paragonach</Link>.
          </>,
          'W tym samym rozliczeniu są zaliczki wypłacone przed wyjazdem i potrącenia, na przykład mandat kierowcy. Na końcu widzisz jedną kwotę do rozliczenia z kierowcą, zamiast trzech list do porównywania.',
        ],
      },
      {
        naglowek: 'Miesiąc z dietami w BusiKM',
        akapity: [
          'Do dnia kursu wybranego w ustawieniach kwoty są wstępne. Każdą zmianę ustawień diet zapisujemy w historii firmy, z osobą i datą.',
        ],
        punkty: [
          'Kierowca jeździ z aplikacją, trasa zapisuje się sama',
          'BusiKM liczy dni i godziny w każdym kraju',
          'Na koniec miesiąca klikasz Rozlicz diety i przed potwierdzeniem widzisz braki',
          'Sprawdzasz rozliczenie każdego kierowcy i poprawiasz wyjazd, dopóki jest szkicem',
          'Zatwierdzasz płace i diety',
          'Księgowa pobiera listę płac i delegacje albo całą paczkę (plan Firma)',
          'Zamykasz miesiąc',
        ],
      },
      {
        naglowek: 'Diety w wyniku zlecenia',
        akapity: [
          <>
            Dieta to koszt pracy kierowcy, więc BusiKM może liczyć ją w wyniku zlecenia. Dietę
            z danej doby dzieli między zlecenia z tej doby, proporcjonalnie do czasu. Dzięki temu{' '}
            <Link href="/co-robi/rentownosc">wynik kursu</Link> uwzględnia już kierowcę, a nie
            tylko paliwo i opłaty drogowe.
          </>,
        ],
      },
      {
        naglowek: 'Lista płac w Excelu albo CSV i delegacje dla biura',
        akapity: [
          'BusiKM nie liczy zaliczki na podatek ani składek ZUS. To robi program kadrowo-płacowy księgowej. Przygotowuje za to wszystko, czego ten program potrzebuje: wynagrodzenie zasadnicze, nadgodziny, premie, diety krajowe i zagraniczne, ryczałt za nocleg, zaliczki i potrącenia, każdy składnik z kodem, który księgowa mapuje raz.',
          <>
            Listę płac i diety pobierasz w Excelu albo CSV, a delegacje kierowców w pliku ZIP. Oba
            są w <Link href="/co-robi/dane-dla-ksiegowej">paczce dla biura</Link>, razem
            z dekretami, rejestrami VAT i{' '}
            <Link href="/co-robi/ewidencja-przebiegu">ewidencjami przebiegu</Link>. Dla biura jest
            też zestawienie, jaka część diet i noclegów jest wolna od podatku, a jaka od składek
            ZUS. Te pliki są w planie Firma, który wybierzesz przy dowolnej liczbie busów.
          </>,
        ],
      },
      {
        naglowek: 'Zatwierdzenie i zamknięcie miesiąca',
        akapity: [
          <>
            Płace i diety to jeden z sześciu kroków miesiąca: faktury, koszty, ewidencja przebiegu,
            płace i diety, deklaracje i zamknięcie. Miesiąca nie zamkniesz, dopóki rozliczenia
            kierowców nie są zatwierdzone, a po zamknięciu nikt ich nie zmienia wstecz. Krok po
            kroku: <Link href="/pomoc/zamkniecie-miesiaca">Zamknięcie miesiąca</Link>.
          </>,
          <>
            Rozliczenia widzą właściciel i księgowa, dyspozytor nie ma ich w menu. Księgowa może
            być z zewnętrznego biura. Pliki do programu księgowego są w planie Firma, szczegóły
            w <Link href="/cennik">cenniku</Link>.
          </>,
        ],
      },
    ],
    odnosniki: {
      naglowek: 'Przeczytaj też',
      pozycje: [
        {
          href: '/co-robi/czas-pracy',
          tytul: 'Czas pracy i przerwy',
          opis: 'Jazda, przerwy i karta miesięczna z tej samej trasy.',
        },
        {
          href: '/co-robi/ewidencja-przebiegu',
          tytul: 'Ewidencja przebiegu',
          opis: 'Kilometry z trasy, potwierdzenie i gotowy PDF.',
        },
        {
          href: '/co-robi/dane-dla-ksiegowej',
          tytul: 'Dane dla księgowej',
          opis: 'Płace, delegacje i rejestry w jednej paczce (plan Firma).',
        },
        {
          href: '/pomoc/eksport-dla-ksiegowej',
          tytul: 'Pomoc: eksport dla księgowej',
          opis: 'Który plik w jakim formacie.',
        },
        {
          href: '/pomoc/zamkniecie-miesiaca',
          tytul: 'Pomoc: zamknięcie miesiąca',
          opis: 'Sześć kroków z odnośnikiem do każdego braku.',
        },
        {
          href: '/program-tms-dla-busow',
          tytul: 'Program TMS dla busów',
          opis: 'Cały system dla firmy z busami w jednym miejscu.',
        },
      ],
    },
    pytania: {
      naglowek: 'Pytania o diety',
      pozycje: [
        [
          'Czy kierowca musi zgłaszać przekroczenie granicy?',
          'Nie. Dni w każdym kraju biorą się z trasy zapisanej w telefonie. Jeśli coś wyglądało inaczej, poprawiasz je ręcznie.',
        ],
        [
          'Czy BusiKM liczy całą wypłatę?',
          'Nie. Przygotowuje składniki: wynagrodzenie, diety, ryczałty, zaliczki i potrącenia. Podatek i składki liczy program kadrowo-płacowy księgowej.',
        ],
        [
          'Czy mogę mieć własną stawkę diety za granicą?',
          'Tak, w ustawieniach diet. Aplikacja nie przyjmie stawki niższej niż dieta w kraju.',
        ],
        [
          'Skąd kurs waluty do diet?',
          'Z NBP. W ustawieniach wybierasz, z którego dnia brać kurs, a kurs stoi przy każdej kwocie w rozliczeniu.',
        ],
      ],
    },
  };
}

const TEKSTY: Tlumaczenia<{ label: string; note: string }> = {
  pl: {
    label: 'Płace i diety (desktop)',
    note: 'Rozliczenia, zakładka Płace i diety: kierowcy z dniami za granicą, wynagrodzeniem i dietami, obok rozliczenie Krzysztofa Kamińskiego za październik: kalendarz dni za granicą, wynagrodzenie, diety i noclegi, kwota do rozliczenia.',
  },
  en: {
    label: 'Payroll and allowances (desktop)',
    note: 'Settlements, Payroll and allowances tab: drivers with days abroad, pay and allowances, next to Krzysztof Kamiński’s October settlement: a calendar of days abroad, pay, per diems and overnight allowances, the total to settle.',
  },
};

export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  return <StronaFrazy slug="co-robi/diety-i-delegacje" jezyk={jezyk} tresc={tresc(jezyk)} />;
}
