import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://e-mobil-berater.de";
const PAGE_URL = `${SITE_URL}/ratgeber/seniorenmobil-vergleich`;

export const metadata: Metadata = {
  title: "Seniorenmobil Vergleich 2026 — Welches E-Mobil passt zu Ihnen?",
  description:
    "Alle 6 Seniorenmobile im direkten Vergleich: Vita 4000, Vita Care, Neo und Kabinenroller. Geschwindigkeit, Reichweite, Preis und Führerschein — übersichtlich erklärt.",
  keywords: [
    "seniorenmobil vergleich",
    "elektromobil vergleich",
    "kabinenroller vergleich",
    "seniorenmobil test",
    "elektromobil für senioren",
    "kabinenroller senioren",
    "e-mobil vergleich 2026",
    "vita 4000 vs kabinenroller",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: PAGE_URL,
    siteName: "E-Mobil Berater",
    title: "Seniorenmobil Vergleich 2026 — Welches E-Mobil passt zu Ihnen?",
    description:
      "6 Seniorenmobile im direkten Vergleich: Geschwindigkeit, Reichweite, Preis und Führerschein auf einen Blick.",
    images: [
      {
        url: `${SITE_URL}/images/hero-header.jpg`,
        width: 1200,
        height: 630,
        alt: "Seniorenmobil Vergleich 2026",
      },
    ],
    publishedTime: "2026-04-01T08:00:00+02:00",
    modifiedTime: "2026-04-01T08:00:00+02:00",
    authors: ["E-Mobil Berater"],
  },
};

/* ─── JSON-LD Structured Data ─── */
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Seniorenmobil Vergleich 2026 — Welches E-Mobil passt zu Ihnen?",
  description:
    "Alle 6 Seniorenmobile im direkten Vergleich: Vita 4000, Vita Care, Neo und Kabinenroller. Geschwindigkeit, Reichweite, Preis und Führerschein übersichtlich erklärt.",
  image: `${SITE_URL}/images/hero-header.jpg`,
  datePublished: "2026-04-01T08:00:00+02:00",
  dateModified: "2026-04-01T08:00:00+02:00",
  author: {
    "@type": "Organization",
    name: "E-Mobil Berater",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "E-Mobil Berater",
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
      name: "Seniorenmobil Vergleich",
      item: PAGE_URL,
    },
  ],
};

/* ─── Modelldaten ─── */
const modelle = [
  {
    name: "Vita 4000",
    speed: "15 km/h",
    license: "Führerscheinfrei",
    wheels: 4,
    range: "ca. 60 km",
    weather: "Nein (offen)",
    seats: 1,
    price: "ab 2.590 €",
    color: "#16a34a",
    link: "https://elektroroller-futura.de/e-mobile-fuehrerscheinfrei?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=vergleich",
  },
  {
    name: "Vita Care 1000",
    speed: "25 km/h",
    license: "Mofa-Prüfbescheinigung*",
    wheels: 4,
    range: "ca. 60 km",
    weather: "Nein (offen)",
    seats: 1,
    price: "ab 2.990 €",
    color: "#2563eb",
    link: "https://elektroroller-futura.de/elektromobilitaet-fuer-senioren?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=vergleich",
  },
  {
    name: "Vita Care 4000",
    speed: "25 km/h",
    license: "Mofa-Prüfbescheinigung*",
    wheels: 4,
    range: "ca. 70 km",
    weather: "Nein (offen)",
    seats: 1,
    price: "ab 3.490 €",
    color: "#0891b2",
    link: "https://elektroroller-futura.de/elektromobilitaet-fuer-senioren?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=vergleich",
  },
  {
    name: "E-Mobil Neo",
    speed: "45 km/h",
    license: "Klasse AM oder B",
    wheels: 4,
    range: "ca. 80 km",
    weather: "Nein (offen)",
    seats: 1,
    price: "ab 4.990 €",
    color: "#d4940a",
    link: "https://elektroroller-futura.de/elektro-quad?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=vergleich",
  },
  {
    name: "Kabinenroller Cruise",
    speed: "25 km/h",
    license: "Mofa-Prüfbescheinigung*",
    wheels: 3,
    range: "ca. 70 km",
    weather: "Ja (geschlossene Kabine)",
    seats: 2,
    price: "ab 5.990 €",
    color: "#0c6b58",
    link: "https://elektroroller-futura.de/elektro-kabinenroller-futura?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=vergleich",
  },
  {
    name: "Kabinenroller Flow",
    speed: "45 km/h",
    license: "Klasse AM oder B",
    wheels: 3,
    range: "ca. 80 km",
    weather: "Ja (geschlossene Kabine)",
    seats: 2,
    price: "ab 6.990 €",
    color: "#7c3aed",
    link: "https://elektroroller-futura.de/elektro-kabinenroller-futura?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=vergleich",
  },
];

export default function SeniorenmobilVergleichPage() {
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
                <span className="text-white/80">Seniorenmobil Vergleich</span>
              </nav>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white bg-blue-600">
                  Vergleich &amp; Kaufberatung
                </span>
                <span className="text-base text-white/50">
                  6 Min. Lesezeit
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Seniorenmobil Vergleich 2026 — Welches E-Mobil passt zu Ihnen?
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
                Von führerscheinfrei bis Kabinenroller: Alle 6 Modelle im
                direkten Vergleich. Finden Sie in wenigen Minuten das richtige
                Elektromobil für Ihre Bedürfnisse.
              </p>
              <p className="text-base text-white/40 mt-6">
                Aktualisiert am 1. April 2026 &bull; Von E-Mobil Berater
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
                      href="#vergleichstabelle"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Vergleichstabelle aller 6 Modelle
                    </a>
                  </li>
                  <li>
                    <a
                      href="#modelle-detail"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Jedes Modell im Detail
                    </a>
                  </li>
                  <li>
                    <a
                      href="#entscheidungshilfe"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Entscheidungshilfe: Welches Modell passt zu Ihnen?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#fuehrerschein"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Führerschein-Anforderungen
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
                  <strong>Die Auswahl an Seniorenmobilen ist groß — und die
                  Unterschiede sind es auch.</strong> Ob führerscheinfreies
                  E-Mobil für den Einkauf im Ort, ein schnelles Quad für längere
                  Strecken oder ein Kabinenroller mit Wetterschutz für den
                  Winter: Für jeden Bedarf gibt es das passende Modell.
                </p>
                <p>
                  In diesem Vergleich stellen wir Ihnen alle 6 aktuellen Modelle
                  gegenüber — mit allen relevanten Daten zu Geschwindigkeit,
                  Reichweite, Führerschein-Anforderung und Preis.
                </p>
              </div>

              {/* Section: Vergleichstabelle */}
              <section id="vergleichstabelle" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  1. Vergleichstabelle aller 6 Modelle
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Die folgende Tabelle zeigt alle wichtigen Kriterien auf einen
                  Blick. Scrollen Sie nach rechts, falls nicht alle Spalten
                  sichtbar sind.
                </p>

                <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid #e0ddd8" }}>
                  <table className="w-full text-base" style={{ minWidth: "900px" }}>
                    <thead>
                      <tr
                        style={{
                          background:
                            "linear-gradient(135deg, var(--navy) 0%, #1a3352 100%)",
                        }}
                      >
                        <th className="text-left text-white font-bold px-5 py-4">Modell</th>
                        <th className="text-left text-white font-bold px-5 py-4">Geschwindigkeit</th>
                        <th className="text-left text-white font-bold px-5 py-4">Führerschein</th>
                        <th className="text-center text-white font-bold px-5 py-4">Räder</th>
                        <th className="text-left text-white font-bold px-5 py-4">Reichweite</th>
                        <th className="text-left text-white font-bold px-5 py-4">Wetterschutz</th>
                        <th className="text-center text-white font-bold px-5 py-4">Sitzplätze</th>
                        <th className="text-right text-white font-bold px-5 py-4">Preis ab</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelle.map((m, i) => (
                        <tr
                          key={i}
                          style={{ background: i % 2 === 0 ? "#f0fdf4" : "#eff6ff" }}
                        >
                          <td className="px-5 py-4 font-bold" style={{ color: "var(--navy)" }}>
                            <a
                              href={m.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                              style={{ color: m.color }}
                            >
                              {m.name}
                            </a>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className="text-sm font-bold px-3 py-1 rounded-full text-white"
                              style={{ background: m.color }}
                            >
                              {m.speed}
                            </span>
                          </td>
                          <td className="px-5 py-4">{m.license}</td>
                          <td className="px-5 py-4 text-center">{m.wheels}</td>
                          <td className="px-5 py-4">{m.range}</td>
                          <td className="px-5 py-4">{m.weather}</td>
                          <td className="px-5 py-4 text-center">{m.seats}</td>
                          <td className="px-5 py-4 text-right font-bold">{m.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-base text-gray-500 mt-3">
                  * Personen, die vor dem 01.04.1965 geboren sind, benötigen keine
                  Mofa-Prüfbescheinigung.
                </p>
              </section>

              {/* Section: Modelle im Detail */}
              <section id="modelle-detail" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  2. Jedes Modell im Detail
                </h2>

                <div className="space-y-4">
                  {modelle.map((m, i) => (
                    <div
                      key={i}
                      className="flex flex-col md:flex-row md:items-center gap-4 rounded-2xl p-5"
                      style={{
                        background: "white",
                        border: "1px solid #e0ddd8",
                        borderLeft: `4px solid ${m.color}`,
                      }}
                    >
                      <div className="flex-1">
                        <p
                          className="text-lg font-bold mb-1"
                          style={{ color: "var(--navy)" }}
                        >
                          {m.name}
                        </p>
                        <p className="text-base text-gray-600">
                          {m.wheels} Räder &bull; {m.range} Reichweite &bull;{" "}
                          {m.seats === 2 ? "2 Sitzplätze" : "1 Sitzplatz"} &bull;{" "}
                          {m.weather}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className="text-sm font-bold px-3 py-1 rounded-full text-white"
                          style={{ background: m.color }}
                        >
                          {m.speed}
                        </span>
                        <span className="text-lg font-bold" style={{ color: "var(--navy)" }}>
                          {m.price}
                        </span>
                      </div>
                      <a
                        href={m.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold px-4 py-2 rounded-full text-white hover:opacity-90 transition-opacity text-center"
                        style={{ background: m.color }}
                      >
                        Zum Modell
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: Entscheidungshilfe */}
              <section id="entscheidungshilfe" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  3. Entscheidungshilfe: Welches Modell passt zu Ihnen?
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Die richtige Wahl hängt vor allem davon ab, wie und wo Sie Ihr
                  Elektromobil nutzen möchten. Hier unsere Empfehlungen für die
                  häufigsten Situationen:
                </p>

                <div className="space-y-6">
                  {/* Empfehlung 1: Einkaufen im Ort */}
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                      border: "2px solid #86efac",
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#16a34a" }}
                    >
                      Einkaufen im Ort &amp; kurze Wege
                    </h3>
                    <p className="text-lg leading-relaxed mb-3">
                      Sie möchten zum Bäcker, Supermarkt oder Arzt im Ort? Dann
                      reicht ein kompaktes, führerscheinfreies Modell völlig aus.
                    </p>
                    <div
                      className="info-badge success"
                      style={{ fontSize: "18px" }}
                    >
                      <svg
                        className="w-7 h-7 flex-shrink-0"
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
                        <strong>Unsere Empfehlung:</strong>{" "}
                        <a
                          href="https://elektroroller-futura.de/e-mobile-fuehrerscheinfrei?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=vergleich"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold underline"
                        >
                          Vita 4000 (15 km/h)
                        </a>{" "}
                        — führerscheinfrei, 4 Räder, einfache Bedienung
                      </span>
                    </div>
                  </div>

                  {/* Empfehlung 2: Längere Strecken */}
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "linear-gradient(135deg, #fef3c7, #fff7ed)",
                      border: "2px solid #fcd34d",
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#d4940a" }}
                    >
                      Längere Strecken &amp; Landstraße
                    </h3>
                    <p className="text-lg leading-relaxed mb-3">
                      Sie möchten auch mal in den Nachbarort fahren, am Verkehr
                      teilnehmen und brauchen mehr Reichweite? Dann ist ein
                      schnelleres Modell die bessere Wahl.
                    </p>
                    <div
                      className="info-badge success"
                      style={{ fontSize: "18px" }}
                    >
                      <svg
                        className="w-7 h-7 flex-shrink-0"
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
                        <strong>Unsere Empfehlung:</strong>{" "}
                        <a
                          href="https://elektroroller-futura.de/elektro-quad?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=vergleich"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold underline"
                        >
                          E-Mobil Neo (45 km/h)
                        </a>{" "}
                        — schnell genug für die Landstraße, große Reichweite
                      </span>
                    </div>
                  </div>

                  {/* Empfehlung 3: Zu zweit / Winter */}
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
                      border: "2px solid #c4b5fd",
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#7c3aed" }}
                    >
                      Zu zweit unterwegs oder bei Regen &amp; Kälte
                    </h3>
                    <p className="text-lg leading-relaxed mb-3">
                      Sie möchten Ihren Partner mitnehmen oder auch im Winter
                      mobil sein? Dann führt kein Weg am Kabinenroller vorbei —
                      mit geschlossener Kabine, Heizung und 2 Sitzplätzen.
                    </p>
                    <div
                      className="info-badge success"
                      style={{ fontSize: "18px" }}
                    >
                      <svg
                        className="w-7 h-7 flex-shrink-0"
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
                        <strong>Unsere Empfehlung:</strong>{" "}
                        <a
                          href="https://elektroroller-futura.de/elektro-kabinenroller-futura?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=vergleich"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold underline"
                        >
                          Kabinenroller Cruise (25 km/h)
                        </a>{" "}
                        oder{" "}
                        <a
                          href="https://elektroroller-futura.de/elektro-kabinenroller-futura?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=vergleich"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold underline"
                        >
                          Kabinenroller Flow (45 km/h)
                        </a>{" "}
                        — Wetterschutz, 2 Sitze, ganzjährig einsetzbar
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: Führerschein */}
              <section id="fuehrerschein" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  4. Führerschein-Anforderungen
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Je nach Geschwindigkeitsklasse gelten unterschiedliche
                  Führerschein-Regelungen. Hier die wichtigsten Fakten:
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    {
                      speed: "Bis 15 km/h",
                      desc: "Komplett führerscheinfrei — keine Prüfung, kein Mindestalter für die Nutzung erforderlich.",
                      color: "#16a34a",
                      bg: "#f0fdf4",
                    },
                    {
                      speed: "Bis 25 km/h",
                      desc: "Mofa-Prüfbescheinigung erforderlich. Ausnahme: Personen, die vor dem 01.04.1965 geboren sind, fahren ohne Prüfbescheinigung. Der Autoführerschein (Klasse B) reicht ebenfalls.",
                      color: "#2563eb",
                      bg: "#eff6ff",
                    },
                    {
                      speed: "Bis 45 km/h",
                      desc: "Führerschein Klasse AM oder B erforderlich. Keine Altersausnahmen — auch nicht für Personen, die vor 1965 geboren sind.",
                      color: "#7c3aed",
                      bg: "#f5f3ff",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-5"
                      style={{
                        background: item.bg,
                        borderLeft: `4px solid ${item.color}`,
                      }}
                    >
                      <p className="text-lg font-bold mb-1" style={{ color: item.color }}>
                        {item.speed}
                      </p>
                      <p className="text-base leading-relaxed text-gray-700">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-lg leading-relaxed">
                  Mehr Details finden Sie in unserem ausführlichen{" "}
                  <Link
                    href="/ratgeber/fuehrerschein-elektroroller"
                    className="font-bold underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    Ratgeber: Führerschein für Elektroroller
                  </Link>
                  .
                </p>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-8"
                  style={{ color: "var(--navy)" }}
                >
                  5. Häufig gestellte Fragen
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      q: "Welches Seniorenmobil ist das beste für Anfänger?",
                      a: "Das Vita 4000 (15 km/h) ist ideal für Einsteiger. Es ist komplett führerscheinfrei, hat 4 Räder für maximale Stabilität und ist besonders einfach zu bedienen.",
                    },
                    {
                      q: "Kann ich einen Kabinenroller auch im Winter fahren?",
                      a: "Ja, genau dafür sind Kabinenroller konzipiert. Die geschlossene Kabine schützt vor Regen, Wind und Kälte. Viele Modelle haben zudem eine Heizung. Sie sind die einzigen Seniorenmobile, die wirklich ganzjährig nutzbar sind.",
                    },
                    {
                      q: "Brauche ich für alle Modelle einen Führerschein?",
                      a: "Nein. Modelle bis 15 km/h (wie der Vita 4000) sind komplett führerscheinfrei. Für 25 km/h Modelle benötigen Sie eine Mofa-Prüfbescheinigung — es sei denn, Sie sind vor dem 01.04.1965 geboren. Für 45 km/h Modelle brauchen Sie mindestens Führerschein Klasse AM oder B.",
                    },
                    {
                      q: "Wie weit komme ich mit einer Akkuladung?",
                      a: "Die Reichweite liegt je nach Modell zwischen 60 und 80 km. Sie hängt von Faktoren wie Gewicht, Steigung und Geschwindigkeit ab. Im Alltag reichen die Akkus für mehrere Tage bei normaler Nutzung im Ort.",
                    },
                    {
                      q: "Kann ich zu zweit fahren?",
                      a: "Nur mit den Kabinenrollern (Cruise und Flow). Diese haben 2 Sitzplätze und sind dafür ausgelegt, eine Begleitperson mitzunehmen. Alle anderen Modelle sind Einsitzer.",
                    },
                    {
                      q: "Gibt es Förderungen für Seniorenmobile?",
                      a: "Ja, in vielen Gemeinden und Bundesländern gibt es Zuschüsse für E-Mobile. Auch Krankenkassen übernehmen unter bestimmten Voraussetzungen die Kosten für Elektromobile bis 6 km/h. Sprechen Sie uns an — wir beraten Sie gerne zu den Fördermöglichkeiten.",
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
                  Jetzt kostenlosen Eignungstest machen
                </h2>
                <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
                  Unser 2-Minuten-Test analysiert Ihre persönliche Situation und
                  zeigt Ihnen sofort, welches Modell am besten zu Ihnen passt —
                  kostenlos und unverbindlich.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/"
                    className="btn btn-cta inline-flex items-center gap-3"
                  >
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
                    Jetzt Eignungstest starten
                  </Link>
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

              {/* Fazit */}
              <section className="mb-8">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  Fazit: Das richtige E-Mobil gibt es für jeden
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  Ob Sie nur kurze Wege im Ort erledigen möchten oder auch bei
                  Regen und Schnee mobil sein wollen — unter den 6 Modellen ist
                  für jede Lebenssituation das Richtige dabei. Führerscheinfreie
                  Modelle wie der Vita 4000 machen den Einstieg besonders
                  einfach, während Kabinenroller die Lösung für Ganzjahresfahrer
                  und Paare sind.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Unsere Empfehlung: Nutzen Sie den kostenlosen Eignungstest
                  oder rufen Sie uns an. Wir beraten Sie persönlich und finden
                  gemeinsam das Modell, das perfekt zu Ihnen passt.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>
                    Rufen Sie uns an unter{" "}
                    <a
                      href="tel:06747950060"
                      className="font-bold underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      06747 950060
                    </a>{" "}
                    — wir beraten Sie gerne, kostenlos und unverbindlich.
                  </strong>
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
