import { useEffect, useState } from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { Problems } from "@/components/landing/Problems";
import { Solution } from "@/components/landing/Solution";
import { Benefits } from "@/components/landing/Benefits";
import { Process } from "@/components/landing/Process";
import { Expert } from "@/components/landing/Expert";
import { Testimonials } from "@/components/landing/Testimonials";
import { MultiStepForm } from "@/components/landing/MultiStepForm";
import { FAQs } from "@/components/landing/FAQs";
import { Footer } from "@/components/landing/Footer";
import { StrategyFlow } from "@/components/landing/StrategyFlow";
import { useTFTracking } from "@/hooks/useTFTracking";
import { useToast } from "@/hooks/use-toast";
import { Scale, Gavel, DollarSign, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { EngagementInsights } from "@/types/tracking";

const OptimizedIndex = () => {
  const { predictEngagement, behaviorRef } = useTFTracking();
  const { toast } = useToast();
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [engagementInsights, setEngagementInsights] = useState<EngagementInsights | null>(null);
  const [engagementProgress, setEngagementProgress] = useState(0);

  useEffect(() => {
    const checkEngagement = async () => {
      console.log("Checking engagement...");
      const result = await predictEngagement();
      setEngagementInsights(result);
      setEngagementProgress(result.score * 100);
      
      // Erhöhter Schwellenwert für personalisierte Inhalte
      if (result.score > 0.7 && !showExtraContent) {
        setShowExtraContent(true);
        toast({
          title: "KI-Personalisierung aktiv",
          description: "Basierend auf Ihrem Interesse haben wir zusätzliche Informationen für Sie freigeschaltet.",
          className: "fixed top-4 left-4 z-[100]",
        });
      }
    };

    const interval = setInterval(checkEngagement, 5000);
    return () => clearInterval(interval);
  }, [predictEngagement, showExtraContent, toast]);

  return (
    <div className="min-h-screen">
      {/* KI-Insights Panel mit höherem z-index */}
      <AnimatePresence>
        {engagementInsights && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-4 right-4 z-[90] bg-white/95 dark:bg-primary/95 p-6 rounded-lg shadow-lg backdrop-blur-md max-w-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-accent" />
              <h3 className="font-bold text-lg">KI-Personalisierung</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Engagement Score</span>
                  <span className="font-medium">{Math.round(engagementProgress)}%</span>
                </div>
                <Progress value={engagementProgress} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Erkannte Interessen:</h4>
                <ul className="text-sm space-y-1">
                  {engagementInsights.insights.map((insight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {insight}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                Scroll-Tiefe: {Math.round(behaviorRef.current.scrollDepth)}%
                <br />
                Interaktionen: {behaviorRef.current.clicks}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <Hero />
      <TrustBar />
      <Problems />
      <StrategyFlow />
      <Solution />
      <Benefits />
      
      <AnimatePresence>
        {showExtraContent && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-12 bg-gradient-to-b from-primary-dark to-primary"
          >
            <div className="container mx-auto px-4">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-bold text-white text-center mb-8"
              >
                Personalisierte Empfehlungen für Sie
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 p-6 rounded-lg backdrop-blur-md"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Exklusive Steuerstrategien
                  </h3>
                  <p className="text-gray-300">
                    Basierend auf Ihrem Interesse haben wir erkannt, dass Sie nach fortgeschrittenen
                    Steueroptimierungs-Strategien suchen. Vereinbaren Sie jetzt ein persönliches 
                    Beratungsgespräch für tiefergehende Einblicke.
                  </p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 p-6 rounded-lg backdrop-blur-md"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Maßgeschneiderte Lösungen
                  </h3>
                  <p className="text-gray-300">
                    Entdecken Sie unsere speziell für GmbH-Geschäftsführer entwickelten
                    Vermögensstrategien. Wir zeigen Ihnen, wie Sie Ihr Geschäftsvermögen optimal
                    in Privatvermögen umwandeln können.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Expert />
      <Process />
      <Testimonials />
      <section className="py-20 bg-white" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            Jetzt kostenloses Erstgespräch sichern
          </h2>
          <MultiStepForm />
        </div>
      </section>
      <FAQs />
      <Footer />
    </div>
  );
};

export default OptimizedIndex;