import { Section } from '@/components/ui/Section';
import { Makieta } from '@/components/ui/Makieta';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const DEV = process.env.NODE_ENV === 'development';

type Ruch = {
  n: string;
  tytul: string;
  opis: string;
  /** Co znika z dnia – przekreślone pod opisem. */
  koniec: string;
  plik: string;
  alt: string;
};

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  koniecZ: string;
  ruchy: readonly Ruch[];
}> = {
  pl: {
    naglowek: 'Trzy ruchy. Reszta dzieje się bez Ciebie.',
    koniecZ: 'Koniec z:',
    ruchy: [
      {
        n: '01',
        tytul: 'Kierowca rusza',
        opis: 'Klika „Zacznij dzień”, robi zdjęcie licznika i jedzie. Ty widzisz go na mapie.',
        koniec: 'dzwonieniem „gdzie jesteś?”',
        plik: 'mockup-hero-telefon-phone.png',
        alt: 'Ekran „Dziś” w aplikacji BusiKM Kierowca: kurs Kraków → Antwerpen w trasie, załadunek i rozładunek, przycisk „Jestem na rozładunku”.',
      },
      {
        n: '02',
        tytul: 'Dane same lecą',
        opis: 'Trasa, kilometry, czas pracy i paragony trafiają do Ciebie w trakcie kursu, nawet gdy kierowca nie ma zasięgu.',
        koniec: 'paragonami w reklamówce i wieczorami w Excelu',
        plik: 'mockup-koszty-paragon-phone.png',
        alt: 'Ekran „Moje koszty” w aplikacji BusiKM Kierowca: przycisk „Dodaj paragon”, zwrot dla kierowcy i lista paragonów z listopada.',
      },
      {
        n: '03',
        tytul: 'Miesiąc się zamyka',
        opis: 'Faktury dla klientów, koszty i przebieg. W planie Firma także komplet dla księgowej jednym przyciskiem.',
        koniec: 'tłumaczeniem księgowej, czego brakuje',
        plik: 'mockup-ksiegowa-eksport-desktop.png',
        alt: 'Rozliczenia za październik w panelu BusiKM: dekrety, rejestry VAT, lista płac, delegacje i ewidencja przebiegu, przycisk „Pobierz paczkę dla biura”.',
      },
    ],
  },
  en: {
    naglowek: 'Three moves. The rest happens without you.',
    koniecZ: 'No more:',
    ruchy: [
      {
        n: '01',
        tytul: 'The driver sets off',
        opis: 'Taps “Start the day”, snaps the odometer and drives off. You see them on the map.',
        koniec: 'ringing to ask “where are you?”',
        plik: 'mockup-hero-telefon-phone.png',
        alt: 'The “Today” screen in the BusiKM Driver app: a Kraków → Antwerp job on the road, loading and unloading, an “I’m at unloading” button.',
      },
      {
        n: '02',
        tytul: 'The data sends itself',
        opis: 'Route, kilometres, working time and receipts reach you during the job, even when the driver has no signal.',
        koniec: 'receipts in a carrier bag and evenings in Excel',
        plik: 'mockup-koszty-paragon-phone.png',
        alt: 'The “My costs” screen in the BusiKM Driver app: an “Add receipt” button, the driver’s refund and November’s receipts.',
      },
      {
        n: '03',
        tytul: 'The month closes',
        opis: 'Client invoices, costs and mileage. In the Business plan, the full set for your accountant in one click too.',
        koniec: 'telling your accountant what’s missing',
        plik: 'mockup-ksiegowa-eksport-desktop.png',
        alt: 'October settlements in the BusiKM panel: postings, VAT registers, payroll, business trips and mileage log, a “Download the office package” button.',
      },
    ],
  },
};

/**
 * 6.2 + 6.4 – trzy ruchy. Każdy ruch ma ekran aplikacji, opis i jedną
 * rzecz, która znika z dnia (dawne „Cztery rzeczy” – teraz przy ruchu,
 * którego dotyczą, zamiast w osobnej sekcji samego tekstu).
 */
export function TrzyRuchy() {
  const lang = biezacyJezyk();
  const t = TEKSTY[lang];
  const pl = lang === 'pl';
  return (
    <Section tone="mist">
      <div className="flex flex-col gap-10 lg:gap-16">
        <h2 data-reveal className="max-w-[760px] text-h2-m font-bold text-balance lg:text-h2">
          {t.naglowek}
        </h2>

        <ol data-reveal-group className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {t.ruchy.map((r) => {
            const laptop = r.plik.endsWith('-desktop.png');
            return (
              <li key={r.n} data-reveal className="flex flex-col gap-6">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper">
                  {/* Telefon wychodzi od góry i chowa się pod dolną krawędzią
                      pudła, laptop wchodzi z lewej i chowa się pod prawą. */}
                  <div
                    className={`absolute top-8 bottom-0 ${laptop ? 'left-6 -right-[45%]' : 'inset-x-[12%]'}`}
                  >
                    <Makieta
                      src={`/mockups/${r.plik}`}
                      alt={r.alt}
                      sizes="(max-width: 1024px) 100vw, 480px"
                      imgClassName="object-cover object-left-top"
                      etykietaPowieksz={pl ? 'Powiększ' : 'Enlarge'}
                      etykietaZamknij={pl ? 'Zamknij' : 'Close'}
                      unoptimized={DEV}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption">
                      {r.n}
                    </span>
                    <h3 className="text-[22px] font-semibold tracking-[-0.01em] lg:text-h3">{r.tytul}</h3>
                  </div>
                  <p className="text-[16px] leading-relaxed text-muted lg:text-body">{r.opis}</p>
                  <p className="text-[14px] leading-relaxed text-muted lg:text-[15px]">
                    {t.koniecZ} <s>{r.koniec}</s>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
