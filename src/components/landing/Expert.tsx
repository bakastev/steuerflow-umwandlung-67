import { Award, Briefcase, Users, TrendingUp, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTFTracking } from "@/hooks/useTFTracking";
import { useToast } from "@/hooks/use-toast";

export const Expert = () => {
  const [showExtendedContent, setShowExtendedContent] = useState(false);
  const { behaviorRef, predictEngagement } = useTFTracking();
  const { toast } = useToast();
  
  useEffect(() => {
    const checkEngagement = async () => {
      const expertSection = document.getElementById('expert-section');
      if (!expertSection) return;

      const { dwellTimes, mouseMovements, textSelections } = behaviorRef.current;
      const expertDwellTime = dwellTimes['expert-section'] || 0;
      const expertMouseMoves = mouseMovements['expert-section'] || 0;
      const expertTextSelections = textSelections['expert-section'] || 0;
      
      // Deutlich reduzierte Schwellenwerte
      const isHighlyEngaged = 
        expertDwellTime > 3000 && // Von 8000 auf 3000 ms reduziert (3 Sekunden)
        expertMouseMoves > 5 && // Von 20 auf 5 Bewegungen reduziert
        !showExtendedContent; // Noch nicht erweitert
      
      if (isHighlyEngaged) {
        const result = await predictEngagement();
        if (result.score > 0.2) { // Von 0.4 auf 0.2 reduziert
          setShowExtendedContent(true);
          toast({
            title: "Inhalt personalisiert",
            description: "Wir zeigen Ihnen weitere Details zu Riccardo's Expertise, da Sie sich besonders für seinen Werdegang interessieren.",
          });
        }
      }
    };

    const interval = setInterval(checkEngagement, 1000); // Von 2000 auf 1000 ms reduziert
    return () => clearInterval(interval);
  }, [showExtendedContent, behaviorRef, toast]);

  return (
    <section id="expert-section" className="py-20 bg-primary-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                src="/DSFinanzfreigestelltesBild2.png"
                alt="Ricardo Di Sabatino"
                className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
              />
            </motion.div>
            
            <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-left"
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  Riccardo Di Sabatino
                </h2>
                <h3 className="text-xl text-accent mb-6">
                  Experte für Versicherung & Finanzen
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Seit 2017 führt er seine Agentur und hat es in kürzester Zeit geschafft, zu den führenden Akteuren in Deutschland aufzusteigen.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Sein unermüdlicher Einsatz und sein Streben nach Spitzenleistungen spiegeln sich in den eindrucksvollen Erfolgen wider: Als umsatzstärkste Agentur der Nürnberger Versicherung genießt er höchstes Ansehen in der Branche.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Seine Expertise in der Optimierung von Steuern durch betriebliche Altersvorsorge (bAV) wurde 2023 als wegweisend anerkannt und er erhielt Zertifikate von der Industrie– und Handelskammer (IHK) für sein Fachwissen in verschiedenen Bereichen.
                  </motion.p>

                  <AnimatePresence>
                    {showExtendedContent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6 pt-4"
                      >
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Durch seine innovative Herangehensweise an die betriebliche Altersvorsorge hat Riccardo Di Sabatino neue Maßstäbe in der Branche gesetzt. Seine Strategien zur Steueroptimierung haben bereits hunderten von Unternehmern geholfen, ihre finanziellen Ziele zu erreichen.
                        </motion.p>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div className="bg-primary-light/30 p-4 rounded-lg">
                            <h4 className="text-accent font-semibold mb-2">Expertise-Bereiche</h4>
                            <ul className="space-y-2">
                              <li className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-accent" />
                                <span>Betriebliche Altersvorsorge</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-accent" />
                                <span>Steueroptimierung</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-accent" />
                                <span>Unternehmensberatung</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="bg-primary-light/30 p-4 rounded-lg">
                            <h4 className="text-accent font-semibold mb-2">Auszeichnungen</h4>
                            <ul className="space-y-2">
                              <li className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-accent" />
                                <span>Top-Performer 2023</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Building className="w-4 h-4 text-accent" />
                                <span>Innovator des Jahres</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-accent" />
                                <span>Beste Kundenbetreuung</span>
                              </li>
                            </ul>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="grid grid-cols-2 gap-4 mt-8"
                >
                  <div className="flex items-center gap-3 bg-primary-light/50 p-4 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-accent" />
                    <span className="text-sm text-gray-300">340% Wachstum in 2024</span>
                  </div>
                  <div className="flex items-center gap-3 bg-primary-light/50 p-4 rounded-lg">
                    <Building className="w-6 h-6 text-accent" />
                    <span className="text-sm text-gray-300">Umsatzstärkste Agentur</span>
                  </div>
                  <div className="flex items-center gap-3 bg-primary-light/50 p-4 rounded-lg">
                    <Award className="w-6 h-6 text-accent" />
                    <span className="text-sm text-gray-300">IHK Zertifiziert</span>
                  </div>
                  <div className="flex items-center gap-3 bg-primary-light/50 p-4 rounded-lg">
                    <Award className="w-6 h-6 text-accent" />
                    <span className="text-sm text-gray-300">Branchenführer</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

Lass uns auch die Benefits.tsx Komponente anpassen:

<lov-write file_path="src/components/landing/Benefits.tsx">
import { Euro, TrendingUp, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTFTracking } from "@/hooks/useTFTracking";
import { useToast } from "@/hooks/use-toast";

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
  const [showExtendedBenefits, setShowExtendedBenefits] = useState(false);
  const { behaviorRef, predictEngagement } = useTFTracking();
  const { toast } = useToast();

  useEffect(() => {
    const checkEngagement = async () => {
      const { dwellTimes, mouseMovements } = behaviorRef.current;
      const benefitsDwellTime = dwellTimes['benefits-section'] || 0;
      const benefitsMouseMoves = mouseMovements['benefits-section'] || 0;
      
      // Deutlich reduzierte Schwellenwerte
      const isEngaged = 
        benefitsDwellTime > 2000 && // Nur 2 Sekunden
        benefitsMouseMoves > 3 && // Minimale Mausbewegungen
        !showExtendedBenefits;
      
      if (isEngaged) {
        const result = await predictEngagement();
        if (result.score > 0.15) { // Sehr niedriger Schwellenwert
          setShowExtendedBenefits(true);
          toast({
            title: "Zusätzliche Vorteile",
            description: "Wir haben weitere relevante Vorteile für Sie freigeschaltet.",
          });
        }
      }
    };

    const interval = setInterval(checkEngagement, 1000);
    return () => clearInterval(interval);
  }, [showExtendedBenefits, behaviorRef, toast]);

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

        <AnimatePresence>
          {showExtendedBenefits && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              <div className="backdrop-blur-md bg-white/10 p-8 rounded-lg shadow-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Maximale Steueroptimierung
                </h3>
                <p className="text-gray-300">
                  Durch geschickte Kombination verschiedener Anlagestrategien können Sie 
                  Ihre Steuerlast um bis zu 45% reduzieren.
                </p>
              </div>
              <div className="backdrop-blur-md bg-white/10 p-8 rounded-lg shadow-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Vermögensaufbau mit System
                </h3>
                <p className="text-gray-300">
                  Profitieren Sie von unserem bewährten 3-Stufen-System zur systematischen 
                  Vermögensumwandlung und -optimierung.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};