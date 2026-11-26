/**
 * Zdarzenia GA4 wołane z komponentów.
 *
 * `window.gtag` istnieje dopiero po zgodzie na analitykę (patrz
 * `components/analytics/Analytics.tsx`), więc bez zgody funkcja nic nie
 * robi i komponent nie musi znać stanu zgody. Parametry bez danych
 * osobowych: nazwa materiału i sposób pobrania, nigdy adres e-mail.
 *
 * Lista nazw jest zamknięta, żeby literówka nie tworzyła w GA4 nowego
 * zdarzenia, którego nikt nie zauważy w raportach.
 */
type ZdarzenieGa = 'pdf_download' | 'kalkulator_wynik' | 'kalkulator_przyklad';

export function zdarzenieGa(nazwa: ZdarzenieGa, parametry?: Record<string, string | number>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', nazwa, { page_path: window.location.pathname, ...parametry });
}
