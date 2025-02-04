import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MousePointerClick, UserPlus, Filter, MessageSquare, Database, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    title: "Website-Besuch",
    description: "Interessent besucht deine Website",
    highlight: "KI-gestützte Personalisierung"
  },
  {
    icon: UserPlus,
    title: "Lead-Generierung",
    description: "Conversion durch optimierte Formulare",
    highlight: "Automatische Datenerfassung"
  },
  {
    icon: Filter,
    title: "Lead-Qualifizierung",
    description: "Automatische Lead-Segmentierung",
    highlight: "KI-basiertes Scoring"
  },
  {
    icon: MessageSquare,
    title: "Personalisierte Kommunikation",
    description: "Automatisierte Follow-ups",
    highlight: "Individuelle Ansprache"
  },
  {
    icon: Database,
    title: "CRM-Integration",
    description: "Nahtlose Systemintegration",
    highlight: "Zentrale Datenverwaltung"
  },
  {
    icon: CheckCircle,
    title: "Abschluss",
    description: "Erfolgreicher Verkaufsabschluss",
    highlight: "Messbare Ergebnisse"
  }
];

export const LeadPipeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="lead-pipeline-section" className="relative h-[400vh]" ref={containerRef}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary-dark to-primary-dark opacity-80" />
          <motion.div
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Automatisierte Lead-Pipeline
          </h2>
          <div className="relative flex flex-col items-center gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const opacity = useTransform(
                scrollYProgress,
                [
                  index * 0.15,
                  index * 0.15 + 0.05,
                  index * 0.15 + 0.1,
                  index * 0.15 + 0.15
                ],
                [0, 1, 1, 0]
              );

              const x = useTransform(
                scrollYProgress,
                [
                  index * 0.15,
                  index * 0.15 + 0.05,
                  index * 0.15 + 0.1,
                  index * 0.15 + 0.15
                ],
                [100, 0, 0, -100]
              );

              return (
                <motion.div
                  key={index}
                  style={{ opacity, x }}
                  className="absolute w-full max-w-xl bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-accent/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-accent/20">
                      <step.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-accent mb-2">{step.title}</h3>
                      <p className="text-white/90 mb-2">{step.description}</p>
                      <p className="text-accent/80 text-sm">{step.highlight}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};