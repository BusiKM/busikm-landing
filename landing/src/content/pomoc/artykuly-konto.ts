import type { Artykul } from '@/content/pomoc/typy';

/** Konto, zespół, uprawnienia, bezpieczeństwo i płatności. */
export const artykulyKonto: Artykul[] = [
  {
    slug: 'zespol-i-role',
    kategoria: 'konto',
    tytul: 'Zespół i uprawnienia',
    lead: 'Kto co widzi i skąd się bierze w systemie - osoby z biura zapraszasz z ustawień, kierowcę dodajesz w module Kierowcy.',
    role: ['wlasciciel'],
    gdzie: 'Ustawienia → Zespół i dostęp',
    rozdzialy: [
      {
        tytul: 'Role',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Rola', 'Co robi'],
            wiersze: [
              ['Właściciel', 'Wszystko, także konta bankowe, zespół, plan i KSeF'],
              ['Księgowa', 'Faktury, koszty, rozliczenia i dane firmy; konta, plan i flotę tylko ogląda'],
              ['Dyspozytor', 'Zlecenia, dyspozytornia, auta i kierowcy, bez kwot i faktur'],
              ['Kierowca', 'Tylko aplikacja na telefonie; dodajesz go w module Kierowcy'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Każda osoba ma jedną rolę. W małej firmie właściciel jest zwykle też dyspozytorem - jego konto ma dostęp do wszystkiego, więc nie potrzebuje drugiego.',
          },
          {
            typ: 'uwaga',
            tresc: 'Zespół i dostęp widzi tylko właściciel.',
          },
        ],
      },
      {
        tytul: 'Zaproszenie do zespołu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Zespół i dostęp' },
              { tytul: 'Kliknij Zaproś osobę' },
              {
                tytul: 'Podaj adres e-mail i wybierz rolę',
                opis: 'Księgowa, Dyspozytor albo Właściciel. Wyślemy e-mail z linkiem do ustawienia hasła. Link działa 7 dni.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Zaproszenia, których nikt jeszcze nie przyjął, widzisz na tej samej stronie, w sekcji Zaproszenia czekające na przyjęcie. Kierowców tu nie ma - dodajesz ich w module Kierowcy, a zaproszenie do aplikacji wychodzi na końcu kreatora.',
          },
        ],
      },
      {
        tytul: 'Zmiana roli i odbieranie dostępu',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Rolę zmieniasz przy osobie na liście. Zmiana działa od razu, bez ponownego logowania, i zapisuje się w Historii zmian.',
              'Gdy współpraca się kończy, kliknij Odbierz dostęp. Osoba nie zaloguje się do firmy, a dostęp przywrócisz jednym kliknięciem.',
              'Kierowcami zarządzasz w module Kierowcy.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Odebranie dostępu nie kasuje historii. Zmiany zrobione przez tę osobę zostają - tak jak powinny, bo dotyczą dokumentów firmy.',
          },
        ],
      },
    ],
    powiazane: ['zapraszamy-kierowce', 'bezpieczenstwo-konta'],
  },

  {
    slug: 'bezpieczenstwo-konta',
    kategoria: 'konto',
    tytul: 'Hasło, kod z telefonu i zalogowane urządzenia',
    lead: 'Trzy rzeczy do zrobienia raz, po których nikt nie wejdzie na Twoje konto z cudzego laptopa.',
    role: ['wlasciciel', 'ksiegowa', 'dyspozytor'],
    gdzie: 'Ustawienia → Logowanie i bezpieczeństwo',
    czas: 'Pięć minut',
    rozdzialy: [
      {
        tytul: 'Zmiana hasła',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Logowanie i bezpieczeństwo' },
              { tytul: 'W sekcji Hasło kliknij Zmień hasło' },
              { tytul: 'Podaj obecne i nowe hasło' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Po zmianie wylogujemy Cię na innych urządzeniach. To zamierzone - jeśli zmieniasz hasło dlatego, że coś Cię zaniepokoiło, telefon w cudzej kieszeni ma stracić dostęp od razu.',
          },
        ],
      },
      {
        tytul: 'Kod z telefonu przy logowaniu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'W sekcji Kod z telefonu przy logowaniu kliknij Włącz kod' },
              {
                tytul: 'Połącz konto z aplikacją uwierzytelniającą',
                opis: 'Google Authenticator, 1Password, Authy - dowolna, która generuje sześciocyfrowe kody.',
              },
              {
                tytul: 'Przepisz kod z aplikacji, żeby potwierdzić',
                opis: 'Od tej chwili przy logowaniu po haśle wpisujesz 6 cyfr z aplikacji na telefonie.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Po każdej zmianie zabezpieczeń (włączenie lub wyłączenie kodu, wymiana telefonu, nowe kody zapasowe) wylogujemy Cię na wszystkich urządzeniach, także na tym. Zalogujesz się od nowa, a na Twój adres przyjdzie mail o zmianie.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Konto właściciela ma dostęp do faktur, kontrahentów i danych kierowców. Kod z telefonu kosztuje pięć minut raz - a jest różnicą między wykradzionym hasłem a wykradzioną firmą.',
          },
        ],
      },
      {
        tytul: 'Urządzenia z aktywnym logowaniem',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Lista pokazuje, na jakich urządzeniach jesteś zalogowany. Przyciskiem Wyloguj inne urządzenia zamykasz wszystkie pozostałe naraz.',
          },
          {
            typ: 'akapit',
            tresc:
              'Zajrzyj tu po zgubieniu telefonu albo po pracy na cudzym komputerze. Jedno kliknięcie zamyka sprawę.',
          },
        ],
      },
    ],
    powiazane: ['zespol-i-role'],
  },

  {
    slug: 'plan-i-rezygnacja',
    kategoria: 'konto',
    tytul: 'Plan, płatność, faktury za BusiKM i rezygnacja',
    lead: 'Plan, kartę, faktury i rezygnację załatwiasz sam, w ustawieniach - bez pisania do nas.',
    role: ['wlasciciel'],
    gdzie: 'Ustawienia → Plan i płatności',
    rozdzialy: [
      {
        tytul: 'Sprawdzenie planu',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'W Ustawienia → Plan i płatności widzisz plan firmy, do kiedy jest ważny i jego stan: okres próbny, aktywny albo wygasły. Cena zależy od liczby pojazdów - kierowcy i osoby z biura są bez limitu.',
          },
          {
            typ: 'lista',
            punkty: [
              'Start - do 3 pojazdów. Cała firma w jednym miejscu: zlecenia, trasy, kierowcy, faktury i koszty, mapa floty na żywo i raporty kosztów. Księgowa ma dostęp do panelu i ewidencji przebiegu.',
              'Firma - 10 pojazdów w cenie, +29 zł netto/mies. za każdy kolejny, do 50. Wszystko ze Start, a do tego pliki do programu księgowej: paczka dla biura, dekrety FK, rejestry VAT, JPK_V7M i lista płac. Wybierzesz go przy dowolnej liczbie pojazdów. Większa flota - napisz do nas.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Plan, kartę i faktury za BusiKM zmienia właściciel firmy. Pozostali widzą tylko, jaki plan ma firma.',
          },
        ],
      },
      {
        tytul: 'Wybór planu i płatność',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Plan i płatności' },
              {
                tytul: 'W sekcji Zmień plan kliknij Wybierz plan',
                opis: 'Start albo Firma, płatność miesięczna albo roczna.',
              },
              {
                tytul: 'Podaj kartę na stronie płatności Stripe',
                opis: 'Dane karty wpisujesz u operatora płatności, nie w BusiKM. Jeśli trwa okres próbny, karta zostaje zapisana, a pierwsza opłata schodzi dopiero po jego końcu.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Fakturę za każdą opłatę dostajesz mailem. Ceny w cenniku są netto, na fakturze doliczamy 23% VAT.',
          },
        ],
      },
      {
        tytul: 'Zmiana planu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Plan i płatności' },
              {
                tytul: 'W karcie Zmień plan kliknij Wybierz przy planie i okresie rozliczenia',
                opis: 'Przy każdej opcji widzisz cenę i dzień, od którego zmiana zadziała.',
              },
              { tytul: 'Potwierdź przyciskiem Zmieniam plan' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Wyższy plan działa od razu, a dopłatę za resztę opłaconego okresu pobierzemy z karty. Niższy plan i zmiana okresu rozliczenia wchodzą z końcem opłaconego okresu. Do tego dnia korzystasz z obecnego planu, a zaplanowaną zmianę odwołasz przyciskiem Odwołaj zmianę.',
          },
          {
            typ: 'akapit',
            tresc:
              'W okresie próbnym każda zmiana działa od razu i bez dopłaty. Gdy przechodzisz na plan Start i masz więcej aut, niż obejmuje, wybierasz, które zostają aktywne.',
          },
        ],
      },
      {
        tytul: 'Karta i faktury za BusiKM',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Plan i płatności' },
              {
                tytul: 'W karcie Karta i faktury za BusiKM kliknij Otwórz panel płatności',
                opis: 'Otworzy się panel Stripe. Zmienisz w nim kartę, pobierzesz faktury za BusiKM w PDF albo zakończysz subskrypcję.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Rezygnacja i dane',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Plan i płatności i kliknij Otwórz panel płatności' },
              {
                tytul: 'Zakończ subskrypcję',
                opis: 'Rezygnacja działa na koniec opłaconego okresu, bez zwrotu za jego niewykorzystaną część. Do tego czasu możesz ją wycofać.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Do końca opłaconego okresu pracujesz normalnie. Potem konto zostaje do odczytu: przeglądasz dane i pobierasz faktury, ewidencje przebiegu, zestawienia i eksporty.',
          },
          {
            typ: 'akapit',
            tresc:
              'Swoje dane osobowe pobierzesz w Ustawienia → Twoje dane osobowe. To Twoje dane i wychodzą z nami tak samo łatwo, jak weszły.',
          },
        ],
      },
    ],
    powiazane: ['zespol-i-role', 'eksport-dla-ksiegowej'],
  },
];
