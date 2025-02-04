import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eye, Bot, Target, Star, LineChart, HandshakeIcon } from "lucide-react";

export const CustomerJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

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
    <section 
      ref={containerRef}
      className="min-h-[200vh] relative py-24 bg-primary-dark" 
      id="customer-journey"
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container mx-auto px-4">
          <motion.h2
            style={{ opacity }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
          >
            Ihre Customer Journey
          </motion.h2>

          <div className="relative max-w-6xl mx-auto">
            {/* Timeline SVG */}
            <svg 
              className="absolute top-1/2 left-0 w-full h-[200%] -translate-y-1/2 -z-10" 
              viewBox="0 0 1200 600" 
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Hintergrund-Glow */}
              <motion.path
                d="M100 100 H400                    // Von 1 nach rechts zu 2
                   M400 100 H700                    // Von 2 nach rechts zu 3
                   M700 100 H1000                   // Von 3 nach rechts
                   M1000 100 L1000 300             // Gerade nach unten zu 4
                   M1000 300 H700                   // Von 4 nach links zu 5
                   M700 300 H400                    // Von 5 nach links zu 6
                   M400 300 H100"                   // Von 6 nach links
                stroke="rgba(197, 165, 114, 0.2)"
                strokeWidth="20"
                strokeLinecap="round"
                fill="none"
              />
              
              {/* Hauptlinie mit Animation */}
              <motion.path
                d="M100 100 H400                    // Von 1 nach rechts zu 2
                   M400 100 H700                    // Von 2 nach rechts zu 3
                   M700 100 H1000                   // Von 3 nach rechts
                   M1000 100 L1000 300             // Gerade nach unten zu 4
                   M1000 300 H700                   // Von 4 nach links zu 5
                   M700 300 H400                    // Von 5 nach links zu 6
                   M400 300 H100"                   // Von 6 nach links
                stroke="url(#timeline-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                style={{ pathLength }}
              />

              {/* Gradient Definition */}
              <defs>
                <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C5A572" stopOpacity="1" />
                  <stop offset="50%" stopColor="#DEC4A1" stopOpacity="1" />
                  <stop offset="100%" stopColor="#C5A572" stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>

            {/* Journey Steps Grid */}
            <div className="grid grid-cols-3 gap-8 relative z-10">
              {journeySteps.slice(0, 3).map((step, index) => (
                <motion.div
                  key={index}
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [index * 0.15, (index * 0.15) + 0.15],
                      [0, 1]
                    )
                  }}
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

            {/* Zweite Reihe */}
            <div className="grid grid-cols-3 gap-8 relative z-10 mt-24">
              {journeySteps.slice(3).map((step, index) => (
                <motion.div
                  key={index + 3}
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [(index + 3) * 0.15, ((index + 3) * 0.15) + 0.15],
                      [0, 1]
                    )
                  }}
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
      </div>
    </section>
  );
};