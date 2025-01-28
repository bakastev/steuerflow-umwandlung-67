import { useEffect, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { VideoEngagementScore } from '@/hooks/useVideoEngagement';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface PersonalizedVideoProps {
  playbackId: string;
  engagement: VideoEngagementScore;
  className?: string;
}

export const PersonalizedVideo = ({ playbackId, engagement, className }: PersonalizedVideoProps) => {
  const [shouldShow, setShouldShow] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Prüfen auf hohes Engagement (Score > 0.6) und ausreichende Verweilzeit
    if (engagement?.score > 0.6 && engagement?.dwellTimeInStrategyFlow > 3000 && !shouldShow) {
      setShouldShow(true);
      toast({
        title: "Personalisiertes Video verfügbar",
        description: "Basierend auf Ihrem Interesse haben wir ein erklärendes Video für Sie freigeschaltet.",
      });
      
      console.log("Video wird angezeigt", {
        engagement,
        shouldShow,
        dwellTimeInStrategyFlow: engagement.dwellTimeInStrategyFlow,
        score: engagement.score
      });
    }
  }, [engagement, shouldShow, toast]);

  if (!shouldShow) {
    console.log("Video wird nicht angezeigt:", {
      score: engagement?.score,
      dwellTime: engagement?.dwellTimeInStrategyFlow,
      shouldShow
    });
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${className} relative w-full max-w-4xl mx-auto`}
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 to-primary rounded-xl blur-lg" />
        <div className="relative bg-primary-dark/95 backdrop-blur-lg rounded-xl shadow-2xl border border-accent/20 p-4">
          <MuxPlayer
            playbackId={playbackId}
            metadata={{
              video_title: "Geschäftsführerstrategie",
              viewer_user_id: "anonymous"
            }}
            autoPlay={false}
            muted={true}
            style={{
              aspectRatio: "16/9",
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
              borderRadius: "0.75rem",
              overflow: "hidden",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};