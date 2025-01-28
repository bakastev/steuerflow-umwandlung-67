import { Check } from "lucide-react";
import { motion } from "framer-motion";

const solutions = [
  {
    title: "Standardisierte Prozesse",
    description: "Erprobte und optimierte Schritte, die Zeit und Aufwand minimieren.",
  },
  {
    title: "Steuerberater-Kommunikation",
    description: "Wir setzen die Strategie mit deinem Steuerberater um, sodass du dich auf dein Business konzentrieren kannst.",
  },
  {
    title: "Klarheit und Transparenz",
    description: "Kein Fachchinesisch – wir erklären dir die Strategie Schritt für Schritt.",
  },
  {
    title: "Langfristige Steueroptimierung",
    description: "Reduziere die größte Kostenposition deines Unternehmens nachhaltig.",
  },
];

export const Solution = () => {
  return (
    <section className="py-20 bg-primary-dark">
      <div className="container mx-auto px-4">
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
              className="p-6 border border-accent/20 rounded-lg bg-white/10 backdrop-blur-md"
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