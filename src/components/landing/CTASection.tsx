import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeIn">
          Bist du bereit, Steuern zur Chefsache zu machen?
        </h2>
        <p className="text-xl mb-8 text-gray-300 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
          Klicke jetzt auf den Button, um dein kostenloses Erstgespräch zu buchen!
        </p>
        <Button 
          size="lg"
          className="bg-accent hover:bg-accent-light text-primary-dark font-bold px-8 py-6 text-lg mb-8 animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
        >
          Kostenloses Erstgespräch sichern
        </Button>
        <div className="flex items-center justify-center gap-2 text-gray-300 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
          <Clock className="w-5 h-5" />
          <p>Wir bieten nur eine begrenzte Anzahl an Terminen pro Monat an. Sichere dir jetzt deinen Platz!</p>
        </div>
      </div>
    </section>
  );
};