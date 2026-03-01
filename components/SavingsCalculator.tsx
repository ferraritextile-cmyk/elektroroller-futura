'use client';

import { useState, useEffect, useRef } from 'react';

/* ─── Animated counter ─── */
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const start = ref.current;
    const diff = value - start;
    const duration = 600;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
      else ref.current = value;
    }
    requestAnimationFrame(tick);
  }, [value]);

  return <>{prefix}{display.toLocaleString('de-DE')}{suffix}</>;
}

/* ─── Cost bar ─── */
function CostBar({ label, autoCost, rollerCost, maxCost }: { label: string; autoCost: number; rollerCost: number; maxCost: number }) {
  const autoWidth = Math.max((autoCost / maxCost) * 100, 2);
  const rollerWidth = Math.max((rollerCost / maxCost) * 100, 2);

  return (
    <div className="mb-5">
      <div className="flex justify-between text-base font-semibold mb-2">
        <span style={{ color: 'var(--navy)' }}>{label}</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold w-12 text-right text-red-600/70">Auto</span>
          <div className="flex-1 h-8 rounded-lg overflow-hidden" style={{ background: '#fef2f2' }}>
            <div
              className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-700"
              style={{ width: `${autoWidth}%`, background: 'linear-gradient(90deg, #ef4444, #dc2626)' }}
            >
              <span className="text-sm font-bold text-white whitespace-nowrap">{autoCost.toLocaleString('de-DE')} €</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold w-12 text-right" style={{ color: 'var(--emerald)' }}>E-Mobil</span>
          <div className="flex-1 h-8 rounded-lg overflow-hidden" style={{ background: '#f0fdf4' }}>
            <div
              className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-700"
              style={{ width: `${rollerWidth}%`, background: 'linear-gradient(90deg, var(--emerald), var(--emerald-light))' }}
            >
              <span className="text-sm font-bold text-white whitespace-nowrap">{rollerCost.toLocaleString('de-DE')} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SavingsCalculator() {
  const [kmPerMonth, setKmPerMonth] = useState(500);
  const [period, setPeriod] = useState<'month' | 'year' | '5years'>('year');

  // Auto costs (Kleinwagen)
  const fuelPricePerLiter = 1.75;
  const fuelConsumption = 6.5; // L/100km
  const autoInsuranceMonth = 75;
  const autoTaxMonth = 15;
  const autoMaintenanceMonth = 55;

  // E-Roller costs
  const electricityPerKwh = 0.35;
  const rollerConsumption = 5; // kWh/100km
  const rollerInsuranceMonth = 7;
  const rollerTaxMonth = 0;
  const rollerMaintenanceMonth = 8;

  const multiplier = period === 'month' ? 1 : period === 'year' ? 12 : 60;
  const periodLabel = period === 'month' ? 'pro Monat' : period === 'year' ? 'pro Jahr' : 'in 5 Jahren';

  const autoFuel = Math.round((kmPerMonth * fuelConsumption / 100) * fuelPricePerLiter * multiplier);
  const autoInsurance = autoInsuranceMonth * multiplier;
  const autoTax = autoTaxMonth * multiplier;
  const autoMaintenance = autoMaintenanceMonth * multiplier;
  const autoTotal = autoFuel + autoInsurance + autoTax + autoMaintenance;

  const rollerElectricity = Math.round((kmPerMonth * rollerConsumption / 100) * electricityPerKwh * multiplier);
  const rollerInsurance = rollerInsuranceMonth * multiplier;
  const rollerTax = rollerTaxMonth * multiplier;
  const rollerMaintenance = rollerMaintenanceMonth * multiplier;
  const rollerTotal = rollerElectricity + rollerInsurance + rollerTax + rollerMaintenance;

  const savings = autoTotal - rollerTotal;
  const maxCost = Math.max(autoFuel, autoInsurance, autoMaintenance);

  return (
    <section id="sparrechner" aria-label="Sparrechner — E-Mobil vs. Auto" className="section" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #0c3b2f 50%, var(--navy) 100%)' }}>
      <div className="absolute inset-0 noise-overlay" />
      <div className="container-wide relative z-10">
        <div className="text-center mb-14">
          <div className="section-label" style={{ color: 'var(--amber-light)' }}>Sparrechner</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            So viel sparen Sie mit einem E-Mobil
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Vergleichen Sie die laufenden Kosten eines Autos mit einem Elektromobil. Die Zahlen sprechen für sich.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left: Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* KM Slider */}
            <div className="premium-card p-6">
              <label className="block text-lg font-bold mb-4" style={{ color: 'var(--navy)' }}>
                Ihre monatliche Fahrleistung
              </label>
              <div className="text-center mb-4">
                <span className="text-4xl font-bold" style={{ color: 'var(--emerald)' }}>{kmPerMonth}</span>
                <span className="text-xl text-gray-600 ml-2">km/Monat</span>
              </div>
              <input
                type="range"
                min={100}
                max={2000}
                step={50}
                value={kmPerMonth}
                onChange={(e) => setKmPerMonth(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--emerald) 0%, var(--emerald-light) ${((kmPerMonth - 100) / 1900) * 100}%, #e5e7eb ${((kmPerMonth - 100) / 1900) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>100 km</span>
                <span>2.000 km</span>
              </div>
            </div>

            {/* Period Toggle */}
            <div className="premium-card p-6">
              <label className="block text-lg font-bold mb-4" style={{ color: 'var(--navy)' }}>
                Zeitraum
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: 'month', label: 'Monat' },
                  { value: 'year', label: 'Jahr' },
                  { value: '5years', label: '5 Jahre' },
                ] as const).map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setPeriod(opt.value)}
                    className={`py-3 px-4 rounded-xl font-bold text-base transition-all ${
                      period === opt.value
                        ? 'text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    style={period === opt.value ? { background: 'linear-gradient(135deg, var(--emerald), var(--emerald-light))' } : {}}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Savings highlight */}
            <div className="premium-card p-8 text-center" style={{ background: 'linear-gradient(135deg, #dcfce7, #f0fdf4)', border: '3px solid #86efac' }}>
              <div className="text-base font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--emerald)' }}>
                Ihre Ersparnis {periodLabel}
              </div>
              <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color: 'var(--emerald)' }}>
                <AnimatedNumber value={savings} suffix=" €" />
              </div>
              <p className="text-base text-gray-600">
                gegenüber einem vergleichbaren Kleinwagen
              </p>
            </div>
          </div>

          {/* Right: Comparison Bars */}
          <div className="lg:col-span-3">
            <div className="premium-card p-8">
              <h3 className="text-2xl font-bold mb-8" style={{ color: 'var(--navy)' }}>
                Kostenvergleich {periodLabel}
              </h3>

              <CostBar
                label="Kraftstoff / Strom"
                autoCost={autoFuel}
                rollerCost={rollerElectricity}
                maxCost={maxCost}
              />
              <CostBar
                label="Versicherung"
                autoCost={autoInsurance}
                rollerCost={rollerInsurance}
                maxCost={maxCost}
              />
              <CostBar
                label="Steuer"
                autoCost={autoTax}
                rollerCost={rollerTax}
                maxCost={maxCost}
              />
              <CostBar
                label="Wartung & TÜV"
                autoCost={autoMaintenance}
                rollerCost={rollerMaintenance}
                maxCost={maxCost}
              />

              {/* Totals */}
              <div className="mt-8 pt-6" style={{ borderTop: '2px solid #f0ede8' }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl p-5 text-center" style={{ background: '#fef2f2', border: '2px solid #fecaca' }}>
                    <div className="text-sm font-bold text-red-600/70 uppercase tracking-wider mb-1">Auto gesamt</div>
                    <div className="text-3xl font-bold text-red-600">
                      <AnimatedNumber value={autoTotal} suffix=" €" />
                    </div>
                  </div>
                  <div className="rounded-2xl p-5 text-center" style={{ background: '#f0fdf4', border: '2px solid #86efac' }}>
                    <div className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--emerald)' }}>E-Mobil gesamt</div>
                    <div className="text-3xl font-bold" style={{ color: 'var(--emerald)' }}>
                      <AnimatedNumber value={rollerTotal} suffix=" €" />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-6">
                * Berechnung basiert auf Durchschnittswerten: Benzin {fuelPricePerLiter.toFixed(2)} €/L, Verbrauch {fuelConsumption} L/100km (Kleinwagen), Strom {electricityPerKwh.toFixed(2)} €/kWh, E-Mobil Verbrauch {rollerConsumption} kWh/100km. Versicherung: Kfz-Haftpflicht vs. E-Mobil-Kennzeichenversicherung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
