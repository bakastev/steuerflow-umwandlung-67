import { motion } from "framer-motion";
import { Brain, Rocket, Target, ChartBar } from "lucide-react";

export const TechStack = () => {
  return (
    <section className="py-20 bg-primary-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
        >
          Technologie-Stack 2025
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-md bg-white/10 p-8 rounded-lg border border-white/20"
          >
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-primary-dark" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">KI-gestützte Optimierung</h3>
            <p className="text-gray-300">
              Selbstlernende Systeme für kontinuierliche Verbesserung der Conversion-Rate
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="backdrop-blur-md bg-white/10 p-8 rounded-lg border border-white/20"
          >
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-primary-dark" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Performance-First</h3>
            <p className="text-gray-300">
              Optimale Core Web Vitals und blitzschnelle Ladezeiten
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="backdrop-blur-md bg-white/10 p-8 rounded-lg border border-white/20"
          >
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary-dark" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Conversion-Tracking</h3>
            <p className="text-gray-300">
              Detaillierte Analyse aller Nutzerinteraktionen
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="backdrop-blur-md bg-white/10 p-8 rounded-lg border border-white/20"
          >
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
              <ChartBar className="w-6 h-6 text-primary-dark" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">ROI-Optimierung</h3>
            <p className="text-gray-300">
              Messbare Ergebnisse und kontinuierliche Verbesserung
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};