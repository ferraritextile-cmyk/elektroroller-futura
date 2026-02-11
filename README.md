# Elektroroller Futura - Lead-Generierungs-Landingpage

High-Performance Landingpage mit integriertem Lead-Qualifizierungs-Quiz für Elektromobile und Kabinenroller.

## 🚀 Features

- **Mobile-First Design** mit Tailwind CSS
- **Senioren-freundliche UI** (große Schriften, hoher Kontrast, große Touch-Targets)
- **Interaktives 5-Fragen-Quiz** mit intelligenter Logik
- **Automatische Lead-Qualifizierung** basierend auf Geburtsjahr, Führerschein, etc.
- **Sales-optimierte Admin-Ansicht** mit Handlungsempfehlungen
- **API-ready** für Integration mit externer Lead-Software

## 📋 Voraussetzungen

- Node.js 18+ und npm
- Webbrowser (Chrome, Firefox, Safari, Edge)

## 🛠️ Installation

1. **Dependencies installieren:**

```bash
cd elektroroller-futura
npm install
```

2. **Entwicklungsserver starten:**

```bash
npm run dev
```

3. **Im Browser öffnen:**

Navigieren Sie zu [http://localhost:3000](http://localhost:3000)

Die Admin-Ansicht finden Sie unter [http://localhost:3000/admin/leads](http://localhost:3000/admin/leads)

## 📸 Fotos einfügen

Die Landingpage enthält Platzhalter für folgende Bilder. Ersetzen Sie diese durch Ihre eigenen Produktfotos:

### Benötigte Bilder:

1. **Hero-Section:**
   - Pfad: `/public/images/vita-care-4000-hero.jpg`
   - Format: 4:3 Seitenverhältnis
   - Empfohlene Größe: 1200x900px
   - Inhalt: Vita Care 4000 in einer Straßenszene

2. **15 km/h Zulassung:**
   - Pfad: `/public/images/15kmh-zulassung.jpg`
   - Format: 3:2 Seitenverhältnis
   - Empfohlene Größe: 900x600px
   - Inhalt: Zulassungsdokument oder Nahaufnahme des Kennzeichens

3. **Produktbilder:**
   - `/public/images/vita-care-1000.jpg` (4:3, 1200x900px)
   - `/public/images/vita-care-4000.jpg` (4:3, 1200x900px)

### So fügen Sie Bilder ein:

1. Erstellen Sie den Ordner `public/images` falls noch nicht vorhanden
2. Kopieren Sie Ihre Bilder in diesen Ordner
3. Benennen Sie die Dateien entsprechend der oben genannten Pfade
4. Die Bilder werden automatisch geladen

## 🔗 API-Anbindung an Ihre Lead-Software

### Google Sheets Integration (Beispiel)

1. **Google Sheets API aktivieren:**
   - Gehen Sie zu [Google Cloud Console](https://console.cloud.google.com/)
   - Erstellen Sie ein neues Projekt
   - Aktivieren Sie die Google Sheets API
   - Erstellen Sie Service Account Credentials

2. **Code anpassen:**

In `app/api/leads/route.ts` finden Sie die Funktion `sendToLeadSoftware()`. Entfernen Sie die Kommentare und passen Sie sie an:

```typescript
async function sendToGoogleSheets(lead: Lead) {
  const { GoogleSpreadsheet } = require('google-spreadsheet');
  const { JWT } = require('google-auth-library');

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow({
    'Timestamp': new Date().toISOString(),
    'Name': lead.name,
    'Telefon': lead.phone,
    'Erreichbarkeit': lead.availability,
    'Geburtsjahr': lead.quizAnswers.birthYear,
    'Führerschein': lead.quizAnswers.license,
    'Pre-1965': lead.isPre1965 ? 'JA' : 'NEIN',
    'Empfehlung': lead.recommendedCategory,
    'Needs Cover': lead.needsCover ? 'JA' : 'NEIN',
  });
}
```

3. **Environment Variables setzen:**

Erstellen Sie eine `.env.local` Datei:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=ihre-service-account@email.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=ihre-google-sheet-id
```

### Andere Lead-Software (CRM, etc.)

Ersetzen Sie die Funktion `sendToLeadSoftware()` durch einen API-Call zu Ihrer Software:

```typescript
async function sendToLeadSoftware(lead: Lead) {
  const response = await fetch('https://ihre-crm-software.com/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CRM_API_KEY}`,
    },
    body: JSON.stringify({
      name: lead.name,
      phone: lead.phone,
      // ... weitere Felder
    }),
  });
}
```

## 📱 Telefonnummer-Validierung

Die Telefonnummer-Validierung ist bereits implementiert. Die Regex prüft:

- Mindestens 8 Zeichen
- Erlaubt: Ziffern, Leerzeichen, +, -, /, (, )

Beispiele gültiger Nummern:
- `0123 456789`
- `+49 123 456789`
- `(030) 12345678`

## 🎨 Design anpassen

### Farben ändern:

Bearbeiten Sie `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#IHR_BLAU',
    600: '#IHR_DUNKLERES_BLAU',
    // ...
  },
}
```

### Schriftgrößen anpassen:

In `app/globals.css` können Sie die Basis-Schriftgröße ändern:

```css
body {
  font-size: 18px; /* Ändern Sie diesen Wert */
}
```

## 🧪 Testing

### Testlead erstellen:

1. Öffnen Sie [http://localhost:3000](http://localhost:3000)
2. Durchlaufen Sie das Quiz
3. Geben Sie Testdaten ein
4. Prüfen Sie die Admin-Ansicht unter [http://localhost:3000/admin/leads](http://localhost:3000/admin/leads)

### Lead-Daten prüfen:

Die Leads werden lokal in `data/leads.json` gespeichert (wird automatisch erstellt).

## 🚀 Deployment

### Vercel (empfohlen):

1. Push zu GitHub
2. Verbinden Sie Ihr Repository mit [Vercel](https://vercel.com)
3. Setzen Sie Environment Variables in Vercel Dashboard
4. Deploy!

### Eigener Server:

```bash
npm run build
npm start
```

## 📊 Lead-Verwaltung

### Admin-Dashboard:

- URL: `/admin/leads`
- Features:
  - Filtern nach Status (Neu, Kontaktiert, Qualifiziert, Abgeschlossen)
  - Sales-Strategie-Hinweise (Pre-1965 Vorteil, Kabinenroller-Empfehlung, etc.)
  - Ein-Klick Status-Updates
  - Kundenprofil mit allen Quiz-Antworten

### Sales-Insights:

Für jeden Lead zeigt das Dashboard automatisch:

- ✅ **Pre-1965 Vorteil**: Wenn Kunde vor 1965 geboren → 25 km/h führerscheinfrei
- ⚠️ **Führerschein-Situation**: Empfehlungen basierend auf Führerscheinstatus
- 👥 **Kabinenroller-Interessent**: Wenn zu zweit unterwegs
- 🅿️ **Upsell-Chance**: Regenschutzplane für Laternenparker

## 🔒 Datenschutz

- Leads werden lokal gespeichert (oder in Ihrer konfigurierten Datenbank)
- Keine Cookies oder Tracking (außer Sie fügen es hinzu)
- DSGVO-konformer Disclaimer im Formular enthalten

## 📞 Support

Bei Fragen oder Problemen:

1. Überprüfen Sie die Konsole auf Fehlermeldungen (`npm run dev`)
2. Stellen Sie sicher, dass alle Dependencies installiert sind (`npm install`)
3. Prüfen Sie, ob alle Bilder vorhanden sind

## 🎯 Next Steps

1. ✅ Fotos einfügen (siehe oben)
2. ✅ API-Anbindung konfigurieren (Google Sheets oder CRM)
3. ✅ Farben an Ihr Corporate Design anpassen
4. ✅ Telefonnummer und Kontaktdaten im Footer anpassen
5. ✅ Deployment auf Vercel oder eigenem Server

## 📝 Lizenz

Dieses Projekt wurde für Elektroroller Futura entwickelt.

---

**Viel Erfolg mit Ihrer Lead-Generierung! 🚀**
