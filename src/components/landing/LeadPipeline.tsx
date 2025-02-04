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
    offset: ["start end", "end start"]
  });

  return (
    <section id="lead-pipeline-section" className="relative h-[300vh]" ref={containerRef}>
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
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-0 top-[60px] w-full h-1 bg-accent/30"
              style={{
                scaleX: scrollYProgress
              }}
            />

            {/* Timeline Steps */}
            <div className="relative">
              {steps.map((step, index) => {
                const progress = useTransform(
                  scrollYProgress,
                  [index * 0.15, (index + 1) * 0.15],
                  [0, 1]
                );

                return (
                  <motion.div
                    key={step.title}
                    className={`absolute left-0 w-64 ${
                      index % 2 === 0 ? "-top-24" : "top-12"
                    }`}
                    style={{
                      left: `${(index / (steps.length - 1)) * 100}%`,
                      opacity: progress,
                      y: useTransform(progress, [0, 1], [20, 0])
                    }}
                  >
                    {/* Milestone Point */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full shadow-lg shadow-accent/50">
                      <div className="absolute inset-0 animate-ping bg-accent/50 rounded-full" />
                    </div>

                    {/* Content Card */}
                    <div className="relative mt-8 bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-accent/20">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-accent/20">
                          <step.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-accent mb-1">{step.title}</h3>
                          <p className="text-sm text-white/90 mb-1">{step.description}</p>
                          <p className="text-xs text-accent/80">{step.highlight}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};