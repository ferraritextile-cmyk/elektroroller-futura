'use client';

import { useState } from 'react';

const MODELS = [
  'Vita Care 4000 (15 km/h)',
  'Vita Care 1000 (25 km/h)',
  'Neo E-Mobil (45 km/h)',
  'Kabinenroller Cruise (25 km/h)',
  'Kabinenroller Flow (45 km/h)',
];

export default function AngebotSenden() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    modelName: MODELS[0],
    price: '',
    deliveryTime: '2-3 Wochen',
    validUntil: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    includesText: 'Fahrzeug inkl. Straßenzulassung\nLieferung frei Haus\nEinweisung vor Ort\n12 Monate Garantie\nAlle Papiere & Versicherungskennzeichen',
    personalMessage: '',
    financingOption: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticated(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);

    try {
      const res = await fetch('/api/send-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({ ok: true, msg: `Angebot erfolgreich an ${form.customerEmail} gesendet!` });
      } else {
        setResult({ ok: false, msg: data.error || 'Fehler beim Senden' });
      }
    } catch {
      setResult({ ok: false, msg: 'Verbindungsfehler' });
    } finally {
      setSending(false);
    }
  };

  // Formatierung des Datums für die Anzeige
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', fontFamily: 'Arial, sans-serif' }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#0a2540' }}>Angebot senden</h1>
          <p style={{ margin: '0 0 24px 0', color: '#6b7280' }}>Admin-Bereich</p>
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
          />
          <button
            type="submit"
            style={{ width: '100%', marginTop: '16px', padding: '14px', background: '#0d9488', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Arial, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ background: 'linear-gradient(135deg, #0a2540, #0d9488)', color: '#fff', padding: '32px', borderRadius: '12px 12px 0 0' }}>
          <h1 style={{ margin: 0, fontSize: '28px' }}>Individuelles Angebot senden</h1>
          <p style={{ margin: '8px 0 0 0', opacity: 0.8 }}>E-Mail wird im Namen von E-Mobil Beratung versendet</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '32px', borderRadius: '0 0 12px 12px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>

          {/* Kundendaten */}
          <fieldset style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', margin: '0 0 24px 0' }}>
            <legend style={{ fontWeight: 'bold', color: '#0a2540', padding: '0 8px', fontSize: '18px' }}>Kundendaten</legend>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input name="customerName" value={form.customerName} onChange={handleChange} required placeholder="Max Mustermann" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>E-Mail *</label>
                <input name="customerEmail" type="email" value={form.customerEmail} onChange={handleChange} required placeholder="max@beispiel.de" style={inputStyle} />
              </div>
            </div>
          </fieldset>

          {/* Angebot */}
          <fieldset style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', margin: '0 0 24px 0' }}>
            <legend style={{ fontWeight: 'bold', color: '#0a2540', padding: '0 8px', fontSize: '18px' }}>Angebot</legend>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Modell *</label>
                <select name="modelName" value={form.modelName} onChange={handleChange} style={inputStyle}>
                  {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Preis (inkl. MwSt.) *</label>
                <input name="price" value={form.price} onChange={handleChange} required placeholder="z.B. 4.990 €" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Lieferzeit</label>
                <input name="deliveryTime" value={form.deliveryTime} onChange={handleChange} placeholder="z.B. 2-3 Wochen" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Angebot gültig bis</label>
                <input name="validUntil" type="date" value={form.validUntil} onChange={handleChange} style={inputStyle} />
                {form.validUntil && (
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>{formatDate(form.validUntil)}</span>
                )}
              </div>
            </div>
          </fieldset>

          {/* Leistungen */}
          <fieldset style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', margin: '0 0 24px 0' }}>
            <legend style={{ fontWeight: 'bold', color: '#0a2540', padding: '0 8px', fontSize: '18px' }}>Im Angebot enthalten</legend>
            <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>Jede Zeile wird ein Punkt mit Häkchen</p>
            <textarea
              name="includesText"
              value={form.includesText}
              onChange={handleChange}
              rows={6}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </fieldset>

          {/* Finanzierung */}
          <fieldset style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', margin: '0 0 24px 0' }}>
            <legend style={{ fontWeight: 'bold', color: '#0a2540', padding: '0 8px', fontSize: '18px' }}>Finanzierung (optional)</legend>
            <textarea
              name="financingOption"
              value={form.financingOption}
              onChange={handleChange}
              rows={2}
              placeholder="z.B. Auch in 12 Monatsraten à 415,83 € möglich (0% Finanzierung)"
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </fieldset>

          {/* Persönliche Nachricht */}
          <fieldset style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', margin: '0 0 24px 0' }}>
            <legend style={{ fontWeight: 'bold', color: '#0a2540', padding: '0 8px', fontSize: '18px' }}>Persönliche Nachricht (optional)</legend>
            <textarea
              name="personalMessage"
              value={form.personalMessage}
              onChange={handleChange}
              rows={4}
              placeholder="z.B. Wie besprochen ist das Modell in Grün und Rot verfügbar. Eine Probefahrt ist jederzeit möglich..."
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </fieldset>

          {/* Vorschau-Hinweis */}
          <div style={{ background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: '8px', padding: '16px', margin: '0 0 24px 0' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
              <strong>Vorschau:</strong> Die E-Mail enthält das Produktbild, den Preis groß dargestellt,
              die Leistungen als Checkliste und Ihre persönliche Nachricht. Absender: E-Mobil Beratung ({process.env.SMTP_USER || 'haendler@e-scooter-futura.de'})
            </p>
          </div>

          {/* Ergebnis */}
          {result && (
            <div style={{
              padding: '16px',
              borderRadius: '8px',
              margin: '0 0 24px 0',
              background: result.ok ? '#d1fae5' : '#fee2e2',
              color: result.ok ? '#065f46' : '#991b1b',
              fontWeight: 'bold'
            }}>
              {result.msg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            style={{
              width: '100%',
              padding: '18px',
              background: sending ? '#9ca3af' : 'linear-gradient(135deg, #0d9488, #0f766e)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: sending ? 'not-allowed' : 'pointer',
            }}
          >
            {sending ? 'Wird gesendet...' : `Angebot an ${form.customerEmail || '...'} senden`}
          </button>

        </form>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '4px',
  fontWeight: 'bold',
  color: '#374151',
  fontSize: '14px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '16px',
  boxSizing: 'border-box',
};
