'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { DEMO_URL } from '@/content/navigation';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';

const TEKSTY: Tlumaczenia<{ demo: string }> = {
  pl: { demo: 'Zobacz demo' },
  en: { demo: 'See the demo' },
};

/** Baner zgody na ciasteczka – `components/analytics/BanerZgody.tsx`. */
const BANER = '[aria-labelledby="zgoda-tytul"]';

function subskrybujBaner(zmiana: () => void) {
  const obserwator = new MutationObserver(zmiana);
  obserwator.observe(document.body, { childList: true, subtree: true });
  return () => obserwator.disconnect();
}
const banerWidoczny = () => document.querySelector(BANER) !== null;
const banerNaSerwerze = () => false;

/**
 * Przyklejony przycisk „Zobacz demo” na dole ekranu – tylko na telefonie.
 *
 * Pojawia się, gdy hero zniknie z ekranu, i chowa się, gdy widać sekcję
 * Demo (`#demo`) albo stopkę – tam przycisk do demo już jest. Chowa się też,
 * dopóki wisi baner zgody: oba siedzą u dołu ekranu i jeden zasłaniałby
 * drugi. Baner ma `z-50`, ten przycisk `z-30`, więc nawet w chwili przejścia
 * baner jest na wierzchu, a menu mobilne (`z-40`) też.
 *
 * Zwykły odnośnik do `DEMO_URL`: zdarzenie `demo_open` łapie wspólny
 * nasłuch w `Analytics.tsx`.
 */
export function PrzyklejoneDemo() {
  const t = TEKSTY[useJezyk()];
  const [stan, setStan] = useState({ zaHero: false, zaslania: false });
  const baner = useSyncExternalStore(subskrybujBaner, banerWidoczny, banerNaSerwerze);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const cele = [document.getElementById('demo'), document.querySelector('footer')].filter(
      (e): e is HTMLElement => e !== null,
    );
    if (!hero) return;

    const widoczne = new Set<Element>();
    let heroWidoczne = true;

    const obserwator = new IntersectionObserver((wpisy) => {
      for (const w of wpisy) {
        if (w.target === hero) heroWidoczne = w.isIntersecting;
        else if (w.isIntersecting) widoczne.add(w.target);
        else widoczne.delete(w.target);
      }
      setStan({ zaHero: !heroWidoczne, zaslania: widoczne.size > 0 });
    });

    obserwator.observe(hero);
    cele.forEach((c) => obserwator.observe(c));
    return () => obserwator.disconnect();
  }, []);

  const widoczny = stan.zaHero && !stan.zaslania && !baner;

  return (
    <div
      inert={!widoczny}
      aria-hidden={!widoczny}
      className={`fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 transition-[opacity,translate] duration-300 ease-out lg:hidden ${
        widoczny ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <a
        href={DEMO_URL}
        className="flex h-[52px] w-full items-center justify-center rounded-btn bg-blue text-body font-semibold text-white shadow-blue transition-colors hover:bg-blue-dark hover:text-white"
      >
        {t.demo}
      </a>
    </div>
  );
}
