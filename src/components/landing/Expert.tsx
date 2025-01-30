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
      
      // Schwellenwert reduziert für schnelleres Anzeigen bei Interesse
      const isHighlyEngaged = 
        expertDwellTime > 2000 && // von 3000 auf 2000 reduziert
        expertMouseMoves > 3 &&   // von 5 auf 3 reduziert
        !showExtendedContent;
      
      if (isHighlyEngaged) {
        const result = await predictEngagement();
        console.log("Expert section engagement:", {
          dwellTime: expertDwellTime,
          mouseMoves: expertMouseMoves,
          textSelections: expertTextSelections,
          score: result.score
        });
        
        // Schwellenwert auf 0.2 reduziert für früheres Anzeigen
        if (result.score > 0.2) {
          setShowExtendedContent(true);
          toast({
            title: "Inhalt personalisiert",
            description: "Wir zeigen Ihnen weitere Details zu Riccardo's Expertise, da Sie sich besonders für seinen Werdegang interessieren.",
          });
        }
      }
    };

    const interval = setInterval(checkEngagement, 1000);
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
                src="/Steve_neu_4.jpg"
                alt="Steve Baka"
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
                  Steve Baka
                </h2>
                <h3 className="text-xl text-accent mb-6">
                  Experte für Conversion-Optimierung & Verkaufspsychologie
                </h3>
                
                <div className="space-y-6 text-gray-300">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Seit 2017 revolutioniert er die Art und Weise, wie B2B Unternehmen ihre Online-Präsenz optimieren.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Seine innovative Herangehensweise an Conversion-Optimierung, die KI-gestützte Analysen mit wissenschaftlicher Verkaufspsychologie verbindet, hat bereits hunderten von Unternehmen zu signifikanten Umsatzsteigerungen verholfen.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Seine Expertise in der Optimierung von B2B Websites wurde 2023 mit dem Digital Innovation Award ausgezeichnet, und er ist ein gefragter Sprecher auf internationalen Marketing-Konferenzen.
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
                    <span className="text-sm text-gray-300">+340% Conversion-Rate</span>
                  </div>
                  <div className="flex items-center gap-3 bg-primary-light/50 p-4 rounded-lg">
                    <Building className="w-6 h-6 text-accent" />
                    <span className="text-sm text-gray-300">500+ Kunden</span>
                  </div>
                  <div className="flex items-center gap-3 bg-primary-light/50 p-4 rounded-lg">
                    <Award className="w-6 h-6 text-accent" />
                    <span className="text-sm text-gray-300">Digital Innovation Award</span>
                  </div>
                  <div className="flex items-center gap-3 bg-primary-light/50 p-4 rounded-lg">
                    <Award className="w-6 h-6 text-accent" />
                    <span className="text-sm text-gray-300">Top CRO Expert 2023</span>
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
