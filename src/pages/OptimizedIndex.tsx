import { useEffect, useState } from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/blocks/hero";
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
      
      if (result.score > 0.7) {
        setShowExtraContent(true);
      }

      // Debug-Informationen in der Konsole
      console.log('Engagement Analyse:', {
        score: result.score,
        insights: result.insights
      });
    };

    // Prüfe Engagement alle 15 Sekunden
    const interval = setInterval(checkEngagement, 15000);
    return () => clearInterval(interval);
  }, [predictEngagement]);

  return (
    <div className="min-h-screen">
      {engagementInsights && engagementInsights.score > 0.5 && (
        <div className="fixed bottom-4 right-4 z-50 bg-accent/80 text-primary-dark p-4 rounded-lg shadow-lg backdrop-blur-md">
          <h3 className="font-bold mb-2">Engagement Score: {Math.round(engagementInsights.score * 100)}%</h3>
          <ul className="text-sm">
            {engagementInsights.insights.map((insight, index) => (
              <li key={index} className="mb-1">• {insight}</li>
            ))}
          </ul>
        </div>
      )}

      <Header />
      <Hero />
      <TrustBar />
      <Problems />
      <StrategyFlow />
      <Solution />
      <Benefits />
      
      {showExtraContent && (
        <div className="py-12 bg-primary-dark">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Personalisierte Empfehlungen für Sie
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Basierend auf Ihrem Interesse
                </h3>
                <p className="text-gray-300">
                  Wir haben erkannt, dass Sie sich besonders für unsere Steueroptimierungs-Strategien
                  interessieren. Vereinbaren Sie jetzt ein persönliches Beratungsgespräch.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Maßgeschneiderte Lösungen
                </h3>
                <p className="text-gray-300">
                  Entdecken Sie weitere Möglichkeiten, wie Sie Ihre GmbH steuerlich optimieren können.
                </p>
              </div>
            </div>
          </div>
        </div>
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