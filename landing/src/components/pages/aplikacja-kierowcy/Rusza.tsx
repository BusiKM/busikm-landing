import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  tresc: string;
  label: string;
  note: string;
  pigulki: string[];
  nagrywa: string;
}> = {
  pl: {
    naglowek: 'Zaczyna dzień jednym przyciskiem',
    tresc:
      'Klika „Zacznij dzień” i robi zdjęcie licznika - stan odczyta się sam, wystarczy go potwierdzić. Potem jedzie. Dalej „Jestem na załadunku”, „Jestem na rozładunku” - część statusów zmienia się sama, gdy dojedzie na miejsce. Telefon może zostać w kieszeni, trasa zapisuje się sama. A gdy coś stanie na drodze, „Zgłoś problem” od razu pyta, czy da się jechać dalej, i daje znać biuru.',
    label: 'Dziś przed startem (telefon, tryb nocny)',
    note: 'Ekran „Dziś” w aplikacji BusiKM Kierowca: najbliższy kurs Venlo → Warszawa z autem, ładunkiem i rozładunkiem, na dole przycisk „Zacznij dzień”.',
    pigulki: ['ekran wyłączony', 'telefon w kieszeni'],
    nagrywa: 'trasa zapisuje się',
  },
  en: {
    naglowek: 'The day starts with one button',
    tresc:
      'They tap “Start the day” and snap the odometer - the reading fills itself in, they just confirm it. Then off they go. Next, “At loading”, “At unloading” - some statuses change by themselves when they arrive. The phone can stay in their pocket and the route records itself. And if something goes wrong on the road, “Report a problem” first asks whether they can carry on, then lets the office know.',
    label: 'Today before setting off (phone, dark mode)',
    note: 'The “Today” screen in the BusiKM Driver app: the next job Venlo → Warsaw with the van, load and unloading time, and a “Start the day” button at the bottom.',
    pigulki: ['screen off', 'phone in pocket'],
    nagrywa: 'route recording',
  },
};

/** 03 – rusza jednym przyciskiem. Ekran „Dziś” z przyciskiem „Zacznij dzień”. */
export function Rusza() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div
            data-reveal
            className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
          >
            03
          </div>
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.naglowek}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.tresc}
          </p>
        </div>

        <div data-reveal className="flex flex-col items-center gap-4">
          <div className="w-full">
            <MockupSlot
              file="mockup-kierowca-zacznij-dzien-phone.png"
              label={t.label}
              note={t.note}
              ratio="9:19.5"
              box="6:7"
              imageScale={1.8}
              imageScaleTelefon={1.8}
            >
              {null}
            </MockupSlot>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 text-[13px] text-muted lg:text-caption">
            {t.pigulki.map((p) => (
              <span key={p} className="rounded-full bg-mist px-3.5 py-2">
                {p}
              </span>
            ))}
            <span className="rounded-full bg-blue-soft px-3.5 py-2 font-semibold text-blue-dark">
              {t.nagrywa}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
