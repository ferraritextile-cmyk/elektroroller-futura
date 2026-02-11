export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
};

export const event = (action: string, params?: Record<string, any>) => {
  if (!GA_MEASUREMENT_ID) return;
  window.gtag('event', action, params);
};

/* ─── Elektroroller Futura Conversion Events ─── */

export const trackQuizStarted = (source: string) => {
  event('quiz_started', {
    event_category: 'engagement',
    event_label: source,
    source,
  });
};

export const trackQuizStepCompleted = (step: number, stepName: string, answer?: string) => {
  event('quiz_step_completed', {
    event_category: 'engagement',
    step_number: step,
    step_name: stepName,
    answer,
  });
};

export const trackQuizCompleted = () => {
  event('quiz_completed', {
    event_category: 'conversion',
  });
};

export const trackLeadSubmitted = (availability: string) => {
  event('lead_form_submitted', {
    event_category: 'conversion',
    availability,
  });
};

export const trackPhoneClicked = (location: string) => {
  event('phone_clicked', {
    event_category: 'conversion',
    event_label: '06747950060',
    location,
  });
};

export const trackOfferModalOpened = (model: string) => {
  event('offer_modal_opened', {
    event_category: 'engagement',
    model,
  });
};

export const trackOfferSubmitted = (model: string) => {
  event('offer_requested', {
    event_category: 'conversion',
    model,
  });
};

export const trackFaqOpened = (question: string) => {
  event('faq_opened', {
    event_category: 'engagement',
    question,
  });
};
