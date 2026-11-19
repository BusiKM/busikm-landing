import type { MomentDnia } from '@/components/ui/ScenaDnia';
import type { Tlumaczenia } from '@/i18n/jezyki';

/** Dzień kierowcy – sześć chwil w aplikacji BusiKM Kierowca, od rana po koniec dnia. */
export const dzienKierowcy: Tlumaczenia<MomentDnia[]> = {
  pl: [
    {
      godzina: '6:00',
      tresc: 'Zlecenie jest w telefonie. Wiesz, gdzie i o której.',
      plik: 'mockup-kierowca-zacznij-dzien-phone.png',
      alt: 'Ekran „Dziś”: najbliższy kurs Venlo → Warszawa z autem, ładunkiem i rozładunkiem, na dole przycisk „Zacznij dzień”.',
    },
    {
      godzina: '6:05',
      tresc: 'Klikasz „Zacznij dzień”, robisz zdjęcie licznika i jedziesz. Stan licznika odczyta AI.',
      plik: 'mockup-kierowca-licznik-phone.png',
      alt: 'Ekran „Licznik na start”: auto i kurs Venlo → Warszawa, pole na zdjęcie licznika ze stanem odczytywanym przez AI i pole na kilometry.',
    },
    {
      godzina: '6:06',
      tresc: 'Nawigacja otwiera się jednym dotknięciem.',
      plik: 'mockup-kierowca-nawigacja-phone.png',
      alt: 'Okno „Czym nawigujesz?” nad ekranem „Dziś” z listą aplikacji nawigacyjnych.',
    },
    {
      godzina: '11:38',
      tresc: 'Tankujesz. Pstrykasz paragon. Jedziesz dalej.',
      plik: 'mockup-kierowca-koszt-phone.png',
      alt: 'Ekran „Moje koszty”: przycisk „Dodaj paragon”, zwrot dla kierowcy i lista paragonów z listopada.',
    },
    {
      godzina: '13:20',
      tresc: 'Telefon przypomina o przerwie 15 minut wcześniej, nie po fakcie. Potem przerwa na cały ekran z odliczaniem.',
      plik: 'mockup-kierowca-przerwa-phone.png',
      alt: 'Przerwa na cały ekran z odliczaniem obowiązkowych 45 minut.',
    },
    {
      godzina: '19:40',
      tresc: 'Koniec dnia. Jazda, praca i przerwy policzone same. Papierów nie ma.',
      plik: 'mockup-kierowca-czas-phone.png',
      alt: 'Ekran „Czas pracy”: jazda, praca i przerwy z dnia i tygodnia.',
    },
  ],
  en: [
    {
      godzina: '6:00',
      tresc: 'The order is on your phone. You know where and when.',
      plik: 'mockup-kierowca-zacznij-dzien-phone.png',
      alt: 'The “Today” screen: the next job Venlo → Warsaw with the van, load and unloading time, and a “Start the day” button at the bottom.',
    },
    {
      godzina: '6:05',
      tresc: 'Tap “Start the day”, snap the odometer and drive off. AI reads the reading.',
      plik: 'mockup-kierowca-licznik-phone.png',
      alt: 'The “Odometer at start” screen: the van and the Venlo → Warsaw job, a photo field with the reading filled in by AI, and a kilometres field.',
    },
    {
      godzina: '6:06',
      tresc: 'Navigation opens in one tap.',
      plik: 'mockup-kierowca-nawigacja-phone.png',
      alt: 'The “How do you navigate?” sheet over the “Today” screen, listing navigation apps.',
    },
    {
      godzina: '11:38',
      tresc: 'You fill up. Snap the receipt. Drive on.',
      plik: 'mockup-kierowca-koszt-phone.png',
      alt: 'The “My costs” screen: an “Add receipt” button, the driver’s refund and November’s receipts.',
    },
    {
      godzina: '13:20',
      tresc: 'Your phone reminds you 15 minutes before a break, not after the fact. Then the break fills the screen with a countdown.',
      plik: 'mockup-kierowca-przerwa-phone.png',
      alt: 'A full-screen break with a countdown of the required 45 minutes.',
    },
    {
      godzina: '19:40',
      tresc: 'End of the day. Driving, work and breaks counted by themselves. No paperwork.',
      plik: 'mockup-kierowca-czas-phone.png',
      alt: 'The “Working time” screen: driving, work and breaks for the day and the week.',
    },
  ],
};
