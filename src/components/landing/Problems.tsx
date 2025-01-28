import { motion, useScroll, useTransform } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useRef } from "react";

const problems = [
  "Ihre Gewinne bleiben in der GmbH gefangen und Sie zahlen unnötig hohe Steuern.",
  "Ihr Steuerberater ist nur ein 'Steuerbegleiter' - ohne proaktive Strategieberatung.",
  "Steuern sind Chefsache, aber Sie haben keine Zeit sich damit zu beschäftigen.",
];

export const Problems = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section className="relative h-[400vh]" ref={containerRef}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-primary-dark">
        {/* Animierter Hintergrund-Verlauf */}
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
            Die größten Herausforderungen für Geschäftsführer
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
                <motion.div
                  key={index}
                  style={{ opacity }}
                  className="absolute flex items-start gap-4 p-8 rounded-lg w-full max-w-2xl
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
                    hover:bg-white/15 transition-all duration-300
                    before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-30"
                >
                  <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-gray-200 text-lg relative z-10">{problem}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};