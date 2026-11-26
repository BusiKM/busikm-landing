import { notFound } from 'next/navigation';

import { StronaMaterialu, type TrescMaterialu } from '@/components/pages/material/StronaMaterialu';
import { MATERIALY } from '@/content/materialy';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import { metadataTresci } from '@/lib/metadata';

/**
 * `/ksef` – krok 3 serii „5 kroków” na Facebooku: ściąga o KSeF od
 * 1 stycznia 2027. Strona tylko po polsku (`TYLKO_PL` w `i18n/trasy.ts`),
 * proxy nie przenosi jej na angielski, a `/en/ksef` prowadzi na `/en`.
 *
 * Bez kwot kar: zmieniają się częściej niż terminy, a ściąga ma być aktualna
 * dłużej niż jedna nowelizacja.
 */

const TRESC: TrescMaterialu = {
  krok: 3,
  tytul: 'KSeF od 1 stycznia 2027: ściąga dla firmy z busami',
  lead: 'Z końcem 2026 roku znikają ostatnie wyjątki i faktury w KSeF wystawiają także małe firmy. Pięć rzeczy do sprawdzenia przed pierwszą fakturą.',
  znacznik: 'Sprzedaż do 10\u00a0000\u00a0zł brutto miesięcznie',
  przycisk: 'Pobierz ściągę (PDF)',
  przyciskOpis: '1 strona do wydruku, mail nieobowiązkowy',
  listaNaglowek: 'Co jest w ściądze',
  punkty: [
    'Do 31.12.2026 przy sprzedaży do 10\u00a0000\u00a0zł brutto miesięcznie można fakturować poza KSeF. Od 1.01.2027 ten wyjątek znika.',
    'Faktury z kasy fiskalnej i paragony z NIP do 450\u00a0zł są poza KSeF tylko do 31.12.2026.',
    'Klient z zagranicy: fakturę wystawiasz w KSeF, klient dostaje od Ciebie PDF z kodem QR.',
    'Przed pierwszą fakturą: dostęp do KSeF, certyfikat z datą ważności, uprawnienia dla księgowej.',
    'Odbieranie faktur w KSeF obowiązuje wszystkich już od 1.02.2026.',
  ],
  ramka: {
    tytul: 'Kiedy to nie Ty',
    tekst:
      'Sprzedajesz więcej niż 10\u00a0000\u00a0zł brutto miesięcznie? Wystawianie w KSeF obowiązuje Cię już od 1.04.2026.',
  },
  zrodlo: 'Źródło: ksef.podatki.gov.pl',
};

export async function generateMetadata({ params }: ParametryJezyka) {
  return metadataTresci({
    sciezka: '/ksef',
    tytul: 'KSeF od 1 stycznia 2027: ściąga dla firmy z busami',
    opis: 'Koniec wyjątku do 10\u00a0000\u00a0zł brutto miesięcznie, faktury dla klienta z zagranicy, certyfikat i uprawnienia dla księgowej. Ściąga PDF do wydruku, mail nieobowiązkowy.',
    jezyk: await jezykZParametrow(params),
    obraz: '/og-image/krok-3-ksef.png',
  });
}

export default async function Page({ params }: ParametryJezyka) {
  if ((await jezykZParametrow(params)) !== 'pl') notFound();
  return <StronaMaterialu material={MATERIALY.ksef} tresc={TRESC} />;
}
