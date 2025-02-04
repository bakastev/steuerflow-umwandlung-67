import React from "react";
import { Eye, Bot, Target, Star, LineChart, HandshakeIcon } from "lucide-react";
import { motion } from "framer-motion";

export const CustomerJourney = () => {
  const journeySteps = [
    {
      icon: Eye,
      title: "Website-Besuch",
      description: "Erste Interaktion mit personalisierten Inhalten",
    },
    {
      icon: Bot,
      title: "KI-Analyse",
      description: "Verhaltensanalyse & KI-gestützte Interessenserkennung",
    },
    {
      icon: Target,
      title: "Personalisierung",
      description: "Maßgeschneiderte Inhalte & dynamische Anpassung",
    },
    {
      icon: HandshakeIcon,
      title: "Abschluss",
      description: "Erfolgreicher Abschluss & automatisierte Nachbetreuung",
    },
    {
      icon: LineChart,
      title: "Conversion",
      description: "Gezielte Conversion & personalisierte Angebote",
    },
    {
      icon: Star,
      title: "Lead-Qualifizierung",
      description: "Automatische Bewertung & Verhaltens-Scoring",
    },
  ];

  return (
    <section className="py-24 bg-primary-dark" id="customer-journey">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Ihre Customer Journey
        </h2>

        <div className="sticky top-24 max-w-6xl mx-auto relative min-h-[800px]">
          {/* Timeline Path */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 400"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M100 100 H600 H1100 V300 H600 H100"
                stroke="#C5A572"
                strokeWidth="4"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journeySteps.slice(0, 3).map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                          hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            {[journeySteps[3], journeySteps[5], journeySteps[4]].map((step, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.3 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                          hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};