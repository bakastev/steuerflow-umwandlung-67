import { useRef, useEffect } from 'react';
import { UserBehavior } from '@/types/tracking';
import * as tf from '@tensorflow/tfjs';

export interface VideoEngagementScore {
  immediateShow: boolean;
  delayedShow: boolean;
  expandableShow: boolean;
  score: number;
}

export const useVideoEngagement = (behaviorRef: React.RefObject<UserBehavior>) => {
  const lastPrediction = useRef<VideoEngagementScore>({
    immediateShow: false,
    delayedShow: false,
    expandableShow: false,
    score: 0
  });

  const predictVideoEngagement = async () => {
    const {
      dwellTimes,
      scrollDepth,
      elementInteractions,
      mouseMovements,
    } = behaviorRef.current;

    // Normalisiere die Werte für das ML-Modell
    const dwellTimeInStrategy = dwellTimes['strategy-flow-section'] || 0;
    const normalizedDwellTime = Math.min(dwellTimeInStrategy / 30000, 1);
    const normalizedScrollDepth = scrollDepth / 100;
    const normalizedInteractions = Math.min((elementInteractions['strategy-flow-section'] || 0) / 5, 1);
    const normalizedMouseMovements = Math.min((mouseMovements['strategy-flow-section'] || 0) / 50, 1);

    // Erstelle Tensor für die Vorhersage
    const input = tf.tensor2d([[
      normalizedDwellTime,
      normalizedScrollDepth,
      normalizedInteractions,
      normalizedMouseMovements,
    ]]);

    // Berechne Engagement Score (vereinfachtes Modell)
    const score = tf.tidy(() => {
      const weights = [0.4, 0.2, 0.2, 0.2]; // Gewichtungen für verschiedene Faktoren
      return tf.sum(tf.mul(input, tf.tensor(weights))).dataSync()[0];
    });

    const result = {
      immediateShow: score > 0.8 && dwellTimeInStrategy > 30000,
      delayedShow: score > 0.6 && scrollDepth > 40,
      expandableShow: score > 0.4 && (elementInteractions['strategy-flow-section'] || 0) > 3,
      score
    };

    lastPrediction.current = result;
    return result;
  };

  return {
    predictVideoEngagement,
    lastPrediction
  };
};