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
          
          <div className="relative max-w-5xl mx-auto">
            {/* SVG Path für die geschlängelte Linie */}
            <svg
              className="absolute top-0 left-0 w-full h-[600px]"
              viewBox="0 0 1000 600"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Hintergrund-Pfad */}
              <path
                d="M100,100 H900 C950,100 950,300 900,300 H100 C50,300 50,500 100,500 H900"
                stroke="rgba(197, 165, 114, 0.2)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Animierter Pfad */}
              <motion.path
                d="M100,100 H900 C950,100 950,300 900,300 H100 C50,300 50,500 100,500 H900"
                stroke="#C5A572"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress
                }}
                initial={{ pathLength: 0 }}
              />
            </svg>

            {/* Timeline Steps */}
            <div className="relative pt-16">
              {steps.map((step, index) => {
                const row = Math.floor(index / 2);
                const isEvenRow = row % 2 === 0;
                const isLastInRow = index % 2 === 1;
                
                // Berechne die horizontale Position basierend auf der Reihe
                const xPos = isEvenRow 
                  ? (index % 2) * 100 
                  : 100 - ((index % 2) * 100);
                
                // Berechne die vertikale Position
                const yPos = row * 200;

                const progress = useTransform(
                  scrollYProgress,
                  [index * 0.15, (index + 1) * 0.15],
                  [0, 1]
                );

                return (
                  <motion.div
                    key={step.title}
                    className="absolute w-72"
                    style={{
                      left: `${xPos}%`,
                      top: yPos,
                      x: isEvenRow ? '-50%' : '-50%',
                      opacity: progress,
                      y: useTransform(progress, [0, 1], [20, 0])
                    }}
                  >
                    {/* Milestone Point */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-accent rounded-full shadow-lg shadow-accent/50">
                      <div className="absolute inset-0 animate-ping bg-accent/50 rounded-full" />
                    </div>

                    {/* Content Card */}
                    <div className={`relative mt-8 ${index % 2 === 0 ? 'mt-8' : '-mt-32'}`}>
                      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-accent/20">
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