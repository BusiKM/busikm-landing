import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DyspozytorniaMockup } from '@/components/mockups/DyspozytorniaMockup';
import { Dolaczone, type OdnosnikWiecej, type PunktDolaczony } from '@/components/sections/Dolaczone';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  lead: string;
  bullets: string[];
  nota: string;
  label: string;
  opis: string;
  /** Z dawnej sekcji „Mapa i trasa”. */
  mapa: readonly PunktDolaczony[];
  wiecej: OdnosnikWiecej;
}> = {
  pl: {
    naglowek: 'Cały dzień pracy na jednym ekranie.',
    lead: 'Kolejka zleceń i mapa floty obok siebie, pod spodem plan floty. Do kierowcy piszesz jednym kliknięciem, bez szukania numeru w telefonie. Przypisujesz auto, a system podpowiada, kto zdąży na załadunek.',
    bullets: [
      'Przy przyjmowaniu zlecenia widzisz, czy zdążysz - z przerwami i odpoczynkami',
      'Podpowiedź, które auto i kierowca zdążą',
      '„Napisz” na karcie kursu otwiera czat zlecenia',
    ],
    nota: 'Dyspozytor ma w BusiKM własne stanowisko i własny dostęp.',
    label: 'Ekran dyspozytora (desktop 1440)',
    opis: 'Dyspozytornia: u góry liczniki dnia, po lewej kolejka z zakładkami „Wymaga reakcji”, „Do przypisania” i „W trasie”, po prawej mapa floty z filtrami, niżej plan floty.',
    mapa: [
      ['Każdy bus na mapie, na żywo', 'Klient pyta, gdzie jest ładunek. Klikasz i widzisz kierowcę, zlecenie i o której będzie na miejscu.'],
      ['Trasa układa się sama', 'Wpisujesz punkty, a system ustawia kolejność postojów, liczy kilometry i czas.'],
      ['Godzina dojazdu z pozycji auta', 'Odświeża się sama. Inny wariant trasy wybierasz u siebie, a kierowca widzi go w aplikacji.'],
    ],
    wiecej: { href: '/co-robi/trasy-i-mapa', label: 'Więcej: trasy i mapa floty' },
  },
  en: {
    naglowek: 'The whole working day on one screen.',
    lead: 'The order queue and the fleet map side by side, with the fleet plan underneath. You message a driver in one click, no hunting for a number in your phone. You assign a van, and the system tells you who will make the pickup.',
    bullets: [
      'When you take an order, you see whether you’ll make it - breaks and rest included',
      'A hint on which van and driver will make it',
      '“Message” on a run opens the order chat',
    ],
    nota: 'In BusiKM the dispatcher has their own workspace and their own login.',
    label: 'Dispatcher’s screen (desktop 1440)',
    opis: 'Dispatch: the day’s counters at the top, the queue on the left with “Needs action”, “To assign” and “On the road” tabs, the fleet map with filters on the right, the fleet plan below.',
    mapa: [
      ['Every van on the map, live', 'A client asks where the load is. One click and you see the driver, the order and when they’ll get there.'],
      ['The route plans itself', 'You enter the stops, and the system puts them in order and works out the kilometres and time.'],
      ['Arrival time from the van’s position', 'It updates by itself. You pick another route option at your end, and the driver sees it in the app.'],
    ],
    wiecej: { href: '/co-robi/trasy-i-mapa', label: 'More: routes and fleet map' },
  },
};

/** 6.5 – dyspozytornia, a pod nią najmocniejsze zdania z dawnej sekcji mapy i trasy. */
export function Dyspozytornia() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:gap-18">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-16">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.naglowek}
          </h2>

          <div className="flex flex-col gap-5 lg:gap-6">
            <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
              {t.lead}
            </p>

            <Bullets items={t.bullets} />

            <p data-reveal className="text-[13px] leading-relaxed text-muted lg:text-caption">
              {t.nota}
            </p>
          </div>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-dyspozytornia-ekran-desktop.png"
            label={t.label}
            note={t.opis}
            ratio="16:10"
            noteClassName="lg:mx-auto lg:max-w-[600px]"
          >
            <DyspozytorniaMockup />
          </MockupSlot>
        </div>

        <Dolaczone punkty={t.mapa} wiecej={[t.wiecej]} />
      </div>
    </Section>
  );
}
