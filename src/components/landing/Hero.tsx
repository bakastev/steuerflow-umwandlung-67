import { Hero } from "@/components/blocks/hero";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedStats } from "./AnimatedStats";
import { Scale, Gavel, DollarSign } from "lucide-react";

export const HeroComponent = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

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
                <span>Leicht</span>
              </div>
              <div className="flex items-center gap-2">
                <Gavel className="h-4 w-4" />
                <span>legal</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>steueroptimiert!</span>
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

export { HeroComponent as Hero }