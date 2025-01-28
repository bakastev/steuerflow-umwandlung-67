import { Clock, CheckCircle, PhoneCall } from "lucide-react";

const steps = [
  {
    title: "Erstgespräch buchen",
    description: "In nur einer Stunde klären wir Ihre individuelle Situation und zeigen Ihnen Ihre Einsparpotentiale.",
    icon: Clock,
  },
  {
    title: "Strategie entwickeln",
    description: "Wir entwickeln gemeinsam Ihre maßgeschneiderte Geschäftsführerstrategie - einfach und effizient.",
    icon: CheckCircle,
  },
  {
    title: "Schnelle Umsetzung",
    description: "Ein Telefonat und eine E-Mail mit Ihrem Steuerberater genügen meist schon für die Implementierung.",
    icon: PhoneCall,
  },
];

export const Process = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          So einfach geht's
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-accent"></div>
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative flex flex-col md:flex-row items-start mb-12 animate-fadeIn"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center md:w-1/2 md:justify-end md:pr-8">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold z-10">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="w-5 h-5 text-accent" />
                    <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};