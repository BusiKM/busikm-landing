'use client';

import { useEffect } from 'react';

import { odczytajZgode, subskrybujZgode } from './zgoda';
import { appLinks } from '@/content/navigation';
import {
  dokleUtm,
  odczytajZapamietane,
  utmZAdresu,
  wyczyscZapamietane,
  zapamietajPierwszyDotyk,
  zDomyslnaKampania,
} from '@/lib/utm';

const CELE = [appLinks.demo, appLinks.rejestracja];

/**
 * Dokleja źródło wejścia (UTM) do odnośników do demo i rejestracji w aplikacji,
 * żeby BusiKM wiedział, skąd przychodzą firmy (zestawienie w panelu admina).
 *
 * Jeden nasłuch na dokumencie, tak jak `demo_open` w `Analytics`: adres zmienia
 * się w chwili kliknięcia, więc HTML z serwera i dane strukturalne zostają bez
 * UTM. UTM z adresu bieżącej strony idzie zawsze (nic nie zapisujemy). Pamięć
 * karty i referrer działają dopiero po zgodzie na analitykę, a brak albo
 * cofnięcie zgody usuwa zapamiętany pierwszy dotyk. Na stronach serii
 * „5 kroków” brak kampanii uzupełnia `zDomyslnaKampania` (bez zapisu
 * czegokolwiek w przeglądarce).
 */
export function UtmDoAplikacji() {
  useEffect(() => {
    const zgoda = () => odczytajZgode() === 'tak';
    if (zgoda())
      zapamietajPierwszyDotyk(
        utmZAdresu(window.location.search),
        document.referrer,
      );
    else wyczyscZapamietane();
    const odsubskrybuj = subskrybujZgode(() => {
      if (!zgoda()) wyczyscZapamietane();
    });

    const naKlik = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!(a instanceof HTMLAnchorElement)) return;
      if (!CELE.some((cel) => a.href.startsWith(cel))) return;
      const biezace = utmZAdresu(window.location.search);
      const utm =
        Object.keys(biezace).length > 0 || !zgoda()
          ? biezace
          : odczytajZapamietane();
      a.href = dokleUtm(a.href, zDomyslnaKampania(utm, window.location.pathname));
    };
    document.addEventListener('click', naKlik, { capture: true });
    document.addEventListener('auxclick', naKlik, { capture: true });
    return () => {
      odsubskrybuj();
      document.removeEventListener('click', naKlik, { capture: true });
      document.removeEventListener('auxclick', naKlik, { capture: true });
    };
  }, []);
  return null;
}
