import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';

/**
 * Podpis nad makietą w lupie na telefonie.
 *
 * Na telefonie lupa pokazuje sam kadr makiety (sam telefon albo sam ekran
 * aplikacji w oknie przeglądarki), więc nad nim stoi krótki podpis: mały
 * nadtytuł mówi, gdzie to jest, a tytuł, co widać. Tekst alternatywny
 * makiety jest na to za długi, bo opisuje cały ekran dla czytnika.
 *
 * Klucz to nazwa pliku z `public/mockups/`. Nowa makieta bez wpisu dostaje
 * sam nadtytuł, bez tytułu. Wpis dopisz razem z plikiem.
 */
const TYTULY: Record<string, Tlumaczenia<string>> = {
  'mockup-hero-pulpit-desktop.png': { pl: 'Pulpit po zalogowaniu', en: 'Dashboard after signing in' },
  'mockup-hero-telefon-phone.png': { pl: 'Ekran „Dziś” w trasie', en: 'The “Today” screen on the road' },
  'mockup-demo-ekran-desktop.png': { pl: 'Panel demo', en: 'Demo panel' },

  'mockup-dyspozytornia-ekran-desktop.png': { pl: 'Dyspozytornia', en: 'Dispatch' },
  'mockup-dyspozytornia-kolejka-wycinek.png': { pl: 'Kolejka „Wymaga reakcji”', en: 'The “Needs action” queue' },
  'mockup-dyspozytornia-mapa-wycinek.png': { pl: 'Mapa floty', en: 'Fleet map' },
  'mockup-dyspozytornia-plan-wycinek.png': { pl: 'Plan floty na trzy dni', en: 'Three-day fleet plan' },
  'mockup-dyspozytornia-zlecenie-desktop.png': { pl: 'Zlecenie w dyspozytorni', en: 'Order in dispatch' },
  'mockup-dyspozytornia-przypisz-wycinek.png': { pl: 'Przypisanie kursu', en: 'Assigning a trip' },
  'mockup-dyspozytornia-trasa-desktop.png': { pl: 'Trasa i śledzenie kursu', en: 'Route and trip tracking' },
  'mockup-dyspozytornia-czat-phone.png': { pl: 'Czat z dyspozytorem', en: 'Chat with the dispatcher' },
  'mockup-dyspozytornia-dyspozytor-desktop.png': { pl: 'Panel dyspozytora', en: 'Dispatcher’s panel' },
  'mockup-mapa-flota-desktop.png': { pl: 'Mapa floty', en: 'Fleet map' },

  'mockup-trasy-przeliczenie-desktop.png': { pl: 'Wybór trasy', en: 'Choosing a route' },
  'mockup-trasy-klient-link-phone.png': { pl: 'Śledzenie kursu przez klienta', en: 'Customer trip tracking' },
  'mockup-trasy-przebieg-desktop.png': { pl: 'Przebieg i przejazdy pojazdu', en: 'Vehicle mileage and trips' },
  'mockup-trasy-za-granica-desktop.png': { pl: 'Dni za granicą i diety', en: 'Days abroad and allowances' },

  'mockup-czas-pracy-pierscienie-desktop.png': { pl: 'Czas pracy kierowców', en: 'Drivers’ working time' },
  'mockup-czas-kierowcy-lista-desktop.png': { pl: 'Lista kierowców', en: 'Driver list' },
  'mockup-czas-bez-zasiegu-phone.png': { pl: 'Praca bez zasięgu', en: 'Working offline' },
  'mockup-czas-karta-wydruk-dokument.png': { pl: 'Karta ewidencji czasu pracy', en: 'Working time record sheet' },
  'mockup-czas-korekta-dnia-desktop.png': { pl: 'Poprawka dnia za granicą', en: 'Correcting a day abroad' },

  'mockup-faktury-ekran-desktop.png': { pl: 'Faktura od wystawienia do zapłaty', en: 'Invoice from issue to payment' },
  'mockup-faktury-wysylka-desktop.png': { pl: 'Wysyłka faktury do klienta', en: 'Sending an invoice to the customer' },
  'mockup-faktury-kontrahent-wycinek.png': { pl: 'Wybór klienta w zleceniu', en: 'Choosing the customer for an order' },
  'mockup-faktury-naleznosci-desktop.png': { pl: 'Należności', en: 'Receivables' },
  'mockup-faktury-zlecenie-desktop.png': { pl: 'Zlecenie z fakturą w KSeF', en: 'Order with a KSeF invoice' },

  'mockup-koszty-paragon-phone.png': { pl: 'Moje koszty i paragony', en: 'My costs and receipts' },
  'mockup-koszty-kurs-desktop.png': { pl: 'Koszt w euro po kursie NBP', en: 'Cost in euro at the NBP rate' },
  'mockup-koszty-lista-desktop.png': { pl: 'Lista kosztów', en: 'Cost list' },

  'mockup-zysk-karta-desktop.png': { pl: 'Zysk na zleceniu', en: 'Profit on an order' },
  'mockup-zysk-pulpit-wycinek.png': { pl: 'Finanse miesiąca na pulpicie', en: 'Monthly finances on the dashboard' },
  'mockup-zysk-tabela-desktop.png': { pl: 'Zlecenia i trasy w raportach', en: 'Orders and routes in reports' },
  'mockup-zysk-koszty-desktop.png': { pl: 'Raport kosztów', en: 'Cost report' },
  'mockup-zysk-porownanie-desktop.png': { pl: 'Wynik firmy', en: 'Company result' },
  'mockup-zysk-raport-flota-wycinek.png': { pl: 'Koszt na kilometr', en: 'Cost per kilometre' },
  'mockup-zysk-raport-kierunki-wycinek.png': { pl: 'Marża według kierunku', en: 'Margin by destination' },
  'mockup-zysk-raport-kierowcy-wycinek.png': { pl: 'Kilometry kierowców', en: 'Driver kilometres' },

  'mockup-ksiegowa-eksport-desktop.png': { pl: 'Paczka dla biura rachunkowego', en: 'Package for the accounting office' },
  'mockup-ksiegowa-walidacja-desktop.png': { pl: 'Zamknięcie miesiąca', en: 'Month-end close' },
  'mockup-ksiegowa-diety-desktop.png': { pl: 'Płace i diety', en: 'Pay and allowances' },

  'mockup-dokumenty-terminy-desktop.png': { pl: 'Terminy dokumentów', en: 'Document deadlines' },
  'mockup-dokumenty-status-desktop.png': { pl: 'Dokumenty kierowców', en: 'Driver documents' },
  'mockup-dokumenty-kierowca-phone.png': { pl: 'Moje dokumenty', en: 'My documents' },

  'mockup-dzien-wl-pulpit-desktop.png': { pl: 'Pulpit właściciela rano', en: 'Owner’s dashboard in the morning' },
  'mockup-dzien-wl-mapa-desktop.png': { pl: 'Dyspozytornia w ciągu dnia', en: 'Dispatch during the day' },
  'mockup-dzien-wl-faktura-desktop.png': { pl: 'Faktura za transport', en: 'Transport invoice' },
  'mockup-dzien-wl-paczka-desktop.png': { pl: 'Paczka dla biura rachunkowego', en: 'Package for the accounting office' },
  'mockup-dzien-dy-zlecenie-desktop.png': { pl: 'Nowe zlecenie', en: 'New order' },
  'mockup-dzien-dy-przypisz-desktop.png': { pl: 'Przypisanie kursu', en: 'Assigning a trip' },
  'mockup-dzien-dy-trasa-desktop.png': { pl: 'Trasa i śledzenie kursu', en: 'Route and trip tracking' },
  'mockup-dzien-dy-reakcja-desktop.png': { pl: 'Reakcja na spóźnienie', en: 'Responding to a delay' },
  'mockup-dzien-dy-plan-desktop.png': { pl: 'Plan floty na trzy dni', en: 'Three-day fleet plan' },
  'mockup-dzien-ks-faktury-desktop.png': { pl: 'Faktury oczami księgowej', en: 'Invoices as the accountant sees them' },
  'mockup-dzien-ks-miesiac-desktop.png': { pl: 'Zamknięcie miesiąca', en: 'Month-end close' },
  'mockup-dzien-ks-paczka-desktop.png': { pl: 'Paczka dla biura rachunkowego', en: 'Package for the accounting office' },
  'mockup-dzien-ks-place-desktop.png': { pl: 'Płace i diety', en: 'Pay and allowances' },
  'mockup-dzien-ks-zamkniecie-desktop.png': { pl: 'Deklaracje za miesiąc', en: 'Monthly tax returns' },

  'mockup-kierowca-telefony-phone.png': { pl: 'Nawigacja i czas pracy', en: 'Navigation and working time' },
  'mockup-kierowca-hero-trzy-phone.png': { pl: 'Czas pracy, kurs i koszty', en: 'Working time, trip and costs' },
  'mockup-kierowca-hero-phone.png': { pl: 'Kurs w trasie', en: 'Trip on the road' },
  'mockup-kierowca-zaproszenie-phone.png': { pl: 'Logowanie kodem z zaproszenia', en: 'Signing in with an invitation code' },
  'mockup-kierowca-nawigacja-phone.png': { pl: 'Wybór nawigacji', en: 'Choosing navigation' },
  'mockup-kierowca-zacznij-dzien-phone.png': { pl: 'Ekran „Dziś” przed kursem', en: 'The “Today” screen before a trip' },
  'mockup-kierowca-koszt-phone.png': { pl: 'Moje koszty i paragony', en: 'My costs and receipts' },
  'mockup-kierowca-czas-phone.png': { pl: 'Czas pracy kierowcy', en: 'Driver working time' },
  'mockup-kierowca-wysylka-phone.png': { pl: 'Wszystko wysłane', en: 'Everything sent' },
  'mockup-kierowca-trasa-bez-zlecenia-phone.png': { pl: 'Trasa bez zlecenia', en: 'Trip without an order' },
  'mockup-kierowca-przerwa-phone.png': { pl: 'Obowiązkowa przerwa', en: 'Mandatory break' },
  'mockup-kierowca-licznik-phone.png': { pl: 'Licznik na start', en: 'Odometer at the start' },
  'mockup-kierowca-zlecenia-phone.png': { pl: 'Lista zleceń', en: 'Order list' },
};

const NADTYTULY = {
  panel: { pl: 'Panel w przeglądarce', en: 'Web panel' },
  aplikacja: { pl: 'Aplikacja BusiKM Kierowca', en: 'BusiKM Kierowca app' },
  klient: { pl: 'Link dla klienta', en: 'Customer link' },
  wydruk: { pl: 'Wydruk z panelu', en: 'Printout from the panel' },
} satisfies Record<string, Tlumaczenia<string>>;

/** Nazwa pliku makiety z adresu (bez `?v=` z trybu deweloperskiego i bez końcówki `-en`). */
export function nazwaPlikuMakiety(src: string): string {
  return (src.split('?')[0].split('/').pop() ?? '').replace(/-en(\.png)$/, '$1');
}

export function podpisMakiety(src: string, jezyk: Jezyk): { nad: string; tytul?: string } {
  const plik = nazwaPlikuMakiety(src);
  const nad =
    plik === 'mockup-trasy-klient-link-phone.png'
      ? NADTYTULY.klient
      : plik.endsWith('-phone.png')
        ? NADTYTULY.aplikacja
        : plik.endsWith('-dokument.png')
          ? NADTYTULY.wydruk
          : NADTYTULY.panel;
  return { nad: nad[jezyk], tytul: TYTULY[plik]?.[jezyk] };
}
