import type { MomentDnia } from '@/components/ui/ScenaDnia';
import type { Tlumaczenia } from '@/i18n/jezyki';

/** Dzień właściciela – cztery chwile, każda z prawdziwym ekranem aplikacji. */
export const dzienWlasciciela: Tlumaczenia<MomentDnia[]> = {
  pl: [
    {
      godzina: '7:10',
      pora: 'rano',
      tresc:
        'Otwierasz pulpit. Na górze „Do zrobienia” i to, co dzieje się dziś, niżej przychód, koszty i wynik miesiąca.',
      plik: 'mockup-dzien-wl-pulpit-desktop.png',
      alt: 'Pulpit właściciela: „Do zrobienia” z fakturą odrzuconą przez KSeF, proformą i kursem, który może się spóźnić, obok „Dziś” z kursami w trasie.',
    },
    {
      godzina: '11:40',
      pora: 'w ciągu dnia',
      tresc: 'Dzwoni klient, pyta o ładunek. Patrzysz na mapę w dyspozytorni i odpowiadasz, zanim skończy pytanie.',
      plik: 'mockup-dzien-wl-mapa-desktop.png',
      alt: 'Dyspozytornia: liczniki dnia, kolejka „Wymaga reakcji” i mapa floty z autami kierowców.',
    },
    {
      godzina: '16:20',
      pora: 'po południu',
      tresc:
        'Kierowca zamknął kurs, szkic faktury już czeka - z klientem, trasą i frachtem ze zlecenia. Sprawdzasz kwotę i wystawiasz jednym kliknięciem, a z podłączonym KSeF od razu ją tam wysyłasz.',
      plik: 'mockup-dzien-wl-faktura-desktop.png',
      alt: 'Szkic faktury za transport Milano → Łódź: strony, pozycja ze zlecenia, kwoty netto, VAT i razem, przycisk „Wystaw fakturę”.',
    },
    {
      godzina: 'koniec',
      pora: 'miesiąca',
      tresc: 'W planie Firma jeden przycisk i księgowa ma komplet. Nie dzwoni z pytaniami.',
      plik: 'mockup-dzien-wl-paczka-desktop.png',
      alt: 'Rozliczenia, zakładka Eksporty: przycisk „Pobierz paczkę dla biura”, dekrety do programu księgowego, rejestry VAT, płace i diety, delegacje i ewidencja przebiegu.',
    },
  ],
  en: [
    {
      godzina: '7:10',
      pora: 'morning',
      tresc:
        'You open the dashboard. “To do” and what’s happening today on top, the month’s revenue, costs and result below.',
      plik: 'mockup-dzien-wl-pulpit-desktop.png',
      alt: 'The owner’s dashboard: “To do” with an invoice rejected by KSeF, a pro forma and a run that may be late, with “Today” and the runs on the road alongside.',
    },
    {
      godzina: '11:40',
      pora: 'during the day',
      tresc: 'A client calls about their load. You look at the map in dispatch and answer before they finish asking.',
      plik: 'mockup-dzien-wl-mapa-desktop.png',
      alt: 'Dispatch: today’s counters, the “Needs attention” queue and the fleet map with the drivers’ vans.',
    },
    {
      godzina: '16:20',
      pora: 'afternoon',
      tresc:
        'The driver has closed the job and the invoice draft is waiting - client, route and freight taken from the order. You check the amount and issue it in one click, and with KSeF connected it goes straight there.',
      plik: 'mockup-dzien-wl-faktura-desktop.png',
      alt: 'An invoice draft for transport Milan → Łódź: the parties, the line from the order, net, VAT and total, and an “Issue invoice” button.',
    },
    {
      godzina: 'end',
      pora: 'of the month',
      tresc: 'In the Business plan, one button and your accountant has everything. No calls with questions.',
      plik: 'mockup-dzien-wl-paczka-desktop.png',
      alt: 'Settlements, Exports tab: a “Download the office package” button, postings for accounting software, VAT registers, payroll and allowances, business trips and the mileage log.',
    },
  ],
};
