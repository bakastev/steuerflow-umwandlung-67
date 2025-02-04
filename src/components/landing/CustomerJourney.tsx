import React, { useRef } from "react";
import { Eye, Bot, Target, Star, LineChart, HandshakeIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export const CustomerJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

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
      icon: Star,
      title: "Lead-Qualifizierung",
      description: "Automatische Bewertung & Verhaltens-Scoring",
    },
    {
      icon: LineChart,
      title: "Conversion",
      description: "Gezielte Conversion & personalisierte Angebote",
    },
    {
      icon: HandshakeIcon,
      title: "Abschluss",
      description: "Erfolgreicher Abschluss & automatisierte Nachbetreuung",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-[100vh] sticky top-0">
      <section className="h-screen flex items-center bg-primary-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Ihre Customer Journey
          </h2>

          <div className="max-w-6xl mx-auto relative">
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
                  style={{
                    pathLength: scrollYProgress
                  }}
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {journeySteps.slice(0, 3).map((step, index) => {
                const cardProgress = useTransform(
                  scrollYProgress,
                  [index * 0.15, index * 0.15 + 0.1],
                  [0, 1]
                );

                return (
                  <motion.div
                    key={index}
                    style={{ opacity: cardProgress }}
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
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
              {[journeySteps[3], journeySteps[4], journeySteps[5]].map((step, index) => {
                const cardProgress = useTransform(
                  scrollYProgress,
                  [0.45 + (2 - index) * 0.15, 0.45 + (2 - index) * 0.15 + 0.1],
                  [0, 1]
                );

                return (
                  <motion.div
                    key={index + 3}
                    style={{ opacity: cardProgress }}
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
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};