import { notFound } from 'next/navigation';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Kalkulator } from '@/components/pages/kalkulator/Kalkulator';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import { metadataTresci } from '@/lib/metadata';

/**
 * `/kalkulator` – krok 4 serii „5 kroków” na Facebooku: ile zostaje z kursu.
 * Strona tylko po polsku (`TYLKO_PL` w `i18n/trasy.ts`), `/en/kalkulator`
 * prowadzi na `/en`.
 *
 * `calt` wyłączone: Inter w „Wiedeń - Kalisz” i zakresach liczb zamienia
 * łącznik na dłuższą kreskę.
 */

export async function generateMetadata({ params }: ParametryJezyka) {
  return metadataTresci({
    sciezka: '/kalkulator',
    tytul: 'Ile zostaje z kursu? Kalkulator dla busów',
    opis: 'Wpisz fracht w euro albo złotych, paliwo, opłaty drogowe i diety. Kalkulator pokaże, ile zostaje z kursu i ile to na kilometr. Kurs EUR z NBP, bez konta.',
    jezyk: await jezykZParametrow(params),
    obraz: '/og-image/krok-4-kalkulator.png',
  });
}

export default async function Page({ params }: ParametryJezyka) {
  if ((await jezykZParametrow(params)) !== 'pl') notFound();
  return (
    <>
      <Header />
      <main className="bg-paper [font-feature-settings:'calt'_0]">
        <Kalkulator />
      </main>
      <Footer />
    </>
  );
}
