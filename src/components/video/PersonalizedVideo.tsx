import { useEffect, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { VideoEngagementScore } from '@/hooks/useVideoEngagement';
import { useToast } from '@/hooks/use-toast';

interface PersonalizedVideoProps {
  playbackId: string;
  engagement: VideoEngagementScore;
  className?: string;
}

export const PersonalizedVideo = ({ playbackId, engagement, className }: PersonalizedVideoProps) => {
  const [shouldShow, setShouldShow] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reduzierter Schwellenwert und vereinfachte Bedingung
    if (!shouldShow) {
      setShouldShow(true);
      toast({
        title: "Personalisierte Inhalte",
        description: "Ein erklärendes Video wird für Sie geladen.",
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
    <div className={className}>
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
        }}
      />
    </div>
  );
};