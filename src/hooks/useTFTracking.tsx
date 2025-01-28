import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { useToast } from '@/hooks/use-toast';

interface UserBehavior {
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
    [key: string]: number;  // Tracking der Mausbewegungen pro Sektion
  };
  textSelections: {
    [key: string]: number;  // Tracking von Textselektionen pro Sektion
  };
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
    mouseMovements: {},
    textSelections: {},
  });

  const startTime = useRef(Date.now());
  const [currentSection, setCurrentSection] = useState<string>('');
  const lastScrollPosition = useRef(0);
  const scrollSpeedSamples = useRef<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentPosition = window.scrollY;
      const timeDiff = currentTime - behaviorRef.current.lastActivity;
      const scrollDiff = Math.abs(currentPosition - lastScrollPosition.current);
      
      if (timeDiff > 0) {
        const scrollSpeed = scrollDiff / timeDiff;
        scrollSpeedSamples.current.push(scrollSpeed);
        
        // Nur die letzten 10 Samples behalten
        if (scrollSpeedSamples.current.length > 10) {
          scrollSpeedSamples.current.shift();
        }
      }
      
      lastScrollPosition.current = currentPosition;
      
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

    const handleMouseMove = (event: MouseEvent) => {
      const target = document.elementFromPoint(event.clientX, event.clientY);
      if (target) {
        const section = target.closest('section');
        if (section) {
          const sectionId = section.id || 'unknown';
          behaviorRef.current.mouseMovements[sectionId] = 
            (behaviorRef.current.mouseMovements[sectionId] || 0) + 1;
        }
      }
    };

    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        const section = range.commonAncestorContainer.parentElement?.closest('section');
        if (section) {
          const sectionId = section.id || 'unknown';
          behaviorRef.current.textSelections[sectionId] = 
            (behaviorRef.current.textSelections[sectionId] || 0) + 1;
        }
      }
    };

    const handleInteraction = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const elementId = target.id || target.className || 'unknown';
      
      behaviorRef.current.elementInteractions[elementId] = 
        (behaviorRef.current.elementInteractions[elementId] || 0) + 1;
      
      behaviorRef.current.lastActivity = Date.now();
      behaviorRef.current.clicks += 1;
    };

    const updateDwellTime = (sectionId: string) => {
      const currentTime = Date.now();
      const timeSpent = currentTime - behaviorRef.current.lastActivity;
      
      behaviorRef.current.dwellTimes[sectionId] = 
        (behaviorRef.current.dwellTimes[sectionId] || 0) + timeSpent;
      
      behaviorRef.current.lastActivity = currentTime;
    };

    const trackTime = () => {
      const currentTime = Date.now();
      behaviorRef.current.timeOnPage = (currentTime - startTime.current) / 1000;
      
      if (currentTime - behaviorRef.current.lastActivity < 60000) {
        const hourOfDay = new Date().getHours();
        behaviorRef.current.activeTimeWindows.push(hourOfDay);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('selectionchange', handleTextSelection);
    
    const timeInterval = setInterval(trackTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('selectionchange', handleTextSelection);
      clearInterval(timeInterval);
    };
  }, [currentSection]);

  const predictEngagement = async (): Promise<{score: number; insights: string[]}> => {
    const { 
      timeOnPage, 
      scrollDepth, 
      clicks, 
      elementInteractions, 
      dwellTimes, 
      activeTimeWindows,
      mouseMovements,
      textSelections
    } = behaviorRef.current;
    
    // Durchschnittliche Scroll-Geschwindigkeit berechnen
    const avgScrollSpeed = scrollSpeedSamples.current.length > 0
      ? scrollSpeedSamples.current.reduce((a, b) => a + b, 0) / scrollSpeedSamples.current.length
      : 0;

    // Normalisierung der Werte
    const normalizedTime = Math.min(timeOnPage / 300, 1);
    const normalizedScroll = scrollDepth / 100;
    const normalizedClicks = Math.min(clicks / 20, 1);
    const normalizedScrollSpeed = Math.max(0, 1 - (avgScrollSpeed * 10)); // Langsames Scrollen = hoher Wert

    // Interaktions-Score
    const interactionValues = Object.values(elementInteractions);
    const avgInteractions = interactionValues.length > 0 
      ? interactionValues.reduce((a, b) => a + b, 0) / interactionValues.length 
      : 0;
    const normalizedInteractions = Math.min(avgInteractions / 5, 1);

    // Mausbewegungen und Textselektionen pro Sektion
    const sectionEngagement: { [key: string]: number } = {};
    Object.keys(dwellTimes).forEach(sectionId => {
      const dwell = dwellTimes[sectionId] || 0;
      const moves = mouseMovements[sectionId] || 0;
      const selections = textSelections[sectionId] || 0;
      
      sectionEngagement[sectionId] = (
        (dwell / 10000) + // 10 Sekunden als Basis
        (moves / 100) +   // 100 Bewegungen als Basis
        (selections * 2)  // Textselektionen werden stark gewichtet
      ) / 3;             // Durchschnitt der normalisierten Werte
    });

    // Insights generieren basierend auf Sektions-Engagement
    const insights: string[] = [];
    Object.entries(sectionEngagement).forEach(([sectionId, score]) => {
      if (score > 0.6) {
        switch(sectionId) {
          case 'expert-section':
            insights.push("Starkes Interesse an der Expertise und dem Werdegang");
            break;
          case 'problems-section':
            insights.push("Intensive Auseinandersetzung mit Problemstellungen");
            break;
          case 'solution-section':
            insights.push("Hohe Aufmerksamkeit für Lösungsansätze");
            break;
          default:
            if (score > 0.8) {
              insights.push(`Besonders hohes Engagement in ${sectionId}`);
            }
        }
      }
    });

    // TensorFlow Modell
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 8, inputShape: [8], activation: 'relu' }),
        tf.layers.dense({ units: 4, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' })
      ]
    });

    const input = tf.tensor2d([[
      normalizedTime,
      normalizedScroll,
      normalizedClicks,
      normalizedInteractions,
      normalizedScrollSpeed,
      Object.values(sectionEngagement).reduce((a, b) => Math.max(a, b), 0), // Höchstes Sektions-Engagement
      Object.values(mouseMovements).length / 10, // Normalisierte Anzahl der Sektionen mit Mausbewegungen
      Object.values(textSelections).reduce((a, b) => a + b, 0) / 5 // Normalisierte Gesamtanzahl der Textselektionen
    ]]);

    const prediction = model.predict(input) as tf.Tensor;
    const score = (await prediction.data())[0];

    if (score > 0.7) {
      toast({
        title: "Hohes Interesse erkannt",
        description: "Wir zeigen Ihnen weitere relevante Informationen.",
      });
    }

    return { score, insights };
  };

  return { behaviorRef, predictEngagement };
};