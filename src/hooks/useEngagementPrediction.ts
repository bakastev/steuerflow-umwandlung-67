import * as tf from '@tensorflow/tfjs';
import { UserBehavior, KNOWN_SECTIONS, KnownSection } from '@/types/tracking';

export const useEngagementPrediction = () => {
  const predictEngagement = async (
    behaviorRef: React.RefObject<UserBehavior>,
    scrollSpeedSamples: number[]
  ) => {
    const { 
      timeOnPage, 
      scrollDepth, 
      clicks, 
      elementInteractions, 
      dwellTimes,
      mouseMovements,
      textSelections
    } = behaviorRef.current;
    
    const avgScrollSpeed = scrollSpeedSamples.length > 0
      ? scrollSpeedSamples.reduce((a, b) => a + b, 0) / scrollSpeedSamples.length
      : 0;

    const normalizedTime = Math.min(timeOnPage / 300, 1);
    const normalizedScroll = scrollDepth / 100;
    const normalizedClicks = Math.min(clicks / 20, 1);
    const normalizedScrollSpeed = Math.max(0, 1 - (avgScrollSpeed * 10));

    const sectionEngagement: { [key: string]: number } = {};
    (Object.keys(KNOWN_SECTIONS) as KnownSection[]).forEach(sectionId => {
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
        const sectionName = KNOWN_SECTIONS[sectionId as KnownSection];
        if (score > 0.8) {
          insights.push(`Besonders hohes Interesse am ${sectionName}`);
        } else {
          insights.push(`Erhöhtes Interesse am ${sectionName}`);
        }
      });

    return { score, insights };
  };

  return { predictEngagement };
};