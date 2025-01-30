import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { Problems } from "@/components/landing/Problems";
import { Solution } from "@/components/landing/Solution";
import { Benefits } from "@/components/landing/Benefits";
import { AIPowerDemo } from "@/components/landing/AIPowerDemo";
import { Process } from "@/components/landing/Process";
import { Expert } from "@/components/landing/Expert";
import { Testimonials } from "@/components/landing/Testimonials";
import { MultiStepForm } from "@/components/landing/MultiStepForm";
import { FAQs } from "@/components/landing/FAQs";
import { Footer } from "@/components/landing/Footer";
import { TechStack } from "@/components/landing/TechStack";
import { StrategyFlow } from "@/components/landing/StrategyFlow";
import { useTFTracking } from "@/hooks/useTFTracking";
import { useEffect, useRef } from "react";
import { KNOWN_SECTIONS } from "@/types/tracking";

const Index = () => {
  const { behaviorRef, predictEngagement } = useTFTracking();
  const trackingInitialized = useRef(false);

  useEffect(() => {
    const initializeTracking = async () => {
      if (trackingInitialized.current) return;
      trackingInitialized.current = true;

      console.log("Initializing TF tracking on index page");
      
      // Initialisiere die Tracking-Referenzen für alle bekannten Sektionen
      Object.keys(KNOWN_SECTIONS).forEach(sectionId => {
        behaviorRef.current.elementInteractions[sectionId] = 0;
        behaviorRef.current.mouseMovements[sectionId] = 0;
        behaviorRef.current.dwellTimes[sectionId] = 0;
        behaviorRef.current.textSelections[sectionId] = 0;
      });

      // Starte das kontinuierliche Tracking
      const trackEngagement = async () => {
        const result = await predictEngagement();
        console.log("Current engagement metrics:", {
          score: result.score,
          interactions: behaviorRef.current.elementInteractions,
          mouseMovements: behaviorRef.current.mouseMovements,
          dwellTimes: behaviorRef.current.dwellTimes,
          textSelections: behaviorRef.current.textSelections,
          scrollDepth: behaviorRef.current.scrollDepth,
          clicks: behaviorRef.current.clicks
        });
      };

      // Aktualisiere das Tracking alle 2 Sekunden
      const interval = setInterval(trackEngagement, 2000);
      return () => clearInterval(interval);
    };

    initializeTracking();
  }, [behaviorRef, predictEngagement]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Problems id="problems-section" />
        <Benefits id="benefits-section" />
        <AIPowerDemo />
        <StrategyFlow />
        <TechStack />
        <Solution id="solution-section" />
        <Expert id="expert-section" />
        <Process id="process-section" />
        <Testimonials id="testimonials-section" />
        <section className="py-20 bg-white" id="contact-section">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
              Jetzt kostenloses Website-Audit sichern
            </h2>
            <MultiStepForm />
          </div>
        </section>
        <FAQs id="faqs-section" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;