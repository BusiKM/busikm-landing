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
      'Jestem Łukasz Głowacz, programista. Od 1 lipca 2026 busy 2,5-3,5 t w przewozach międzynarodowych muszą mieć tachograf i pilnować czasu pracy kierowcy. Zmiana przyszła szybko, a jasnych informacji było mało, więc zbudowałem BusiKM: aplikację, która działa w telefonie kierowcy i w biurze.',
      'Przepisy czytam za Ciebie. Od poniedziałku do piątku nagrywam krótkie rolki: co mówi przepis, co sprawdzi inspektor i ile kosztuje błąd. Nie jeżdżę busem, dlatego niczego nie piszę z głowy: każda rolka ma źródło, a gdy przepis jest niejasny, mówię to wprost. Na pytania odpowiadam pod postami, a z najlepszych robię kolejne rolki. Gdy BusiKM coś z tego załatwia za Ciebie, pokazuję jak.',
      'Gdy coś Ci w aplikacji nie gra albo czegoś brakuje, rozmawiasz z osobą, która może to zmienić. Zadzwoń albo napisz, odpowiem osobiście.',
    ],
    zadzwon: 'Zadzwoń: 690 250 957',
    rolki: 'Zobacz rolki',
    alt: 'Łukasz Głowacz, założyciel BusiKM',
  },
  en: {
    eyebrow: 'Who makes BusiKM',
    naglowek: 'Behind BusiKM is a person, not a call centre.',
    akapity: [
      'I’m Łukasz Głowacz, a software developer. Since 1 July 2026, 2.5-3.5 t vans on international jobs must have a tachograph and keep track of the driver’s working time. The change came fast and clear information was scarce, so I built BusiKM: an app that works on the driver’s phone and in the office.',
      'I read the rules so you don’t have to. Monday to Friday I record short videos in Polish: what the rule says, what the inspector will check and what a mistake costs. I don’t drive a van, so I never write from memory: every video has a source, and when a rule is unclear, I say so plainly. I answer questions under the posts, and the best ones become the next videos. When BusiKM handles something for you, I show how.',
      'When something in the app doesn’t work for you, or something is missing, you talk to the person who can change it. Call or write, and I’ll answer personally.',
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
