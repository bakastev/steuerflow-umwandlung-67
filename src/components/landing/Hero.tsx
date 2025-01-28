import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Geschäftsvermögen in Privatvermögen umwandeln
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Leicht, legal und steueroptimiert!
          </p>
          <h2 className="text-lg md:text-xl mb-12 text-gray-300 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            Warum du als Geschäftsführer zu viel Steuern zahlst und wie wir das ändern – mit der Geschäftsführerstrategie!
          </h2>
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent-light text-primary-dark font-bold px-8 py-6 text-lg animate-fadeIn"
            style={{ animationDelay: "0.6s" }}
          >
            Kostenloses Erstgespräch sichern
          </Button>
        </div>
      </div>
    </section>
  );
};