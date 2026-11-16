import {
  Bell,
  CalendarDays,
  Camera,
  Car,
  CircleCheck,
  Clock,
  Coins,
  Download,
  Eye,
  FileText,
  Funnel,
  Gauge,
  Hash,
  History,
  Link,
  Map,
  MapPin,
  MessageSquare,
  Moon,
  PenLine,
  Route,
  Scale,
  Sparkles,
  Timer,
  Users,
  WifiOff,
  type LucideIcon,
} from 'lucide-react';

/**
 * Ikona do kafelka w „Drobiazgach” dobierana po treści kafelka.
 *
 * Kafelków jest kilkadziesiąt na dziesięciu podstronach, w dwóch językach.
 * Zamiast przypisywać ikonę każdemu z osobna, szukamy słowa kluczowego –
 * wygrywa pierwsze dopasowanie. Kafelek bez pasującego słowa dostaje
 * znaczek „gotowe”.
 */
const REGULY: readonly (readonly [RegExp, LucideIcon])[] = [
  [/\bai\b|odczyta|reads the/, Sparkles],
  [/nocn|dark mode/, Moon],
  [/carplay/, Car],
  [/czas dojazdu|arrival time|zdąży|make it/, Clock],
  [/jestem na miejscu|i’m here|znana pozycja|last known|punkt postoju|stops pinned/, MapPin],
  [/bez zasięgu|no signal/, WifiOff],
  [/kurs[a]? walut|nbp|exchange rate|currenc/, Coins],
  [/powiadom|przypomn|notification|reminder/, Bell],
  [/podpis|signature|korekta|correction/, PenLine],
  [/czat|chat|pyta w aplikacji|asks in the app/, MessageSquare],
  [/wag[ai] |weight/, Scale],
  [/przerw|break/, Timer],
  [/filtr|filter|sortow|sorted/, Funnel],
  [/kilometr|przebieg|mileage|kilometre/, Gauge],
  [/ślad|trace|trasy z|route view|doładunek|extra pickup/, Route],
  [/mapa|map in/, Map],
  [/histori|history/, History],
  [/link/, Link],
  [/numeracj|numbering|qr/, Hash],
  [/zdjęci|photo|paragon|receipt/, Camera],
  [/pdf|eksport|export|arkusz|spreadsheet|pobraniem|download|paczka|package/, Download],
  [/cmr|dokument|document|skan|scan|licencj|licence|plik|file|proforma|pro forma/, FileText],
  [/podwykonawc|subcontractor|odrzuca|turns a run down|klientów|client report/, Users],
  [/koszt|cost|zwrot|refund|płatno|payment|marż|margin|zysk|profit/, Coins],
  [/termin|deadline|tygodnia|week|dowolnego dnia|any day/, CalendarDays],
  [/status|widać|sees|shows up|podgląd|preview|wglądu|to look at/, Eye],
];

export function ikonaKafelka(tekst: string): LucideIcon {
  const t = tekst.toLowerCase();
  return REGULY.find(([wzor]) => wzor.test(t))?.[1] ?? CircleCheck;
}
