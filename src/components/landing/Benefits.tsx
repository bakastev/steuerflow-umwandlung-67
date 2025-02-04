import { Brain, ChartBarIcon, Rocket, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTFTracking } from "@/hooks/useTFTracking";
import { useToast } from "@/hooks/use-toast";

const initialBenefits = [
  {
    title: "Automatisierte Lead-Gewinnung",
    description: "Deine Website arbeitet 24/7 für dich und generiert qualifizierte Leads während du dich auf das Wesentliche konzentrierst.",
    icon: Brain,
  },
  {
    title: "Intelligente Conversion-Optimierung",
    description: "KI-gestützte Analyse und automatische Anpassung deiner Website für maximale Performance.",
    icon: ChartBarIcon,
  },
  {
    title: "Effiziente Lead-Bearbeitung",
    description: "Automatisierte Prozesse sparen Zeit und stellen sicher, dass kein wichtiger Lead verloren geht.",
    icon: Rocket,
  },
];

const extendedBenefits = [
  {
    title: "Messbare Ergebnisse",
    description: "Transparente Auswertung aller Kennzahlen und konkrete Conversion-Steigerungen für dein Unternehmen.",
    icon: Target,
  },
  {
    title: "Verkaufspsychologie & KI",
    description: "Wissenschaftlich fundierte Methoden kombiniert mit modernster KI-Technologie für maximale Überzeugungskraft.",
    icon: Brain,
  }
];

export const Benefits = () => {
  const [showExtendedContent, setShowExtendedContent] = useState(false);
  const { behaviorRef, predictEngagement } = useTFTracking();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkEngagement = async () => {
      const benefitsSection = document.getElementById('benefits-section');
      if (!benefitsSection) return;

      const { dwellTimes, mouseMovements } = behaviorRef.current;
      const benefitsDwellTime = dwellTimes['benefits-section'] || 0;
      const benefitsMouseMoves = mouseMovements['benefits-section'] || 0;
      
      // Reduzierte Schwellenwerte für schnellere Personalisierung
      const isHighlyEngaged = 
        benefitsDwellTime > 2000 && // 2 Sekunden
        benefitsMouseMoves > 3 && 
        !showExtendedContent;
      
      if (isHighlyEngaged) {
        const result = await predictEngagement();
        if (result.score > 0.15) { // Reduzierter Schwellenwert
          setShowExtendedContent(true);
          toast({
            title: "Inhalt personalisiert",
            description: "Wir zeigen Ihnen weitere maßgeschneiderte Vorteile basierend auf Ihrem Interesse.",
            className: "fixed top-4 left-1/2 transform -translate-x-1/2 z-[100]",
          });
        }
      }
    };

    const interval = setInterval(checkEngagement, 1000);
    return () => clearInterval(interval);
  }, [showExtendedContent, behaviorRef, toast]);

  return (
    <section id="benefits-section" className="relative py-20 bg-primary-dark overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary-dark to-primary-dark" />
      </div>
      <div className="container relative mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          Deine konkreten Vorteile
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {initialBenefits.map((benefit, index) => (
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

        <AnimatePresence>
          {showExtendedContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {extendedBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="backdrop-blur-md bg-white/10 p-8 rounded-lg shadow-xl border border-white/20"
                >
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary-dark" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};