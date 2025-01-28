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
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
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
                  className="absolute flex items-start gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-2xl"
                >
                  <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-gray-700 text-lg">{problem}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};