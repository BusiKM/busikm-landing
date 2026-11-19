'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { markaAndroid } from '@/content/sklepy';

/**
 * Rozsypane ikony BusiKM Kierowca za hero startu aplikacji. Trzy plany jak
 * w obiektywie: z tyłu małe i rozmyte, z przodu duże i ostre. Za kursorem
 * przesuwają się tym mocniej, im bliżej stoją.
 *
 * Bez robota Androida i bez ikony Google Play. Zespół marki Android nie
 * zgodził się na unoszące się głowy robota (zgłoszenie a384508e8b7b,
 * 19.11.2026): głowa wolno tylko wyłaniać się zza krawędzi, razem ze
 * znakiem słownym Android (`MarkaAndroid` w Hero). Ikona Google Play
 * tylko w odznace.
 */

type Plan = 0 | 1 | 2;

type Ikona = {
  /** Środek ikony w procentach szerokości i wysokości banera. */
  x: number;
  y: number;
  /** Szerokość w px na desktopie. */
  w: number;
  plan: Plan;
  obrot: number;
  /** Przesunięcie fazy unoszenia, żeby ikony nie falowały razem. */
  faza: number;
  /** Pozycja i szerokość na telefonie. Bez tego ikona znika poniżej `lg`. */
  telefon?: { x: number; y: number; w: number; ustepujeMarce?: boolean };
};

const PLANY: Record<Plan, { blur: number; krycie: number; ruch: number }> = {
  0: { blur: 6, krycie: 0.6, ruch: 8 },
  1: { blur: 2.5, krycie: 0.85, ruch: 18 },
  2: { blur: 0, krycie: 1, ruch: 32 },
};

// Lewy i prawy środek banera zostają wolne: tam stoją głowa robota
// i znak słowny Android (`MarkaAndroid` w Hero). Na telefonie głowa wychodzi
// z prawej krawędzi u góry, więc dwie ikony z prawego rogu jej ustępują.
const IKONY: Ikona[] = [
  { x: 22, y: 93, w: 96, plan: 2, obrot: -11, faza: 0, telefon: { x: 90, y: 7, w: 64, ustepujeMarce: true } },
  { x: 87, y: 20, w: 112, plan: 2, obrot: 9, faza: 1.4 },
  { x: 88, y: 84, w: 88, plan: 1, obrot: 13, faza: 2.2 },
  { x: 15, y: 16, w: 78, plan: 1, obrot: -7, faza: 0.7, telefon: { x: 70, y: 4, w: 44, ustepujeMarce: true } },
  { x: 76, y: 92, w: 50, plan: 0, obrot: -13, faza: 1.9 },
  { x: 72, y: 7, w: 50, plan: 0, obrot: -5, faza: 2.7, telefon: { x: 55, y: 9, w: 30 } },
  { x: 5, y: 9, w: 44, plan: 0, obrot: 11, faza: 0.3 },
  { x: 31, y: 5, w: 46, plan: 0, obrot: 4, faza: 3.6 },
  { x: 97, y: 94, w: 52, plan: 0, obrot: -14, faza: 1.1 },
  { x: 3, y: 95, w: 46, plan: 0, obrot: 15, faza: 2.9 },
];

export function IkonyStartu() {
  const pole = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pole.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let klatka = 0;
    const ruch = (e: PointerEvent) => {
      cancelAnimationFrame(klatka);
      klatka = requestAnimationFrame(() => {
        el.style.setProperty('--px', String(e.clientX / window.innerWidth - 0.5));
        el.style.setProperty('--py', String(e.clientY / window.innerHeight - 0.5));
      });
    };
    window.addEventListener('pointermove', ruch, { passive: true });
    return () => {
      window.removeEventListener('pointermove', ruch);
      cancelAnimationFrame(klatka);
    };
  }, []);

  return (
    <div ref={pole} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {IKONY.map((ik, i) => {
        const p = PLANY[ik.plan];
        const naTelefonie = ik.telefon && !(markaAndroid && ik.telefon.ustepujeMarce);
        const styl = {
          '--x': `${ik.x}%`,
          '--y': `${ik.y}%`,
          '--w': `${ik.w}px`,
          '--tx': `${ik.telefon?.x ?? ik.x}%`,
          '--ty': `${ik.telefon?.y ?? ik.y}%`,
          '--tw': `${ik.telefon?.w ?? ik.w}px`,
          transform: `translate(-50%, -50%) translate(calc(var(--px, 0) * ${p.ruch * -1}px), calc(var(--py, 0) * ${p.ruch * -1}px))`,
          opacity: p.krycie,
          zIndex: ik.plan,
        } as React.CSSProperties;
        return (
          <div
            key={i}
            style={styl}
            className={`absolute top-(--ty) left-(--tx) w-(--tw) transition-transform duration-700 ease-out lg:top-(--y) lg:left-(--x) lg:block lg:w-(--w) ${naTelefonie ? '' : 'hidden'}`}
          >
            {/* Rozmycie siedzi na tym samym elemencie co ruch, nie na rodzicu.
                Na rodzicu przeglądarka rozmywałaby obraz od nowa w każdej
                klatce unoszenia; tu rozmyta warstwa tylko się przesuwa. */}
            <div
              className="ikona-unosi will-change-transform"
              style={{
                animationDelay: `${-ik.faza}s`,
                rotate: `${ik.obrot}deg`,
                filter: p.blur ? `blur(${p.blur}px)` : undefined,
              }}
            >
              <Image
                src="/aplikacja/busikm-kierowca-512.png"
                alt=""
                width={512}
                height={512}
                priority={ik.plan === 2}
                className="h-auto w-full rounded-[23%] shadow-[0_18px_36px_rgba(4,22,90,0.45),inset_0_0_0_1px_rgba(255,255,255,0.25)] ring-1 ring-white/30"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
