import type { MomentDnia } from '@/components/ui/ScenaDnia';
import type { Tlumaczenia } from '@/i18n/jezyki';

/** Dzień dyspozytora – od przyjęcia zlecenia rano po plan na jutro. */
export const dzienDyspozytora: Tlumaczenia<MomentDnia[]> = {
  pl: [
    {
      godzina: '6:40',
      pora: 'przyjmujesz zlecenie',
      tresc: 'Wpisujesz raz: kontrahent, fracht, załadunek, rozładunek. Kontrahent podpowiada się sam.',
      plik: 'mockup-dzien-dy-zlecenie-desktop.png',
      alt: 'Nowe zlecenie, krok Klient: w polu wpisane „Agro”, pod nim podpowiedź Agro-Części Radom Sp. z o.o. z NIP-em.',
    },
    {
      godzina: '7:05',
      pora: 'przypisujesz kierowcę',
      tresc: 'System podpowiada, które auto i kierowca zdążą: dojazd, odpoczynek, ładowność, dokumenty. Decydujesz Ty.',
      plik: 'mockup-dzien-dy-przypisz-desktop.png',
      alt: 'Okno „Przypisz kurs” Milano → Poznań: polecane auto WX4821K z Janem Nowakiem, dojazd, odpoczynek i ładowność, przycisk „Przypisz i powiadom Jan”.',
    },
    {
      godzina: '7:06',
      pora: 'trasa układa się sama',
      tresc: 'System ustawia kolejność postojów, liczy kilometry i czas. Kierowca ma trasę w telefonie, nie przepisuje adresu.',
      plik: 'mockup-dzien-dy-trasa-desktop.png',
      alt: 'Zlecenie Kraków → Antwerpen, zakładka Trasa i śledzenie: trasa najszybsza 1290 km na mapie, czas dojazdu i przejazdy w ewidencji.',
    },
    {
      godzina: '13:20',
      pora: 'coś się zmienia',
      tresc: 'Kurs może się spóźnić - widzisz to w kolejce „Wymaga reakcji”. Jednym kliknięciem powiadamiasz klienta albo piszesz do kierowcy.',
      plik: 'mockup-dzien-dy-reakcja-desktop.png',
      alt: 'Dyspozytornia: w kolejce „Wymaga reakcji” spóźnienie Kraków → Antwerpen z przyciskiem „Powiadom klienta” i zgłoszenie kierowcy z „Odpowiedz”, obok mapa floty.',
    },
    {
      godzina: '17:00',
      pora: 'zamykasz dzień',
      tresc: 'Widzisz, kto gdzie jest, kto kończy i kto rusza jutro.',
      plik: 'mockup-dzien-dy-plan-desktop.png',
      alt: 'Plan floty na trzy dni: każde auto z kierowcą, kursy w trasie i zaplanowane, wolne okna i odpoczynki kierowców.',
    },
  ],
  en: [
    {
      godzina: '6:40',
      pora: 'you take an order',
      tresc: 'You enter it once: client, freight rate, loading, unloading. The client name fills itself in.',
      plik: 'mockup-dzien-dy-zlecenie-desktop.png',
      alt: 'New order, Client step: “Agro” typed in the field, with Agro-Części Radom Sp. z o.o. suggested below with its tax number.',
    },
    {
      godzina: '7:05',
      pora: 'you assign a driver',
      tresc: 'The system suggests which van and driver will make it: approach time, rest, payload, documents. You decide.',
      plik: 'mockup-dzien-dy-przypisz-desktop.png',
      alt: 'The “Assign run” window for Milan → Poznań: the recommended van WX4821K with Jan Nowak, approach time, rest and payload, and an “Assign and notify Jan” button.',
    },
    {
      godzina: '7:06',
      pora: 'the route plans itself',
      tresc: 'The system puts the stops in order and works out the kilometres and time. The driver has the route on their phone and doesn’t retype the address.',
      plik: 'mockup-dzien-dy-trasa-desktop.png',
      alt: 'Order Kraków → Antwerp, Route and tracking tab: the fastest 1,290 km route on the map, arrival time and trips in the log.',
    },
    {
      godzina: '13:20',
      pora: 'something changes',
      tresc: 'A run may arrive late - you see it in the “Needs action” queue. One click to notify the client or message the driver.',
      plik: 'mockup-dzien-dy-reakcja-desktop.png',
      alt: 'Dispatch: in the “Needs attention” queue a late Kraków → Antwerp run with a “Notify client” button and a driver report with “Reply”, next to the fleet map.',
    },
    {
      godzina: '17:00',
      pora: 'you close the day',
      tresc: 'You see who is where, who is finishing and who sets off tomorrow.',
      plik: 'mockup-dzien-dy-plan-desktop.png',
      alt: 'The three-day fleet plan: every van with its driver, runs on the road and planned, free windows and drivers’ rest.',
    },
  ],
};
