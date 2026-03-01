const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ADMIN_URL = 'https://www.mundschutz-express.de/admin56281';

// Read both HTML widgets
const finanzHTML = fs.readFileSync(path.join(__dirname, 'finanzierungsrechner.html'), 'utf8');
const sparHTML = fs.readFileSync(path.join(__dirname, 'sparrechner.html'), 'utf8');
const combinedHTML = finanzHTML + '\n<br><br>\n' + sparHTML;

(async () => {
  console.log('>> Browser wird geöffnet...');
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();

  // Step 1: Navigate to admin login
  await page.goto(ADMIN_URL, { waitUntil: 'domcontentloaded' });
  console.log('>> Admin-Seite geladen. Bitte einloggen...');

  // Step 2: Wait for user to log in (detect admin dashboard)
  try {
    await page.waitForURL('**/admin56281/**', { timeout: 120000 });
    // Wait for the admin dashboard to fully load
    await page.waitForSelector('#header_shopname, .page-head, #content', { timeout: 30000 }).catch(() => {});
    console.log('>> Login erkannt! Navigiere zu CMS...');
  } catch (e) {
    console.log('>> Timeout beim Login-Warten. Versuche trotzdem fortzufahren...');
  }

  // Step 3: Navigate to "Add new CMS page"
  const addCmsUrl = ADMIN_URL + '/index.php?controller=AdminCms&addcms';
  await page.goto(addCmsUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  console.log('>> CMS-Seite-Erstellen geöffnet');

  // Take screenshot to see what's there
  await page.screenshot({ path: path.join(__dirname, 'step1-cms-form.png') });
  console.log('>> Screenshot: step1-cms-form.png');

  // Step 4: Fill in the CMS form
  try {
    // Meta title
    const metaTitleInput = page.locator('input[name="meta_title_1"], input[id*="meta_title"]').first();
    if (await metaTitleInput.count() > 0) {
      await metaTitleInput.fill('Finanzierungsrechner & Sparrechner — Test');
      console.log('>> Meta Title ausgefüllt');
    }

    // Meta description
    const metaDescInput = page.locator('input[name="meta_description_1"], input[id*="meta_description"]').first();
    if (await metaDescInput.count() > 0) {
      await metaDescInput.fill('Berechnen Sie Ihre monatliche Rate und sehen Sie wie viel Sie mit einem E-Mobil sparen');
      console.log('>> Meta Description ausgefüllt');
    }

    // Friendly URL
    const friendlyUrlInput = page.locator('input[name="link_rewrite_1"], input[id*="link_rewrite"]').first();
    if (await friendlyUrlInput.count() > 0) {
      await friendlyUrlInput.fill('rechner-test');
      console.log('>> Friendly URL ausgefüllt');
    }

    // Page title / heading
    const headingInput = page.locator('input[name="heading_1"], input[id*="heading"]').first();
    if (await headingInput.count() > 0) {
      await headingInput.fill('Finanzierungsrechner & Sparrechner');
      console.log('>> Heading ausgefüllt');
    }

    await page.waitForTimeout(1000);

    // Step 5: Switch TinyMCE to source/HTML mode and paste content
    // ThirtyBees uses TinyMCE — we need to find the editor and set content
    console.log('>> Suche TinyMCE Editor...');

    // Try to find TinyMCE iframe
    const editorFrame = page.frameLocator('iframe[id*="content_1"]').first();
    const tinyMceToolbar = page.locator('.mce-btn[aria-label="Source code"], .mce-i-code, button[title="Source code"]').first();

    // Method 1: Use TinyMCE API directly
    const setContent = await page.evaluate((html) => {
      // Try TinyMCE API
      if (typeof tinymce !== 'undefined') {
        const editors = tinymce.editors;
        for (let i = 0; i < editors.length; i++) {
          const ed = editors[i];
          if (ed.id && ed.id.indexOf('content') !== -1) {
            ed.setContent(html);
            return 'tinymce: ' + ed.id;
          }
        }
        // If no content editor found, try the first one
        if (editors.length > 0) {
          editors[0].setContent(html);
          return 'tinymce-first: ' + editors[0].id;
        }
      }
      return 'no-tinymce';
    }, combinedHTML);

    console.log('>> Editor-Ergebnis: ' + setContent);

    if (setContent === 'no-tinymce') {
      // Method 2: Direct textarea fill
      console.log('>> Kein TinyMCE, versuche Textarea...');
      const textarea = page.locator('textarea[name="content_1"], textarea[id*="content_1"]').first();
      if (await textarea.count() > 0) {
        await textarea.fill(combinedHTML);
        console.log('>> Textarea direkt befüllt');
      }
    }

    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(__dirname, 'step2-content-filled.png') });
    console.log('>> Screenshot: step2-content-filled.png');

    // Step 6: Enable "Displayed" toggle if present
    const displayedCheckbox = page.locator('input[name="active"], input[id*="active"]').first();
    if (await displayedCheckbox.count() > 0) {
      const isChecked = await displayedCheckbox.isChecked();
      if (!isChecked) {
        await displayedCheckbox.check();
        console.log('>> "Angezeigt" aktiviert');
      }
    }

    // Step 7: Save — click the save button
    console.log('>> Bereit zum Speichern. Klicke Save...');
    const saveBtn = page.locator('button[name="submitAddcms"], #cms_form_submit_btn, button[type="submit"].btn-primary, .panel-footer button[type="submit"]').first();
    if (await saveBtn.count() > 0) {
      await saveBtn.click();
      console.log('>> Speichern geklickt!');
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(__dirname, 'step3-saved.png') });
      console.log('>> Screenshot: step3-saved.png');
    } else {
      console.log('>> WARNUNG: Kein Save-Button gefunden. Bitte manuell speichern.');
      await page.screenshot({ path: path.join(__dirname, 'step3-no-save-btn.png') });
    }

    console.log('>> FERTIG! CMS-Seite sollte unter /rechner-test erreichbar sein.');
    console.log('>> Browser bleibt offen zum Prüfen. Schließe ihn manuell wenn fertig.');

  } catch (err) {
    console.error('>> FEHLER:', err.message);
    await page.screenshot({ path: path.join(__dirname, 'error.png') });
  }

  // Keep browser open for manual inspection
  await page.waitForTimeout(300000); // 5 min
  await browser.close();
})();
