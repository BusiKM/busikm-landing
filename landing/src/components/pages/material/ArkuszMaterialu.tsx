'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Download, Mail, X } from 'lucide-react';

import Link from '@/i18n/Link';
import type { Material } from '@/content/materialy';
import { TRESC_ZGODY_PRZEPISY } from '@/content/zgoda';
import { zamowMaterial } from '@/lib/material';
import { zdarzenieGa } from '@/lib/ga';
import { zdarzenieMeta } from '@/lib/meta';

/**
 * Okienko przed pobraniem ściągi: „Wysłać też na Twój e-mail?”.
 *
 * Dwa wejścia:
 * - `pobierz` (przycisk w nagłówku): mail z linkiem i zgoda są opcją,
 *   „Pobierz bez maila” stoi obok w tym samym rozmiarze. PDF nie może
 *   zależeć od adresu ani od zgody (art. 7 ust. 4 RODO).
 * - `zapis` (przycisk pod listą): człowiek przyszedł po maile o zmianach
 *   przepisów, więc zgoda jest wymagana, bo usługą jest sama lista.
 *
 * Pobranie rusza w chwili kliknięcia, zanim pójdzie mail: odnośnik z
 * `download` i `target="_blank"`. Przeglądarka, która nie umie pobrać
 * (np. w aplikacji Facebooka), otworzy PDF w nowym widoku, a ta strona
 * zostaje i pokaże potwierdzenie.
 *
 * Przyciski na stronie (serwerowej) otwierają okienko zdarzeniem
 * `busikm:material`, żeby okienko było jedno na stronę.
 */

export type TrybArkusza = 'pobierz' | 'zapis';
const ZDARZENIE = 'busikm:material';

export function otworzArkusz(tryb: TrybArkusza) {
  window.dispatchEvent(new CustomEvent<TrybArkusza>(ZDARZENIE, { detail: tryb }));
}

type Stan =
  | { etap: 'formularz' }
  | { etap: 'wysylam' }
  | { etap: 'gotowe'; mail: string; zgoda: boolean; wynik: 'wyslany' | 'blad' | 'czekam' };

const pole =
  'h-13 w-full rounded-btn border border-line-strong bg-white px-4 text-[16px] outline-none placeholder:text-muted focus:border-blue';

/** Ściąga plik w chwili kliknięcia (gest użytkownika), bez czekania na sieć. */
function pobierzPlik(plik: string) {
  const a = document.createElement('a');
  a.href = plik;
  a.download = plik.split('/').pop() ?? '';
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function ArkuszMaterialu({ material }: { material: Material }) {
  const okno = useRef<HTMLDialogElement>(null);
  const [tryb, setTryb] = useState<TrybArkusza>('pobierz');
  const [mail, setMail] = useState('');
  const [zgoda, setZgoda] = useState(false);
  const [pulapka, setPulapka] = useState('');
  const [stan, setStan] = useState<Stan>({ etap: 'formularz' });

  useEffect(() => {
    const naOtwarcie = (e: Event) => {
      setTryb((e as CustomEvent<TrybArkusza>).detail);
      setStan({ etap: 'formularz' });
      okno.current?.showModal();
    };
    window.addEventListener(ZDARZENIE, naOtwarcie);
    return () => window.removeEventListener(ZDARZENIE, naOtwarcie);
  }, []);

  const zamknij = useCallback(() => okno.current?.close(), []);

  const adresOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail.trim());
  const zapis = tryb === 'zapis';
  const gotowyDoWyslania = adresOk && (!zapis || zgoda) && stan.etap !== 'wysylam';

  const bezMaila = () => {
    pobierzPlik(material.plik);
    zdarzenieGa('pdf_download', { material: material.klucz, sposob: 'bez_maila' });
    zamknij();
  };

  const wyslij = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gotowyDoWyslania) return;
    const adres = mail.trim();
    if (!zapis) {
      pobierzPlik(material.plik);
      zdarzenieGa('pdf_download', { material: material.klucz, sposob: 'z_mailem' });
    }
    setStan({ etap: 'wysylam' });
    const wynik = await zamowMaterial({ email: adres, material: material.klucz, zgoda, pulapka });
    if (zgoda) zdarzenieMeta('Lead', { content_name: `przepisy-${material.klucz}` });
    setStan({ etap: 'gotowe', mail: adres, zgoda, wynik });
  };

  const tytul = zapis
    ? 'Maile o zmianach przepisów'
    : `Wysłać ${material.nazwa.biernik} też na Twój e-mail?`;

  return (
    <dialog
      ref={okno}
      aria-labelledby="arkusz-tytul"
      onClick={(e) => {
        // Klik w tło (poza kartą) zamyka okienko.
        if (e.target === e.currentTarget) zamknij();
      }}
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-[24px] bg-white text-ink backdrop:bg-ink/55 [font-feature-settings:'calt'_0] lg:m-auto lg:max-w-[480px] lg:rounded-card"
    >
      <div className="relative flex flex-col gap-5 p-6 pb-[max(24px,env(safe-area-inset-bottom))] lg:p-8">
        <button
          type="button"
          onClick={zamknij}
          aria-label="Zamknij"
          className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full text-muted hover:bg-mist hover:text-ink"
        >
          <X className="size-5" aria-hidden />
        </button>

        {stan.etap === 'gotowe' ? (
          <Potwierdzenie
            material={material}
            tryb={tryb}
            mail={stan.mail}
            zgoda={stan.zgoda}
            wynik={stan.wynik}
            zamknij={zamknij}
          />
        ) : (
          <form onSubmit={wyslij} className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 pr-10">
              <span className="flex size-11 items-center justify-center rounded-[12px] bg-blue-soft text-blue">
                <Mail className="size-5.5" aria-hidden />
              </span>
              <h2 id="arkusz-tytul" className="text-[22px] leading-tight font-bold tracking-[-0.015em]">
                {tytul}
              </h2>
              <p className="text-[15px] leading-relaxed text-muted">
                {zapis
                  ? 'Napiszemy, gdy zmienią się przepisy o tachografie albo KSeF, a czasem o nowościach w BusiKM. Na start dostaniesz link do checklisty.'
                  : 'Będziesz ją mieć pod ręką przed kontrolą, a nie tylko w pobranych plikach telefonu.'}
              </p>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-[14px] font-medium">Adres e-mail</span>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="jan@firma.pl"
                maxLength={160}
                required={zapis}
                className={pole}
              />
            </label>

            {/* Pułapka na boty – człowiek tego pola nie zobaczy i nie zatabuluje. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Nie wypełniaj tego pola
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={pulapka}
                  onChange={(e) => setPulapka(e.target.value)}
                />
              </label>
            </div>

            {/*
              Brzmienie zgody nie jest pisane tutaj: `content/zgoda.ts`, wersja
              trafia do bazy razem z adresem (art. 7 ust. 1 RODO).
            */}
            <label className="flex cursor-pointer items-start gap-3 rounded-[14px] bg-mist p-4">
              <input
                type="checkbox"
                checked={zgoda}
                onChange={(e) => setZgoda(e.target.checked)}
                required={zapis}
                className="mt-0.5 size-5 flex-none accent-blue"
              />
              <span className="flex flex-col gap-1">
                <b className="text-[15px]">Daj mi znać o zmianach przepisów</b>
                <span className="text-[13px] leading-relaxed text-muted">{TRESC_ZGODY_PRZEPISY}</span>
              </span>
            </label>

            <div className="flex flex-col gap-2.5">
              <button
                type="submit"
                disabled={!gotowyDoWyslania}
                className="inline-flex h-13 items-center justify-center gap-2.5 rounded-btn bg-blue px-6 text-[16px] font-semibold text-white transition-colors hover:bg-blue-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
              >
                {stan.etap === 'wysylam' ? 'Wysyłam…' : zapis ? 'Zapisz mnie' : 'Wyślij i pobierz'}
              </button>
              {!zapis && (
                <button
                  type="button"
                  onClick={bezMaila}
                  className="inline-flex h-13 items-center justify-center gap-2.5 rounded-btn border border-line bg-white px-6 text-[16px] font-semibold text-ink transition-colors hover:border-muted"
                >
                  <Download className="size-5" aria-hidden />
                  Pobierz bez maila
                </button>
              )}
            </div>

            <p className="text-[12px] leading-relaxed text-muted">
              Adres posłuży do wysłania tego maila{zapis ? ' i maili o zmianach przepisów' : ''}.
              Szczegóły w{' '}
              <Link href="/prywatnosc" className="text-blue">
                polityce prywatności
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}

function Potwierdzenie({
  material,
  tryb,
  mail,
  zgoda,
  wynik,
  zamknij,
}: {
  material: Material;
  tryb: TrybArkusza;
  mail: string;
  zgoda: boolean;
  wynik: 'wyslany' | 'blad' | 'czekam';
  zamknij: () => void;
}) {
  const naglowek =
    tryb === 'zapis' ? 'Gotowe, zapisane' : `Gotowe, ${material.nazwa.mianownik} się pobiera`;

  return (
    <div role="status" className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 pr-10">
        <span className="flex size-11 items-center justify-center rounded-full bg-green/15 text-green-ink">
          <Check className="size-6" aria-hidden strokeWidth={2.6} />
        </span>
        <h2 id="arkusz-tytul" className="text-[22px] leading-tight font-bold tracking-[-0.015em]">
          {naglowek}
        </h2>
        {wynik === 'blad' ? (
          <p className="text-[15px] leading-relaxed text-muted">
            Maila z linkiem nie udało się wysłać na <b className="text-ink">{mail}</b>.{' '}
            {tryb === 'zapis' ? (
              <>Spróbuj jeszcze raz za chwilę.</>
            ) : (
              <>
                {material.nazwa.mianownik.charAt(0).toUpperCase() + material.nazwa.mianownik.slice(1)} i
                tak jest w pobranych plikach.
              </>
            )}
          </p>
        ) : (
          <p className="text-[15px] leading-relaxed text-muted">
            Link do PDF wysłaliśmy na <b className="text-ink break-all">{mail}</b>. Nie widzisz maila?
            Zajrzyj do folderu Oferty albo Spam.
          </p>
        )}
      </div>

      {zgoda && wynik !== 'blad' && (
        <div className="rounded-[14px] bg-mist p-4 text-[14px] leading-relaxed text-muted">
          Damy znać, gdy zmienią się przepisy o tachografie albo KSeF. Wypiszesz się jednym kliknięciem
          w każdym mailu.
        </div>
      )}

      <button
        type="button"
        onClick={zamknij}
        className="inline-flex h-13 items-center justify-center rounded-btn border border-line bg-white px-6 text-[16px] font-semibold text-ink transition-colors hover:border-muted"
      >
        Zamknij
      </button>
    </div>
  );
}

/** Przycisk na stronie, który otwiera okienko. */
export function PrzyciskArkusza({
  tryb,
  className,
  children,
}: {
  tryb: TrybArkusza;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={() => otworzArkusz(tryb)} className={className}>
      {children}
    </button>
  );
}
