'use client';

import { useState, useEffect, useRef } from 'react';

/* ─── Animated counter ─── */
function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const start = ref.current;
    const diff = value - start;
    const duration = 500;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + diff * eased;
      setDisplay(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current));
      if (progress < 1) requestAnimationFrame(tick);
      else ref.current = value;
    }
    requestAnimationFrame(tick);
  }, [value, decimals]);

  const formatted = decimals > 0
    ? display.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : display.toLocaleString('de-DE');

  return <>{prefix}{formatted}{suffix}</>;
}

interface Product {
  name: string;
  shortName: string;
  price: number;
  badge: string;
  badgeColor: string;
  speed: string;
}

const products: Product[] = [
  { name: 'E-Mobil Vita 4000, 15 km/h', shortName: 'Vita 4000', price: 2499, badge: '15 km/h', badgeColor: '#16a34a', speed: '15' },
  { name: 'E-Mobil Vita Care 1000', shortName: 'Vita Care 1000', price: 2999, badge: '25 km/h', badgeColor: '#2563eb', speed: '25' },
  { name: 'E-Mobil Vita Care 4000, 25 km/h', shortName: 'Vita Care 4000', price: 3499, badge: '25 km/h', badgeColor: '#0891b2', speed: '25' },
  { name: 'E-Mobil Neo, 45 km/h', shortName: 'Neo E-Mobil', price: 3999, badge: '45 km/h', badgeColor: '#d4940a', speed: '45' },
  { name: 'Kabinenroller Cruise', shortName: 'Kabinenroller Cruise', price: 4999, badge: '25 km/h Kabine', badgeColor: '#0c6b58', speed: '25' },
  { name: 'Kabinenroller Flow', shortName: 'Kabinenroller Flow', price: 6999, badge: '45 km/h Kabine', badgeColor: '#7c3aed', speed: '45' },
];

const durations = [6, 12, 18, 24, 36];

export default function FinancingCalculator({ onRequestOffer }: { onRequestOffer?: (modelName: string) => void }) {
  const [selectedIdx, setSelectedIdx] = useState(1);
  const [months, setMonths] = useState(24);

  const product = products[selectedIdx];
  const monthlyRate = product.price / months;
  const dailyRate = product.price / (months * 30);

  return (
    <section id="finanzierungsrechner" aria-label="Finanzierungsrechner — 0% Ratenzahlung" className="section" style={{ background: 'var(--cream)' }}>
      <div className="container-wide">
        <div className="text-center mb-14">
          <div className="section-label">Finanzierungsrechner</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--navy)' }}>
            Ihr E-Mobil bequem in Raten zahlen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            0 % Finanzierung — kein Aufpreis, keine versteckten Kosten. Wählen Sie Ihr Modell und die gewünschte Laufzeit.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left: Model Selection */}
          <div className="lg:col-span-3">
            <div className="premium-card p-8">
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--navy)' }}>Modell wählen</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {products.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIdx(i)}
                    className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                      selectedIdx === i
                        ? 'shadow-lg scale-[1.02]'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-200'
                    }`}
                    style={selectedIdx === i ? {
                      background: `linear-gradient(135deg, ${p.badgeColor}10, ${p.badgeColor}05)`,
                      border: `2px solid ${p.badgeColor}`,
                      boxShadow: `0 4px 20px ${p.badgeColor}20`,
                    } : {}}
                  >
                    <span
                      className="inline-block text-white px-3 py-1 rounded-full font-bold text-xs mb-2"
                      style={{ background: p.badgeColor }}
                    >
                      {p.badge}
                    </span>
                    <div className="font-bold text-base" style={{ color: 'var(--navy)' }}>{p.shortName}</div>
                    <div className="text-lg font-bold mt-1" style={{ color: p.badgeColor }}>
                      {p.price.toLocaleString('de-DE')} €
                    </div>
                  </button>
                ))}
              </div>

              {/* Duration Slider */}
              <div className="mt-8 pt-8" style={{ borderTop: '2px solid #f0ede8' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--navy)' }}>Laufzeit wählen</h3>
                <div className="grid grid-cols-5 gap-2">
                  {durations.map(d => (
                    <button
                      key={d}
                      onClick={() => setMonths(d)}
                      className={`py-4 rounded-xl font-bold text-base transition-all ${
                        months === d
                          ? 'text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      style={months === d ? { background: `linear-gradient(135deg, ${product.badgeColor}, ${product.badgeColor}dd)` } : {}}
                    >
                      {d} Mo.
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Result */}
          <div className="lg:col-span-2 space-y-6">
            {/* Monthly Rate Card */}
            <div
              className="premium-card p-8 text-center relative overflow-hidden"
              style={{ border: `3px solid ${product.badgeColor}30` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${product.badgeColor}, ${product.badgeColor}88)` }} />

              <div className="inline-block text-white px-4 py-1.5 rounded-full font-bold text-sm mb-4" style={{ background: product.badgeColor }}>
                {product.shortName}
              </div>

              <div className="text-base font-bold text-gray-500 uppercase tracking-wider mb-2">
                Ihre monatliche Rate
              </div>
              <div className="text-6xl md:text-7xl font-bold mb-1" style={{ color: product.badgeColor }}>
                <AnimatedNumber value={monthlyRate} suffix=" €" decimals={2} />
              </div>
              <div className="text-lg text-gray-500 mb-6">
                pro Monat bei {months} Monaten Laufzeit
              </div>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-bold" style={{ background: '#f0fdf4', color: '#16a34a', border: '2px solid #86efac' }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                0 % Zinsen — keine Zusatzkosten
              </div>
            </div>

            {/* Daily comparison */}
            <div className="premium-card p-6">
              <div className="text-center">
                <div className="text-base font-bold text-gray-500 mb-2">Das sind nur</div>
                <div className="text-4xl font-bold mb-1" style={{ color: 'var(--emerald)' }}>
                  <AnimatedNumber value={dailyRate} suffix=" €" decimals={2} />
                </div>
                <div className="text-base text-gray-500 mb-4">pro Tag — weniger als ein Kaffee</div>
                <div className="flex justify-center gap-6 text-3xl">
                  <span title="Günstiger als ein täglicher Kaffee">&#9749;</span>
                  <span className="text-gray-300">&gt;</span>
                  <span title="Ihr neues E-Mobil">&#128690;</span>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="premium-card p-6">
              <div className="space-y-3 text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kaufpreis</span>
                  <span className="font-bold" style={{ color: 'var(--navy)' }}>{product.price.toLocaleString('de-DE')} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Laufzeit</span>
                  <span className="font-bold" style={{ color: 'var(--navy)' }}>{months} Monate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Zinssatz</span>
                  <span className="font-bold" style={{ color: '#16a34a' }}>0,00 %</span>
                </div>
                <div className="flex justify-between pt-3" style={{ borderTop: '2px solid #f0ede8' }}>
                  <span className="font-bold" style={{ color: 'var(--navy)' }}>Gesamtkosten</span>
                  <span className="font-bold" style={{ color: 'var(--navy)' }}>{product.price.toLocaleString('de-DE')} €</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onRequestOffer?.(product.name)}
              className="btn btn-cta w-full text-xl flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Angebot mit Finanzierung anfordern
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
