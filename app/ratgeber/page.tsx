import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://elektroroller-futura.de";

export const metadata: Metadata = {
  title: "Ratgeber - Elektromobile & Kabinenroller Wissen",
  description:
    "Alles rund um Elektromobile, Kabinenroller und E-Roller: Führerschein-Regelungen, Reichweite, Tipps und mehr. Verständlich erklärt für Senioren.",
  keywords: [
    "elektroroller ratgeber",
    "elektromobil ratgeber",
    "seniorenmobil tipps",
    "kabinenroller wissen",
    "führerschein elektroroller",
    "reichweite elektroroller",
  ],
  alternates: {
    canonical: `${SITE_URL}/ratgeber`,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${SITE_URL}/ratgeber`,
    siteName: "Elektroroller Futura",
    title: "Ratgeber - Elektromobile & Kabinenroller Wissen",
    description:
      "Alles rund um Elektromobile, Kabinenroller und E-Roller: Führerschein-Regelungen, Reichweite, Tipps und mehr.",
    images: [
      {
        url: `${SITE_URL}/images/hero-header.jpg`,
        width: 1200,
        height: 630,
        alt: "Elektroroller Futura Ratgeber",
      },
    ],
  },
};

const articles = [
  {
    slug: "fuehrerschein-elektroroller",
    title: "Führerschein für Elektroroller — Was Sie wissen müssen",
    description:
      "Welchen Führerschein brauchen Sie für einen Elektroroller? Alle Klassen, Sonderregelungen und Ausnahmen verständlich erklärt.",
    category: "Recht & Vorschriften",
    categoryColor: "#2563eb",
    readTime: "8 Min. Lesezeit",
    date: "15. Februar 2026",
  },
  {
    slug: "reichweite-elektroroller",
    title: "Reichweite von Elektrorollern — Alles was Sie wissen müssen",
    description:
      "Wie weit kommt ein Elektroroller wirklich? Einflussfaktoren, Modellvergleich und praktische Tipps für maximale Reichweite.",
    category: "Technik & Praxis",
    categoryColor: "#0c6b58",
    readTime: "8 Min. Lesezeit",
    date: "15. Februar 2026",
  },
];

export default function RatgeberPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* Header */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f2137 0%, #0c3b2f 50%, #0f2137 100%)",
        }}
      >
        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div
              className="section-label"
              style={{ color: "var(--amber-light)" }}
            >
              Ratgeber
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Wissen rund um Elektromobile
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Verständlich erklärt: Führerschein-Regelungen, Reichweite, Technik
              und alles, was Sie vor dem Kauf wissen sollten.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section">
        <div className="container-wide max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/ratgeber/${article.slug}`}
                className="premium-card overflow-hidden group block"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                      style={{ background: article.categoryColor }}
                    >
                      {article.category}
                    </span>
                    <span className="text-base text-gray-400">
                      {article.readTime}
                    </span>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-emerald-700 transition-colors"
                    style={{ color: "var(--navy)" }}
                  >
                    {article.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-base text-gray-400">
                      {article.date}
                    </span>
                    <span
                      className="text-lg font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
                      style={{ color: "var(--emerald)" }}
                    >
                      Jetzt lesen
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 premium-card p-8 md:p-12 text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "var(--navy)" }}
            >
              Persönliche Beratung gewünscht?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Unsere Mobilitäts-Experten beantworten Ihre Fragen zu
              Führerschein, Reichweite und dem passenden Modell — kostenlos und
              unverbindlich.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
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
                Kostenloser Eignungs-Test
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
        </div>
      </section>

      {/* Back link */}
      <div className="container-wide max-w-5xl pb-20">
        <a
          href="/"
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
          Zurück zur Startseite
        </a>
      </div>
    </main>
  );
}
