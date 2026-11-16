import Image from 'next/image';
import { Section, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TELEFON = '+48690250957';
const MAIL = 'kontakt@busikm.pl';

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  naglowek: string;
  akapity: readonly string[];
  zadzwon: string;
  rolki: string;
  alt: string;
}> = {
  pl: {
    eyebrow: 'Kto robi BusiKM',
    naglowek: 'Za BusiKM stoi człowiek, nie infolinia.',
    akapity: [
      'Jestem Łukasz Głowacz, założyciel i twórca BusiKM. Zacząłem go robić, gdy okazało się, że busy jeżdżące za granicę dostaną te same obowiązki co tiry, a większość busiarzy nie miała o tym pojęcia.',
      'Dlatego pięć razy w tygodniu nagrywam rolki, w których łączę przepisy z tym, jak naprawdę wygląda praca busem: co mówi rozporządzenie, co sprawdzi inspektor i ile kosztuje błąd. Przy każdym przepisie podaję źródło, a każde pytanie z komentarzy dostaje odpowiedź. Większość rolek to czysta wiedza, w niektórych pokazuję, jak to samo załatwia BusiKM.',
      'Masz pytanie albo chcesz sprawdzić, czy BusiKM pasuje do Twojej firmy? Zadzwoń albo napisz, odpowiem osobiście.',
    ],
    zadzwon: 'Zadzwoń: 690 250 957',
    rolki: 'Zobacz rolki',
    alt: 'Łukasz Głowacz, założyciel BusiKM',
  },
  en: {
    eyebrow: 'Who makes BusiKM',
    naglowek: 'Behind BusiKM is a person, not a call centre.',
    akapity: [
      'I’m Łukasz Głowacz, the founder and maker of BusiKM. I started building it when it turned out that vans driving abroad would get the same obligations as lorries, and most van operators had no idea.',
      'That’s why, five times a week, I record short videos in Polish that connect the rules with what working with a van really looks like: what the regulation says, what the inspector will check and what a mistake costs. I give the source for every rule, and every question from the comments gets an answer. Most videos are pure knowledge, and in some I show how BusiKM handles the same thing.',
      'Got a question, or want to check whether BusiKM fits your company? Call or write, and I’ll answer personally.',
    ],
    zadzwon: 'Call: +48 690 250 957',
    rolki: 'Watch the reels',
    alt: 'Łukasz Głowacz, founder of BusiKM',
  },
};

/**
 * Kto robi BusiKM – twarz i bezpośredni kontakt do założyciela.
 *
 * Zdjęcie 800 × 800 w `public/zespol/`, przez `next/image`, więc do telefonu
 * jedzie mniejsza wersja. Leniwie, bo sekcja stoi daleko pod hero.
 */
export function KtoRobi() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[360px_1fr] lg:items-center lg:gap-20">
        <div data-reveal className="mx-auto w-56 sm:w-64 lg:mx-0 lg:w-full">
          <Image
            src="/zespol/lukasz-glowacz.jpg"
            alt={t.alt}
            width={800}
            height={800}
            sizes="(min-width: 1024px) 360px, 256px"
            className="aspect-square w-full rounded-full border border-line object-cover shadow-card"
          />
        </div>

        <div className="flex flex-col gap-5 lg:gap-6">
          <Eyebrow data-reveal>{t.eyebrow}</Eyebrow>
          <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
            {t.naglowek}
          </h2>
          {t.akapity.map((a) => (
            <p key={a} data-reveal className="text-[16px] leading-relaxed text-pretty text-muted lg:text-body">
              {a}
            </p>
          ))}

          <div data-reveal className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:gap-3">
            <a
              href={`tel:${TELEFON}`}
              className="inline-flex h-[52px] items-center justify-center rounded-btn bg-blue px-7 text-body font-semibold text-white transition-colors hover:bg-blue-dark hover:text-white lg:h-14"
            >
              {t.zadzwon}
            </a>
            <Button href={`mailto:${MAIL}`} variant="secondary">
              {MAIL}
            </Button>
            <Button href="/rolki" variant="secondary">
              {t.rolki}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
