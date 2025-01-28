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

    // Deutlich reduzierte Schwellenwerte für Content-Anzeige
    const dwellTimeInStrategy = dwellTimes['strategy-flow-section'] || 0;
    const normalizedDwellTime = Math.min(dwellTimeInStrategy / 5000, 1); // Von 15000 auf 5000 reduziert
    const normalizedScrollDepth = scrollDepth / 100;
    const normalizedInteractions = Math.min((elementInteractions['strategy-flow-section'] || 0) / 2, 1);
    const normalizedMouseMovements = Math.min((mouseMovements['strategy-flow-section'] || 0) / 15, 1);

    const input = tf.tensor2d([[
      normalizedDwellTime,
      normalizedScrollDepth,
      normalizedInteractions,
      normalizedMouseMovements,
    ]]);

    const score = tf.tidy(() => {
      const weights = [0.4, 0.2, 0.2, 0.2];
      return tf.sum(tf.mul(input, tf.tensor(weights))).dataSync()[0];
    });

    // Stark reduzierte Schwellenwerte für frühere Anzeige
    const result = {
      immediateShow: score > 0.3 && dwellTimeInStrategy > 5000,  // Von 0.6 auf 0.3 reduziert
      delayedShow: score > 0.2 && scrollDepth > 20,             // Von 0.4 auf 0.2 reduziert
      expandableShow: score > 0.1 && (elementInteractions['strategy-flow-section'] || 0) > 1, // Von 0.3 auf 0.1 reduziert
      score
    };

    console.log("Content engagement prediction:", result);
    lastPrediction.current = result;
    return result;
  };

  return {
    predictVideoEngagement,
    lastPrediction
  };
};