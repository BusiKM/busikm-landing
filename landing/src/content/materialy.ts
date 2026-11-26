import type { ZrodloPrzepisow } from '@/content/zgoda';

/**
 * Materiały do pobrania ze stron serii „5 kroków” (ściągi PDF).
 *
 * Jedno źródło dla strony, trasy `/api/material` i maila z linkiem. Trasa
 * jest publiczna, więc przyjmuje wyłącznie klucz z tej listy: nikt z zewnątrz
 * nie każe nam wysłać maila z dowolnym linkiem albo tematem.
 *
 * Plik PDF leży w `public/materialy/`. Nazwa pliku zostaje na stałe, bo link
 * idzie w mailach i w rolkach. Nowa wersja ściągi = podmiana pliku pod tą
 * samą nazwą i zmiana `stanPrzepisow`.
 */
export type Material = {
  klucz: ZrodloPrzepisow;
  /** Ścieżka strony, z której pobiera się materiał. */
  strona: string;
  /** Adres PDF od korzenia serwisu. */
  plik: string;
  /** Nazwa materiału w zdaniach: „Twoja checklista”, „Pobierz checklistę”. */
  nazwa: { mianownik: string; biernik: string };
  /** Temat maila z linkiem do PDF. */
  tematMaila: string;
  /** Jedno zdanie w mailu pod tytułem: po co ten PDF. */
  opisMaila: string;
  stanPrzepisow: string;
  /** Zdanie o BusiKM: na stronie nad przyciskiem demo i w mailu. */
  wBusikm: string;
};

export const MATERIALY: Record<ZrodloPrzepisow, Material> = {
  itd: {
    klucz: 'itd',
    strona: '/itd',
    plik: '/materialy/busikm-checklista-kontrola-itd.pdf',
    nazwa: { mianownik: 'checklista', biernik: 'checklistę' },
    tematMaila: 'Twoja checklista: kontrola tachografu w busie',
    opisMaila:
      'Pięć rzeczy do sprawdzenia przed kontrolą tachografu w busie 2,5-3,5 t, na jednej stronie do wydruku.',
    stanPrzepisow: 'listopad 2026',
    wBusikm: 'W BusiKM odczyty 28 i 90 dni, ważność karty i legalizacji pilnują się same',
  },
};

export function czyMaterial(klucz: unknown): klucz is ZrodloPrzepisow {
  return typeof klucz === 'string' && Object.hasOwn(MATERIALY, klucz);
}
