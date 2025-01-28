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
        description: "Basierend auf Ihrem Interesse haben wir ein erklärendes Video für Sie",
        className: "bg-accent text-primary-dark",
      });
    }
  }, [engagement, toast]);

  if (!isVisible) {
    console.log("Video is not visible, engagement conditions not met");
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
          <MuxPlayer
            playbackId={playbackId}
            autoPlay
            muted
            className="w-full aspect-video rounded-lg shadow-lg"
          />
        ) : engagement.delayedShow ? (
          <MuxPlayer
            playbackId={playbackId}
            className="w-full aspect-video rounded-lg shadow-lg"
          />
        ) : (
          <div className="relative">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-4 bg-accent/10 rounded-lg text-accent hover:bg-accent/20 transition-colors"
            >
              Mehr Details im Video erfahren
            </motion.button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <MuxPlayer
                    playbackId={playbackId}
                    className="w-full aspect-video rounded-lg shadow-lg"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};