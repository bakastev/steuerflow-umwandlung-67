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

const OptimizedIndex = () => {
  const { predictEngagement } = useTFTracking();
  const { toast } = useToast();
  const [showExtraContent, setShowExtraContent] = useState(false);

  useEffect(() => {
    const checkEngagement = async () => {
      const engagementScore = await predictEngagement();
      
      // Beispiel für personalisierte Anpassungen basierend auf Engagement-Score
      if (engagementScore > 0.7) {
        setShowExtraContent(true);
        toast({
          title: "Personalisierte Empfehlung",
          description: "Basierend auf Ihrem Interesse haben wir zusätzliche relevante Inhalte für Sie.",
        });
      }
    };

    // Prüfe Engagement alle 30 Sekunden
    const interval = setInterval(checkEngagement, 30000);
    return () => clearInterval(interval);
  }, [predictEngagement, toast]);

  return (
    <div className="min-h-screen">
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
              Speziell für Sie ausgewählte Inhalte
            </h2>
            {/* Hier können personalisierte Inhalte eingefügt werden */}
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