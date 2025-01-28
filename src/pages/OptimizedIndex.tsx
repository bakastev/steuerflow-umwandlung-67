import { useEffect, useState } from "react";
import { Header } from "@/components/landing/Header";
import { Hero as HeroComponent } from "@/components/landing/Hero"; // Korrekter Import für die Landing Hero Komponente
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
import { Scale, Gavel, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface EngagementInsights {
  score: number;
  insights: string[];
}

const OptimizedIndex = () => {
  const { predictEngagement } = useTFTracking();
  const { toast } = useToast();
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [engagementInsights, setEngagementInsights] = useState<EngagementInsights | null>(null);

  useEffect(() => {
    const checkEngagement = async () => {
      const result = await predictEngagement();
      setEngagementInsights(result);
      
      if (result.score > 0.4) {
        setShowExtraContent(true);
        toast({
          title: "Personalisierte Inhalte verfügbar",
          description: "Basierend auf Ihrem Interesse haben wir zusätzliche Informationen für Sie freigeschaltet.",
        });
      }
    };

    const interval = setInterval(checkEngagement, 15000);
    return () => clearInterval(interval);
  }, [predictEngagement, toast]);

  return (
    <div className="min-h-screen">
      {engagementInsights && (
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-4 right-4 z-50 bg-accent/90 text-primary-dark p-4 rounded-lg shadow-lg backdrop-blur-md"
        >
          <h3 className="font-bold mb-2">Engagement Score: {Math.round(engagementInsights.score * 100)}%</h3>
          <ul className="text-sm">
            {engagementInsights.insights.map((insight, index) => (
              <li key={index} className="mb-1">• {insight}</li>
            ))}
          </ul>
        </motion.div>
      )}

      <Header />
      <HeroComponent />
      <TrustBar />
      <Problems />
      <StrategyFlow />
      <Solution />
      <Benefits />
      
      {showExtraContent && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 bg-primary-dark"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Personalisierte Empfehlungen für Sie
            </h2>
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