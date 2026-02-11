# Google Sheets Integration - Setup Anleitung

## Übersicht

Alle Leads (Quiz + Angebote) werden automatisch in eine Google Tabelle geschrieben.
Von dort können sie später in Ihr Lead-Management-System importiert werden.

---

## Schritt 1: Google Cloud Project erstellen

1. Gehen Sie zu https://console.cloud.google.com/
2. Klicken Sie oben auf "Projekt erstellen"
3. Name: "Elektroroller Futura Leads"
4. Klicken Sie auf "Erstellen"

---

## Schritt 2: Google Sheets API aktivieren

1. Im Google Cloud Console, gehen Sie zu "APIs & Services" > "Library"
2. Suchen Sie nach "Google Sheets API"
3. Klicken Sie auf "Google Sheets API"
4. Klicken Sie auf "Aktivieren"

---

## Schritt 3: Service Account erstellen

1. Gehen Sie zu "APIs & Services" > "Credentials"
2. Klicken Sie auf "Create Credentials" > "Service Account"
3. Name: "sheets-writer"
4. Klicken Sie auf "Create and Continue"
5. Role: "Editor" auswählen
6. Klicken Sie auf "Continue" > "Done"

---

## Schritt 4: Service Account Key erstellen

1. Klicken Sie auf den erstellten Service Account
2. Gehen Sie zum Tab "Keys"
3. Klicken Sie auf "Add Key" > "Create new key"
4. Format: **JSON** auswählen
5. Klicken Sie auf "Create"
6. Die JSON-Datei wird heruntergeladen - **SICHER AUFBEWAHREN!**

---

## Schritt 5: Google Sheets Tabelle erstellen

### A) Tabelle erstellen:

1. Gehen Sie zu https://sheets.google.com/
2. Erstellen Sie eine neue Tabelle
3. Benennen Sie sie: "Elektroroller Futura - Leads"

### B) Zwei Sheets erstellen:

**Sheet 1: "Quiz-Leads"**

Spalten (Zeile 1):
```
A: Datum | B: Typ | C: Name | D: Telefon | E: E-Mail | F: Geburtsjahr | G: Führerschein | H: Pre-1965 | I: Empfehlung | J: Nutzung | K: Wetterschutz | L: Personen | M: Erreichbarkeit | N: Status | O: Lead-ID
```

**Sheet 2: "Angebote"**

Spalten (Zeile 1):
```
A: Datum | B: Typ | C: Name | D: Telefon | E: E-Mail | F: PLZ | G: Modell | H: Nachricht | I: Status | J: Anfrage-ID
```

### C) Tabelle teilen:

1. Klicken Sie oben rechts auf "Teilen"
2. Kopieren Sie die **Service Account E-Mail** aus der JSON-Datei
   (Format: sheets-writer@projektname.iam.gserviceaccount.com)
3. Fügen Sie diese E-Mail ein
4. Rolle: **Editor**
5. Klicken Sie auf "Senden"

### D) Tabellen-ID kopieren:

Die URL sieht so aus:
```
https://docs.google.com/spreadsheets/d/IHRE_TABELLEN_ID/edit
```

Kopieren Sie **IHRE_TABELLEN_ID** (der lange Code zwischen /d/ und /edit)

---

## Schritt 6: Umgebungsvariablen setzen

### A) JSON-Key formatieren:

Öffnen Sie die heruntergeladene JSON-Datei.
Kopieren Sie den **gesamten Inhalt** (alles zwischen { und }).

### B) .env.local aktualisieren:

Öffnen Sie `.env.local` und fügen Sie hinzu:

```env
# Google Sheets Integration
GOOGLE_SHEET_ID=IHRE_TABELLEN_ID_HIER_EINFUEGEN
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
```

**Wichtig:**
- Bei `GOOGLE_SHEET_ID`: Tabellen-ID aus Schritt 5D einfügen
- Bei `GOOGLE_SERVICE_ACCOUNT_KEY`: Den **kompletten JSON-Inhalt** als **eine Zeile** einfügen (ohne Zeilenumbrüche!)

**Beispiel:**
```env
GOOGLE_SHEET_ID=1abc123XYZ-DEF456ghi789
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"elektroroller-futura-leads","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQI...","client_email":"sheets-writer@elektroroller-futura-leads.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token"}
```

---

## Schritt 7: API-Routen aktualisieren

Die Integration ist bereits vorbereitet! Sie müssen nur aktivieren:

### Quiz-Leads aktivieren:

Öffnen Sie `app/api/leads/route.ts` und fügen Sie hinzu:

```typescript
import { addQuizLeadToSheet } from '@/lib/google-sheets';

// In der POST-Funktion nach dem Speichern:
leads.push(newLead);
await writeLeads(leads);

// Google Sheets schreiben (asynchron)
addQuizLeadToSheet(newLead).catch(err =>
  console.error('Google Sheets Fehler:', err)
);
```

### Angebote aktivieren:

Öffnen Sie `app/api/offers/route.ts` und fügen Sie hinzu:

```typescript
import { addOfferToSheet } from '@/lib/google-sheets';

// In der POST-Funktion nach dem Speichern:
offers.push(newOffer);
await saveOffers(offers);

// Google Sheets schreiben (asynchron)
addOfferToSheet(newOffer).catch(err =>
  console.error('Google Sheets Fehler:', err)
);
```

---

## Schritt 8: Server neu starten

```bash
# Strg+C zum Stoppen
npm run dev
```

---

## Test

1. Füllen Sie das Quiz aus und senden Sie es ab
2. Oder fordern Sie ein Angebot an
3. Öffnen Sie Ihre Google Tabelle
4. Die neuen Einträge sollten automatisch in den entsprechenden Sheets erscheinen!

---

## Später: Export ins Lead-Management-System

### Option 1: Manueller CSV-Export
1. Öffnen Sie die Google Tabelle
2. Datei > Herunterladen > CSV
3. Importieren Sie die CSV in Ihr Lead-System

### Option 2: Zapier Integration
1. Verbinden Sie Google Sheets mit Zapier
2. Erstellen Sie einen Zap: "Neue Zeile in Google Sheets" → "Lead in CRM erstellen"
3. Automatische Synchronisation

### Option 3: Google Sheets API direkter Import
Ihr Lead-System kann direkt per API auf die Google Tabelle zugreifen.

---

## Fehlerbehebung

### "Google Sheets nicht konfiguriert"
→ Prüfen Sie, ob `GOOGLE_SHEET_ID` und `GOOGLE_SERVICE_ACCOUNT_KEY` in `.env.local` gesetzt sind

### "Permission denied"
→ Haben Sie die Service Account E-Mail als Editor zur Tabelle hinzugefügt?

### "Invalid credentials"
→ Prüfen Sie, ob der JSON-Key korrekt kopiert wurde (keine Zeilenumbrüche!)

### Leads erscheinen nicht in der Tabelle
1. Öffnen Sie die Konsole/Terminal
2. Schauen Sie nach Fehlermeldungen
3. Prüfen Sie die Sheet-Namen ("Quiz-Leads" und "Angebote" exakt so schreiben!)

---

## Sicherheitshinweise

⚠️ **NIEMALS** die Service Account JSON-Datei ins Git-Repository hochladen!
⚠️ Die `.env.local` ist bereits in `.gitignore` und wird nicht hochgeladen
✅ Bewahren Sie die JSON-Datei sicher auf (z.B. in einem Passwort-Manager)
