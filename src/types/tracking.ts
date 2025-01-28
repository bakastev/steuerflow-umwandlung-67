export interface UserBehavior {
  timeOnPage: number;
  scrollDepth: number;
  clicks: number;
  elementInteractions: {
    [key: string]: number;
  };
  dwellTimes: {
    [key: string]: number;
  };
  lastActivity: number;
  activeTimeWindows: number[];
  mouseMovements: {
    [key: string]: number;
  };
  textSelections: {
    [key: string]: number;
  };
  videoInteractions?: {
    playCount: number;
    pauseCount: number;
    completionRate: number;
    averageWatchTime: number;
  };
}

export interface EngagementInsights {
  score: number;
  insights: string[];
}

export const KNOWN_SECTIONS = {
  'expert-section': 'Experten-Profil und Werdegang',
  'problems-section': 'Herausforderungen für Geschäftsführer',
  'solution-section': 'Einzigartige Lösungsansätze',
  'process-section': 'Prozessablauf',
  'benefits-section': 'Vorteile und Mehrwert',
  'testimonials-section': 'Kundenstimmen',
  'contact-section': 'Kontaktbereich',
  'strategy-flow-section': 'Strategieablauf',
  'faqs-section': 'Häufig gestellte Fragen'
} as const;

export type KnownSection = keyof typeof KNOWN_SECTIONS;