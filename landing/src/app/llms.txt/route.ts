import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { iosWSklepie } from '@/content/sklepy';

/**
 * `llms.txt` składany w buildzie, nie plik w `public/`. Treść leży
 * w `src/content/llms/llms.txt` i mówi „wersja na iPhone wkrótce”. Gdy
 * BusiKM Kierowca jest w App Store (`iosWSklepie`), poniższe zdania
 * zamieniają się na wersję z oboma sklepami. Staging pokazuje ją od razu,
 * produkcja dopiero po publikacji przez Apple.
 *
 * Każde zdanie musi istnieć w pliku dokładnie raz. Gdy ktoś je zmieni,
 * build się wywróci, zamiast po cichu zostawić „wkrótce” po publikacji.
 */
export const dynamic = 'force-static';

const APP_STORE = 'https://apps.apple.com/pl/app/id6837943891';

const ZAMIANY: ReadonlyArray<readonly [string, string]> = [
  [
    'aplikacja BusiKM Kierowca na system Android, wkrótce na iPhone',
    'aplikacja BusiKM Kierowca na iPhone i system Android',
  ],
  [
    '- Android 7.0 lub nowszy (Google Play), wersja na iPhone wkrótce. Po polsku,',
    '- iPhone (App Store) i Android 7.0 lub nowszy (Google Play). Po polsku,',
  ],
  [
    `  Aplikacja jest w Google Play:
  https://play.google.com/store/apps/details?id=com.busikm.driver`,
    `  Aplikacja jest w App Store i Google Play:
  ${APP_STORE}
  https://play.google.com/store/apps/details?id=com.busikm.driver`,
  ],
  [
    `(Android 7.0 or later on Google Play, iPhone
coming soon, in Polish)`,
    `(iPhone on the App Store and Android 7.0
or later on Google Play, in Polish)`,
  ],
  [
    `The driver app is on Google Play
(https://play.google.com/store/apps/details?id=com.busikm.driver); the iPhone
version is coming soon.`,
    `The driver app is on the App Store
(https://apps.apple.com/app/id6837943891) and Google Play
(https://play.google.com/store/apps/details?id=com.busikm.driver).`,
  ],
];

export function GET() {
  let tekst = readFileSync(join(process.cwd(), 'src/content/llms/llms.txt'), 'utf8');
  if (iosWSklepie) {
    for (const [z, na] of ZAMIANY) {
      if (tekst.split(z).length !== 2) {
        throw new Error(`llms.txt: zdanie do zamiany nie występuje dokładnie raz: ${z.slice(0, 60)}`);
      }
      tekst = tekst.replace(z, na);
    }
  }
  return new Response(tekst, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
