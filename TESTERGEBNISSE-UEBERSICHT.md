# Übersicht aller möglichen Testergebnisse

## Wie die Empfehlung berechnet wird:

**Kabinenroller wird empfohlen wenn:**
- Kunde fährt zu zweit (passengers === 'two') ODER
- Kunde bevorzugt geschlossene Kabine (weatherProtection === 'closed')

**Sonst: Elektromobil**

---

## Haupt-Testergebnisse (6 Varianten)

### ✅ Variante 1: Pre-1965 + Elektromobil
**Bedingungen:**
- Geboren vor 01.04.1965
- Fährt meistens allein
- Bevorzugt offenes Fahrgefühl

**E-Mail-Inhalt:**
- **Empfehlung:** 🛵 Elektromobil - Kompakt und wendig für Einzelfahrten
- **Geschwindigkeit:** 25 km/h - Führerscheinfrei für Sie!
- **Besonderer Vorteil:** ✨ Sie wurden vor dem 01.04.1965 geboren! Das bedeutet: Sie dürfen 25 km/h Modelle komplett führerscheinfrei fahren!

**Wo bearbeiten:** `/lib/email.ts` - Funktion `sendQuizResultToCustomer`

---

### ✅ Variante 2: Pre-1965 + Kabinenroller
**Bedingungen:**
- Geboren vor 01.04.1965
- Fährt zu zweit ODER bevorzugt geschlossene Kabine

**E-Mail-Inhalt:**
- **Empfehlung:** 🚗 Kabinenroller - Perfekt für Wetterschutz und 2 Personen
- **Geschwindigkeit:** 25 km/h - Führerscheinfrei für Sie!
- **Besonderer Vorteil:** ✨ Sie wurden vor dem 01.04.1965 geboren! Das bedeutet: Sie dürfen 25 km/h Modelle komplett führerscheinfrei fahren!

---

### ⚠️ Variante 3: Post-1965 + Kein Führerschein + Elektromobil
**Bedingungen:**
- Geboren ab 01.04.1965
- Kein Führerschein (license === 'none')
- Fährt meistens allein
- Bevorzugt offenes Fahrgefühl

**E-Mail-Inhalt:**
- **Empfehlung:** 🛵 Elektromobil - Kompakt und wendig für Einzelfahrten
- **Geschwindigkeit:**
  - 15 km/h: Führerscheinfrei ab 15 Jahren
  - 25 km/h: Mofa-Prüfbescheinigung erforderlich
- **Info-Box:** ℹ️ Für 15 km/h: Führerscheinfrei ab 15 Jahren / Für 25 km/h: Mofa-Prüfbescheinigung erforderlich

---

### ⚠️ Variante 4: Post-1965 + Kein Führerschein + Kabinenroller
**Bedingungen:**
- Geboren ab 01.04.1965
- Kein Führerschein (license === 'none')
- Fährt zu zweit ODER bevorzugt geschlossene Kabine

**E-Mail-Inhalt:**
- **Empfehlung:** 🚗 Kabinenroller - Perfekt für Wetterschutz und 2 Personen
- **Geschwindigkeit:**
  - 15 km/h: Führerscheinfrei ab 15 Jahren
  - 25 km/h: Mofa-Prüfbescheinigung erforderlich
- **Info-Box:** ℹ️ Für 15 km/h: Führerscheinfrei ab 15 Jahren / Für 25 km/h: Mofa-Prüfbescheinigung erforderlich

---

### 🚗 Variante 5: Post-1965 + Auto-Führerschein + Elektromobil
**Bedingungen:**
- Geboren ab 01.04.1965
- Hat Autoführerschein (license === 'auto')
- Fährt meistens allein
- Bevorzugt offenes Fahrgefühl

**E-Mail-Inhalt:**
- **Empfehlung:** 🛵 Elektromobil - Kompakt und wendig für Einzelfahrten
- **Geschwindigkeit:** Bis zu 45 km/h möglich mit Ihrem Führerschein
- **Info-Box:** ✅ Mit Ihrem Autoführerschein dürfen Sie alle Modelle bis 45 km/h fahren!

---

### 🚗 Variante 6: Post-1965 + Auto-Führerschein + Kabinenroller
**Bedingungen:**
- Geboren ab 01.04.1965
- Hat Autoführerschein (license === 'auto')
- Fährt zu zweit ODER bevorzugt geschlossene Kabine

**E-Mail-Inhalt:**
- **Empfehlung:** 🚗 Kabinenroller - Perfekt für Wetterschutz und 2 Personen
- **Geschwindigkeit:** Bis zu 45 km/h möglich mit Ihrem Führerschein
- **Info-Box:** ✅ Mit Ihrem Autoführerschein dürfen Sie alle Modelle bis 45 km/h fahren!

---

## Profil-Zusammenfassung (in allen E-Mails)

### Führerschein-Labels:
- `none` → "Kein Führerschein"
- `mofa` → "Mofa-Prüfbescheinigung"
- `auto` → "Auto (Klasse B)"
- `roller` → "Roller (Klasse AM)"

### Nutzung:
- `local` → "Innerorts / Nahbereich"
- `distance` → "Auch Überlandfahrten"

### Wetterschutz:
- `open` → "Offenes Fahrgefühl gewünscht"
- `closed` → "Geschlossene Kabine bevorzugt"

### Sitzplätze:
- `alone` → "1 Sitzplatz"
- `two` → "2 Sitzplätze"

---

## Wo die Texte bearbeitet werden können:

### Datei: `/lib/email.ts`
### Funktion: `sendQuizResultToCustomer(lead: Lead)`

**Zeilen zum Bearbeiten:**

1. **Produktempfehlung-Text:**
   ```typescript
   const recommendationText = lead.recommendedCategory === 'kabinenroller'
     ? 'Kabinenroller - Perfekt für Wetterschutz und 2 Personen'
     : 'Elektromobil - Kompakt und wendig für Einzelfahrten';
   ```

2. **Geschwindigkeits-Empfehlung:**
   ```typescript
   const speedRecommendation = lead.isPre1965
     ? '25 km/h - Führerscheinfrei für Sie!'
     : lead.quizAnswers.license === 'auto'
       ? 'Bis zu 45 km/h möglich mit Ihrem Führerschein'
       : '15 km/h (führerscheinfrei) oder 25 km/h (mit Mofa-Prüfbescheinigung)';
   ```

3. **Pre-1965 Info-Box (Zeile ~320):**
   ```html
   <strong>Sie wurden vor dem 01.04.1965 geboren!</strong><br>
   Das bedeutet: Sie dürfen 25 km/h Modelle <strong>komplett führerscheinfrei</strong> fahren!
   ```

4. **Post-1965 Info-Box (Zeile ~330):**
   ```typescript
   ${lead.quizAnswers.license === 'auto'
     ? 'Mit Ihrem Autoführerschein dürfen Sie alle Modelle bis 45 km/h fahren!'
     : 'Für 15 km/h: Führerscheinfrei ab 15 Jahren<br>Für 25 km/h: Mofa-Prüfbescheinigung erforderlich'}
   ```

---

## Beispiel-Anpassung:

Wenn Sie z.B. den Text für Pre-1965 Kabinenroller ändern möchten:

**Aktuell:**
> "Kabinenroller - Perfekt für Wetterschutz und 2 Personen"

**Ändern in (Beispiel):**
> "Kabinenroller - Ihr wetterfester Begleiter mit Platz für zwei Personen und voller Heizung"

Einfach in `/lib/email.ts` anpassen und Server neu starten!

---

## Test-Szenarien zum Durchspielen:

### Test 1: Klassischer Senior (Pre-1965)
- Geburtsjahr: 1950
- Führerschein: Auto
- Nutzung: Innerorts
- Wetterschutz: Geschlossen
- Personen: Allein
→ **Ergebnis:** Kabinenroller, 25 km/h führerscheinfrei

### Test 2: Jüngerer ohne Führerschein
- Geburtsjahr: 1980
- Führerschein: Keinen
- Nutzung: Überlandfahrten
- Wetterschutz: Offen
- Personen: Allein
→ **Ergebnis:** Elektromobil, 15 km/h oder 25 km/h mit Mofa

### Test 3: Mit Autoführerschein, zu zweit
- Geburtsjahr: 1975
- Führerschein: Auto
- Nutzung: Innerorts
- Wetterschutz: Geschlossen
- Personen: Zu zweit
→ **Ergebnis:** Kabinenroller, bis 45 km/h möglich
