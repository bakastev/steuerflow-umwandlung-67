import { useRef, useEffect } from 'react';
import { UserBehavior, KNOWN_SECTIONS, KnownSection } from '@/types/tracking';

export const useScrollTracking = (
  behaviorRef: React.RefObject<UserBehavior>,
  setCurrentSection: (section: string) => void,
  currentSection: string
) => {
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
          const sectionId = section.id as KnownSection;
          if (sectionId !== currentSection && KNOWN_SECTIONS[sectionId]) {
            setCurrentSection(sectionId);
            updateDwellTime(sectionId);
          }
        }
      });
    };

    const updateDwellTime = (sectionId: KnownSection) => {
      if (!KNOWN_SECTIONS[sectionId]) return;
      
      const currentTime = Date.now();
      const timeSpent = currentTime - behaviorRef.current.lastActivity;
      
      behaviorRef.current.dwellTimes[sectionId] = 
        (behaviorRef.current.dwellTimes[sectionId] || 0) + timeSpent;
      
      behaviorRef.current.lastActivity = currentTime;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, behaviorRef, setCurrentSection]);

  return { scrollSpeedSamples };
};