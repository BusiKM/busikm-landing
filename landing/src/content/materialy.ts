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
  /** Nazwa materiału w zdaniach: „Twoja checklista”, „Pobierz checklistę”, „link do checklisty”. */
  nazwa: { mianownik: string; biernik: string; dopelniacz: string };
  /** Zdanie w okienku pod pytaniem o mail: po co mieć ten PDF w skrzynce. */
  podReka: string;
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
    nazwa: { mianownik: 'checklista', biernik: 'checklistę', dopelniacz: 'checklisty' },
    podReka: 'Będziesz ją mieć pod ręką przed kontrolą, a nie tylko w pobranych plikach telefonu.',
    tematMaila: 'Twoja checklista: kontrola tachografu w busie',
    opisMaila:
      'Pięć rzeczy do sprawdzenia przed kontrolą tachografu w busie 2,5-3,5 t, na jednej stronie do wydruku.',
    stanPrzepisow: 'listopad 2026',
    wBusikm: 'W BusiKM odczyty 28 i 90 dni, ważność karty i legalizacji pilnują się same',
  },
  ksef: {
    klucz: 'ksef',
    strona: '/ksef',
    plik: '/materialy/busikm-sciaga-ksef-2027.pdf',
    nazwa: { mianownik: 'ściąga', biernik: 'ściągę', dopelniacz: 'ściągi' },
    podReka: 'Będziesz ją mieć pod ręką przy pierwszej fakturze w KSeF, a nie tylko w pobranych plikach telefonu.',
    tematMaila: 'Twoja ściąga: KSeF od 1 stycznia 2027',
    opisMaila:
      'Pięć rzeczy o KSeF dla firmy z busami, które warto mieć pod ręką przed 1 stycznia 2027, na jednej stronie do wydruku.',
    stanPrzepisow: 'listopad 2026',
    wBusikm: 'W BusiKM faktura ze zlecenia idzie prosto do KSeF, a o wygasającym certyfikacie przypomnimy',
  },
};

export function czyMaterial(klucz: unknown): klucz is ZrodloPrzepisow {
  return typeof klucz === 'string' && Object.hasOwn(MATERIALY, klucz);
}
