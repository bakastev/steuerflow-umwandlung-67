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

    // Angepasste Schwellenwerte für realistischere Trigger
    const dwellTimeInStrategy = dwellTimes['strategy-flow-section'] || 0;
    const normalizedDwellTime = Math.min(dwellTimeInStrategy / 15000, 1); // Reduziert von 30000
    const normalizedScrollDepth = scrollDepth / 100;
    const normalizedInteractions = Math.min((elementInteractions['strategy-flow-section'] || 0) / 3, 1);
    const normalizedMouseMovements = Math.min((mouseMovements['strategy-flow-section'] || 0) / 25, 1);

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

    // Angepasste Schwellenwerte für die verschiedenen Anzeigevarianten
    const result = {
      immediateShow: score > 0.6 && dwellTimeInStrategy > 15000, // Reduziert von 0.8 und 30000
      delayedShow: score > 0.4 && scrollDepth > 30, // Reduziert von 0.6 und 40
      expandableShow: score > 0.3 && (elementInteractions['strategy-flow-section'] || 0) > 2, // Reduziert von 0.4 und 3
      score
    };

    console.log("Video engagement prediction:", result);
    lastPrediction.current = result;
    return result;
  };

  return {
    predictVideoEngagement,
    lastPrediction
  };
};