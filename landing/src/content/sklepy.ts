/**
 * Sklepy z aplikacją BusiKM Kierowca (`com.busikm.driver`).
 *
 * Na system Android aplikacja jest w Google Play od 22.11.2026. Wersja na
 * iPhone czeka na recenzję Apple i do publikacji strona mówi tylko
 * „Wkrótce na iPhone”, bez daty i bez odznaki App Store: licencja Apple
 * pozwala jej użyć wyłącznie dla aplikacji, którą już można pobrać.
 * Przełącza to `iosWSklepie`.
 *
 * Aplikacja jest tylko dla kierowców. Kierowca loguje się kodem zaproszenia
 * od swojej firmy, a firma zakłada konto w panelu webowym.
 */

import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';

const GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.busikm.driver';

/**
 * Adres z App Store Connect, stały od założenia aplikacji (do publikacji
 * zwraca 404). Wersja polska idzie do polskiego sklepu. Angielska jest bez
 * kraju: na iPhonie i Macu otwiera App Store w kraju konta, w przeglądarce
 * Apple kieruje sam na swoją domyślną wersję.
 */
const APP_STORE_ID = 'id6837943891';
const APP_STORE: Tlumaczenia<string> = {
  pl: `https://apps.apple.com/pl/app/${APP_STORE_ID}`,
  en: `https://apps.apple.com/app/${APP_STORE_ID}`,
};

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
 * Link do App Store w języku strony. Bez oznaczenia źródła: link kampanii
 * Apple (`ct`) działa tylko razem z numerem dostawcy (`pt`) z App Store
 * Connect, a sam `ct` Apple pomija. Do dopisania, gdy będzie numer.
 */
export function linkAppStore(jezyk: Jezyk): string {
  return APP_STORE[jezyk];
}

/**
 * BusiKM Kierowca jest już w App Store. Do tego czasu odznaki Apple nie
 * pokazujemy (licencja), a teksty mówią „wkrótce na iPhone”. Na stagingu
 * włączone od razu, na produkcji dopiero po publikacji przez Apple:
 * `NEXT_PUBLIC_IOS_W_SKLEPIE=1` w zmiennych Vercela.
 */
export const iosWSklepie = process.env.NEXT_PUBLIC_IOS_W_SKLEPIE === '1';

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
 * Głowa robota i znak słowny Android stoją w hero tylko, dopóki aplikacji
 * nie ma w App Store. Apple pozwala pokazać inne platformy wyłącznie
 * tekstem albo odznaką, więc hero obu sklepów jest bez robota. Od tego
 * zależy też nota o licencji robota w stopce.
 */
export const robotWHero = markaAndroid && !iosWSklepie;

/**
 * Oficjalna odznaka App Store w języku strony, czarna (wersja zalecana przy
 * odznakach innych platform). Pliki SVG z toolbox.marketingtools.apple.com,
 * bez zmian. Kadr 119,66 × 40 to sama odznaka, bez marginesu.
 */
export const odznakaAppStore: Tlumaczenia<string> = {
  pl: '/sklepy/app-store-pl.svg',
  en: '/sklepy/app-store-en.svg',
};

/**
 * Oficjalna odznaka Google Play w języku strony. Oba pliki pochodzą
 * z play.google.com/intl/en_us/badges (`pl_badge_web_generic.png`
 * i `en_badge_web_generic.png`). Angielski plik ma od Google większy przezroczysty
 * margines, więc jest przycięty i przeskalowany tak, żeby czarna ramka miała
 * tę samą wysokość co polska; sama grafika odznaki jest nietknięta. Oba mają kadr 646 × 250, więc
 * rozmiary i marginesy w komponentach są wspólne. Wersja angielska mówi
 * „GET IT ON Google Play”, takie jest oficjalne brzmienie Google.
 */
export const odznakaGooglePlay: Tlumaczenia<string> = {
  pl: '/sklepy/google-play-pl.png',
  en: '/sklepy/google-play-en.png',
};
