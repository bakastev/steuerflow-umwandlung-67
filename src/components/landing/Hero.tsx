import { Hero } from "@/components/blocks/hero";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedStats } from "./AnimatedStats";
import { Scale, Gavel, DollarSign } from "lucide-react";
import { PersonalizedVideo } from "@/components/video/PersonalizedVideo";
import { useTFTracking } from "@/hooks/useTFTracking";
import { useVideoEngagement } from "@/hooks/useVideoEngagement";

export const HeroComponent = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const { behaviorRef } = useTFTracking();
  const { lastPrediction } = useVideoEngagement(behaviorRef);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <Hero
        title="Geschäftsvermögen in Privatvermögen umwandeln"
        subtitle={
          <>
            Wie du es als Geschäftsführer/Gesellschafter einer GmbH schaffst, dein Betriebsvermögen in Privatvermögen umzuwandeln
            <br />
            <div className="mt-4 flex flex-col sm:flex-row items-start gap-2 sm:gap-4 text-accent text-sm">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                <span>Legal</span>
              </div>
              <div className="flex items-center gap-2">
                <Gavel className="h-4 w-4" />
                <span>Sicher</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Steueroptimiert!</span>
              </div>
            </div>
          </>
        }
        actions={[
          {
            label: "Kostenloses Erstgespräch sichern",
            href: "#contact",
            variant: "default"
          }
        ]}
        titleClassName="text-white text-left"
        subtitleClassName="text-gray-200 text-left"
        actionsClassName="mt-8"
        image="/DSFinanzfreigestelltesBild.png"
      />
      
      <PersonalizedVideo
        playbackId="GZQlEubrnobCOtuod1LmW3dIgCws02yfjl20288aULwFs"
        engagement={lastPrediction.current}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4"
      />
      
      <AnimatedStats />
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary-dark to-primary-dark opacity-80" />
      </motion.div>
    </div>
  );
};

export { HeroComponent as Hero };