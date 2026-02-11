import nodemailer from 'nodemailer';
import path from 'path';
import { Lead } from '@/types/lead';

// E-Mail-Konfiguration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true für 465, false für andere Ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Interface für Angebots-Daten
interface OfferEmailData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  postalCode: string;
  selectedModel: string;
  message?: string;
}

// E-Mail an Admin senden (Sie erhalten die Anfrage)
export async function sendOfferNotificationToAdmin(data: OfferEmailData) {
  const mailOptions = {
    from: `"E-Mobil Beratung" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || 'info@elektroroller-futura.de',
    subject: `🎁 Neue Angebotsanfrage: ${data.selectedModel}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0d9488;">Neue Angebotsanfrage eingegangen!</h2>

        <div style="background-color: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0d9488; margin-top: 0;">Gewünschtes Modell:</h3>
          <p style="font-size: 18px; font-weight: bold; color: #134e4a;">${data.selectedModel}</p>
        </div>

        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
          <h3 style="color: #374151;">Kontaktdaten:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Name:</td>
              <td style="padding: 8px 0;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Telefon:</td>
              <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #0d9488;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">E-Mail:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #0d9488;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">PLZ:</td>
              <td style="padding: 8px 0;">${data.postalCode}</td>
            </tr>
          </table>
        </div>

        ${data.message ? `
        <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <h3 style="color: #92400e; margin-top: 0;">Nachricht:</h3>
          <p style="white-space: pre-wrap; color: #78350f;">${data.message}</p>
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Diese Anfrage wurde über die Website elektroroller-futura.de gesendet.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin-Benachrichtigung gesendet');
    return true;
  } catch (error) {
    console.error('Fehler beim Senden der Admin-E-Mail:', error);
    return false;
  }
}

// Bestätigungs-E-Mail an Kunden senden
export async function sendOfferConfirmationToCustomer(data: OfferEmailData) {
  const imgDir = path.join(process.cwd(), 'public', 'images');

  // Produktbild und Details anhand des Modellnamens (mit CID für E-Mail-Einbettung)
  const productMap: Record<string, { file: string; speed: string; highlights: string[] }> = {
    'Vita Care 4000 (15 km/h)': {
      file: 'vita-care-4000.jpg',
      speed: '15 km/h',
      highlights: ['Komplett führerscheinfrei', '4 Räder, sicher und stabil', 'Straßenzugelassen in ganz DE'],
    },
    'Vita Care 1000 (25 km/h)': {
      file: 'vita-care-1000.jpg',
      speed: '25 km/h',
      highlights: ['Bis zu 90 km Reichweite', 'Wendig und kompakt', 'Führerscheinfrei (geb. vor 01.04.1965)'],
    },
    'Neo E-Mobil (45 km/h)': {
      file: 'neo-e-mobil.jpg',
      speed: '45 km/h',
      highlights: ['Kraftvoll auf der Straße', 'Große Reichweite', 'Mit Führerschein AM oder B'],
    },
    'Kabinenroller Cruise (25 km/h)': {
      file: 'kabinenroller-cruise.jpg',
      speed: '25 km/h',
      highlights: ['Geschlossene Kabine mit Heizung', '2 Sitzplätze', 'Führerscheinfrei (geb. vor 01.04.1965)'],
    },
    'Kabinenroller Flow (45 km/h)': {
      file: 'kabinenroller-flow.jpg',
      speed: '45 km/h',
      highlights: ['Wie ein kleines Auto', 'Heizung & Scheibenwischer', '2 Sitzplätze, voller Komfort'],
    },
  };

  const product = productMap[data.selectedModel] || null;

  // Nodemailer-Attachments für CID-Einbettung (Produkt + Beraterfoto)
  const attachments = [
    ...(product ? [{ filename: product.file, path: path.join(imgDir, product.file), cid: 'offerproduct' }] : []),
    { filename: 'berater-foto.jpg', path: path.join(imgDir, 'berater-foto.jpg'), cid: 'beraterfoto' },
  ];

  // Produktbild-HTML (mit cid: für eingebettetes Bild)
  const productImageHtml = product
    ? `
      <div style="margin: 28px 0; border: 2px solid #0d9488; border-radius: 12px; overflow: hidden; background: #fff;">
        <img src="cid:offerproduct" alt="${data.selectedModel}" style="width: 100%; height: auto; display: block;" />
        <div style="padding: 20px;">
          <h3 style="margin: 0 0 4px 0; font-size: 22px; color: #0a2540;">${data.selectedModel}</h3>
          <p style="margin: 0 0 16px 0; font-size: 15px; color: #0d9488; font-weight: bold;">${product.speed}</p>
          <table style="width: 100%; border-collapse: collapse;">
            ${product.highlights.map(h => `
            <tr>
              <td style="padding: 6px 8px 6px 0; vertical-align: top; width: 20px; color: #10b981; font-size: 16px;">&#10003;</td>
              <td style="padding: 6px 0; font-size: 15px; color: #374151;">${h}</td>
            </tr>
            `).join('')}
          </table>
        </div>
      </div>
    `
    : '';

  const mailOptions = {
    from: `"E-Mobil Beratung" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Ihre Anfrage zum ${data.selectedModel} - wir melden uns bei Ihnen`,
    attachments,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0a2540 0%, #0d4f4f 50%, #0d9488 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <p style="margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8;">E-Mobil Beratung</p>
          <h1 style="margin: 0; font-size: 28px;">Ihre Anfrage ist bei uns!</h1>
        </div>

        <div style="padding: 32px 30px; background-color: #ffffff;">

          <!-- Begrüßung -->
          <p style="font-size: 18px; color: #374151; margin: 0 0 16px 0;">Hallo ${data.firstName},</p>

          <p style="font-size: 16px; color: #4b5563; line-height: 1.7; margin: 0 0 16px 0;">
            schön, dass Sie sich für den <strong style="color: #0d9488;">${data.selectedModel}</strong> interessieren.
            Ihre Anfrage ist eingegangen und ein Berater wird sich persönlich bei Ihnen melden.
          </p>

          <!-- Produktbild -->
          ${productImageHtml}

          <!-- Ihre Anfrage -->
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 12px; margin: 24px 0;">
            <h3 style="color: #374151; margin: 0 0 12px 0; font-size: 18px;">Ihre Anfrage im Überblick</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280; width: 140px;">Modell:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.selectedModel}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #6b7280;">Telefon:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #374151;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #6b7280;">Postleitzahl:</td>
                <td style="padding: 10px 0; color: #374151;">${data.postalCode}</td>
              </tr>
            </table>
          </div>

          ${data.message ? `
          <div style="background-color: #f0fdfa; padding: 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #0d9488;">
            <h3 style="color: #134e4a; margin: 0 0 8px 0; font-size: 16px;">Ihre Nachricht:</h3>
            <p style="color: #0f766e; margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          ` : ''}

          <!-- Was im Telefonat passiert -->
          <div style="background-color: #eff6ff; padding: 28px; border-radius: 12px; margin: 28px 0;">
            <h3 style="color: #1e3a8a; margin: 0 0 16px 0; font-size: 20px;">Was Sie in Ihrem Beratungsgespräch erwartet</h3>
            <p style="font-size: 16px; color: #1e40af; margin: 0 0 16px 0; line-height: 1.7;">
              Einer unserer Berater ruft Sie in Kürze an. Das Gespräch ist kostenlos und unverbindlich.
            </p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 12px 10px 0; vertical-align: top; width: 28px; font-size: 18px;">1.</td>
                <td style="padding: 10px 0; font-size: 15px; color: #374151; line-height: 1.6; border-bottom: 1px solid #dbeafe;">
                  <strong>Ihre Fragen zum ${data.selectedModel}</strong> - Ausstattung, Reichweite, Geschwindigkeit, Lademöglichkeiten.
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 12px 10px 0; vertical-align: top; width: 28px; font-size: 18px;">2.</td>
                <td style="padding: 10px 0; font-size: 15px; color: #374151; line-height: 1.6; border-bottom: 1px solid #dbeafe;">
                  <strong>Fahrerlaubnis klären</strong> - Was dürfen Sie fahren? Brauchen Sie einen Führerschein? Wir erklären alles verständlich.
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 12px 10px 0; vertical-align: top; width: 28px; font-size: 18px;">3.</td>
                <td style="padding: 10px 0; font-size: 15px; color: #374151; line-height: 1.6; border-bottom: 1px solid #dbeafe;">
                  <strong>Ihr individuelles Angebot</strong> - Preis, aktuelle Aktionen und Verfügbarkeit in Ihrer Region (PLZ ${data.postalCode}).
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 12px 10px 0; vertical-align: top; width: 28px; font-size: 18px;">4.</td>
                <td style="padding: 10px 0; font-size: 15px; color: #374151; line-height: 1.6;">
                  <strong>Finanzierung &amp; Zuschüsse</strong> - Ratenzahlung, Fördermöglichkeiten und alles Weitere.
                </td>
              </tr>
            </table>
          </div>

          <!-- Vertrauen aufbauen -->
          <div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); padding: 28px; border-radius: 12px; margin: 28px 0; border: 1px solid #fbbf24;">
            <h3 style="color: #78350f; margin: 0 0 12px 0; font-size: 20px;">Kein Druck, kein Kleingedrucktes</h3>
            <p style="font-size: 16px; color: #92400e; margin: 0; line-height: 1.7;">
              Das Gespräch ist eine ehrliche Beratung. Wir beantworten Ihre Fragen, erstellen Ihnen ein Angebot
              und Sie entscheiden in Ruhe. Ohne Zeitdruck, ohne Verpflichtung.
            </p>
          </div>

          <!-- Jetzt schon anrufen -->
          <div style="text-align: center; margin: 32px 0; padding: 28px; background-color: #f0fdfa; border-radius: 12px;">
            <p style="font-size: 16px; color: #374151; margin: 0 0 12px 0;">
              Sie möchten nicht warten? Rufen Sie uns direkt an:
            </p>
            <a href="tel:06747950060" style="display: inline-block; background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-size: 20px; font-weight: bold;">
              06747 950060
            </a>
            <p style="font-size: 14px; color: #6b7280; margin: 12px 0 0 0;">
              Mo-Fr: 08:00-12:00 &amp; 13:00-17:00 Uhr
            </p>
          </div>

          <!-- Abschied mit Beraterfoto -->
          <table style="width: 100%; margin: 28px 0 0 0;">
            <tr>
              <td style="width: 80px; vertical-align: top; padding-right: 16px;">
                <img src="cid:beraterfoto" alt="Ihr Berater" style="width: 72px; height: 72px; border-radius: 50%; object-fit: cover; display: block; border: 2px solid #0d9488;" />
              </td>
              <td style="vertical-align: top;">
                <p style="font-size: 16px; color: #4b5563; line-height: 1.7; margin: 0 0 4px 0;">
                  Wir freuen uns auf das Gespräch mit Ihnen, ${data.firstName}!
                </p>
                <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0;">
                  Herzliche Grüße<br>
                  <strong>Ihr E-Mobil Beratungsteam</strong>
                </p>
              </td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="background-color: #0a2540; padding: 24px 30px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #94a3b8; font-size: 13px; margin: 0; line-height: 1.6;">
            E-Mobil Beratung &bull; Am Stadion 4 &bull; 56281 Emmelshausen<br>
            Tel: 06747 950060 &bull; Geprüfter Fachhändler
          </p>
        </div>

      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Bestätigungs-E-Mail an Kunden gesendet');
    return true;
  } catch (error) {
    console.error('Fehler beim Senden der Kunden-E-Mail:', error);
    return false;
  }
}

// E-Mail-Benachrichtigung für Quiz-Leads (mit Mobilitätsfragen)
export async function sendQuizLeadNotification(lead: Lead) {
  const licenseLabels: Record<string, string> = {
    none: 'Kein Führerschein',
    mofa: 'Mofa-Prüfbescheinigung',
    auto: 'Auto (Klasse B)',
    roller: 'Roller (Klasse AM)',
  };

  const usageLabels: Record<string, string> = {
    local: 'Innerorts / Nahbereich',
    distance: 'Auch Überlandfahrten',
  };

  const weatherProtectionLabels: Record<string, string> = {
    open: 'Offenes Fahrgefühl gewünscht',
    closed: 'Geschlossene Kabine bevorzugt',
  };

  const passengersLabels: Record<string, string> = {
    alone: 'Meistens allein',
    two: 'Oft zu zweit',
  };

  const availabilityLabels: Record<string, string> = {
    morning: '🌅 Vormittags',
    afternoon: '☀️ Nachmittags',
    both: '⏰ Ganztags',
  };

  const mailOptions = {
    from: `"E-Mobil Beratung" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || 'haendler@e-scooter-futura.de',
    subject: `🎯 Neuer Quiz-Lead: ${lead.name} (${lead.recommendedCategory === 'kabinenroller' ? 'Kabinenroller' : 'Elektromobil'})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0d9488;">🎯 Neuer Lead über Quiz-Formular!</h2>

        ${lead.isPre1965 ? `
        <div style="background-color: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
          <h3 style="color: #065f46; margin-top: 0;">✅ PRE-1965 VORTEIL!</h3>
          <p style="font-size: 16px; color: #047857; margin: 0;">
            <strong>Kunde darf 25 km/h Modelle führerscheinfrei fahren!</strong><br>
            Fokus auf Führerscheinfreiheit legen in der Beratung.
          </p>
        </div>
        ` : `
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin-top: 0;">ℹ️ Post-1965</h3>
          <p style="font-size: 16px; color: #78350f; margin: 0;">
            Für 25 km/h: Mofa-Prüfbescheinigung oder Führerschein AM/B nötig
          </p>
        </div>
        `}

        <div style="background-color: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0d9488; margin-top: 0;">📊 Empfehlung basierend auf Quiz:</h3>
          <p style="font-size: 18px; font-weight: bold; color: #134e4a;">
            ${lead.recommendedCategory === 'kabinenroller' ? '🚗 KABINENROLLER' : '🛵 ELEKTROMOBIL'}
          </p>
          ${lead.prefersWeatherProtection ? `
          <p style="color: #0f766e; margin: 10px 0 0 0;">
            💡 <strong>Upsell-Chance:</strong> Kunde wünscht Wetterschutz → Kabinenroller mit Heizung präsentieren!
          </p>
          ` : ''}
        </div>

        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">👤 Kontaktdaten:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Name:</td>
              <td style="padding: 8px 0;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Telefon:</td>
              <td style="padding: 8px 0;"><a href="tel:${lead.phone}" style="color: #0d9488; font-weight: bold;">${lead.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Erreichbarkeit:</td>
              <td style="padding: 8px 0;">${availabilityLabels[lead.availability]}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">📋 Quiz-Antworten:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #dbeafe;">
              <td style="padding: 8px 0; font-weight: bold; color: #1e3a8a;">Geburtsdatum:</td>
              <td style="padding: 8px 0;">
                ${lead.quizAnswers.birthDay && lead.quizAnswers.birthMonth
                  ? `${lead.quizAnswers.birthDay}.${lead.quizAnswers.birthMonth}.${lead.quizAnswers.birthYear}`
                  : lead.quizAnswers.birthYear}
                ${lead.isPre1965 ? '<strong style="color: #10b981;"> (⭐ Pre-1965)</strong>' : ''}
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #dbeafe;">
              <td style="padding: 8px 0; font-weight: bold; color: #1e3a8a;">Führerschein:</td>
              <td style="padding: 8px 0;">${licenseLabels[lead.quizAnswers.license]}</td>
            </tr>
            <tr style="border-bottom: 1px solid #dbeafe;">
              <td style="padding: 8px 0; font-weight: bold; color: #1e3a8a;">Nutzung:</td>
              <td style="padding: 8px 0;">${usageLabels[lead.quizAnswers.usage]}</td>
            </tr>
            <tr style="border-bottom: 1px solid #dbeafe;">
              <td style="padding: 8px 0; font-weight: bold; color: #1e3a8a;">Wetterschutz:</td>
              <td style="padding: 8px 0;">${weatherProtectionLabels[lead.quizAnswers.weatherProtection]}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e3a8a;">Personen:</td>
              <td style="padding: 8px 0;">${passengersLabels[lead.quizAnswers.passengers]}</td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            <strong>Lead-ID:</strong> ${lead.id}<br>
            <strong>Erstellt:</strong> ${new Date(lead.createdAt).toLocaleString('de-DE')}<br>
            Über: Quiz-Formular (Mobilitätsfragen)
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Quiz-Lead-Benachrichtigung gesendet');
    return true;
  } catch (error) {
    console.error('Fehler beim Senden der Quiz-Lead-E-Mail:', error);
    return false;
  }
}

// Bestätigungs-E-Mail an Quiz-Kunden (mit Testergebnis)
export async function sendQuizResultToCustomer(lead: Lead) {
  if (!lead.email) {
    console.warn('Keine E-Mail-Adresse vorhanden - Kunden-E-Mail übersprungen');
    return false;
  }

  const isKabinenroller = lead.recommendedCategory === 'kabinenroller';
  const imgDir = path.join(process.cwd(), 'public', 'images');

  // Produktbilder je nach Empfehlung (mit CID für E-Mail-Einbettung)
  const productImages = isKabinenroller
    ? [
        { name: 'Kabinenroller Cruise', speed: '25 km/h', file: 'kabinenroller-cruise.jpg', cid: 'product1', desc: 'Geschlossene Kabine mit Heizung, 2 Sitzplätze' },
        { name: 'Kabinenroller Flow', speed: '45 km/h', file: 'kabinenroller-flow.jpg', cid: 'product2', desc: 'Wie ein kleines Auto, Heizung & Scheibenwischer' },
      ]
    : [
        { name: 'E-Mobil Vita 4000', speed: '15 km/h', file: 'vita-care-4000.jpg', cid: 'product1', desc: 'Komplett führerscheinfrei, 4 Räder' },
        { name: 'E-Mobil Vita Care 1000', speed: '25 km/h', file: 'vita-care-1000.jpg', cid: 'product2', desc: 'Bis zu 90 km Reichweite, wendig' },
        { name: 'E-Mobil Neo', speed: '45 km/h', file: 'neo-e-mobil.jpg', cid: 'product3', desc: 'Kraftvoll, große Reichweite' },
      ];

  // Nodemailer-Attachments für CID-Einbettung (Produkte + Beraterfoto)
  const attachments = [
    ...productImages.map(p => ({
      filename: p.file,
      path: path.join(imgDir, p.file),
      cid: p.cid,
    })),
    { filename: 'berater-foto.jpg', path: path.join(imgDir, 'berater-foto.jpg'), cid: 'beraterfoto' },
  ];

  // Persönliche Anrede (Vorname)
  const firstName = lead.name.split(' ')[0];

  // Fahrerlaubnis-Text
  const licenseSection = lead.isPre1965
    ? `
      <div style="background-color: #d1fae5; padding: 24px; border-radius: 8px; margin: 24px 0; border-left: 5px solid #10b981;">
        <h3 style="color: #065f46; margin: 0 0 12px 0; font-size: 20px;">Gute Nachricht zu Ihrer Fahrerlaubnis</h3>
        <p style="font-size: 16px; color: #047857; margin: 0; line-height: 1.7;">
          Sie wurden <strong>vor dem 01.04.1965</strong> geboren. Das bedeutet nach deutschem Verkehrsrecht:
          Sie dürfen Elektromobile und 3-Rad-Kabinenroller bis <strong>25 km/h komplett ohne Führerschein</strong> fahren.
          Kein Antrag, keine Prüfung, keine Zusatzkosten. Einfach einsteigen und losfahren.
        </p>
      </div>
    `
    : lead.quizAnswers.license === 'auto'
      ? `
      <div style="background-color: #d1fae5; padding: 24px; border-radius: 8px; margin: 24px 0; border-left: 5px solid #10b981;">
        <h3 style="color: #065f46; margin: 0 0 12px 0; font-size: 20px;">Ihr Autoführerschein reicht aus</h3>
        <p style="font-size: 16px; color: #047857; margin: 0; line-height: 1.7;">
          Mit Ihrem <strong>Führerschein Klasse B</strong> dürfen Sie alle unsere Modelle fahren,
          auch die schnellen <strong>45 km/h Kabinenroller</strong>.
          Ihr Führerschein schließt die Klasse AM automatisch mit ein.
        </p>
      </div>
      `
      : `
      <div style="background-color: #eff6ff; padding: 24px; border-radius: 8px; margin: 24px 0; border-left: 5px solid #3b82f6;">
        <h3 style="color: #1e3a8a; margin: 0 0 12px 0; font-size: 20px;">Das dürfen Sie fahren</h3>
        <p style="font-size: 16px; color: #1e40af; margin: 0; line-height: 1.7;">
          <strong>Bis 15 km/h</strong> dürfen Sie ganz ohne Führerschein fahren. Für <strong>25 km/h Modelle</strong>
          genügt eine Mofa-Prüfbescheinigung. In Ihrem Beratungsgespräch erklären wir Ihnen genau,
          welche Möglichkeiten Sie haben und welche Lösung am besten zu Ihnen passt.
        </p>
      </div>
      `;

  // Produktbilder-HTML generieren (mit cid: für eingebettete Bilder)
  const productCardsHtml = productImages.map(p => `
    <div style="display: inline-block; width: ${isKabinenroller ? '48%' : '31%'}; vertical-align: top; margin-bottom: 16px; margin-right: 1%;">
      <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #fff;">
        <img src="cid:${p.cid}" alt="${p.name}" style="width: 100%; height: auto; display: block;" />
        <div style="padding: 12px;">
          <p style="margin: 0 0 4px 0; font-weight: bold; color: #134e4a; font-size: 15px;">${p.name}</p>
          <p style="margin: 0 0 4px 0; color: #0d9488; font-size: 13px; font-weight: bold;">${p.speed}</p>
          <p style="margin: 0; color: #6b7280; font-size: 13px;">${p.desc}</p>
        </div>
      </div>
    </div>
  `).join('');

  // Warum-Empfehlung-Text
  const whyText = isKabinenroller
    ? lead.quizAnswers.passengers === 'two'
      ? 'Da Sie oft zu zweit unterwegs sind und Wert auf Wetterschutz legen, ist ein Kabinenroller die richtige Wahl. Sie sitzen zu zweit geschützt in einer geschlossenen Kabine mit Heizung.'
      : 'Da Ihnen Wetterschutz wichtig ist, haben wir einen Kabinenroller für Sie ermittelt. Regen, Wind und Kälte bleiben draußen. Die geschlossene Kabine mit Heizung macht Sie unabhängig vom Wetter.'
    : lead.quizAnswers.usage === 'distance'
      ? 'Für Ihre Fahrten auch über den Nahbereich hinaus eignet sich ein offenes Elektromobil hervorragend. Leicht zu manövrieren, mit großer Reichweite und niedrigen Betriebskosten.'
      : 'Für Ihre Fahrten im Nahbereich eignet sich ein wendiges Elektromobil perfekt. Kompakt genug für enge Gehwege und Einfahrten, und trotzdem bequem für längere Strecken.';

  const mailOptions = {
    from: `"E-Mobil Beratung" <${process.env.SMTP_USER}>`,
    to: lead.email,
    subject: `Ihr Testergebnis: ${isKabinenroller ? 'Kabinenroller' : 'Elektromobil'} empfohlen - wir rufen Sie an`,
    attachments,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0a2540 0%, #0d4f4f 50%, #0d9488 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <p style="margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8;">E-Mobil Beratung</p>
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Ihr persönliches Testergebnis</h1>
          <p style="margin: 12px 0 0 0; font-size: 16px; opacity: 0.9;">Unabhängige Beratung für Elektromobile &amp; Kabinenroller</p>
        </div>

        <div style="padding: 32px 30px; background-color: #ffffff;">

          <!-- Begrüßung -->
          <p style="font-size: 18px; color: #374151; margin: 0 0 16px 0;">Hallo ${firstName},</p>

          <p style="font-size: 16px; color: #4b5563; line-height: 1.7; margin: 0 0 16px 0;">
            schön, dass Sie unseren Mobilitäts-Check gemacht haben. Wir haben Ihre Angaben
            ausgewertet und ein klares Ergebnis für Sie.
          </p>

          <!-- Empfehlung -->
          <div style="background: linear-gradient(135deg, #f0fdfa 0%, #e0f7f3 100%); padding: 28px; border-radius: 12px; margin: 28px 0; border: 2px solid #0d9488;">
            <p style="margin: 0 0 6px 0; font-size: 14px; color: #0d9488; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Unsere Empfehlung</p>
            <h2 style="margin: 0 0 12px 0; font-size: 26px; color: #0a2540;">
              ${isKabinenroller ? 'Kabinenroller' : 'Elektromobil'}
            </h2>
            <p style="font-size: 16px; color: #374151; margin: 0; line-height: 1.7;">
              ${whyText}
            </p>
          </div>

          <!-- Fahrerlaubnis -->
          ${licenseSection}

          <!-- Produktbilder -->
          <div style="margin: 32px 0;">
            <h3 style="color: #0a2540; margin: 0 0 16px 0; font-size: 20px;">
              ${isKabinenroller ? 'Diese Kabinenroller kommen für Sie infrage:' : 'Diese Elektromobile kommen für Sie infrage:'}
            </h3>
            <!--[if mso]>
            <table role="presentation" width="100%"><tr><td>
            <![endif]-->
            <div style="font-size: 0;">
              ${productCardsHtml}
            </div>
            <!--[if mso]>
            </td></tr></table>
            <![endif]-->
            <p style="font-size: 14px; color: #6b7280; margin: 12px 0 0 0; line-height: 1.6;">
              Welches Modell für Ihre Situation am besten passt, besprechen wir gemeinsam am Telefon.
            </p>
          </div>

          <!-- Was im Telefonat passiert -->
          <div style="background-color: #eff6ff; padding: 28px; border-radius: 12px; margin: 28px 0;">
            <h3 style="color: #1e3a8a; margin: 0 0 16px 0; font-size: 20px;">Was Sie in Ihrem Beratungsgespräch erwartet</h3>
            <p style="font-size: 16px; color: #1e40af; margin: 0 0 16px 0; line-height: 1.7;">
              Einer unserer Berater ruft Sie in Kürze an. Das Gespräch dauert ca. 10-15 Minuten und ist selbstverständlich kostenlos.
            </p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 12px 10px 0; vertical-align: top; width: 28px; font-size: 18px;">1.</td>
                <td style="padding: 10px 0; font-size: 15px; color: #374151; line-height: 1.6; border-bottom: 1px solid #dbeafe;">
                  <strong>Ihre Situation verstehen</strong> - Wo fahren Sie? Wie oft? Wie weit? Damit wir das richtige Modell finden.
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 12px 10px 0; vertical-align: top; width: 28px; font-size: 18px;">2.</td>
                <td style="padding: 10px 0; font-size: 15px; color: #374151; line-height: 1.6; border-bottom: 1px solid #dbeafe;">
                  <strong>Fahrerlaubnis klären</strong> - Was dürfen Sie fahren? Brauchen Sie eine Sonderzulassung? Wir erklären alles verständlich.
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 12px 10px 0; vertical-align: top; width: 28px; font-size: 18px;">3.</td>
                <td style="padding: 10px 0; font-size: 15px; color: #374151; line-height: 1.6; border-bottom: 1px solid #dbeafe;">
                  <strong>Modelle vergleichen</strong> - Reichweite, Geschwindigkeit, Ausstattung: Was passt zu Ihrem Alltag?
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 12px 10px 0; vertical-align: top; width: 28px; font-size: 18px;">4.</td>
                <td style="padding: 10px 0; font-size: 15px; color: #374151; line-height: 1.6;">
                  <strong>Preis und Finanzierung</strong> - Aktuelle Angebote, Ratenzahlung und mögliche Zuschüsse.
                </td>
              </tr>
            </table>
          </div>

          <!-- Vorfreude aufbauen -->
          <div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); padding: 28px; border-radius: 12px; margin: 28px 0; border: 1px solid #fbbf24;">
            <h3 style="color: #78350f; margin: 0 0 12px 0; font-size: 20px;">Viele unserer Kunden sagen nach dem Gespräch:</h3>
            <p style="font-size: 17px; color: #92400e; margin: 0; line-height: 1.7; font-style: italic;">
              &bdquo;Endlich hat mir jemand verständlich erklärt, was ich fahren darf und welches Modell zu mir passt.&ldquo;
            </p>
            <p style="font-size: 15px; color: #78350f; margin: 12px 0 0 0; line-height: 1.6;">
              Genau das ist unser Ziel: Dass Sie nach dem Gespräch genau wissen, wie Sie wieder selbstständig und sicher unterwegs sein können.
            </p>
          </div>

          <!-- Jetzt schon anrufen -->
          <div style="text-align: center; margin: 32px 0; padding: 28px; background-color: #f0fdfa; border-radius: 12px;">
            <p style="font-size: 16px; color: #374151; margin: 0 0 12px 0;">
              Sie möchten nicht warten? Rufen Sie uns direkt an:
            </p>
            <a href="tel:06747950060" style="display: inline-block; background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-size: 20px; font-weight: bold;">
              06747 950060
            </a>
            <p style="font-size: 14px; color: #6b7280; margin: 12px 0 0 0;">
              Mo-Fr: 08:00-12:00 &amp; 13:00-17:00 Uhr
            </p>
          </div>

          <!-- Abschied mit Beraterfoto -->
          <table style="width: 100%; margin: 28px 0 0 0;">
            <tr>
              <td style="width: 80px; vertical-align: top; padding-right: 16px;">
                <img src="cid:beraterfoto" alt="Ihr Berater" style="width: 72px; height: 72px; border-radius: 50%; object-fit: cover; display: block; border: 2px solid #0d9488;" />
              </td>
              <td style="vertical-align: top;">
                <p style="font-size: 16px; color: #4b5563; line-height: 1.7; margin: 0 0 4px 0;">
                  Wir freuen uns auf das Gespräch mit Ihnen, ${firstName}!
                </p>
                <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0;">
                  Herzliche Grüße<br>
                  <strong>Ihr E-Mobil Beratungsteam</strong>
                </p>
              </td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="background-color: #0a2540; padding: 24px 30px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #94a3b8; font-size: 13px; margin: 0; line-height: 1.6;">
            E-Mobil Beratung &bull; Am Stadion 4 &bull; 56281 Emmelshausen<br>
            Tel: 06747 950060 &bull; Geprüfter Fachhändler
          </p>
        </div>

      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Testergebnis-E-Mail an Kunden gesendet:', lead.email);
    return true;
  } catch (error) {
    console.error('Fehler beim Senden der Testergebnis-E-Mail:', error);
    return false;
  }
}

// ─── Individuelles Angebot per E-Mail senden (Admin) ───

export interface CustomOfferData {
  customerName: string;
  customerEmail: string;
  modelName: string;
  price: string;
  deliveryTime: string;
  includesText: string;
  personalMessage: string;
  validUntil: string;
  financingOption?: string;
}

export async function sendCustomOfferToCustomer(data: CustomOfferData) {
  const imgDir = path.join(process.cwd(), 'public', 'images');

  const imageMap: Record<string, string> = {
    'Vita Care 4000 (15 km/h)': 'vita-care-4000.jpg',
    'Vita Care 1000 (25 km/h)': 'vita-care-1000.jpg',
    'Neo E-Mobil (45 km/h)': 'neo-e-mobil.jpg',
    'Kabinenroller Cruise (25 km/h)': 'kabinenroller-cruise.jpg',
    'Kabinenroller Flow (45 km/h)': 'kabinenroller-flow.jpg',
  };

  const imageFile = imageMap[data.modelName];
  const attachments = [
    ...(imageFile ? [{ filename: imageFile, path: path.join(imgDir, imageFile), cid: 'offermodel' }] : []),
    { filename: 'berater-foto.jpg', path: path.join(imgDir, 'berater-foto.jpg'), cid: 'beraterfoto' },
  ];

  const firstName = data.customerName.split(' ')[0];

  // Leistungen als Liste formatieren
  const includesList = data.includesText
    .split('\n')
    .filter(line => line.trim())
    .map(line => `
      <tr>
        <td style="padding: 6px 8px 6px 0; vertical-align: top; width: 20px; color: #10b981; font-size: 16px;">&#10003;</td>
        <td style="padding: 6px 0; font-size: 15px; color: #374151;">${line.trim()}</td>
      </tr>
    `).join('');

  const mailOptions = {
    from: `"E-Mobil Beratung" <${process.env.SMTP_USER}>`,
    to: data.customerEmail,
    subject: `Ihr persönliches Angebot: ${data.modelName}`,
    attachments,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0a2540 0%, #0d4f4f 50%, #0d9488 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <p style="margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8;">E-Mobil Beratung</p>
          <h1 style="margin: 0; font-size: 28px;">Ihr persönliches Angebot</h1>
        </div>

        <div style="padding: 32px 30px; background-color: #ffffff;">

          <p style="font-size: 18px; color: #374151; margin: 0 0 16px 0;">Hallo ${firstName},</p>

          <p style="font-size: 16px; color: #4b5563; line-height: 1.7; margin: 0 0 24px 0;">
            wie besprochen sende ich Ihnen hiermit Ihr persönliches Angebot zu.
          </p>

          <!-- Produktbild -->
          ${imageFile ? `
          <div style="margin: 0 0 28px 0; border: 2px solid #0d9488; border-radius: 12px; overflow: hidden; background: #fff;">
            <img src="cid:offermodel" alt="${data.modelName}" style="width: 100%; height: auto; display: block;" />
          </div>
          ` : ''}

          <!-- Angebot -->
          <div style="background: linear-gradient(135deg, #f0fdfa 0%, #e0f7f3 100%); padding: 28px; border-radius: 12px; margin: 0 0 28px 0; border: 2px solid #0d9488;">
            <h2 style="margin: 0 0 8px 0; font-size: 22px; color: #0a2540;">${data.modelName}</h2>
            <div style="margin: 20px 0; padding: 20px; background: white; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">Ihr Angebotspreis</p>
              <p style="margin: 8px 0 0 0; font-size: 36px; font-weight: bold; color: #0d9488;">${data.price}</p>
              <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">inkl. MwSt. &amp; Lieferung</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Lieferzeit:</td>
                <td style="padding: 8px 0; color: #0d9488; font-weight: bold;">${data.deliveryTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Angebot gültig bis:</td>
                <td style="padding: 8px 0; color: #374151;">${data.validUntil}</td>
              </tr>
            </table>
          </div>

          <!-- Leistungen -->
          <div style="background-color: #f9fafb; padding: 24px; border-radius: 12px; margin: 0 0 28px 0;">
            <h3 style="color: #0a2540; margin: 0 0 16px 0; font-size: 18px;">Im Angebot enthalten:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${includesList}
            </table>
          </div>

          ${data.financingOption ? `
          <!-- Finanzierung -->
          <div style="background-color: #eff6ff; padding: 24px; border-radius: 12px; margin: 0 0 28px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e3a8a; margin: 0 0 8px 0; font-size: 18px;">Finanzierungsmöglichkeit</h3>
            <p style="font-size: 16px; color: #1e40af; margin: 0; line-height: 1.7;">${data.financingOption}</p>
          </div>
          ` : ''}

          <!-- Persönliche Nachricht -->
          ${data.personalMessage ? `
          <div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); padding: 24px; border-radius: 12px; margin: 0 0 28px 0; border: 1px solid #fbbf24;">
            <h3 style="color: #78350f; margin: 0 0 8px 0; font-size: 18px;">Persönliche Nachricht</h3>
            <p style="font-size: 16px; color: #92400e; margin: 0; line-height: 1.7; white-space: pre-wrap;">${data.personalMessage}</p>
          </div>
          ` : ''}

          <!-- CTA -->
          <div style="text-align: center; margin: 32px 0; padding: 28px; background-color: #f0fdfa; border-radius: 12px;">
            <p style="font-size: 16px; color: #374151; margin: 0 0 4px 0;">
              Fragen zum Angebot? Rufen Sie uns direkt an:
            </p>
            <a href="tel:06747950060" style="display: inline-block; background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-size: 20px; font-weight: bold; margin: 12px 0;">
              06747 950060
            </a>
            <p style="font-size: 14px; color: #6b7280; margin: 8px 0 0 0;">
              Mo-Fr: 08:00-12:00 &amp; 13:00-17:00 Uhr
            </p>
          </div>

          <!-- Abschied mit Beraterfoto -->
          <table style="width: 100%; margin: 28px 0 0 0;">
            <tr>
              <td style="width: 80px; vertical-align: top; padding-right: 16px;">
                <img src="cid:beraterfoto" alt="Ihr Berater" style="width: 72px; height: 72px; border-radius: 50%; object-fit: cover; display: block; border: 2px solid #0d9488;" />
              </td>
              <td style="vertical-align: top;">
                <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0;">
                  Herzliche Grüße<br>
                  <strong>Ihr E-Mobil Beratungsteam</strong>
                </p>
              </td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="background-color: #0a2540; padding: 24px 30px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #94a3b8; font-size: 13px; margin: 0; line-height: 1.6;">
            E-Mobil Beratung &bull; Am Stadion 4 &bull; 56281 Emmelshausen<br>
            Tel: 06747 950060 &bull; Geprüfter Fachhändler
          </p>
        </div>

      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Individuelles Angebot gesendet an:', data.customerEmail);
    return true;
  } catch (error) {
    console.error('Fehler beim Senden des Angebots:', error);
    return false;
  }
}
