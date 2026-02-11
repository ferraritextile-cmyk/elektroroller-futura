import { NextResponse } from 'next/server';
import { sendCustomOfferToCustomer, CustomOfferData } from '@/lib/email';

const ADMIN_PASSWORD = process.env.ADMIN_OFFER_PASSWORD || 'emobil2024';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, ...offerData } = body;

    // Einfacher Passwortschutz
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Falsches Passwort' }, { status: 401 });
    }

    // Pflichtfelder prüfen
    if (!offerData.customerEmail || !offerData.customerName || !offerData.modelName || !offerData.price) {
      return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 });
    }

    const success = await sendCustomOfferToCustomer(offerData as CustomOfferData);

    if (success) {
      return NextResponse.json({ message: 'Angebot erfolgreich gesendet' });
    } else {
      return NextResponse.json({ error: 'E-Mail konnte nicht gesendet werden' }, { status: 500 });
    }
  } catch (error) {
    console.error('Fehler beim Senden des Angebots:', error);
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
  }
}
