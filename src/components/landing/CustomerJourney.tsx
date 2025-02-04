import React from "react";
import { Eye, Bot, Target, Star, LineChart, HandshakeIcon } from "lucide-react";

export const CustomerJourney = () => {
  const journeySteps = [
    {
      icon: Eye,
      title: "Website-Besuch",
      description: "Erste Interaktion mit personalisierten Inhalten",
    },
    {
      icon: Bot,
      title: "KI-Analyse",
      description: "Verhaltensanalyse & KI-gestützte Interessenserkennung",
    },
    {
      icon: Target,
      title: "Personalisierung",
      description: "Maßgeschneiderte Inhalte & dynamische Anpassung",
    },
    {
      icon: Star,
      title: "Lead-Qualifizierung",
      description: "Automatische Bewertung & Verhaltens-Scoring",
    },
    {
      icon: LineChart,
      title: "Conversion",
      description: "Gezielte Conversion & personalisierte Angebote",
    },
    {
      icon: HandshakeIcon,
      title: "Abschluss",
      description: "Erfolgreicher Abschluss & automatisierte Nachbetreuung",
    },
  ];

  return (
    <section className="py-24 bg-primary-dark" id="customer-journey">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Ihre Customer Journey
        </h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {journeySteps.slice(0, 3).map((step, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                          hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8 mt-24">
            {journeySteps.slice(3).map((step, index) => (
              <div
                key={index + 3}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                          hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};