import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://e-mobil-berater.de";
const PAGE_URL = `${SITE_URL}/ratgeber/foerderung-elektromobil`;

export const metadata: Metadata = {
  title:
    "Förderung & Zuschüsse für Elektromobile 2026 — Alle Möglichkeiten",
  description:
    "Elektromobil Förderung 2026: Krankenkasse, Pflegekasse, kommunale Zuschüsse, KfW und Ratenzahlung ab 29 EUR/Monat. Alle Fördermöglichkeiten verständlich erklärt.",
  keywords: [
    "förderung elektromobil",
    "zuschuss seniorenmobil",
    "elektromobil zuschuss krankenkasse",
    "elektromobil krankenkasse rezept",
    "pflegekasse zuschuss elektromobil",
    "seniorenmobil förderung 2026",
    "elektromobil finanzierung",
    "elektromobil ratenzahlung",
    "zuschuss e-mobil",
    "elektromobil hilfsmittel",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: PAGE_URL,
    siteName: "E-Mobil Berater",
    title:
      "Förderung & Zuschüsse für Elektromobile 2026 — Alle Möglichkeiten",
    description:
      "Krankenkasse, Pflegekasse, kommunale Programme und mehr: So bekommen Sie Zuschüsse für Ihr Elektromobil.",
    images: [
      {
        url: `${SITE_URL}/images/hero-header.jpg`,
        width: 1200,
        height: 630,
        alt: "Förderung für Elektromobile — Alle Zuschüsse 2026",
      },
    ],
    publishedTime: "2026-04-01T08:00:00+02:00",
    modifiedTime: "2026-04-01T08:00:00+02:00",
    authors: ["Elektroroller Futura"],
  },
};

/* --- JSON-LD Structured Data --- */
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Förderung & Zuschüsse für Elektromobile 2026 — Alle Möglichkeiten",
  description:
    "Elektromobil Förderung 2026: Krankenkasse, Pflegekasse, kommunale Zuschüsse, KfW und Ratenzahlung. Alle Fördermöglichkeiten verständlich erklärt.",
  image: `${SITE_URL}/images/hero-header.jpg`,
  datePublished: "2026-04-01T08:00:00+02:00",
  dateModified: "2026-04-01T08:00:00+02:00",
  author: {
    "@type": "Organization",
    name: "Elektroroller Futura",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Elektroroller Futura",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.svg`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": PAGE_URL,
  },
  inLanguage: "de-DE",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Startseite",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ratgeber",
      item: `${SITE_URL}/ratgeber`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Förderung Elektromobil",
      item: PAGE_URL,
    },
  ],
};

const SHOP_LINK =
  "https://elektroroller-futura.de/elektromobilitaet-fuer-senioren?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=foerderung";

export default function FoerderungElektromobilPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen" style={{ background: "var(--cream)" }}>
        {/* Hero Header */}
        <section
          className="relative py-16 md:py-24 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0f2137 0%, #0c3b2f 50%, #0f2137 100%)",
          }}
        >
          <div className="container-wide relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="mb-6 flex items-center gap-2 text-base text-white/50"
              >
                <Link href="/" className="hover:text-white/80 transition-colors">
                  Startseite
                </Link>
                <span>/</span>
                <Link
                  href="/ratgeber"
                  className="hover:text-white/80 transition-colors"
                >
                  Ratgeber
                </Link>
                <span>/</span>
                <span className="text-white/80">Förderung Elektromobil</span>
              </nav>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white bg-emerald-600">
                  Förderung &amp; Zuschüsse
                </span>
                <span className="text-base text-white/50">
                  10 Min. Lesezeit
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Förderung &amp; Zuschüsse für Elektromobile 2026
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
                Krankenkasse, Pflegekasse, kommunale Programme und
                Ratenzahlung — wir zeigen Ihnen alle Möglichkeiten, wie Sie
                Ihr Elektromobil günstiger bekommen.
              </p>
              <p className="text-base text-white/40 mt-6">
                Aktualisiert am 1. April 2026 &bull; Von Elektroroller Futura
              </p>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="section">
          <div className="container-wide max-w-4xl">
            <div className="premium-card p-8 md:p-12">
              {/* Table of Contents */}
              <nav
                aria-label="Inhaltsverzeichnis"
                className="rounded-2xl p-6 mb-12"
                style={{
                  background: "var(--warm-gray)",
                  border: "1px solid #e0ddd8",
                }}
              >
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--navy)" }}
                >
                  Inhaltsverzeichnis
                </h2>
                <ol className="space-y-2 text-lg list-decimal list-inside">
                  <li>
                    <a
                      href="#krankenkasse"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Krankenkasse — Elektromobil als Hilfsmittel
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pflegekasse"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Pflegekasse — Zuschuss bei Pflegegrad
                    </a>
                  </li>
                  <li>
                    <a
                      href="#kommunal"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Kommunale Förderprogramme
                    </a>
                  </li>
                  <li>
                    <a
                      href="#ratenzahlung"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Ratenzahlung ab 29 EUR/Monat
                    </a>
                  </li>
                  <li>
                    <a
                      href="#kfw"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      KfW-Förderprogramme
                    </a>
                  </li>
                  <li>
                    <a
                      href="#steuerlich"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Steuerliche Vorteile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#beratung"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Kostenlose Beratung
                    </a>
                  </li>
                </ol>
              </nav>

              {/* Intro */}
              <div className="space-y-6 text-lg leading-relaxed mb-12">
                <p>
                  <strong>
                    Ein Elektromobil bedeutet Freiheit und Selbstständigkeit
                    — und es muss nicht teuer sein.
                  </strong>{" "}
                  Es gibt mehrere Wege, wie Sie Zuschüsse und Förderungen für
                  Ihr Elektromobil erhalten können. In diesem Ratgeber erklären
                  wir Ihnen alle Möglichkeiten einfach und verständlich.
                </p>
                <p>
                  Ob über die Krankenkasse, die Pflegekasse oder kommunale
                  Programme — für fast jeden gibt es eine passende Lösung.
                  Und mit unserer Ratenzahlung ab 29 EUR pro Monat brauchen
                  Sie keinen extra Antrag zu stellen.
                </p>
              </div>

              {/* Section 1: Krankenkasse */}
              <section id="krankenkasse" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  1. Krankenkasse — Elektromobil als Hilfsmittel
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Elektromobile (auch Seniorenmobile genannt) sind im
                  Hilfsmittelverzeichnis der gesetzlichen Krankenkassen
                  gelistet. Das bedeutet: Unter bestimmten Voraussetzungen
                  übernimmt Ihre Krankenkasse die Kosten — ganz oder
                  teilweise.
                </p>

                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background: "var(--warm-gray)",
                    border: "1px solid #e0ddd8",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--navy)" }}
                  >
                    So funktioniert es — Schritt für Schritt:
                  </h3>
                  <ol className="space-y-3 text-lg list-decimal list-inside">
                    <li>
                      <strong>Arztbesuch:</strong> Ihr Hausarzt oder Facharzt
                      stellt fest, dass Sie in Ihrer Mobilität eingeschränkt
                      sind und ein Elektromobil benötigen.
                    </li>
                    <li>
                      <strong>Verordnung (Rezept):</strong> Der Arzt stellt
                      eine Verordnung für ein Elektromobil als Hilfsmittel aus.
                      Das ist wie ein Rezept — nur eben für ein Fahrzeug.
                    </li>
                    <li>
                      <strong>Antrag bei der Krankenkasse:</strong> Mit der
                      Verordnung stellen Sie einen Antrag bei Ihrer
                      Krankenkasse. Diese prüft, ob die Voraussetzungen
                      erfüllt sind.
                    </li>
                    <li>
                      <strong>Genehmigung:</strong> Nach Genehmigung erhalten
                      Sie Ihr Elektromobil. Der gesetzliche{" "}
                      <strong>Eigenanteil beträgt nur 10 EUR</strong>.
                    </li>
                  </ol>
                </div>

                <div
                  className="info-badge success mb-6"
                  style={{ fontSize: "20px" }}
                >
                  <strong>Gut zu wissen:</strong> Die Krankenkasse übernimmt
                  die Kosten, wenn das Elektromobil medizinisch notwendig ist
                  — also wenn Sie ohne das Fahrzeug Ihren Nahbereich nicht
                  mehr selbstständig erreichen können (z. B. Arzt, Apotheke,
                  Einkaufen). Ein Attest vom Arzt ist die Grundlage.
                </div>

                <p className="text-lg leading-relaxed">
                  <strong>Wichtig:</strong> Die Krankenkasse stellt in der Regel
                  ein Leihgerät zur Verfügung. Wenn Sie ein eigenes, neues
                  Elektromobil möchten, können Sie die Differenz selbst tragen.
                  Auch in diesem Fall lohnt sich der Antrag, denn der
                  Zuschuss reduziert Ihre Kosten erheblich.
                </p>
              </section>

              {/* Section 2: Pflegekasse */}
              <section id="pflegekasse" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  2. Pflegekasse — Zuschuss bei Pflegegrad
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Wenn Sie einen anerkannten Pflegegrad (1 bis 5) haben,
                  können Sie über die Pflegekasse zusätzliche Zuschüsse
                  erhalten.
                </p>

                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background: "var(--warm-gray)",
                    border: "1px solid #e0ddd8",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--navy)" }}
                  >
                    Wohnumfeldverbessernde Maßnahmen — bis zu 4.000 EUR
                  </h3>
                  <p className="text-lg leading-relaxed mb-4">
                    Die Pflegekasse gewährt Zuschüsse von{" "}
                    <strong>bis zu 4.000 EUR pro Maßnahme</strong> für
                    sogenannte wohnumfeldverbessernde Maßnahmen. Diese sollen
                    die selbstständige Lebensführung ermöglichen oder die
                    häusliche Pflege erleichtern.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Ein Elektromobil kann indirekt unter diese Kategorie
                    fallen, wenn es Ihnen ermöglicht, Ihren Alltag
                    selbstständig zu bewältigen — zum Beispiel Einkäufe
                    erledigen, Arztbesuche wahrnehmen oder soziale Kontakte
                    pflegen. Sprechen Sie mit Ihrer Pflegekasse über die
                    Möglichkeiten.
                  </p>
                </div>

                <div
                  className="info-badge success mb-6"
                  style={{ fontSize: "20px" }}
                >
                  <strong>Tipp:</strong> Auch der monatliche
                  Entlastungsbetrag von 125 EUR (bei Pflegegrad 1 bis 5)
                  kann unter Umständen für mobilitätsfördernde Maßnahmen
                  eingesetzt werden. Fragen Sie bei Ihrer Pflegekasse nach.
                </div>
              </section>

              {/* Section 3: Kommunale Förderprogramme */}
              <section id="kommunal" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  3. Kommunale Förderprogramme
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Viele Städte und Gemeinden in Deutschland fördern die
                  Anschaffung von Elektrofahrzeugen — darunter auch
                  Elektromobile. Die Programme unterscheiden sich je nach
                  Region und werden regelmäßig aktualisiert.
                </p>

                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background: "var(--warm-gray)",
                    border: "1px solid #e0ddd8",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--navy)" }}
                  >
                    Beispiele für kommunale Förderungen:
                  </h3>
                  <ul className="space-y-3 text-lg list-disc list-inside">
                    <li>
                      <strong>München:</strong> Förderprogramm
                      &bdquo;Klimaneutral&ldquo; — Zuschüsse für
                      E-Fahrzeuge, auch Elektromobile
                    </li>
                    <li>
                      <strong>Stuttgart:</strong> Förderprogramm
                      E-Mobilität — bis zu 500 EUR Zuschuss
                    </li>
                    <li>
                      <strong>Hamburg:</strong> Förderprogramm ELBE — Förderung
                      von Elektromobilität im Stadtgebiet
                    </li>
                    <li>
                      <strong>Düsseldorf:</strong> Förderprogramm
                      &bdquo;Klimafreundliches Wohnen und Arbeiten&ldquo;
                    </li>
                    <li>
                      <strong>Weitere Städte:</strong> Berlin, Köln, Frankfurt,
                      Hannover und viele mehr bieten eigene Programme an
                    </li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed">
                  <strong>Unser Tipp:</strong> Fragen Sie bei Ihrer
                  Stadtverwaltung oder Ihrem Landratsamt nach aktuellen
                  Förderprogrammen. Wir helfen Ihnen gerne dabei, die
                  passende Förderung in Ihrer Region zu finden.
                </p>
              </section>

              {/* Section 4: Ratenzahlung */}
              <section id="ratenzahlung" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  4. Ratenzahlung — Ab 29 EUR pro Monat
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Auch ohne Förderantrag können Sie Ihr Elektromobil
                  bequem finanzieren. Über unsere Finanzierung zahlen Sie
                  einfach in kleinen monatlichen Raten — ganz ohne
                  Papierkram.
                </p>

                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, #0c3b2f 0%, #0f2137 100%)",
                    border: "none",
                  }}
                >
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Ihre Vorteile auf einen Blick:
                  </h3>
                  <ul className="space-y-3 text-lg list-disc list-inside text-white/90">
                    <li>
                      <strong className="text-white">Ab 29 EUR/Monat</strong>{" "}
                      — weniger als 1 EUR pro Tag
                    </li>
                    <li>
                      <strong className="text-white">
                        Kein extra Antrag nötig
                      </strong>{" "}
                      — einfach im Bestellprozess auswählen
                    </li>
                    <li>
                      <strong className="text-white">
                        Flexible Laufzeiten
                      </strong>{" "}
                      — 6, 12, 24 oder 36 Monate
                    </li>
                    <li>
                      <strong className="text-white">
                        Schnelle Zusage
                      </strong>{" "}
                      — in der Regel innerhalb weniger Minuten
                    </li>
                    <li>
                      <strong className="text-white">
                        Kombinierbar
                      </strong>{" "}
                      — auch zusammen mit Krankenkassen-Zuschuss möglich
                    </li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed">
                  Die Ratenzahlung ist besonders praktisch, wenn Sie nicht auf
                  die Bearbeitung eines Förderantrags warten möchten. Sie
                  erhalten Ihr Elektromobil sofort und zahlen bequem in Raten.
                </p>
              </section>

              {/* Section 5: KfW */}
              <section id="kfw" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  5. KfW-Förderprogramme
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Die Kreditanstalt für Wiederaufbau (KfW) bietet
                  verschiedene Förderprogramme im Bereich Elektromobilität an.
                  Zwar richten sich die meisten Programme an Unternehmen und
                  Kommunen, doch es gibt auch Ansätze für Privatpersonen.
                </p>

                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background: "var(--warm-gray)",
                    border: "1px solid #e0ddd8",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--navy)" }}
                  >
                    Mögliche KfW-Programme:
                  </h3>
                  <ul className="space-y-3 text-lg list-disc list-inside">
                    <li>
                      <strong>KfW 440 — Ladestationen:</strong> Förderung
                      von Wallboxen und Ladeinfrastruktur (indirekt relevant,
                      wenn Sie Ihr Elektromobil zu Hause laden)
                    </li>
                    <li>
                      <strong>KfW 159 — Altersgerecht Umbauen:</strong>{" "}
                      Zinsgünstige Kredite für barrierefreies Wohnen — ein
                      Elektromobil kann Teil eines Gesamtkonzepts sein
                    </li>
                    <li>
                      <strong>Regionale KfW-Partner:</strong> Über Ihre
                      Hausbank können Sie KfW-Förderkredite beantragen
                    </li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed">
                  <strong>Hinweis:</strong> Die KfW-Förderlandschaft ändert
                  sich regelmäßig. Wir empfehlen, die aktuellen Programme auf{" "}
                  <a
                    href="https://www.kfw.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    kfw.de
                  </a>{" "}
                  zu prüfen oder uns direkt zu kontaktieren — wir beraten
                  Sie gerne.
                </p>
              </section>

              {/* Section 6: Steuerliche Vorteile */}
              <section id="steuerlich" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  6. Steuerliche Vorteile
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Neben direkten Förderungen sparen Sie mit einem
                  Elektromobil auch laufende Kosten. Denn Elektromobile
                  genießen steuerliche Vorteile, die auf Dauer viel Geld
                  sparen.
                </p>

                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background: "var(--warm-gray)",
                    border: "1px solid #e0ddd8",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--navy)" }}
                  >
                    Das sparen Sie:
                  </h3>
                  <ul className="space-y-3 text-lg list-disc list-inside">
                    <li>
                      <strong>Keine KFZ-Steuer:</strong> Elektromobile bis
                      25 km/h sind von der KFZ-Steuer befreit — das spart
                      jedes Jahr bares Geld
                    </li>
                    <li>
                      <strong>Kein TÜV:</strong> Elektromobile bis 25 km/h
                      benötigen keine regelmäßige
                      Hauptuntersuchung (TÜV/DEKRA)
                    </li>
                    <li>
                      <strong>Günstige Versicherung:</strong> Die
                      Haftpflichtversicherung für Elektromobile ist deutlich
                      günstiger als für PKW — oft unter 100 EUR pro Jahr
                    </li>
                    <li>
                      <strong>Niedrige Stromkosten:</strong> Eine
                      Vollladung kostet nur wenige Cent — deutlich günstiger
                      als Benzin oder Diesel
                    </li>
                  </ul>
                </div>

                <div
                  className="info-badge success mb-6"
                  style={{ fontSize: "20px" }}
                >
                  <strong>Rechenbeispiel:</strong> Im Vergleich zu einem
                  Kleinstwagen sparen Sie mit einem Elektromobil rund
                  1.500 bis 2.000 EUR pro Jahr an laufenden Kosten (Steuer,
                  TÜV, Versicherung, Kraftstoff).
                </div>
              </section>

              {/* Section 7: Kostenlose Beratung */}
              <section id="beratung" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  7. Kostenlose Beratung zu allen Fördermöglichkeiten
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Sie sind unsicher, welche Förderung für Sie in Frage kommt?
                  Kein Problem!{" "}
                  <strong>
                    Wir beraten Sie kostenlos zu allen Fördermöglichkeiten in
                    Ihrem persönlichen Beratungsgespräch.
                  </strong>
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Unsere Berater kennen sich mit den verschiedenen
                  Förderprogrammen aus und helfen Ihnen, den besten Weg zu
                  finden. Ob Krankenkassen-Antrag, Pflegekassen-Zuschuss
                  oder Ratenzahlung — wir unterstützen Sie bei jedem Schritt.
                </p>

                <div
                  className="rounded-2xl p-8 mb-6 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #0c3b2f 0%, #0f2137 100%)",
                  }}
                >
                  <p className="text-xl text-white/90 mb-2">
                    Rufen Sie uns an — wir beraten Sie gerne:
                  </p>
                  <p className="text-3xl font-bold text-white mb-4">
                    <a
                      href="tel:+4906747950060"
                      className="hover:underline"
                    >
                      06747 950060
                    </a>
                  </p>
                  <p className="text-base text-white/60">
                    Mo.–Fr. 9:00–17:00 Uhr &bull; Kostenlose Beratung
                  </p>
                </div>
              </section>

              {/* Shop Link */}
              <div
                className="rounded-2xl p-8 mb-12 text-center"
                style={{
                  background: "var(--warm-gray)",
                  border: "1px solid #e0ddd8",
                }}
              >
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--navy)" }}
                >
                  Unsere Seniorenmobile entdecken
                </h3>
                <p className="text-lg leading-relaxed mb-6">
                  Schauen Sie sich unsere Auswahl an hochwertigen
                  Elektromobilen an — für jede Anforderung und jedes Budget
                  das passende Modell.
                </p>
                <a
                  href={SHOP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-xl text-lg font-bold text-white transition-transform hover:scale-105"
                  style={{ background: "var(--emerald)" }}
                >
                  Alle Seniorenmobile ansehen
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <section
          className="py-16 md:py-20"
          style={{
            background:
              "linear-gradient(135deg, #0f2137 0%, #0c3b2f 50%, #0f2137 100%)",
          }}
        >
          <div className="container-wide max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Welches Elektromobil passt zu Ihnen?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Machen Sie jetzt unseren kostenlosen Eignungstest und finden
              Sie in nur 2 Minuten heraus, welches Modell ideal für Sie ist
              — inklusive Förderberatung.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-block px-8 py-4 rounded-xl text-lg font-bold text-white transition-transform hover:scale-105"
                style={{ background: "var(--emerald)" }}
              >
                Jetzt kostenlosen Eignungstest machen
              </Link>
              <a
                href="tel:+4906747950060"
                className="inline-block px-8 py-4 rounded-xl text-lg font-bold transition-transform hover:scale-105"
                style={{
                  background: "transparent",
                  border: "2px solid white",
                  color: "white",
                }}
              >
                06747 950060 anrufen
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
