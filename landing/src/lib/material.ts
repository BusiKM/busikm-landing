import { getDb, firebaseGotowy } from '@/lib/firebase';
import { LIMITY_ZAPISU } from '@/content/zapisy';
import {
  KANAL_ZGODY,
  TRESC_ZGODY_PRZEPISY,
  WERSJA_ZGODY_PRZEPISY,
  type ZrodloPrzepisow,
} from '@/content/zgoda';

export type WynikMaterialu = 'wyslany' | 'blad';

/**
 * Mail z linkiem do ściągi i, za zgodą, zapis na maile o zmianach przepisów.
 *
 * Dowód zgody (pełne brzmienie i numer wersji) trafia do Firestore, tak jak
 * przy `/demo`: ciężar dowodu spoczywa na nas (art. 7 ust. 1 RODO). Bez zgody
 * w bazie nie zostaje nic, a adres idzie tylko do wysyłki jednego maila.
 *
 * Nieudany zapis w bazie nie zatrzymuje maila: człowiek dostaje to, o co
 * poprosił, a zgodę i tak zapisuje Klaviyo razem z jej brzmieniem.
 */
export async function zamowMaterial(dane: {
  email: string;
  material: ZrodloPrzepisow;
  zgoda: boolean;
  pulapka: string;
}): Promise<WynikMaterialu> {
  const email = dane.email.trim().toLowerCase().slice(0, LIMITY_ZAPISU.email);

  if (dane.zgoda && !dane.pulapka && firebaseGotowy) {
    try {
      // SDK pobierane dopiero teraz – patrz `lib/firebase.ts`.
      const [db, { addDoc, collection, serverTimestamp }] = await Promise.all([
        getDb(),
        import('firebase/firestore'),
      ]);
      if (db) {
        await addDoc(collection(db, 'zapisy-przepisy'), {
          email,
          zrodlo: dane.material,
          zgoda: true,
          trescZgody: TRESC_ZGODY_PRZEPISY,
          wersjaZgody: WERSJA_ZGODY_PRZEPISY,
          kanalZgody: KANAL_ZGODY,
          jezyk: 'pl',
          createdAt: serverTimestamp(),
          source: 'busikm-landing',
        });
      }
    } catch {
      /* zgoda zostaje w Klaviyo, mail idzie dalej */
    }
  }

  try {
    const odp = await fetch('/api/material', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        material: dane.material,
        zgoda: dane.zgoda,
        pulapka: dane.pulapka,
      }),
    });
    const wynik = (await odp.json().catch(() => null)) as { mail?: string } | null;
    return wynik?.mail === 'wyslany' ? 'wyslany' : 'blad';
  } catch {
    return 'blad';
  }
}
