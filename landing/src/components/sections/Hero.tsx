import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { Makieta } from '@/components/ui/Makieta';
import { PulpitMockup } from '@/components/mockups/PulpitMockup';
import { appLinks } from '@/content/navigation';
import { linkGooglePlay } from '@/content/sklepy';
import { IkonyStartu } from '@/components/sections/IkonyStartu';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  androidOpis: string;
  demo: string;
  nota: string;
  label: string;
  opis: string;
  telefon: string;
  powieksz: string;
  zamknij: string;
  nowosc: string;
  dlaKogo: string;
  start1: string;
  start2: string;
  startLead: string;
  iphone: string;
}> = {
  pl: {
    androidOpis: 'BusiKM Kierowca w Google Play, aplikacja dla kierowców',
    demo: 'Zobacz demo',
    nota: 'Demo działa bez konta. Konta otwieramy wkrótce, pierwsze 14 dni bez opłat.',
    label: 'Ekran właściciela (desktop 1440)',
    opis: 'Pulpit po zalogowaniu: po lewej „Do zrobienia” z tym, co czeka na Twoją decyzję, po prawej „Dziś” - kursy w trasie, załadunki, dostawy i kto jest teraz w drodze.',
    telefon: 'BusiKM Kierowca na Androidzie: ekran „Dziś” z kursem Milano → Kalisz w trasie i przyciskami Nawiguj, Zadzwoń, Czat.',
    powieksz: 'Powiększ',
    zamknij: 'Zamknij',
    nowosc: 'Nowość',
    dlaKogo: 'Dla kierowców Twojej firmy',
    start1: 'BusiKM Kierowca',
    start2: 'już na Androida',
    startLead: 'Zlecenie, trasa, paragon i przerwa w jednym telefonie. Kierowca pobiera aplikację z Google Play i loguje się kodem zaproszenia od Ciebie, a Ty masz wszystko w panelu firmy.',
    iphone: 'Wersja na iPhone wkrótce.',
  },
  en: {
    androidOpis: 'BusiKM Kierowca on Google Play, the app for drivers',
    demo: 'See the demo',
    nota: 'The demo needs no account. Accounts open soon, with the first 14 days free.',
    label: 'Owner’s screen (desktop 1440)',
    opis: 'Dashboard after signing in: “To do” on the left with what’s waiting for your decision, “Today” on the right - runs on the road, loadings, deliveries and who is driving right now.',
    telefon: 'BusiKM Kierowca on Android: the “Today” screen with the Milano → Kalisz run on the road and Navigate, Call and Chat buttons.',
    powieksz: 'Enlarge',
    zamknij: 'Close',
    nowosc: 'New',
    dlaKogo: 'For your company’s drivers',
    start1: 'BusiKM Kierowca',
    start2: 'is now on Android',
    startLead: 'Orders, route, receipts and breaks on one phone. Your driver gets the app from Google Play and signs in with the invitation code you send, and you see it all in your company panel.',
    iphone: 'iPhone version coming soon.',
  },
};

/**
 * 6.1 – hero. Na czas startu BusiKM Kierowca w Google Play to hero
 * premiery: ikona aplikacji pod światłem, rozsypane ikony 3D w trzech
 * planach (`IkonyStartu`) i oficjalna odznaka jako główny przycisk.
 * Kolory jak na banerze z Facebooka i YouTube: niebieskie tło, biała
 * pierwsza linia, jasnoniebieska druga. Pulpit wychodzi z banera na
 * jasną stronę. Opis i powrót do hero marki: docs/landing/04-homepage.md.
 */
export function Hero() {
  const t = TEKSTY[biezacyJezyk()];

  const tresc = (
    <>
      <div data-reveal className="flex flex-col gap-5 lg:items-center">
        <Image
          src="/aplikacja/busikm-kierowca-512.png"
          alt=""
          width={512}
          height={512}
          priority
          className="size-16 rounded-[23%] shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_20px_40px_rgba(4,22,90,0.5),0_0_80px_rgba(185,206,255,0.55)] lg:size-22"
        />
        <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/25 bg-white/12 py-1 pr-4 pl-1 text-[14px] font-medium text-white backdrop-blur-sm lg:self-center lg:text-[15px]">
          <span className="rounded-full bg-white px-2.5 py-0.5 text-[12px] font-semibold text-blue lg:text-[13px]">
            {t.nowosc}
          </span>
          {t.dlaKogo}
        </span>
      </div>

      <h1
        data-reveal
        className="max-w-[980px] text-display-m font-bold text-balance text-white lg:text-display"
      >
        {t.start1}{' '}
        <span className="block text-blue-mist">
          {t.start2}
          {/* Pierwsze „Android” w materiale dostaje ™ (wytyczne marki Android). */}
          <span className="align-[0.9em] text-[0.32em] font-semibold">™</span>.
        </span>
      </h1>

      <p
        data-reveal
        className="max-w-[700px] text-lead-m text-pretty text-white/85 lg:text-lead"
      >
        {t.startLead}
      </p>

      <div data-reveal className="flex flex-col gap-3 lg:mt-2 lg:items-center lg:gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Oficjalna odznaka. Plik ma przezroczysty margines (192 z 250 px),
              więc 73 px pliku daje 56 px odznaki, równo z przyciskiem. */}
          <a
            href={linkGooglePlay('hero')}
            target="_blank"
            rel="noopener"
            aria-label={t.androidOpis}
            className="-my-[8.5px] block w-fit transition-transform hover:scale-[1.03]"
          >
            <Image
              src="/sklepy/google-play-pl.png"
              alt=""
              width={646}
              height={250}
              priority
              className="h-[73px] w-auto"
            />
          </a>
          <Button
            href={appLinks.demo}
            className="!bg-white !text-blue hover:!bg-blue-soft lg:w-auto"
          >
            {t.demo}
          </Button>
        </div>
        <p className="text-[13px] text-white/70 lg:text-center lg:text-caption">
          {t.iphone} {t.nota}
        </p>
      </div>
    </>
  );

  // Przyciemnione boki jak na banerze. Tylko w poziomie, żeby tło banera
  // i pasmo za laptopem łączyły się bez szwu.
  const winieta =
    'bg-[linear-gradient(90deg,rgba(4,22,90,.38),transparent_28%,transparent_72%,rgba(4,22,90,.38))]';

  return (
    <section id="hero" className="relative overflow-hidden bg-paper">
      <div className="relative bg-blue px-6 pt-24 lg:px-12 lg:pt-40">
        <div aria-hidden className={`absolute inset-0 ${winieta}`} />
        {/* Światło zza ikony aplikacji: jaśniejszy środek u góry, jak scena
            pod reflektorem. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_45%_60%_at_50%_18%,rgba(185,206,255,0.35),transparent_70%)]"
        />
        <IkonyStartu />
        <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
          {tresc}
        </Container>
        <div className="h-16 lg:h-24" />
      </div>

      {/* Niebieski schodzi za górną połowę laptopa: wysokość to połowa
          pudła bez dolnego odstępu (pb-24, na desktopie pb-40). */}
      <div className="relative px-6 lg:px-12">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[calc((100%-6rem)/2)] bg-blue lg:h-[calc((100%-10rem)/2)]"
        >
          <div className={`absolute inset-0 ${winieta}`} />
        </div>
        <Container className="relative pb-24 lg:pb-40">
          <div
            aria-hidden
            className="absolute right-[10%] bottom-35 left-[10%] h-30 rounded-[50%] bg-blue opacity-30 blur-[70px] lg:bottom-50 lg:h-50 lg:opacity-28 lg:blur-[120px]"
          />
          <div data-reveal className="relative">
            <MockupSlot
              file="mockup-hero-pulpit-desktop.png"
              label={t.label}
              note={t.opis}
              ratio="16:10"
              noteClassName="mx-auto max-w-[600px]"
            >
              <PulpitMockup />
            </MockupSlot>
            {/*
              Telefon kierowcy oparty o prawy dolny róg laptopa: biuro i kierowca
              na jednym obrazku, zanim czytelnik przewinie dalej. Od startu
              w Google Play to prawdziwy zrzut z Androida (emulator, konto demo
              ze stagingu, tryb nocny) w ogólnej ramce telefonu bez znaków
              producenta. Pozycja liczona
              od pudła 16:10 – ekran laptopa kończy się na 88% szerokości
              i 80% wysokości, więc telefon zachodzi na róg ekranu, nie zasłania
              listy „Do zrobienia”.
            */}
            <div
              className="absolute right-[-2%] bottom-[-2%] w-[30%] max-w-[320px] drop-shadow-[0_24px_40px_rgba(10,10,11,0.35)] lg:right-[-1%] lg:bottom-[0%] lg:w-[26%]"
              style={{ aspectRatio: '1226 / 2064' }}
            >
              <Makieta
                src="/mockups/mockup-hero-telefon-android-phone.png"
                alt={t.telefon}
                sizes="(max-width: 1024px) 30vw, 320px"
                unoptimized={false}
                imgClassName="object-contain"
                etykietaPowieksz={t.powieksz}
                etykietaZamknij={t.zamknij}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
