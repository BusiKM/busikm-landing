import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { Makieta } from '@/components/ui/Makieta';
import { PulpitMockup } from '@/components/mockups/PulpitMockup';
import { appLinks } from '@/content/navigation';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  tytul1: string;
  tytul2: string;
  lead: string;
  zapis: string;
  demo: string;
  nota: string;
  label: string;
  opis: string;
  telefon: string;
  powieksz: string;
  zamknij: string;
}> = {
  pl: {
    eyebrow: 'Busy 2,5-3,5 t, transport krajowy i międzynarodowy',
    tytul1: 'Kierowca jedzie.',
    tytul2: 'Reszta dzieje się sama.',
    lead: 'Zlecenia, trasy, koszty, faktury i komplet dla księgowej - w jednym miejscu. Kierowca ma telefon w kieszeni, Ty masz robotę zrobioną.',
    zapis: 'Zapisz się na start',
    demo: 'Zobacz demo',
    nota: 'Demo działa bez konta. Konta otwieramy wkrótce, pierwsze 14 dni bez opłat.',
    label: 'Ekran właściciela (desktop 1440)',
    opis: 'Pulpit po zalogowaniu: po lewej „Do zrobienia” z tym, co czeka na Twoją decyzję, po prawej „Dziś” - kursy w trasie, załadunki, dostawy i kto jest teraz w drodze.',
    telefon: 'Aplikacja kierowcy: ekran „Dziś” z kursem Kraków → Antwerpen i przyciskami Nawiguj, Zadzwoń, Czat.',
    powieksz: 'Powiększ',
    zamknij: 'Zamknij',
  },
  en: {
    eyebrow: 'Vans 2.5-3.5 t, domestic and international transport',
    tytul1: 'The driver drives.',
    tytul2: 'Everything else just happens.',
    lead: 'Orders, routes, costs, invoices and everything your accountant needs - in one place. Your driver keeps a phone in their pocket. You get the work done.',
    zapis: 'Sign up for launch',
    demo: 'See the demo',
    nota: 'The demo needs no account. Accounts open soon, with the first 14 days free.',
    label: 'Owner’s screen (desktop 1440)',
    opis: 'Dashboard after signing in: “To do” on the left with what’s waiting for your decision, “Today” on the right - runs on the road, loadings, deliveries and who is driving right now.',
    telefon: 'Driver app: the “Today” screen with the Kraków → Antwerp run and Navigate, Call and Chat buttons.',
    powieksz: 'Enlarge',
    zamknij: 'Close',
  },
};

/**
 * 6.1 – hero. Ten sam baner co na Facebooku i YouTube: niebieskie tło,
 * biała pierwsza linia, jasnoniebieska druga. Pulpit wychodzi z banera
 * na jasną stronę.
 */
export function Hero() {
  const t = TEKSTY[biezacyJezyk()];

  const tresc = (
    <>
      <Eyebrow data-reveal className="!text-white/70">
        {t.eyebrow}
      </Eyebrow>

      <h1
        data-reveal
        className="max-w-[980px] text-display-m font-bold text-balance text-white lg:text-display"
      >
        {t.tytul1}{' '}
        {/* Druga linia zawsze od nowego wiersza, także na telefonie: dwa kolory
            czyta się jak dwa zdania. */}
        <span className="block text-blue-mist">{t.tytul2}</span>
      </h1>

      <p
        data-reveal
        className="max-w-[700px] text-lead-m text-pretty text-white/85 lg:text-lead"
      >
        {t.lead}
      </p>

      <div data-reveal className="flex flex-col gap-2.5 lg:mt-2 lg:items-center lg:gap-4">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:gap-3">
          {/* Dopóki rejestracja jest zamknięta, głównym wejściem jest demo.
              Drugi przycisk zapisuje na listę otwarcia kont. */}
          <Button
            href={appLinks.demo}
            fullWidth
            className="!bg-white !text-blue hover:!bg-blue-soft lg:w-auto"
          >
            {t.demo}
          </Button>
          <Button
            href={appLinks.zapis}
            variant="secondaryDark"
            fullWidth
            className="!border-white/45 hover:!border-white lg:w-auto"
          >
            {t.zapis}
          </Button>
        </div>
        <p className="text-center text-[13px] text-white/70 lg:text-caption">{t.nota}</p>
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
              na jednym obrazku, zanim czytelnik przewinie dalej. Pozycja liczona
              od pudła 16:10 – ekran laptopa kończy się na 88% szerokości
              i 80% wysokości, więc telefon zachodzi na róg ekranu, nie zasłania
              listy „Do zrobienia”.
            */}
            <div
              className="absolute right-[-2%] bottom-[-2%] w-[30%] max-w-[320px] drop-shadow-[0_24px_40px_rgba(10,10,11,0.35)] lg:right-[-1%] lg:bottom-[0%] lg:w-[26%]"
              style={{ aspectRatio: '1226 / 2064' }}
            >
              <Makieta
                src="/mockups/mockup-hero-telefon-phone.png"
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
