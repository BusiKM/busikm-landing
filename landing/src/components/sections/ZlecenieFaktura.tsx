import { Section, Bullets, Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { ZlecenieFakturaMockup } from '@/components/mockups/ZlecenieFakturaMockup';
import { Dolaczone, type OdnosnikWiecej, type PunktDolaczony } from '@/components/sections/Dolaczone';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  tytul1: string;
  tytul2: string;
  lead: string;
  bullets: string[];
  label: string;
  opis: string;
  /** Z dawnych sekcji „Koszty i paragony” i „Koniec miesiąca”. */
  punkty: readonly PunktDolaczony[];
  wiecej: readonly OdnosnikWiecej[];
}> = {
  pl: {
    eyebrow: 'Faktury, koszty i księgowa',
    tytul1: 'Ze zlecenia robi się faktura.',
    tytul2: 'Klient ma ją, zanim wrócisz do biura.',
    lead: 'Zlecenie i faktura to jedno. Kierowca kończy kurs, Ty sprawdzasz kwotę i klikasz „Wystaw i wyślij do KSeF”. Wysyłkę do klienta zlecasz od razu, a PDF z kodem QR wychodzi mailem, gdy KSeF nada numer. Nic nie przepisujesz.',
    bullets: [
      'Faktura powstaje z danych zlecenia',
      'KSeF jednym przyciskiem, mail do klienta po nadaniu numeru',
      'Zaliczki, korekty i faktura zbiorcza z kilku zleceń',
    ],
    label: 'Zlecenie i faktura (desktop)',
    opis: 'Zlecenie Bielsko-Biała → Venlo, zakładka Finanse: fracht w euro przeliczony po kursie NBP, koszty kursu, wynik i marża, obok faktura FV/020/11/2026 ze statusem „W KSeF” i przyciskiem „Wyślij klientowi”.',
    punkty: [
      ['Paragon zdjęciem', 'Kierowca robi zdjęcie na stacji. Kwotę, datę i sprzedawcę BusiKM odczyta sam, a koszt trafia do właściwego zlecenia.'],
      ['Faktury kosztowe wpadają same', 'Z KSeF i z maila. Koszt w obcej walucie przeliczony po kursie z dnia.'],
      ['Księgowa dostaje komplet jednym przyciskiem (plan Firma)', 'Dekrety do FK, rejestry VAT, płace i diety, delegacje, ewidencje przebiegu i JPK.'],
      ['W programie, którego już używa', 'Comarch Optima, Insert GT, Symfonia albo CSV. Księgowa z zewnątrz dostaje własny dostęp.'],
    ],
    wiecej: [
      { href: '/co-robi/koszty-i-paragony', label: 'Więcej: koszty i paragony' },
      { href: '/co-robi/dane-dla-ksiegowej', label: 'Więcej: dane dla księgowej' },
    ],
  },
  en: {
    eyebrow: 'Invoices, costs and your accountant',
    tytul1: 'The order becomes the invoice.',
    tytul2: 'Your client has it before you’re back at the office.',
    lead: 'The order and the invoice are one and the same. The driver finishes the job, you check the amount and click “Issue and send to KSeF”, Poland’s national e-invoicing system. You schedule the email to the client straight away, and the PDF with a QR code goes out once KSeF assigns a number. Nothing to retype.',
    bullets: [
      'The invoice is built from the order data',
      'KSeF in one click, the client’s email once the number is in',
      'Advance invoices, corrections and one invoice for several orders',
    ],
    label: 'Order and invoice (desktop)',
    opis: 'Order Bielsko-Biała → Venlo, Finance tab: freight in euros converted at the NBP rate, run costs, result and margin, next to invoice FV/020/11/2026 marked “In KSeF” with a “Send to client” button.',
    punkty: [
      ['A receipt as a photo', 'The driver takes a photo at the fuel station. BusiKM reads the amount, date and seller itself, and the cost goes to the right order.'],
      ['Cost invoices arrive by themselves', 'From KSeF and from email. Foreign-currency costs converted at the day’s rate.'],
      ['Your accountant gets the full set in one click (Business plan)', 'Ledger entries, VAT registers, payroll and allowances, business trips, mileage logs and JPK files.'],
      ['In the software they already use', 'Comarch Optima, Insert GT, Symfonia or CSV. An external accountant gets their own login.'],
    ],
    wiecej: [
      { href: '/co-robi/koszty-i-paragony', label: 'More: costs and receipts' },
      { href: '/co-robi/dane-dla-ksiegowej', label: 'More: data for your accountant' },
    ],
  },
};

/** 6.7 – ze zlecenia robi się faktura. */
export function ZlecenieFaktura() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7 lg:order-2">
          <Eyebrow data-reveal>{t.eyebrow}</Eyebrow>
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.tytul1} <br className="hidden lg:inline" />
            {t.tytul2}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.lead}
          </p>
          <Bullets items={t.bullets} />
        </div>

        {/*
          Zrzut v2 stoi w tej samej ramce laptopa co reszta strony i wypełnia
          szerokość kadru, więc nie potrzebuje powiększenia. Poprzedni plik
          był monitorem na kwadratowym płótnie – stąd dawne skale 1,5 i 1,9.
        */}
        <div data-reveal className="lg:order-1">
          <MockupSlot
            file="mockup-faktury-zlecenie-desktop.png"
            label={t.label}
            note={t.opis}
            ratio="4:3"
          >
            <ZlecenieFakturaMockup />
          </MockupSlot>
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <Dolaczone punkty={t.punkty} wiecej={t.wiecej} />
      </div>
    </Section>
  );
}
