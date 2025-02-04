import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { User, Mail, FileSpreadsheet, MessageSquare, Database, Handshake } from "lucide-react";

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
    description: "Automatisierte Follow-ups",
    highlight: "Individuelle Ansprache",
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

const desktopPath = "M100,100 C150,100 150,100 200,100 H700 C750,100 750,300 700,300 H200 C150,300 150,500 200,500 H700";
const mobilePath = "M150,50 C150,150 150,250 150,800";

interface StepContentProps {
  title: string;
  description: string;
  highlight: string;
  icon: any;
  dotPosition: { x: number; y: number };
  progress: any;
}

interface StepDotProps {
  progress: any;
  position: { x: number; y: number };
  icon: any;
}

const StepContent = ({ 
  title, 
  description, 
  highlight,
  icon: Icon,
  dotPosition,
  progress
}: StepContentProps) => {
  const opacity = useTransform(progress, [0, 0.1, 0.3], [0, 0, 1]);
  const scale = useTransform(progress, [0, 0.1, 0.3], [0.8, 0.8, 1]);
  
  return (
    <motion.div 
      className="absolute z-20 flex flex-col items-center text-center"
      style={{ 
        opacity,
        scale,
        left: `${dotPosition.x}px`,
        top: `${dotPosition.y - 100}px`,
        transform: 'translateX(-50%)'
      }}
    >
      <Icon className="w-6 h-6 text-accent mb-2" />
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-300 mb-1 max-w-[200px]">{description}</p>
      <span className="text-sm text-accent">{highlight}</span>
    </motion.div>
  );
};

const StepDot = ({ progress, position, icon: Icon }: StepDotProps) => {
  const scale = useTransform(progress, [0, 0.1], [0, 1]);
  const opacity = useTransform(progress, [0, 0.1], [0, 1]);

  return (
    <motion.circle
      cx={position.x}
      cy={position.y}
      r="6"
      fill="#C5A572"
      style={{
        scale,
        opacity
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

  const desktopDotPositions = [
    { x: 100, y: 100 },
    { x: 400, y: 100 },
    { x: 700, y: 100 },
    { x: 200, y: 300 },
    { x: 400, y: 500 },
    { x: 700, y: 500 }
  ];

  const mobileDotPositions = [
    { x: 150, y: 50 },
    { x: 150, y: 200 },
    { x: 150, y: 350 },
    { x: 150, y: 500 },
    { x: 150, y: 650 },
    { x: 150, y: 800 }
  ];

  const stepProgresses = steps.map((_, index) => {
    const start = index / steps.length;
    const end = Math.min((index + 1) / steps.length, 1);
    
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
          
          <div className="relative w-full max-w-[1200px] mx-auto h-[600px] md:h-[800px]">
            {steps.map((step, index) => (
              <StepContent
                key={step.title}
                {...step}
                dotPosition={isMobile ? mobileDotPositions[index] : desktopDotPositions[index]}
                progress={stepProgresses[index]}
              />
            ))}

            <svg
              className="absolute top-0 left-0 w-full h-full z-10"
              viewBox={isMobile ? "0 0 300 900" : "0 0 800 600"}
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
                  pathLength: scrollYProgress
                }}
              />
              {steps.map((step, index) => (
                <StepDot
                  key={index}
                  progress={stepProgresses[index]}
                  position={isMobile ? mobileDotPositions[index] : desktopDotPositions[index]}
                  icon={step.icon}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};