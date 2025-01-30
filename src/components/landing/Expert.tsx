import { TrendingUp, Building, Award } from "lucide-react";
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
      
      const isHighlyEngaged = 
        expertDwellTime > 2000 && 
        expertMouseMoves > 3 &&   
        !showExtendedContent;
      
      if (isHighlyEngaged) {
        const result = await predictEngagement();
        console.log("Expert section engagement:", {
          dwellTime: expertDwellTime,
          mouseMoves: expertMouseMoves,
          textSelections: expertTextSelections,
          score: result.score
        });
        
        if (result.score > 0.2) {
          setShowExtendedContent(true);
          toast({
            title: "Inhalt personalisiert",
            description: "Wir zeigen Ihnen weitere Details zu Steve's Expertise, da Sie sich besonders für seinen Werdegang interessieren.",
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