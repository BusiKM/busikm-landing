import { Section, Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { TelefonyKierowcy } from '@/components/mockups/TelefonyKierowcy';
import { StoreBadges } from '@/components/ui/StoreBadges';
import { iosWSklepie } from '@/content/sklepy';
import { Dolaczone, type OdnosnikWiecej, type PunktDolaczony } from '@/components/sections/Dolaczone';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Punkt = readonly [string, string];

const PUNKTY: Tlumaczenia<readonly Punkt[]> = {
  pl: [
    ['Nawigacja jednym dotknięciem', 'Trasa ze zlecenia otwiera się w nawigacji, której kierowca używa na co dzień. Nic nie przepisuje'],
    ['Paragon jednym przyciskiem', 'Zatankował, pstryknął, jedzie dalej. Kwotę BusiKM odczyta sam'],
    ['Działa bez zasięgu', 'Tunel, góry, terminal promowy. Wszystko dośle, gdy złapie sygnał'],
    ['Widzi, co czeka na wysłanie', 'Żadnego zgadywania, czy dane doszły'],
    ['Trasa na ekranie w kabinie', 'Nawigacja pokazuje ją na ekranie auta, BusiKM zapisuje przejazd w tle'],
    ['Tryb nocny', 'O trzeciej nad ranem ekran nie razi w oczy'],
  ],
  en: [
    ['Navigation in one tap', 'The route from the order opens in the navigation app the driver already uses. Nothing to retype'],
    ['A receipt in one tap', 'Filled up, snapped the receipt, back on the road. BusiKM reads the amount itself'],
    ['Works without signal', 'Tunnel, mountains, ferry terminal. It all goes through once there’s signal again'],
    ['Sees what’s waiting to send', 'No guessing whether the data got through'],
    ['The route on the in-cab screen', 'The navigation app shows it on the dashboard screen, while BusiKM logs the trip in the background'],
    ['Night mode', 'At three in the morning the screen doesn’t dazzle'],
  ],
};

/** Z dawnej sekcji „Czas pracy” – najmocniejsze trzy zdania i odnośnik. */
const CZAS_PRACY: Tlumaczenia<{ punkty: readonly PunktDolaczony[]; wiecej: readonly OdnosnikWiecej[] }> = {
  pl: {
    punkty: [
      ['Wiesz, kiedy kierowca musi stanąć', 'Kierowca dostaje przypomnienie 15 minut przed przerwą, nie po fakcie. Ty widzisz to samo ze swojego biura.'],
      ['Przerwa jednym przyciskiem', 'Jazda i praca liczą się same. Przerwę zapisze bez zasięgu, dojdzie, gdy wróci sygnał.'],
      ['Tachograf zapisuje. BusiKM pokazuje.', 'BusiKM nie zastępuje tachografu. Pokazuje na ekranie, ile jeszcze można jechać i kiedy trzeba stanąć.'],
    ],
    // Najpierw cała aplikacja – sekcja jest o niej, czas pracy to jej część.
    wiecej: [
      { href: '/co-robi/aplikacja-kierowcy', label: 'Więcej: aplikacja kierowcy' },
      { href: '/co-robi/czas-pracy', label: 'Czas pracy i przerwy' },
    ],
  },
  en: {
    punkty: [
      ['You know when the driver has to stop', 'The driver gets a reminder 15 minutes before a break is due, not after the fact. You see the same from your office.'],
      ['A break in one tap', 'Driving and work time count themselves. Breaks are logged with no signal and go through once it’s back.'],
      ['The tachograph records. BusiKM shows.', 'BusiKM doesn’t replace the tachograph. It shows on screen how much longer the driver can drive and when they have to stop.'],
    ],
    wiecej: [
      { href: '/co-robi/aplikacja-kierowcy', label: 'More: the driver app' },
      { href: '/co-robi/czas-pracy', label: 'Working time and breaks' },
    ],
  },
};

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  naglowek: string;
  lead: string;
  label: string;
  opis: string;
}> = {
  pl: {
    eyebrow: iosWSklepie
      ? 'BusiKM Kierowca na iPhone i system Android'
      : 'BusiKM Kierowca na system Android, wkrótce na iPhone',
    naglowek: 'Cały dzień pracy w jednej aplikacji.',
    lead: 'Kierowca dostaje kod mailem, wpisuje go w aplikacji, ustawia hasło i jest w środku. Nie dzwoni do Ciebie z pytaniem, jak się zalogować.',
    label: 'Aplikacja kierowcy (telefon, tryb nocny)',
    opis: 'Lewy: ekran „Dziś” z kursem Kraków → Antwerpen i wyborem „Czym nawigujesz?” z listą aplikacji nawigacyjnych. Prawy: ekran „Czas pracy” przy przewozie międzynarodowym z bieżącym stanem, przypomnieniem o przerwie, pasem dnia i przyciskami „Przerwa” i „Odpoczynek”.',
  },
  en: {
    eyebrow: iosWSklepie
      ? 'BusiKM Kierowca for iPhone and Android'
      : 'BusiKM Kierowca for Android, iPhone coming soon',
    naglowek: 'The whole working day in one app.',
    lead: 'The driver gets a code by email, types it into the app, sets a password and they’re in. No calling you to ask how to log in.',
    label: 'Driver app (phone, night mode)',
    opis: 'Left: the “Today” screen with the Kraków → Antwerp job and the “What do you navigate with?” picker listing navigation apps. Right: the “Working time” screen for international transport with the current state, a break reminder, the day bar and the “Break” and “Rest” buttons.',
  },
};

/** 6.6 – aplikacja kierowcy. Sekcja, która zdejmuje obiekcję „on tego nie ruszy". */
export function AplikacjaKierowcy() {
  const jezyk = biezacyJezyk();
  const t = TEKSTY[jezyk];
  return (
    <Section tone="ink">
      <svg
        viewBox="0 0 1440 1400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden
      >
        <path
          d="M 1500 300 C 1200 500, 1000 900, 700 1000 S 200 1100, -100 1300"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="40"
          opacity=".04"
        />
        <path
          d="M 1500 300 C 1200 500, 1000 900, 700 1000 S 200 1100, -100 1300"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="2"
          opacity=".14"
        />
      </svg>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="flex flex-col gap-5 lg:gap-6">
            <Eyebrow dark>{t.eyebrow}</Eyebrow>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.naglowek}
            </h2>
            <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
              {t.lead}
            </p>
          </div>

          <div data-reveal-group className="grid gap-5 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-7">
            {PUNKTY[jezyk].map(([title, body]) => (
              <div key={title} data-reveal className="flex gap-3.5">
                <span
                  aria-hidden
                  className="hidden size-7 flex-none items-center justify-center rounded-lg border border-line-dark-2 lg:flex"
                >
                  <span className="size-2 rounded-full bg-blue" />
                </span>
                <div>
                  <div className="text-[16px] font-semibold lg:text-body">{title}</div>
                  <div className="mt-1 text-[14px] leading-relaxed text-ink-muted lg:text-[15px]">
                    {body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Na stronie głównej odznaki stoją już w hero, a Apple dopuszcza
              jedną odznakę App Store na układ. Tu kafel z odnośnikami. */}
          <StoreBadges miejsce="sekcja-kierowcy" bezOdznak />
        </div>

        {/*
          Odstęp u góry tylko na telefonie i wynika wprost z powiększenia.
          Skala działa w obie strony, więc zrzut wychodzi ponad swoje pudło
          o (368 − 245) / 2 ≈ 61 px i wchodził w odznaki sklepów. `mt-16`
          oddaje mu dokładnie te 64 px.

          Na desktopie makieta stoi w osobnej kolumnie i nie ma czego
          podchodzić, więc odstęp znika.
        */}
        <div data-reveal className="mt-16 lg:mt-0">
          <MockupSlot
            file="mockup-kierowca-telefony-phone.png"
            label={t.label}
            note={t.opis}
            ratio="4:3"
            // Dwa telefony zajmują 67% szerokości kadru – reszta to pusty
            // margines pliku. Powiększenie mieści się w kolumnie właśnie
            // dlatego, że widoczna treść jest węższa od pudła.
            imageScale={1.55}
            // Na telefonie 1,5 zamiast 1,55: przy 327 px pudła treść urasta
            // wtedy do 327 px, czyli dokładnie na szerokość ekranu bez marginesu
            // ujemnego. Wyliczone z udziału treści w kadrze, nie dobrane.
            imageScaleTelefon={1.5}
            dark
          >
            <TelefonyKierowcy />
          </MockupSlot>
        </div>
      </div>

      <div className="relative mt-16 lg:mt-24">
        <Dolaczone dark punkty={CZAS_PRACY[jezyk].punkty} wiecej={CZAS_PRACY[jezyk].wiecej} />
      </div>
    </Section>
  );
}
