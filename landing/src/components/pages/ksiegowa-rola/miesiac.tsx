import type { MomentDnia } from '@/components/ui/ScenaDnia';
import type { Tlumaczenia } from '@/i18n/jezyki';

/** Miesiąc księgowej – od dokumentów, które wpadają same, po zamknięty miesiąc. */
export const miesiacKsiegowej: Tlumaczenia<MomentDnia[]> = {
  pl: [
    {
      godzina: 'przez cały\nmiesiąc',
      pora: '1-31',
      tresc: 'Faktury, koszty i trasy wpadają same. Nie prosisz o nic. Faktury i korekty wystawisz też tutaj.',
      plik: 'mockup-dzien-ks-faktury-desktop.png',
      alt: 'Faktury oczami księgowej: do zapłaty, po terminie, zapłacone i KSeF, lista faktur z terminami, stanem płatności i statusem w KSeF.',
    },
    {
      godzina: 'ostatni\ntydzień',
      pora: '24-31',
      tresc: 'Otwierasz sześć kroków miesiąca: faktury, koszty, przebieg, płace i diety, deklaracje i zamknięcie z plikami. Przy braku masz odnośnik prosto do niego.',
      plik: 'mockup-dzien-ks-miesiac-desktop.png',
      alt: 'Rozliczenia, „Zamknięcie października”: kroki faktury, koszty, ewidencja przebiegu, płace i diety, deklaracje i zamknięcie z plikami, obok najbliższe terminy podatkowe.',
    },
    {
      godzina: 'pierwszy\ndzień po',
      pora: '1.',
      tresc: 'Wybierasz miesiąc i klikasz „Pobierz paczkę dla biura” (plan Firma). Przed zamknięciem dostajesz wersję roboczą.',
      plik: 'mockup-dzien-ks-paczka-desktop.png',
      alt: 'Rozliczenia, zakładka Eksporty: „Pobierz paczkę dla biura”, dekrety do Comarch Optima, Insert GT albo Symfonii, rejestry VAT, płace i diety w Excelu i CSV.',
    },
    {
      godzina: 'wczytujesz',
      pora: 'u siebie',
      tresc: 'Do Comarch Optima, Insert GT albo Symfonii. Płace i diety przychodzą już zatwierdzone, a rejestry i płace masz także w Excelu.',
      plik: 'mockup-dzien-ks-place-desktop.png',
      alt: 'Rozliczenia, Płace i diety: do rozliczenia razem, wynagrodzenia, diety i noclegi, lista kierowców z dniami za granicą i zatwierdzonymi rozliczeniami.',
    },
    {
      godzina: 'zamykasz\nmiesiąc',
      tresc: 'Zamknięty miesiąc blokuje zmiany wstecz, a paczka staje się ostateczna, z JPK_V7M.',
      plik: 'mockup-dzien-ks-zamkniecie-desktop.png',
      alt: 'Rozliczenia, Deklaracje za październik: CIT, zaliczka PIT, JPK_V7M i VAT-UE z terminami, kwotami i stanem.',
    },
  ],
  en: [
    {
      godzina: 'all\nmonth',
      pora: '1-31',
      tresc: 'Invoices, costs and routes come in on their own. You don’t ask for anything, and you can issue invoices and corrections yourself.',
      plik: 'mockup-dzien-ks-faktury-desktop.png',
      alt: 'Invoices as the accountant sees them: due, overdue, paid and KSeF, with the invoice list, payment terms, payment status and KSeF status.',
    },
    {
      godzina: 'last\nweek',
      pora: '24-31',
      tresc: 'You open the six month-end steps: invoices, costs, mileage, payroll and allowances, tax returns, and closing with the files. Any gap comes with a link straight to it.',
      plik: 'mockup-dzien-ks-miesiac-desktop.png',
      alt: 'Settlements, “Closing October”: the steps for invoices, costs, mileage log, payroll and allowances, tax returns and closing with the files, with upcoming tax deadlines alongside.',
    },
    {
      godzina: 'first day\nafter',
      pora: '1st',
      tresc: 'You pick the month and click “Download the package for the office” (Business plan). Before closing, you get a draft version.',
      plik: 'mockup-dzien-ks-paczka-desktop.png',
      alt: 'Settlements, Exports tab: “Download the office package”, postings for Comarch Optima, Insert GT or Symfonia, VAT registers, payroll and allowances in Excel and CSV.',
    },
    {
      godzina: 'you import',
      pora: 'on your side',
      tresc: 'Into Comarch Optima, Insert GT or Symfonia (Polish accounting software). Payroll and allowances arrive already approved, and registers and payroll are in Excel too.',
      plik: 'mockup-dzien-ks-place-desktop.png',
      alt: 'Settlements, Payroll and allowances: totals to settle, pay, allowances and overnight stays, and the list of drivers with days abroad and approved settlements.',
    },
    {
      godzina: 'you close\nthe month',
      tresc: 'A closed month locks changes after the fact, and the package becomes final, with JPK_V7M.',
      plik: 'mockup-dzien-ks-zamkniecie-desktop.png',
      alt: 'Settlements, Tax returns for October: CIT, PIT advance, JPK_V7M and VAT-UE with deadlines, amounts and status.',
    },
  ],
};
