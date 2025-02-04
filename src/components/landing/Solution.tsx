import { Check } from "lucide-react";
import { motion } from "framer-motion";

const solutions = [
  {
    title: "KI-gestützte Analyse",
    description: "Automatische Erkennung von Conversion-Barrieren durch künstliche Intelligenz auf deiner Website.",
  },
  {
    title: "Personalisierte Optimierung",
    description: "Individuelle Anpassung deiner Website basierend auf dem Besucherverhalten.",
  },
  {
    title: "Wissenschaftliche Methodik",
    description: "Verkaufspsychologische Prinzipien, die nachweislich zu mehr Conversions auf deiner Website führen.",
  },
  {
    title: "Messbare Ergebnisse",
    description: "Transparente Erfolgsmessung durch detailliertes Conversion-Tracking deiner Website.",
  },
];

export const Solution = () => {
  return (
    <section id="solution-section" className="relative py-24 md:py-28 bg-primary-dark overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary-dark to-primary-dark animate-pulse duration-[4000ms]" />
      </div>
      <div className="container relative mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 md:mb-20 text-white"
        >
          Was macht uns einzigartig?
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-8 md:p-10 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary-dark" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white">{solution.title}</h3>
              </div>
              <p className="text-gray-300 text-lg">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};