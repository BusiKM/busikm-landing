import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FilmWlasciciela } from '@/components/sections/FilmWlasciciela';
import { CzteryRzeczy } from '@/components/sections/CzteryRzeczy';
import { TrzyRuchy } from '@/components/sections/TrzyRuchy';
import { IleZostaje } from '@/components/sections/IleZostaje';
import { Dyspozytornia } from '@/components/sections/Dyspozytornia';
import { AplikacjaKierowcy } from '@/components/sections/AplikacjaKierowcy';
import { ZlecenieFaktura } from '@/components/sections/ZlecenieFaktura';
import { Demo } from '@/components/sections/Demo';
import { Integracje } from '@/components/sections/Integracje';
import { KtoRobi } from '@/components/sections/KtoRobi';
import { Cennik } from '@/components/sections/Cennik';
import { Pytania } from '@/components/sections/Pytania';
import { FinalCta } from '@/components/sections/FinalCta';
import { PrzyklejoneDemo } from '@/components/ui/PrzyklejoneDemo';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';

/**
 * Strona główna – 13 sekcji i finał.
 *
 * Krótsza niż pierwsza wersja z projektu (22 sekcje): mapa i trasa weszły
 * do dyspozytorni, czas pracy do aplikacji kierowcy, koszty i komplet dla
 * księgowej do sekcji o fakturach, a każda z nich prowadzi do swojej
 * podstrony w „Co robi”. Pierwszy dzień i „jedna faktura” stoją zdaniem
 * w cenniku, dane i bezpieczeństwo pytaniem w „Pytaniach”.
 * Treść pierwotna: docs/landing/04-homepage.md.
 */
export default async function Home({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FilmWlasciciela />
        <CzteryRzeczy />
        <TrzyRuchy />
        <IleZostaje />
        <Dyspozytornia />
        <AplikacjaKierowcy />
        <ZlecenieFaktura />
        <Demo />
        <Integracje />
        <KtoRobi />
        <Cennik />
        <Pytania />
      </main>
      <FinalCta />
      <Footer />
      <PrzyklejoneDemo />
    </>
  );
}
