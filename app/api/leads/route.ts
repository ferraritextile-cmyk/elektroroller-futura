import { NextRequest, NextResponse } from 'next/server';
import { Lead, LeadFormData } from '@/types/lead';
import { promises as fs } from 'fs';
import path from 'path';
import { sendQuizLeadNotification, sendQuizResultToCustomer } from '@/lib/email';
import { addQuizLeadToSheet } from '@/lib/google-sheets';

// Vercel: /tmp ist schreibbar, process.cwd() nicht
const DATA_DIR = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

async function ensureDataDirectory() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readLeads(): Promise<Lead[]> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Wenn Datei nicht existiert, leeres Array zurückgeben
    return [];
  }
}

async function writeLeads(leads: Lead[]): Promise<void> {
  await ensureDataDirectory();
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

function calculateLeadMetadata(formData: LeadFormData): Pick<Lead, 'isPre1965' | 'recommendedCategory' | 'prefersWeatherProtection'> {
  const isPre1965 = formData.quizAnswers.birthYear < 1965;

  // Kabinenroller wenn zu zweit oder Wetterschutz gewünscht, sonst Elektromobil
  const recommendedCategory = formData.quizAnswers.passengers === 'two' || formData.quizAnswers.weatherProtection === 'closed'
    ? 'kabinenroller'
    : 'elektromobil';

  const prefersWeatherProtection = formData.quizAnswers.weatherProtection === 'closed';

  return {
    isPre1965,
    recommendedCategory,
    prefersWeatherProtection,
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData: LeadFormData = await request.json();

    // Validierung
    if (!formData.name || !formData.phone || !formData.quizAnswers) {
      return NextResponse.json(
        { error: 'Fehlende Pflichtfelder' },
        { status: 400 }
      );
    }

    // Telefonnummer validieren
    const phoneRegex = /^[\d\s\+\-\/\(\)]{8,}$/;
    if (!phoneRegex.test(formData.phone)) {
      return NextResponse.json(
        { error: 'Ungültige Telefonnummer' },
        { status: 400 }
      );
    }

    const leads = await readLeads();

    // Neuen Lead erstellen
    const metadata = calculateLeadMetadata(formData);
    const newLead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      availability: formData.availability,
      quizAnswers: formData.quizAnswers,
      ...metadata,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    leads.push(newLead);
    await writeLeads(leads);

    // Google Sheets Export (asynchron, blockiert nicht die Response)
    addQuizLeadToSheet(newLead).catch(err =>
      console.error('Google Sheets Fehler:', err)
    );

    // WhatsApp-Benachrichtigung senden (asynchron, blockiert nicht die Response)
    sendWhatsAppNotification(newLead).catch(err =>
      console.error('WhatsApp-Benachrichtigung fehlgeschlagen:', err)
    );

    // Optional: E-Mail-Benachrichtigung senden
    sendEmailNotification(newLead).catch(err =>
      console.error('E-Mail-Benachrichtigung fehlgeschlagen:', err)
    );

    return NextResponse.json(
      {
        success: true,
        leadId: newLead.id,
        message: 'Lead erfolgreich erstellt'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const leads = await readLeads();

    // Optional: Filtern nach Status
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const filteredLeads = status
      ? leads.filter(lead => lead.status === status)
      : leads;

    // Sortieren nach Erstellungsdatum (neueste zuerst)
    const sortedLeads = filteredLeads.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(sortedLeads);

  } catch (error) {
    console.error('Error reading leads:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}

// PATCH für Status-Updates
export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Fehlende Parameter' },
        { status: 400 }
      );
    }

    const leads = await readLeads();
    const leadIndex = leads.findIndex(lead => lead.id === id);

    if (leadIndex === -1) {
      return NextResponse.json(
        { error: 'Lead nicht gefunden' },
        { status: 404 }
      );
    }

    leads[leadIndex].status = status;
    await writeLeads(leads);

    return NextResponse.json({ success: true, lead: leads[leadIndex] });

  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}

// WhatsApp-Benachrichtigung via 2chat API
async function sendWhatsAppNotification(lead: Lead) {
  const apiKey = process.env.TWOCHAT_API_KEY;
  const apiUrl = process.env.TWOCHAT_API_URL; // z.B. https://api.2chat.io/v1/send
  const toNumber = process.env.TWOCHAT_TARGET_NUMBER; // Deine WhatsApp-Nummer (mit Ländercode, z.B. 4917012345678)

  if (!apiKey || !apiUrl || !toNumber) {
    console.warn('2chat API nicht konfiguriert - WhatsApp-Benachrichtigung übersprungen');
    return;
  }

  // Lead-Daten formatieren
  const licenseLabels = {
    none: 'Keinen Führerschein',
    mofa: 'Mofa-Prüfbescheinigung',
    auto: 'Auto (Klasse B)',
    roller: 'Roller (Klasse AM)',
  };

  const usageLabels = {
    local: 'Innerorts / Nahbereich',
    distance: 'Auch Überlandfahrten',
  };

  const weatherProtectionLabels = {
    open: 'Offenes Fahrgefühl gewünscht',
    closed: 'Geschlossene Kabine bevorzugt',
  };

  const passengersLabels = {
    alone: 'Meistens allein',
    two: 'Oft zu zweit',
  };

  const availabilityLabels = {
    morning: 'Vormittags',
    afternoon: 'Nachmittags',
    both: 'Egal',
  };

  // Formatierte WhatsApp-Nachricht
  const message = `🎯 *NEUER LEAD - Elektroroller Futura*

👤 *Kontaktdaten:*
Name: ${lead.name}
Telefon: ${lead.phone}
Erreichbarkeit: ${availabilityLabels[lead.availability]}

📋 *Quiz-Antworten:*
Geburtsjahr: ${lead.quizAnswers.birthYear}${lead.quizAnswers.birthMonth && lead.quizAnswers.birthDay ? ` (${lead.quizAnswers.birthDay}.${lead.quizAnswers.birthMonth}.${lead.quizAnswers.birthYear})` : ''}
Führerschein: ${licenseLabels[lead.quizAnswers.license]}
Nutzung: ${usageLabels[lead.quizAnswers.usage]}
Wetterschutz: ${weatherProtectionLabels[lead.quizAnswers.weatherProtection]}
Personen: ${passengersLabels[lead.quizAnswers.passengers]}

✅ *Sales-Insights:*
${lead.isPre1965 ? '🎁 PRE-1965 VORTEIL: Kunde darf 25 km/h führerscheinfrei fahren!' : '📝 Post-1965: Mofa-Prüfbescheinigung für 25 km/h nötig'}
🚗 Empfehlung: ${lead.recommendedCategory === 'kabinenroller' ? 'KABINENROLLER (Wetterschutz oder zu zweit)' : 'ELEKTROMOBIL'}
${lead.prefersWeatherProtection ? '🏠 UPSELL: Kabinenroller mit Heizung empfehlen!' : '🌤️ Bevorzugt offenes Fahrgefühl'}

🔗 Lead-ID: ${lead.id}
⏰ Erstellt: ${new Date(lead.createdAt).toLocaleString('de-DE')}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-API-Key': apiKey,
      },
      body: JSON.stringify({
        to_number: toNumber,
        message: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('2chat API Fehler:', errorData);
      throw new Error(`2chat API Error: ${response.status}`);
    }

    console.log('WhatsApp-Benachrichtigung erfolgreich gesendet');
  } catch (error) {
    console.error('Fehler beim Senden der WhatsApp-Benachrichtigung:', error);
    // Fehler nicht durchreichen, damit Lead trotzdem gespeichert wird
  }
}

// E-Mail-Benachrichtigung (mit Quiz-Details)
async function sendEmailNotification(lead: Lead) {
  try {
    // Admin-Benachrichtigung senden
    await sendQuizLeadNotification(lead);

    // Kunden-Bestätigung mit Testergebnis senden
    if (lead.email) {
      await sendQuizResultToCustomer(lead);
    }
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
  }
}
