import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://elektroroller-futura.de";
const PAGE_URL = `${SITE_URL}/ratgeber/fuehrerschein-elektroroller`;

export const metadata: Metadata = {
  title: "Führerschein für Elektroroller — Was Sie wissen müssen (2026)",
  description:
    "Braucht man einen Führerschein für Elektroroller? Alle Klassen von 6 bis 45 km/h, Sonderregelungen für Senioren (geb. vor 1965) und Ausnahmen verständlich erklärt.",
  keywords: [
    "führerschein elektroroller",
    "elektroroller führerschein",
    "braucht man einen führerschein für elektroroller",
    "elektroroller ohne führerschein",
    "elektromobil führerschein",
    "mofa prüfbescheinigung",
    "führerschein klasse AM",
    "kabinenroller führerschein",
    "elektroroller 25 km/h führerschein",
    "elektroroller 45 km/h führerschein",
    "seniorenmobil führerschein",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: PAGE_URL,
    siteName: "Elektroroller Futura",
    title: "Führerschein für Elektroroller — Was Sie wissen müssen",
    description:
      "Welchen Führerschein brauchen Sie für einen Elektroroller? Alle Klassen, Sonderregelungen und Ausnahmen verständlich erklärt.",
    images: [
      {
        url: `${SITE_URL}/images/hero-header.jpg`,
        width: 1200,
        height: 630,
        alt: "Führerschein für Elektroroller - Übersicht",
      },
    ],
    publishedTime: "2026-02-15T08:00:00+01:00",
    modifiedTime: "2026-02-15T08:00:00+01:00",
    authors: ["Elektroroller Futura"],
  },
};

/* ─── JSON-LD Structured Data ─── */
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Führerschein für Elektroroller — Was Sie wissen müssen",
  description:
    "Braucht man einen Führerschein für Elektroroller? Alle Klassen von 6 bis 45 km/h, Sonderregelungen für Senioren und Ausnahmen verständlich erklärt.",
  image: `${SITE_URL}/images/hero-header.jpg`,
  datePublished: "2026-02-15T08:00:00+01:00",
  dateModified: "2026-02-15T08:00:00+01:00",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Braucht man einen Führerschein für einen Elektroroller?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das hängt von der Geschwindigkeit ab. Elektroroller bis 6 km/h sind komplett führerscheinfrei. Modelle bis 25 km/h erfordern eine Mofa-Prüfbescheinigung — außer Sie sind vor dem 01.04.1965 geboren. Elektroroller bis 45 km/h benötigen mindestens den Führerschein Klasse AM. Der Autoführerschein (Klasse B) reicht für alle Modelle aus.",
      },
    },
    {
      "@type": "Question",
      name: "Dürfen Senioren Elektroroller ohne Führerschein fahren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, unter bestimmten Voraussetzungen. Personen, die vor dem 01.04.1965 geboren wurden, dürfen 25 km/h Elektroroller (Mofa-Klasse) komplett ohne Führerschein und ohne Prüfbescheinigung fahren. Modelle bis 6 km/h und 15 km/h mit Sonderzulassung sind für alle Altersgruppen führerscheinfrei.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist die Mofa-Prüfbescheinigung und wer braucht sie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Mofa-Prüfbescheinigung ist ein einfacher Nachweis für das Fahren von Fahrzeugen bis 25 km/h. Sie ist kein Führerschein im eigentlichen Sinne und deutlich einfacher zu erlangen. Wer vor dem 01.04.1965 geboren wurde, benötigt sie nicht. Wer einen Autoführerschein (Klasse B) besitzt, hat sie automatisch mit eingeschlossen.",
      },
    },
    {
      "@type": "Question",
      name: "Welchen Führerschein brauche ich für einen 45 km/h Kabinenroller?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für Kabinenroller und Elektroroller mit 45 km/h Höchstgeschwindigkeit benötigen Sie mindestens den Führerschein Klasse AM. Der Autoführerschein Klasse B schließt Klasse AM automatisch ein. Es gibt keine Altersausnahmen für diese Geschwindigkeitsklasse.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist der Stichtag 01.04.1965 und warum ist er wichtig?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der 01. April 1965 ist ein gesetzlicher Stichtag im deutschen Verkehrsrecht. Personen, die vor diesem Datum geboren wurden, dürfen Mofas und Elektroroller bis 25 km/h ohne jeglichen Führerschein oder Prüfbescheinigung fahren. Diese Regelung basiert auf einer Übergangsvorschrift, da die Mofa-Prüfbescheinigung erst 1980 eingeführt wurde.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich mit meinem alten Führerschein Klasse 3 einen Elektroroller fahren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja! Der alte Führerschein Klasse 3 entspricht dem heutigen Führerschein Klasse B und schließt automatisch die Klassen AM und A1 (bis 125 ccm) mit ein. Damit dürfen Sie alle Elektroroller und Kabinenroller bis 45 km/h fahren.",
      },
    },
  ],
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
      name: "Führerschein für Elektroroller",
      item: PAGE_URL,
    },
  ],
};

export default function FuehrerscheinElektrorollerPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                <span className="text-white/80">Führerschein</span>
              </nav>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white bg-blue-600">
                  Recht &amp; Vorschriften
                </span>
                <span className="text-base text-white/50">
                  8 Min. Lesezeit
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Führerschein für Elektroroller — Was Sie wissen müssen
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
                Welchen Führerschein brauchen Sie wirklich? Wir erklären die
                Regelungen für alle Geschwindigkeitsklassen — von 6 bis 45 km/h
                — verständlich und auf den Punkt.
              </p>
              <p className="text-base text-white/40 mt-6">
                Aktualisiert am 15. Februar 2026 &bull; Von Elektroroller Futura
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
                      href="#ueberblick"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Führerschein-Klassen im Überblick
                    </a>
                  </li>
                  <li>
                    <a
                      href="#6kmh"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Bis 6 km/h — Komplett führerscheinfrei
                    </a>
                  </li>
                  <li>
                    <a
                      href="#15kmh"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Bis 15 km/h — Die Sonderzulassung
                    </a>
                  </li>
                  <li>
                    <a
                      href="#25kmh"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Bis 25 km/h — Mofa-Klasse
                    </a>
                  </li>
                  <li>
                    <a
                      href="#45kmh"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Bis 45 km/h — Führerschein Klasse AM
                    </a>
                  </li>
                  <li>
                    <a
                      href="#stichtag"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Der Stichtag 01.04.1965
                    </a>
                  </li>
                  <li>
                    <a
                      href="#vergleichstabelle"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Vergleichstabelle aller Klassen
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Häufige Fragen
                    </a>
                  </li>
                </ol>
              </nav>

              {/* Intro */}
              <div className="space-y-6 text-lg leading-relaxed mb-12">
                <p>
                  <strong>Die Frage &bdquo;Brauche ich einen Führerschein für
                  einen Elektroroller?&ldquo; ist eine der häufigsten, die uns
                  gestellt wird.</strong> Und die Antwort ist nicht immer
                  einfach — denn sie hängt von der Geschwindigkeit des
                  Fahrzeugs, Ihrem Geburtsdatum und der Art des Rollers ab.
                </p>
                <p>
                  In diesem Ratgeber erklären wir Ihnen alle
                  Führerschein-Regelungen für Elektroroller in Deutschland.
                  Verständlich, vollständig und auf dem neuesten Stand.
                  Besonders für Senioren gibt es dabei gute Nachrichten.
                </p>
              </div>

              {/* Section: Überblick */}
              <section id="ueberblick" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  1. Führerschein-Klassen im Überblick
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  In Deutschland werden Elektroroller (dazu zählen E-Mobile,
                  Kabinenroller und klassische E-Roller) in verschiedene
                  Geschwindigkeitsklassen eingeteilt. Jede Klasse hat andere
                  Anforderungen an den Führerschein. Hier die wichtigste Regel:
                </p>
                <div
                  className="info-badge success mb-6"
                  style={{ fontSize: "20px" }}
                >
                  <svg
                    className="w-8 h-8 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Faustregel:</strong> Je langsamer das Fahrzeug, desto
                    weniger Anforderungen an den Führerschein.
                  </span>
                </div>
                <p className="text-lg leading-relaxed">
                  Es gibt vier relevante Geschwindigkeitsstufen: 6 km/h, 15
                  km/h, 25 km/h und 45 km/h. Jede hat eigene Regeln, die wir
                  nun im Detail erklären.
                </p>
              </section>

              {/* Section: 6 km/h */}
              <section id="6kmh" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  2. Bis 6 km/h — Komplett führerscheinfrei
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Elektromobile mit einer Höchstgeschwindigkeit von 6 km/h
                  gelten rechtlich als <strong>motorisierte
                  Krankenfahrstühle</strong>. Sie sind:
                </p>
                <ul className="space-y-3 text-lg mb-6">
                  {[
                    "Komplett führerscheinfrei — kein Mindestalter",
                    "Keine Versicherungspflicht (aber empfohlen)",
                    "Dürfen auf Gehwegen fahren",
                    "Ideal für kurze Wege und mobilitätseingeschränkte Personen",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg leading-relaxed">
                  Diese Kategorie eignet sich vor allem für Menschen mit
                  eingeschränkter Mobilität, die nur kurze Strecken im
                  Nahbereich zurücklegen möchten.
                </p>
              </section>

              {/* Section: 15 km/h */}
              <section id="15kmh" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  3. Bis 15 km/h — Die Sonderzulassung
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Einige Elektromobile können mit einer speziellen{" "}
                  <strong>15 km/h Sonderzulassung</strong> zugelassen werden.
                  Das ist besonders interessant, denn:
                </p>
                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
                    border: "2px solid #93c5fd",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#1d4ed8" }}
                  >
                    Vorteile der 15 km/h Sonderzulassung
                  </h3>
                  <ul className="space-y-2 text-lg">
                    {[
                      "Ohne Führerschein fahrbar — ab 15 Jahren",
                      "Straßenzulassung inklusive",
                      "Deutschlandweit gültig",
                      "Alle Papiere werden mitgeliefert",
                      "Versicherungskennzeichen erforderlich (ca. 30-70 EUR/Jahr)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-lg leading-relaxed">
                  Die 15 km/h Sonderzulassung ist unsere beliebteste Option für
                  Personen, die keinen Führerschein besitzen und trotzdem mobil
                  sein möchten. Der{" "}
                  <Link
                    href="/"
                    className="font-bold underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    E-Mobil Vita 4000
                  </Link>{" "}
                  ist beispielsweise mit dieser Zulassung erhältlich.
                </p>
              </section>

              {/* Section: 25 km/h */}
              <section id="25kmh" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  4. Bis 25 km/h — Mofa-Klasse
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Elektroroller mit einer Höchstgeschwindigkeit von 25 km/h
                  fallen in die sogenannte <strong>Mofa-Klasse</strong>. Hier
                  gelten folgende Regeln:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background:
                        "linear-gradient(135deg, #dcfce7, #f0fdf4)",
                      border: "2px solid #86efac",
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#15803d" }}
                    >
                      Geboren vor 01.04.1965
                    </h3>
                    <ul className="space-y-2 text-lg">
                      <li className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          <strong>Komplett führerscheinfrei!</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Keine Prüfbescheinigung nötig</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Nur Personalausweis mitführen</span>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background:
                        "linear-gradient(135deg, #dbeafe, #eff6ff)",
                      border: "2px solid #93c5fd",
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#1d4ed8" }}
                    >
                      Geboren ab 01.04.1965
                    </h3>
                    <ul className="space-y-2 text-lg">
                      <li className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          <strong>Mofa-Prüfbescheinigung</strong> erforderlich
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Oder: Führerschein Klasse AM / B</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Mindestalter: 15 Jahre</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--navy)" }}
                >
                  Was ist die Mofa-Prüfbescheinigung?
                </h3>
                <p className="text-lg leading-relaxed mb-4">
                  Die Mofa-Prüfbescheinigung ist <strong>kein
                  Führerschein</strong> im eigentlichen Sinne. Sie ist ein
                  einfacher Nachweis, den man nach einer kurzen theoretischen
                  und praktischen Ausbildung bei einer Fahrschule oder dem TÜV
                  erhält. Die Kosten liegen in der Regel zwischen{" "}
                  <strong>70 und 150 Euro</strong>.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>Wichtig:</strong> Wenn Sie bereits einen
                  Autoführerschein (Klasse B oder den alten Klasse 3) besitzen,
                  benötigen Sie keine zusätzliche Mofa-Prüfbescheinigung. Der
                  Autoführerschein deckt diese Klasse automatisch ab.
                </p>
              </section>

              {/* Section: 45 km/h */}
              <section id="45kmh" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  5. Bis 45 km/h — Führerschein Klasse AM
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Für Elektroroller und Kabinenroller mit einer
                  Höchstgeschwindigkeit von 45 km/h benötigen Sie den{" "}
                  <strong>Führerschein Klasse AM</strong>. Hier gibt es{" "}
                  <strong>keine Altersausnahmen</strong> — auch nicht für
                  Personen, die vor 1965 geboren sind.
                </p>

                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
                    border: "2px solid #c4b5fd",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#7c3aed" }}
                  >
                    Führerschein Klasse AM — die wichtigsten Fakten
                  </h3>
                  <ul className="space-y-2 text-lg">
                    {[
                      "Mindestalter: 15 Jahre (in den meisten Bundesländern)",
                      "Berechtigt zum Fahren von Kleinkrafträdern bis 45 km/h",
                      "Theoretische und praktische Prüfung erforderlich",
                      "Kosten: ca. 500-800 Euro (Fahrschule + Prüfung)",
                      "Keine Probezeit",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 flex-shrink-0 mt-0.5"
                          style={{ color: "#7c3aed" }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-lg leading-relaxed mb-4">
                  <strong>Der Autoführerschein reicht:</strong> Wenn Sie
                  bereits den Führerschein Klasse B (oder den alten Klasse 3)
                  besitzen, dürfen Sie automatisch alle Elektroroller bis 45
                  km/h fahren. Die Klasse AM ist in Klasse B enthalten.
                </p>
                <p className="text-lg leading-relaxed">
                  In dieser Kategorie finden Sie leistungsstarke Modelle wie
                  den{" "}
                  <Link
                    href="/"
                    className="font-bold underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    Kabinenroller Flow (45 km/h)
                  </Link>{" "}
                  oder den{" "}
                  <Link
                    href="/"
                    className="font-bold underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    E-Mobil Neo (45 km/h)
                  </Link>
                  .
                </p>
              </section>

              {/* Section: Stichtag */}
              <section id="stichtag" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  6. Der Stichtag 01.04.1965 — Die Sonderregelung für
                  Senioren
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Der <strong>1. April 1965</strong> ist ein wichtiger Stichtag
                  im deutschen Verkehrsrecht. Die Mofa-Prüfbescheinigung wurde
                  erst im Jahr 1980 eingeführt. Für alle Personen, die zu
                  diesem Zeitpunkt bereits 15 Jahre alt waren (also vor dem
                  01.04.1965 geboren), gilt eine{" "}
                  <strong>dauerhafte Befreiung</strong> von dieser Pflicht.
                </p>

                <div
                  className="rounded-2xl p-6 mb-6"
                  style={{
                    background: "linear-gradient(135deg, #fef3c7, #fff7ed)",
                    border: "2px solid #fcd34d",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "#a16207" }}
                  >
                    Das bedeutet konkret:
                  </h3>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">1.</span>
                      <span>
                        Sie dürfen <strong>Elektroroller und E-Mobile bis 25
                        km/h</strong> ohne Führerschein und ohne
                        Prüfbescheinigung fahren.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">2.</span>
                      <span>
                        Sie dürfen <strong>3-Rad Kabinenroller bis 25
                        km/h</strong> ebenfalls ohne Führerschein fahren.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">3.</span>
                      <span>
                        Sie müssen lediglich Ihren{" "}
                        <strong>Personalausweis</strong> mitführen, um Ihr
                        Alter nachweisen zu können.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="info-badge warning mb-6">
                  <svg
                    className="w-8 h-8 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Achtung:</strong> Für 45 km/h Modelle und 4-Rad
                    Fahrzeuge über 25 km/h gilt diese Befreiung nicht. Hier
                    benötigen Sie immer einen Führerschein der Klasse AM oder B.
                  </span>
                </div>

                <p className="text-lg leading-relaxed">
                  Diese Regelung macht es vielen Senioren möglich, ohne
                  bürokratische Hürden wieder mobil zu sein. Unser{" "}
                  <Link
                    href="/"
                    className="font-bold underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    kostenloser 2-Minuten-Test
                  </Link>{" "}
                  zeigt Ihnen sofort, welche Modelle Sie ohne Führerschein
                  fahren dürfen.
                </p>
              </section>

              {/* Section: Vergleichstabelle */}
              <section id="vergleichstabelle" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  7. Vergleichstabelle — Führerschein nach Geschwindigkeit
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Die folgende Tabelle gibt Ihnen einen schnellen Überblick über
                  alle Geschwindigkeitsklassen und die jeweiligen
                  Führerschein-Anforderungen:
                </p>

                <div className="overflow-x-auto rounded-2xl border-2" style={{ borderColor: "#e0ddd8" }}>
                  <table className="w-full text-lg" style={{ minWidth: "700px" }}>
                    <thead>
                      <tr
                        style={{
                          background:
                            "linear-gradient(135deg, var(--navy) 0%, #1a3352 100%)",
                        }}
                      >
                        <th className="text-left text-white font-bold px-6 py-4">
                          Geschwindigkeit
                        </th>
                        <th className="text-left text-white font-bold px-6 py-4">
                          Führerschein
                        </th>
                        <th className="text-left text-white font-bold px-6 py-4">
                          Geb. vor 01.04.1965
                        </th>
                        <th className="text-left text-white font-bold px-6 py-4">
                          Mindestalter
                        </th>
                        <th className="text-left text-white font-bold px-6 py-4">
                          Versicherung
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ background: "#f0fdf4" }}>
                        <td className="px-6 py-4 font-bold">Bis 6 km/h</td>
                        <td className="px-6 py-4 text-green-700 font-bold">
                          Keiner nötig
                        </td>
                        <td className="px-6 py-4 text-green-700 font-bold">
                          Keiner nötig
                        </td>
                        <td className="px-6 py-4">Keines</td>
                        <td className="px-6 py-4">Empfohlen</td>
                      </tr>
                      <tr style={{ background: "#eff6ff" }}>
                        <td className="px-6 py-4 font-bold">Bis 15 km/h</td>
                        <td className="px-6 py-4 text-green-700 font-bold">
                          Keiner nötig*
                        </td>
                        <td className="px-6 py-4 text-green-700 font-bold">
                          Keiner nötig
                        </td>
                        <td className="px-6 py-4">15 Jahre</td>
                        <td className="px-6 py-4">Pflicht</td>
                      </tr>
                      <tr style={{ background: "#f0fdf4" }}>
                        <td className="px-6 py-4 font-bold">Bis 25 km/h</td>
                        <td className="px-6 py-4">Mofa-Prüfbescheinigung</td>
                        <td className="px-6 py-4 text-green-700 font-bold">
                          Keiner nötig
                        </td>
                        <td className="px-6 py-4">15 Jahre</td>
                        <td className="px-6 py-4">Pflicht</td>
                      </tr>
                      <tr style={{ background: "#f5f3ff" }}>
                        <td className="px-6 py-4 font-bold">Bis 45 km/h</td>
                        <td className="px-6 py-4">Klasse AM oder B</td>
                        <td className="px-6 py-4">Klasse AM oder B</td>
                        <td className="px-6 py-4">15-16 Jahre**</td>
                        <td className="px-6 py-4">Pflicht</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-base text-gray-500 mt-3">
                  * Mit Sonderzulassung. ** Je nach Bundesland.
                </p>
              </section>

              {/* Section: Unsere Modelle */}
              <section className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  Unsere Modelle und ihre Führerschein-Anforderungen
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Hier sehen Sie auf einen Blick, welchen Führerschein Sie für
                  unsere Elektromobile und Kabinenroller benötigen:
                </p>

                <div className="space-y-4">
                  {[
                    {
                      name: "E-Mobil Vita 4000, 15 km/h",
                      speed: "15 km/h",
                      license: "Keiner nötig (Sonderzulassung)",
                      color: "#16a34a",
                    },
                    {
                      name: "E-Mobil Vita Care 1000, 25 km/h",
                      speed: "25 km/h",
                      license:
                        "Mofa-Prüfbescheinigung / frei vor 01.04.1965",
                      color: "#2563eb",
                    },
                    {
                      name: "E-Mobil Vita Care 4000, 25 km/h",
                      speed: "25 km/h",
                      license: "Klasse AM oder B",
                      color: "#0891b2",
                    },
                    {
                      name: "Kabinenroller Cruise, 25 km/h",
                      speed: "25 km/h",
                      license:
                        "Mofa-Prüfbescheinigung / frei vor 01.04.1965",
                      color: "#0c6b58",
                    },
                    {
                      name: "E-Mobil Neo, 45 km/h",
                      speed: "45 km/h",
                      license: "Klasse AM oder B",
                      color: "#d4940a",
                    },
                    {
                      name: "Kabinenroller Flow, 45 km/h",
                      speed: "45 km/h",
                      license: "Klasse AM oder B",
                      color: "#7c3aed",
                    },
                  ].map((model, i) => (
                    <div
                      key={i}
                      className="flex flex-col md:flex-row md:items-center gap-4 rounded-2xl p-5"
                      style={{
                        background: "white",
                        border: "1px solid #e0ddd8",
                        borderLeft: `4px solid ${model.color}`,
                      }}
                    >
                      <div className="flex-1">
                        <p className="text-lg font-bold" style={{ color: "var(--navy)" }}>
                          {model.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className="text-sm font-bold px-3 py-1 rounded-full text-white"
                          style={{ background: model.color }}
                        >
                          {model.speed}
                        </span>
                        <span className="text-base text-gray-600">
                          {model.license}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA Box */}
              <div
                className="rounded-2xl p-8 mb-14 text-center"
                style={{
                  background: "linear-gradient(135deg, #fef3c7, #fff7ed)",
                  border: "2px solid #fcd34d",
                }}
              >
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ color: "var(--navy)" }}
                >
                  Unsicher, was Sie fahren dürfen?
                </h2>
                <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
                  Unser kostenloser 2-Minuten-Test analysiert Ihre persönliche
                  Situation und zeigt Ihnen sofort, welche Modelle für Sie
                  infrage kommen.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="/" className="btn btn-cta inline-flex items-center gap-3">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Jetzt Eignungs-Test starten
                  </a>
                  <a
                    href="tel:06747950060"
                    className="btn btn-secondary inline-flex items-center gap-3"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    06747 950060
                  </a>
                </div>
              </div>

              {/* FAQ Section */}
              <section id="faq" className="mb-12">
                <h2
                  className="text-3xl font-bold mb-8"
                  style={{ color: "var(--navy)" }}
                >
                  8. Häufig gestellte Fragen zum Führerschein für Elektroroller
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      q: "Braucht man einen Führerschein für einen Elektroroller?",
                      a: "Das hängt von der Geschwindigkeit ab. Elektroroller bis 6 km/h sind komplett führerscheinfrei. Modelle bis 25 km/h erfordern eine Mofa-Prüfbescheinigung — außer Sie sind vor dem 01.04.1965 geboren. Elektroroller bis 45 km/h benötigen mindestens den Führerschein Klasse AM. Der Autoführerschein (Klasse B) reicht für alle Modelle aus.",
                    },
                    {
                      q: "Dürfen Senioren Elektroroller ohne Führerschein fahren?",
                      a: "Ja, unter bestimmten Voraussetzungen. Personen, die vor dem 01.04.1965 geboren wurden, dürfen 25 km/h Elektroroller (Mofa-Klasse) komplett ohne Führerschein und ohne Prüfbescheinigung fahren. Modelle bis 6 km/h und 15 km/h mit Sonderzulassung sind für alle Altersgruppen führerscheinfrei.",
                    },
                    {
                      q: "Was ist die Mofa-Prüfbescheinigung und wer braucht sie?",
                      a: "Die Mofa-Prüfbescheinigung ist ein einfacher Nachweis für das Fahren von Fahrzeugen bis 25 km/h. Sie ist kein Führerschein im eigentlichen Sinne und deutlich einfacher zu erlangen. Wer vor dem 01.04.1965 geboren wurde, benötigt sie nicht. Wer einen Autoführerschein (Klasse B) besitzt, hat sie automatisch mit eingeschlossen.",
                    },
                    {
                      q: "Welchen Führerschein brauche ich für einen 45 km/h Kabinenroller?",
                      a: "Für Kabinenroller und Elektroroller mit 45 km/h Höchstgeschwindigkeit benötigen Sie mindestens den Führerschein Klasse AM. Der Autoführerschein Klasse B schließt Klasse AM automatisch ein. Es gibt keine Altersausnahmen für diese Geschwindigkeitsklasse.",
                    },
                    {
                      q: "Was ist der Stichtag 01.04.1965 und warum ist er wichtig?",
                      a: "Der 01. April 1965 ist ein gesetzlicher Stichtag im deutschen Verkehrsrecht. Personen, die vor diesem Datum geboren wurden, dürfen Mofas und Elektroroller bis 25 km/h ohne jeglichen Führerschein oder Prüfbescheinigung fahren. Diese Regelung basiert auf einer Übergangsvorschrift, da die Mofa-Prüfbescheinigung erst 1980 eingeführt wurde.",
                    },
                    {
                      q: "Kann ich mit meinem alten Führerschein Klasse 3 einen Elektroroller fahren?",
                      a: "Ja! Der alte Führerschein Klasse 3 entspricht dem heutigen Führerschein Klasse B und schließt automatisch die Klassen AM und A1 (bis 125 ccm) mit ein. Damit dürfen Sie alle Elektroroller und Kabinenroller bis 45 km/h fahren.",
                    },
                  ].map((faq, i) => (
                    <details
                      key={i}
                      className="rounded-2xl overflow-hidden"
                      style={{
                        background: "white",
                        border: "1px solid #e0ddd8",
                      }}
                    >
                      <summary
                        className="flex items-center justify-between p-6 cursor-pointer text-xl font-bold list-none"
                        style={{ color: "var(--navy)" }}
                      >
                        <span className="pr-4">{faq.q}</span>
                        <svg
                          className="w-6 h-6 flex-shrink-0 text-gray-400 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div
                        className="px-6 pb-6 text-lg text-gray-700 leading-relaxed"
                        style={{ borderTop: "1px solid #f0ede8" }}
                      >
                        <p className="pt-4">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Conclusion */}
              <section className="mb-8">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  Fazit: Viele Senioren dürfen mehr als sie denken
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  Die Führerschein-Regelungen für Elektroroller sind
                  übersichtlicher als viele denken. Besonders die Sonderregelung
                  für Personen, die vor dem 01.04.1965 geboren sind, macht es
                  vielen Senioren möglich, ohne jegliche Prüfung wieder mobil
                  zu sein.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Unsere Empfehlung: Lassen Sie sich kostenlos beraten. Unsere
                  Experten klären Ihre persönliche Führerschein-Situation und
                  empfehlen das passende Modell — unverbindlich und ohne
                  versteckte Kosten.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>Rufen Sie uns an unter{" "}
                  <a
                    href="tel:06747950060"
                    className="underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    06747 950060
                  </a></strong>{" "}
                  oder machen Sie unseren{" "}
                  <Link
                    href="/"
                    className="font-bold underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    kostenlosen Eignungs-Test
                  </Link>
                  .
                </p>
              </section>

              {/* Related Article */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "var(--warm-gray)",
                  border: "1px solid #e0ddd8",
                }}
              >
                <p
                  className="text-sm font-bold uppercase tracking-wider mb-3"
                  style={{ color: "var(--emerald)" }}
                >
                  Weiterlesen
                </p>
                <Link
                  href="/ratgeber/reichweite-elektroroller"
                  className="text-xl font-bold hover:underline block"
                  style={{ color: "var(--navy)" }}
                >
                  Reichweite von Elektrorollern — Alles was Sie wissen müssen
                </Link>
                <p className="text-base text-gray-500 mt-2">
                  Wie weit kommt ein Elektroroller? Einflussfaktoren, Modellvergleich und Tipps.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Back links */}
        <div className="container-wide max-w-4xl pb-20 flex items-center gap-6">
          <Link
            href="/ratgeber"
            className="inline-flex items-center gap-2 text-lg font-semibold hover:gap-3 transition-all"
            style={{ color: "var(--emerald)" }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Alle Ratgeber
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-semibold text-gray-400 hover:text-gray-600 transition-colors"
          >
            Zur Startseite
          </Link>
        </div>
      </main>
    </>
  );
}
