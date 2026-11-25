import { Section, Eyebrow } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';
import { iosWSklepie } from '@/content/sklepy';

type Grupa = { nazwa: string; pozycje: readonly string[] };

/**
 * Każda pozycja potwierdzona w kodzie aplikacji albo na podstronach:
 * KSeF, JPK_V7M, JPK_FA i VAT-REF w eksportach dla księgowej, kurs z API NBP
 * w backendzie, eksport FK do Comarch Optima, Insert GT i Symfonia oraz CSV
 * i Excel, nawigacja zewnętrzna w aplikacji kierowcy (bez nazw aplikacji map
 * Google: osobna akceptacja marek Mapy Google, Waze i Android Auto,
 * 19.11.2026; Apple Maps i CarPlay razem z wersją na iPhone, `iosWSklepie`,
 * Apple pierwsze, jak każą wytyczne Apple), dane kontrahenta z GUS i VIES.
 *
 * Same nazwy, bez logotypów – znaki towarowe dopiero po decyzji, czy
 * i w jakiej formie wolno ich używać.
 */
const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  naglowek: string;
  grupy: readonly Grupa[];
}> = {
  pl: {
    eyebrow: 'Integracje',
    naglowek: 'Działa z tym, czego już używasz.',
    grupy: [
      { nazwa: 'Faktury i podatki', pozycje: ['KSeF', 'JPK_V7M', 'JPK_FA', 'VAT-REF', 'Kurs NBP'] },
      { nazwa: 'Programy księgowe (plan Firma)', pozycje: ['Comarch Optima', 'Insert GT', 'Symfonia', 'CSV i Excel'] },
      {
        nazwa: 'Nawigacja w kabinie',
        pozycje: iosWSklepie
          ? ['Apple Maps', 'CarPlay', 'Inne aplikacje nawigacyjne', 'Ekran w kabinie']
          : ['Aplikacja nawigacyjna kierowcy', 'Ekran w kabinie'],
      },
      { nazwa: 'Dane kontrahentów', pozycje: ['GUS', 'VIES'] },
    ],
  },
  en: {
    eyebrow: 'Integrations',
    naglowek: 'Works with what you already use.',
    grupy: [
      { nazwa: 'Invoices and tax', pozycje: ['KSeF', 'JPK_V7M', 'JPK_FA', 'VAT-REF', 'NBP exchange rate'] },
      { nazwa: 'Accounting software (Business plan)', pozycje: ['Comarch Optima', 'Insert GT', 'Symfonia', 'CSV and Excel'] },
      {
        nazwa: 'Navigation in the cab',
        pozycje: iosWSklepie
          ? ['Apple Maps', 'CarPlay', 'Other navigation apps', 'The in-cab screen']
          : ['The driver’s navigation app', 'The in-cab screen'],
      },
      { nazwa: 'Client data', pozycje: ['GUS', 'VIES'] },
    ],
  },
};

/** Integracje – cztery grupy z nazwami w pigułkach. */
export function Integracje() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="mist">
      <div className="flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-5 lg:gap-6">
          <Eyebrow data-reveal>{t.eyebrow}</Eyebrow>
          <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
            {t.naglowek}
          </h2>
        </div>

        <div data-reveal-group className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {t.grupy.map((g) => (
            <div key={g.nazwa} data-reveal className="flex flex-col gap-4 border-t border-line pt-5">
              <h3 className="text-[17px] font-semibold lg:text-[19px]">{g.nazwa}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.pozycje.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-line bg-white px-3 py-1.5 text-[14px] font-medium text-ink lg:text-[15px]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
