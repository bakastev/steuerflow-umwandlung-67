import { useEffect } from 'react';
import { UserBehavior, KNOWN_SECTIONS, KnownSection } from '@/types/tracking';

export const useInteractionTracking = (behaviorRef: React.RefObject<UserBehavior>) => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const target = document.elementFromPoint(event.clientX, event.clientY);
      if (target) {
        const section = target.closest('section[id]');
        if (section?.id && KNOWN_SECTIONS[section.id as KnownSection]) {
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
        if (section?.id && KNOWN_SECTIONS[section.id as KnownSection]) {
          behaviorRef.current.textSelections[section.id] = 
            (behaviorRef.current.textSelections[section.id] || 0) + 1;
        }
      }
    };

    const handleInteraction = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const section = target.closest('section[id]');
      if (section?.id && KNOWN_SECTIONS[section.id as KnownSection]) {
        behaviorRef.current.elementInteractions[section.id] = 
          (behaviorRef.current.elementInteractions[section.id] || 0) + 1;
      }
      
      behaviorRef.current.lastActivity = Date.now();
      behaviorRef.current.clicks += 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleInteraction);
    document.addEventListener('selectionchange', handleTextSelection);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleInteraction);
      document.removeEventListener('selectionchange', handleTextSelection);
    };
  }, [behaviorRef]);
};