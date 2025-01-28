import { Euro, TrendingUp, Calculator } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Steuerfreie ETF-Investitionen",
    description: "Nutzen Sie den monatlichen Freibetrag von 644€ für steuerfreie ETF-Anlagen aus Ihrer GmbH.",
    icon: Euro,
  },
  {
    title: "Flexible Investitionsmöglichkeiten",
    description: "Bei GmbHs älter als 3 Jahre: Investieren Sie bis zu 10.000€ monatlich steuerfrei.",
    icon: TrendingUp,
  },
  {
    title: "100% Steuervorteile",
    description: "Alle Investitionen sind als Betriebsausgaben zu 100% steuerlich absetzbar.",
    icon: Calculator,
  },
];

export const Benefits = () => {
  return (
    <section id="benefits-section" className="relative py-20 bg-primary-dark overflow-hidden">
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
          Ihre konkreten Vorteile
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="backdrop-blur-md bg-white/10 p-8 rounded-lg shadow-xl border border-white/20"
            >
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
