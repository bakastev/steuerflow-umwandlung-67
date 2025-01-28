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
}

export const KNOWN_SECTIONS = {
  'expert-section': 'Experten-Profil und Werdegang',
  'problems-section': 'Problemstellungen und Herausforderungen',
  'solution-section': 'Lösungsansätze',
  'process-section': 'Prozessablauf',
  'benefits-section': 'Vorteile und Mehrwert',
  'testimonials-section': 'Kundenstimmen',
  'contact-section': 'Kontaktbereich'
} as const;

export type KnownSection = keyof typeof KNOWN_SECTIONS;