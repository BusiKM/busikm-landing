/**
 * Sklepy z aplikacją BusiKM Kierowca (`com.busikm.driver`).
 *
 * Na Androidzie aplikacja jest w Google Play, wersja na iPhone przyjdzie
 * później: do tego czasu strona mówi tylko „Wkrótce na iPhone”, bez daty
 * i bez odznaki App Store (licencja Apple pozwala jej użyć wyłącznie dla
 * aplikacji, którą już można pobrać).
 *
 * Aplikacja jest tylko dla kierowców. Kierowca loguje się kodem zaproszenia
 * od swojej firmy, a firma zakłada konto w panelu webowym.
 */

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
