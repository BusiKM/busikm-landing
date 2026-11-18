'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * Rozsypane ikony za hero startu aplikacji: robot Androida (oficjalny plik
 * 3D od Google, licencja CC BY 3.0, dopisek w stopce) i ikona BusiKM
 * Kierowca. Trzy plany jak w obiektywie: z tyłu małe i rozmyte, z przodu
 * duże i ostre. Za kursorem przesuwają się tym mocniej, im bliżej stoją.
 *
 * Ikony Google Play tu nie ma: Google pozwala jej używać w marketingu tylko
 * w oficjalnej odznace, a ta stoi w treści hero.
 */

type Plan = 0 | 1 | 2;

type Ikona = {
  plik: 'android' | 'busikm';
  /** Środek ikony w procentach szerokości i wysokości banera. */
  x: number;
  y: number;
  /** Szerokość w px na desktopie. Robot ma w pliku 303 px, więc najwyżej
   *  150 px, żeby na ekranie retina nie był powiększany ponad oryginał. */
  w: number;
  plan: Plan;
  obrot: number;
  /** Przesunięcie fazy unoszenia, żeby ikony nie falowały razem. */
  faza: number;
  /** Pozycja i szerokość na telefonie. Bez tego ikona znika poniżej `lg`. */
  telefon?: { x: number; y: number; w: number };
};

const PLANY: Record<Plan, { blur: number; krycie: number; ruch: number }> = {
  0: { blur: 6, krycie: 0.6, ruch: 8 },
  1: { blur: 2.5, krycie: 0.85, ruch: 18 },
  2: { blur: 0, krycie: 1, ruch: 32 },
};

const IKONY: Ikona[] = [
  { plik: 'android', x: 8, y: 54, w: 150, plan: 2, obrot: -11, faza: 0, telefon: { x: 92, y: 7, w: 96 } },
  { plik: 'busikm', x: 88, y: 24, w: 116, plan: 2, obrot: 9, faza: 1.4 },
  { plik: 'android', x: 90, y: 66, w: 112, plan: 1, obrot: 13, faza: 2.2 },
  { plik: 'busikm', x: 14, y: 17, w: 78, plan: 1, obrot: -7, faza: 0.7, telefon: { x: 72, y: 4, w: 44 } },
  { plik: 'android', x: 21, y: 84, w: 92, plan: 1, obrot: 9, faza: 3.1 },
  { plik: 'busikm', x: 77, y: 88, w: 52, plan: 0, obrot: -13, faza: 1.9 },
  { plik: 'android', x: 72, y: 7, w: 64, plan: 0, obrot: -5, faza: 2.7, telefon: { x: 55, y: 9, w: 34 } },
  { plik: 'busikm', x: 3, y: 30, w: 46, plan: 0, obrot: 11, faza: 0.3 },
  { plik: 'android', x: 31, y: 5, w: 58, plan: 0, obrot: 4, faza: 3.6 },
  { plik: 'busikm', x: 97, y: 46, w: 58, plan: 0, obrot: -8, faza: 2.4 },
  { plik: 'android', x: 96, y: 90, w: 70, plan: 0, obrot: -14, faza: 1.1 },
  { plik: 'android', x: 2, y: 86, w: 60, plan: 0, obrot: 15, faza: 2.9 },
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
        const android = ik.plik === 'android';
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
            className={`absolute top-(--ty) left-(--tx) w-(--tw) transition-transform duration-700 ease-out lg:top-(--y) lg:left-(--x) lg:block lg:w-(--w) ${ik.telefon ? '' : 'hidden'}`}
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
              {android ? (
                <Image
                  src="/marki/android-robot-3d.png"
                  alt=""
                  width={303}
                  height={183}
                  priority={ik.plan === 2}
                  className="h-auto w-full drop-shadow-[0_18px_28px_rgba(4,22,90,0.45)]"
                />
              ) : (
                <Image
                  src="/aplikacja/busikm-kierowca-512.png"
                  alt=""
                  width={512}
                  height={512}
                  priority={ik.plan === 2}
                  className="h-auto w-full rounded-[23%] shadow-[0_18px_36px_rgba(4,22,90,0.45),inset_0_0_0_1px_rgba(255,255,255,0.25)] ring-1 ring-white/30"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
