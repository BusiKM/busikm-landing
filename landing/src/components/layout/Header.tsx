'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Monitor, User } from 'lucide-react';
import Link from '@/i18n/Link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/layout/Logo';
import { IkonaMenu } from '@/components/layout/IkonaMenu';
import { PasekAppStore } from '@/components/layout/PasekAppStore';
import { PrzelacznikJezyka } from '@/components/layout/PrzelacznikJezyka';
import { appLinks, nawigacja, type NavEntry } from '@/content/navigation';
import { pasekAppStore } from '@/content/sklepy';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';
import { rozpoznaj } from '@/i18n/trasy';

/**
 * Pasek nawigacji – wg artboardu „BusiKM Nawigacja" (pięć stanów).
 *
 * 72 px na desktopie, 64 px na telefonie. Tło białe z rozmyciem; po przewinięciu
 * 24 px dochodzi cień. Przy otwartym menu pasek staje się kryjący, aktywna
 * pozycja robi się niebieska, a strona pod spodem dostaje przyciemnienie.
 */

/** Do tej wysokości pasek jest zawsze widoczny – jesteśmy jeszcze przy górze. */
const PRZY_GORZE = 80;
/**
 * Mniejsze ruchy ignorujemy.
 *
 * Bez tego progu pasek reagowałby na każde drgnięcie kółka i przy zwykłym
 * czytaniu chowałby się i wracał kilka razy na sekundę. Osiem pikseli to
 * mniej niż jeden „klik" kółka i mniej niż przypadkowy ruch kciuka.
 */
const PROG_KIERUNKU = 8;

/** Czas rozsuwania i zwijania panelu menu, ten sam co w `.menu-panel` w CSS. */
const CZAS_PANELU = 420;

/**
 * Ile kursor musi postać na dziale, zanim menu się otworzy. Mniej niż
 * mrugnięcie, ale przelot nad paskiem w drodze do strony już go nie otwiera.
 */
const ZWLOKA_MENU = 120;

const TEKSTY: Tlumaczenia<{
  domu: string;
  glowna: string;
  zaloguj: string;
  demo: string;
  zamknij: string;
  menu: string;
  wroc: string;
}> = {
  pl: {
    domu: 'BusiKM - strona główna',
    glowna: 'Główna',
    zaloguj: 'Zaloguj się',
    demo: 'Zobacz demo',
    zamknij: 'Zamknij menu',
    menu: 'Menu',
    wroc: 'Wróć do menu',
  },
  en: {
    domu: 'BusiKM - home',
    glowna: 'Main',
    zaloguj: 'Log in',
    demo: 'See the demo',
    zamknij: 'Close menu',
    menu: 'Menu',
    wroc: 'Back to menu',
  },
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const jezyk = useJezyk();
  const t = TEKSTY[jezyk];
  const { menuStart, navigation } = nawigacja(jezyk);
  // Ścieżka polska – odnośniki w nawigacji są zapisane po polsku, więc
  // podświetlenie porównuje je z nią, niezależnie od języka adresu.
  const pathname = rozpoznaj(usePathname() ?? '/').sciezkaPl || '/';
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  /**
   * Dział, którego treść stoi w panelu menu na komputerze. Zostaje jeszcze
   * przez chwilę po zamknięciu (`openMega === null`), żeby panel zdążył
   * się zwinąć z treścią w środku, zamiast zniknąć w jednej klatce.
   */
  const [pokazanyMega, setPokazanyMega] = useState<string | null>(null);
  if (openMega && openMega !== pokazanyMega) setPokazanyMega(openMega);
  const panelRef = useRef<HTMLDivElement>(null);
  const tresciPaneluRef = useRef<HTMLDivElement>(null);
  /** Opóźnienie otwarcia: przelot kursorem nad paskiem nie otwiera menu. */
  const zwlokaMenu = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [mobileOpen, setMobileOpen] = useState(false);
  /**
   * Gdzie jesteśmy w menu na telefonie: `[]` to lista główna, `['Co robi']`
   * to grupy działu, `['Co robi', 'W trasie']` to strony grupy.
   */
  const [sciezkaMenu, setSciezkaMenu] = useState<string[]>([]);
  const [zjechal, setZjechal] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const ostatnieY = useRef(0);
  /**
   * Ile pikseli paska o App Store widać jeszcze nad nawigacją. Panel menu
   * na telefonie i rozmycie pod menu na komputerze są `fixed` i zaczynają
   * się pod nawigacją, więc przy górze strony schodzą o tyle niżej.
   * Po przewinięciu paska za krawędź ekranu wynosi 0.
   */
  const pasekRef = useRef<HTMLDivElement>(null);
  const [nadPaskiem, setNadPaskiem] = useState(0);

  /**
   * Pasek chowa się przy przewijaniu w dół i wraca przy przewijaniu w górę.
   *
   * Czytanie w dół to ruch kciuka w górę – wtedy pasek nie jest potrzebny
   * i oddaje miejsce treści. Ruch kciuka w dół, czyli powrót w górę strony,
   * zwykle znaczy „szukam nawigacji", więc pasek wraca od razu, bez czekania
   * na dojechanie na samą górę.
   *
   * Przy górze strony jest widoczny zawsze, niezależnie od kierunku.
   */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const dolPaska = pasekRef.current?.getBoundingClientRect().bottom ?? 0;
      setNadPaskiem(Math.max(0, Math.round(dolPaska)));

      if (y <= PRZY_GORZE) {
        ostatnieY.current = y;
        setZjechal(false);
        return;
      }

      const roznica = y - ostatnieY.current;
      if (Math.abs(roznica) < PROG_KIERUNKU) return;
      ostatnieY.current = y;
      setZjechal(roznica > 0);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    // Pasek o App Store zmienia wysokość, gdy tekst zawija się inaczej.
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /**
   * Kliknięcie w odnośnik zamyka menu – także gdy prowadzi tam, gdzie
   * już jesteśmy.
   *
   * Reset przy zmianie adresu (niżej) tego nie łapie, bo przy odnośniku do
   * bieżącej strony adres się nie zmienia. Menu zostawało wtedy otwarte,
   * a razem z nim blokada przewijania – czyli gorzej niż przed poprawką,
   * bo strona wracała na górę i zastawała człowieka w otwartym panelu.
   */
  const zamknijPoKliknieciu = (e: React.MouseEvent) => {
    if ((e.target as Element).closest('a')) {
      setMobileOpen(false);
      setOpenMega(null);
      setSciezkaMenu([]);
    }
  };

  // Zmiana adresu zamyka menu. Poprawka stanu w trakcie renderu, a nie
  // w efekcie – React obsługuje ten wzorzec osobno: przerywa render
  // i powtarza go z nową wartością, zanim cokolwiek trafi na ekran.
  // Przez efekt otwarte menu mignęłoby jeszcze na nowej stronie.
  const [poprzedniaSciezka, setPoprzedniaSciezka] = useState(pathname);
  if (poprzedniaSciezka !== pathname) {
    setPoprzedniaSciezka(pathname);
    setOpenMega(null);
    setMobileOpen(false);
    setSciezkaMenu([]);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenMega(null);
      setMobileOpen(false);
      setSciezkaMenu([]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openMega) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMega(null);
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [openMega]);

  /**
   * Wysokość panelu menu, jak u Apple: panel rozsuwa się w dół od paska,
   * przy zmianie działu płynnie zmienia wysokość, a przy zamknięciu się
   * zwija. Wysokość ustawiamy wprost na elemencie, bo przejście CSS potrzebuje
   * dwóch liczb w pikselach (z `auto` nie animuje). Odczyt `offsetHeight`
   * przed zmianą utrwala wartość startową, inaczej przeglądarka połączyłaby
   * obie zmiany w jedną klatkę i panel by przeskoczył.
   *
   * Po zamknięciu treść zostaje w panelu do końca zwijania, potem znika.
   */
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const tresc = tresciPaneluRef.current;
    if (!panel || !tresc) return;
    void panel.offsetHeight;
    panel.style.height = openMega ? `${tresc.offsetHeight}px` : '0px';
    if (openMega) return;
    const koniec = setTimeout(() => setPokazanyMega(null), CZAS_PANELU);
    return () => clearTimeout(koniec);
  }, [openMega, pokazanyMega]);

  useEffect(() => () => clearTimeout(zwlokaMenu.current), []);

  /** Najechanie na dział: przy zamkniętym menu po chwili, przy otwartym od razu. */
  const najedzNaDzial = (label: string) => {
    clearTimeout(zwlokaMenu.current);
    if (openMega) {
      setOpenMega(label);
      return;
    }
    zwlokaMenu.current = setTimeout(() => setOpenMega(label), ZWLOKA_MENU);
  };

  const zamknijMenu = () => {
    clearTimeout(zwlokaMenu.current);
    setOpenMega(null);
  };

  /**
   * Otwarte menu zatrzymuje pasek na miejscu.
   *
   * Panel na telefonie zaczyna się tuż pod paskiem i jest do niego
   * przypięty, a krzyżyk zamykający siedzi w samym pasku – schowanie go
   * zabrałoby jedyne wyjście z otwartego menu.
   */
  const schowany = zjechal && !mobileOpen && !openMega;

  /**
   * Pozycje bieżącego ekranu menu na telefonie, wszystkie tą samą dużą
   * czcionką, jak u Apple. Pozycja z `dalej` schodzi poziom niżej, pozycja
   * z `href` otwiera stronę. Dział z jedną grupą („Dla kogo”, „Pomoc”)
   * pomija poziom grup i od razu pokazuje strony.
   */
  type PozycjaMenu = { klucz: string; label: string; href?: string; dalej?: string };
  const dzialMenu = navigation.find(
    (e): e is Extract<NavEntry, { kind: 'mega' }> =>
      e.kind === 'mega' && e.label === sciezkaMenu[0],
  );
  const grupaMenu =
    dzialMenu &&
    (dzialMenu.groups.length === 1
      ? dzialMenu.groups[0]
      : dzialMenu.groups.find((g) => g.heading === sciezkaMenu[1]));
  const pozycjeMenu: PozycjaMenu[] = grupaMenu
    ? grupaMenu.items.map((i) => ({ klucz: i.href, label: i.label, href: i.href }))
    : dzialMenu
      ? dzialMenu.groups.map((g) => ({ klucz: g.heading, label: g.heading, dalej: g.heading }))
      : navigation.map((e) =>
          e.kind === 'link'
            ? { klucz: e.href, label: e.label, href: e.href }
            : { klucz: e.label, label: e.label, dalej: e.label },
        );
  /** Mały szary napis nad listą: gdzie jesteśmy. */
  const tytulMenu =
    grupaMenu && dzialMenu!.groups.length > 1 ? grupaMenu.heading : dzialMenu?.label;

  const mega = navigation.find(
    (e): e is Extract<NavEntry, { kind: 'mega' }> => e.kind === 'mega' && e.label === pokazanyMega,
  );

  return (
    <>
      {pasekAppStore && <PasekAppStore ref={pasekRef} />}
      <header
        ref={headerRef}
        onMouseLeave={zamknijMenu}
        /*
          Wejście klawiaturą wyciąga schowany pasek z powrotem – inaczej
          ogniskowanie trafiałoby w odnośniki stojące poza ekranem.

          Tym razem jest to bezpieczne, w odróżnieniu od poprzedniej wersji
          z ciemną listwą: pokazanie paska nie zamienia go na inny i niczego
          nie robi `inert`, więc nie ma jak zabrać kliknięcia ani zgubić
          ogniskowania. Myszą i tak nie da się kliknąć paska, którego nie
          ma na ekranie.
        */
        onFocusCapture={() => setZjechal(false)}
        /*
          `translate`, nie `transform`. Tailwind 4 nie składa już `transform`,
          tylko ustawia osobne właściwości, więc `-translate-y-full` daje
          `translate: 0 -100%`. Animowanie `transform` nie robiło tu
          niczego – pasek przeskakiwał w jednej klatce. Zmierzone.
        */
        className={`sticky top-0 z-40 border-b ${mega ? 'border-transparent' : 'border-line'} transition-[translate,background-color,box-shadow] duration-300 ease-out ${
          schowany ? '-translate-y-full' : 'translate-y-0'
        } ${
          mega
            ? 'bg-white'
            : `bg-white/86 backdrop-blur-[20px] backdrop-saturate-[180%] ${scrolled ? 'shadow-card' : ''}`
        } ${
          // Otwarte menu na telefonie: pasek bez kreski i cienia, zlewa się
          // z menu w jedną białą kartę, jak u Apple.
          mobileOpen ? 'max-lg:border-transparent max-lg:bg-white max-lg:shadow-none' : ''
        }`}
      >
        {/* 56 px na telefonie i na komputerze (od 27.11.2026 także na
            komputerze, wcześniej 72): pasek jest przyklejony, więc każdy
            piksel jego wysokości zabiera treści miejsce na każdym ekranie.
            Przycisk menu ma dalej 44 px, czyli tyle, ile trzeba na palec.
            Wysokość musi zgadzać się z 3.5rem w `top` panelu menu i rozmycia
            pod menu niżej oraz z `lg:top-24` spisów treści. */}
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 lg:px-12">
          <div className="flex items-center gap-11 lg:gap-6 xl:gap-11">
            {/* Przy otwartym menu na telefonie w pasku zostaje sam krzyżyk:
                logo i przełącznik języka znikają, jak w menu Apple.
                W podmenu po lewej, na wysokości krzyżyka, staje strzałka
                powrotu do listy głównej. */}
            {mobileOpen && sciezkaMenu.length > 0 && (
              <button
                type="button"
                onClick={() => setSciezkaMenu((s) => s.slice(0, -1))}
                aria-label={t.wroc}
                className="-ml-2.5 flex size-11 cursor-pointer items-center justify-center text-ink lg:hidden"
              >
                <ChevronLeft className="size-6" strokeWidth={1.6} aria-hidden />
              </button>
            )}
            <Link
              href="/"
              aria-label={t.domu}
              className={`${mobileOpen ? 'max-lg:hidden' : ''} flex items-center gap-2.5 text-[19px] font-bold tracking-[-0.02em] text-ink lg:text-[20px]`}
            >
              <Logo decorative className="size-8 flex-none lg:size-9" />
              {/* Sam znak na telefonie. Napis powtarzał to, co ikona już mówi,
                  a przy 375 px każde takie powtórzenie kosztuje miejsce. */}
              <span className="hidden lg:inline">BusiKM</span>
            </Link>

            <nav
              aria-label={t.glowna}
              className="hidden items-center gap-5 whitespace-nowrap lg:flex xl:gap-[30px]"
            >
              {navigation.map((entry) => {
                const active = isActive(pathname, entry.href);

                if (entry.kind === 'link') {
                  return (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      aria-current={active ? 'page' : undefined}
                      onMouseEnter={zamknijMenu}
                      className={`text-[15px] font-medium transition-colors hover:text-ink ${
                        active ? 'text-blue' : 'text-ink/75'
                      }`}
                    >
                      {entry.label}
                    </Link>
                  );
                }

                const open = openMega === entry.label;
                /* Pozycja jest wyłącznie wyzwalaczem menu: najechanie i wejście
                   klawiaturą rozwijają listę, kliknięcie nie robi nic i nigdzie
                   nie prowadzi. Strony zbiorcze nie istnieją. */
                return (
                  <button
                    key={entry.label}
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onMouseEnter={() => najedzNaDzial(entry.label)}
                    onMouseLeave={() => {
                      if (!openMega) clearTimeout(zwlokaMenu.current);
                    }}
                    onFocus={() => setOpenMega(entry.label)}
                    className={`cursor-pointer text-[15px] font-medium transition-colors hover:text-ink ${
                      active ? 'text-blue' : open ? 'text-ink' : 'text-ink/75'
                    }`}
                  >
                    {entry.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-1.5 whitespace-nowrap lg:gap-4 xl:gap-7">
            {/* Na telefonie przełącznik języka jest w menu, pod listą.
                W pasku zostają same ikony, jak u Apple. */}
            <div className="hidden lg:block">
              <PrzelacznikJezyka />
            </div>

            {/* Na telefonie same ikony, jak u Apple: cienki kontur w kolorze
                tekstu, bez tła. Przy otwartym menu znikają z paska, bo w menu
                są duże przyciski z opisem. */}
            <a
              href={appLinks.login}
              aria-label={t.zaloguj}
              className={`${mobileOpen ? 'hidden' : 'flex'} size-10 items-center justify-center rounded-btn text-ink transition-colors hover:text-ink lg:inline-flex lg:size-auto lg:gap-2 lg:text-[15px] lg:font-medium lg:text-ink/65`}
            >
              <User
                className="size-[22px] stroke-[1.5] lg:size-[18px] lg:stroke-[1.8]"
                aria-hidden
              />
              <span className="hidden lg:inline">{t.zaloguj}</span>
            </a>

            {/* Na desktopie demo na jasnoniebieskim tle (kolor pigułki
                aktywnej pozycji menu): wyróżnia się wśród reszty paska, ale
                nie krzyczy. Ikona ekranu mówi, że demo to podgląd panelu. */}
            <Link
              href={appLinks.demo}
              aria-label={t.demo}
              className={`${mobileOpen ? 'hidden' : 'flex'} size-10 items-center justify-center rounded-btn text-ink transition-colors hover:text-ink lg:flex lg:h-10 lg:w-auto lg:gap-2 lg:bg-blue-soft lg:px-[18px] lg:text-[15px] lg:font-medium lg:text-blue lg:hover:bg-blue/15 lg:hover:text-blue`}
            >
              <Monitor
                className="size-[22px] stroke-[1.5] lg:size-[18px] lg:stroke-[1.8]"
                aria-hidden
              />
              <span className="hidden lg:inline">{t.demo}</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileOpen((v) => !v);
                setSciezkaMenu([]);
              }}
              aria-label={mobileOpen ? t.zamknij : t.menu}
              aria-expanded={mobileOpen}
              className="-mr-2.5 flex size-11 cursor-pointer items-center justify-center lg:hidden"
            >
              <IkonaMenu otwarte={mobileOpen} className="bg-ink" />
            </button>
          </div>
        </div>

        {/* Rozwinięte menu, jak u Apple: ta sama biała powierzchnia co
            pasek, bez kreski między nimi. Nad każdą kolumną mały szary
            nagłówek. Pierwsza kolumna dużymi literami, kolejne małymi.
            Bez opisów pod pozycjami. Panel rozsuwa się i zwija płynnie
            (wysokość ustawia efekt wyżej), kolumny wchodzą łagodnie, pozycja
            po pozycji. `key` montuje treść od nowa przy zmianie działu, więc
            animacja rusza także przy przejściu z jednego działu na drugi.
            Przy zamykaniu pozycje gasną (`menu-gasnie`), a `inert` zabiera
            zwijający się panel klawiaturze i czytnikom. */}
        {mega && (
          <div
            ref={(el) => {
              // Nowy panel startuje od zera, efekt wyżej rozsuwa go do treści.
              panelRef.current = el;
              if (el && !el.style.height) el.style.height = '0px';
            }}
            onClick={zamknijPoKliknieciu}
            inert={!openMega}
            className="menu-panel absolute inset-x-0 top-full hidden overflow-hidden bg-white lg:block"
          >
            <div
              key={mega.label}
              ref={tresciPaneluRef}
              className={`mx-auto flex max-w-[1440px] gap-20 px-12 pt-9 pb-14 xl:gap-24 ${
                openMega ? '' : 'menu-gasnie'
              }`}
            >
              {mega.groups.map((grupa, g) => {
                const duza = g === 0;
                return (
                  <div key={grupa.heading} className="flex min-w-[200px] flex-col">
                    <div
                      className="menu-wchodzi mb-3 text-[13px] text-muted"
                      style={{ animationDelay: `${g * 60}ms` }}
                    >
                      {grupa.heading}
                    </div>
                    <ul className={`flex flex-col ${duza ? 'gap-1' : 'gap-0.5'}`}>
                      {grupa.items.map((item, i) => (
                        <li
                          key={item.href}
                          className="menu-wchodzi"
                          style={{ animationDelay: `${g * 60 + (i + 1) * 25}ms` }}
                        >
                          <Link
                            href={item.href}
                            aria-current={pathname === item.href ? 'page' : undefined}
                            className={`block font-semibold no-underline transition-colors hover:text-blue ${
                              pathname === item.href ? 'text-blue' : 'text-ink'
                            } ${
                              duza
                                ? 'py-1 text-[26px] leading-tight tracking-[-0.02em]'
                                : 'py-1.5 text-[14px]'
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Rozmycie strony pod otwartym menu, jak u Apple */}
      <div
        aria-hidden
        onPointerDown={zamknijMenu}
        style={{ top: `calc(3.5rem + ${nadPaskiem}px)` }}
        className={`menu-tlo fixed inset-0 z-30 hidden bg-ink/10 backdrop-blur-[20px] lg:block ${
          openMega ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Menu na telefonie. Poza <header>, bo backdrop-filter tworzy
          containing block dla position: fixed.

          Układ jak u Apple: na pierwszym ekranie tylko kilka dużych pozycji,
          bez przewijania. Pozycja ze strzałką przesuwa ekran w bok i pokazuje
          swoją listę, „Menu” wraca. Cennik i Rolki otwierają stronę od razu.
          Demo i logowanie są przypięte do dołu, w tym samym miejscu na
          każdym ekranie menu, pod kciukiem. */}
      {mobileOpen && (
        <div
          onClick={zamknijPoKliknieciu}
          style={{ top: `calc(3.5rem + ${nadPaskiem}px)` }}
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col bg-white lg:hidden"
        >
          {/* `key` zmienia się z ekranem, więc lista montuje się od nowa
              i każda pozycja wchodzi własną animacją, z małym opóźnieniem
              względem poprzedniej. */}
          <nav
            key={sciezkaMenu.join('/') || 'menu'}
            aria-label={t.menu}
            className="min-h-0 flex-1 overflow-y-auto px-7 pt-3 pb-6"
          >
            {tytulMenu && (
              <h2 className="menu-wchodzi pb-1 text-[15px] font-medium text-muted">{tytulMenu}</h2>
            )}
            <ul className="flex flex-col">
              {pozycjeMenu.map((poz, i) => {
                const czynny = poz.href
                  ? sciezkaMenu.length > 0
                    ? pathname === poz.href
                    : isActive(pathname, poz.href)
                  : false;
                const klasa = `flex w-full items-center justify-between py-2 text-left no-underline text-[28px] leading-tight font-semibold tracking-[-0.02em] ${
                  czynny ? 'text-blue' : 'text-ink'
                }`;
                return (
                  <li
                    key={poz.klucz}
                    className="menu-wchodzi"
                    style={{ animationDelay: `${(i + 1) * 25}ms` }}
                  >
                    {poz.href ? (
                      <Link
                        href={poz.href}
                        aria-current={pathname === poz.href ? 'page' : undefined}
                        className={klasa}
                      >
                        {poz.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSciezkaMenu((s) => [...s, poz.dalej!])}
                        className={`${klasa} cursor-pointer`}
                      >
                        {poz.label}
                        <ChevronRight className="size-[22px] flex-none text-muted/60" aria-hidden />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Na dole, nad wezwaniami, przełącznik języka bez podpisu.
              Kolory demo te same, co w pasku: jasnoniebieskie tło, niebieski tekst. */}
          <div className="flex flex-none flex-col gap-2.5 border-t border-line bg-white px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <PrzelacznikJezyka className="mb-1 self-start" />
            <Link
              href={appLinks.demo}
              className="flex items-center gap-3 rounded-[14px] bg-blue-soft px-4 py-3 text-blue transition-colors hover:bg-blue/15 hover:text-blue"
            >
              <span className="flex size-[38px] flex-none items-center justify-center rounded-[10px] bg-white/70">
                <Monitor className="size-5" strokeWidth={1.8} aria-hidden />
              </span>
              <span className="flex flex-col">
                <b className="text-[16px] font-semibold">{menuStart.demo.label}</b>
                <span className="text-[12.5px] text-blue/75">{menuStart.demo.benefit}</span>
              </span>
              <ArrowRight className="ml-auto size-5 flex-none opacity-70" aria-hidden />
            </Link>
            <a
              href={appLinks.login}
              className="flex items-center gap-3 rounded-[14px] border border-line px-4 py-3 text-ink transition-colors hover:border-muted hover:text-ink"
            >
              <span className="flex size-[38px] flex-none items-center justify-center rounded-[10px] bg-mist">
                <User className="size-5" strokeWidth={1.8} aria-hidden />
              </span>
              <span className="flex flex-col">
                <b className="text-[16px] font-semibold">{menuStart.login.label}</b>
                <span className="text-[12.5px] text-muted">{menuStart.login.benefit}</span>
              </span>
              <ArrowRight className="ml-auto size-5 flex-none opacity-70" aria-hidden />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
