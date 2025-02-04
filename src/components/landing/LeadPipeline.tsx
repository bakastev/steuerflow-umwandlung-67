import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MousePointerClick, UserPlus, Filter, MessageSquare, Database, CheckCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

// SVG-Pfad-Koordinaten für die Desktop-Timeline
const desktopPath = "M100,100 C150,100 150,100 200,100 H800 C850,100 850,300 800,300 H200 C150,300 150,500 200,500 H800";

// SVG-Pfad-Koordinaten für die Mobile-Timeline
const mobilePath = "M200,50 L200,800";

export const LeadPipeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      id="lead-pipeline-section" 
      className="relative h-[300vh] md:h-[200vh]" 
      ref={containerRef}
    >
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
            {/* SVG Timeline */}
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox={isMobile ? "0 0 400 850" : "0 0 1000 600"}
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Hintergrund-Pfad */}
              <path
                d={isMobile ? mobilePath : desktopPath}
                stroke="rgba(197, 165, 114, 0.2)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Animierter Pfad */}
              <motion.path
                d={isMobile ? mobilePath : desktopPath}
                stroke="#C5A572"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                style={{
                  pathLength: scrollYProgress
                }}
                initial={{ pathLength: 0 }}
              />
            </svg>

            {/* Timeline Steps */}
            <div className={`relative ${isMobile ? 'pt-16 space-y-32' : 'pt-16'}`}>
              {steps.map((step, index) => {
                const progress = useTransform(
                  scrollYProgress,
                  [index * 0.15, (index + 1) * 0.15],
                  [0, 1]
                );

                if (isMobile) {
                  // Mobile Layout
                  return (
                    <motion.div
                      key={step.title}
                      className="relative ml-[200px] w-[calc(100%-200px)]"
                      style={{
                        opacity: progress,
                        x: useTransform(progress, [0, 1], [-20, 0])
                      }}
                    >
                      {/* Milestone Point */}
                      <div className="absolute left-0 top-1/2 -translate-x-[12px] -translate-y-1/2">
                        <div className="w-6 h-6 bg-accent rounded-full shadow-lg shadow-accent/50">
                          <div className="absolute inset-0 animate-ping bg-accent/50 rounded-full" />
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="ml-8">
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
                }

                // Desktop Layout
                const row = Math.floor(index / 2);
                const isEvenRow = row % 2 === 0;
                
                // Berechne die Position entlang der geschlängelten Linie
                const baseX = isEvenRow 
                  ? 200 + (index % 2) * 600 
                  : 800 - (index % 2) * 600;
                
                const baseY = 100 + row * 200;

                return (
                  <motion.div
                    key={step.title}
                    className="absolute w-72"
                    style={{
                      left: baseX,
                      top: baseY,
                      x: '-50%',
                      opacity: progress,
                      y: useTransform(progress, [0, 1], [20, 0])
                    }}
                  >
                    {/* Milestone Point */}
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-3">
                      <div className="w-6 h-6 bg-accent rounded-full shadow-lg shadow-accent/50">
                        <div className="absolute inset-0 animate-ping bg-accent/50 rounded-full" />
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`relative ${index % 2 === 0 ? 'mt-8' : '-mt-32'}`}>
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
