import React from "react";
import { motion } from "framer-motion";
import { Building2, ArrowRight, LineChart, Wallet, Cog, PiggyBank, ArrowUpRight } from "lucide-react";

export const StrategyFlow = () => {
const flowItems = [
  {
    icon: Building2,
    label: "Website-Analyse",
    description: "KI-gestützte Analyse",
    subLabel: "Conversion-Tracking",
    color: "text-blue-500",
  },
  {
    icon: LineChart,
    label: "Optimierung",
    description: "Verkaufspsychologie & KI",
    subLabel: "wissenschaftlich fundiert",
    color: "text-green-500",
  },
  {
    icon: Cog,
    label: "Personalisierung",
    description: "Individuelle Anpassung",
    subLabel: "automatisiert",
    color: "text-accent",
    isHighlighted: true,
  },
  {
    icon: PiggyBank,
    label: "Mehr Umsatz",
    description: "Höhere Conversion-Rate",
    color: "text-accent",
  },
];

  return (
    <section id="strategy-flow-section" className="py-20 bg-primary-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
        >
          Ihre Geschäftsführer-Strategie
        </motion.h2>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-accent/20 hidden md:block" />
          
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
            {flowItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-4 relative w-full md:w-auto">
                {index < flowItems.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="absolute left-1/2 md:left-full top-full md:top-12 transform -translate-x-1/2 flex items-center hidden md:flex"
                  >
                    {index === 1 ? (
                      <div className="flex flex-col items-center">
                        <ArrowUpRight className="w-6 h-6 text-accent rotate-45" />
                      </div>
                    ) : (
                      <ArrowRight className="w-6 h-6 text-accent" />
                    )}
                  </motion.div>
                )}
                
                {index < flowItems.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="md:hidden mt-4 mb-4"
                  >
                    <ArrowRight className="w-6 h-6 text-accent rotate-90" />
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative z-10 w-24 h-24 rounded-full 
                    flex items-center justify-center
                    border border-white/20
                    ${item.isHighlighted 
                      ? 'bg-accent/20 shadow-[0_0_32px_0_rgba(197,165,114,0.3)]' 
                      : 'bg-white/10 backdrop-blur-sm'
                    }`}
                >
                  <item.icon className={`w-10 h-10 ${item.color}`} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                  className="text-center max-w-[200px]"
                >
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {item.description}
                  </p>
                  {item.subLabel && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs bg-accent/10 text-accent">
                      {item.subLabel}
                    </span>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};