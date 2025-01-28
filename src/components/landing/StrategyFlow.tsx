import { motion } from "framer-motion";
import { Building2, Wallet, ArrowRight, LineChart } from "lucide-react";

export const StrategyFlow = () => {
  const flowItems = [
    {
      icon: Building2,
      label: "GmbH",
      description: "Ihre GmbH als Ausgangspunkt",
      color: "text-blue-500",
    },
    {
      icon: Wallet,
      label: "Geschäftsführer-Strategie",
      description: "Optimierte Auszahlungsstrategie",
      color: "text-green-500",
    },
    {
      icon: LineChart,
      label: "Privates Vermögen",
      description: "Steueroptimierter Vermögensaufbau",
      color: "text-accent",
    },
  ];

  return (
    <section className="py-20 bg-primary-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
        >
          Ihre Geschäftsführer-Strategie
        </motion.h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Verbindungslinien */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-accent/20" />
          
          <div className="relative flex justify-between items-center gap-4">
            {flowItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-4 relative">
                {/* Verbindungspfeil */}
                {index < flowItems.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: "100%" }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="absolute left-full top-12 transform -translate-x-1/2"
                  >
                    <ArrowRight className="w-6 h-6 text-accent" />
                  </motion.div>
                )}
                
                {/* Icon Box */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative z-10 w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm
                    flex items-center justify-center
                    border border-white/20
                    shadow-[0_8px_32px_0_rgba(197,165,114,0.2)]"
                >
                  <item.icon className={`w-10 h-10 ${item.color}`} />
                </motion.div>
                
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                  className="text-center"
                >
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};