import { serwis, trasy, opisSerwisu, dataZmiany } from '@/content/seo';
import { KODY, type Jezyk } from '@/i18n/jezyki';
import { lokalizuj } from '@/i18n/trasy';
import { firma } from '@/content/firma';
import { pages } from '@/content/pages';
import { plans } from '@/content/cennik';
import type { Rolka } from '@/content/rolki';
import type { Artykul } from '@/content/pomoc/typy';

/**
 * Budowniki grafu danych strukturalnych (schema.org).
 *
 * Jeden graf na stronę główną – firma, serwis i produkt – oraz dwa elementy
 * doklejane na podstronach: ścieżka okruszków i pytania.
 *
 * Świadomie **nie ma tu `aggregateRating` ani `review`**: nie mamy jeszcze
 * ocen, a oznaczenie wymyślonych to naruszenie wytycznych Google, za które
 * leci ręczna kara na całą domenę.
 */

const ID_FIRMA = `${serwis.url}/#organizacja`;
const ID_SERWIS = `${serwis.url}/#serwis`;

/** Kod pocztowy i miasto trzymamy w jednym polu – schema.org chce osobno. */
function adres() {
  const [kod, ...reszta] = firma.miasto.split(' ');
  return {
    '@type': 'PostalAddress',
    streetAddress: firma.ulica,
    postalCode: kod,
    addressLocality: reszta.join(' '),
    addressCountry: 'PL',
  };
}

function organizacja() {
  return {
    '@type': 'Organization',
    '@id': ID_FIRMA,
    name: serwis.nazwa,
    legalName: firma.nazwa,
    url: serwis.url,
    logo: {
      '@type': 'ImageObject',
      url: `${serwis.url}${serwis.logo}`,
      width: 512,
      height: 512,
    },
    image: `${serwis.url}${serwis.ogImage}`,
    email: firma.email,
    sameAs: [firma.facebook],
    address: adres(),
    // Bez `vatID`: MOVGRANTO jest zwolniona z VAT (art. 113) i nie jest
    // czynnym podatnikiem VAT UE, więc numer w formacie VIES wprowadzałby
    // w błąd. Zostaje sam NIP.
    taxID: firma.nip,
    identifier: [
      { '@type': 'PropertyValue', name: 'NIP', value: firma.nip },
      { '@type': 'PropertyValue', name: 'REGON', value: firma.regon },
      { '@type': 'PropertyValue', name: 'KRS', value: firma.krs },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: firma.email,
      availableLanguage: ['pl', 'en'],
      areaServed: 'PL',
    },
  };
}

function witryna(jezyk: Jezyk) {
  return {
    '@type': 'WebSite',
    '@id': ID_SERWIS,
    url: serwis.url,
    name: serwis.nazwa,
    description: opisSerwisu[jezyk].opis,
    inLanguage: KODY[jezyk].lang,
    publisher: { '@id': ID_FIRMA },
  };
}

/**
 * Produkt z cenami.
 *
 * Ceny biorą się z tej samej tablicy, co cennik na stronie – rozjazd między
 * ceną w wyniku wyszukiwania a ceną na stronie to zgłoszenie „niezgodna
 * cena" i utrata wyniku rozszerzonego.
 */
const FUNKCJE: Record<Jezyk, string[]> = {
  pl: [
    'Automatyczna ewidencja przebiegu pojazdu (kilometrówka)',
    'Ewidencja czasu pracy kierowcy i przerw',
    'Zlecenia transportowe i faktury dla klientów',
    'Mapa floty i planowanie tras',
    'Odczyt paragonów ze zdjęcia',
    'Rentowność zleceń i raporty kosztów',
    'Komplet dokumentów dla biura rachunkowego',
    'Pilnowanie terminów dokumentów i badań',
    'Aplikacja mobilna dla kierowcy',
  ],
  en: [
    'Automatic vehicle mileage log',
    'Driver working time and break records',
    'Transport orders and customer invoices',
    'Fleet map and route planning',
    'Receipt capture from a photo',
    'Order profitability and cost reports',
    'Complete document pack for the accounting office',
    'Document and inspection deadline reminders',
    'Mobile app for drivers',
  ],
};

function aplikacja(jezyk: Jezyk) {
  const ceny = plans[jezyk].map((p) => Number(p.monthly.replace(/\s/g, '')));

  return {
    '@type': 'SoftwareApplication',
    '@id': `${serwis.url}/#aplikacja`,
    name: serwis.nazwa,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory:
      jezyk === 'pl' ? 'Zarządzanie flotą i transportem' : 'Fleet and transport management',
    // iOS dopisać, gdy BusiKM Kierowca będzie w App Store.
    operatingSystem: 'Web, Android',
    url: serwis.url,
    description: opisSerwisu[jezyk].opis,
    inLanguage: KODY[jezyk].lang,
    provider: { '@id': ID_FIRMA },
    screenshot: `${serwis.url}${serwis.ogImage}`,
    featureList: FUNKCJE[jezyk],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PLN',
      lowPrice: String(Math.min(...ceny)),
      highPrice: String(Math.max(...ceny)),
      offerCount: plans[jezyk].length,
      url: `${serwis.url}${lokalizuj('/cennik', jezyk)}`,
      offers: plans[jezyk].map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: p.monthly.replace(/\s/g, ''),
        priceCurrency: 'PLN',
        url: `${serwis.url}${lokalizuj('/cennik', jezyk)}`,
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: p.monthly.replace(/\s/g, ''),
          priceCurrency: 'PLN',
          // Ceny w cenniku są końcowe: sprzedawca jest zwolniony z VAT
          // (art. 113), na fakturze stawka „zw.”. Nic się do nich nie dolicza.
          valueAddedTaxIncluded: true,
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: 'MON',
        },
      })),
    },
  };
}

/** Graf strony głównej: firma + serwis + produkt. */
export function grafStronyGlownej(jezyk: Jezyk) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizacja(), witryna(jezyk), aplikacja(jezyk)],
  };
}

/** Sama firma i serwis – na podstronach, gdzie produkt nie jest tematem. */
export function grafPodstawowy(jezyk: Jezyk) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizacja(), witryna(jezyk)],
  };
}

/**
 * Ścieżka okruszków dla podstrony.
 *
 * Człony pośrednie, których nie ma w `trasy`, są pomijane – `/co-robi` to
 * w nawigacji wyłącznie wyzwalacz menu, więc wskazanie na niego prowadziłoby
 * robota pod adres bez treści. `/dla-kogo` ma już własną treść i jest w `trasy`,
 * więc w okruszkach się pojawia.
 */
export function okruszki(sciezka: string, jezyk: Jezyk) {
  const istnieje = new Set(trasy.map((t) => t.sciezka));
  const czlony = sciezka.split('/').filter(Boolean);

  type Okruch = { '@type': 'ListItem'; position: number; name: string; item: string };
  const elementy: Okruch[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: jezyk === 'pl' ? 'Strona główna' : 'Home',
      item: `${serwis.url}${lokalizuj('/', jezyk)}`.replace(/\/$/, ''),
    },
  ];

  let biezaca = '';
  for (const czlon of czlony) {
    biezaca += `/${czlon}`;
    if (!istnieje.has(biezaca)) continue;
    const strona = pages[jezyk][biezaca.slice(1)];
    elementy.push({
      '@type': 'ListItem',
      position: elementy.length + 1,
      name: strona?.title ?? czlon,
      item: `${serwis.url}${lokalizuj(biezaca, jezyk)}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: elementy,
  };
}

/**
 * Rolki jako lista filmów – dzięki temu Google może pokazać je w wynikach wideo.
 * Odtwarzacz otwiera się z adresu, więc każda rolka ma własny `url`.
 */
export function listaRolek(rolki: Rolka[], jezyk: Jezyk) {
  const strona = `${serwis.url}${lokalizuj('/rolki', jezyk)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: rolki.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'VideoObject',
        name: r.tytul,
        description: r.opis,
        thumbnailUrl: r.okladka,
        contentUrl: r.film,
        url: `${strona}?rolka=${r.slug}`,
        uploadDate: r.data,
        duration: `PT${r.sekundy}S`,
        inLanguage: KODY.pl.lang,
      },
    })),
  };
}

/**
 * Pytania i odpowiedzi.
 *
 * Uwaga na oczekiwania: od 2023 roku Google pokazuje wyniki rozszerzone
 * FAQ wyłącznie serwisom urzędowym i medycznym. Znacznik zostaje, bo nadal
 * pomaga zrozumieć, o czym jest strona, i jest czytany przez wyszukiwarki
 * odpowiedzi – ale gwiazdek pod wynikiem z niego nie będzie.
 */
export function pytaniaIOdpowiedzi(items: readonly (readonly [string, string])[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([pytanie, odpowiedz]) => ({
      '@type': 'Question',
      name: pytanie,
      acceptedAnswer: { '@type': 'Answer', text: odpowiedz },
    })),
  };
}

/**
 * Artykuł centrum pomocy (instrukcja albo poradnik o przepisach).
 *
 * Okruszki dokłada `OkruszkiSeo` w układzie, tu jest sam artykuł. Data
 * zmiany to ta sama, którą `sitemap.xml` podaje jako `lastmod` (wpis
 * w `trasy` w `content/seo.ts`) – dwie różne daty dla jednej strony to
 * sygnał, któremu Google przestaje ufać. Autorem i wydawcą jest BusiKM
 * jako organizacja: artykuły nie mają podpisanego autora i nie udajemy,
 * że mają.
 */
export function artykulPomocy(artykul: Artykul, jezyk: Jezyk) {
  const sciezka = `/pomoc/${artykul.slug}`;
  const trasa = trasy.find((t) => t.sciezka === sciezka);
  const url = `${serwis.url}${lokalizuj(sciezka, jezyk)}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artykul.tytul,
    description: artykul.lead,
    ...(trasa && { dateModified: dataZmiany(trasa).toISOString().slice(0, 10) }),
    inLanguage: KODY[jezyk].lang,
    url,
    mainEntityOfPage: url,
    image: `${serwis.url}${serwis.ogImage}`,
    author: { '@type': 'Organization', '@id': ID_FIRMA, name: serwis.nazwa, url: serwis.url },
    publisher: { '@id': ID_FIRMA },
  };
}
