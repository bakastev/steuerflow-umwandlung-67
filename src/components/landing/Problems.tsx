import { AlertCircle } from "lucide-react";

const problems = [
  "Ihre Gewinne bleiben in der GmbH gefangen und Sie zahlen unnötig hohe Steuern.",
  "Ihr Steuerberater ist nur ein 'Steuerbegleiter' - ohne proaktive Strategieberatung.",
  "Steuern sind Chefsache, aber Sie haben keine Zeit sich damit zu beschäftigen.",
  "Lohnsteuer und Sozialversicherungen machen klassische Auszahlungen unattraktiv.",
  "Sie verlieren jeden Monat Geld, weil Sie diese legalen Strategien nicht nutzen.",
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