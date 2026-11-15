import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Wiersz = readonly [string, string, string];

type Grupa = {
  tytul: string;
  /** Nazwa funkcji i czy jest w Start (w Firmie jest zawsze). */
  wiersze: readonly (readonly [string, boolean])[];
};

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  plany: readonly [string, string];
  parametry: readonly Wiersz[];
  /**
   * Prowadzenie firmy jest w obu planach. Wszystko, co trafia do programu
   * księgowej, jest tylko w Firmie - patrz `content/cennik.ts`.
   */
  grupy: readonly Grupa[];
  ceny: readonly Wiersz[];
}> = {
  pl: {
    naglowek: 'Co jest w którym planie.',
    plany: ['Start', 'Firma'],
    parametry: [
      ['Pojazdy', '1-3', '1-50, 10 w cenie, +29 zł za kolejny'],
      ['Kierowcy i biuro', 'bez limitu', 'bez limitu'],
    ],
    grupy: [
      {
        tytul: 'Prowadzenie firmy',
        wiersze: [
          ['Zlecenia, dyspozytornia, czat', true],
          ['Mapa floty na żywo', true],
          ['Trasy GPS i ewidencja przebiegu PDF', true],
          ['CMR z podpisem w aplikacji', true],
          ['Czas pracy i przerwy', true],
          ['Diety i delegacje', true],
          ['Faktury KSeF z przypomnieniami', true],
          ['Koszty i paragony ze zdjęć', true],
          ['Zysk na kursie, raporty kosztów floty', true],
          ['Dostęp dla księgowej', true],
        ],
      },
      {
        tytul: 'Księgowość bez przepisywania',
        wiersze: [
          ['Paczka dla biura (ZIP)', false],
          ['Dekrety FK (Optima, Insert GT, Symfonia)', false],
          ['Rejestry VAT w Excelu', false],
          ['JPK_V7M', false],
          ['Lista płac', false],
          ['Delegacje w formacie programu księgowego', false],
        ],
      },
    ],
    ceny: [
      ['Miesięcznie', '149 zł', '299 zł'],
      ['Rocznie', '1 490 zł', '2 990 zł'],
    ],
  },
  en: {
    naglowek: 'What’s in each plan.',
    plany: ['Start', 'Business'],
    parametry: [
      ['Vehicles', '1-3', '1-50, 10 included, +PLN 29 per extra'],
      ['Drivers and office', 'unlimited', 'unlimited'],
    ],
    grupy: [
      {
        tytul: 'Running the company',
        wiersze: [
          ['Orders, dispatch, chat', true],
          ['Live fleet map', true],
          ['GPS routes and mileage log in PDF', true],
          ['CMR signed in the app', true],
          ['Working time and breaks', true],
          ['Per diems and business trips', true],
          ['KSeF invoices with reminders', true],
          ['Costs and receipts from photos', true],
          ['Profit per trip, fleet cost reports', true],
          ['Accountant access', true],
        ],
      },
      {
        tytul: 'Accounting without retyping',
        wiersze: [
          ['Office pack (ZIP)', false],
          ['Journal entries (Optima, Insert GT, Symfonia)', false],
          ['VAT registers in Excel', false],
          ['JPK_V7M', false],
          ['Payroll list', false],
          ['Business trips in your accounting software format', false],
        ],
      },
    ],
    ceny: [
      ['Monthly', 'PLN 149', 'PLN 299'],
      ['Yearly', 'PLN 1,490', 'PLN 2,990'],
    ],
  },
};

const wiersz = 'grid grid-cols-[1fr_64px_64px] items-center gap-3 lg:grid-cols-[1fr_200px_200px]';

/** Tabela porównawcza – ma się czytać jak tabela, bez ozdobników. */
export function Tabela() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:gap-14">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {t.naglowek}
        </h2>

        <div data-reveal className="text-[14px] lg:text-body">
          <div
            className={`${wiersz} border-b border-line pb-4 text-[15px] font-semibold lg:text-[19px]`}
          >
            <span />
            <span className="text-center lg:text-left">{t.plany[0]}</span>
            <span className="text-center lg:text-left">{t.plany[1]}</span>
          </div>

          {t.parametry.map(([nazwa, start, firma]) => (
            <div key={nazwa} className={`${wiersz} border-b border-line py-3.5 lg:py-4`}>
              <span className="font-medium">{nazwa}</span>
              <span className="text-center text-muted lg:text-left">{start}</span>
              <span className="text-center text-muted lg:text-left">{firma}</span>
            </div>
          ))}

          {t.grupy.map((grupa) => (
            <div key={grupa.tytul}>
              <div className="border-b border-line pt-8 pb-3 text-[12px] font-semibold tracking-[0.08em] text-muted uppercase lg:pt-10 lg:text-[13px]">
                {grupa.tytul}
              </div>
              {grupa.wiersze.map(([nazwa, wStart]) => (
                <div key={nazwa} className={`${wiersz} border-b border-line py-3.5 lg:py-4`}>
                  <span className="font-medium">{nazwa}</span>
                  <span
                    className={`text-center lg:text-left ${wStart ? 'text-blue' : 'text-muted'}`}
                  >
                    {wStart ? '✓' : '-'}
                  </span>
                  <span className="text-center text-blue lg:text-left">✓</span>
                </div>
              ))}
            </div>
          ))}

          {t.ceny.map(([nazwa, start, firma], i) => (
            <div
              key={nazwa}
              className={`${wiersz} py-3.5 lg:py-4 ${
                i === 0 ? 'border-b border-line' : ''
              }`}
            >
              <span className="font-medium">{nazwa}</span>
              <b className="text-center lg:text-left">{start}</b>
              <b className="text-center lg:text-left">{firma}</b>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
