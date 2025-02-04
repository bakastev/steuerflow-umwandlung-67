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
import { TechStack } from "@/components/landing/TechStack";
import { StrategyFlow } from "@/components/landing/StrategyFlow";
import { AIExperience } from "@/components/landing/AIExperience";
import { CompareHero } from "@/components/landing/CompareHero";
import { CustomerJourney } from "@/components/landing/CustomerJourney";
import { useEffect, useState, useRef } from "react";
import { useTFTracking } from "@/hooks/useTFTracking";
import { EngagementInsights } from "@/types/tracking";

const Index = () => {
  const { predictEngagement, behaviorRef } = useTFTracking();
  const [engagementInsights, setEngagementInsights] = useState<EngagementInsights | null>(null);
  const [engagementProgress, setEngagementProgress] = useState(0);
  const lastUpdateRef = useRef<number>(0);
  const progressHistory = useRef<number[]>([]);

  useEffect(() => {
    const initializeTracking = () => {
      const sections = [
        'expert-section',
        'problems-section',
        'solution-section',
        'process-section',
        'benefits-section',
        'testimonials-section',
        'contact-section',
        'strategy-flow-section',
        'faqs-section'
      ];

      sections.forEach(sectionId => {
        if (!behaviorRef.current.dwellTimes[sectionId]) {
          behaviorRef.current.dwellTimes[sectionId] = 0;
        }
        if (!behaviorRef.current.mouseMovements[sectionId]) {
          behaviorRef.current.mouseMovements[sectionId] = 0;
        }
        if (!behaviorRef.current.textSelections[sectionId]) {
          behaviorRef.current.textSelections[sectionId] = 0;
        }
      });
    };

    const checkEngagement = async () => {
      const now = Date.now();
      if (now - lastUpdateRef.current < 1000) {
        return;
      }

      console.log("Checking engagement on Index page...");
      const result = await predictEngagement();
      console.log("Engagement result:", result);

      progressHistory.current.push(result.score * 100);
      if (progressHistory.current.length > 5) {
        progressHistory.current.shift();
      }
      
      const smoothedProgress = progressHistory.current.reduce((a, b) => a + b, 0) / progressHistory.current.length;
      
      setEngagementInsights(result);
      setEngagementProgress(smoothedProgress);
      lastUpdateRef.current = now;
    };

    initializeTracking();
    checkEngagement();
    const interval = setInterval(checkEngagement, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [predictEngagement, behaviorRef]);

  // Calculate total interaction depth based on mouse movements and dwell times
  const calculateInteractionDepth = () => {
    const totalPossibleInteractions = Object.keys(behaviorRef.current.dwellTimes).length * 100; // Assuming 100 is max per section
    const actualInteractions = Object.values(behaviorRef.current.mouseMovements).reduce((a, b) => a + b, 0);
    return Math.min(actualInteractions / totalPossibleInteractions, 1);
  };

  // Calculate total dwell time across all sections
  const calculateTotalDwellTime = () => {
    return Object.values(behaviorRef.current.dwellTimes).reduce((a, b) => a + b, 0);
  };

  return (
    <div className="min-h-screen bg-primary-dark">
      <Header />
      <Hero />
      <div className="py-12">
        <TrustBar />
      </div>
      <div className="py-24 md:py-32">
        <Problems />
      </div>
      <div className="py-24 md:py-32">
        <CustomerJourney />
      </div>
      <div className="py-24 md:py-32">
        <Benefits />
      </div>
      {engagementInsights && (
        <div className="py-24 md:py-32">
          <AIExperience 
            engagementScore={engagementProgress / 100}
            insights={engagementInsights.insights}
            dwellTime={calculateTotalDwellTime()}
            interactionDepth={calculateInteractionDepth()}
          />
        </div>
      )}
      <div className="py-24 md:py-32">
        <CompareHero />
      </div>
      <div className="py-24 md:py-32">
        <StrategyFlow />
      </div>
      <div className="py-24 md:py-32">
        <TechStack />
      </div>
      <div className="py-24 md:py-32">
        <Solution />
      </div>
      <div className="py-24 md:py-32">
        <Expert />
      </div>
      <div className="py-24 md:py-32">
        <Process />
      </div>
      <div className="py-24 md:py-32">
        <Testimonials />
      </div>
      <section className="py-24 md:py-32 bg-primary-dark" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Jetzt kostenloses Website-Audit sichern
          </h2>
          <MultiStepForm />
        </div>
      </section>
      <div className="py-24 md:py-32">
        <FAQs />
      </div>
      <Footer />
    </div>
  );
};

export default Index;