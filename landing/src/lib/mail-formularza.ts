import type { WynikKlaviyo } from '@/lib/klaviyo';

/**
 * Mail o nowej wiadomości z formularza kontaktowego, w układzie maili aplikacji
 * (busikm-backend, apps/common/email.py): białe tło, 600 px, logo BusiKM,
 * ramka szczegółów z granatową linią, granatowy przycisk, podpis zespołu.
 *
 * Wiadomość klienta stoi na samej górze. Po kliknięciu „Odpowiedz" cytat w mailu
 * do klienta zaczyna się od jego pytania, a nie od naszych danych technicznych.
 * Stan zapisu na listę jest jednym zdaniem po ludzku; Klaviyo pojawia się tylko
 * wtedy, gdy zapis się nie udał i trzeba dopisać adres ręcznie.
 */

export type DaneFormularza = {
  imie: string;
  email: string;
  tresc: string;
  temat: string;
  jezyk: string;
  zgoda: boolean;
  klaviyo: WynikKlaviyo;
};

export type MailFormularza = { temat: string; html: string; tekst: string };

const GRANAT = '#0a3d62';
const LOGO = 'https://app.busikm.pl/email/busikm-logo.png';
const P = 'margin:0 0 16px;';

/** Ucieczka znaków w treści wstawianej do HTML-a maila. */
export function bezpiecznie(tekst: string): string {
  return tekst.replace(
    /[&<>"]/g,
    (z) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]!,
  );
}

function wielka(tekst: string): string {
  return tekst.charAt(0).toUpperCase() + tekst.slice(1);
}

/** Zdanie o newsletterze: [tekst, czy wymaga działania]. */
export function newsletter(zgoda: boolean, klaviyo: WynikKlaviyo): [string, boolean] {
  if (!zgoda) return ['Newsletter: bez zgody, odpowiadamy tylko na pytanie.', false];
  if (klaviyo.ok) return ['Newsletter: zapisany, jest zgoda na wiadomości od BusiKM.', false];
  return [
    'Newsletter: zgoda jest, ale zapis się nie udał. Dopisz adres ręcznie w Klaviyo (lista BusiKM).',
    true,
  ];
}

export function mailFormularza(dane: DaneFormularza): MailFormularza {
  const angielski = dane.jezyk === 'en';
  const temat = `${wielka(dane.temat)}${angielski ? ' [EN]' : ''}: ${dane.imie}`;
  const jezyk = angielski ? 'angielski, odpowiedz po angielsku' : 'polski';
  const fakty: [string, string][] = [
    ['Temat', wielka(dane.temat)],
    ['Od', dane.imie],
    ['E-mail', dane.email],
    ['Język', jezyk],
  ];
  const [zdanie, uwaga] = newsletter(dane.zgoda, dane.klaviyo);
  const odpowiedz = `mailto:${encodeURIComponent(dane.email).replace('%40', '@')}?subject=${encodeURIComponent(
    `Re: ${wielka(dane.temat)}`,
  )}`;
  const podglad = dane.tresc.replace(/\s+/g, ' ').slice(0, 90);

  const wiersze = fakty
    .map(([etykieta, wartosc], i) => {
      const gora = i === 0 ? 12 : 6;
      const dol = i === fakty.length - 1 ? 12 : 6;
      return `<tr><td style="padding:${gora}px 16px ${dol}px;"><div style="font-size:12px;color:#6b7280;">${bezpiecznie(etykieta)}</div><div style="font-size:15px;font-weight:600;color:#1a1a1a;">${bezpiecznie(wartosc)}</div></td></tr>`;
    })
    .join('');
  const zdanieHtml = uwaga
    ? `<strong>Newsletter: zgoda jest, ale zapis się nie udał.</strong> Dopisz adres ręcznie w Klaviyo (lista BusiKM).`
    : bezpiecznie(zdanie);

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
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${bezpiecznie(podglad)}</div>
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;background:#ffffff;color:#1a1a1a;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
      <tr>
        <td style="padding:0 10px 0 0;vertical-align:middle;"><img src="${LOGO}" width="32" height="32" alt="" style="display:block;border:0;"></td>
        <td style="vertical-align:middle;font-size:19px;font-weight:700;color:#1a1a1a;">BusiKM</td>
      </tr>
    </table>
    <p style="${P}">Nowa wiadomość z formularza na busikm.pl.</p>
    <div style="margin:0 0 24px;padding:14px 16px;border-left:3px solid ${GRANAT};background:#f9fafb;white-space:pre-wrap;font-size:15px;line-height:1.55;color:#1a1a1a;">${bezpiecznie(dane.tresc)}</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px;border-left:3px solid ${GRANAT};background:#f9fafb;">${wiersze}</table>
    <p style="${P}">${zdanieHtml}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 16px;"><tr><td style="border-radius:8px;background:${GRANAT};"><a href="${bezpiecznie(odpowiedz)}" style="display:inline-block;padding:12px 24px;border-radius:8px;background:${GRANAT};color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">Odpowiedz klientowi</a></td></tr></table>
    <p style="margin:0 0 16px;color:#6b7280;font-size:13px;">Możesz też kliknąć Odpowiedz w programie pocztowym - odpowiedź trafi wprost na adres klienta.</p>
    <hr style="border:0;border-top:1px solid #e5e7eb;margin:32px 0 16px;">
    <p style="margin:0;color:#6b7280;font-size:12px;">
      Pozdrawiamy, Zespół BusiKM<br>
      <a href="mailto:kontakt@busikm.pl" style="color:${GRANAT};text-decoration:none;">kontakt@busikm.pl</a>
    </p>
  </div>
</body>
</html>`;

  const tekst = [
    'Nowa wiadomość z formularza na busikm.pl.',
    dane.tresc,
    fakty.map(([etykieta, wartosc]) => `${etykieta}: ${wartosc}`).join('\n'),
    zdanie,
    'Odpowiedz na tego maila, a odpowiedź trafi wprost na adres klienta.',
    'Pozdrawiamy,\nZespół BusiKM',
  ].join('\n\n');

  return { temat, html, tekst };
}
