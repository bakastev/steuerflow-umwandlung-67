import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const problems = [
  "Ihre Website konvertiert nicht so gut wie sie könnte - Sie verlieren täglich potenzielle Kunden.",
  "A/B Tests und Conversion-Optimierung kosten zu viel Zeit und Ressourcen.",
  "Ihre Website basiert auf Annahmen statt auf wissenschaftlichen Erkenntnissen und Echtzeitdaten.",
];

export const Problems = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="problems-section" className="relative h-[400vh]" ref={containerRef}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary-dark to-primary-dark opacity-80" />
          <motion.div
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Die größten Herausforderungen für B2B Websites
          </h2>
          <div className="relative flex flex-col items-center gap-8 max-w-4xl mx-auto">
            {problems.map((problem, index) => {
              const opacity = useTransform(
                scrollYProgress,
                [
                  index * 0.3,
                  index * 0.3 + 0.1,
                  index * 0.3 + 0.2,
                  index * 0.3 + 0.3
                ],
                [0, 1, 1, 0]
              );

              return (
                <motion.p
                  key={index}
                  style={{ opacity }}
                  className="absolute text-2xl text-center text-accent drop-shadow-[0_0_10px_rgba(197,165,114,0.5)]"
                >
                  {problem}
                </motion.p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};