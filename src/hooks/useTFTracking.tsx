import { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useScrollTracking } from './useScrollTracking';
import { useInteractionTracking } from './useInteractionTracking';
import { useEngagementPrediction } from './useEngagementPrediction';
import { UserBehavior } from '@/types/tracking';

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

  const [currentSection, setCurrentSection] = useState<string>('');
  
  const { scrollSpeedSamples } = useScrollTracking(behaviorRef, setCurrentSection, currentSection);
  useInteractionTracking(behaviorRef);
  const { predictEngagement: predict } = useEngagementPrediction();

  const predictEngagement = async () => {
    return predict(behaviorRef, scrollSpeedSamples.current);
  };

  return { behaviorRef, predictEngagement };
};