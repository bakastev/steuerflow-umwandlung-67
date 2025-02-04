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

const desktopPath = "M100,200 C150,200 150,200 200,200 H700 C750,200 750,400 700,400 H200 C150,400 150,600 200,600 H700";
const mobilePath = "M150,100 C150,200 150,350 150,900";

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
      className={`absolute ${className}`}
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

  const desktopPositions = [
    "left-[50px] top-[20px] z-20",
    "left-[400px] top-[20px] z-20",
    "right-[50px] top-[20px] z-20",
    "left-[50px] top-[220px] z-20",
    "left-[400px] top-[220px] z-20",
    "right-[50px] top-[220px] z-20"
  ];

  const mobilePositions = [
    "left-[180px] top-[50px] z-20",
    "left-[180px] top-[200px] z-20",
    "left-[180px] top-[350px] z-20",
    "left-[180px] top-[500px] z-20",
    "left-[180px] top-[650px] z-20",
    "left-[180px] top-[800px] z-20"
  ];

  const desktopDotPositions = [
    { x: 100, y: 200 },
    { x: 400, y: 200 },
    { x: 700, y: 200 },
    { x: 200, y: 400 },
    { x: 400, y: 600 },
    { x: 700, y: 600 }
  ];

  const mobileDotPositions = [
    { x: 150, y: 100 },
    { x: 150, y: 250 },
    { x: 150, y: 400 },
    { x: 150, y: 550 },
    { x: 150, y: 700 },
    { x: 150, y: 850 }
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
          
          <div className="relative w-full max-w-[1200px] mx-auto h-[800px] md:h-[1000px]">
            {/* Cards vor der Timeline rendern */}
            {steps.map((step, index) => (
              <StepCard
                key={step.title}
                {...step}
                className={isMobile ? mobilePositions[index] : desktopPositions[index]}
                progress={cardProgresses[index]}
              />
            ))}

            {/* SVG mit Timeline */}
            <svg
              className="absolute top-0 left-0 w-full h-full z-10"
              viewBox={isMobile ? "0 0 300 1000" : "0 0 800 800"}
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
