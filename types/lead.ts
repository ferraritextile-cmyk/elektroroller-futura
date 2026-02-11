export interface QuizAnswers {
  birthYear: number;
  birthMonth?: number;
  birthDay?: number;
  license: 'none' | 'mofa' | 'auto' | 'roller';
  usage: 'local' | 'distance';
  weatherProtection: 'open' | 'closed';
  passengers: 'alone' | 'two';
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  availability: 'morning' | 'afternoon' | 'both';
  quizAnswers: QuizAnswers;

  // Berechnete Felder
  isPre1965: boolean;
  recommendedCategory: 'elektromobil' | 'kabinenroller';
  prefersWeatherProtection: boolean;

  // Metadaten
  createdAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
}

export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  availability: 'morning' | 'afternoon' | 'both';
  quizAnswers: QuizAnswers;
}
