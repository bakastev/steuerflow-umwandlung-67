import React, { useRef } from "react";
import { Eye, Bot, Target, Star, LineChart, HandshakeIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export const CustomerJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  const isMobile = useIsMobile();

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
      icon: Star,
      title: "Lead-Qualifizierung",
      description: "Automatische Bewertung & Verhaltens-Scoring",
    },
    {
      icon: LineChart,
      title: "Gezielte Conversion",
      description: "Gezielte Conversion & personalisierte Angebote",
    },
  ];

  // Für Mobile die letzten drei Elemente in umgekehrter Reihenfolge anzeigen
  const orderedSteps = isMobile 
    ? [...journeySteps.slice(0, 3), ...journeySteps.slice(3).reverse()]
    : journeySteps;

  return (
    <div ref={containerRef} className="min-h-[300vh]">
      <section className="sticky top-[15%] h-screen flex items-start bg-primary-dark">
        <div className="container mx-auto px-4 pt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Ihre Customer Journey
          </h2>

          <div className="max-w-6xl mx-auto relative">
            {/* Timeline Path - Vertikal für Mobile, Horizontal für Desktop */}
            <div className="absolute inset-0 pointer-events-none">
              <svg
                className="w-full h-full"
                viewBox={isMobile ? "0 0 100 600" : "0 0 1200 400"}
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d={isMobile 
                    ? "M50 0 V600" // Vertikale Linie für Mobile
                    : "M100 100 H600 H1100 V300 H600 H100" // Horizontale Linie für Desktop
                  }
                  stroke="#C5A572"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  style={{
                    pathLength: scrollYProgress
                  }}
                />
              </svg>
            </div>

            <div className={`grid ${isMobile ? 'grid-cols-1 gap-12' : 'grid-cols-1 md:grid-cols-3 gap-8'}`}>
              {orderedSteps.map((step, index) => {
                const cardProgress = useTransform(
                  scrollYProgress,
                  [index * (isMobile ? 0.1 : 0.15), index * (isMobile ? 0.1 : 0.15) + (isMobile ? 0.08 : 0.1)],
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
          </div>
        </div>
      </section>
    </div>
  );
};