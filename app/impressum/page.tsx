export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container-wide py-20">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>

          <div className="space-y-6 text-lg text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="mb-2"><strong>Dr. Ferrari GmbH</strong></p>
              <p className="mb-2">Industriestraße 1</p>
              <p className="mb-2">56283 Halsenbach</p>
              <p className="mb-4">Sitz der Gesellschaft: Emmelshausen</p>
              <p className="mb-2">Geschäftsführer: Luca Ferrari</p>
              <p className="mb-2">Amtsgericht Koblenz, HRB 3545</p>
              <p className="mb-4">USt-IdNr.: DE148756276</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontakt</h2>
              <p className="mb-2">Telefon: <a href="tel:06747950060" className="text-primary-600 hover:text-primary-800">06747/950060</a></p>
              <p className="mb-2">E-Mail: <a href="mailto:elektroroller-futura@DrFerrariGmbH.de" className="text-primary-600 hover:text-primary-800">elektroroller-futura@DrFerrariGmbH.de</a></p>
              <p className="mb-4">Mo-Fr: 08:00-12:00 & 13:00-17:00 Uhr</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Streitschlichtung</h2>
              <p className="mb-4">
                Plattform der EU-Kommission zur Online-Streitbeilegung:{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 break-all">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="mb-4">
                Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                nach VSBG nicht verpflichtet und grundsätzlich nicht bereit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftung für Inhalte</h2>
              <p className="mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="mb-4">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
                der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Haftung für Links</h2>
              <p className="mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Urheberrecht</h2>
              <p className="mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                bzw. Erstellers.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-semibold text-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Zurück zur Startseite
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
