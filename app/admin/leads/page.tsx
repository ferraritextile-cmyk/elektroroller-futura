'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/types/lead';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'qualified' | 'closed'>('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });

      if (response.ok) {
        await fetchLeads();
      }
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const filteredLeads = filter === 'all'
    ? leads
    : leads.filter(lead => lead.status === filter);

  const getLicenseLabel = (license: string) => {
    const labels: Record<string, string> = {
      none: 'Kein Führerschein',
      mofa: 'Mofa-Prüfbescheinigung',
      auto: 'Auto (Klasse B)',
      roller: 'Roller (Klasse AM)',
    };
    return labels[license] || license;
  };

  const getStatusColor = (status: Lead['status']) => {
    const colors: Record<Lead['status'], string> = {
      new: 'bg-blue-100 text-blue-800 border-blue-300',
      contacted: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      qualified: 'bg-green-100 text-green-800 border-green-300',
      closed: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return colors[status];
  };

  const getStatusLabel = (status: Lead['status']) => {
    const labels: Record<Lead['status'], string> = {
      new: 'Neu',
      contacted: 'Kontaktiert',
      qualified: 'Qualifiziert',
      closed: 'Abgeschlossen',
    };
    return labels[status];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Lade Leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container-wide py-6">
          <h1 className="text-4xl font-bold text-gray-900">Lead-Verwaltung</h1>
          <p className="text-lg text-gray-600 mt-2">
            Gesamt: <strong>{leads.length}</strong> Leads
          </p>
        </div>
      </header>

      {/* Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container-wide py-4">
          <div className="flex flex-wrap gap-4">
            {(['all', 'new', 'contacted', 'qualified', 'closed'] as const).map((statusFilter) => (
              <button
                key={statusFilter}
                onClick={() => setFilter(statusFilter)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === statusFilter
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {statusFilter === 'all' ? 'Alle' : getStatusLabel(statusFilter)}
                {statusFilter !== 'all' && (
                  <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-sm">
                    {leads.filter(l => l.status === statusFilter).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="container-wide py-8">
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-xl text-gray-500">Keine Leads gefunden</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="p-6">
                  {/* Header der Sales-Card */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b-2 border-gray-100">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{lead.name}</h2>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-2 text-lg text-primary-600 hover:text-primary-800 font-semibold"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          {lead.phone}
                        </a>
                        <span className="text-lg text-gray-600">
                          | Erreichbar: {lead.availability === 'morning' ? '🌅 Vormittags' : lead.availability === 'afternoon' ? '☀️ Nachmittags' : '⏰ Ganztags'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Erstellt: {new Date(lead.createdAt).toLocaleString('de-DE')}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <span className={`info-badge ${getStatusColor(lead.status)}`}>
                        {getStatusLabel(lead.status)}
                      </span>
                    </div>
                  </div>

                  {/* Sales-Insights */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Wichtige Sales-Hinweise */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-gray-900 mb-3">🎯 Sales-Strategie:</h3>

                      {lead.isPre1965 && (
                        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                          <p className="font-bold text-green-900 text-lg">
                            ✅ PRE-1965 VORTEIL!
                          </p>
                          <p className="text-green-800 mt-1">
                            Kunde ist <strong>vor 1965</strong> geboren → Fokus auf <strong>25 km/h Führerscheinfreiheit</strong> legen!
                          </p>
                        </div>
                      )}

                      {lead.quizAnswers?.license === 'none' && !lead.isPre1965 && (
                        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                          <p className="font-bold text-yellow-900">
                            ⚠️ Kein Führerschein + nach 1965
                          </p>
                          <p className="text-yellow-800 mt-1">
                            → <strong>15 km/h Sonderzulassung</strong> oder Mofa-Prüfbescheinigung empfehlen
                          </p>
                        </div>
                      )}

                      {lead.recommendedCategory === 'kabinenroller' && (
                        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                          <p className="font-bold text-blue-900">
                            👥 Kabinenroller-Interessent
                          </p>
                          <p className="text-blue-800 mt-1">
                            Fährt zu zweit → <strong>Vita Care 4000</strong> präsentieren
                          </p>
                        </div>
                      )}

                      {lead.prefersWeatherProtection && (
                        <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
                          <p className="font-bold text-purple-900">
                            🏠 Upsell-Chance: Kabinenroller
                          </p>
                          <p className="text-purple-800 mt-1">
                            Wünscht Wetterschutz → <strong>Kabinenroller mit Heizung</strong> präsentieren
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Quiz-Antworten Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-3">📋 Kundenprofil:</h3>
                      <dl className="space-y-2">
                        <div>
                          <dt className="text-sm font-semibold text-gray-600">Geburtsjahr:</dt>
                          <dd className="text-base text-gray-900">
                            {lead.quizAnswers.birthYear} {lead.isPre1965 && '(⭐ Pre-1965)'}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-semibold text-gray-600">Führerschein:</dt>
                          <dd className="text-base text-gray-900">{getLicenseLabel(lead.quizAnswers.license)}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-semibold text-gray-600">Nutzung:</dt>
                          <dd className="text-base text-gray-900">
                            {lead.quizAnswers.usage === 'local' ? '🏘️ Innerorts' : '🌄 Überlandfahrten'}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-semibold text-gray-600">Wetterschutz:</dt>
                          <dd className="text-base text-gray-900">
                            {lead.quizAnswers.weatherProtection === 'closed' ? '🏠 Geschlossene Kabine' : '🌤️ Offenes Fahrgefühl'}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-semibold text-gray-600">Mitfahrer:</dt>
                          <dd className="text-base text-gray-900">
                            {lead.quizAnswers.passengers === 'alone' ? '👤 Allein' : '👥 Zu zweit'}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-semibold text-gray-600">Empfehlung:</dt>
                          <dd className="text-base font-bold text-primary-600">
                            {lead.recommendedCategory === 'elektromobil' ? '🛵 Elektromobil' : '🚗 Kabinenroller'}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* Status-Buttons */}
                  <div className="pt-4 border-t-2 border-gray-100">
                    <p className="text-sm font-semibold text-gray-600 mb-3">Status ändern:</p>
                    <div className="flex flex-wrap gap-3">
                      {(['new', 'contacted', 'qualified', 'closed'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => updateLeadStatus(lead.id, status)}
                          disabled={lead.status === status}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                            lead.status === status
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {getStatusLabel(status)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
