import Link from '@/i18n/Link';
import { Section } from '@/components/ui/Section';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { Kafelek } from '@/components/ui/Drobiazgi';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  kafelki: string[];
  ktoUzywa: string;
  kierowca: string;
}> = {
  pl: {
    naglowek: 'Drobiazgi, które widać dopiero w trasie.',
    kafelki: [
      'Tryb nocny',
      'Działa z CarPlay i Android Auto',
      'Powiadomienia o nowym zleceniu',
      'Podpis i zdjęcia przy załadunku i rozładunku (e-CMR)',
      'Historia zakończonych zleceń',
      'Czat z biurem przy każdym zleceniu',
      '„Jestem na miejscu” proponuje się sam po dojeździe, także w tle i bez zasięgu',
      'Waga załadunku porównana z planowaną',
      'Przerwa na cały ekran z odliczaniem obowiązkowych 45 minut',
    ],
    ktoUzywa: 'Kto tego używa:',
    kierowca: 'Kierowca →',
  },
  en: {
    naglowek: 'Small things you only notice on the road.',
    kafelki: [
      'Dark mode',
      'Works with CarPlay and Android Auto',
      'New order notifications',
      'Signature and photos at loading and unloading (e-CMR)',
      'History of finished orders',
      'Chat with the office on every order',
      '“I’m here” pops up by itself on arrival, even in the background and with no signal',
      'Loaded weight checked against the planned weight',
      'Full-screen break with a countdown of the required 45 minutes',
    ],
    ktoUzywa: 'Who uses it:',
    kierowca: 'Driver →',
  },
};

/** Drobiazgi, odznaki sklepów i odnośnik do roli. */
export function Drobiazgi() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {t.naglowek}
        </h2>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-4">
          {t.kafelki.map((k) => (
            <Kafelek key={k} tekst={k} dark />
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-line-dark pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pt-16">
          <StoreBadges />
          <p className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
            {t.ktoUzywa}{' '}
            <Link href="/dla-kogo/kierowca" className="text-blue-light">
              {t.kierowca}
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
