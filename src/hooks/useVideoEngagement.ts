import { useRef, useEffect } from 'react';
import { UserBehavior } from '@/types/tracking';
import * as tf from '@tensorflow/tfjs';

export interface VideoEngagementScore {
  immediateShow: boolean;
  delayedShow: boolean;
  expandableShow: boolean;
  score: number;
  dwellTimeInStrategyFlow: number;
}

export const useVideoEngagement = (behaviorRef: React.RefObject<UserBehavior>) => {
  const lastPrediction = useRef<VideoEngagementScore>({
    immediateShow: false,
    delayedShow: false,
    expandableShow: false,
    score: 0,
    dwellTimeInStrategyFlow: 0
  });

  const predictVideoEngagement = async () => {
    const {
      dwellTimes,
      scrollDepth,
      elementInteractions,
      mouseMovements,
    } = behaviorRef.current;

    const dwellTimeInStrategyFlow = dwellTimes['strategy-flow-section'] || 0;
    const normalizedDwellTime = Math.min(dwellTimeInStrategyFlow / 5000, 1);
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

    const result = {
      immediateShow: score > 0.3 && dwellTimeInStrategyFlow > 5000,
      delayedShow: score > 0.2 && scrollDepth > 20,
      expandableShow: score > 0.1 && (elementInteractions['strategy-flow-section'] || 0) > 1,
      score,
      dwellTimeInStrategyFlow
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