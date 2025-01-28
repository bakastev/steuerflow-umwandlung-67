import { AlertCircle } from "lucide-react";

const problems = [
  "Deine Gewinne bleiben in der GmbH gefangen.",
  "Lohnsteuer und Sozialversicherungen machen Auszahlungen unattraktiv.",
  "Steuerberater kümmern sich oft nicht ausreichend um die besten Strategien.",
  "Steuern sind die größte Kostenposition deines Unternehmens, aber du hast keine Zeit, dich intensiv damit zu beschäftigen.",
];

export const Problems = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Die größten Herausforderungen für Geschäftsführer
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md animate-fadeIn"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <p className="text-gray-700">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};