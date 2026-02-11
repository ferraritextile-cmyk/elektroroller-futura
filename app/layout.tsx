import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const SITE_URL = "https://elektroroller-futura.de";
const SITE_NAME = "Elektroroller Futura";
const PHONE = "06747 950060";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elektroroller Futura - Elektromobile & Kabinenroller | Führerscheinfrei ab 15 Jahren",
    template: "%s | Elektroroller Futura",
  },
  description:
    "Elektromobile & Kabinenroller führerscheinfrei fahren. Kostenlose Experten-Beratung: Welches E-Mobil dürfen Sie ohne Führerschein fahren? Jetzt 2-Minuten-Test machen!",
  keywords: [
    "Elektromobil",
    "Kabinenroller",
    "führerscheinfrei",
    "Seniorenmobil",
    "Elektroroller",
    "E-Mobil",
    "Elektromobil ohne Führerschein",
    "Kabinenroller 25 km/h",
    "Kabinenroller 45 km/h",
    "Seniorenmobil kaufen",
    "Elektroroller Futura",
    "E-Mobil führerscheinfrei",
    "Elektromobil Senioren",
    "15 km/h Sonderzulassung",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: false,
    email: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Elektroroller Futura - Elektromobile & Kabinenroller führerscheinfrei",
    description:
      "Finden Sie heraus, welches Elektromobil oder Kabinenroller Sie ohne Führerschein fahren dürfen. Kostenlose Experten-Beratung am Telefon: 06747 950060",
    images: [
      {
        url: `${SITE_URL}/images/hero-header.jpg`,
        width: 1200,
        height: 630,
        alt: "Elektroroller Futura - Elektromobile und Kabinenroller",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elektroroller Futura - Elektromobile & Kabinenroller",
    description:
      "Elektromobil oder Kabinenroller ohne Führerschein fahren? Kostenlose Beratung: 06747 950060",
    images: [`${SITE_URL}/images/hero-header.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "DE-RP",
    "geo.placename": "Rheinland-Pfalz",
    "rating": "general",
  },
};

/* ─── JSON-LD Structured Data ─── */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  description:
    "Unabhängige Beratung für Elektromobile und Kabinenroller. Führerscheinfreie Mobilität für Senioren und alle, die unabhängig bleiben möchten.",
  url: SITE_URL,
  telephone: "+4906747950060",
  image: `${SITE_URL}/images/hero-header.jpg`,
  logo: `${SITE_URL}/images/logo.svg`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressCountry: "DE",
    addressRegion: "Rheinland-Pfalz",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "12:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "13:00",
      closes: "17:00",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "Deutschland",
  },
  email: "info@elektroroller-futura.de",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Renate M." },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Endlich wieder selbstständig zum Friedhof fahren und Besorgungen machen. Ein ganz neues Lebensgefühl!",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Horst K." },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Tolle Beratung zum Führerschein. Ich war unsicher, was ich fahren darf, aber Herr Müller hat mir alles genau erklärt.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Erika S." },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody: "Der Kabinenroller ist perfekt für den Winter. Ich friere nicht mehr und komme trocken an.",
    },
  ],
};

const productsSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "E-Mobil Vita 4000, 15 km/h",
    description:
      "Führerscheinfreies Elektromobil mit 15 km/h Sonderzulassung. Ab 15 Jahren ohne Führerschein fahrbar. Straßenzugelassen, ideal für den Einstieg.",
    image: `${SITE_URL}/images/vita-care-4000.jpg`,
    brand: { "@type": "Brand", name: "Elektroroller Futura" },
    category: "Elektromobil",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      url: SITE_URL,
      seller: { "@type": "Organization", name: SITE_NAME },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Höchstgeschwindigkeit", value: "15 km/h" },
      { "@type": "PropertyValue", name: "Führerschein", value: "Nicht erforderlich" },
      { "@type": "PropertyValue", name: "Räder", value: "4" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "E-Mobil Vita Care 1000, 25 km/h",
    description:
      "Kompaktes 3-Rad Elektromobil mit 25 km/h. Bis zu 90 km Reichweite. Führerscheinfrei für Personen geboren vor dem 01.04.1965.",
    image: `${SITE_URL}/images/vita-care-1000.jpg`,
    brand: { "@type": "Brand", name: "Elektroroller Futura" },
    category: "Elektromobil",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      url: SITE_URL,
      seller: { "@type": "Organization", name: SITE_NAME },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Höchstgeschwindigkeit", value: "25 km/h" },
      { "@type": "PropertyValue", name: "Reichweite", value: "Bis zu 90 km" },
      { "@type": "PropertyValue", name: "Räder", value: "3" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "E-Mobil Neo, 45 km/h",
    description:
      "Leistungsstarkes Elektromobil mit 45 km/h Höchstgeschwindigkeit und langer Reichweite. Führerschein Klasse AM oder B erforderlich.",
    image: `${SITE_URL}/images/neo-e-mobil.jpg`,
    brand: { "@type": "Brand", name: "Elektroroller Futura" },
    category: "Elektromobil",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      url: SITE_URL,
      seller: { "@type": "Organization", name: SITE_NAME },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Höchstgeschwindigkeit", value: "45 km/h" },
      { "@type": "PropertyValue", name: "Führerschein", value: "Klasse AM oder B" },
      { "@type": "PropertyValue", name: "Räder", value: "4" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "E-Mobil Vita Care 4000, 25 km/h",
    description:
      "Stabiles 4-Rad Elektromobil mit 25 km/h. Hoher Fahrkomfort für längere Strecken. Führerschein Klasse AM oder B erforderlich.",
    image: `${SITE_URL}/images/vita-care-4000-25kmh.jpg`,
    brand: { "@type": "Brand", name: "Elektroroller Futura" },
    category: "Elektromobil",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      url: SITE_URL,
      seller: { "@type": "Organization", name: SITE_NAME },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Höchstgeschwindigkeit", value: "25 km/h" },
      { "@type": "PropertyValue", name: "Führerschein", value: "Klasse AM oder B" },
      { "@type": "PropertyValue", name: "Räder", value: "4" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Kabinenroller Cruise, 25 km/h",
    description:
      "Kabinenroller mit Wetterschutz und Heizung. 2 Sitzplätze, 25 km/h. Führerscheinfrei für Personen geboren vor dem 01.04.1965.",
    image: `${SITE_URL}/images/kabinenroller-cruise.jpg`,
    brand: { "@type": "Brand", name: "Elektroroller Futura" },
    category: "Kabinenroller",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      url: SITE_URL,
      seller: { "@type": "Organization", name: SITE_NAME },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Höchstgeschwindigkeit", value: "25 km/h" },
      { "@type": "PropertyValue", name: "Sitzplätze", value: "2" },
      { "@type": "PropertyValue", name: "Wetterschutz", value: "Ja, mit Heizung" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Kabinenroller Flow, 45 km/h",
    description:
      "Premium-Kabinenroller mit vollwertigem Wetterschutz, Heizung und Scheibenwischer. 2 Sitzplätze, 45 km/h. Führerschein AM oder B nötig.",
    image: `${SITE_URL}/images/kabinenroller-flow.jpg`,
    brand: { "@type": "Brand", name: "Elektroroller Futura" },
    category: "Kabinenroller",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      url: SITE_URL,
      seller: { "@type": "Organization", name: SITE_NAME },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Höchstgeschwindigkeit", value: "45 km/h" },
      { "@type": "PropertyValue", name: "Sitzplätze", value: "2" },
      { "@type": "PropertyValue", name: "Wetterschutz", value: "Vollwertig mit Heizung & Scheibenwischer" },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welches Elektromobil darf ich ohne Führerschein fahren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wenn Sie vor dem 01.04.1965 geboren sind, dürfen Sie 25 km/h Modelle (3-Rad Kabinenroller, E-Mobile, E-Mofas) komplett führerscheinfrei fahren. Für alle anderen bieten wir eine exklusive 15 km/h Sonderzulassung an, mit der Sie ab 15 Jahren ohne Führerschein fahren dürfen.",
      },
    },
    {
      "@type": "Question",
      name: "Was kostet die Beratung bei Elektroroller Futura?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Beratung ist komplett kostenlos und unverbindlich. Unsere Mobilitäts-Experten beraten Sie telefonisch unter 06747 950060 zu Führerscheinfragen, Modellempfehlungen und Finanzierungsmöglichkeiten.",
      },
    },
    {
      "@type": "Question",
      name: "Was bedeutet die 15 km/h Sonderzulassung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die 15 km/h Sonderzulassung ermöglicht es, bestimmte Elektromobile ohne Führerschein ab 15 Jahren zu fahren. Diese Zulassung ist deutschlandweit gültig und alle erforderlichen Papiere sind inklusive.",
      },
    },
    {
      "@type": "Question",
      name: "Kann ich mit Autoführerschein alle Modelle fahren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja! Der Autoführerschein (Klasse B) schließt automatisch die Klasse AM ein. Damit dürfen Sie alle unsere Modelle fahren, einschließlich der 45 km/h Kabinenroller und E-Mobile.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist der Stichtag 01.04.1965?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Personen, die vor dem 01.04.1965 geboren sind, dürfen 25 km/h Elektromobile und 3-Rad Kabinenroller komplett ohne Führerschein fahren. Dies gilt aufgrund einer Sonderregelung im deutschen Verkehrsrecht.",
      },
    },
    {
      "@type": "Question",
      name: "Haben die Kabinenroller einen Wetterschutz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, unsere Kabinenroller bieten vollwertigen Wetterschutz. Die Modelle verfügen über eine geschlossene Kabine, Heizung und Scheibenwischer – ideal für Ganzjahresnutzung bei jedem Wetter.",
      },
    },
    {
      "@type": "Question",
      name: "Wie weit kann ich mit einem Elektromobil fahren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Reichweite variiert je nach Modell. Unser E-Mobil Vita Care 1000 erreicht beispielsweise bis zu 90 km Reichweite. Unsere Experten beraten Sie gerne, welches Modell für Ihre typischen Strecken ideal ist.",
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
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Unabhängige Beratung für Elektromobile und Kabinenroller. Führerscheinfrei mobil bleiben.",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.svg`,
    },
  },
  inLanguage: "de-DE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/logo.svg" />
        <meta name="theme-color" content="#0f2137" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {productsSchema.map((product, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
          />
        ))}
      </head>
      <body className="antialiased">
        {/* Google Analytics 4 */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
