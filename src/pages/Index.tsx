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
import { useEffect } from "react";

const Index = () => {
  const { behaviorRef, predictEngagement } = useTFTracking();

  useEffect(() => {
    const initializeTracking = async () => {
      console.log("Initializing TF tracking on index page");
      const result = await predictEngagement();
      console.log("Initial engagement prediction:", result);
    };

    initializeTracking();
  }, [predictEngagement]);

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