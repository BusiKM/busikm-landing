"use client";

import { useState } from "react";
import Link from "@/i18n/Link";
import { Section, Eyebrow } from "@/components/ui/Section";
import { linkProbny } from "@/content/zainteresowanie";
import { Licznik } from "@/components/motion/Licznik";
import { plans } from "@/content/cennik";
import type { Tlumaczenia } from "@/i18n/jezyki";
import { useJezyk } from "@/i18n/klient";

const TEKSTY: Tlumaczenia<{
  naglowek: [string, string];
  lead: string;
  miesiecznie: string;
  rocznie: string;
  gratis: string;
  okres: { rok: string; miesiac: string };
  /** Dopisek przy kwocie, przed okresem. Ceny są końcowe – nie ma „netto”. */
  waluta: string;
  wyroznienie: string;
  wezwanie: string;
  /** Notka pod przyciskiem planu – dopóki konta są zamknięte. */
  notaWezwania: string;
  /** Jedno zdanie z dawnej sekcji „Pierwszy dzień". */
  start: readonly [string, string];
  /** Jedno zdanie z dawnej sekcji „Jedna faktura zamiast czterech". */
  zastepuje: readonly [string, string];
  stopka: string;
  /** Odsyłacz pod kartami na stronie głównej. */
  porownaj: string;
}> = {
  pl: {
    naglowek: ["Płacisz za pojazdy.", "Nie za ludzi."],
    lead: "Kierowcy i pracownicy biura bez limitu. Przyczepy i naczepy nie liczą się do abonamentu.",
    miesiecznie: "Miesięcznie",
    rocznie: "Rocznie",
    gratis: "2 miesiące gratis",
    okres: { rok: "rok", miesiac: "mies." },
    waluta: "zł",
    wyroznienie: "Polecany od 4 busów",
    wezwanie: "Zapisz się przed startem",
    notaWezwania: "14 dni bez opłat od otwarcia kont",
    start: [
      "Pierwsza trasa pierwszego dnia.",
      "Dodajesz pojazd ze zdjęcia dowodu rejestracyjnego, zapraszasz kierowcę i kierowca rusza. Bez wdrożenia, szkolenia i spotkania z handlowcem.",
    ],
    zastepuje: [
      "Jedna faktura zamiast czterech.",
      "Lokalizator, program do czasu pracy, system do zleceń i faktur i arkusz prowadzony samemu. Z BusiKM jedno konto i jeden rachunek.",
    ],
    porownaj: "Porównaj plany",
    stopka:
      "Ceny końcowe, bez VAT - MOVGRANTO jest zwolniona z VAT, na fakturze stawka „zw.”. Więcej niż 50 pojazdów - napisz. Bez umowy na czas określony. Po rezygnacji konto zostaje do odczytu: pobierzesz faktury, ewidencje i eksporty.",
  },
  en: {
    naglowek: ["You pay for vehicles.", "Not for people."],
    lead: "Unlimited drivers and office staff. Trailers and semi-trailers don’t count towards your plan.",
    miesiecznie: "Monthly",
    rocznie: "Yearly",
    gratis: "2 months free",
    okres: { rok: "year", miesiac: "month" },
    waluta: "",
    wyroznienie: "Recommended from 4 vans",
    wezwanie: "Sign up before launch",
    notaWezwania: "14 days free once accounts open",
    start: [
      "Your first route on day one.",
      "Add a van from a photo of its registration certificate, invite a driver and the driver sets off. No setup project, no training, no meeting with a salesperson.",
    ],
    zastepuje: [
      "One invoice instead of four.",
      "A tracker, working-time software, a system for orders and invoices and a spreadsheet you keep yourself. With BusiKM, one account and one bill.",
    ],
    porownaj: "Compare plans",
    stopka:
      "Final prices, no VAT on top - MOVGRANTO is VAT-exempt, so the invoice shows the “zw.” (exempt) rate. More than 50 vehicles - get in touch. No fixed-term contract. After you cancel, your account stays read-only: you can still download invoices, mileage logs and exports.",
  },
};

/** Ptaszek w Start, plus w Firmie. */
function Ikona({ plus }: { plus: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="mt-[0.3em] size-3.5 shrink-0 text-blue lg:size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {plus ? <path d="M8 3v10M3 8h10" /> : <path d="M3 8.5l3.2 3.2L13 4.8" />}
    </svg>
  );
}

/**
 * 6.18 – cennik. Przełącznik miesięcznie / rocznie, jak w projekcie.
 *
 * Ta sama sekcja otwiera stronę `/cennik` – tam dostaje nadtytuł i nagłówek
 * pierwszego stopnia, bo jest nagłówkiem strony, a nie jedną z sekcji.
 */
export function Cennik({
  nadtytul,
  jakoH1 = false,
}: {
  nadtytul?: string;
  jakoH1?: boolean;
} = {}) {
  const jezyk = useJezyk();
  const t = TEKSTY[jezyk];
  const [yearly, setYearly] = useState(false);
  const period = yearly ? t.okres.rok : t.okres.miesiac;

  const tab = (active: boolean) =>
    `cursor-pointer rounded-[9px] px-4 py-2.5 text-[14px] font-semibold transition-colors lg:px-5 lg:text-[15px] ${
      active ? "bg-white text-ink shadow-tab" : "text-muted"
    }`;

  return (
    <Section id="cennik">
      <div className="flex flex-col gap-8 lg:items-center lg:gap-14">
        <div className="flex flex-col gap-5 lg:items-center lg:gap-6 lg:text-center">
          {nadtytul && <Eyebrow>{nadtytul}</Eyebrow>}
          {jakoH1 ? (
            <h1
              data-reveal
              className="text-display-m font-bold text-balance lg:text-display"
            >
              {t.naglowek[0]} <br className="hidden lg:inline" />
              {t.naglowek[1]}
            </h1>
          ) : (
            <h2
              data-reveal
              className="text-h2-m font-bold text-balance lg:text-h1"
            >
              {t.naglowek.join(" ")}
            </h2>
          )}
          <p
            data-reveal
            className="max-w-[640px] text-lead-m text-pretty text-muted lg:text-lead"
          >
            {t.lead}
          </p>
        </div>

        <div
          data-reveal
          className="flex flex-col items-start gap-2.5 lg:flex-row lg:items-center lg:gap-4"
        >
          <div className="inline-flex rounded-btn border border-line bg-mist p-1">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={tab(!yearly)}
            >
              {t.miesiecznie}
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={tab(yearly)}
            >
              {t.rocznie}
            </button>
          </div>
          <span className="rounded-full bg-blue-soft px-2.5 py-[5px] text-[13px] font-semibold text-blue-dark lg:px-3 lg:py-1.5 lg:text-caption">
            {t.gratis}
          </span>
        </div>

        <div
          data-reveal-group
          className="grid w-full gap-2.5 lg:max-w-[880px] lg:grid-cols-2 lg:grid-rows-[auto_auto_auto_1fr] lg:gap-x-6"
        >
          {plans[jezyk].map((plan) => (
            <div
              key={plan.name}
              data-reveal
              // Wspólne wiersze obu kart (subgrid): nagłówek, parametry, przycisk.
              // Parametry łamią się w kartach na różną liczbę linii, a mimo to
              // przyciski stoją na tej samej wysokości.
              className={`relative flex flex-col gap-5 rounded-card bg-white p-7 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-8 lg:rounded-panel lg:p-10 ${
                plan.highlighted ? "border-2 border-blue" : "border border-line"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-7 rounded-full bg-blue px-2.5 py-1 text-[12px] font-semibold text-white lg:left-10 lg:px-3 lg:text-[13px]">
                  {t.wyroznienie}
                </span>
              )}

              <div className="flex flex-col gap-3">
                <div className="text-[19px] font-semibold lg:text-[22px]">
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1.5 lg:gap-2">
                  {/* Po angielsku waluta stoi przed kwotą: „PLN 149". */}
                  {jezyk === "en" && (
                    <span className="text-[15px] text-muted lg:text-body">
                      PLN
                    </span>
                  )}
                  {/* Kwota dolicza się od poprzedniej – patrz `Licznik`.
                      Liczby w `content/cennik.ts` są tekstem ze spacją
                      rozdzielającą tysiące, więc tutaj wracają na liczbę,
                      a separator dokłada z powrotem licznik. */}
                  <Licznik
                    wartosc={Number(
                      (yearly ? plan.yearly : plan.monthly).replace(/\s/g, ""),
                    )}
                    className="text-[40px] font-bold tracking-[-0.03em] lg:text-5xl"
                  />
                  <span className="text-[15px] text-muted lg:text-body">
                    {t.waluta ? `${t.waluta} / ${period}` : `/ ${period}`}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <ul className="flex flex-col items-start gap-1.5 lg:gap-2">
                  {plan.specs.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-full border border-line bg-mist px-2.5 py-1 text-[13px] font-medium text-ink lg:px-3"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Przycisk niesie to, co człowiek ma przed oczami: który plan
                  i który okres rozliczenia. Strona zapisu odczyta to z adresu,
                  a informacja dojedzie aż do powiadomienia na skrzynkę. */}
              <div className="flex flex-col gap-2">
                <Link
                  href={linkProbny({
                    plan: plan.id,
                    okres: yearly ? "rocznie" : "miesiecznie",
                  })}
                  className={`flex h-12 items-center justify-center rounded-btn text-[16px] font-semibold lg:h-13 lg:text-body ${
                    plan.highlighted
                      ? "bg-blue text-white hover:bg-blue-dark hover:text-white"
                      : "border border-line text-ink hover:border-muted hover:text-ink"
                  }`}
                >
                  {t.wezwanie}
                </Link>
                <p className="text-center text-[13px] text-muted">
                  {t.notaWezwania}
                </p>
              </div>

              {/* Lista w ostatnim wierszu siatki: wolne miejsce zostaje
                  pod nią, na dole krótszej karty. */}
              <div className="flex flex-col gap-5 lg:gap-8">
                {/* Start ma ptaszek, Firma plus – plus czyta się jako „dokłada
                  do Start”, nie jako osobna lista. */}
                <div className="flex flex-col gap-5 border-t border-line pt-5 lg:gap-6 lg:pt-7">
                  <p className="text-[15px] font-semibold lg:text-body">
                    {plan.naglowekListy}
                  </p>

                  {plan.grupy.map((grupa) => (
                    <div
                      key={grupa.tytul}
                      className="flex flex-col gap-2 lg:gap-2.5"
                    >
                      <div className="text-[12px] font-semibold tracking-[0.08em] text-muted uppercase">
                        {grupa.tytul}
                      </div>
                      <ul className="flex flex-col gap-2 text-caption leading-relaxed lg:gap-2.5 lg:text-[15px]">
                        {grupa.pozycje.map((pozycja) => (
                          <li key={pozycja} className="flex gap-2.5 lg:gap-3">
                            <Ikona plus={plan.highlighted} />
                            <span>{pozycja}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Na stronie głównej odsyłacz do pełnego porównania; na /cennik
            tabela stoi zaraz pod spodem. */}
        {!jakoH1 && (
          <Link
            data-reveal
            href="/cennik"
            className="text-[15px] font-semibold lg:text-body"
          >
            {t.porownaj}
          </Link>
        )}

        {/* Dwa zdania z dawnych sekcji „Pierwszy dzień" i „Jedna faktura" –
            odpowiadają na pytania, które padają przy cenie. */}
        <div
          data-reveal
          className="grid w-full gap-2.5 text-[15px] leading-relaxed text-muted lg:max-w-[880px] lg:grid-cols-2 lg:gap-6 lg:text-[16px]"
        >
          {[t.start, t.zastepuje].map(([tytul, tresc]) => (
            <p key={tytul} className="border-t border-line pt-4">
              <b className="font-semibold text-ink">{tytul}</b> {tresc}
            </p>
          ))}
        </div>

        <p
          data-reveal
          className="max-w-[560px] text-[13px] leading-relaxed text-muted lg:text-center lg:text-caption"
        >
          {t.stopka}
        </p>
      </div>
    </Section>
  );
}
