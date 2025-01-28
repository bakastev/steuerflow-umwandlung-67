import { Euro, TrendingUp, Calculator } from "lucide-react";

const benefits = [
  {
    title: "Steuerfreie ETF-Investitionen",
    description: "Nutzen Sie den monatlichen Freibetrag von 644€ für steuerfreie ETF-Anlagen aus Ihrer GmbH.",
    icon: Euro,
  },
  {
    title: "Flexible Investitionsmöglichkeiten",
    description: "Bei GmbHs älter als 3 Jahre: Investieren Sie bis zu 10.000€ monatlich steuerfrei.",
    icon: TrendingUp,
  },
  {
    title: "100% Steuervorteile",
    description: "Alle Investitionen sind als Betriebsausgaben zu 100% steuerlich absetzbar.",
    icon: Calculator,
  },
];

export const Benefits = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Ihre konkreten Vorteile
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md animate-fadeIn"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};