import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function GET() {
  const results: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL ? 'vercel' : 'local',
  };

  // 1. Check env vars
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  results.GOOGLE_SHEET_ID = sheetId ? `SET (${sheetId.substring(0, 8)}...)` : 'MISSING';
  results.GOOGLE_SERVICE_ACCOUNT_KEY = serviceAccountKey
    ? `SET (${serviceAccountKey.substring(0, 30)}...)`
    : 'MISSING';

  if (!sheetId || !serviceAccountKey) {
    results.error = 'Environment variables fehlen. Bitte im Vercel Dashboard setzen.';
    return NextResponse.json(results, { status: 500 });
  }

  // 2. Parse credentials
  let credentials;
  try {
    credentials = JSON.parse(serviceAccountKey);
    results.credentialsParsed = true;
    results.clientEmail = credentials.client_email || 'MISSING';
    results.projectId = credentials.project_id || 'MISSING';
    results.privateKeyPresent = !!credentials.private_key;
    results.privateKeyLength = credentials.private_key?.length || 0;
  } catch (err) {
    results.credentialsParsed = false;
    results.credentialsError = `JSON Parse Fehler: ${err instanceof Error ? err.message : String(err)}`;
    return NextResponse.json(results, { status: 500 });
  }

  // 3. Auth test
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });
    const client = await auth.getClient();
    results.authSuccess = true;
    results.authType = client.constructor.name;
  } catch (err) {
    results.authSuccess = false;
    results.authError = err instanceof Error ? err.message : String(err);
    return NextResponse.json(results, { status: 500 });
  }

  // 4. Sheets API test - read metadata
  try {
    const auth = new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
    const sheets = google.sheets({ version: 'v4', auth });

    const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    const sheetNames = meta.data.sheets?.map(s => s.properties?.title) || [];
    results.spreadsheetTitle = meta.data.properties?.title;
    results.sheetNames = sheetNames;
    results.hasQuizLeadsTab = sheetNames.includes('QuizLeads');
    results.hasAngeboteTab = sheetNames.includes('Angebote');

    if (!sheetNames.includes('QuizLeads')) {
      results.warning = 'Tab "QuizLeads" fehlt! Bitte in Google Sheets erstellen.';
    }
    if (!sheetNames.includes('Angebote')) {
      results.warning2 = 'Tab "Angebote" fehlt! Bitte in Google Sheets erstellen.';
    }
  } catch (err) {
    results.sheetsApiError = err instanceof Error ? err.message : String(err);
    if (String(err).includes('not found')) {
      results.hint = 'Spreadsheet nicht gefunden. GOOGLE_SHEET_ID pruefen.';
    } else if (String(err).includes('permission') || String(err).includes('403')) {
      results.hint = `Service Account hat keinen Zugriff. Bitte ${credentials.client_email} als Editor zum Sheet hinzufuegen.`;
    }
    return NextResponse.json(results, { status: 500 });
  }

  // 5. Write test
  try {
    const auth = new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'QuizLeads!A:O',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          new Date().toLocaleString('de-DE'),
          'DEBUG-TEST',
          'Test-Eintrag',
          '000000',
          'debug@test.de',
          '1990',
          'Test',
          'Nein',
          'Test',
          'Test',
          'Test',
          'Test',
          'Test',
          'test',
          'debug_test_' + Date.now(),
        ]],
      },
    });
    results.writeTest = 'ERFOLG - Test-Zeile wurde in QuizLeads geschrieben!';
  } catch (err) {
    results.writeTest = 'FEHLGESCHLAGEN';
    results.writeError = err instanceof Error ? err.message : String(err);
    return NextResponse.json(results, { status: 500 });
  }

  results.status = 'ALLES OK - Google Sheets Integration funktioniert!';
  return NextResponse.json(results);
}
