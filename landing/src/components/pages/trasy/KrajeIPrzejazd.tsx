import { Section } from "@/components/ui/Section";
import { KartaBloku } from "@/components/ui/KartaBloku";
import { MockupSlot } from "@/components/ui/MockupSlot";
import { Makieta } from "@/components/ui/Makieta";

import type { Tlumaczenia } from "@/i18n/jezyki";
import { biezacyJezyk } from "@/i18n/serwer";

type Zrzut = { label: string; note: string };

const DEV = process.env.NODE_ENV === "development";

const TEKSTY: Tlumaczenia<{
  kraje: { tytul: string; tresc: string };
  krajeZrzut: Zrzut;
  przejazd: { tytul: string; tresc: string };
  przejazdZrzut: Zrzut;
  powieksz: string;
  zamknij: string;
}> = {
  pl: {
    powieksz: "Powiększ",
    zamknij: "Zamknij",
    kraje: {
      tytul: "Kraje na trasie",
      tresc:
        "System sam liczy dni w każdym kraju z GPS i przekroczeń granicy, a z nich diety kierowcy. Nikt tego nie zgłasza ręcznie.",
    },
    krajeZrzut: {
      label: "Za granicą i diety (desktop)",
      note: "Karta kierowcy, zakładka „Za granicą i diety” za październik: doby w Niemczech, Holandii i Polsce, dieta po kursie NBP i lista wyjazdów z datami.",
    },
    przejazd: {
      tytul: "Przejazd bez zlecenia też się liczy",
      tresc:
        "Dojazd do bazy, wyjazd do serwisu, przeprowadzka pojazdu. Kierowca wybiera „Trasa bez zlecenia”, służbową albo prywatną, i kilometry nie giną.",
    },
    przejazdZrzut: {
      label: "Trasa bez zlecenia (telefon, tryb nocny)",
      note: "Ekran „Trasa bez zlecenia” w aplikacji BusiKM Kierowca: pojazd, typ trasy Służbowa albo Prywatna, cel Serwis pojazdu i przycisk „Rozpocznij trasę”.",
    },
  },
  en: {
    powieksz: "Enlarge",
    zamknij: "Close",
    kraje: {
      tytul: "Countries on the route",
      tresc:
        "The system counts the days in each country from GPS and border crossings, and works out the driver’s allowances from them. Nobody reports it by hand.",
    },
    krajeZrzut: {
      label: "Abroad and allowances (desktop)",
      note: "The driver card, “Abroad and allowances” tab for October: days in Germany, the Netherlands and Poland, the allowance at the NBP rate and the list of trips abroad with dates.",
    },
    przejazd: {
      tytul: "Trips without an order count too",
      tresc:
        "Driving to the depot, over to the garage, moving a vehicle. The driver picks “Trip without an order”, business or private, and no kilometre goes missing.",
    },
    przejazdZrzut: {
      label: "Trip without an order (phone, dark mode)",
      note: "The “Trip without an order” screen in the BusiKM Driver app: vehicle, Business or Private trip, purpose Vehicle service and a “Start trip” button.",
    },
  },
};

/** 05 + 06 – dwa punkty w dwóch kartach obok siebie, każdy ze zrzutem. */
export function KrajeIPrzejazd() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="grid gap-2.5 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto_1fr] lg:gap-x-6">
        <KartaBloku
          numer="05"
          tytul={t.kraje.tytul}
          tresc={t.kraje.tresc}
          rowno
        >
          {/* Lewa połowa laptopa w pudle 6:7, jak telefon w karcie obok.
              Prawa połowa chowa się za krawędzią karty, więc dni w krajach są
              duże i czytelne bez powiększania. */}
          {/* Liczby z kadru: telefon w pudle 6:7 (powiększenie 1,8) zajmuje od
              3% do 97% wysokości, a laptop w pliku 2016x1270 kończy się podstawą
              na 1159 px. Stąd góra 3% i wysokość 102,9% – laptop od ramki do
              podstawy równa się telefonowi, cień pod spodem przycina pudło. */}
          <div className="-mr-7 overflow-hidden lg:-mr-14">
            {/* Pudło tej samej szerokości co telefon obok, laptop wystaje z niego
                w prawo aż do krawędzi karty, którą przycina opakowanie wyżej. */}
            <div className="relative mr-7 aspect-[6/7] lg:mr-14">
              <div className="absolute top-[3.03%] left-0 aspect-[2016/1270] h-[102.9%]">
                <Makieta
                  src="/mockups/mockup-trasy-za-granica-desktop.png"
                  alt={t.krajeZrzut.note}
                  sizes="(max-width: 1024px) 200vw, 1100px"
                  imgClassName="object-contain"
                  etykietaPowieksz={t.powieksz}
                  etykietaZamknij={t.zamknij}
                  unoptimized={DEV}
                />
              </div>
            </div>
          </div>
        </KartaBloku>

        <KartaBloku
          numer="06"
          tytul={t.przejazd.tytul}
          tresc={t.przejazd.tresc}
          rowno
        >
          <MockupSlot
            file="mockup-kierowca-trasa-bez-zlecenia-phone.png"
            label={t.przejazdZrzut.label}
            note={t.przejazdZrzut.note}
            ratio="9:19.5"
            box="6:7"
            imageScale={1.8}
            imageScaleTelefon={1.8}
          >
            {null}
          </MockupSlot>
        </KartaBloku>
      </div>
    </Section>
  );
}
