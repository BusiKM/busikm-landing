# 10. SEO i analityka

Co strona wysyła wyszukiwarkom, skąd to bierze i co trzeba zrobić ręcznie po
wdrożeniu. Wszystko, co da się trzymać w jednym miejscu, siedzi
w `landing/src/content/seo.ts`.

## Gdzie co leży

| Plik | Za co odpowiada |
|---|---|
| `src/content/seo.ts` | adres serwisu, lista tras z priorytetami, strony wyłączone z indeksu |
| `src/lib/metadata.ts` | budowanie `<title>`, opisów, adresów kanonicznych i podglądu OG |
| `src/app/sitemap.ts` | `/sitemap.xml` - generowana z listy tras |
| `src/app/robots.ts` | `/robots.txt` - generowany, wskazuje na mapę strony |
| `src/components/seo/schema.ts` | dane strukturalne (schema.org) |
| `src/components/analytics/` | Google Analytics i zgoda na ciasteczka |

## Dwa języki

Serwis ma wersję polską (bez przedrostka) i angielską (`/en`, angielskie
slugi). Każda strona wskazuje siebie jako kanoniczną, a obie wersje łączy
`hreflang` (w metadanych i w `sitemap.xml`, `x-default` = polski). Mapa
strony wypisuje każdą trasę w obu językach sama. Szczegóły: `15-wersja-angielska.md`.

## Tytuły, opisy i nagłówki

- **Tytuł** prowadzi frazą, której szuka przewoźnik, marka idzie na koniec:
  `seoTitle` w `src/content/pages.ts`, a dla strony głównej `opisSerwisu`
  w `src/content/seo.ts`. Przyrostek ` | BusiKM` dokleja `src/lib/metadata.ts`,
  o ile tytuł nie zawiera już nazwy - więc w `seoTitle` go nie wpisujemy.
  Limit: około 60 znaków razem z przyrostkiem, bez „·" i długich myślników.
- **Opis** do ~155 znaków, każdy inny.
- **`h1` to fraza, nie slogan.** Na stronach ról (`HeroRoli`) i na stronach
  pod frazy nagłówkiem `h1` jest nadtytuł („Program TMS dla busów 2,5-3,5 t"),
  wyglądający jak dawniej nadtytuł; slogan zostaje dużym tekstem w `<p>`.
  Na stronie ma być dokładnie jeden `h1`.

Frazy, pod które ustawione są strony (stan na 15.11.2026):

| Fraza | Strona |
|---|---|
| program dla firmy transportowej | `/` |
| program TMS dla busów | `/program-tms-dla-busow`, `/co-robi/dyspozytornia` |
| ewidencja przebiegu pojazdu program | `/co-robi/ewidencja-przebiegu` |
| KSeF dla przewoźnika | `/co-robi/zlecenia-i-faktury`, `/pomoc/ksef-dla-przewoznika-2027` |
| czas pracy kierowcy busa, AETR | `/co-robi/czas-pracy` |
| tachograf w busie | `/pomoc/tachograf-w-busie-od-lipca-2026`, `/co-robi/czas-pracy` |
| diety kierowcy za granicą, ryczałt za nocleg | `/co-robi/diety-i-delegacje` |
| GPS busa | `/co-robi/trasy-i-mapa` |

## Strony pod frazy

Trzy podstrony powstały wyłącznie po to, żeby odpowiadać na zapytania
z wyszukiwarki i z asystentów AI. Mają po 900+ słów, nagłówki `h2` językiem
zapytań, odnośniki do pozostałych podstron i do pomocy oraz wezwania
„Zobacz demo" i „Zapisz się na start". Wspólny układ:
`src/components/pages/frazy/StronaFrazy.tsx`.

| Polski | Angielski |
|---|---|
| `/program-tms-dla-busow` | `/en/van-tms` |
| `/co-robi/ewidencja-przebiegu` | `/en/features/mileage-log` |
| `/co-robi/diety-i-delegacje` | `/en/features/per-diems-and-business-trips` |

Do tego dwa poradniki o przepisach w centrum pomocy
(`src/content/pomoc/artykuly-poradniki.ts` i `-en.ts`):
`/pomoc/ksef-dla-przewoznika-2027` i `/pomoc/tachograf-w-busie-od-lipca-2026`.
Przepisy biorą się wyłącznie z materiałów już opublikowanych przez BusiKM
(albumy i rolki na Facebooku), każdy poradnik ma datę stanu przepisów
i kończy się zdaniem „To nie jest porada prawna.". Przy zmianie prawa
poprawiamy oba języki naraz.

## Dodanie nowej podstrony

1. Opis strony w `src/content/pages.ts` (tytuł, opis dla wyszukiwarek),
   w `strony` i w `stronyEn`.
2. `export const generateMetadata = metadataPodstrony('sciezka')` w pliku strony.
3. Wpis w `src/i18n/trasy.ts` z angielskim adresem - bez niego 404.
4. **Wpis w `trasy` w `src/content/seo.ts`** - bez tego strona nie trafi
   do `sitemap.xml` i Google znajdzie ją dopiero z odnośnika.
5. Po wdrożeniu `npm run indexnow` (niżej).

Okruszki i pytania dopisują się same: pierwsze z bieżącej ścieżki, drugie
z komponentu `Akordeon`.

## Strony poza indeksem

`nieindeksowane` w `src/content/seo.ts`: `/dla-kogo` (szkielet bez treści),
`/zaloguj` (formularz zapisu na listę) i `/status` (stan usługi). Dostają
`noindex, follow` i nie ma ich w mapie strony - mapa nie może wskazywać
adresu, którego zabraniamy indeksować.

## Dane strukturalne

Na każdej stronie: `Organization` (dane firmy z KRS-u), `WebSite`
i `SoftwareApplication` z cenami z `src/content/cennik.ts`. Na podstronach
dodatkowo `BreadcrumbList`, a tam gdzie jest akordeon - `FAQPage`.

Dwie rzeczy, których tam **nie ma i nie powinno być**, dopóki nie będzie
pokrycia w rzeczywistości:

- `aggregateRating` i `review` - oznaczenie wymyślonych ocen to naruszenie
  wytycznych Google i ręczna kara na całą domenę.
- `sameAs` z profilami społecznościowymi - dopisz dopiero, gdy profile
  powstaną.

Ceny w danych strukturalnych i ceny w cenniku pochodzą z jednego pliku.
Rozjazd Google zgłasza jako „niezgodna cena" i odbiera wynik rozszerzony.

## Analityka i zgoda

Licznik Google Analytics 4 **nie ładuje się w ogóle**, dopóki czytelnik nie
kliknie „Zgadzam się". Nie ładuje się „w trybie bez ciasteczek" - po prostu
go nie ma. Tak mówi polityka prywatności (§ 7) i tak działa kod.

- Decyzja siedzi w `localStorage` pod kluczem `busikm.zgoda.analityka`.
- Odnośnik „Ustawienia cookie" w stopce przywraca baner.
- Wycofanie zgody przeładowuje stronę, żeby usunąć skrypt z pamięci.
- Ciasteczko wygasa po 14 miesiącach (`cookie_expires`), bo tyle obiecuje
  polityka prywatności. Domyślne dwa lata GA4 byłyby z nią sprzeczne.

Bez zmiennej `NEXT_PUBLIC_GA_ID` licznik nie istnieje - dlatego praca lokalna
i podglądy na Vercelu nie zaśmiecają statystyk.

## Do zrobienia ręcznie po wdrożeniu

1. **Google Analytics 4** - załóż usługę, wklej `G-XXXXXXXXXX`
   do `NEXT_PUBLIC_GA_ID` w Vercelu, wyłącznie dla środowiska „Production".
   W panelu GA ustaw przechowywanie danych na **14 miesięcy** - inaczej
   polityka prywatności przestanie być prawdziwa.
2. **Google Search Console** - zweryfikuj domenę, kod wklej
   do `GOOGLE_SITE_VERIFICATION`, potem zgłoś `https://busikm.pl/sitemap.xml`.
3. **Bing Webmaster Tools** - podpięty 15.11.2026 importem z Google Search
   Console. Bing zasila też odpowiedzi ChatuGPT.
4. **IndexNow** - po każdym wdrożeniu z nową albo zmienioną treścią
   uruchom w `landing/` `npm run indexnow` (wszystkie adresy z
   `sitemap.xml`) albo `npm run indexnow -- /sciezka /en/path` (wybrane).
   Skrypt `scripts/indexnow.mjs` najpierw sprawdza, czy plik klucza jest
   już na produkcji. Zgłoszenie trafia do Binga i dalej do ChatuGPT.
5. **Profil firmy w Google** - jeśli ma być widoczność lokalna; wtedy dopisz
   `sameAs` w `schema.ts`.
6. Sprawdź podgląd kafelka: Facebook Sharing Debugger, LinkedIn Post
   Inspector. Oba trzymają obraz w pamięci - po podmianie `og-image`
   trzeba wymusić odświeżenie.

## Czego świadomie nie ma

- **`meta keywords`** - Google ignoruje od 2009 roku.
- **Przekierowań ze wszystkich starych adresów Astro** - tylko te, które mają
  odpowiednik treści (`next.config.ts`). Zrzucanie reszty na stronę główną
  Google traktuje jak „miękkie 404".
- **Blokady `/_next/` w `robots.txt`** - Google renderuje stronę jak
  przeglądarka i potrzebuje tych plików.
