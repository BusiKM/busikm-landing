import { notFound } from 'next/navigation';

import { StronaMaterialu, type TrescMaterialu } from '@/components/pages/material/StronaMaterialu';
import { MATERIALY } from '@/content/materialy';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import { metadataTresci } from '@/lib/metadata';

/**
 * `/itd` – krok 2 serii „5 kroków” na Facebooku: checklista przed kontrolą
 * tachografu w busie. Strona tylko po polsku (`TYLKO_PL` w `i18n/trasy.ts`),
 * proxy nie przenosi jej na angielski, a `/en/itd` prowadzi na `/en`.
 */

const TRESC: TrescMaterialu = {
  krok: 2,
  tytul: 'Kontrola tachografu w busie: checklista',
  lead: 'Od 1 lipca 2026 tachograf obowiązuje w busach 2,5-3,5 t, które wożą rzeczy za granicę zarobkowo. Pięć rzeczy do sprawdzenia, zanim zatrzyma Cię kontrola.',
  znacznik: 'Bus 2,5-3,5 t, przewóz rzeczy za granicę',
  przycisk: 'Pobierz checklistę (PDF)',
  przyciskOpis: '1 strona do wydruku, mail nieobowiązkowy',
  listaNaglowek: 'Co jest w checkliście',
  punkty: [
    'Tachograf z ważną legalizacją (przegląd co 2 lata)',
    'Karta kierowcy i zapisy z bieżącego dnia i 56 poprzednich',
    'Czas jazdy, przerwy i odpoczynki',
    'Symbol kraju na starcie, po przekroczeniu granicy i na koniec dnia',
    'W firmie: dane z karty zgrane co 28 dni, z tachografu co 90',
  ],
  ramka: {
    tytul: 'Kiedy nie dotyczy',
    tekst:
      'Kursy wyłącznie po Polsce busem do 3,5 t oraz przewóz na potrzeby własne firmy, gdy prowadzenie nie jest główną pracą kierowcy (art. 3 lit. ha rozp. 561/2006).',
  },
};

export async function generateMetadata({ params }: ParametryJezyka) {
  return metadataTresci({
    sciezka: '/itd',
    tytul: 'Tachograf w busie: checklista przed kontrolą ITD',
    opis: 'Pięć rzeczy do sprawdzenia przed kontrolą tachografu w busie 2,5-3,5 t, który wozi rzeczy za granicę. Checklista PDF do wydruku, mail nieobowiązkowy.',
    jezyk: await jezykZParametrow(params),
    obraz: '/og-image/krok-2-itd.png',
  });
}

export default async function Page({ params }: ParametryJezyka) {
  if ((await jezykZParametrow(params)) !== 'pl') notFound();
  return <StronaMaterialu material={MATERIALY.itd} tresc={TRESC} />;
}
