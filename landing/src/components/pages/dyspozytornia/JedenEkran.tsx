import { Section, Eyebrow } from '@/components/ui/Section';
import { Wycinek } from '@/components/ui/Wycinek';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/** Wycinki z prawdziwej dyspozytorni – kolejność jak w `kolumny` niżej. */
const WYCINKI = [
  { plik: 'mockup-dyspozytornia-kolejka-wycinek.png', szer: 780, wys: 1040 },
  { plik: 'mockup-dyspozytornia-mapa-wycinek.png', szer: 1420, wys: 1040 },
  { plik: 'mockup-dyspozytornia-plan-wycinek.png', szer: 2240, wys: 1232 },
] as const;

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  lead: string;
  kolumny: readonly (readonly [string, string])[];
  /** Opisy wycinków dla czytników ekranu – kolejność jak w `kolumny`. */
  alty: readonly string[];
}> = {
  pl: {
    naglowek: 'Jeden ekran zamiast czterech okien',
    lead: 'Po lewej kolejka zleceń, obok mapa floty, pod spodem plan floty. Nad nimi liczniki: kto w trasie, ile załadunków i rozładunków dziś, co czeka na przypisanie, które auta są wolne.',
    kolumny: [
      ['Po lewej', 'Kolejka'],
      ['Obok', 'Mapa floty'],
      ['Pod spodem', 'Plan floty'],
    ],
    alty: [
      'Kolejka „Wymaga reakcji”: spóźnienie na rozładunku, zgłoszenie kierowcy i auta bez sygnału, przy każdym przycisk akcji.',
      'Mapa floty z autami kierowców w Niemczech, Holandii i Belgii oraz filtrami: wszystkie, w trasie, wolne, serwis.',
      'Plan floty na trzy dni: każde auto z kierowcą, kursy, wolne okna i odpoczynki kierowców.',
    ],
  },
  en: {
    naglowek: 'One screen instead of four windows',
    lead: 'The order queue on the left, the fleet map beside it, the fleet plan underneath. Above them, counters: who is on the road, how many loadings and unloadings today, what’s waiting to be assigned, which vans are free.',
    kolumny: [
      ['On the left', 'Queue'],
      ['Beside it', 'Fleet map'],
      ['Underneath', 'Fleet plan'],
    ],
    alty: [
      'The “Needs attention” queue: a late unloading, a driver report and vans with no signal, each with an action button.',
      'The fleet map with drivers’ vans in Germany, the Netherlands and Belgium, filtered by all, on the road, free and in service.',
      'The three-day fleet plan: every van with its driver, runs, free windows and drivers’ rest.',
    ],
  },
};

/** 01 – trzy części jednego ekranu (kolejka, mapa floty, plan floty), każda jako karta z wycinkiem. */
export function JedenEkran() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue-light lg:text-caption"
            >
              01
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.naglowek}
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-ink-muted lg:text-lead">
            {t.lead}
          </p>
        </div>

        {/* Kolejka i mapa obok siebie w tej samej wysokości (szerokości jak
            proporcje wycinków 780 i 1420 px), plan floty pod nimi na całą
            szerokość – tak jak na ekranie dyspozytorni. */}
        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-[780fr_1420fr] lg:gap-4">
          {t.kolumny.map(([gdzie, co], i) => (
            <div
              key={co}
              data-reveal
              className={`flex flex-col gap-5 rounded-card border border-line-dark bg-surface p-5 lg:gap-6 lg:p-7 ${
                i === 2 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="flex flex-col gap-2">
                <Eyebrow dark>{gdzie}</Eyebrow>
                <div className="text-[22px] leading-tight font-semibold tracking-[-0.01em] lg:text-h3">
                  {co}
                </div>
              </div>
              <Wycinek {...WYCINKI[i]} alt={t.alty[i]} dark className="mt-auto" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
