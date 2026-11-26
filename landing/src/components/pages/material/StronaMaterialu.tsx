import { Download, Mail } from 'lucide-react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import type { Material } from '@/content/materialy';
import { appLinks } from '@/content/navigation';
import { ArkuszMaterialu, PrzyciskArkusza } from './ArkuszMaterialu';

/**
 * Strona z materiałem do serii „5 kroków” (rolki na Facebooku).
 *
 * Góra w kolorze okładki rolki (#0b5fff), z numerem kroku, żeby widz z rolki
 * od razu rozpoznał, że trafił we właściwe miejsce. Przycisk PDF jest
 * w pierwszym ekranie telefonu, bez przewijania. Niżej pięć punktów ściągi,
 * ramka „kiedy nie dotyczy”, stan przepisów i jedno zdanie o BusiKM z wejściem
 * do demo.
 *
 * `calt` wyłączone na całej stronie: Inter w zakresach typu „2,5-3,5 t”
 * zamienia łącznik między cyframi na dłuższą kreskę.
 */
export type TrescMaterialu = {
  krok: number;
  tytul: string;
  lead: string;
  znacznik: string;
  przycisk: string;
  przyciskOpis: string;
  listaNaglowek: string;
  punkty: readonly string[];
  ramka: { tytul: string; tekst: string };
  /** Dodatkowe drobne zdanie pod ramką (np. źródło), przed stanem przepisów. */
  zrodlo?: string;
};

export function StronaMaterialu({ material, tresc }: { material: Material; tresc: TrescMaterialu }) {
  return (
    <>
      <Header />
      <main className="bg-paper pb-20 [font-feature-settings:'calt'_0] lg:pb-28">
        <section className="rounded-b-[28px] bg-[radial-gradient(120%_80%_at_30%_20%,#3a7eff_0%,#0b5fff_45%,#0a4fe0_100%)] px-5 pt-8 pb-7 text-white lg:rounded-b-panel lg:px-12 lg:pt-16 lg:pb-16">
          <div className="mx-auto flex max-w-[760px] flex-col">
            <div className="inline-flex items-center gap-2.5 font-mono text-[11.5px] tracking-[0.14em] text-white/78 uppercase">
              <span className="flex size-7.5 items-center justify-center rounded-[9px] bg-white font-sans text-[17px] font-extrabold tracking-normal text-blue shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
                {tresc.krok}
              </span>
              Krok {tresc.krok} z 5
            </div>
            <h1 className="mt-3.5 text-[34px] leading-[1.08] font-bold tracking-[-0.025em] text-balance lg:text-[52px] lg:leading-[1.05] lg:tracking-[-0.03em]">
              {tresc.tytul}
            </h1>
            <p className="mt-3 text-[17px] leading-normal text-white/82 lg:mt-5 lg:max-w-[640px] lg:text-[20px]">
              {tresc.lead}
            </p>
            <span className="mt-4 self-start rounded-full bg-white/16 px-3 py-1.5 text-[13px] font-medium lg:mt-6 lg:text-[14px]">
              {tresc.znacznik}
            </span>
            <PrzyciskArkusza
              tryb="pobierz"
              className="mt-5 inline-flex h-14 cursor-pointer items-center justify-center gap-2.5 rounded-btn bg-white px-7 text-[17px] font-semibold text-blue transition-colors hover:bg-blue-soft lg:mt-8 lg:self-start"
            >
              <Download className="size-5" strokeWidth={2.2} aria-hidden />
              {tresc.przycisk}
            </PrzyciskArkusza>
            <p className="mt-2.5 text-[13px] text-white/70 lg:text-[14px]">{tresc.przyciskOpis}</p>
          </div>
        </section>

        <div className="mx-auto mt-8 flex max-w-[760px] flex-col px-5 lg:mt-14 lg:px-0">
          <h2 className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase lg:text-[12px]">
            {tresc.listaNaglowek}
          </h2>
          <ol className="mt-3.5 flex flex-col gap-2.5">
            {tresc.punkty.map((punkt, i) => (
              <li
                key={punkt}
                className="flex items-start gap-3.5 rounded-[16px] border border-line bg-white p-4 lg:p-5"
              >
                <span className="flex size-7.5 flex-none items-center justify-center rounded-[9px] bg-blue-soft text-[15px] font-bold text-blue">
                  {i + 1}
                </span>
                <span className="pt-0.5 text-[15.5px] leading-snug font-semibold lg:text-[17px]">{punkt}</span>
              </li>
            ))}
          </ol>

          <div className="mt-3.5 rounded-[16px] bg-mist px-4.5 py-4 text-[14.5px] leading-normal text-ink/80 lg:px-5 lg:text-[15.5px]">
            <b className="mb-1 block text-[15px] text-ink lg:text-[16px]">{tresc.ramka.tytul}</b>
            {tresc.ramka.tekst}
          </div>
          {tresc.zrodlo && (
            <p className="mt-3 text-[12.5px] leading-normal text-muted lg:text-[13px]">{tresc.zrodlo}</p>
          )}
          <p className="mt-3 text-[12.5px] leading-normal text-muted lg:text-[13px]">
            Stan przepisów: {material.stanPrzepisow}, to nie porada prawna.
          </p>

          <PrzyciskArkusza
            tryb="zapis"
            className="mt-7 inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-btn bg-blue-soft px-5 text-[15px] font-semibold text-blue transition-colors hover:bg-blue/15 lg:self-start"
          >
            <Mail className="size-4.5" aria-hidden />
            Dostawaj maile o zmianach przepisów
          </PrzyciskArkusza>

          <div className="mt-7 rounded-card bg-ink px-5 py-5.5 text-paper lg:mt-10 lg:p-8">
            <h2 className="text-[21px] leading-tight font-bold tracking-[-0.015em] text-balance lg:text-[26px]">
              {material.wBusikm}
            </h2>
            <p className="mt-2 text-[14px] leading-normal text-paper/60 lg:text-[15px]">
              Przykładowa firma z flotą, bez zakładania konta.
            </p>
            <Button href={appLinks.demo} fullWidth className="mt-4.5 lg:w-auto">
              Zobacz demo bez konta
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <ArkuszMaterialu material={material} />
    </>
  );
}
