import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

interface UserBehavior {
  timeOnPage: number;
  scrollDepth: number;
  clicks: number;
}

export const useTFTracking = () => {
  const behaviorRef = useRef<UserBehavior>({
    timeOnPage: 0,
    scrollDepth: 0,
    clicks: 0,
  });

  const startTime = useRef(Date.now());

  useEffect(() => {
    // Scroll-Tracking
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      behaviorRef.current.scrollDepth = Math.max(behaviorRef.current.scrollDepth, scrollPercentage);
    };

    // Click-Tracking
    const handleClick = () => {
      behaviorRef.current.clicks += 1;
    };

    // Zeit-Tracking
    const trackTime = () => {
      behaviorRef.current.timeOnPage = (Date.now() - startTime.current) / 1000;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);
    const timeInterval = setInterval(trackTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      clearInterval(timeInterval);
    };
  }, []);

  // Einfaches ML-Modell für Engagement-Score
  const predictEngagement = async (): Promise<number> => {
    const { timeOnPage, scrollDepth, clicks } = behaviorRef.current;
    
    // Normalisierung der Werte
    const normalizedTime = timeOnPage / 300; // Normalisiert auf 5 Minuten
    const normalizedScroll = scrollDepth / 100;
    const normalizedClicks = clicks / 10;

    // Erstelle ein einfaches neuronales Netz
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 4, inputShape: [3], activation: 'relu' }),
        tf.layers.dense({ units: 1, activation: 'sigmoid' })
      ]
    });

    // Beispielhafte Gewichtung der Faktoren
    const input = tf.tensor2d([[normalizedTime, normalizedScroll, normalizedClicks]]);
    const prediction = model.predict(input) as tf.Tensor;
    const score = await prediction.data();

    return score[0];
  };

  return { behaviorRef, predictEngagement };
};