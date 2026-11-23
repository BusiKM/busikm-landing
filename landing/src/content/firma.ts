/**
 * Dane sprzedawcy. Jedno źródło – stopka, strona kontaktu, dane strukturalne
 * i polityka prywatności biorą je stąd, żeby nie rozjechały się przy
 * pierwszej zmianie.
 *
 * Od 21.11.2026 sprzedawcą jest jednoosobowa działalność gospodarcza.
 * Przedsiębiorca podaje na stronie firmę (imię, nazwisko i dodatek),
 * adres i NIP. KRS, sąd rejestrowy i kapitał zakładowy dotyczą spółek,
 * więc ich tu nie ma.
 *
 * Sprzedawca jest czynnym podatnikiem VAT, ceny na stronie są netto
 * z doliczanym 23% VAT (stała w `content/cennik.ts`).
 */
export const firma = {
  nazwa: 'Movgranto Łukasz Głowacz',
  ulica: 'ul. Władysława Łokietka 5/2',
  miasto: '70-254 Szczecin',
  nip: '5842581572',
  /** Numer VAT UE (VIES). */
  nipUe: 'PL5842581572',
  regon: '222064844',
  email: 'kontakt@busikm.pl',
  facebook: 'https://www.facebook.com/busikm',
} as const;
