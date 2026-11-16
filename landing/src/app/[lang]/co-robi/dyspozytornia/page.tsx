import Link from '@/i18n/Link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Blok } from '@/components/ui/Blok';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { metadataPodstrony } from '@/lib/metadata';
import { biezacyJezyk, jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { Hero } from '@/components/pages/dyspozytornia/Hero';
import { JedenEkran } from '@/components/pages/dyspozytornia/JedenEkran';
import { TrasaIZmiana } from '@/components/pages/dyspozytornia/TrasaIZmiana';
import { Drobiazgi } from '@/components/ui/Drobiazgi';
import { KartaZlecenia } from '@/components/mockups/dyspozytornia/KartaZlecenia';
import { ZakresDostepu } from '@/components/mockups/dyspozytornia/ZakresDostepu';
import { Rozdzielacz } from '@/components/ui/Rozdzielacz';
import { Wycinek } from '@/components/ui/Wycinek';

export const generateMetadata = metadataPodstrony('co-robi/dyspozytornia');

const KLASY_STATUSOW = [
  'bg-mist text-ink',
  'bg-blue-soft text-blue-dark',
  'bg-mist text-ink',
  'bg-green/14 text-green-ink',
] as const;

type Tekst = { tytul: string; tresc: string };

const TEKSTY: Tlumaczenia<{
  pytania: readonly (readonly [string, string])[];
  naglowekPytan: string;
  drobiazgi: string[];
  statusy: string[];
  zlecenie: Tekst & { label: string; note: string };
  przypisanie: Tekst & { alt: string };
  rozmowa: Tekst & { label: string; note: string };
  stanowisko: Tekst & { label: string; note: string };
  ktoUzywa: string;
  dyspozytor: string;
  wlasciciel: string;
}> = {
  pl: {
    pytania: [
      [
        'Czy dyspozytor widzi, ile zarabiam?',
        'Nie musi. Prowadzi trasy i zlecenia. Pieniądze widzi właściciel i osoba od rozliczeń.',
      ],
      [
        'Czy mogę być dyspozytorem i właścicielem naraz?',
        'Tak, i tak jest najczęściej. Dyspozytornię masz w menu, obok pulpitu i faktur.',
      ],
      [
        'Ilu dyspozytorów mogę dodać?',
        'Tylu, ilu potrzebujesz. Płacisz za pojazdy, nie za ludzi.',
      ],
    ],
    naglowekPytan: 'Trzy pytania',
    drobiazgi: [
      'Plik zlecenia dołączony do kursu',
      'Podpowiedź, kto zdąży',
      'Historia zleceń z filtrami',
      'Oddajesz kurs podwykonawcy - widzisz marżę i czy ma ważne OCP',
      'Link śledzenia dla klienta',
      'Doładunek po drodze',
      'Punkt postoju zaznaczony na mapie i ostrzeżenie przy niedokładnym adresie',
      'Kierowca odrzuca kurs z powodem. Bez odpowiedzi przez 4 h kurs wraca do przydziału',
      'Czas dojazdu co minutę z pozycji auta, a przy spóźnieniu „Napisz do kierowcy”',
    ],
    statusy: ['przyjęte', 'przypisane', 'w trasie', 'dostarczone'],
    zlecenie: {
      tytul: 'Zlecenie od przyjęcia po rozliczenie',
      tresc:
        'Zleceniodawca, załadunek, rozładunek, terminy, stawka. Pasek u góry karty pokazuje, gdzie jest kurs: przyjęte, przypisane, załadowane, w trasie, dostarczone, zafakturowane.',
      label: 'Karta zlecenia (desktop)',
      note: 'Zlecenie Köln → Kalisz, zakładka Przegląd: pasek etapów, postoje z mapą, kierowca i auto z przyciskami „Zadzwoń” i „Napisz”, fracht i marża.',
    },
    przypisanie: {
      tytul: 'Przypisujesz auto, które zdąży',
      tresc: 'System podpowiada, które auto i kierowca zdążą na załadunek: dojazd, odpoczynek i czas jazdy, ładowność, ważne dokumenty. Przy reszcie pisze, dlaczego nie.',
      alt: 'Okno „Przypisz kurs” Milano → Poznań: w sekcji „Kto zdąży na załadunek” auto WX4821K z kierowcą Janem Nowakiem oznaczone jako polecane, z dojazdem, odpoczynkiem i ładownością, oraz przycisk „Przypisz i powiadom Jan”.',
    },
    rozmowa: {
      tytul: 'Do kierowcy piszesz jednym kliknięciem',
      tresc:
        '„Napisz” na karcie kursu otwiera czat zlecenia. Nie szukasz numeru, a cała rozmowa zostaje przy kursie. Wolisz zadzwonić - obok jest „Zadzwoń”.',
      label: 'Czat zlecenia u kierowcy (telefon, tryb nocny)',
      note: 'Czat w aplikacji BusiKM Kierowca z dyspozytorem Markiem Górskim przy kursie Kraków → Antwerpen: poprawione zdjęcie paragonu, korek przed Hanowerem, godzina przyjazdu z aplikacji i odpowiedź klienta, na dole szybkie odpowiedzi.',
    },
    stanowisko: {
      tytul: 'Dyspozytor to osobne stanowisko',
      tresc:
        'Ma własny dostęp. Widzi to, czego potrzebuje do prowadzenia tras - nie widzi faktur, kosztów firmy ani raportów. W małej firmie właściciel otwiera dyspozytornię z menu, bo ma ją u siebie.',
      label: 'Zlecenia oczami dyspozytora (desktop)',
      note: 'Zalogowany dyspozytor Marek Górski: w menu Dyspozytornia, Zlecenia, Pojazdy, Kierowcy, Dokumenty i Kontrahenci, bez faktur, kosztów i raportów. Lista zleceń z przyciskami „Przypisz kierowcę”.',
    },
    ktoUzywa: 'Kto tego używa:',
    dyspozytor: 'Dyspozytor →',
    wlasciciel: 'Właściciel →',
  },
  en: {
    pytania: [
      [
        'Can the dispatcher see how much I earn?',
        'They don’t need to. They run routes and orders. The money is for the owner and whoever does the books.',
      ],
      [
        'Can I be the dispatcher and the owner at once?',
        'Yes, and that’s the most common set-up. Dispatch sits in your menu, next to the dashboard and invoices.',
      ],
      [
        'How many dispatchers can I add?',
        'As many as you need. You pay for vans, not for people.',
      ],
    ],
    naglowekPytan: 'Three questions',
    drobiazgi: [
      'The client’s order file attached to the run',
      'A hint on who will make it',
      'Order history with filters',
      'You hand a run to a subcontractor - you see the margin and whether their carrier’s insurance (OCP) is valid',
      'A tracking link for the client',
      'An extra pickup on the way',
      'Stops pinned on the map, with a warning when the address is imprecise',
      'The driver turns a run down with a reason. No answer within 4 h and the run goes back to be reassigned',
      'Arrival time updated every minute from the van’s position, with “Message driver” when it’s running late',
    ],
    statusy: ['accepted', 'assigned', 'on the road', 'delivered'],
    zlecenie: {
      tytul: 'An order from acceptance to settlement',
      tresc:
        'Client, loading, unloading, deadlines, rate. The bar at the top of the card shows where the run is: accepted, assigned, loaded, on the road, delivered, invoiced.',
      label: 'Order card (desktop)',
      note: 'Order Köln → Kalisz, Overview tab: progress bar, stops with a map, driver and van with “Call” and “Message” buttons, freight and margin.',
    },
    przypisanie: {
      tytul: 'You assign a van that will make it',
      tresc: 'The system suggests which van and driver will make the pickup: approach time, rest and driving time, payload, valid documents. For the rest it says why not.',
      alt: 'The “Assign run” window for Milan → Poznań: under “Who will make the pickup” the van WX4821K with driver Jan Nowak marked as recommended, with approach time, rest and payload, and an “Assign and notify Jan” button.',
    },
    rozmowa: {
      tytul: 'Message the driver in one click',
      tresc:
        '“Message” on the run card opens the order chat. No looking up numbers, and the whole conversation stays with the run. Rather call? “Call” is right next to it.',
      label: 'Order chat on the driver’s phone (dark mode)',
      note: 'The chat in the BusiKM Driver app with dispatcher Marek Górski on the Kraków → Antwerp run: a retaken receipt photo, a traffic jam before Hanover, the arrival time from the app and the client’s answer, with quick replies at the bottom.',
    },
    stanowisko: {
      tytul: 'Dispatcher is a role of its own',
      tresc:
        'They get their own access. They see what they need to run routes - not invoices, company costs or reports. In a small firm the owner opens dispatch from the menu, because it’s there for them too.',
      label: 'Orders as the dispatcher sees them (desktop)',
      note: 'Signed in as dispatcher Marek Górski: the menu has Dispatch, Orders, Vehicles, Drivers, Documents and Contractors, with no invoices, costs or reports. The order list with “Assign driver” buttons.',
    },
    ktoUzywa: 'Who uses it:',
    dyspozytor: 'Dispatcher →',
    wlasciciel: 'Owner →',
  },
};

/**
 * Dyspozytornia – podstrona wg projektu „BusiKM Dyspozytornia" z Claude Design
 * (design/03-dyspozytornia). Treść: docs/landing/05, rozdział A2.
 */
export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  const t = TEKSTY[biezacyJezyk()];
  return (
    <>
      <Header />
      <main>
        <Hero />
        <JedenEkran />

        <Blok
          numer="02"
          tytul={t.zlecenie.tytul}
          tresc={t.zlecenie.tresc}
          dodatek={
            <div className="flex flex-wrap gap-2 text-[14px] font-medium">
              {t.statusy.map((nazwa, i) => (
                <span key={nazwa} className={`rounded-full px-3.5 py-2 ${KLASY_STATUSOW[i]}`}>
                  {nazwa}
                </span>
              ))}
            </div>
          }
          makieta={
            <MockupSlot
              file="mockup-dyspozytornia-zlecenie-desktop.png"
              label={t.zlecenie.label}
              note={t.zlecenie.note}
              ratio="4:3"
            >
              <KartaZlecenia />
            </MockupSlot>
          }
        />

        <Blok
          tone="ink"
          strona="left"
          numer="03"
          tytul={t.przypisanie.tytul}
          tresc={t.przypisanie.tresc}
          makieta={
            <Wycinek
              plik="mockup-dyspozytornia-przypisz-wycinek.png"
              alt={t.przypisanie.alt}
              szer={752}
              wys={984}
              dark
              className="mx-auto w-full max-w-[460px]"
            />
          }
        />

        <TrasaIZmiana />

        <Blok
          tone="ink"
          numer="06"
          tytul={t.rozmowa.tytul}
          tresc={t.rozmowa.tresc}
          makieta={
            <MockupSlot
              file="mockup-dyspozytornia-czat-phone.png"
              label={t.rozmowa.label}
              note={t.rozmowa.note}
              ratio="9:19.5"
              box="6:7"
              imageScale={1.8}
              imageScaleTelefon={1.8}
              dark
            >
              {null}
            </MockupSlot>
          }
        />

        <Blok
          strona="left"
          numer="07"
          tytul={t.stanowisko.tytul}
          tresc={t.stanowisko.tresc}
          makieta={
            <MockupSlot
              file="mockup-dyspozytornia-dyspozytor-desktop.png"
              label={t.stanowisko.label}
              note={t.stanowisko.note}
              ratio="4:3"
            >
              <ZakresDostepu />
            </MockupSlot>
          }
        />

        <Drobiazgi
          kafelki={t.drobiazgi}
          stopka={
            <>
              {t.ktoUzywa}{' '}
              <Link href="/dla-kogo/dyspozytor">
                {t.dyspozytor}
              </Link>
              <Rozdzielacz />
              <Link href="/dla-kogo/wlasciciel">
                {t.wlasciciel}
              </Link>
            </>
          }
        />
        <Akordeon heading={t.naglowekPytan} items={t.pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
