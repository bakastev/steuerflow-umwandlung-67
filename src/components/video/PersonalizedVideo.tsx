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
    if (engagement?.score > 0.3 && !shouldShow) {
      setShouldShow(true);
      toast({
        title: "Personalisiertes Video",
        description: "Basierend auf Ihrem Interesse haben wir ein erklärendes Video für Sie freigeschaltet.",
        className: "fixed top-4 left-1/2 transform -translate-x-1/2",
      });
      
      console.log("Video wird angezeigt", {
        engagement,
        shouldShow
      });
    }
  }, [engagement, shouldShow, toast]);

  if (!shouldShow) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${className} bg-primary-dark/80 backdrop-blur-lg rounded-xl shadow-2xl border border-accent/20 p-4`}
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 to-primary rounded-xl blur-lg" />
        <div className="relative">
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
              maxWidth: "720px",
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