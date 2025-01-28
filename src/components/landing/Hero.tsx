import { Hero } from "@/components/blocks/hero"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedStats } from "./AnimatedStats";

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
            Wie du es als Geschäftsführer/Gesellschafter einer GmbH es schaffst, dein Betriebsvermögen in Privatvermögen umzuwandeln
            <br />
            <span className="mt-4 block">Leicht, legal und steueroptimiert!</span>
          </>
        }
        actions={[
          {
            label: "Kostenloses Erstgespräch sichern",
            href: "#contact",
            variant: "default"
          }
        ]}
        titleClassName="text-white"
        subtitleClassName="text-gray-200"
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