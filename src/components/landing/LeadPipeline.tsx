import { motion, useScroll, useTransform } from "framer-motion";
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

const desktopPath = "M100,200 L300,200 L500,200 L700,200 L700,400 L500,400 L300,400 L100,400";
const mobilePath = "M150,50 C150,150 150,250 150,800";

interface StepCardProps {
  title: string;
  description: string;
  highlight: string;
  className: string;
  progress: any;
}

interface StepDotProps {
  progress: any;
  position: { x: number; y: number };
}

const StepCard = ({ 
  title, 
  description, 
  highlight, 
  className, 
  progress
}: StepCardProps) => {
  const opacity = useTransform(progress, [0, 0.3, 0.5], [0, 0.5, 1]);
  const scale = useTransform(progress, [0, 0.3, 0.5], [0.8, 0.9, 1]);
  
  return (
    <motion.div 
      className={`absolute ${className} z-20`}
      style={{ 
        opacity,
        scale,
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
};

const StepDot = ({ progress, position }: StepDotProps) => {
  return (
    <motion.circle
      cx={position.x}
      cy={position.y}
      r="6"
      fill="#C5A572"
      style={{
        scale: useTransform(progress, [0, 0.2], [0, 1]),
        opacity: useTransform(progress, [0, 0.2], [0, 1])
      }}
    />
  );
};

export const LeadPipeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"]
  });

  // Angepasste Desktop-Positionen, mittig über den Dots
  const desktopPositions = [
    "left-[0px] top-[50px]",     // Website-Besuch
    "left-[200px] top-[50px]",   // Lead-Generierung
    "left-[400px] top-[50px]",   // Lead-Qualifizierung
    "left-[600px] top-[50px]",   // Personalisierte Kommunikation
    "left-[400px] top-[250px]",  // CRM-Integration
    "left-[200px] top-[250px]"   // Abschluss
  ];

  const mobilePositions = [
    "left-[180px] top-[50px]",
    "left-[180px] top-[200px]",
    "left-[180px] top-[350px]",
    "left-[180px] top-[500px]",
    "left-[180px] top-[650px]",
    "left-[180px] top-[800px]"
  ];

  const desktopDotPositions = [
    { x: 100, y: 200 },  // Website-Besuch
    { x: 300, y: 200 },  // Lead-Generierung
    { x: 500, y: 200 },  // Lead-Qualifizierung
    { x: 700, y: 200 },  // Personalisierte Kommunikation
    { x: 500, y: 400 },  // CRM-Integration
    { x: 300, y: 400 }   // Abschluss
  ];

  const mobileDotPositions = [
    { x: 150, y: 50 },
    { x: 150, y: 200 },
    { x: 150, y: 350 },
    { x: 150, y: 500 },
    { x: 150, y: 650 },
    { x: 150, y: 800 }
  ];

  const cardProgresses = steps.map((_, index) => {
    const start = (index / steps.length) * 0.8;
    const end = Math.min(start + 0.3, 0.8);
    
    return useTransform(
      scrollYProgress,
      [start, end],
      [0, 1]
    );
  });

  return (
    <section 
      ref={containerRef}
      className="relative h-[500vh]"
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
          
          <div className="relative w-full max-w-[1200px] mx-auto h-[600px]">
            {steps.map((step, index) => (
              <StepCard
                key={step.title}
                {...step}
                className={isMobile ? mobilePositions[index] : desktopPositions[index]}
                progress={cardProgresses[index]}
              />
            ))}

            <svg
              className="absolute top-0 left-0 w-full h-full z-10"
              viewBox="0 0 800 600"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d={isMobile ? mobilePath : desktopPath}
                stroke="rgba(197, 165, 114, 0.2)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <motion.path
                d={isMobile ? mobilePath : desktopPath}
                stroke="#C5A572"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                style={{
                  pathLength: useTransform(scrollYProgress, [0, 0.8], [0, 1])
                }}
              />
              {steps.map((_, index) => (
                <StepDot
                  key={index}
                  progress={cardProgresses[index]}
                  position={isMobile ? mobileDotPositions[index] : desktopDotPositions[index]}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};