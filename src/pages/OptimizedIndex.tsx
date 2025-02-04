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
import { CompareHero } from "@/components/landing/CompareHero";
import { CustomerJourney } from "@/components/landing/CustomerJourney";

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
      <Header />
      <Hero />
      <TrustBar />
      <Problems />
      <Solution />
      <CustomerJourney />
      <Benefits />
      <TechStack />
      <StrategyFlow />
      <CompareHero />
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