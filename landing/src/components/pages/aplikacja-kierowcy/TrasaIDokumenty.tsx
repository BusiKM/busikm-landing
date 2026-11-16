import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  trasa: { naglowek: string; tresc: string };
  trasaZrzut: { label: string; note: string };
  dok: { naglowek: string; tresc: string };
  dokZrzut: { label: string; note: string };
}> = {
  pl: {
    trasa: {
      naglowek: 'Trasa poza zleceniem',
      tresc:
        'Dojazd do bazy i przejazd do serwisu też się liczą. „Trasa bez zlecenia”: służbowa albo prywatna, „Rozpocznij trasę” i „Zakończ trasę”. Na prywatną przerwę zapis trasy wstrzymasz jednym przyciskiem.',
    },
    trasaZrzut: {
      label: 'Trasa bez zlecenia (telefon, tryb nocny)',
      note: 'Ekran „Trasa bez zlecenia”: pojazd, typ trasy Służbowa albo Prywatna, cel Serwis pojazdu, licznik na start i przycisk „Rozpocznij trasę”.',
    },
    dok: {
      naglowek: 'Jego dokumenty w telefonie',
      tresc:
        '„Moje dokumenty”: prawo jazdy, świadectwo kwalifikacji, badania, karta kierowcy - każdy z datą ważności. Gdy termin się zbliża, kierowca widzi to na ekranie „Dziś”, a Ty i dyspozytor dostajecie przypomnienie. Nowy dokument dodaje zdjęciem: AI odczyta datę ważności, a z prawa jazdy także kategorie, i wpisze je w odpowiednie pola, więc nic nie przepisuje ręcznie. Do tego dokumenty zlecenia, CMR i WZ, pod ręką w trasie.',
    },
    dokZrzut: {
      label: 'Moje dokumenty (telefon, tryb nocny)',
      note: 'Ekran „Moje dokumenty” w aplikacji BusiKM Kierowca: dokumenty kierowcy z datami ważności i oznaczeniem tych, którym kończy się termin.',
    },
  },
  en: {
    trasa: {
      naglowek: 'Trips outside an order',
      tresc:
        'Driving to the depot or over to the garage counts too. “Trip without an order”: business or private, then start the trip and finish it. For a private break, one button pauses route recording.',
    },
    trasaZrzut: {
      label: 'Trip without an order (phone, dark mode)',
      note: 'The “Trip without an order” screen: vehicle, Business or Private trip, purpose Vehicle service, starting odometer and a “Start trip” button.',
    },
    dok: {
      naglowek: 'Their documents on the phone',
      tresc:
        '“My documents”: driving licence, driver CPC, medicals and the tachograph card - each with its expiry date. When a deadline gets close, the driver sees it on the “Today” screen, and you and the dispatcher get a reminder. A new document goes in as a photo: AI reads the expiry date, and the categories from a driving licence, and fills in the right fields, so nothing is typed by hand. Plus the order documents, CMR and delivery notes, to hand on the road.',
    },
    dokZrzut: {
      label: 'My documents (phone, dark mode)',
      note: 'The “My documents” screen in the BusiKM Driver app: the driver’s documents with expiry dates, with the ones running out flagged.',
    },
  },
};

/** 07 i 08 – dwie karty obok siebie. */
export function TrasaIDokumenty() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div data-reveal-group className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <div
          data-reveal
          className="flex flex-col justify-between gap-8 rounded-panel bg-mist p-7 lg:gap-10 lg:p-14"
        >
          <div className="flex flex-col gap-4 lg:gap-5">
            <div className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption">
              07
            </div>
            <h2 className="text-h2-m font-semibold text-balance lg:text-h2">
              {t.trasa.naglowek}
            </h2>
            <p className="text-[16px] leading-relaxed text-muted lg:text-body">
              {t.trasa.tresc}
            </p>
          </div>

          <Telefon file="mockup-kierowca-trasa-bez-zlecenia-phone.png" {...t.trasaZrzut} />
        </div>

        <div
          data-reveal
          className="flex flex-col justify-between gap-8 rounded-panel bg-mist p-7 lg:gap-10 lg:p-14"
        >
          <div className="flex flex-col gap-4 lg:gap-5">
            <div className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption">
              08
            </div>
            <h2 className="text-h2-m font-semibold text-balance lg:text-h2">
              {t.dok.naglowek}
            </h2>
            <p className="text-[16px] leading-relaxed text-muted lg:text-body">
              {t.dok.tresc}
            </p>
          </div>

          <Telefon file="mockup-dokumenty-kierowca-phone.png" {...t.dokZrzut} />
        </div>
      </div>
    </Section>
  );
}

/** Zrzut telefonu w karcie – ten sam kadr i powiększenie co w sekcjach 01 i 03. */
function Telefon({ file, label, note }: { file: string; label: string; note: string }) {
  return (
    <MockupSlot
      file={file}
      label={label}
      note={note}
      ratio="9:19.5"
      box="6:7"
      imageScale={1.8}
      imageScaleTelefon={1.8}
    >
      {null}
    </MockupSlot>
  );
}
