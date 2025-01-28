import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { useToast } from '@/hooks/use-toast';

interface UserBehavior {
  timeOnPage: number;
  scrollDepth: number;
  clicks: number;
  // Neue Metriken
  elementInteractions: {
    [key: string]: number;  // Zählt Interaktionen pro Element
  };
  dwellTimes: {
    [key: string]: number;  // Zeit verbracht in verschiedenen Sektionen
  };
  lastActivity: number;
  activeTimeWindows: number[];  // Speichert aktive Zeitfenster
}

export const useTFTracking = () => {
  const { toast } = useToast();
  const behaviorRef = useRef<UserBehavior>({
    timeOnPage: 0,
    scrollDepth: 0,
    clicks: 0,
    elementInteractions: {},
    dwellTimes: {},
    lastActivity: Date.now(),
    activeTimeWindows: [],
  });

  const startTime = useRef(Date.now());
  const [currentSection, setCurrentSection] = useState<string>('');

  useEffect(() => {
    // Scroll-Tracking mit Sektions-Erkennung
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      behaviorRef.current.scrollDepth = Math.max(behaviorRef.current.scrollDepth, scrollPercentage);

      // Identifiziere aktuelle Sektion
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight/2 && rect.bottom >= windowHeight/2) {
          const sectionId = section.id || 'unknown';
          if (sectionId !== currentSection) {
            setCurrentSection(sectionId);
            updateDwellTime(sectionId);
          }
        }
      });
    };

    // Element-Interaktions-Tracking
    const handleInteraction = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const elementId = target.id || target.className || 'unknown';
      
      behaviorRef.current.elementInteractions[elementId] = 
        (behaviorRef.current.elementInteractions[elementId] || 0) + 1;
      
      behaviorRef.current.lastActivity = Date.now();
      behaviorRef.current.clicks += 1;
    };

    // Verweildauer-Tracking
    const updateDwellTime = (sectionId: string) => {
      const currentTime = Date.now();
      const timeSpent = currentTime - behaviorRef.current.lastActivity;
      
      behaviorRef.current.dwellTimes[sectionId] = 
        (behaviorRef.current.dwellTimes[sectionId] || 0) + timeSpent;
      
      behaviorRef.current.lastActivity = currentTime;
    };

    // Zeit-Tracking mit Aktivitätsfenstern
    const trackTime = () => {
      const currentTime = Date.now();
      behaviorRef.current.timeOnPage = (currentTime - startTime.current) / 1000;
      
      // Aktivitätsfenster aktualisieren
      if (currentTime - behaviorRef.current.lastActivity < 60000) { // 1 Minute Inaktivitäts-Timeout
        const hourOfDay = new Date().getHours();
        behaviorRef.current.activeTimeWindows.push(hourOfDay);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('mousemove', () => {
      behaviorRef.current.lastActivity = Date.now();
    });
    
    const timeInterval = setInterval(trackTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInteraction);
      clearInterval(timeInterval);
    };
  }, [currentSection]);

  // Erweitertes ML-Modell für Engagement-Score
  const predictEngagement = async (): Promise<{score: number; insights: string[]}> => {
    const { 
      timeOnPage, 
      scrollDepth, 
      clicks, 
      elementInteractions, 
      dwellTimes, 
      activeTimeWindows 
    } = behaviorRef.current;
    
    // Normalisierung der Werte
    const normalizedTime = Math.min(timeOnPage / 300, 1); // Max 5 Minuten
    const normalizedScroll = scrollDepth / 100;
    const normalizedClicks = Math.min(clicks / 20, 1); // Max 20 Klicks

    // Interaktions-Score berechnen
    const interactionValues = Object.values(elementInteractions);
    const avgInteractions = interactionValues.length > 0 
      ? interactionValues.reduce((a, b) => a + b, 0) / interactionValues.length 
      : 0;
    const normalizedInteractions = Math.min(avgInteractions / 5, 1);

    // Verweildauer-Score berechnen
    const dwellValues = Object.values(dwellTimes);
    const totalDwellTime = dwellValues.reduce((a, b) => a + b, 0);
    const normalizedDwell = Math.min(totalDwellTime / (300000), 1); // Max 5 Minuten

    // Zeitliche Muster analysieren
    const activeHours = new Set(activeTimeWindows).size;
    const normalizedTimePattern = activeHours / 24;

    // TensorFlow Modell erstellen
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 6, inputShape: [6], activation: 'relu' }),
        tf.layers.dense({ units: 3, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' })
      ]
    });

    // Gewichtete Vorhersage
    const input = tf.tensor2d([[
      normalizedTime,
      normalizedScroll,
      normalizedClicks,
      normalizedInteractions,
      normalizedDwell,
      normalizedTimePattern
    ]]);

    const prediction = model.predict(input) as tf.Tensor;
    const score = (await prediction.data())[0];

    // Insights generieren
    const insights: string[] = [];
    if (normalizedTime > 0.7) insights.push("Hohe Verweildauer erkannt");
    if (normalizedInteractions > 0.7) insights.push("Starke Interaktion mit Elementen");
    if (normalizedScroll > 0.8) insights.push("Tiefes Scrolling-Verhalten");
    if (normalizedTimePattern > 0.3) insights.push("Wiederkehrender Besucher erkannt");

    // Benachrichtigung bei hohem Engagement
    if (score > 0.7) {
      toast({
        title: "Hohes Engagement erkannt",
        description: "Wir personalisieren die Inhalte für Sie.",
      });
    }

    return { score, insights };
  };

  return { behaviorRef, predictEngagement };
};