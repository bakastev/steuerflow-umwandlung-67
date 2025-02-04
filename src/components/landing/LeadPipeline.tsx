import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "Website-Besuch",
    description: "Interessent besucht deine Website",
    highlight: "KI-gestützte Personalisierung"
  },
  {
    title: "Lead-Generierung",
    description: "Conversion durch optimierte Formulare",
    highlight: "Automatische Datenerfassung"
  },
  {
    title: "Lead-Qualifizierung",
    description: "Automatische Lead-Segmentierung",
    highlight: "KI-basiertes Scoring"
  },
  {
    title: "Personalisierte Kommunikation",
    description: "Automatisierte Follow-ups",
    highlight: "Individuelle Ansprache"
  },
  {
    title: "CRM-Integration",
    description: "Nahtlose Systemintegration",
    highlight: "Zentrale Datenverwaltung"
  },
  {
    title: "Abschluss",
    description: "Erfolgreicher Verkaufsabschluss",
    highlight: "Messbare Ergebnisse"
  }
];

// SVG-Pfad für Desktop - angepasst für bessere Verteilung
const desktopPath = "M100,100 C150,100 150,200 200,200 H400 C450,200 450,300 500,300 H700 C750,300 750,400 700,400 H200";

// SVG-Pfad für Mobile - vertikal mit gleichmäßigen Abständen
const mobilePath = "M150,50 C150,150 150,250 150,800";

const StepCard = ({ title, description, highlight, className, progress }: { 
  title: string;
  description: string;
  highlight: string;
  className: string;
  progress: number;
}) => (
  <motion.div 
    className={`absolute ${className}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: progress >= 1 ? 1 : 0,
      scale: progress >= 1 ? 1 : 0.8,
      transition: { duration: 0.5 }
    }}
  >
    <Card className="w-[280px] bg-white/5 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300 mb-2">{description}</p>
        <p className="text-sm text-accent">{highlight}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export const LeadPipeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Desktop Positionen für die Cards - besser verteilt
  const desktopPositions = [
    "left-[50px] top-[50px]",
    "left-[400px] top-[150px]",
    "right-[50px] top-[250px]",
    "left-[50px] top-[350px]",
    "left-[400px] top-[450px]",
    "right-[50px] top-[550px]"
  ];

  // Mobile Positionen für die Cards - gleichmäßig verteilt
  const mobilePositions = [
    "left-[180px] top-[100px]",
    "left-[180px] top-[250px]",
    "left-[180px] top-[400px]",
    "left-[180px] top-[550px]",
    "left-[180px] top-[700px]",
    "left-[180px] top-[850px]"
  ];

  return (
    <section 
      ref={containerRef}
      className="relative h-[300vh]"
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
          
          <div className="relative w-full max-w-[1200px] mx-auto h-[600px] md:h-[800px]">
            {/* SVG Timeline */}
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox={isMobile ? "0 0 300 900" : "0 0 800 600"}
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
              />
            </svg>

            {/* Cards */}
            {steps.map((step, index) => {
              const stepProgress = 6; // Anzahl der Steps
              const stepThreshold = (index + 1) / stepProgress;
              
              return (
                <StepCard
                  key={step.title}
                  {...step}
                  className={isMobile ? mobilePositions[index] : desktopPositions[index]}
                  progress={scrollYProgress.get() / stepThreshold}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};