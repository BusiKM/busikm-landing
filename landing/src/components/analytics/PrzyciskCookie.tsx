'use client';

import { otworzUstawieniaCookie } from './zgoda';
import { useJezyk } from '@/i18n/klient';

/**
 * Odnośnik w stopce, który przywraca baner zgody.
 *
 * Polityka prywatności obiecuje, że zgodę da się cofnąć „w każdej chwili".
 * Bez tego przycisku jedyną drogą byłoby czyszczenie danych witryny
 * w przeglądarce – a to nie jest wycofanie zgody, tylko obejście.
 */
export function PrzyciskCookie() {
  const jezyk = useJezyk();
  return (
    <button
      type="button"
      onClick={otworzUstawieniaCookie}
      className="cursor-pointer text-ink-muted hover:text-paper"
    >
      {jezyk === 'pl' ? 'Ustawienia cookie' : 'Cookie settings'}
    </button>
  );
}
