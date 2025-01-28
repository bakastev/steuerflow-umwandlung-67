import React, { useEffect, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoEngagementScore } from '@/hooks/useVideoEngagement';

interface PersonalizedVideoProps {
  playbackId: string;
  engagement: VideoEngagementScore;
  className?: string;
}

export const PersonalizedVideo: React.FC<PersonalizedVideoProps> = ({
  playbackId,
  engagement,
  className
}) => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    console.log("Current engagement state:", engagement);
    if (engagement.immediateShow || engagement.delayedShow || engagement.expandableShow) {
      setIsVisible(true);
      toast({
        title: "Personalisierte Inhalte",
        description: "Basierend auf Ihrem Interesse haben wir zusätzliche Informationen für Sie",
        className: "bg-accent text-primary-dark",
      });
    }
  }, [engagement, toast]);

  if (!isVisible) {
    console.log("Personalized content is not visible, engagement conditions not met");
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={className}
      >
        {engagement.immediateShow ? (
          <div className="bg-accent/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Exklusive Strategiedetails</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Basierend auf Ihrem Interesse haben wir detaillierte Informationen zur 
              Vermögensumwandlung für Sie freigeschaltet.
            </p>
          </div>
        ) : engagement.delayedShow ? (
          <div className="bg-accent/5 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Zusätzliche Einblicke</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Entdecken Sie weitere Aspekte unserer Strategie zur optimalen 
              Vermögensumwandlung.
            </p>
          </div>
        ) : (
          <div className="relative">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-4 bg-accent/10 rounded-lg text-accent hover:bg-accent/20 transition-colors"
            >
              Mehr Details zur Strategie
            </motion.button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Hier finden Sie tiefergehende Informationen zu unseren 
                    Strategien der Vermögensumwandlung und steuerlichen Optimierung.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};