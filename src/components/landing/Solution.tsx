import { Check } from "lucide-react";
import { motion } from "framer-motion";

const solutions = [
  {
    title: "KI-gestützte Analyse",
    description: "Automatische Erkennung von Conversion-Barrieren durch künstliche Intelligenz.",
  },
  {
    title: "Personalisierte Optimierung",
    description: "Individuelle Anpassung der Website basierend auf dem Besucherverhalten.",
  },
  {
    title: "Wissenschaftliche Methodik",
    description: "Verkaufspsychologische Prinzipien, die nachweislich zu mehr Conversions führen.",
  },
  {
    title: "Messbare Ergebnisse",
    description: "Transparente Erfolgsmessung durch detailliertes Conversion-Tracking.",
  },
];

export const Solution = () => {
  return (
    <section id="solution-section" className="relative py-20 bg-primary-dark overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary-dark to-primary-dark animate-pulse duration-[4000ms]" />
      </div>
      <div className="container relative mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          Was macht uns einzigartig?
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary-dark" />
                </div>
                <h3 className="text-xl font-semibold text-white">{solution.title}</h3>
              </div>
              <p className="text-gray-300">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
