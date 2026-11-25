import { redirect } from 'next/navigation';
import { appLinks } from '@/content/navigation';

/**
 * `/zaloguj` (po angielsku `/sign-in`) prowadziło na listę wczesnego dostępu.
 * Rejestracja jest już otwarta w panelu (BKM-1858), więc adres tylko
 * przekierowuje do logowania, a stamtąd jest przejście do zakładania konta.
 * Zostaje, żeby stare odnośniki, zakładki i wyniki wyszukiwania działały.
 * Zapisy z listy (`zapisy-konto`) czekają w Firestore na obiecaną wiadomość
 * w dniu otwarcia: docs/landing/12-listy-wczesnego-dostepu.md.
 */
export default function Page() {
  redirect(appLinks.login);
}
