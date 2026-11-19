/**
 * Sklepy z aplikacją BusiKM Kierowca (`com.busikm.driver`).
 *
 * Na system Android aplikacja jest w Google Play, wersja na iPhone przyjdzie
 * później: do tego czasu strona mówi tylko „Wkrótce na iPhone”, bez daty
 * i bez odznaki App Store (licencja Apple pozwala jej użyć wyłącznie dla
 * aplikacji, którą już można pobrać).
 *
 * Aplikacja jest tylko dla kierowców. Kierowca loguje się kodem zaproszenia
 * od swojej firmy, a firma zakłada konto w panelu webowym.
 */

import type { Tlumaczenia } from '@/i18n/jezyki';

const GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.busikm.driver';

/** Skąd przyszło kliknięcie. Widać to w Play Console w źródłach instalacji. */
export type MiejsceSklepu = 'hero' | 'aplikacja' | 'sekcja-kierowcy' | 'rola-kierowcy' | 'stopka';

/**
 * Link do Google Play z oznaczeniem źródła. `referrer` to zakodowane
 * parametry UTM, które Google Play przekazuje do raportu instalacji.
 */
export function linkGooglePlay(miejsce: MiejsceSklepu): string {
  const referrer = new URLSearchParams({ utm_source: 'busikm.pl', utm_medium: miejsce }).toString();
  return `${GOOGLE_PLAY}&referrer=${encodeURIComponent(referrer)}`;
}

/**
 * Głowa robota i znak słowny Android w hero (`MarkaAndroid`) oraz nota
 * o licencji robota w stopce. Pliki z Partner Marketing Hub są poufne do
 * akceptacji zespołu marki Android (zgłoszenie a384508e8b7b), a repozytorium
 * jest publiczne. Do tego czasu plików nie ma w repo i przełącznik stoi na
 * `false`. Po akceptacji: dodać `public/marki/android-glowa.png`
 * i `android-znak.svg` (usunąć je z .git/info/exclude) i ustawić `true`.
 * Lokalny podgląd: `NEXT_PUBLIC_MARKA_ANDROID=1` w `.env.local`.
 */
export const markaAndroid = process.env.NEXT_PUBLIC_MARKA_ANDROID === '1';

/**
 * Oficjalna odznaka Google Play w języku strony. Oba pliki pochodzą
 * bez zmian z play.google.com/intl/en_us/badges (`pl_badge_web_generic.png`
 * i `en_badge_web_generic.png`) i mają ten sam kadr 646 × 250, więc
 * rozmiary i marginesy w komponentach są wspólne. Wersja angielska mówi
 * „GET IT ON Google Play”, takie jest oficjalne brzmienie Google.
 */
export const odznakaGooglePlay: Tlumaczenia<string> = {
  pl: '/sklepy/google-play-pl.png',
  en: '/sklepy/google-play-en.png',
};
