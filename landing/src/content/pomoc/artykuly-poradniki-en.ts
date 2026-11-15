import type { Artykul } from '@/content/pomoc/typy';

/**
 * Guides on the rules – KSeF from 2027 and the tachograph in vans from July
 * 2026. English version of `artykuly-poradniki.ts`; every fact comes from the
 * same published BusiKM materials, so change both files together.
 */
export const artykulyPoradnikiEn: Artykul[] = [
  {
    slug: 'ksef-dla-przewoznika-2027',
    kategoria: 'zlecenia',
    tytul: 'KSeF for carriers: what changes from 1 January 2027',
    lead: 'From January KSeF, Poland’s national e-invoicing system, covers every invoice to a business, including the smallest transport companies. Four changes you need to know.',
    role: ['wlasciciel', 'ksiegowa'],
    czas: '5 minutes to read',
    rozdzialy: [
      {
        tytul: 'The end of the transition period',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The KSeF transition period ends on 31 December 2026. From 1 January 2027 the National e-Invoicing System covers every invoice issued to a business, including in the smallest companies. A carrier with one or two vans is in the same position as a large forwarding company.',
          },
        ],
      },
      {
        tytul: '1. The end of the PLN 10,000 limit',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Until 31 December 2026 a company with sales of up to PLN 10,000 gross a month can invoice outside KSeF.',
              'From 1 January 2027 that exception disappears.',
              'Every invoice to a business goes through KSeF and gets a KSeF number.',
            ],
          },
        ],
      },
      {
        tytul: '2. The end of invoices from a cash register',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'An invoice printed from a fiscal cash register works only until the end of 2026.',
              'The same goes for a receipt with a tax ID used as a simplified invoice (up to PLN 450 or EUR 100).',
              'From January these small invoices must be in KSeF too.',
            ],
          },
        ],
      },
      {
        tytul: '3. The end of the penalty-free period',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'From 1 January 2027 the tax office can impose a penalty for an invoice issued outside KSeF.',
              'Also for an invoice from offline mode that wasn’t sent to KSeF in time.',
              'The size of the penalty depends on how serious the breach is.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'The penalty can be up to 100% of the VAT on the invoice, and where the invoice has no VAT, up to 18.7% of the gross amount.',
          },
        ],
      },
      {
        tytul: '4. Foreign clients go through KSeF too',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'A job to Germany or the Netherlands doesn’t take you out of KSeF. You issue the invoice for an EU company in KSeF as well. A foreign client doesn’t use KSeF, so they get a PDF from you, but you send it only once the invoice has a KSeF number.',
          },
        ],
      },
      {
        tytul: 'What to check before January',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Whether the software you invoice in sends invoices to KSeF, not just prints a PDF.',
              'Whether you issue invoices to businesses from a cash register or as receipts with a tax ID.',
              'How you send the invoice to a foreign client, and whether it already has a KSeF number by then.',
            ],
          },
        ],
      },
      {
        tytul: 'How BusiKM helps',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'In BusiKM the invoice is built from the order, with no retyping. You click Issue and send to KSeF, the invoice gets its number and goes straight to KSeF. You arrange sending to the client right away: the PDF with a QR code goes out by email once KSeF assigns the number. The same for a client in Germany.',
          },
          {
            typ: 'lista',
            punkty: [
              'You set up the KSeF connection once, in Settings → KSeF.',
              'The invoice shows its path: Issued, In KSeF, With the client, Paid.',
              'Freight in euros converted at the NBP rate.',
              'An invoice in KSeF can’t be cancelled or deleted; you change it with a correction.',
              'The To send to KSeF tab shows what hasn’t gone out yet.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'More about orders and invoices: busikm.pl/en/features/orders-and-invoices. Step-by-step instructions are below, in Issuing an invoice.',
          },
          {
            typ: 'akapit',
            tresc: 'Rules as of November 2026. This is not legal advice.',
          },
        ],
      },
    ],
    powiazane: ['faktura-za-zlecenie', 'kontrahenci'],
  },

  {
    slug: 'tachograf-w-busie-od-lipca-2026',
    kategoria: 'kierowcy',
    tytul: 'Tachograph in 2.5-3.5 t vans from 1 July 2026',
    lead: 'A van in international transport for hire or reward runs with a tachograph like a lorry. What that means in practice and what the roadside inspector will ask about.',
    role: ['wlasciciel', 'dyspozytor', 'kierowca'],
    czas: '7 minutes to read',
    rozdzialy: [
      {
        tytul: 'Who it applies to',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'From 1 July 2026 a 2.5-3.5 t van in international transport runs with a tachograph like a lorry. The obligation applies to transport for hire or reward, that is, for someone else, for money.',
          },
          {
            typ: 'akapit',
            tresc:
              'The exception is carriage on the company’s own account. Two conditions must be met: the goods are yours (you buy, sell or hire them out), and driving the van isn’t the driver’s main job. You have to prove the exception with documents at a check. If you employ a professional driver, the inspection is unlikely to accept it.',
          },
        ],
      },
      {
        tytul: 'From the base, not from the border',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'According to GITD, Poland’s road transport inspectorate, you use the tachograph for the whole journey, as shown on the transport document. That means from your base in Poland, not from the German border. You insert the card at the start of the day and enter the country. At a check the inspector will see where you started the day.',
          },
        ],
      },
      {
        tytul: 'The device: G2V2 tachograph',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Smart tachograph, 2nd generation, version 2.',
              'Fitting, calibration and company lock only at a certified workshop.',
              'Periodic tachograph inspection every 2 years.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'The penalty in Poland for not having a tachograph is up to PLN 12,000: PLN 10,000 for the company and PLN 2,000 for the transport manager.',
          },
        ],
      },
      {
        tytul: 'Driver card: records from 56 days',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'The inspector checks the current day and the previous 56 days.',
              'The driver card stays inserted for the whole working day; printouts are annotated and signed.',
              'For days off the driver has a certificate of not driving the vehicle.',
            ],
          },
          {
            typ: 'uwaga',
            tresc: 'Each day without complete data can mean a PLN 100 penalty.',
          },
        ],
      },
      {
        tytul: 'Driving, breaks and rest',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Rule', 'Limit'],
            wiersze: [
              ['Daily driving', '9 h, twice a week up to 10 h'],
              ['Break after 4.5 h of driving', '45 min, can be split into 15 + 30 min'],
              ['Daily rest', '11 h'],
              ['Weekly driving', '56 h'],
              ['Driving in two consecutive weeks', '90 h'],
              ['Regular weekly rest', '45 h, reduced at least 24 h'],
            ],
          },
        ],
      },
      {
        tytul: 'Borders: country at the start, the end and after the border',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'You enter the country symbol at the start and at the end of the working day.',
              'After every border crossing, at the first stop in a safe place.',
              'A G2V2 tachograph with a new-generation driver card records borders by itself.',
            ],
          },
        ],
      },
      {
        tytul: 'Downloads in the office: 28 and 90 days',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'You download the driver card data at least every 28 days.',
              'The tachograph memory at least every 90 days.',
              'You keep the files at the company, because a check can come to the office too, not only on the road.',
            ],
          },
        ],
      },
      {
        tytul: 'How BusiKM helps',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The tachograph records, BusiKM keeps watch. It doesn’t replace the tachograph and doesn’t release you from any of the obligations above. What it does is show the driver and the office what the tachograph doesn’t tell you as you go.',
          },
          {
            typ: 'lista',
            punkty: [
              'Driving time, breaks and rest count themselves, from the route recorded on the phone.',
              'On international jobs the driver sees on the phone how much longer they can drive: continuous, daily, weekly and two-weekly.',
              'The break reminder comes 15 minutes ahead.',
              'A reminder to download the driver card every 28 days and the tachograph every 90.',
              'Driver and van document deadlines in one place, including tachograph calibration and the driver card.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'More about working time in BusiKM: busikm.pl/en/features/working-time. How the driver sees their counters is described below in Working time, breaks and rest.',
          },
          {
            typ: 'akapit',
            tresc: 'Rules as of November 2026. This is not legal advice.',
          },
        ],
      },
    ],
    powiazane: ['czas-pracy-kierowcy', 'dokumenty-i-terminy'],
  },
];
