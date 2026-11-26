import { firma } from '@/content/firma';
import type { Tlumaczenia } from '@/i18n/jezyki';

/**
 * Zgoda marketingowa – jedno brzmienie dla wszystkich formularzy.
 *
 * ## Dlaczego treść jest wersjonowana i zapisywana razem z adresem
 *
 * Art. 7 ust. 1 RODO nakłada na nas ciężar dowodu: musimy umieć **wykazać**,
 * że konkretna osoba zgodę wyraziła. Przy okienku na stronie dowodem jest log
 * na serwerze – ale samo `true` niczego nie dowodzi, bo za rok nikt nie
 * odtworzy, pod czym ta osoba się podpisała. Dlatego przy każdym zapisie
 * ląduje w bazie pełne brzmienie zgody i jej numer wersji.
 *
 * **Zmiana treści = nowa wersja.** Nigdy nie poprawiaj `TRESC` bez podniesienia
 * `WERSJA` – inaczej stare zapisy zaczną wskazywać na słowa, których ich
 * autorzy nigdy nie widzieli.
 *
 * Wersja 2 dopisała, **jak** wycofać zgodę. Art. 7 ust. 3 RODO wymaga, żeby
 * było to możliwe w każdej chwili i równie łatwo, jak jej udzielenie –
 * a odnośnik w wiadomości nie wystarcza komuś, do kogo pierwsza wiadomość
 * pójdzie dopiero za kilka miesięcy. Stąd druga droga, przez adres.
 *
 * Wersja 3 zmieniła wyłącznie typografię polskiego brzmienia: przecinek
 * zamiast długiego myślnika. Sens zgody się nie zmienił, ale treść tak,
 * więc numer też.
 *
 * Wersja 4 usunęła zapowiedź „uruchomienia demo”, bo demo już działa.
 * Zostało otwarcie zapisów i nowości w BusiKM. Zapisy z wersji 1-3 wskazują
 * na swoje brzmienie zapisane w bazie razem z numerem.
 *
 * Wersja 5 (22.11.2026) zmieniła tylko nadawcę: zgodę daje się Movgranto
 * Łukasz Głowacz (jednoosobowa działalność), a nie MOVGRANTO Sp. z o.o.
 * Nazwa idzie z `firma.nazwa`, więc zmiana danych firmy zawsze wymaga
 * podniesienia numeru tutaj.
 *
 * ## Podstawa prawna
 *
 * Art. 6 ust. 1 lit. a RODO (zgoda) oraz **art. 398 Prawa komunikacji
 * elektronicznej**. To ostatni jest istotny: art. 10 ustawy o świadczeniu
 * usług drogą elektroniczną, na który powoływano się latami, został uchylony
 * 10 listopada 2024 i zastąpiony jednym przepisem obejmującym wszystkie
 * kanały.
 *
 * ## Dlaczego wolno wymagać jej na stronach zapisu
 *
 * Art. 7 ust. 4 RODO zabrania uzależniać wykonanie usługi od zgody, która
 * nie jest do niej niezbędna. Na `/demo` i `/zaloguj` usługą **jest** lista –
 * zgoda nie warunkuje niczego innego, bo nic innego tam nie oferujemy.
 * W formularzu kontaktowym jest odwrotnie: usługą jest odpowiedź na pytanie,
 * więc tam zgoda musi być nieobowiązkowa.
 */

export const WERSJA_ZGODY = 5;

/**
 * Brzmienie w obu językach serwisu.
 *
 * Człowiek na stronie angielskiej widzi zgodę po angielsku i pod tym
 * brzmieniem się podpisuje – więc to ono trafia do bazy, razem z polem
 * `jezyk`. Brzmienie wskazuje para **(wersja, język)**: obie wersje
 * językowe mówią to samo i dzielą numer. Zmiana którejkolwiek = nowa wersja
 * dla obu, żeby numer nadal znaczył jedną treść.
 */
export const TRESC_ZGODY: Tlumaczenia<string> = {
  pl:
    `Zgadzam się na otrzymywanie od ${firma.nazwa} informacji o BusiKM na podany adres ` +
    'e-mail, w tym o otwarciu zapisów i nowościach w BusiKM. Zgodę wycofam odnośnikiem ' +
    `w każdej wiadomości albo pisząc na ${firma.email}.`,
  en:
    `I agree to receive information about BusiKM from ${firma.nazwa} at the email ` +
    'address I have given, including news of sign-ups opening and what is new in BusiKM. ' +
    `I can withdraw my consent via the link in any message or by writing to ${firma.email}.`,
};

/** Kanał, którego zgoda dotyczy. Art. 398 PKE wymaga wskazania go wprost. */
export const KANAL_ZGODY = 'email';

/**
 * Źródło zapisu – przyszły tag w narzędziu do wysyłki.
 *
 * `formularz` różni się od pozostałych: tam zgoda jest nieobowiązkowa, więc
 * na liście lądują wyłącznie te adresy, przy których faktycznie zaznaczono
 * okienko. Reszta zostaje w kolekcji wiadomości i służy wyłącznie do
 * odpowiedzi.
 */
export type Zrodlo = 'demo' | 'rejestracja' | 'formularz' | ZrodloPrzepisow;

/**
 * Strona z materiałem (ściągą PDF), na której ktoś zapisał się na maile
 * o zmianach przepisów. Ten sam tag trafia do Firestore i do Klaviyo.
 */
export type ZrodloPrzepisow = 'itd';

/**
 * Zgoda na maile o zmianach przepisów (lista „Przepisy” w Klaviyo).
 *
 * Osobne brzmienie, bo zgoda z `/demo` mówi o otwarciu zapisów i nowościach
 * w BusiKM, a nie o przepisach. Wysyłka czegoś, na co nikt się nie zgodził,
 * byłaby niezgodna z art. 398 PKE, nawet do adresu, który już jest na innej
 * liście. Numeracja własna, zasady te same co wyżej: zmiana treści = nowa
 * wersja.
 *
 * Zgoda jest tu **nieobowiązkowa**. Usługą jest ściąga PDF i ta nie może od
 * zgody zależeć (art. 7 ust. 4 RODO): pobiera się bez maila, a mail z linkiem
 * do PDF też idzie bez zgody, bo o niego człowiek poprosił sam.
 *
 * Strony z materiałami są tylko po polsku, więc brzmienie jest jedno.
 */
export const WERSJA_ZGODY_PRZEPISY = 1;

export const TRESC_ZGODY_PRZEPISY =
  `Zgadzam się na otrzymywanie od ${firma.nazwa} e-maili o zmianach przepisów dla firm ` +
  'z busami (tachograf, KSeF) i o nowościach w BusiKM. Zgodę wycofam odnośnikiem ' +
  `w każdej wiadomości albo pisząc na ${firma.email}.`;
