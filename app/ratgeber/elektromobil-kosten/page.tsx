import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://e-mobil-berater.de";
const PAGE_URL = `${SITE_URL}/ratgeber/elektromobil-kosten`;
const SHOP_URL =
  "https://elektroroller-futura.de/elektromobilitaet-fuer-senioren?utm_source=emobilberater&utm_medium=ratgeber&utm_campaign=kosten";

export const metadata: Metadata = {
  title: "Was kostet ein Elektromobil? Alle Kosten im Überblick (2026)",
  description:
    "Elektromobil Kosten: Anschaffung ab 1.299 EUR, Strom nur 1 EUR/100 km, Versicherung ab 35 EUR/Jahr. Kein TÜV, keine Steuer. Vergleich mit Auto und Ratenzahlung ab 29 EUR/Monat.",
  keywords: [
    "elektromobil kosten",
    "seniorenmobil preis",
    "elektromobil unterhalt",
    "elektromobil versicherung",
    "elektromobil betriebskosten",
    "seniorenmobil kosten",
    "elektromobil ratenzahlung",
    "kabinenroller kosten",
    "elektromobil wartung",
    "elektromobil strom kosten",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    locale: "de_DE",
    url: PAGE_URL,
    siteName: "E-Mobil Berater",
    title: "Was kostet ein Elektromobil? Alle Kosten im Überblick",
    description:
      "Anschaffung, Strom, Versicherung, Wartung — alle Kosten eines Elektromobils auf einen Blick. Plus: Vergleich mit dem Auto.",
    images: [
      {
        url: `${SITE_URL}/images/hero-header.jpg`,
        width: 1200,
        height: 630,
        alt: "Elektromobil Kosten im Überblick",
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
  headline: "Was kostet ein Elektromobil? Alle Kosten im Überblick",
  description:
    "Elektromobil Kosten: Anschaffung ab 1.299 EUR, Strom nur 1 EUR/100 km, Versicherung ab 35 EUR/Jahr. Kein TÜV, keine Steuer. Vergleich mit dem Auto.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was kostet ein Elektromobil in der Anschaffung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Einfache Seniorenmobile beginnen ab 1.299 EUR. Komfortmodelle mit mehr Reichweite und Ausstattung liegen bei 2.500 bis 4.500 EUR. Geschlossene Kabinenroller mit Wetterschutz kosten zwischen 5.999 und 9.999 EUR.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet der Strom für ein Elektromobil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein Elektromobil verbraucht etwa 1 EUR Strom pro 100 Kilometer. Bei einer durchschnittlichen Nutzung von 3.000 km im Jahr sind das nur rund 30 EUR Stromkosten im gesamten Jahr.",
      },
    },
    {
      "@type": "Question",
      name: "Braucht ein Elektromobil TÜV oder Steuer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Elektromobile bis 45 km/h sind von der Kfz-Steuer befreit und benötigen keine HU/TÜV-Untersuchung. Es fallen lediglich Versicherungskosten ab 35 EUR pro Jahr an.",
      },
    },
    {
      "@type": "Question",
      name: "Kann man ein Elektromobil in Raten bezahlen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, viele Modelle sind ab 29 EUR pro Monat finanzierbar. Wir bieten flexible Ratenzahlung über Klarna und PayPal an — ganz ohne versteckte Kosten.",
      },
    },
    {
      "@type": "Question",
      name: "Wie teuer ist die Versicherung für ein Elektromobil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Haftpflichtversicherung für Elektromobile kostet ab 35 EUR pro Jahr. Es wird lediglich ein Versicherungskennzeichen benötigt, das jährlich erneuert wird. Eine Teilkasko ist ab ca. 60 EUR/Jahr möglich.",
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
      name: "Elektromobil Kosten",
      item: PAGE_URL,
    },
  ],
};

export default function ElektromobilKostenPage() {
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
                <span className="text-white/80">Kosten</span>
              </nav>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white bg-blue-600">
                  Kosten &amp; Finanzen
                </span>
                <span className="text-base text-white/50">
                  10 Min. Lesezeit
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Was kostet ein Elektromobil? Alle Kosten im Überblick
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
                Anschaffung, Strom, Versicherung, Wartung — wir rechnen alle
                Kosten für Sie durch. Und zeigen, warum ein Elektromobil
                günstiger ist als Sie denken.
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
                  {[
                    { href: "#anschaffung", label: "Anschaffungskosten" },
                    { href: "#betrieb", label: "Betriebskosten (Strom)" },
                    { href: "#versicherung", label: "Versicherung" },
                    { href: "#steuer-tuev", label: "Steuer und TÜV" },
                    { href: "#wartung", label: "Wartungskosten" },
                    { href: "#vergleich", label: "Kostenvergleich mit dem Auto" },
                    { href: "#ratenzahlung", label: "Ratenzahlung und Finanzierung" },
                    { href: "#faq", label: "Häufige Fragen" },
                  ].map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="hover:underline"
                        style={{ color: "var(--emerald)" }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Intro */}
              <div className="space-y-6 text-lg leading-relaxed mb-12">
                <p>
                  <strong>
                    &bdquo;Was kostet ein Elektromobil?&ldquo; ist die
                    wichtigste Frage vor dem Kauf.
                  </strong>{" "}
                  Die gute Nachricht: Ein Elektromobil ist deutlich günstiger
                  als ein Auto — sowohl in der Anschaffung als auch im
                  laufenden Betrieb.
                </p>
                <p>
                  In diesem Ratgeber zeigen wir Ihnen alle Kosten transparent
                  und verständlich. Von der Anschaffung über Strom und
                  Versicherung bis zur Wartung. Am Ende wissen Sie genau, was
                  auf Sie zukommt — ohne böse Überraschungen.
                </p>
              </div>

              {/* Section: Anschaffungskosten */}
              <section id="anschaffung" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  1. Anschaffungskosten
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Der Kaufpreis hängt vor allem von der Ausstattung, der
                  Reichweite und der Bauform ab. Hier ein Überblick über die
                  drei Preisklassen:
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    {
                      title: "Einstiegsmodelle",
                      price: "ab 1.299 EUR",
                      desc: "Kompakte Seniorenmobile bis 6 oder 15 km/h. Ideal für kurze Wege zum Einkaufen oder zum Arzt. Einfache Ausstattung, solide Reichweite.",
                      color: "#16a34a",
                    },
                    {
                      title: "Komfortmodelle",
                      price: "2.500 bis 4.500 EUR",
                      desc: "Seniorenmobile mit 25 km/h, größerem Akku, Federung und mehr Komfort. Perfekt für den täglichen Einsatz mit Reichweiten bis 60 km.",
                      color: "#2563eb",
                    },
                    {
                      title: "Kabinenroller",
                      price: "5.999 bis 9.999 EUR",
                      desc: "Geschlossene Fahrzeuge mit Dach, Heizung und bis zu 45 km/h. Wetterfest und komfortabel wie ein kleines Auto — aber ohne die hohen Folgekosten.",
                      color: "#7c3aed",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-6"
                      style={{
                        background: "white",
                        border: "1px solid #e0ddd8",
                        borderLeft: `4px solid ${item.color}`,
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <h3
                          className="text-xl font-bold"
                          style={{ color: "var(--navy)" }}
                        >
                          {item.title}
                        </h3>
                        <span
                          className="text-sm font-bold px-3 py-1 rounded-full text-white"
                          style={{ background: item.color }}
                        >
                          {item.price}
                        </span>
                      </div>
                      <p className="text-lg text-gray-700">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "linear-gradient(135deg, #ecfdf5, #f0fdf4)",
                    border: "2px solid #86efac",
                  }}
                >
                  <p className="text-lg font-bold" style={{ color: "#166534" }}>
                    Gut zu wissen: Ratenzahlung ab 29 EUR/Monat möglich.
                  </p>
                  <p className="text-base text-gray-700 mt-1">
                    Viele unserer Modelle können bequem in Raten über Klarna
                    oder PayPal finanziert werden. Mehr dazu im Abschnitt{" "}
                    <a
                      href="#ratenzahlung"
                      className="font-bold underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      Ratenzahlung
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* Section: Betriebskosten */}
              <section id="betrieb" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  2. Betriebskosten (Strom)
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Hier liegt der größte Vorteil gegenüber einem Auto:
                  Elektromobile verbrauchen extrem wenig Strom. Die
                  Ladekosten sind so niedrig, dass sie im Alltag kaum
                  auffallen.
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
                    Rechenbeispiel: Stromkosten
                  </h3>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl font-bold" style={{ color: "#16a34a" }}>
                        1 EUR
                      </span>
                      <span>
                        pro 100 Kilometer — das sind die gesamten Stromkosten.
                        Ein Elektromobil-Akku (ca. 1-2 kWh) kostet Sie rund
                        30 bis 60 Cent zum Vollladen.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl font-bold" style={{ color: "#16a34a" }}>
                        30 EUR
                      </span>
                      <span>
                        pro Jahr bei durchschnittlicher Nutzung (3.000 km).
                        Zum Vergleich: Ein Kleinwagen kostet rund 1.500 EUR
                        Benzin im Jahr.
                      </span>
                    </li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed">
                  <strong>Laden ist einfach:</strong> Sie stecken den Stecker
                  in jede normale Haushaltssteckdose. Die Ladezeit beträgt je
                  nach Modell 4 bis 8 Stunden — ideal über Nacht.
                </p>
              </section>

              {/* Section: Versicherung */}
              <section id="versicherung" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  3. Versicherung
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Elektromobile benötigen ein{" "}
                  <strong>Versicherungskennzeichen</strong>. Das ist ein
                  kleines Nummernschild, das Sie jährlich erneuern. Die Kosten
                  sind dabei sehr überschaubar:
                </p>

                <div className="overflow-x-auto rounded-2xl mb-6" style={{ border: "1px solid #e0ddd8" }}>
                  <table className="w-full text-left">
                    <thead>
                      <tr style={{ background: "var(--navy)", color: "white" }}>
                        <th className="px-6 py-4 font-bold">Versicherungsart</th>
                        <th className="px-6 py-4 font-bold">Kosten pro Jahr</th>
                      </tr>
                    </thead>
                    <tbody className="text-lg">
                      <tr style={{ background: "white" }}>
                        <td className="px-6 py-4 font-bold">Haftpflicht</td>
                        <td className="px-6 py-4">ab 35 EUR</td>
                      </tr>
                      <tr style={{ background: "#f8f7f5" }}>
                        <td className="px-6 py-4 font-bold">Teilkasko</td>
                        <td className="px-6 py-4">ab ca. 60 EUR</td>
                      </tr>
                      <tr style={{ background: "white" }}>
                        <td className="px-6 py-4 font-bold">Vollkasko</td>
                        <td className="px-6 py-4">ab ca. 100 EUR</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-lg leading-relaxed">
                  <strong>Zum Vergleich:</strong> Eine Kfz-Versicherung für
                  einen Kleinwagen kostet schnell 500 bis 1.000 EUR pro Jahr.
                  Mit einem Elektromobil sparen Sie also mehrere Hundert Euro
                  — jedes Jahr.
                </p>
              </section>

              {/* Section: Steuer und TÜV */}
              <section id="steuer-tuev" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  4. Steuer und TÜV — Beides entfällt!
                </h2>

                <div className="space-y-4 mb-6">
                  {[
                    {
                      icon: "0 EUR",
                      title: "Keine Kfz-Steuer",
                      desc: "Elektromobile bis 45 km/h sind komplett von der Kfz-Steuer befreit. Für ein Auto zahlen Sie je nach Modell 100 bis 400 EUR pro Jahr.",
                    },
                    {
                      icon: "0 EUR",
                      title: "Kein TÜV / Keine Hauptuntersuchung",
                      desc: "Elektromobile müssen nicht zur HU (TÜV). Das spart Ihnen alle 2 Jahre rund 100 bis 150 EUR — und die Fahrt zur Prüfstelle.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-2xl p-6"
                      style={{
                        background: "white",
                        border: "1px solid #e0ddd8",
                        borderLeft: "4px solid #16a34a",
                      }}
                    >
                      <span
                        className="text-2xl font-bold flex-shrink-0 px-3 py-1 rounded-full text-white"
                        style={{ background: "#16a34a" }}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <h3
                          className="text-xl font-bold mb-1"
                          style={{ color: "var(--navy)" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-lg text-gray-700">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: Wartung */}
              <section id="wartung" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  5. Wartungskosten
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Elektromobile haben deutlich weniger bewegliche Teile als
                  Autos. Es gibt keinen Ölwechsel, keinen Zahnriemen, keine
                  Auspuffanlage. Die Wartung ist daher{" "}
                  <strong>einfach und günstig</strong>:
                </p>

                <ul className="space-y-3 text-lg mb-6">
                  {[
                    "Reifenwechsel: ca. 20 bis 40 EUR pro Reifen",
                    "Bremsbeläge: ca. 15 bis 30 EUR (selten nötig dank Rekuperation)",
                    "Akku-Prüfung: meist kostenlos beim Händler",
                    "Jährliche Inspektion: ca. 50 bis 100 EUR (empfohlen, nicht Pflicht)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        style={{ color: "var(--emerald)" }}
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
                  <strong>Insgesamt:</strong> Rechnen Sie mit etwa{" "}
                  <strong>50 bis 150 EUR pro Jahr</strong> für Wartung. Bei
                  einem Auto sind es schnell 500 bis 1.000 EUR.
                </p>
              </section>

              {/* Section: Vergleich mit Auto */}
              <section id="vergleich" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  6. Kostenvergleich: Elektromobil vs. Auto
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Die folgende Tabelle zeigt, wie viel Sie mit einem
                  Elektromobil im Vergleich zu einem Kleinwagen sparen —
                  gerechnet pro Jahr:
                </p>

                <div
                  className="overflow-x-auto rounded-2xl mb-6"
                  style={{ border: "1px solid #e0ddd8" }}
                >
                  <table className="w-full text-left">
                    <thead>
                      <tr style={{ background: "var(--navy)", color: "white" }}>
                        <th className="px-6 py-4 font-bold">Kostenart</th>
                        <th className="px-6 py-4 font-bold">Elektromobil</th>
                        <th className="px-6 py-4 font-bold">Kleinwagen</th>
                      </tr>
                    </thead>
                    <tbody className="text-lg">
                      <tr style={{ background: "white" }}>
                        <td className="px-6 py-4 font-bold">Energie/Benzin</td>
                        <td className="px-6 py-4" style={{ color: "#16a34a" }}>
                          ca. 30 EUR
                        </td>
                        <td className="px-6 py-4 text-red-600">
                          ca. 1.500 EUR
                        </td>
                      </tr>
                      <tr style={{ background: "#f8f7f5" }}>
                        <td className="px-6 py-4 font-bold">Versicherung</td>
                        <td className="px-6 py-4" style={{ color: "#16a34a" }}>
                          ab 35 EUR
                        </td>
                        <td className="px-6 py-4 text-red-600">
                          ca. 500–1.000 EUR
                        </td>
                      </tr>
                      <tr style={{ background: "white" }}>
                        <td className="px-6 py-4 font-bold">Kfz-Steuer</td>
                        <td className="px-6 py-4" style={{ color: "#16a34a" }}>
                          0 EUR
                        </td>
                        <td className="px-6 py-4 text-red-600">
                          ca. 100–400 EUR
                        </td>
                      </tr>
                      <tr style={{ background: "#f8f7f5" }}>
                        <td className="px-6 py-4 font-bold">TÜV/HU</td>
                        <td className="px-6 py-4" style={{ color: "#16a34a" }}>
                          0 EUR
                        </td>
                        <td className="px-6 py-4 text-red-600">
                          ca. 75–150 EUR
                        </td>
                      </tr>
                      <tr style={{ background: "white" }}>
                        <td className="px-6 py-4 font-bold">Wartung</td>
                        <td className="px-6 py-4" style={{ color: "#16a34a" }}>
                          ca. 50–150 EUR
                        </td>
                        <td className="px-6 py-4 text-red-600">
                          ca. 500–1.000 EUR
                        </td>
                      </tr>
                      <tr
                        style={{
                          background: "var(--navy)",
                          color: "white",
                        }}
                      >
                        <td className="px-6 py-4 font-bold text-xl">
                          Gesamt pro Jahr
                        </td>
                        <td className="px-6 py-4 font-bold text-xl">
                          ca. 115–215 EUR
                        </td>
                        <td className="px-6 py-4 font-bold text-xl">
                          ca. 2.675–4.050 EUR
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "linear-gradient(135deg, #ecfdf5, #f0fdf4)",
                    border: "2px solid #86efac",
                  }}
                >
                  <p
                    className="text-xl font-bold mb-2"
                    style={{ color: "#166534" }}
                  >
                    Sie sparen bis zu 3.800 EUR pro Jahr!
                  </p>
                  <p className="text-lg text-gray-700">
                    Ein Elektromobil kostet im Unterhalt nur einen Bruchteil
                    eines Autos. Über 5 Jahre gerechnet sind das bis zu{" "}
                    <strong>19.000 EUR Ersparnis</strong> — allein bei den
                    laufenden Kosten.
                  </p>
                </div>
              </section>

              {/* Section: Ratenzahlung */}
              <section id="ratenzahlung" className="mb-14">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ color: "var(--navy)" }}
                >
                  7. Ratenzahlung und Finanzierung
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Sie müssen nicht alles auf einmal bezahlen. Wir bieten
                  flexible Finanzierungsmöglichkeiten, damit Ihr Elektromobil
                  in jedes Budget passt:
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    {
                      title: "Ratenzahlung ab 29 EUR/Monat",
                      desc: "Über Klarna oder PayPal — einfach beim Kauf auswählen. Flexible Laufzeiten von 6 bis 36 Monaten.",
                      color: "#2563eb",
                    },
                    {
                      title: "0%-Finanzierung möglich",
                      desc: "Bei ausgewählten Modellen bieten wir zinsfreie Ratenzahlung an. Fragen Sie uns einfach.",
                      color: "#16a34a",
                    },
                    {
                      title: "Krankenkassen-Zuschuss",
                      desc: "In bestimmten Fällen übernimmt die Krankenkasse einen Teil der Kosten. Wir helfen Ihnen beim Antrag.",
                      color: "#7c3aed",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-6"
                      style={{
                        background: "white",
                        border: "1px solid #e0ddd8",
                        borderLeft: `4px solid ${item.color}`,
                      }}
                    >
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{ color: "var(--navy)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-lg text-gray-700">{item.desc}</p>
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
                  Jetzt kostenlosen Eignungstest machen
                </h2>
                <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
                  Finden Sie in 2 Minuten heraus, welches Elektromobil zu
                  Ihnen passt — und was es kostet. Kostenlos und unverbindlich.
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
                    Jetzt Eignungstest starten
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
                  8. Häufig gestellte Fragen zu Elektromobil-Kosten
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      q: "Was kostet ein Elektromobil in der Anschaffung?",
                      a: "Einfache Seniorenmobile beginnen ab 1.299 EUR. Komfortmodelle mit mehr Reichweite und Ausstattung liegen bei 2.500 bis 4.500 EUR. Geschlossene Kabinenroller mit Wetterschutz kosten zwischen 5.999 und 9.999 EUR.",
                    },
                    {
                      q: "Was kostet der Strom für ein Elektromobil?",
                      a: "Ein Elektromobil verbraucht etwa 1 EUR Strom pro 100 Kilometer. Bei einer durchschnittlichen Nutzung von 3.000 km im Jahr sind das nur rund 30 EUR Stromkosten im gesamten Jahr.",
                    },
                    {
                      q: "Braucht ein Elektromobil TÜV oder Steuer?",
                      a: "Nein. Elektromobile bis 45 km/h sind von der Kfz-Steuer befreit und benötigen keine HU/TÜV-Untersuchung. Es fallen lediglich Versicherungskosten ab 35 EUR pro Jahr an.",
                    },
                    {
                      q: "Kann man ein Elektromobil in Raten bezahlen?",
                      a: "Ja, viele Modelle sind ab 29 EUR pro Monat finanzierbar. Wir bieten flexible Ratenzahlung über Klarna und PayPal an — ganz ohne versteckte Kosten.",
                    },
                    {
                      q: "Wie teuer ist die Versicherung für ein Elektromobil?",
                      a: "Die Haftpflichtversicherung für Elektromobile kostet ab 35 EUR pro Jahr. Es wird lediglich ein Versicherungskennzeichen benötigt, das jährlich erneuert wird. Eine Teilkasko ist ab ca. 60 EUR/Jahr möglich.",
                    },
                    {
                      q: "Lohnt sich ein Elektromobil im Vergleich zum Auto?",
                      a: "Absolut. Ein Elektromobil kostet im Unterhalt nur ca. 115 bis 215 EUR pro Jahr. Ein Kleinwagen kommt auf 2.675 bis 4.050 EUR. Sie sparen also bis zu 3.800 EUR jährlich — und über 5 Jahre bis zu 19.000 EUR.",
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
                  Fazit: Ein Elektromobil ist günstiger als die meisten denken
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  Wenn Sie alle Kosten zusammenrechnen, kommen Sie mit einem
                  Elektromobil auf rund <strong>115 bis 215 EUR pro Jahr</strong>{" "}
                  — das sind weniger als 20 EUR im Monat. Kein Auto kommt auch
                  nur annähernd an diese Werte heran.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Dazu kommt: kein TÜV, keine Steuer, einfaches Laden an der
                  Steckdose und minimale Wartung. Ein Elektromobil ist nicht
                  nur die günstigste, sondern auch die unkomplizierteste Art,
                  mobil zu bleiben.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>
                    Rufen Sie uns an unter{" "}
                    <a
                      href="tel:06747950060"
                      className="underline"
                      style={{ color: "var(--emerald)" }}
                    >
                      06747 950060
                    </a>
                  </strong>{" "}
                  oder machen Sie unseren{" "}
                  <Link
                    href="/"
                    className="font-bold underline"
                    style={{ color: "var(--emerald)" }}
                  >
                    kostenlosen Eignungstest
                  </Link>
                  .
                </p>
              </section>

              {/* Shop Link */}
              <div
                className="rounded-2xl p-6 mb-8"
                style={{
                  background: "var(--warm-gray)",
                  border: "1px solid #e0ddd8",
                }}
              >
                <p
                  className="text-sm font-bold uppercase tracking-wider mb-3"
                  style={{ color: "var(--emerald)" }}
                >
                  Zum Shop
                </p>
                <a
                  href={SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold hover:underline block"
                  style={{ color: "var(--navy)" }}
                >
                  Alle Seniorenmobile ansehen
                </a>
                <p className="text-base text-gray-500 mt-2">
                  Entdecken Sie unsere Elektromobile ab 1.299 EUR — mit
                  Ratenzahlung ab 29 EUR/Monat.
                </p>
              </div>

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
                  Welchen Führerschein brauchen Sie? Alle Klassen und
                  Sonderregelungen verständlich erklärt.
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
