import { Section } from '@/components/ui/Section';
import { Wycinek } from '@/components/ui/Wycinek';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Raport = { tytul: string; alt: string };

/** Wycinki z prawdziwych raportów – kolejność jak w `raporty` niżej. */
const WYCINKI = [
  { plik: 'mockup-zysk-raport-flota-wycinek.png', szer: 860, wys: 748 },
  { plik: 'mockup-zysk-raport-kierunki-wycinek.png', szer: 1332, wys: 730 },
  { plik: 'mockup-zysk-raport-kierowcy-wycinek.png', szer: 2232, wys: 830 },
] as const;

const TEKSTY: Tlumaczenia<{ tytul: string; tresc: string; raporty: readonly Raport[] }> = {
  pl: {
    tytul: 'Raporty',
    tresc: 'Flota: koszt na kilometr każdego auta. Kierunki: marża według kraju rozładunku. Kierowcy: kilometry w kraju i za granicą, a obok wynik ich tras - to widzi tylko właściciel.',
    raporty: [
      { tytul: 'Flota', alt: 'Raport Flota, „Koszt na km”: koszt pojazdu i jego zleceń na kilometr dla sześciu aut, od 1,00 zł do 2,78 zł, ze średnią floty 1,94 zł.' },
      { tytul: 'Kierunki', alt: 'Raport Zlecenia i trasy, „Marża wg kierunku”: marża według kraju rozładunku, od Niemiec 81,3% do Czech 65,5%, z progiem marży 15%.' },
      { tytul: 'Kierowcy', alt: 'Raport Kierowcy, „Kilometry kierowców”: kilometry w kraju i za granicą dla siedmiu kierowców w listopadzie.' },
    ],
  },
  en: {
    tytul: 'Reports',
    tresc: 'Fleet: cost per kilometre for each van. Destinations: margin by unloading country. Drivers: kilometres at home and abroad, with the result of their routes alongside - only the owner sees this.',
    raporty: [
      { tytul: 'Fleet', alt: 'The Fleet report, “Cost per km”: vehicle and order costs per kilometre for six vans, from PLN 1.00 to PLN 2.78, with a fleet average of PLN 1.94.' },
      { tytul: 'Destinations', alt: 'The Orders and routes report, “Margin by destination”: margin by unloading country, from Germany at 81.3% to Czechia at 65.5%, with a 15% margin threshold.' },
      { tytul: 'Drivers', alt: 'The Drivers report, “Drivers’ kilometres”: kilometres at home and abroad for seven drivers in November.' },
    ],
  },
};

/** 06 – trzy raporty z prawdziwej aplikacji: koszt auta, marża kierunku, kilometry kierowców. */
export function Raporty() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-16">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              06
            </div>
            <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
              {t.tytul}
            </h2>
          </div>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.tresc}
          </p>
        </div>

        {/* Flota i kierunki obok siebie w tej samej wysokości (kolumny jak
            proporcje wycinków), kierowcy pod nimi na całą szerokość. */}
        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-[115fr_182fr] lg:gap-4">
          {t.raporty.map((r, i) => (
            <div
              key={r.tytul}
              data-reveal
              className={`flex flex-col gap-4 rounded-card border border-line bg-mist p-5 lg:p-6 ${
                i === 2 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="text-[17px] font-semibold">{r.tytul}</div>
              <Wycinek {...WYCINKI[i]} alt={r.alt} className="mt-auto" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
