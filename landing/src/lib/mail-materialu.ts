import { firma } from '@/content/firma';
import type { Material } from '@/content/materialy';
import { DEMO_URL } from '@/content/navigation';
import { serwis } from '@/content/seo';
import { bezpiecznie } from '@/lib/mail-formularza';

/**
 * Mail z linkiem do ściągi PDF, w układzie maili aplikacji (jak
 * `mail-formularza.ts`): białe tło, 600 px, logo BusiKM, granatowy przycisk.
 *
 * Link, a nie załącznik: mail z załącznikiem PDF od nowego nadawcy częściej
 * ląduje w spamie, a link prowadzi zawsze do aktualnej wersji ściągi.
 *
 * Treść jest neutralna (bez „prosiłeś”, „pobrałaś”), bo nie znamy imienia
 * ani formy. Mail idzie jednorazowo, także bez zgody marketingowej: o ten
 * jeden mail człowiek poprosił sam, wpisując adres w okienku. Stopka mówi
 * wprost, skąd mamy adres.
 */

const GRANAT = '#0a3d62';
const LOGO = 'https://app.busikm.pl/email/busikm-logo.png';
const P = 'margin:0 0 16px;';

/** Demo z oznaczeniem, że wejście przyszło z maila ze ściągą. */
function linkDemo(material: Material): string {
  const url = new URL(DEMO_URL);
  url.searchParams.set('utm_source', 'busikm');
  url.searchParams.set('utm_medium', 'email');
  url.searchParams.set('utm_campaign', 'wyroznione');
  url.searchParams.set('utm_content', material.klucz);
  return url.toString();
}

export function mailMaterialu(material: Material): { temat: string; html: string; tekst: string } {
  const temat = material.tematMaila;
  const pdf = `${serwis.url}${material.plik}`;
  const strona = `busikm.pl${material.strona}`;
  const demo = linkDemo(material);
  const przycisk = `Pobierz ${material.nazwa.biernik} (PDF)`;
  const stopka = `Stan przepisów: ${material.stanPrzepisow}, to nie porada prawna. Ten mail wysłaliśmy jednorazowo, bo ten adres podano na ${strona}.`;

  const html = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${bezpiecznie(temat)}</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;color:#1a1a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${bezpiecznie(material.opisMaila)}</div>
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;background:#ffffff;color:#1a1a1a;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
      <tr>
        <td style="padding:0 10px 0 0;vertical-align:middle;"><img src="${LOGO}" width="32" height="32" alt="" style="display:block;border:0;"></td>
        <td style="vertical-align:middle;font-size:19px;font-weight:700;color:#1a1a1a;">BusiKM</td>
      </tr>
    </table>
    <p style="${P}">Dzień dobry,</p>
    <p style="${P}">oto ${bezpiecznie(material.nazwa.mianownik)} z ${bezpiecznie(strona)}. ${bezpiecznie(material.opisMaila)}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px;"><tr><td style="border-radius:8px;background:${GRANAT};"><a href="${bezpiecznie(pdf)}" style="display:inline-block;padding:12px 24px;border-radius:8px;background:${GRANAT};color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">${bezpiecznie(przycisk)}</a></td></tr></table>
    <div style="margin:0 0 24px;padding:14px 16px;border-left:3px solid ${GRANAT};background:#f9fafb;font-size:15px;line-height:1.55;color:#1a1a1a;">
      ${bezpiecznie(material.wBusikm)}. <a href="${bezpiecznie(demo)}" style="color:${GRANAT};font-weight:600;">Zobacz demo bez konta</a>
    </div>
    <hr style="border:0;border-top:1px solid #e5e7eb;margin:32px 0 16px;">
    <p style="margin:0 0 12px;color:#6b7280;font-size:12px;">${bezpiecznie(stopka)}</p>
    <p style="margin:0;color:#6b7280;font-size:12px;">
      Pozdrawiamy, Zespół BusiKM<br>
      <a href="mailto:${firma.email}" style="color:${GRANAT};text-decoration:none;">${firma.email}</a>
    </p>
  </div>
</body>
</html>`;

  const tekst = [
    'Dzień dobry,',
    `oto ${material.nazwa.mianownik} z ${strona}. ${material.opisMaila}`,
    `${przycisk}: ${pdf}`,
    `${material.wBusikm}. Zobacz demo bez konta: ${demo}`,
    stopka,
    `Pozdrawiamy,\nZespół BusiKM\n${firma.email}`,
  ].join('\n\n');

  return { temat, html, tekst };
}
