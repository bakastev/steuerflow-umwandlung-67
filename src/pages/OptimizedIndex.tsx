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
import { TechStack } from "@/components/landing/TechStack";

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
      {/* KI-Insights Panel */}
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
                  <span className="text-sm text-gray-600 dark:text-gray-300">Personalisierungsgrad</span>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <Hero />
      <TrustBar />
      <Problems />
      <TechStack />
      <StrategyFlow />
      <Solution />
      <Benefits />
      <Expert />
      <Process />
      <Testimonials />
      <section className="py-20 bg-white" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            Jetzt kostenloses Website-Audit sichern
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