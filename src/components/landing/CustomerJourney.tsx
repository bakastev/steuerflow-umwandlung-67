import React from "react";
import { motion } from "framer-motion";
import { Eye, Bot, Target, Star, LineChart, HandshakeIcon } from "lucide-react";

export const CustomerJourney = () => {
  const journeySteps = [
    {
      icon: Eye,
      title: "Website-Besuch",
      description: "Erste Interaktion mit personalisierten Inhalten",
      delay: 0,
    },
    {
      icon: Bot,
      title: "KI-Analyse",
      description: "Verhaltensanalyse & KI-gestützte Interessenserkennung",
      delay: 0.2,
    },
    {
      icon: Target,
      title: "Personalisierung",
      description: "Maßgeschneiderte Inhalte & dynamische Anpassung",
      delay: 0.4,
    },
    {
      icon: Star,
      title: "Lead-Qualifizierung",
      description: "Automatische Bewertung & Verhaltens-Scoring",
      delay: 0.6,
    },
    {
      icon: LineChart,
      title: "Conversion",
      description: "Gezielte Conversion & personalisierte Angebote",
      delay: 0.8,
    },
    {
      icon: HandshakeIcon,
      title: "Abschluss",
      description: "Erfolgreicher Abschluss & automatisierte Nachbetreuung",
      delay: 1,
    },
  ];

  return (
    <section className="py-24 bg-primary-dark overflow-hidden" id="customer-journey">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
        >
          Ihre Customer Journey
        </motion.h2>

        <div className="relative max-w-6xl mx-auto">
          {/* SVG Timeline */}
          <svg
            className="absolute top-0 left-0 w-full h-full -z-10 hidden md:block"
            viewBox="0 0 1200 600"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M100 100 H500 C600 100, 600 300, 700 300 H1100 C1000 300, 1000 500, 900 500 H100"
              stroke="url(#gradient)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="stroke-accent/30"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C5A572" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#C5A572" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#C5A572" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 relative">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: step.delay,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className={`
                  bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                  hover:bg-white/10 transition-colors duration-300
                  ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}
                `}
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