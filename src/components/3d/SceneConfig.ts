import { Vector3 } from 'three';

export interface Section3D {
  id: string;
  title: string;
  position: Vector3;
  content: string;
  color: string;
}

export const sections: Section3D[] = [
  {
    id: 'benefits',
    title: "Vorteile",
    position: new Vector3(0, 0, 0),
    content: "KI-gestützte Optimierung, Datenbasierte Entscheidungen, Maximale Performance",
    color: "#C5A572"
  },
  {
    id: 'expertise',
    title: "Expertise",
    position: new Vector3(15, 0, 0),
    content: "Seit 2017 revolutionieren wir die Art und Weise, wie B2B Unternehmen ihre Online-Präsenz optimieren",
    color: "#9333EA"
  },
  {
    id: 'process',
    title: "Prozess",
    position: new Vector3(30, 0, 0),
    content: "Analyse, Optimierung, Personalisierung, Mehr Umsatz",
    color: "#2563EB"
  },
  {
    id: 'testimonials',
    title: "Testimonials",
    position: new Vector3(45, 0, 0),
    content: "Echte Ergebnisse von echten Kunden",
    color: "#16A34A"
  },
  {
    id: 'contact',
    title: "Kontakt",
    position: new Vector3(60, 0, 0),
    content: "Bereit für den nächsten Schritt?",
    color: "#DC2626"
  }
];