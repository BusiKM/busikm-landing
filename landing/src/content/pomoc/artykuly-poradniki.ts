import type { Artykul } from '@/content/pomoc/typy';

/**
 * Poradniki o przepisach – KSeF od 2027 i tachograf w busach od lipca 2026.
 *
 * Inaczej niż reszta centrum pomocy nie opisują przycisków, tylko przepisy,
 * z którymi przewoźnik z busami zderza się teraz. Dlatego dwie twarde zasady:
 *
 * - każdy fakt o przepisach pochodzi z materiałów, które BusiKM już
 *   opublikował (albumy „KSeF od 1 stycznia 2027" i „Kontrola ITD: 5 rzeczy"
 *   oraz rolki z listopada 2026 na Facebooku). Nie dopisujemy przepisów
 *   z pamięci – przy zmianie prawa poprawiamy je razem z tamtymi materiałami,
 * - każdy poradnik ma datę stanu przepisów i kończy się zdaniem „To nie jest
 *   porada prawna.".
 *
 * Ostatni rozdział mówi, jak pomaga BusiKM, i podaje adres podstrony.
 * Blok `akapit` nie przyjmuje odnośników, więc adres stoi tekstem, a do
 * instrukcji prowadzi `powiazane`.
 */
export const artykulyPoradniki: Artykul[] = [
  {
    slug: 'ksef-dla-przewoznika-2027',
    kategoria: 'zlecenia',
    tytul: 'KSeF dla przewoźnika: co się zmienia od 1 stycznia 2027',
    lead: 'Od stycznia KSeF obejmuje każdą fakturę dla firmy, także w najmniejszych firmach transportowych. Cztery zmiany, które musisz znać.',
    role: ['wlasciciel', 'ksiegowa'],
    czas: '5 minut czytania',
    rozdzialy: [
      {
        tytul: 'Koniec okresu przejściowego',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Okres przejściowy w KSeF kończy się 31 grudnia 2026. Od 1 stycznia 2027 Krajowy System e-Faktur obejmuje każdą fakturę wystawianą firmie, także w najmniejszych firmach. Przewoźnik z jednym czy dwoma busami jest w tej samej sytuacji co duża firma spedycyjna.',
          },
        ],
      },
      {
        tytul: '1. Koniec limitu 10 000 zł',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Do 31 grudnia 2026 firma ze sprzedażą do 10 000 zł brutto miesięcznie może fakturować poza KSeF.',
              'Od 1 stycznia 2027 ten wyjątek znika.',
              'Każda faktura dla firmy przechodzi przez KSeF i dostaje numer KSeF.',
            ],
          },
        ],
      },
      {
        tytul: '2. Koniec faktur z kasy fiskalnej',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Faktura drukowana z kasy fiskalnej działa tylko do końca 2026 roku.',
              'Tak samo paragon z NIP jako faktura uproszczona (do 450 zł albo 100 euro).',
              'Od stycznia także te małe faktury muszą być w KSeF.',
            ],
          },
        ],
      },
      {
        tytul: '3. Koniec okresu bez kar',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Od 1 stycznia 2027 urząd skarbowy może karać za fakturę wystawioną poza KSeF.',
              'Także za fakturę z trybu offline, której nie wysłano do KSeF na czas.',
              'Wysokość kary zależy od wagi naruszenia.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Kara może wynieść do 100% VAT z faktury, a gdy faktura nie ma VAT, do 18,7% kwoty brutto.',
          },
        ],
      },
      {
        tytul: '4. Klient z zagranicy też przez KSeF',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Fracht do Niemiec czy Holandii nie zwalnia z KSeF. Fakturę dla firmy z UE też wystawiasz w KSeF. Klient z zagranicy nie korzysta z KSeF, więc dostaje od Ciebie PDF, ale wysyłasz go dopiero wtedy, gdy faktura ma numer KSeF.',
          },
        ],
      },
      {
        tytul: 'Co sprawdzić przed styczniem',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Czy program, w którym wystawiasz faktury, wysyła je do KSeF, a nie tylko drukuje PDF.',
              'Czy nie wystawiasz firmom faktur z kasy fiskalnej albo paragonów z NIP.',
              'Jak wysyłasz fakturę klientowi z zagranicy i czy ma wtedy już numer KSeF.',
            ],
          },
        ],
      },
      {
        tytul: 'Jak pomaga BusiKM',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'W BusiKM faktura powstaje ze zlecenia, bez przepisywania. Klikasz Wystaw i wyślij do KSeF, faktura dostaje numer i od razu idzie do KSeF. Wysyłkę do klienta zlecasz od razu: PDF z kodem QR wyjdzie mailem, gdy KSeF nada numer. Tak samo dla klienta z Niemiec.',
          },
          {
            typ: 'lista',
            punkty: [
              'Połączenie z KSeF ustawiasz raz, w Ustawienia → KSeF.',
              'Na fakturze widzisz jej drogę: Wystawiona, W KSeF, U klienta, Zapłacona.',
              'Fracht w euro przeliczany po kursie NBP.',
              'Faktury z KSeF nie anulujesz ani nie usuniesz, zmieniasz ją korektą.',
              'Zakładka Do wysłania do KSeF pokazuje, co jeszcze nie wyszło.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Więcej o fakturach i zleceniach: busikm.pl/co-robi/zlecenia-i-faktury. Instrukcja krok po kroku jest niżej, w artykule Wystawienie faktury.',
          },
          {
            typ: 'akapit',
            tresc: 'Stan przepisów: listopad 2026. To nie jest porada prawna.',
          },
        ],
      },
    ],
    powiazane: ['faktura-za-zlecenie', 'kontrahenci'],
  },

  {
    slug: 'tachograf-w-busie-od-lipca-2026',
    kategoria: 'kierowcy',
    tytul: 'Tachograf w busie 2,5-3,5 t od 1 lipca 2026',
    lead: 'Bus w międzynarodowym przewozie zarobkowym jeździ z tachografem jak tir. Co to znaczy w praktyce i o co zapyta inspektor na kontroli ITD.',
    role: ['wlasciciel', 'dyspozytor', 'kierowca'],
    czas: '7 minut czytania',
    rozdzialy: [
      {
        tytul: 'Kogo to dotyczy',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Od 1 lipca 2026 bus 2,5-3,5 t w transporcie międzynarodowym jeździ z tachografem jak tir. Obowiązek dotyczy przewozu zarobkowego, czyli dla kogoś, za pieniądze.',
          },
          {
            typ: 'akapit',
            tresc:
              'Wyjątkiem jest przewóz na potrzeby własne firmy. Muszą być spełnione dwa warunki: towar jest Twój (kupujesz go, sprzedajesz albo wynajmujesz), a prowadzenie busa nie jest głównym zajęciem kierowcy. Wyjątek musisz udowodnić przy kontroli dokumentami. Gdy masz zawodowego kierowcę, kontrola raczej go nie uzna.',
          },
        ],
      },
      {
        tytul: 'Od bazy, nie od granicy',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Według GITD tachografu używasz na całej trasie przewozu, zgodnie z dokumentem przewozowym. Czyli od bazy w Polsce, a nie od niemieckiej granicy. Kartę wkładasz na starcie dnia i wpisujesz kraj. Na kontroli inspektor zobaczy, gdzie zacząłeś dzień.',
          },
        ],
      },
      {
        tytul: 'Urządzenie: tachograf G2V2',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Inteligentny tachograf 2. generacji, wersja 2.',
              'Montaż, kalibracja i blokada firmowa tylko w certyfikowanym warsztacie.',
              'Przegląd okresowy tachografu co 2 lata.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Za brak tachografu kara w Polsce wynosi do 12 000 zł: 10 000 zł dla firmy i 2 000 zł dla zarządzającego transportem.',
          },
        ],
      },
      {
        tytul: 'Karta kierowcy: zapisy z 56 dni',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Inspektor sprawdza dzień bieżący i 56 poprzednich dni.',
              'Karta kierowcy jest włożona przez cały dzień pracy, wydruki są opisane i podpisane.',
              'Za dni wolne kierowca ma zaświadczenie o nieprowadzeniu pojazdu.',
            ],
          },
          {
            typ: 'uwaga',
            tresc: 'Za każdy dzień bez kompletnych danych grozi 100 zł kary.',
          },
        ],
      },
      {
        tytul: 'Jazda, przerwy i odpoczynki',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Zasada', 'Ile'],
            wiersze: [
              ['Jazda dziennie', '9 h, dwa razy w tygodniu do 10 h'],
              ['Przerwa po 4,5 h jazdy', '45 min, można podzielić na 15 + 30 min'],
              ['Odpoczynek dobowy', '11 h'],
              ['Jazda w tygodniu', '56 h'],
              ['Jazda w dwóch kolejnych tygodniach', '90 h'],
              ['Regularny odpoczynek tygodniowy', '45 h, skrócony co najmniej 24 h'],
            ],
          },
        ],
      },
      {
        tytul: 'Granice: kraj na start, koniec i po granicy',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Symbol państwa wpisujesz na początku i na końcu dnia pracy.',
              'Po każdym przekroczeniu granicy, na pierwszym postoju w bezpiecznym miejscu.',
              'Tachograf G2V2 z kartą kierowcy nowej generacji zapisuje granice sam.',
            ],
          },
        ],
      },
      {
        tytul: 'Odczyty w firmie: 28 i 90 dni',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Dane z karty kierowcy pobierasz co najmniej co 28 dni.',
              'Pamięć tachografu co najmniej co 90 dni.',
              'Pliki przechowujesz w firmie, bo kontrola może przyjść także do biura, nie tylko na drogę.',
            ],
          },
        ],
      },
      {
        tytul: 'Jak pomaga BusiKM',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Tachograf zapisuje, BusiKM pilnuje. Nie zastępuje tachografu i nie zwalnia z żadnego z obowiązków powyżej. Pokazuje za to kierowcy i biuru to, czego tachograf na bieżąco nie podpowiada.',
          },
          {
            typ: 'lista',
            punkty: [
              'Czas jazdy, przerwy i odpoczynki liczą się same, z trasy zapisanej w telefonie.',
              'Przy kursie za granicę kierowca widzi w telefonie, ile jeszcze może jechać: jazdę ciągłą, dzienną, tydzień i dwa tygodnie.',
              'Przypomnienie o przerwie przychodzi 15 minut wcześniej.',
              'Przypomnienie o zgraniu karty kierowcy co 28 dni i tachografu co 90.',
              'Terminy dokumentów kierowców i busów w jednym miejscu, z legalizacją tachografu i kartą kierowcy.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Więcej o czasie pracy w BusiKM: busikm.pl/co-robi/czas-pracy. Jak kierowca widzi swoje liczniki, opisuje niżej artykuł Czas pracy, przerwy i odpoczynek.',
          },
          {
            typ: 'akapit',
            tresc: 'Stan przepisów: listopad 2026. To nie jest porada prawna.',
          },
        ],
      },
    ],
    powiazane: ['czas-pracy-kierowcy', 'dokumenty-i-terminy'],
  },
];
