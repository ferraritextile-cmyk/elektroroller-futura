'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { QuizAnswers, LeadFormData } from '@/types/lead';
import * as gtag from '@/lib/gtag';
import SavingsCalculator from '@/components/SavingsCalculator';
import FinancingCalculator from '@/components/FinancingCalculator';

/* ─── Scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Reusable reveal wrapper ─── */
function Reveal({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

/* ─── Check icon ─── */
const CheckIcon = ({ className = 'w-6 h-6', style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const CircleCheckIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

/* ─── Main Component ─── */
export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Partial<QuizAnswers>>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    availability: 'both' as 'morning' | 'afternoon' | 'both',
  });
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [offerFormData, setOfferFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    postalCode: '',
    message: '',
    acceptPrivacy: false,
  });
  const [showOfferSuccess, setShowOfferSuccess] = useState(false);

  const birthDate = quizAnswers.birthYear && quizAnswers.birthMonth && quizAnswers.birthDay
    ? new Date(quizAnswers.birthYear, quizAnswers.birthMonth - 1, quizAnswers.birthDay)
    : null;
  const cutoffDate = new Date(1965, 3, 1);
  const isPre1965 = birthDate ? birthDate < cutoffDate : false;
  const prefersWeatherProtection = quizAnswers.weatherProtection === 'closed';
  const hasAutoLicense = quizAnswers.license === 'auto';
  const totalSteps = 7;

  const handleQuizAnswer = (question: keyof QuizAnswers, answer: any) => {
    setQuizAnswers(prev => ({ ...prev, [question]: answer }));
    const stepNames = ['birthday', 'license', 'usage', 'weather', 'passengers', 'lead_magnet', 'lead_form'];
    gtag.trackQuizStepCompleted(currentStep + 1, stepNames[currentStep] || 'unknown', String(answer));
    setTimeout(() => {
      if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const leadData: LeadFormData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      availability: formData.availability,
      quizAnswers: quizAnswers as QuizAnswers,
    };
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
      if (response.ok) {
        gtag.trackQuizCompleted();
        gtag.trackLeadSubmitted(formData.availability);
        setShowSuccessMessage(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('Es gab ein Problem beim Absenden. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('Es gab ein Problem beim Absenden. Bitte versuchen Sie es erneut.');
    }
  };

  const isPhoneValid = (phone: string) => /^[\d\s\+\-\/\(\)]{8,}$/.test(phone);
  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = formData.name.length >= 2 && isPhoneValid(formData.phone) && isEmailValid(formData.email);

  const openOfferModal = (modelName: string) => {
    setSelectedModel(modelName);
    setShowOfferModal(true);
    gtag.trackOfferModalOpened(modelName);
    document.body.style.overflow = 'hidden';
  };
  const closeOfferModal = () => {
    setShowOfferModal(false);
    setShowOfferSuccess(false);
    setOfferFormData({ firstName: '', lastName: '', phone: '', email: '', postalCode: '', message: '', acceptPrivacy: false });
    document.body.style.overflow = 'auto';
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: offerFormData.firstName,
          lastName: offerFormData.lastName,
          phone: offerFormData.phone,
          email: offerFormData.email,
          postalCode: offerFormData.postalCode,
          selectedModel,
          message: offerFormData.message,
        }),
      });
      if (response.ok) {
        gtag.trackOfferSubmitted(selectedModel);
        setShowOfferSuccess(true);
        setTimeout(() => closeOfferModal(), 3000);
      } else {
        alert('Es gab ein Problem beim Absenden. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      console.error('Error submitting offer:', error);
      alert('Es gab ein Problem beim Absenden. Bitte versuchen Sie es erneut.');
    }
  };

  const canSubmitOffer =
    offerFormData.firstName.length >= 2 &&
    offerFormData.lastName.length >= 2 &&
    isPhoneValid(offerFormData.phone) &&
    isEmailValid(offerFormData.email) &&
    offerFormData.postalCode.length >= 5 &&
    offerFormData.acceptPrivacy;

  /* ─── Success Screen ─── */
  if (showSuccessMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #eefbf5 0%, #f0f5ff 100%)' }}>
        <div className="premium-card p-10 md:p-14 max-w-2xl text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8" style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}>
            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--navy)' }}>Vielen Dank!</h1>
          <p className="text-xl text-gray-700 mb-8">
            Wir haben Ihre Anfrage erhalten und werden Sie in Kürze für eine kostenlose Führerschein-Analyse anrufen.
          </p>
          <div className="info-badge info mb-4">
            <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-lg font-semibold">Unser Experten-Team ruft Sie zu Ihrer bevorzugten Zeit an</span>
          </div>
          <div className="info-badge success mb-8">
            <CircleCheckIcon className="w-8 h-8 flex-shrink-0" />
            <div>
              <span className="text-lg font-semibold block">Ihr persönliches Testergebnis wurde per E-Mail versendet</span>
              <span className="text-base opacity-80 block mt-1">Bitte prüfen Sie auch Ihren Spam-Ordner.</span>
            </div>
          </div>
          <button onClick={() => window.location.reload()} className="btn btn-secondary">
            Zur Startseite
          </button>
        </div>
      </div>
    );
  }

  /* ─── Step indicator for quiz ─── */
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`step-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}
        />
      ))}
    </div>
  );

  /* ─── Products data ─── */
  const products = [
    { name: 'E-Mobil Vita 4000, 15 km/h', badge: '15 km/h 4-Rad', badgeColor: '#16a34a', image: '/images/vita-care-4000.jpg', gradient: 'from-emerald-50 to-teal-50', desc: 'Ohne Führerschein losfahren. Ab 15 Jahren erlaubt, alle Papiere inklusive.', features: ['Komplett führerscheinfrei', 'Straßenzugelassen in ganz DE', 'Sicher auf 4 Rädern'], shopUrl: 'https://elektroroller-futura.de/e-mobile-fuehrerscheinfrei?utm_source=emobilberater&utm_medium=landing&utm_campaign=seniorenmobil&utm_content=vita4000' },
    { name: 'E-Mobil Vita Care 1000', badge: '25 km/h 3-Rad', badgeColor: '#2563eb', image: '/images/vita-care-1000.jpg', gradient: 'from-blue-50 to-indigo-50', desc: 'Wendig durch enge Gassen, bis zu 90 km weit. Ihr Begleiter für den Alltag.', features: ['Bis zu 90 km Reichweite', 'Kompakt genug für enge Wege', 'Führerscheinfrei (geb. vor 1965)'], shopUrl: 'https://elektroroller-futura.de/elektromobilitaet-fuer-senioren?utm_source=emobilberater&utm_medium=landing&utm_campaign=seniorenmobil&utm_content=vitacare1000' },
    { name: 'E-Mobil Neo, 45 km/h', badge: '45 km/h 4-Rad', badgeColor: '#d4940a', image: '/images/neo-e-mobil.jpg', gradient: 'from-amber-50 to-orange-50', desc: 'Für alle, die auch mal weiter fahren wollen. Kraftvoll und zuverlässig.', features: ['45 km/h auf der Straße', 'Große Reichweite', 'Mit Führerschein AM oder B'], shopUrl: 'https://elektroroller-futura.de/elektro-quad?utm_source=emobilberater&utm_medium=landing&utm_campaign=seniorenmobil&utm_content=neo' },
    { name: 'E-Mobil Vita Care 4000, 25 km/h', badge: '25 km/h 4-Rad', badgeColor: '#0891b2', image: '/images/vita-care-4000-25kmh.jpg', gradient: 'from-cyan-50 to-sky-50', desc: 'Stabil, bequem und sicher. Ideal für tägliche Fahrten zum Einkaufen oder Arzt.', features: ['Stabiler Stand auf 4 Rädern', 'Bequemer Ein- und Ausstieg', 'Mit Führerschein AM oder B'], shopUrl: 'https://elektroroller-futura.de/elektromobilitaet-fuer-senioren?utm_source=emobilberater&utm_medium=landing&utm_campaign=seniorenmobil&utm_content=vitacare4000' },
    { name: 'Kabinenroller Cruise', badge: '25 km/h 3-Rad Kabine', badgeColor: '#0c6b58', image: '/images/kabinenroller-cruise.jpg', gradient: 'from-emerald-50 to-green-50', desc: 'Bei Regen und Kälte trocken und warm ankommen. Platz für zwei Personen.', features: ['Geschlossene Kabine mit Heizung', '2 Sitzplätze', 'Führerscheinfrei (geb. vor 1965)'], shopUrl: 'https://elektroroller-futura.de/elektro-kabinenroller-futura?utm_source=emobilberater&utm_medium=landing&utm_campaign=kabinenroller&utm_content=cruise' },
    { name: 'Kabinenroller Flow', badge: '45 km/h 4-Rad Kabine', badgeColor: '#7c3aed', image: '/images/kabinenroller-flow.jpg', gradient: 'from-violet-50 to-purple-50', desc: 'Fährt sich wie ein kleines Auto. Heizung, Scheibenwischer, voller Komfort.', features: ['Wie Autofahren, nur elektrisch', 'Heizung & Scheibenwischer', '2 Sitzplätze, 45 km/h'], shopUrl: 'https://elektroroller-futura.de/elektro-kabinenroller-futura?utm_source=emobilberater&utm_medium=landing&utm_campaign=kabinenroller&utm_content=flow' },
  ];

  /* ─── Testimonials data ─── */
  const testimonials = [
    { name: 'Renate M.', age: '76 Jahre', initial: 'R', color: 'from-emerald-500 to-teal-600', quote: 'Endlich wieder selbstständig zum Friedhof fahren und Besorgungen machen. Ein ganz neues Lebensgefühl!' },
    { name: 'Horst K.', age: '82 Jahre', initial: 'H', color: 'from-blue-500 to-indigo-600', quote: 'Tolle Beratung zum Führerschein. Ich war unsicher, was ich fahren darf, aber Herr Müller hat mir alles genau erklärt.' },
    { name: 'Erika S.', age: '69 Jahre', initial: 'E', color: 'from-violet-500 to-purple-600', quote: 'Der Kabinenroller ist perfekt für den Winter. Ich friere nicht mehr und komme trocken an.' },
  ];

  return (
    <main className="min-h-screen pb-20 md:pb-0" style={{ background: 'var(--cream)' }}>

      {/* ━━━━━━━━━━ HERO ━━━━━━━━━━ */}
      <section aria-label="E-Mobil Beratung - Unabhängige Beratung für Elektromobile" className="relative min-h-[700px] md:min-h-[820px] flex items-center overflow-hidden wave-divider">
        {/* Animated gradient background */}
        <div className="absolute inset-0 hero-bg noise-overlay" />

        {/* Decorative floating orbs */}
        <div className="absolute top-20 right-[10%] w-80 h-80 rounded-full opacity-10 animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(16,163,127,0.6) 0%, transparent 70%)' }} />
        <div className="absolute bottom-32 left-[5%] w-60 h-60 rounded-full opacity-10 animate-float" style={{ background: 'radial-gradient(circle, rgba(212,148,10,0.5) 0%, transparent 70%)' }} />

        <div className="container-wide relative z-10 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label" style={{ color: 'var(--amber-light)' }}>E-Mobil Beratung</div>
              <h1 className="text-5xl md:text-6xl lg:text-[3.6rem] font-bold text-white mb-8 leading-[1.1]">
                Mit dem Elektroroller wieder selbstständig unterwegs.{' '}
                <span style={{ color: 'var(--amber-light)' }}>Ohne Führerschein.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/85 mb-10 leading-relaxed max-w-2xl">
                Dürfen Sie ein Elektromobil ohne Führerschein fahren? Unser{' '}
                <strong style={{ color: 'var(--amber-light)' }}>kostenloser 2-Minuten-Test</strong> zeigt Ihnen sofort, welche Fahrzeuge für Sie erlaubt sind.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a href="#quiz" onClick={() => gtag.trackQuizStarted('hero')} className="btn btn-cta animate-pulse-glow inline-flex items-center gap-3 text-xl">
                  <CircleCheckIcon className="w-7 h-7" />
                  Jetzt Eignungs-Test starten
                </a>
                <a href="tel:06747950060" onClick={() => gtag.trackPhoneClicked('hero')} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-xl text-white border-2 border-white/25 bg-white/8 hover:bg-white/15 backdrop-blur-sm transition-all duration-300" style={{ minHeight: '60px' }}>
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Kostenlose Beratung
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-5">
                {[
                  { title: '2.500+ Senioren beraten', sub: 'Seit 2019 in ganz Deutschland' },
                  { title: 'Kostenlos & unverbindlich', sub: 'Keine versteckten Kosten' },
                  { title: 'Sofort Klarheit', sub: 'Ergebnis in 2 Minuten' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/30 bg-white/15">
                      <CheckIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-base leading-tight text-white">{b.title}</p>
                      <p className="text-sm text-white/80">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image in glass card */}
            <div className="hidden lg:block">
              <div className="glass-card p-4 animate-float-slow" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }}>
                <Image
                  src="/images/hero-header.jpg"
                  alt="Elektromobile und Kabinenroller - verschiedene Modelle für führerscheinfreie Mobilität"
                  width={600}
                  height={400}
                  priority
                  className="rounded-2xl w-full h-auto object-cover shadow-2xl"
                />
                <div className="mt-4 px-2 pb-2 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/70 text-sm font-medium">Alle Modelle sofort verfügbar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ━━━━━━━━━━ MOBILITY RIGHTS ━━━━━━━━━━ */}
      <section aria-label="Führerschein-Regelungen für Elektromobile" className="section" style={{ background: 'var(--cream)' }}>
        <div className="container-wide">
          <Reveal>
            <div className="text-center mb-14">
              <div className="section-label">Wussten Sie schon?</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--navy)' }}>Viele Senioren dürfen mehr, als sie denken</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Die meisten unserer Kunden sind überrascht, welche Fahrzeuge sie ohne Führerschein fahren dürfen</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Reveal delay="delay-100">
              <div className="premium-card p-8 relative overflow-hidden" style={{ borderTop: '4px solid #16a34a' }}>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5" style={{ background: 'radial-gradient(circle, #16a34a, transparent)' }} />
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}>
                    <CheckIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>Geboren vor 01.04.1965?</h3>
                </div>
                <p className="text-xl text-gray-800 leading-relaxed mb-5">
                  <strong className="text-green-700">Glückwunsch!</strong> Sie dürfen <strong>25 km/h Modelle</strong> (3-Rad Kabinenroller, E-Mobile, E-Mofas) <strong className="text-green-700">komplett führerscheinfrei</strong> fahren!
                </p>
                <ul className="space-y-3 text-lg">
                  {['Keine Prüfung erforderlich', 'Volle Straßenzulassung', 'Bis zu 25 km/h Geschwindigkeit'].map((t, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay="delay-200">
              <div className="premium-card p-8 relative overflow-hidden" style={{ borderTop: '4px solid #2563eb' }}>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5" style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }} />
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
                    <CheckIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>Für alle anderen</h3>
                </div>
                <p className="text-xl text-gray-800 leading-relaxed mb-5">
                  Unsere <strong className="text-blue-700">exklusive 15 km/h Sonderzulassung</strong> bietet die Lösung <strong>ohne Führerschein</strong> – ab 15 Jahren!
                </p>
                <ul className="space-y-3 text-lg">
                  {['Ab 15 Jahren führerscheinfrei', 'Alle Papiere inklusive', 'Deutschlandweit gültig'].map((t, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay="delay-300">
            <div className="premium-card p-8 relative overflow-hidden" style={{ borderTop: '4px solid #7c3aed' }}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.5 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-5-1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>Mit Führerschein AM oder B</h3>
              </div>
              <p className="text-xl text-gray-800 leading-relaxed mb-5">
                <strong className="text-violet-700">E-Mobile und Kabinenroller mit bis zu 45 km/h</strong> – für maximale Geschwindigkeit und Komfort!
              </p>
              <ul className="flex flex-wrap gap-x-8 gap-y-3 text-lg">
                {['Führerschein Klasse AM oder B erforderlich', 'Voller Komfort wie im PKW', 'Ideal für längere Strecken'].map((t, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-violet-600 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━━━━━━━━ QUIZ SECTION ━━━━━━━━━━ */}
      <section id="quiz" aria-label="Eignungstest - Finden Sie Ihr passendes Elektromobil" className="section" style={{ background: 'linear-gradient(180deg, var(--warm-gray) 0%, var(--cream) 100%)' }}>
        <div className="container-wide max-w-4xl">
          <Reveal>
            <div className="premium-card p-8 md:p-12">
              <div className="mb-10">
                <div className="text-center mb-6">
                  <div className="section-label">2-Minuten-Test</div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--navy)' }}>
                    Welches Fahrzeug dürfen Sie fahren?
                  </h2>
                  <p className="text-xl text-gray-600">Beantworten Sie wenige Fragen und erhalten Sie Ihre persönliche Empfehlung</p>
                </div>
                <StepIndicator />
                <p className="text-center text-lg font-semibold text-gray-500">
                  Schritt {currentStep + 1} von {totalSteps}
                </p>
              </div>

              {/* Step 0: Birthday */}
              {currentStep === 0 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--navy)' }}>Wann sind Sie geboren?</h3>
                  <p className="text-xl text-gray-600 mb-4">Ihr Geburtsdatum entscheidet, welche Fahrzeuge Sie ohne Führerschein fahren dürfen. Wir prüfen das sofort für Sie.</p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Tag', placeholder: 'TT', min: 1, max: 31, key: 'birthDay' as const },
                      { label: 'Monat', placeholder: 'MM', min: 1, max: 12, key: 'birthMonth' as const },
                      { label: 'Jahr', placeholder: 'JJJJ', min: 1920, max: 2010, key: 'birthYear' as const },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-lg font-semibold mb-2" style={{ color: 'var(--navy)' }}>{field.label}</label>
                        <input
                          type="number"
                          placeholder={field.placeholder}
                          min={field.min}
                          max={field.max}
                          className="form-input text-center"
                          value={quizAnswers[field.key] || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            setQuizAnswers(prev => ({ ...prev, [field.key]: value === '' ? undefined : parseInt(value) }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  {isPre1965 && quizAnswers.birthYear && quizAnswers.birthMonth && quizAnswers.birthDay && (
                    <div className="info-badge success animate-scaleIn">
                      <CircleCheckIcon className="w-8 h-8 flex-shrink-0" />
                      <div>
                        <strong className="block text-xl mb-1">Vorteil erkannt!</strong>
                        <span className="text-lg">Sie dürfen 25 km/h Modelle (3-Rad, E-Lastenräder, E-Mofas) komplett führerscheinfrei fahren!</span>
                      </div>
                    </div>
                  )}
                  {!isPre1965 && quizAnswers.birthYear && quizAnswers.birthMonth && quizAnswers.birthDay && (
                    <div className="info-badge info animate-scaleIn">
                      <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <strong className="block text-xl mb-1">Info:</strong>
                        <span className="text-lg">Für 25 km/h Modelle benötigen Sie lediglich eine Mofa-Prüfbescheinigung (oder einen Autoführerschein).</span>
                      </div>
                    </div>
                  )}
                  {quizAnswers.birthYear && quizAnswers.birthMonth && quizAnswers.birthDay && (
                    <button onClick={() => handleQuizAnswer('birthYear', quizAnswers.birthYear)} className="btn btn-cta w-full">
                      Weiter &rarr;
                    </button>
                  )}
                </div>
              )}

              {/* Step 1: License */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--navy)' }}>Besitzen Sie einen Autoführerschein (Klasse B/3)?</h3>
                  <p className="text-xl text-gray-600 mb-4">Mit einem Autoführerschein dürfen Sie alle Modelle fahren – auch unsere 45 km/h Kabinenroller.</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <button onClick={() => handleQuizAnswer('license', 'auto')} className={`quiz-option text-center ${quizAnswers.license === 'auto' ? 'selected' : ''}`}>
                      <div className="text-5xl mb-3">✅</div>
                      <div className="text-xl font-bold">Ja, Autoführerschein</div>
                      <div className="text-base text-gray-500 mt-2">Klasse B, B1, oder alte Klasse 3</div>
                    </button>
                    <button onClick={() => handleQuizAnswer('license', 'none')} className={`quiz-option text-center ${quizAnswers.license === 'none' ? 'selected' : ''}`}>
                      <div className="text-5xl mb-3">❌</div>
                      <div className="text-xl font-bold">Nein, keinen</div>
                      <div className="text-base text-gray-500 mt-2">Kein Führerschein oder nur Mofa/AM</div>
                    </button>
                  </div>
                  {hasAutoLicense && (
                    <div className="info-badge success animate-scaleIn">
                      <CircleCheckIcon className="w-8 h-8 flex-shrink-0" />
                      <div>
                        <strong className="block text-xl mb-1">Perfekt!</strong>
                        <span className="text-lg">Damit dürfen Sie alle Modelle inklusive der 45 km/h Kabinenroller fahren.</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Usage */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--navy)' }}>Wo möchten Sie hauptsächlich fahren?</h3>
                  <div className="grid md:grid-cols-2 gap-5">
                    {[
                      { value: 'local', label: 'Innerorts / Nahbereich', description: 'Einkaufen, Arztbesuche, kurze Strecken', icon: '🏘️' },
                      { value: 'distance', label: 'Auch Überlandfahrten', description: 'Längere Touren, Ausflüge', icon: '🌄' },
                    ].map(option => (
                      <button key={option.value} onClick={() => handleQuizAnswer('usage', option.value)} className={`quiz-option text-center ${quizAnswers.usage === option.value ? 'selected' : ''}`}>
                        <div className="text-4xl mb-3">{option.icon}</div>
                        <div className="font-bold mb-1">{option.label}</div>
                        <div className="text-base text-gray-500">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Weather */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--navy)' }}>Wie wichtig ist Ihnen Wetterschutz?</h3>
                  <div className="grid md:grid-cols-2 gap-5">
                    {[
                      { value: 'open', label: 'Offenes Fahrgefühl', description: 'Freiheit & direkter Kontakt zur Umgebung', icon: '🌤️' },
                      { value: 'closed', label: 'Geschlossene Kabine', description: 'Mit Heizung, Scheibenwischer & Komfort', icon: '🏠' },
                    ].map(option => (
                      <button key={option.value} onClick={() => handleQuizAnswer('weatherProtection', option.value)} className={`quiz-option text-center ${quizAnswers.weatherProtection === option.value ? 'selected' : ''}`}>
                        <div className="text-4xl mb-3">{option.icon}</div>
                        <div className="font-bold mb-1">{option.label}</div>
                        <div className="text-base text-gray-500">{option.description}</div>
                      </button>
                    ))}
                  </div>
                  {prefersWeatherProtection && (
                    <div className="info-badge success animate-scaleIn">
                      <CircleCheckIcon className="w-6 h-6 flex-shrink-0" />
                      <span>Perfekt für Ganzjahresnutzung! Unsere Kabinenroller bieten vollwertigen Wetterschutz.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Passengers */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--navy)' }}>Fahren Sie meistens allein oder zu zweit?</h3>
                  <div className="grid md:grid-cols-2 gap-5">
                    {[
                      { value: 'alone', label: 'Meistens allein', description: 'Elektromobil mit 1 Sitzplatz', icon: '👤' },
                      { value: 'two', label: 'Oft zu zweit', description: 'Kabinenroller mit 2 Sitzplätzen', icon: '👥' },
                    ].map(option => (
                      <button key={option.value} onClick={() => handleQuizAnswer('passengers', option.value)} className={`quiz-option text-center ${quizAnswers.passengers === option.value ? 'selected' : ''}`}>
                        <div className="text-4xl mb-3">{option.icon}</div>
                        <div className="font-bold mb-1">{option.label}</div>
                        <div className="text-base text-gray-500">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Lead Magnet */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #fef3c7, #fff7ed)', border: '2px solid #fcd34d' }}>
                    <div className="text-6xl mb-4">🎁</div>
                    <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--navy)' }}>Ihre Auswertung ist fertig</h3>
                    <p className="text-xl text-gray-800 leading-relaxed">
                      Wir haben passende Modelle für Sie gefunden. Im nächsten Schritt erhalten Sie <strong>Ihr persönliches Ergebnis per E-Mail</strong> und einen <strong>kostenlosen Rückruf</strong> von unserem Experten-Team.
                    </p>
                  </div>
                  <button onClick={() => setCurrentStep(currentStep + 1)} className="btn btn-cta w-full">
                    Ergebnis jetzt anfordern &rarr;
                  </button>
                  <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="btn btn-secondary w-full">
                    &larr; Zurück
                  </button>
                </div>
              )}

              {/* Step 6: Lead Form */}
              {currentStep === 6 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="rounded-2xl p-6 mb-4" style={{ background: 'linear-gradient(135deg, #dcfce7, #dbeafe)', border: '2px solid #86efac' }}>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--navy)' }}>Wohin dürfen wir Ihr Ergebnis senden?</h3>
                    <p className="text-lg text-gray-700 mb-4">Sie erhalten Ihre persönliche Auswertung per E-Mail. Zusätzlich beraten wir Sie kostenlos am Telefon zu:</p>
                    <ul className="space-y-2 text-lg">
                      {['Ihrer Führerschein-Situation', 'Modellempfehlungen für Ihre Bedürfnisse', 'Finanzierungs- und Fördermöglichkeiten'].map((t, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CircleCheckIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold mb-3" style={{ color: 'var(--navy)' }}>Ihr vollständiger Name *</label>
                      <input type="text" required className="form-input" placeholder="Max Mustermann" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold mb-3" style={{ color: 'var(--navy)' }}>Ihre Telefonnummer *</label>
                      <input type="tel" required className="form-input" placeholder="0123 456789" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} />
                      {formData.phone && !isPhoneValid(formData.phone) && <p className="mt-2 text-red-600 text-base">Bitte geben Sie eine gültige Telefonnummer ein (min. 8 Ziffern)</p>}
                    </div>
                    <div>
                      <label className="block text-lg font-semibold mb-3" style={{ color: 'var(--navy)' }}>Ihre E-Mail-Adresse *</label>
                      <input type="email" required className="form-input" placeholder="max@beispiel.de" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} />
                      {formData.email && !isEmailValid(formData.email) && <p className="mt-2 text-red-600 text-base">Bitte geben Sie eine gültige E-Mail-Adresse ein</p>}
                      <p className="mt-2 text-base text-gray-500">Sie erhalten Ihr persönliches Testergebnis per E-Mail</p>
                    </div>
                    <div>
                      <label className="block text-lg font-semibold mb-3" style={{ color: 'var(--navy)' }}>Wann können wir Sie am besten erreichen? *</label>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { value: 'morning', label: 'Vormittags', icon: '🌅' },
                          { value: 'afternoon', label: 'Nachmittags', icon: '☀️' },
                          { value: 'both', label: 'Egal', icon: '⏰' },
                        ].map(option => (
                          <button key={option.value} type="button" onClick={() => setFormData(prev => ({ ...prev, availability: option.value as any }))} className={`quiz-option text-center ${formData.availability === option.value ? 'selected' : ''}`}>
                            <div className="text-3xl mb-2">{option.icon}</div>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl p-5" style={{ background: 'var(--warm-gray)', border: '1px solid #e0ddd8' }}>
                      <p className="text-base text-gray-600">
                        <strong>Datenschutz-Hinweis:</strong> Wir prüfen Ihre Angaben und rufen Sie für eine kostenlose Führerschein-Analyse an. Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
                      </p>
                    </div>
                    <button type="submit" disabled={!canSubmit} className={`btn w-full text-xl ${canSubmit ? 'btn-cta' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`} style={!canSubmit ? { minHeight: '60px' } : {}}>
                      {canSubmit ? 'Jetzt kostenloses Testergebnis anfordern' : 'Bitte alle Felder ausfüllen'}
                    </button>
                  </form>
                  <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="btn btn-secondary w-full">&larr; Zurück</button>
                </div>
              )}

              {/* Back button for steps 1-4 */}
              {currentStep > 0 && currentStep < 5 && (
                <div className="mt-8">
                  <button onClick={() => setCurrentStep(currentStep - 1)} className="btn btn-secondary w-full">&larr; Zurück</button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━━━━━━━━ LICENSE MATRIX ━━━━━━━━━━ */}
      <section aria-label="Führerschein-Übersicht - Welches Fahrzeug dürfen Sie fahren" className="section" style={{ background: 'var(--cream)' }}>
        <div className="container-wide">
          <Reveal>
            <div className="text-center mb-14">
              <div className="section-label">Auf einen Blick</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--navy)' }}>Welches Fahrzeug passt zu Ihrem Führerschein?</h2>
              <p className="text-xl text-gray-600">Drei Kategorien, klare Regeln. So finden Sie Ihr passendes Modell.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { speed: '25 km/h', type: '3-Rad Seniorenmobil / Kabinenroller', color: '#16a34a', best: true, info: { title: 'Altersabhängig', lines: ['Geboren vor 01.04.1965:', '✅ Führerscheinfrei!', 'Geboren ab 01.04.1965:', 'Mofa-Prüfbescheinigung oder AM/B nötig'] }, features: ['Kompakt & wendig', 'Ideal für Stadtverkehr', 'Große Reichweite'] },
              { speed: '25 km/h', type: '4-Rad Seniorenmobil / Kabinenroller', color: '#2563eb', best: false, info: { title: 'Führerschein nötig', lines: ['Führerschein Klasse AM oder B erforderlich'] }, features: ['2 Sitzplätze', 'Vollwertiger Wetterschutz', 'Heizung & Komfort'] },
              { speed: '45 km/h', type: 'E-Mobil / Kabinenroller', color: '#7c3aed', best: false, info: { title: 'Führerschein nötig', lines: ['Führerschein Klasse AM oder B erforderlich'] }, features: ['Wie ein PKW: 2 Sitzplätze', 'Heizung & voller Komfort', 'Maximale Geschwindigkeit'] },
            ].map((cat, i) => (
              <Reveal key={i} delay={`delay-${(i + 1) * 100}` as any}>
                <div className="premium-card p-8 relative h-full" style={{ borderTop: `4px solid ${cat.color}` }}>
                  {cat.best && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white px-5 py-1.5 rounded-full font-bold text-sm shadow-lg whitespace-nowrap" style={{ background: 'linear-gradient(135deg, var(--amber), var(--amber-light))' }}>
                      Bestseller
                    </div>
                  )}
                  <div className="text-center mb-6 mt-2">
                    <div className="text-5xl font-bold mb-2" style={{ color: cat.color }}>{cat.speed}</div>
                    <div className="text-lg font-semibold text-gray-700">{cat.type}</div>
                  </div>
                  <div className="rounded-xl p-5 mb-6" style={{ background: `${cat.color}08`, border: `2px solid ${cat.color}25` }}>
                    <p className="text-lg font-bold mb-2" style={{ color: cat.color }}>{cat.info.title}</p>
                    {cat.info.lines.map((l, j) => (
                      <p key={j} className="text-base text-gray-700">{l}</p>
                    ))}
                  </div>
                  <ul className="space-y-3 text-lg text-gray-700">
                    {cat.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span style={{ color: cat.color }} className="font-bold text-lg">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay="delay-400">
            <div className="mt-10 premium-card p-8">
              <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: 'var(--navy)' }}>Wichtig zu wissen</h3>
              <div className="grid md:grid-cols-2 gap-6 text-lg text-gray-700">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p><strong>Autoführerschein Klasse B:</strong> Schließt automatisch Klasse AM ein – Sie dürfen damit ALLE unsere Modelle fahren!</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p><strong>Stichtag beachten:</strong> Der 01.04.1965 ist entscheidend für die führerscheinfreie Nutzung von 25 km/h Modellen</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━━━━━━━━ CONSULTATION ━━━━━━━━━━ */}
      <section aria-label="Kostenlose Fachberatung" className="section relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #0c3b2f 50%, var(--navy) 100%)' }}>
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full opacity-10 animate-float" style={{ background: 'radial-gradient(circle, rgba(212,148,10,0.5), transparent)' }} />
        <div className="container-wide relative z-10">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="glass-card p-5 text-center" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="rounded-2xl overflow-hidden mb-4">
                    <Image src="/images/berater-foto.jpg" alt="Ihr persönlicher Mobilitäts-Experte - Kostenlose Beratung zu Elektromobilen und Kabinenrollern" width={400} height={400} loading="lazy" className="w-full h-auto object-cover aspect-square" />
                  </div>
                  <p className="text-xl font-semibold text-white mt-4">Ihr persönlicher Mobilitäts-Experte</p>
                  <p className="text-lg text-white/60">Unabhängige Beratung</p>
                </div>
              </div>
              <div>
                <div className="section-label" style={{ color: 'var(--amber-light)' }}>Persönliche Beratung</div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Sie haben Fragen? Wir haben Antworten.
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Rufen Sie an und sprechen Sie direkt mit einem Berater, der sich mit Führerscheinrecht und Seniorenmobilen auskennt. Kein Callcenter, keine Warteschleife.
                </p>
                <div className="glass-card p-6 mb-6" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }}>
                  <div className="flex items-center gap-4 mb-4">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <div>
                      <p className="text-base font-medium text-white/70">Kostenlose Hotline:</p>
                      <a href="tel:06747950060" onClick={() => gtag.trackPhoneClicked('consultation')} className="text-3xl font-bold text-white hover:text-amber-300 transition-colors">06747 950060</a>
                    </div>
                  </div>
                  <p className="text-lg text-white/70 mb-4">Mo-Fr: 08:00-12:00 &amp; 13:00-17:00 Uhr</p>
                  <div className="border-t border-white/15 pt-4 space-y-2">
                    {['Unverbindlich & Kostenlos', 'Klärung der Führerscheinfragen', 'Tipps zur Finanzierung', 'Geprüfter Fachhändler'].map((t, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--amber-light)' }} />
                        <span className="text-lg font-semibold text-white/90">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━━━━━━━━ PRODUCTS ━━━━━━━━━━ */}
      <section id="produkte" aria-label="Unsere Elektromobil und Kabinenroller Modelle" className="section" style={{ background: 'var(--cream)' }}>
        <div className="container-wide">
          <Reveal>
            <div className="text-center mb-14">
              <div className="section-label">Modelle</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--navy)' }}>Vom Stadtflitzer bis zum Ganzjahres-Kabinenroller</h2>
              <p className="text-xl text-gray-600">Alle Modelle sofort verfügbar. Fordern Sie Ihr kostenloses Angebot an.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <Reveal key={i} delay={`delay-${((i % 3) + 1) * 100}` as any}>
                <div className="product-card h-full">
                  <div className="p-5 pb-0">
                    <span className="inline-block text-white px-4 py-1.5 rounded-full font-bold text-sm mb-4" style={{ background: p.badgeColor }}>{p.badge}</span>
                    <div className="rounded-2xl overflow-hidden mb-4 relative" style={{ height: '280px', background: `linear-gradient(135deg, ${p.badgeColor}15, ${p.badgeColor}08)` }}>
                      <Image src={p.image} alt={`${p.name} - ${p.desc}`} fill loading="lazy" className="object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    </div>
                  </div>
                  <div className="px-5 pb-5 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--navy)' }}>{p.name}</h3>
                    <p className="text-base text-gray-600 mb-3">{p.desc}</p>
                    <ul className="space-y-1.5 text-base mb-5">
                      {p.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <CheckIcon className="w-4 h-4 flex-shrink-0" style={{ color: p.badgeColor }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => openOfferModal(p.name)} className="w-full mt-auto btn btn-cta text-base py-3">
                      Angebot anfordern
                    </button>
                    <a href={p.shopUrl} target="_blank" rel="noopener noreferrer" onClick={() => gtag.trackShopClick(p.name)} className="w-full mt-2 btn btn-secondary text-base py-3 text-center block">
                      Im Shop ansehen
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ FINANCING CALCULATOR ━━━━━━━━━━ */}
      <FinancingCalculator onRequestOffer={openOfferModal} />

      {/* ━━━━━━━━━━ SAVINGS CALCULATOR ━━━━━━━━━━ */}
      <SavingsCalculator />

      {/* ━━━━━━━━━━ MID-PAGE CTA ━━━━━━━━━━ */}
      <section className="py-14" style={{ background: 'linear-gradient(135deg, var(--emerald) 0%, #0c6b58 50%, var(--navy) 100%)' }}>
        <div className="container-wide text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Noch unsicher? Das geht den meisten so.
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Über <strong className="text-white">2.500 Senioren</strong> haben unseren kostenlosen Test bereits gemacht und wissen jetzt genau, was sie fahren dürfen. In 2 Minuten haben auch Sie Klarheit.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#quiz" onClick={() => gtag.trackQuizStarted('mid_page_cta')} className="btn btn-cta inline-flex items-center gap-3 text-xl">
                <CircleCheckIcon className="w-7 h-7" />
                Jetzt Test starten
              </a>
              <a href="tel:06747950060" onClick={() => gtag.trackPhoneClicked('mid_page_cta')} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-xl text-white border-2 border-white/25 bg-white/10 hover:bg-white/20 transition-all" style={{ minHeight: '60px' }}>
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                06747 950060
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━━━━━━━━ FAQ ━━━━━━━━━━ */}
      <section aria-label="Häufig gestellte Fragen" className="section" style={{ background: 'var(--cream)' }}>
        <div className="container-wide max-w-4xl">
          <Reveal>
            <div className="text-center mb-14">
              <div className="section-label">Ihre Fragen</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--navy)' }}>Die 7 wichtigsten Fragen zu Elektromobilen</h2>
              <p className="text-xl text-gray-600">Klare Antworten zu Führerschein, Reichweite und Ihren Rechten</p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              { q: 'Welches Elektromobil darf ich ohne Führerschein fahren?', a: 'Wenn Sie vor dem 01.04.1965 geboren sind, dürfen Sie 25 km/h Modelle (3-Rad Kabinenroller, E-Mobile, E-Mofas) komplett führerscheinfrei fahren. Für alle anderen bieten wir eine exklusive 15 km/h Sonderzulassung an, mit der Sie ab 15 Jahren ohne Führerschein fahren dürfen.' },
              { q: 'Was kostet die Beratung?', a: 'Die Beratung ist komplett kostenlos und unverbindlich. Unsere Mobilitäts-Experten beraten Sie telefonisch unter 06747 950060 zu Führerscheinfragen, Modellempfehlungen und Finanzierungsmöglichkeiten.' },
              { q: 'Was bedeutet die 15 km/h Sonderzulassung?', a: 'Die 15 km/h Sonderzulassung ermöglicht es, bestimmte Elektromobile ohne Führerschein ab 15 Jahren zu fahren. Diese Zulassung ist deutschlandweit gültig und alle erforderlichen Papiere sind inklusive.' },
              { q: 'Kann ich mit Autoführerschein alle Modelle fahren?', a: 'Ja! Der Autoführerschein (Klasse B) schließt automatisch die Klasse AM ein. Damit dürfen Sie alle unsere Modelle fahren, einschließlich der 45 km/h Kabinenroller und E-Mobile.' },
              { q: 'Was ist der Stichtag 01.04.1965?', a: 'Personen, die vor dem 01.04.1965 geboren sind, dürfen 25 km/h Elektromobile und 3-Rad Kabinenroller komplett ohne Führerschein fahren. Dies gilt aufgrund einer Sonderregelung im deutschen Verkehrsrecht.' },
              { q: 'Haben die Kabinenroller einen Wetterschutz?', a: 'Ja, unsere Kabinenroller bieten vollwertigen Wetterschutz. Die Modelle verfügen über eine geschlossene Kabine, Heizung und Scheibenwischer – ideal für Ganzjahresnutzung bei jedem Wetter.' },
              { q: 'Wie weit kann ich mit einem Elektromobil fahren?', a: 'Die Reichweite variiert je nach Modell. Unser E-Mobil Vita Care 1000 erreicht beispielsweise bis zu 90 km Reichweite. Unsere Experten beraten Sie gerne, welches Modell für Ihre typischen Strecken ideal ist.' },
            ].map((faq, i) => (
              <Reveal key={i} delay={`delay-${Math.min((i + 1) * 100, 300)}` as any}>
                <details className="premium-card group" onToggle={(e) => { if ((e.target as HTMLDetailsElement).open) gtag.trackFaqOpened(faq.q); }}>
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer text-xl font-bold list-none" style={{ color: 'var(--navy)' }}>
                    <span className="pr-4">{faq.q}</span>
                    <svg className="w-6 h-6 flex-shrink-0 text-gray-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-lg text-gray-700 leading-relaxed" style={{ borderTop: '1px solid #f0ede8' }}>
                    <p className="pt-4">{faq.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ TESTIMONIALS ━━━━━━━━━━ */}
      <section aria-label="Kundenstimmen und Erfahrungen" className="section" style={{ background: 'var(--warm-gray)' }}>
        <div className="container-wide">
          <Reveal>
            <div className="text-center mb-14">
              <div className="section-label">Echte Erfahrungen</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--navy)' }}>So erleben unsere Kunden ihre neue Freiheit</h2>
              <p className="text-xl text-gray-600">Renate, Horst und Erika waren genauso unsicher wie Sie. Heute sind sie wieder selbstständig unterwegs.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={`delay-${(i + 1) * 100}` as any}>
                <div className="premium-card p-8 relative h-full quote-mark">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${t.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                      {t.initial}
                    </div>
                    <div>
                      <p className="font-bold text-xl" style={{ color: 'var(--navy)' }}>{t.name}</p>
                      <p className="text-base text-gray-500">{t.age}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-4">
                    {[1,2,3,4,5].map(s => <StarIcon key={s} />)}
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ FOOTER ━━━━━━━━━━ */}
      <footer aria-label="Kontakt und Navigation" className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--navy) 0%, #091525 100%)' }}>
        <div className="absolute inset-0 noise-overlay" />
        <div className="container-wide relative z-10">
          {/* Phone CTA */}
          <div className="text-center mb-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-2xl md:text-3xl font-bold text-white mb-3">
              Kostenlose Fachberatung:{' '}
              <a href="tel:06747950060" onClick={() => gtag.trackPhoneClicked('footer_cta')} className="hover:text-amber-300 transition-colors">06747 950060</a>
            </p>
            <p className="text-lg text-white/50">
              Seniorenmobile &bull; Kabinenroller &bull; Führerschein-Check &bull; Finanzierung
            </p>
          </div>

          <nav aria-label="Footer-Navigation" className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>Kontakt</h3>
              <a href="tel:06747950060" onClick={() => gtag.trackPhoneClicked('footer')} className="text-xl font-semibold text-white/80 hover:text-white transition-colors block mb-2">06747 950060</a>
              <p className="text-base text-white/40">Mo-Fr: 08:00-12:00 &amp; 13:00-17:00 Uhr</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>Unsere Modelle</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Seniorenmobile (Übersicht)', href: 'https://elektroroller-futura.de/elektromobilitaet-fuer-senioren?utm_source=emobilberater&utm_medium=footer&utm_campaign=seniorenmobil' },
                  { label: 'Vita 4000 (15 km/h)', href: 'https://elektroroller-futura.de/e-mobile-fuehrerscheinfrei?utm_source=emobilberater&utm_medium=footer&utm_campaign=seniorenmobil' },
                  { label: 'Vita Care 1000 (25 km/h)', href: 'https://elektroroller-futura.de/elektromobilitaet-fuer-senioren?utm_source=emobilberater&utm_medium=footer&utm_campaign=seniorenmobil' },
                  { label: 'Neo E-Mobil (45 km/h)', href: 'https://elektroroller-futura.de/elektro-quad?utm_source=emobilberater&utm_medium=footer&utm_campaign=seniorenmobil' },
                  { label: 'Kabinenroller', href: 'https://elektroroller-futura.de/elektro-kabinenroller-futura?utm_source=emobilberater&utm_medium=footer&utm_campaign=kabinenroller' },
                ].map((m, i) => (
                  <li key={i}><a href={m.href} target="_blank" rel="noopener noreferrer" className="text-base text-white/40 hover:text-white/80 transition-colors">{m.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>Ratgeber & Rechtliches</h3>
              <ul className="space-y-2">
                {[
                  { href: '/ratgeber', label: 'Ratgeber' },
                  { href: '/ratgeber/fuehrerschein-elektroroller', label: 'Führerschein-Ratgeber' },
                  { href: '/ratgeber/reichweite-elektroroller', label: 'Reichweite-Ratgeber' },
                  { href: '/ratgeber/elektromobil-kosten', label: 'Kosten-Ratgeber' },
                  { href: '/ratgeber/seniorenmobil-vergleich', label: 'Modell-Vergleich' },
                  { href: '/ratgeber/foerderung-elektromobil', label: 'Förderung & Zuschüsse' },
                  { href: '/impressum', label: 'Impressum' },
                  { href: '/datenschutz', label: 'Datenschutz' },
                  { href: '/agb', label: 'AGB' },
                ].map((l, i) => (
                  <li key={i}><Link href={l.href} className="text-base text-white/40 hover:text-white/80 transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="text-center pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-sm text-white/30">
              &copy; 2026 E-Mobil Beratung &mdash; Unabhängige Beratung für Ihre Mobilität
            </p>
          </div>
        </div>
      </footer>

      {/* ━━━━━━━━━━ STICKY MOBILE CTA ━━━━━━━━━━ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #0c3b2f 100%)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex gap-3 p-3">
          <a href="#quiz" onClick={() => gtag.trackQuizStarted('sticky_mobile')} className="flex-1 btn btn-cta text-base py-3 text-center inline-flex items-center justify-center gap-2">
            <CircleCheckIcon className="w-5 h-5" />
            Test starten
          </a>
          <a href="tel:06747950060" onClick={() => gtag.trackPhoneClicked('sticky_mobile')} className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center" aria-label="Anrufen: 06747 950060">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </a>
        </div>
      </div>

      {/* ━━━━━━━━━━ OFFER MODAL ━━━━━━━━━━ */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50" onClick={(e) => { if (e.target === e.currentTarget) closeOfferModal(); }}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn">
            {/* Header */}
            <div className="sticky top-0 bg-white z-20 rounded-t-3xl px-8 md:px-10 pt-8 pb-5" style={{ borderBottom: '1px solid #f0ede8' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: 'var(--navy)' }}>Unverbindliches Angebot</h2>
                  <p className="text-lg text-gray-600">Für: <strong style={{ color: 'var(--emerald)' }}>{selectedModel}</strong></p>
                </div>
                <button onClick={closeOfferModal} className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-100 hover:bg-red-50 hover:text-red-600 transition-all" aria-label="Schließen">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-8 md:px-10 pb-8 pt-6">
              {!showOfferSuccess ? (
                <>
                  <div className="rounded-2xl p-5 mb-6" style={{ background: 'linear-gradient(135deg, #fff7ed, #fef3c7)', border: '1px solid #fcd34d' }}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🔥</span>
                      <div>
                        <p className="text-base font-bold" style={{ color: 'var(--navy)' }}>Antwort innerhalb von 24 Stunden</p>
                        <p className="text-sm text-gray-600">Wir prüfen Ihre Anfrage persönlich und melden uns mit einem individuellen Angebot bei Ihnen.</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleOfferSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-lg font-semibold mb-2" style={{ color: 'var(--navy)' }}>Vorname *</label>
                        <input type="text" required className="form-input" placeholder="Max" value={offerFormData.firstName} onChange={(e) => setOfferFormData(prev => ({ ...prev, firstName: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-lg font-semibold mb-2" style={{ color: 'var(--navy)' }}>Nachname *</label>
                        <input type="text" required className="form-input" placeholder="Mustermann" value={offerFormData.lastName} onChange={(e) => setOfferFormData(prev => ({ ...prev, lastName: e.target.value }))} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-lg font-semibold mb-2" style={{ color: 'var(--navy)' }}>Telefonnummer *</label>
                        <input type="tel" required className="form-input" placeholder="0123 456789" value={offerFormData.phone} onChange={(e) => setOfferFormData(prev => ({ ...prev, phone: e.target.value }))} />
                        {offerFormData.phone && !isPhoneValid(offerFormData.phone) && <p className="mt-2 text-red-600 text-sm">Bitte geben Sie eine gültige Telefonnummer ein</p>}
                      </div>
                      <div>
                        <label className="block text-lg font-semibold mb-2" style={{ color: 'var(--navy)' }}>E-Mail-Adresse *</label>
                        <input type="email" required className="form-input" placeholder="max@beispiel.de" value={offerFormData.email} onChange={(e) => setOfferFormData(prev => ({ ...prev, email: e.target.value }))} />
                        {offerFormData.email && !isEmailValid(offerFormData.email) && <p className="mt-2 text-red-600 text-sm">Bitte geben Sie eine gültige E-Mail-Adresse ein</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-lg font-semibold mb-2" style={{ color: 'var(--navy)' }}>Postleitzahl *</label>
                      <input type="text" required className="form-input" placeholder="12345" maxLength={5} value={offerFormData.postalCode} onChange={(e) => setOfferFormData(prev => ({ ...prev, postalCode: e.target.value.replace(/\D/g, '') }))} />
                      <p className="mt-1 text-sm text-gray-500">Zur Prüfung der Lieferbarkeit und Partner vor Ort</p>
                    </div>
                    <div>
                      <label className="block text-lg font-semibold mb-2" style={{ color: 'var(--navy)' }}>Ihre Nachricht (optional)</label>
                      <textarea className="form-input min-h-[100px]" placeholder="Haben Sie spezielle Fragen oder Wünsche?" value={offerFormData.message} onChange={(e) => setOfferFormData(prev => ({ ...prev, message: e.target.value }))} />
                    </div>
                    <div className="rounded-xl p-5" style={{ background: 'var(--warm-gray)' }}>
                      <label className="flex items-start gap-4 cursor-pointer">
                        <input type="checkbox" required className="w-6 h-6 mt-1 rounded-lg border-2 border-gray-300 accent-emerald-600" checked={offerFormData.acceptPrivacy} onChange={(e) => setOfferFormData(prev => ({ ...prev, acceptPrivacy: e.target.checked }))} />
                        <span className="text-base text-gray-600">
                          Ich habe die <a href="/datenschutz" target="_blank" className="underline hover:text-emerald-700" style={{ color: 'var(--emerald)' }}>Datenschutzerklärung</a> zur Kenntnis genommen. Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden. *
                        </span>
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center pt-2">
                      {[
                        { icon: <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>, text: 'SSL verschlüsselt' },
                        { icon: <CircleCheckIcon className="w-5 h-5 text-blue-600" />, text: 'Kostenlose Beratung' },
                        { icon: <CheckIcon className="w-5 h-5" style={{ color: 'var(--emerald)' }} />, text: 'Geprüfter Händler' },
                      ].map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                          {b.icon}
                          {b.text}
                        </div>
                      ))}
                    </div>
                    <button type="submit" disabled={!canSubmitOffer} className={`btn w-full text-lg ${canSubmitOffer ? 'btn-cta' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}>
                      {canSubmitOffer ? 'Jetzt kostenloses Angebot anfordern' : 'Bitte alle Pflichtfelder ausfüllen'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}>
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--navy)' }}>Vielen Dank!</h3>
                  <p className="text-xl text-gray-700 mb-2">Ihre Anfrage wurde erfolgreich gesendet.</p>
                  <p className="text-lg text-gray-500">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
