import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { User, Mail, FileSpreadsheet, MessageSquare, Database, Handshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    title: "Website-Besuch",
    description: "Interessent besucht deine Website",
    highlight: "KI-gestützte Personalisierung",
    icon: User
  },
  {
    title: "Lead-Generierung",
    description: "Conversion durch optimierte Formulare",
    highlight: "Automatische Datenerfassung",
    icon: FileSpreadsheet
  },
  {
    title: "Lead-Qualifizierung",
    description: "Automatische Lead-Segmentierung",
    highlight: "KI-basiertes Scoring",
    icon: Database
  },
  {
    title: "Personalisierte Kommunikation",
    description: "Automatisierte Followduelle Ansprache",
    icon: MessageSquare
  },
  {
    title: "CRM-Integration",
    description: "Nahtlose Systemintegration",
    highlight: "Zentrale Datenverwaltung",
    icon: Mail
  },
  {
    title: "Abschluss",
    description: "Erfolgreicher Verkaufsabschluss",
    highlight: "Messbare Ergebnisse",
    icon: Handshake
  }
];

export const LeadPipeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [path, setPath] = useState<string>("M 0,0 L 0,0");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const pathLength = scrollYProgress;

  useEffect(() => {
    const calculatePath = () => {
      if (!containerRef.current) return;

      const iconPositions = iconRefs.current.map(ref => {
        if (!ref) return null;
        const rect = ref.getBoundingClientRect();
        const container = containerRef.current?.getBoundingClientRect();
        if (!container) return null;
        
        return {
          x: rect.left - container.left + rect.width / 2,
          y: rect.top - container.top + rect.height / 2
        };
      }).filter((pos): pos is { x: number; y: number } => pos !== null);

      if (iconPositions.length === 6) {
        const pathCommands = [
          `M ${iconPositions[0].x},${iconPositions[0].y}`,
          `L ${iconPositions[1].x},${iconPositions[1].y}`,
          `L ${iconPositions[3].x},${iconPositions[3].y}`,
          `L ${iconPositions[2].x},${iconPositions[2].y}`,
          `L ${iconPositions[4].x},${iconPositions[4].y}`,
          `L ${iconPositions[5].x},${iconPositions[5].y}`
        ];
        
        setPath(pathCommands.join(" "));
      }
    };

    // Initial calculation
    calculatePath();
    
    // Recalculate on resize
    window.addEventListener('resize', calculatePath);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', calculatePath);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-24"
      id="lead-pipeline-section"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary-dark to-primary-dark opacity-80" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Automatisierte Lead-Pipeline
          </h2>
          
          <div className="relative max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 gap-8 gap-y-48">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const delay = index * 0.1;
                
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay }}
                    className="relative"
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border-accent/20 h-full">
                      <CardContent className="p-6 flex flex-col items-center text-center h-full">
                        <div 
                          ref={el => iconRefs.current[index] = el}
                          className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4"
                        >
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-300 mb-3">{step.description}</p>
                        <span className="text-sm text-accent mt-auto">{step.highlight}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <svg 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ 
                transform: 'translateZ(0)',
                zIndex: -1
              }}
            >
              <motion.path
                d={path}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-accent"
                style={{
                  pathLength,
                  opacity
                }}
                initial={{ pathLength: 0 }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};