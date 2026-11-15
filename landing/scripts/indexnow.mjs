/**
 * Zgłasza adresy z mapy strony busikm.pl do IndexNow (Bing, Yandex, Seznam
 * i inne wyszukiwarki, które dzielą się zgłoszeniami).
 *
 *     node scripts/indexnow.mjs                 # wszystkie adresy z sitemap.xml
 *     node scripts/indexnow.mjs /cennik /demo   # tylko wybrane ścieżki
 *
 * Uruchamiaj po wdrożeniu na produkcję, gdy zmienia się treść strony.
 * Bing jest źródłem wyników wyszukiwania w ChatGPT, więc szybkie
 * zgłoszenie skraca drogę nowej treści do odpowiedzi asystentów.
 *
 * Klucz to plik `public/<klucz>.txt` z samym kluczem w środku. Jest jawny
 * z założenia: IndexNow sprawdza nim, że zgłoszenie pochodzi od właściciela
 * domeny. Nowy klucz = nowy plik i podmiana stałej poniżej.
 */

const HOST = 'busikm.pl';
const KLUCZ = '8ae31dad4d1b3e86842041f133671717';
const SERWIS = `https://${HOST}`;

async function adresyZMapy() {
  const odp = await fetch(`${SERWIS}/sitemap.xml`);
  if (!odp.ok) throw new Error(`sitemap.xml: ${odp.status}`);
  const xml = await odp.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const sciezki = process.argv.slice(2);
const adresy = sciezki.length
  ? sciezki.map((s) => new URL(s, SERWIS).href)
  : await adresyZMapy();

// Klucz musi być osiągalny pod adresem z `keyLocation`, inaczej IndexNow
// odrzuca całe zgłoszenie kodem 403. Sprawdzamy przed wysłaniem.
const plik = await fetch(`${SERWIS}/${KLUCZ}.txt`);
if (!plik.ok || (await plik.text()).trim() !== KLUCZ) {
  throw new Error(`Plik klucza ${SERWIS}/${KLUCZ}.txt nie jest jeszcze na produkcji.`);
}

const odp = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KLUCZ,
    keyLocation: `${SERWIS}/${KLUCZ}.txt`,
    urlList: adresy,
  }),
});

// 200 i 202 to przyjęte zgłoszenie; 202 znaczy, że klucz czeka na sprawdzenie.
console.log(`IndexNow: ${odp.status} ${odp.statusText}, adresów: ${adresy.length}`);
if (odp.status !== 200 && odp.status !== 202) {
  console.error(await odp.text());
  process.exit(1);
}
