import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://e-mobil-berater.de";
const PAGE_URL = `${SITE_URL}/ratgeber/reichweite-elektroroller`;

export const metadata: Metadata = {
  title: "Reichweite von Elektrorollern — Alles was Sie wissen müssen (2026)",
  description:
    "Wie weit kommt ein Elektroroller? Reichweiten von 30 bis 100 km im Vergleich. Einflussfaktoren, Modellvergleich und praktische Tipps für maximale Reichweite.",
  keywords: [
    "reichweite elektroroller",
    "elektroroller reichweite",
    "wie weit kommt ein elektroroller",
    "elektromobil reichweite",
    "kabinenroller reichweite",
    "e-mobil reichweite",
    "akku reichweite elektroroller",
    "elektroroller batterie",
    "elektroroller reichweite winter",
    "seniorenmobil reichweite",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: PAGE_URL,
    siteName: "Elektroroller Futura",
    title: "Reichweite von Elektrorollern — Alles was Sie wissen müssen",
    description:
      "Wie weit kommt ein Elektroroller? Reichweiten von 30 bis 100 km im Vergleich. Einflussfaktoren und praktische Tipps.",
    images: [
      {
        url: `${SITE_URL}/images/hero-header.jpg`,
        width: 1200,
        height: 630,
        alt: "Reichweite von Elektrorollern - Übersicht",
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
  headline: "Reichweite von Elektrorollern — Alles was Sie wissen müssen",
  description:
    "Wie weit kommt ein Elektroroller? Reichweiten von 30 bis 100 km im Vergleich. Einflussfaktoren, Modellvergleich und praktische Tipps für maximale Reichweite.",
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
      name: "Wie weit kommt ein Elektroroller mit einer Akkuladung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Reichweite hängt stark vom Modell und den Fahrbedingungen ab. E-Mobile erreichen typischerweise 30 bis 90 km, Kabinenroller 50 bis 100 km pro Ladung. Die tatsächliche Reichweite wird durch Faktoren wie Fahrgeschwindigkeit, Gelände, Zuladung und Temperatur beeinflusst.",
      },
    },
    {
      "@type": "Question",
      name: "Was beeinflusst die Reichweite eines Elektrorollers am meisten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die wichtigsten Einflussfaktoren sind: 1) Fahrgeschwindigkeit — langsameres Fahren spart Energie, 2) Gelände — Steigungen verbrauchen deutlich mehr Strom, 3) Zuladung — mehr Gewicht reduziert die Reichweite, 4) Außentemperatur — Kälte verringert die Akkuleistung um 10-30%, 5) Reifendruck — zu geringer Druck erhöht den Energieverbrauch.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert es, einen Elektroroller aufzuladen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Ladezeit beträgt je nach Akkugröße und Ladegerät zwischen 4 und 8 Stunden. Die meisten Modelle können über Nacht an einer normalen 230-Volt-Haushaltssteckdose geladen werden. Einige Modelle bieten herausnehmbare Akkus, die bequem in der Wohnung geladen werden können.",
      },
    },
    {
      "@type": "Question",
      name: "Reicht die Reichweite eines Elektrorollers für den Alltag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, für die allermeisten Alltagsfahrten ist die Reichweite mehr als ausreichend. Typische tägliche Fahrten wie Einkaufen, Arztbesuche oder Besuche bei Freunden liegen bei 5 bis 20 km. Selbst das günstigste E-Mobil schafft 30 km — genug für mehrere Tage normaler Nutzung ohne Aufladen.",
      },
    },
    {
      "@type": "Question",
      name: "Verliert der Akku eines Elektrorollers im Winter Reichweite?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, bei niedrigen Temperaturen (unter 5 Grad Celsius) kann die Reichweite um 10 bis 30 Prozent sinken. Lithium-Ionen-Akkus arbeiten bei Kälte weniger effizient. Tipp: Lagern Sie den Akku bei Zimmertemperatur und laden Sie ihn warm auf. Kabinenroller mit geschlossener Kabine und Heizung sind im Winter deutlich im Vorteil.",
      },
    },
    {
      "@type": "Question",
      name: "Wie viel kostet es, einen Elektroroller aufzuladen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Stromkosten für eine volle Ladung liegen je nach Akkugröße und Strompreis bei etwa 0,50 bis 2,00 Euro. Bei einer Reichweite von 60 km und einem Strompreis von 30 Cent pro kWh kommen Sie auf etwa 1 bis 2 Cent pro Kilometer. Das ist deutlich günstiger als jedes Auto oder der öffentliche Nahverkehr.",
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
      name: "Reichweite von Elektrorollern",
      item: PAGE_URL,
    },
  ],
};

export default function ReichweiteElektrorollerPage() {
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
                <span className="text-white/80">Reichweite</span>
              </nav>

              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                  style={{ background: "#0c6b58" }}
                >
                  Technik &amp; Praxis
                </span>
                <span className="text-base text-white/50">
                  8 Min. Lesezeit
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Reichweite von Elektrorollern — Alles was Sie wissen müssen
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
                Wie weit kommt ein Elektroroller wirklich? Wir erklären die
                wichtigsten Einflussfaktoren, vergleichen die Reichweiten
                verschiedener Modelle und geben praktische Tipps für maximale
                Reichweite.
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
                      href="#typische-reichweiten"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Typische Reichweiten im Überblick
                    </a>
                  </li>
                  <li>
                    <a
                      href="#einflussfaktoren"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Was beeinflusst die Reichweite?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#modellvergleich"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Modellvergleich: Reichweiten unserer Fahrzeuge
                    </a>
                  </li>
                  <li>
                    <a
                      href="#tipps"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      10 Tipps für maximale Reichweite
                    </a>
                  </li>
                  <li>
                    <a
                      href="#ladezeit"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Ladezeiten und Stromkosten
                    </a>
                  </li>
                  <li>
                    <a
                      href="#alltagsreichweite"
                      className="hover:underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Reicht die Reichweite für meinen Alltag?
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
                  <strong>&bdquo;Wie weit komme ich mit einer
                  Akkuladung?&ldquo;</strong> — diese Frage beschäftigt jeden,
                  der über den Kauf eines Elektrorollers nachdenkt. Und das zu
                  Recht: Die Reichweite bestimmt, ob ein Elektromobil oder
                  Kabinenroller für Ihren Alltag geeignet ist.
                </p>
                <p>
                  In diesem umfassenden Ratgeber erklären wir Ihnen alles, was
                  Sie über die Reichweite von Elektrorollern wissen müssen —
                  von den technischen Grundlagen bis zu praktischen Tipps, mit
                  denen Sie das Maximum aus Ihrem Akku herausholen.
                </p>
              </div>

              {/* Section: Typische Reichweiten */}
              <section id="typische-reichweiten" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  1. Typische Reichweiten im Überblick
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Die Reichweite von Elektrorollern variiert je nach
                  Fahrzeugtyp erheblich. Hier ein Überblick über die
                  verschiedenen Kategorien:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "linear-gradient(135deg, #dcfce7, #f0fdf4)",
                      border: "2px solid #86efac",
                    }}
                  >
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: "#15803d" }}
                    >
                      E-Mobile (Seniorenmobile)
                    </h3>
                    <div
                      className="text-4xl font-bold mb-3"
                      style={{ color: "#15803d" }}
                    >
                      30 — 90 km
                    </div>
                    <ul className="space-y-2 text-lg">
                      <li>Einfache Modelle: 30-50 km</li>
                      <li>Mittelklasse: 50-70 km</li>
                      <li>Premium-Modelle: 70-90 km</li>
                    </ul>
                  </div>

                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
                      border: "2px solid #93c5fd",
                    }}
                  >
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: "#1d4ed8" }}
                    >
                      Kabinenroller
                    </h3>
                    <div
                      className="text-4xl font-bold mb-3"
                      style={{ color: "#1d4ed8" }}
                    >
                      50 — 100 km
                    </div>
                    <ul className="space-y-2 text-lg">
                      <li>25 km/h Modelle: 50-80 km</li>
                      <li>45 km/h Modelle: 60-100 km</li>
                      <li>Mit Zusatzakku: bis 120+ km</li>
                    </ul>
                  </div>
                </div>

                <div className="info-badge success" style={{ fontSize: "20px" }}>
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
                    <strong>Gut zu wissen:</strong> Die angegebenen
                    Reichweiten sind Herstellerangaben unter optimalen
                    Bedingungen. Im Alltag erreichen Sie in der Regel 70-90%
                    dieser Werte.
                  </span>
                </div>
              </section>

              {/* Section: Einflussfaktoren */}
              <section id="einflussfaktoren" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  2. Was beeinflusst die Reichweite?
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Sechs Faktoren bestimmen, wie weit Sie mit einer Akkuladung
                  kommen. Wenn Sie diese kennen, können Sie Ihre Reichweite
                  deutlich besser einschätzen:
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: "Akkukapazität (Wattstunden / Wh)",
                      icon: "1",
                      color: "#16a34a",
                      text: "Die Akkukapazität ist der wichtigste Faktor. Sie wird in Wattstunden (Wh) oder Amperestunden (Ah) angegeben. Je höher die Kapazität, desto weiter kommen Sie. Ein typischer E-Mobil-Akku hat zwischen 1.000 und 3.000 Wh. Kabinenroller haben oft 3.000 bis 5.000 Wh.",
                    },
                    {
                      title: "Fahrgeschwindigkeit",
                      icon: "2",
                      color: "#2563eb",
                      text: "Die Geschwindigkeit hat einen enormen Einfluss auf die Reichweite. Wer konstant mit voller Geschwindigkeit fährt, verbraucht deutlich mehr Energie als jemand, der gemäßigt unterwegs ist. Faustformel: 10% weniger Geschwindigkeit = 15-20% mehr Reichweite.",
                    },
                    {
                      title: "Gelände und Steigungen",
                      icon: "3",
                      color: "#7c3aed",
                      text: "Bergauf-Fahrten verbrauchen erheblich mehr Energie als Fahrten auf ebener Strecke. Wer in einer hügeligen Region lebt, muss mit 20-40% weniger Reichweite rechnen. Auf der anderen Seite gewinnen viele Modelle bergab durch Rekuperation Energie zurück.",
                    },
                    {
                      title: "Zuladung (Gewicht)",
                      icon: "4",
                      color: "#d4940a",
                      text: "Das Gesamtgewicht von Fahrer und Gepäck beeinflusst die Reichweite direkt. Ein Fahrer mit 100 kg verbraucht mehr Energie als einer mit 60 kg. Einkäufe und Gepäck kommen noch dazu. Pro 10 kg Mehrgewicht sinkt die Reichweite um ca. 3-5%.",
                    },
                    {
                      title: "Außentemperatur",
                      icon: "5",
                      color: "#dc2626",
                      text: "Lithium-Ionen-Akkus reagieren empfindlich auf Kälte. Bei Temperaturen unter 5 Grad Celsius kann die Reichweite um 10 bis 30 Prozent sinken. Im Sommer bei 20-25 Grad erreichen Sie die beste Leistung. Extreme Hitze (über 35 Grad) kann den Akku ebenfalls belasten.",
                    },
                    {
                      title: "Reifendruck und Fahrzustand",
                      icon: "6",
                      color: "#0891b2",
                      text: "Zu niedriger Reifendruck erhöht den Rollwiderstand und damit den Energieverbrauch spürbar — bis zu 15% mehr Verbrauch bei deutlich zu niedrigem Druck. Auch der allgemeine Fahrzustand (Bremsen, Lager, Kette) spielt eine Rolle.",
                    },
                  ].map((factor, i) => (
                    <div
                      key={i}
                      className="flex gap-5 rounded-2xl p-6"
                      style={{
                        background: "white",
                        border: "1px solid #e0ddd8",
                        borderLeft: `4px solid ${factor.color}`,
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl"
                        style={{ background: factor.color }}
                      >
                        {factor.icon}
                      </div>
                      <div>
                        <h3
                          className="text-xl font-bold mb-2"
                          style={{ color: "var(--navy)" }}
                        >
                          {factor.title}
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-700">
                          {factor.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: Modellvergleich */}
              <section id="modellvergleich" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  3. Modellvergleich: Reichweiten unserer Fahrzeuge
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Die folgende Tabelle zeigt die Reichweiten aller aktuellen
                  Futura-Modelle im Vergleich. Alle Angaben beziehen sich auf
                  normale Fahrbedingungen mit einem Fahrer von ca. 75 kg auf
                  ebenem Gelände.
                </p>

                <div className="overflow-x-auto rounded-2xl border-2" style={{ borderColor: "#e0ddd8" }}>
                  <table className="w-full text-lg" style={{ minWidth: "800px" }}>
                    <thead>
                      <tr
                        style={{
                          background:
                            "linear-gradient(135deg, var(--navy) 0%, #1a3352 100%)",
                        }}
                      >
                        <th className="text-left text-white font-bold px-6 py-4">
                          Modell
                        </th>
                        <th className="text-left text-white font-bold px-6 py-4">
                          Typ
                        </th>
                        <th className="text-left text-white font-bold px-6 py-4">
                          Geschwindigkeit
                        </th>
                        <th className="text-left text-white font-bold px-6 py-4">
                          Reichweite
                        </th>
                        <th className="text-left text-white font-bold px-6 py-4">
                          Ladezeit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Vita 4000",
                          type: "E-Mobil, 4-Rad",
                          speed: "15 km/h",
                          range: "ca. 50 km",
                          charge: "6-8 Std.",
                          bg: "#f0fdf4",
                        },
                        {
                          name: "Vita Care 1000",
                          type: "E-Mobil, 3-Rad",
                          speed: "25 km/h",
                          range: "bis 90 km",
                          charge: "6-8 Std.",
                          bg: "#eff6ff",
                        },
                        {
                          name: "Vita Care 4000",
                          type: "E-Mobil, 4-Rad",
                          speed: "25 km/h",
                          range: "ca. 60 km",
                          charge: "6-8 Std.",
                          bg: "#f0fdf4",
                        },
                        {
                          name: "Neo",
                          type: "E-Mobil, 4-Rad",
                          speed: "45 km/h",
                          range: "ca. 70 km",
                          charge: "6-8 Std.",
                          bg: "#eff6ff",
                        },
                        {
                          name: "Kabinenroller Cruise",
                          type: "Kabinenroller, 3-Rad",
                          speed: "25 km/h",
                          range: "ca. 60 km",
                          charge: "6-8 Std.",
                          bg: "#f0fdf4",
                        },
                        {
                          name: "Kabinenroller Flow",
                          type: "Kabinenroller, 4-Rad",
                          speed: "45 km/h",
                          range: "ca. 80 km",
                          charge: "6-8 Std.",
                          bg: "#eff6ff",
                        },
                      ].map((model, i) => (
                        <tr key={i} style={{ background: model.bg }}>
                          <td className="px-6 py-4 font-bold">{model.name}</td>
                          <td className="px-6 py-4">{model.type}</td>
                          <td className="px-6 py-4">{model.speed}</td>
                          <td
                            className="px-6 py-4 font-bold"
                            style={{ color: "var(--emerald)" }}
                          >
                            {model.range}
                          </td>
                          <td className="px-6 py-4">{model.charge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-base text-gray-500 mt-3">
                  Alle Angaben sind Richtwerte unter normalen Fahrbedingungen.
                  Die tatsächliche Reichweite kann je nach Einflussfaktoren
                  abweichen.
                </p>
              </section>

              {/* Section: Tipps */}
              <section id="tipps" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  4. 10 Tipps für maximale Reichweite
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Mit diesen einfachen Tipps holen Sie das Maximum aus Ihrem
                  Akku heraus:
                </p>

                <div className="space-y-4">
                  {[
                    {
                      tip: "Fahren Sie gleichmäßig",
                      detail:
                        "Häufiges starkes Beschleunigen und Bremsen verbraucht deutlich mehr Energie als eine konstante Geschwindigkeit. Fahren Sie vorausschauend und ruhig.",
                    },
                    {
                      tip: "Nutzen Sie nicht immer die Höchstgeschwindigkeit",
                      detail:
                        "Schon 10% weniger Geschwindigkeit können die Reichweite um 15-20% erhöhen. Wenn Sie es nicht eilig haben, fahren Sie etwas langsamer.",
                    },
                    {
                      tip: "Prüfen Sie regelmäßig den Reifendruck",
                      detail:
                        "Der optimale Reifendruck steht in der Bedienungsanleitung. Prüfen Sie ihn alle 2-4 Wochen. Zu niedriger Druck kostet spürbar Reichweite.",
                    },
                    {
                      tip: "Laden Sie den Akku bei Zimmertemperatur",
                      detail:
                        "Ein kalter Akku nimmt weniger Energie auf. Laden Sie wenn möglich in einem temperierten Raum, besonders im Winter.",
                    },
                    {
                      tip: "Vermeiden Sie Tiefentladung",
                      detail:
                        "Laden Sie den Akku regelmäßig nach und lassen Sie ihn nicht komplett leer fahren. Idealerweise laden Sie bei 20-30% Restkapazität nach.",
                    },
                    {
                      tip: "Planen Sie Ihre Route",
                      detail:
                        "Wählen Sie möglichst flache Strecken und vermeiden Sie unnötige Umwege. Steigungen sind der größte Reichweiten-Killer.",
                    },
                    {
                      tip: "Reduzieren Sie unnötiges Gewicht",
                      detail:
                        "Transportieren Sie nur das Nötigste. Jedes Kilogramm zusätzliches Gewicht kostet Reichweite.",
                    },
                    {
                      tip: "Nutzen Sie die Rekuperation",
                      detail:
                        "Falls Ihr Modell über Rekuperation (Energierückgewinnung beim Bremsen) verfügt, nutzen Sie diese konsequent, besonders bergab.",
                    },
                    {
                      tip: "Schützen Sie den Akku vor extremen Temperaturen",
                      detail:
                        "Stellen Sie Ihr Fahrzeug im Winter möglichst in eine Garage und vermeiden Sie direkte Sonneneinstrahlung im Sommer.",
                    },
                    {
                      tip: "Pflegen Sie Ihr Fahrzeug regelmäßig",
                      detail:
                        "Gut geschmierte Lager, saubere Kontakte und ein gepflegter Motor arbeiten effizienter und erhöhen die Reichweite.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 rounded-2xl p-5"
                      style={{
                        background: "white",
                        border: "1px solid #e0ddd8",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--emerald) 0%, var(--emerald-light) 100%)",
                        }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <h3
                          className="text-lg font-bold mb-1"
                          style={{ color: "var(--navy)" }}
                        >
                          {item.tip}
                        </h3>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: Ladezeit */}
              <section id="ladezeit" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  5. Ladezeiten und Stromkosten
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Das Laden eines Elektrorollers ist unkompliziert und
                  günstig. Die meisten Modelle werden einfach an eine normale
                  230-Volt-Haushaltssteckdose angeschlossen.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "linear-gradient(135deg, #fef3c7, #fff7ed)",
                      border: "2px solid #fcd34d",
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#a16207" }}
                    >
                      Typische Ladezeiten
                    </h3>
                    <ul className="space-y-2 text-lg">
                      <li>
                        <strong>E-Mobile:</strong> 6-8 Stunden (über Nacht)
                      </li>
                      <li>
                        <strong>Kabinenroller:</strong> 6-8 Stunden (über
                        Nacht)
                      </li>
                      <li>
                        <strong>Tipp:</strong> Abends anstecken, morgens ist
                        der Akku voll
                      </li>
                    </ul>
                  </div>

                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "linear-gradient(135deg, #dcfce7, #f0fdf4)",
                      border: "2px solid #86efac",
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#15803d" }}
                    >
                      Stromkosten pro Ladung
                    </h3>
                    <ul className="space-y-2 text-lg">
                      <li>
                        <strong>E-Mobile:</strong> ca. 0,50 - 1,50 EUR
                      </li>
                      <li>
                        <strong>Kabinenroller:</strong> ca. 1,00 - 2,00 EUR
                      </li>
                      <li>
                        <strong>Pro Kilometer:</strong> nur 1-2 Cent!
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="info-badge info" style={{ fontSize: "20px" }}>
                  <svg
                    className="w-8 h-8 flex-shrink-0"
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
                    <strong>Rechenbeispiel:</strong> Bei 60 km Reichweite und
                    Stromkosten von 1,50 EUR pro Ladung kostet Sie ein
                    Kilometer nur 2,5 Cent. Eine Autofahrt kostet im Vergleich
                    etwa 15-20 Cent pro Kilometer.
                  </span>
                </div>
              </section>

              {/* Section: Alltagsreichweite */}
              <section id="alltagsreichweite" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  6. Reicht die Reichweite für meinen Alltag?
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Die kurze Antwort: <strong>Ja, für die allermeisten
                  Senioren reicht die Reichweite völlig aus.</strong> Schauen
                  wir uns typische Alltagsfahrten an:
                </p>

                <div className="overflow-x-auto rounded-2xl border-2 mb-6" style={{ borderColor: "#e0ddd8" }}>
                  <table className="w-full text-lg" style={{ minWidth: "600px" }}>
                    <thead>
                      <tr
                        style={{
                          background:
                            "linear-gradient(135deg, var(--navy) 0%, #1a3352 100%)",
                        }}
                      >
                        <th className="text-left text-white font-bold px-6 py-4">
                          Alltagsfahrt
                        </th>
                        <th className="text-left text-white font-bold px-6 py-4">
                          Typische Entfernung
                        </th>
                        <th className="text-left text-white font-bold px-6 py-4">
                          Ausreichend mit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          trip: "Zum Bäcker und zurück",
                          dist: "1-3 km",
                          model: "Allen Modellen",
                          bg: "#f0fdf4",
                        },
                        {
                          trip: "Einkauf im Supermarkt",
                          dist: "2-8 km",
                          model: "Allen Modellen",
                          bg: "#eff6ff",
                        },
                        {
                          trip: "Arztbesuch in der Stadt",
                          dist: "5-15 km",
                          model: "Allen Modellen",
                          bg: "#f0fdf4",
                        },
                        {
                          trip: "Besuch bei Freunden",
                          dist: "5-25 km",
                          model: "Allen Modellen",
                          bg: "#eff6ff",
                        },
                        {
                          trip: "Tagesausflug (Hin + Zurück)",
                          dist: "30-60 km",
                          model: "Vita Care 1000, Neo, Flow",
                          bg: "#f0fdf4",
                        },
                        {
                          trip: "Längere Tour",
                          dist: "60-100 km",
                          model: "Vita Care 1000, Flow",
                          bg: "#eff6ff",
                        },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: row.bg }}>
                          <td className="px-6 py-4 font-bold">{row.trip}</td>
                          <td className="px-6 py-4">{row.dist}</td>
                          <td className="px-6 py-4">{row.model}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="text-lg leading-relaxed mb-4">
                  Wie Sie sehen, reichen selbst die einfacheren Modelle für
                  die typischen täglichen Fahrten mehrfach aus. Die meisten
                  unserer Kunden laden ihr Fahrzeug nur alle 2-3 Tage auf.
                </p>

                <div className="info-badge success" style={{ fontSize: "20px" }}>
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
                    <strong>Unser Tipp:</strong> Wenn Sie unsicher sind, ob
                    die Reichweite für Ihre Strecken ausreicht, rufen Sie uns
                    an. Wir beraten Sie kostenlos und finden das passende
                    Modell.
                  </span>
                </div>
              </section>

              {/* Section: Winter-Reichweite */}
              <section className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  Reichweite im Winter — worauf Sie achten sollten
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Die kalte Jahreszeit ist die größte Herausforderung für
                  Akkus. Hier sind die wichtigsten Punkte:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
                      border: "2px solid #fca5a5",
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#dc2626" }}
                    >
                      Reichweitenverlust im Winter
                    </h3>
                    <ul className="space-y-2 text-lg">
                      <li>
                        <strong>0 bis 5 Grad:</strong> ca. 10-20% weniger
                        Reichweite
                      </li>
                      <li>
                        <strong>Unter 0 Grad:</strong> ca. 20-30% weniger
                        Reichweite
                      </li>
                      <li>
                        <strong>Bei starkem Frost:</strong> bis zu 40% weniger
                        möglich
                      </li>
                    </ul>
                  </div>

                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "linear-gradient(135deg, #dcfce7, #f0fdf4)",
                      border: "2px solid #86efac",
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "#15803d" }}
                    >
                      So minimieren Sie den Verlust
                    </h3>
                    <ul className="space-y-2 text-lg">
                      <li>Akku bei Zimmertemperatur laden</li>
                      <li>Fahrzeug in der Garage lagern</li>
                      <li>Kürzere Fahrten einplanen</li>
                      <li>Kabinenroller: Heizung nutzt Akku-Wärme</li>
                    </ul>
                  </div>
                </div>

                <p className="text-lg leading-relaxed">
                  <strong>Tipp für den Winter:</strong> Unsere{" "}
                  <Link
                    href="/"
                    className="font-bold underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    Kabinenroller mit geschlossener Kabine
                  </Link>{" "}
                  sind im Winter deutlich im Vorteil. Die Kabine schützt nicht
                  nur Sie vor Wind und Kälte, sondern auch den Akku vor
                  extremen Temperaturen.
                </p>
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
                  Welches Modell passt zu Ihren Strecken?
                </h2>
                <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
                  Unser kostenloser Eignungs-Test analysiert Ihre typischen
                  Fahrten und empfiehlt das Modell mit der passenden
                  Reichweite.
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
                  7. Häufig gestellte Fragen zur Reichweite von Elektrorollern
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      q: "Wie weit kommt ein Elektroroller mit einer Akkuladung?",
                      a: "Die Reichweite hängt stark vom Modell und den Fahrbedingungen ab. E-Mobile erreichen typischerweise 30 bis 90 km, Kabinenroller 50 bis 100 km pro Ladung. Die tatsächliche Reichweite wird durch Faktoren wie Fahrgeschwindigkeit, Gelände, Zuladung und Temperatur beeinflusst.",
                    },
                    {
                      q: "Was beeinflusst die Reichweite eines Elektrorollers am meisten?",
                      a: "Die wichtigsten Einflussfaktoren sind: 1) Fahrgeschwindigkeit — langsameres Fahren spart Energie, 2) Gelände — Steigungen verbrauchen deutlich mehr Strom, 3) Zuladung — mehr Gewicht reduziert die Reichweite, 4) Außentemperatur — Kälte verringert die Akkuleistung um 10-30%, 5) Reifendruck — zu geringer Druck erhöht den Energieverbrauch.",
                    },
                    {
                      q: "Wie lange dauert es, einen Elektroroller aufzuladen?",
                      a: "Die Ladezeit beträgt je nach Akkugröße und Ladegerät zwischen 4 und 8 Stunden. Die meisten Modelle können über Nacht an einer normalen 230-Volt-Haushaltssteckdose geladen werden. Einige Modelle bieten herausnehmbare Akkus, die bequem in der Wohnung geladen werden können.",
                    },
                    {
                      q: "Reicht die Reichweite eines Elektrorollers für den Alltag?",
                      a: "Ja, für die allermeisten Alltagsfahrten ist die Reichweite mehr als ausreichend. Typische tägliche Fahrten wie Einkaufen, Arztbesuche oder Besuche bei Freunden liegen bei 5 bis 20 km. Selbst das günstigste E-Mobil schafft 30 km — genug für mehrere Tage normaler Nutzung ohne Aufladen.",
                    },
                    {
                      q: "Verliert der Akku eines Elektrorollers im Winter Reichweite?",
                      a: "Ja, bei niedrigen Temperaturen (unter 5 Grad Celsius) kann die Reichweite um 10 bis 30 Prozent sinken. Lithium-Ionen-Akkus arbeiten bei Kälte weniger effizient. Tipp: Lagern Sie den Akku bei Zimmertemperatur und laden Sie ihn warm auf. Kabinenroller mit geschlossener Kabine und Heizung sind im Winter deutlich im Vorteil.",
                    },
                    {
                      q: "Wie viel kostet es, einen Elektroroller aufzuladen?",
                      a: "Die Stromkosten für eine volle Ladung liegen je nach Akkugröße und Strompreis bei etwa 0,50 bis 2,00 Euro. Bei einer Reichweite von 60 km und einem Strompreis von 30 Cent pro kWh kommen Sie auf etwa 1 bis 2 Cent pro Kilometer. Das ist deutlich günstiger als jedes Auto oder der öffentliche Nahverkehr.",
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
                  Fazit: Reichweite ist selten das Problem
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  Unsere Erfahrung zeigt: Die Reichweite moderner
                  Elektroroller und E-Mobile reicht für den Großteil aller
                  Alltagsfahrten völlig aus. Die meisten unserer Kunden fahren
                  täglich 5 bis 20 Kilometer und laden ihr Fahrzeug nur alle
                  paar Tage auf.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Wenn Sie gelegentlich längere Strecken fahren, empfehlen wir
                  ein Modell mit größerer Reichweite wie den Vita Care 1000
                  (bis 90 km) oder den Kabinenroller Flow (ca. 80 km).
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>Sie sind unsicher, welches Modell die richtige
                  Reichweite für Ihren Alltag bietet?</strong> Rufen Sie uns
                  an unter{" "}
                  <a
                    href="tel:06747950060"
                    className="font-bold underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    06747 950060
                  </a>{" "}
                  oder machen Sie unseren{" "}
                  <Link
                    href="/"
                    className="font-bold underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    kostenlosen Eignungs-Test
                  </Link>
                  . Wir beraten Sie kostenlos und unverbindlich.
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
                  href="/ratgeber/fuehrerschein-elektroroller"
                  className="text-xl font-bold hover:underline block"
                  style={{ color: "var(--navy)" }}
                >
                  Führerschein für Elektroroller — Was Sie wissen müssen
                </Link>
                <p className="text-base text-gray-500 mt-2">
                  Alle Führerschein-Klassen und Sonderregelungen verständlich erklärt.
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
