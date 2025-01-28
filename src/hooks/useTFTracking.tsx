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
    [key: string]: number;
  };
  textSelections: {
    [key: string]: number;
  };
}

// Definiere die bekannten Sektionen und ihre Beschreibungen
const KNOWN_SECTIONS = {
  'expert-section': 'Experten-Profil und Werdegang',
  'problems-section': 'Problemstellungen und Herausforderungen',
  'solution-section': 'Lösungsansätze',
  'process-section': 'Prozessablauf',
  'benefits-section': 'Vorteile und Mehrwert',
  'testimonials-section': 'Kundenstimmen',
  'contact-section': 'Kontaktbereich'
};

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
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight/2 && rect.bottom >= windowHeight/2) {
          const sectionId = section.id;
          if (sectionId !== currentSection && KNOWN_SECTIONS[sectionId as keyof typeof KNOWN_SECTIONS]) {
            setCurrentSection(sectionId);
            updateDwellTime(sectionId);
          }
        }
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const target = document.elementFromPoint(event.clientX, event.clientY);
      if (target) {
        const section = target.closest('section[id]');
        if (section && section.id && KNOWN_SECTIONS[section.id as keyof typeof KNOWN_SECTIONS]) {
          behaviorRef.current.mouseMovements[section.id] = 
            (behaviorRef.current.mouseMovements[section.id] || 0) + 1;
        }
      }
    };

    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        const section = range.commonAncestorContainer.parentElement?.closest('section[id]');
        if (section && section.id && KNOWN_SECTIONS[section.id as keyof typeof KNOWN_SECTIONS]) {
          behaviorRef.current.textSelections[section.id] = 
            (behaviorRef.current.textSelections[section.id] || 0) + 1;
        }
      }
    };

    const handleInteraction = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const section = target.closest('section[id]');
      if (section && section.id && KNOWN_SECTIONS[section.id as keyof typeof KNOWN_SECTIONS]) {
        behaviorRef.current.elementInteractions[section.id] = 
          (behaviorRef.current.elementInteractions[section.id] || 0) + 1;
      }
      
      behaviorRef.current.lastActivity = Date.now();
      behaviorRef.current.clicks += 1;
    };

    const updateDwellTime = (sectionId: string) => {
      if (!KNOWN_SECTIONS[sectionId as keyof typeof KNOWN_SECTIONS]) return;
      
      const currentTime = Date.now();
      const timeSpent = currentTime - behaviorRef.current.lastActivity;
      
      behaviorRef.current.dwellTimes[sectionId] = 
        (behaviorRef.current.dwellTimes[sectionId] || 0) + timeSpent;
      
      behaviorRef.current.lastActivity = currentTime;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('selectionchange', handleTextSelection);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('selectionchange', handleTextSelection);
    };
  }, [currentSection]);

  const predictEngagement = async () => {
    const { 
      timeOnPage, 
      scrollDepth, 
      clicks, 
      elementInteractions, 
      dwellTimes,
      mouseMovements,
      textSelections
    } = behaviorRef.current;
    
    const avgScrollSpeed = scrollSpeedSamples.current.length > 0
      ? scrollSpeedSamples.current.reduce((a, b) => a + b, 0) / scrollSpeedSamples.current.length
      : 0;

    const normalizedTime = Math.min(timeOnPage / 300, 1);
    const normalizedScroll = scrollDepth / 100;
    const normalizedClicks = Math.min(clicks / 20, 1);
    const normalizedScrollSpeed = Math.max(0, 1 - (avgScrollSpeed * 10));

    const sectionEngagement: { [key: string]: number } = {};
    Object.keys(KNOWN_SECTIONS).forEach(sectionId => {
      const dwell = dwellTimes[sectionId] || 0;
      const moves = mouseMovements[sectionId] || 0;
      const selections = textSelections[sectionId] || 0;
      const interactions = elementInteractions[sectionId] || 0;
      
      sectionEngagement[sectionId] = (
        (dwell / 10000) + // 10 Sekunden als Basis
        (moves / 100) +   // 100 Bewegungen als Basis
        (selections * 2) + // Textselektionen werden stark gewichtet
        (interactions / 5) // 5 Interaktionen als Basis
      ) / 4;             // Durchschnitt der normalisierten Werte
    });

    const model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 8, inputShape: [5], activation: 'relu' }),
        tf.layers.dense({ units: 4, activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' })
      ]
    });

    const input = tf.tensor2d([[
      normalizedTime,
      normalizedScroll,
      normalizedClicks,
      normalizedScrollSpeed,
      Object.values(sectionEngagement).reduce((a, b) => Math.max(a, b), 0),
    ]]);

    const prediction = model.predict(input) as tf.Tensor;
    const score = (await prediction.data())[0];

    const insights: string[] = [];
    Object.entries(sectionEngagement)
      .filter(([_, score]) => score > 0.6)
      .forEach(([sectionId, score]) => {
        const sectionName = KNOWN_SECTIONS[sectionId as keyof typeof KNOWN_SECTIONS];
        if (score > 0.8) {
          insights.push(`Besonders hohes Interesse am ${sectionName}`);
        } else {
          insights.push(`Erhöhtes Interesse am ${sectionName}`);
        }
      });

    return { score, insights };
  };

  return { behaviorRef, predictEngagement };
};