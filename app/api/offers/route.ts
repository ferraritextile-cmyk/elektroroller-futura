import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { sendOfferNotificationToAdmin, sendOfferConfirmationToCustomer } from '@/lib/email';
import { addOfferToSheet } from '@/lib/google-sheets';

export interface OfferRequest {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  postalCode: string;
  selectedModel: string;
  message?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'sent' | 'closed';
}

// Vercel: /tmp ist schreibbar, process.cwd() nicht
const DATA_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
const OFFERS_FILE = path.join(DATA_DIR, 'offers.json');

// Hilfsfunktion zum Lesen der Angebote
async function getOffers(): Promise<OfferRequest[]> {
  try {
    const data = await readFile(OFFERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Hilfsfunktion zum Speichern der Angebote
async function saveOffers(offers: OfferRequest[]): Promise<void> {
  await writeFile(OFFERS_FILE, JSON.stringify(offers, null, 2));
}

export async function GET() {
  try {
    const offers = await getOffers();
    return NextResponse.json(offers);
  } catch (error) {
    console.error('Error reading offers:', error);
    return NextResponse.json({ error: 'Failed to read offers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, postalCode, selectedModel, message } = body;

    // Validierung
    if (!firstName || !lastName || !phone || !email || !postalCode || !selectedModel) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle Pflichtfelder aus' },
        { status: 400 }
      );
    }

    const offers = await getOffers();

    const newOffer: OfferRequest = {
      id: Date.now().toString(),
      firstName,
      lastName,
      phone,
      email,
      postalCode,
      selectedModel,
      message: message || '',
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    offers.push(newOffer);
    await saveOffers(offers);

    console.log('New offer request:', newOffer);

    // Alle async-Operationen AWAITEN damit Vercel sie nicht vorzeitig beendet
    const emailData = {
      firstName,
      lastName,
      phone,
      email,
      postalCode,
      selectedModel,
      message,
    };

    await Promise.allSettled([
      addOfferToSheet(newOffer).catch(err => console.error('Google Sheets Fehler:', err)),
      sendOfferNotificationToAdmin(emailData).catch(err => console.error('E-Mail an Admin fehlgeschlagen:', err)),
      sendOfferConfirmationToCustomer(emailData).catch(err => console.error('E-Mail an Kunde fehlgeschlagen:', err)),
    ]);

    return NextResponse.json(
      { success: true, message: 'Anfrage erfolgreich gesendet' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern der Anfrage' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const offers = await getOffers();
    const offerIndex = offers.findIndex(o => o.id === id);

    if (offerIndex === -1) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    offers[offerIndex].status = status;
    await saveOffers(offers);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating offer:', error);
    return NextResponse.json({ error: 'Failed to update offer' }, { status: 500 });
  }
}
