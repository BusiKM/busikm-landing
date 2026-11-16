'use client';

import { useEffect, useRef, useState } from 'react';
import { Makieta } from '@/components/ui/Makieta';
import { useJezyk } from '@/i18n/klient';

const DEV = process.env.NODE_ENV === 'development';

export type MomentDnia = {
  /** „7:10”, „koniec” albo dwie linie rozdzielone `\n` („ostatni\ntydzień”). */
  godzina: string;
  pora?: string;
  tresc: string;
  /** Plik w `public/mockups` – laptop 2016x1270 albo telefon 3200x2400 z telefonem w środku. */
  plik: string;
  /** Co widać na zrzucie, dla czytników ekranu i w powiększeniu. */
  alt: string;
};

/**
 * Dzień (albo miesiąc) roli jako przyklejona scena: po lewej godziny, po prawej
 * jedno urządzenie z prawdziwym ekranem aplikacji. Przewijanie przesuwa po
 * godzinach, a ekran w urządzeniu płynnie zmienia się na ten z danej chwili.
 *
 * Na telefonie i przy `prefers-reduced-motion` scena się nie przykleja –
 * momenty stoją jeden pod drugim, każdy z własnym zrzutem. Przewijania nie
 * przechwytujemy nigdy, tylko je odczytujemy.
 *
 * Wszystkie zrzuty jednego urządzenia mają tę samą ramkę (te same skrypty
 * `wstaw-w-ramke.py` i `telefony.py`), więc przy przejściu zmienia się tylko
 * ekran, a laptop albo telefon stoi w miejscu.
 */
export function ScenaDnia({
  naglowek,
  momenty,
  urzadzenie,
}: {
  /** Domyślnie „Twój dzień z BusiKM.” */
  naglowek?: string;
  momenty: MomentDnia[];
  urzadzenie: 'laptop' | 'telefon';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [aktywny, setAktywny] = useState(0);
  const [scena, setScena] = useState(false);
  const pl = useJezyk() === 'pl';
  const tytul = naglowek ?? (pl ? 'Twój dzień z BusiKM.' : 'Your day with BusiKM.');

  useEffect(() => {
    const ruchOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const szeroki = window.matchMedia('(min-width: 1024px)');
    const ustaw = () => setScena(ruchOk && szeroki.matches);
    ustaw();
    szeroki.addEventListener('change', ustaw);
    return () => szeroki.removeEventListener('change', ustaw);
  }, []);

  useEffect(() => {
    if (!scena) return;
    let klatka = 0;
    const zmierz = () => {
      klatka = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const droga = r.height - window.innerHeight;
      if (droga <= 0) return;
      const postep = Math.min(Math.max(-r.top / droga, 0), 0.999);
      setAktywny(Math.floor(postep * momenty.length));
    };
    const naPrzewiniecie = () => {
      if (!klatka) klatka = requestAnimationFrame(zmierz);
    };
    zmierz();
    window.addEventListener('scroll', naPrzewiniecie, { passive: true });
    window.addEventListener('resize', naPrzewiniecie);
    return () => {
      if (klatka) cancelAnimationFrame(klatka);
      window.removeEventListener('scroll', naPrzewiniecie);
      window.removeEventListener('resize', naPrzewiniecie);
    };
  }, [scena, momenty.length]);

  /** Klik w godzinę przewija do jej odcinka sceny. */
  const idzDo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const droga = el.offsetHeight - window.innerHeight;
    const gora = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: gora + (droga * (i + 0.5)) / momenty.length, behavior: 'smooth' });
  };

  const naglowekSekcji = (
    <h2 className="text-h2-m font-bold text-balance lg:text-h1">{tytul}</h2>
  );

  if (!scena) {
    return (
      <section className="bg-ink px-6 py-24 text-paper lg:px-12 lg:py-40">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-14">
          {naglowekSekcji}
          {momenty.map((m, i) => (
            <div key={i} className="flex flex-col gap-5">
              <Godzina m={m} />
              <p className="text-lead-m text-pretty text-ink-muted">{m.tresc}</p>
              <Ekran m={m} urzadzenie={urzadzenie} widoczny pl={pl} statyczny />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ink text-paper">
      <div ref={ref} style={{ height: `${momenty.length * 75 + 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-12">
          <div
            className={`mx-auto grid w-full max-w-[1360px] items-center gap-14 ${
              urzadzenie === 'laptop'
                ? 'grid-cols-[minmax(0,4fr)_minmax(0,8fr)]'
                : 'grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'
            }`}
          >
            <div className="flex flex-col gap-10">
              {naglowekSekcji}
              <ol className="relative flex flex-col gap-1 border-l border-line-dark pl-8">
                {/* Pasek postępu na linii: rośnie razem z przewijaniem. */}
                <span
                  aria-hidden
                  className="absolute top-0 -left-px w-px bg-blue transition-[height] duration-500 ease-out"
                  style={{ height: `${((aktywny + 1) / momenty.length) * 100}%` }}
                />
                {momenty.map((m, i) => {
                  const ten = i === aktywny;
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => idzDo(i)}
                        aria-current={ten ? 'step' : undefined}
                        className={`flex w-full cursor-pointer flex-col items-start gap-2 py-2.5 text-left transition-opacity duration-500 ${
                          ten ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                        }`}
                      >
                        <Godzina m={m} />
                        <span
                          className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                            ten ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                        >
                          <span className="overflow-hidden text-lead text-pretty text-ink-muted">
                            {m.tresc}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className={`relative ${urzadzenie === 'telefon' ? 'mx-auto w-full max-w-[520px]' : ''}`}>
              {momenty.map((m, i) => (
                <div
                  key={i}
                  className={i === 0 ? 'relative' : 'absolute inset-0'}
                  aria-hidden={i !== aktywny}
                >
                  <Ekran m={m} urzadzenie={urzadzenie} widoczny={i === aktywny} pl={pl} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Godzina({ m }: { m: MomentDnia }) {
  const linie = m.godzina.split('\n');
  return (
    <span className="flex items-baseline gap-3">
      <span
        className={`font-bold tracking-[-0.03em] ${
          linie.length > 1 || m.godzina.length > 6
            ? 'text-[24px] leading-tight lg:text-[30px]'
            : 'text-[32px] leading-none lg:text-[40px]'
        }`}
      >
        {linie.join(' ')}
      </span>
      {m.pora && (
        <span className="text-[11px] font-medium tracking-[0.1em] text-ink-muted uppercase lg:text-caption">
          {m.pora}
        </span>
      )}
    </span>
  );
}

function Ekran({
  m,
  urzadzenie,
  widoczny,
  pl,
  statyczny = false,
}: {
  m: MomentDnia;
  urzadzenie: 'laptop' | 'telefon';
  widoczny: boolean;
  pl: boolean;
  statyczny?: boolean;
}) {
  const laptop = urzadzenie === 'laptop';
  return (
    <div
      className={`relative w-full transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        widoczny ? 'scale-100 opacity-100' : 'pointer-events-none scale-[0.98] opacity-0'
      }`}
      // Telefon jest w pliku wąski (30% szerokości), więc pudło ma kształt
      // telefonu z zapasem, a obraz rośnie 1,8 raza – jak w MockupSlot.
      style={{ aspectRatio: laptop ? '2016 / 1270' : statyczny ? '4 / 5' : '4 / 4.2' }}
    >
      <Makieta
        src={`/mockups/${m.plik}`}
        alt={m.alt}
        sizes={laptop ? '(max-width: 1024px) 100vw, 760px' : '(max-width: 1024px) 180vw, 1300px'}
        laptop={laptop}
        imgClassName={laptop ? 'object-contain' : 'object-contain scale-[1.8]'}
        etykietaPowieksz={pl ? 'Powiększ' : 'Enlarge'}
        etykietaZamknij={pl ? 'Zamknij' : 'Close'}
        unoptimized={DEV}
      />
    </div>
  );
}
