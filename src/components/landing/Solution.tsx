import { Check } from "lucide-react";

const solutions = [
  {
    title: "Standardisierte Prozesse",
    description: "Erprobte und optimierte Schritte, die Zeit und Aufwand minimieren.",
  },
  {
    title: "Steuerberater-Kommunikation",
    description: "Wir setzen die Strategie mit deinem Steuerberater um, sodass du dich auf dein Business konzentrieren kannst.",
  },
  {
    title: "Klarheit und Transparenz",
    description: "Kein Fachchinesisch – wir erklären dir die Strategie Schritt für Schritt.",
  },
  {
    title: "Langfristige Steueroptimierung",
    description: "Reduziere die größte Kostenposition deines Unternehmens nachhaltig.",
  },
];

export const Solution = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Was macht uns einzigartig?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="p-6 border border-gray-200 rounded-lg animate-fadeIn"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary">{solution.title}</h3>
              </div>
              <p className="text-gray-600">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};