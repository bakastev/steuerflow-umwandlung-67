import * as tf from '@tensorflow/tfjs';
import { UserBehavior, KNOWN_SECTIONS, KnownSection } from '@/types/tracking';

export const useEngagementPrediction = () => {
  const predictEngagement = async (
    behaviorRef: React.RefObject<UserBehavior>,
    scrollSpeedSamples: number[]
  ) => {
    console.log("Starting engagement prediction...");
    console.log("Current behavior state:", behaviorRef.current);
    
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
    const insights: string[] = [];

    console.log("Processing sections...");
    
    (Object.keys(KNOWN_SECTIONS) as KnownSection[]).forEach(sectionId => {
      const dwell = dwellTimes[sectionId] || 0;
      const moves = mouseMovements[sectionId] || 0;
      const selections = textSelections[sectionId] || 0;
      const interactions = elementInteractions[sectionId] || 0;
      
      console.log(`Section ${sectionId} metrics:`, {
        dwell,
        moves,
        selections,
        interactions
      });
      
      // Verbesserte Gewichtung für genauere Engagement-Berechnung
      const engagementScore = (
        (dwell / 8000) * 0.4 +     // 40% Gewichtung, normalisiert auf 8 Sekunden
        (moves / 50) * 0.3 +       // 30% Gewichtung, normalisiert auf 50 Bewegungen
        (selections * 0.2) +       // 20% Gewichtung für Textselektionen
        (interactions / 3) * 0.1   // 10% Gewichtung, normalisiert auf 3 Interaktionen
      );

      sectionEngagement[sectionId] = Math.min(engagementScore, 1);

      console.log(`Section ${sectionId} engagement score:`, engagementScore);

      // Generiere spezifische Insights basierend auf dem Engagement-Level
      if (engagementScore > 0.7) {
        insights.push(`Besonders hohes Interesse am ${KNOWN_SECTIONS[sectionId]}`);
      } else if (engagementScore > 0.4) {
        insights.push(`Erhöhtes Interesse am ${KNOWN_SECTIONS[sectionId]}`);
      } else if (engagementScore > 0.2) {
        insights.push(`Moderates Interesse am ${KNOWN_SECTIONS[sectionId]}`);
      }
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

    console.log("Final engagement score:", score);
    console.log("Generated insights:", insights);

    // Sortiere Insights nach Engagement-Level
    insights.sort((a, b) => {
      const scoreA = a.includes("Besonders") ? 3 : a.includes("Erhöht") ? 2 : 1;
      const scoreB = b.includes("Besonders") ? 3 : b.includes("Erhöht") ? 2 : 1;
      return scoreB - scoreA;
    });

    return { score, insights };
  };

  return { predictEngagement };
};