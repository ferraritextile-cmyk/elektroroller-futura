import { google } from 'googleapis';
import { Lead } from '@/types/lead';
import { OfferRequest } from '@/app/api/offers/route';

// Google Sheets Konfiguration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Authentifizierung mit Service Account
function getAuth() {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}');

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    return auth;
  } catch (error) {
    console.error('Google Sheets Auth Fehler:', error);
    return null;
  }
}

// Quiz-Lead in Google Sheets schreiben
export async function addQuizLeadToSheet(lead: Lead) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    console.warn('Google Sheets nicht konfiguriert - übersprungen');
    return false;
  }

  try {
    const auth = getAuth();
    if (!auth) return false;

    const sheets = google.sheets({ version: 'v4', auth });

    const licenseLabels: Record<string, string> = {
      none: 'Kein Führerschein',
      mofa: 'Mofa-Prüfbescheinigung',
      auto: 'Auto (Klasse B)',
      roller: 'Roller (Klasse AM)',
    };

    const values = [
      [
        new Date(lead.createdAt).toLocaleString('de-DE'), // Datum
        'Quiz', // Typ
        lead.name, // Name
        lead.phone, // Telefon
        lead.email || '', // E-Mail
        lead.quizAnswers.birthYear, // Geburtsjahr
        licenseLabels[lead.quizAnswers.license], // Führerschein
        lead.isPre1965 ? 'Ja' : 'Nein', // Pre-1965
        lead.recommendedCategory === 'kabinenroller' ? 'Kabinenroller' : 'Elektromobil', // Empfehlung
        lead.quizAnswers.usage === 'local' ? 'Innerorts' : 'Überlandfahrten', // Nutzung
        lead.quizAnswers.weatherProtection === 'closed' ? 'Geschlossen' : 'Offen', // Wetterschutz
        lead.quizAnswers.passengers === 'two' ? 'Zu zweit' : 'Allein', // Personen
        lead.availability === 'morning' ? 'Vormittags' : lead.availability === 'afternoon' ? 'Nachmittags' : 'Egal', // Erreichbarkeit
        lead.status, // Status
        lead.id, // Lead-ID
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'QuizLeads!A:O', // Sheet-Name: QuizLeads
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    console.log('Quiz-Lead erfolgreich in Google Sheets eingetragen');
    return true;
  } catch (error) {
    console.error('Fehler beim Schreiben in Google Sheets:', error);
    return false;
  }
}

// Angebot-Lead in Google Sheets schreiben
export async function addOfferToSheet(offer: OfferRequest) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!spreadsheetId) {
    console.warn('Google Sheets nicht konfiguriert - übersprungen');
    return false;
  }

  try {
    const auth = getAuth();
    if (!auth) return false;

    const sheets = google.sheets({ version: 'v4', auth });

    const values = [
      [
        new Date(offer.createdAt).toLocaleString('de-DE'), // Datum
        'Angebot', // Typ
        `${offer.firstName} ${offer.lastName}`, // Name
        offer.phone, // Telefon
        offer.email, // E-Mail
        offer.postalCode, // PLZ
        offer.selectedModel, // Gewähltes Modell
        offer.message || '', // Nachricht
        offer.status, // Status
        offer.id, // Anfrage-ID
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Angebote!A:J', // Sheet-Name: Angebote
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    console.log('Angebot erfolgreich in Google Sheets eingetragen');
    return true;
  } catch (error) {
    console.error('Fehler beim Schreiben in Google Sheets:', error);
    return false;
  }
}
