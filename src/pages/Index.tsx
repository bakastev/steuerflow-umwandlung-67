import { Hero } from "@/components/landing/Hero";
import { Problems } from "@/components/landing/Problems";
import { Solution } from "@/components/landing/Solution";
import { Process } from "@/components/landing/Process";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Problems />
      <Solution />
      <Process />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;