import { Award, Briefcase, Users, TrendingUp, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTFTracking } from "@/hooks/useTFTracking";

export const Expert = () => {
  const [showExtendedContent, setShowExtendedContent] = useState(false);
  const { behaviorRef, predictEngagement } = useTFTracking();
  
  useEffect(() => {
    const checkEngagement = async () => {
      const expertSection = document.getElementById('expert-section');
      if (!expertSection) return;

      const { dwellTimes } = behaviorRef.current;
      const expertDwellTime = dwellTimes['expert-section'] || 0;
      
      // Wenn der Nutzer mehr als 10 Sekunden im Bereich verweilt
      if (expertDwellTime > 10000 && !showExtendedContent) {
        const result = await predictEngagement();
        if (result.score > 0.4) {
          setShowExtendedContent(true);
        }
      }
    };

    const interval = setInterval(checkEngagement, 2000);
    return () => clearInterval(interval);
  }, [showExtendedContent, behaviorRef]);

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