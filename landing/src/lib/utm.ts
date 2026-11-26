/**
 * Źródło wejścia (UTM) przekazywane do aplikacji BusiKM przy wejściu do demo
 * i rejestracji. Te same zasady co w aplikacji i w BE: małe litery, cyfry,
 * `_` i `-`, do 64 znaków. Nie zawiera danych osobowych.
 *
 * Bez zgody na analitykę nic nie zapisujemy w przeglądarce: link dostaje UTM
 * tylko z adresu bieżącej strony. Po zgodzie pierwszy dotyk w karcie trafia do
 * `sessionStorage` (także rozpoznany referrer z Facebooka i Instagrama), więc
 * działa również po przejściu na inną podstronę.
 */

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
] as const;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export const KLUCZ_UTM = 'busikm.utm';

const WZOR = /^[a-z0-9_-]+$/;

export function oczyscUtm(wartosc: unknown): string {
  if (typeof wartosc !== 'string') return '';
  const etykieta = wartosc.trim().toLowerCase().slice(0, 64);
  return WZOR.test(etykieta) ? etykieta : '';
}

export function utmZAdresu(search: string): Utm {
  const params = new URLSearchParams(search);
  const utm: Utm = {};
  for (const klucz of UTM_KEYS) {
    const wartosc = oczyscUtm(params.get(klucz));
    if (wartosc) utm[klucz] = wartosc;
  }
  return utm;
}

const SERWISY: ReadonlyArray<[RegExp, string]> = [
  [/(^|\.)facebook\.com$/, 'facebook'],
  [/(^|\.)instagram\.com$/, 'instagram'],
];

/** Wejście bez UTM z Facebooka albo Instagrama: `utm_source` serwisu i `utm_medium=referral`. */
export function utmZReferrera(referrer: string): Utm {
  let host: string;
  try {
    host = new URL(referrer).hostname;
  } catch {
    return {};
  }
  const serwis = SERWISY.find(([wzor]) => wzor.test(host));
  return serwis ? { utm_source: serwis[1], utm_medium: 'referral' } : {};
}

function pusty(utm: Utm): boolean {
  return Object.keys(utm).length === 0;
}

/** Czyta zapamiętany pierwszy dotyk; przy błędzie albo braku zwraca pusty obiekt. */
export function odczytajZapamietane(): Utm {
  try {
    const surowe = window.sessionStorage.getItem(KLUCZ_UTM);
    return surowe
      ? utmZAdresu(
          new URLSearchParams(
            JSON.parse(surowe) as Record<string, string>,
          ).toString(),
        )
      : {};
  } catch {
    return {};
  }
}

/** Usuwa zapamiętany pierwszy dotyk, np. po cofnięciu zgody na analitykę. */
export function wyczyscZapamietane(): void {
  try {
    window.sessionStorage.removeItem(KLUCZ_UTM);
  } catch {
    // Zablokowany storage: nic nie było zapisane.
  }
}

/** Zapamiętuje pierwszy dotyk w karcie. Wywoływać tylko po zgodzie na analitykę. */
export function zapamietajPierwszyDotyk(biezace: Utm, referrer: string): void {
  try {
    if (window.sessionStorage.getItem(KLUCZ_UTM)) return;
    const dotyk = pusty(biezace) ? utmZReferrera(referrer) : biezace;
    if (!pusty(dotyk))
      window.sessionStorage.setItem(KLUCZ_UTM, JSON.stringify(dotyk));
  } catch {
    // Prywatne okno albo zablokowany storage: link dostanie wtedy tylko UTM z adresu.
  }
}

/**
 * Strony serii „5 kroków” (wejścia z rolek na Facebooku). Gdy w adresie nie
 * ma `utm_campaign`, link do demo dostaje kampanię `wyroznione` i stronę
 * w `utm_content`. Bez tego wejście z rolki bez parametrów (link w opisie
 * strony, przepisany ręcznie) byłoby w zestawieniu anonimowe.
 */
export const UTM_STRON: Readonly<Record<string, string>> = {
  '/itd': 'itd',
};

/** UTM linku do aplikacji z domyślną kampanią strony serii, jeśli jej brak. */
export function zDomyslnaKampania(utm: Utm, sciezka: string): Utm {
  const tresc = UTM_STRON[sciezka.replace(/\/+$/, '')];
  if (!tresc || utm.utm_campaign) return utm;
  return {
    ...utm,
    utm_campaign: 'wyroznione',
    utm_content: utm.utm_content ?? tresc,
  };
}

/** Dokleja UTM do adresu, nie ruszając parametrów, które już w nim są. */
export function dokleUtm(href: string, utm: Utm): string {
  if (pusty(utm)) return href;
  const url = new URL(href);
  for (const [klucz, wartosc] of Object.entries(utm)) {
    if (wartosc && !url.searchParams.has(klucz))
      url.searchParams.set(klucz, wartosc);
  }
  return url.toString();
}
