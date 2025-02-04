import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
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

const CARD_HEIGHT = 160;
const CARD_SPACING = 20;

const desktopPath = "M100,100 C150,100 150,100 200,100 H700 C750,100 750,300 700,300 H200 C150,300 150,500 200,500 H700";
const mobilePath = "M150,50 C150,150 150,250 150,800";

interface StepContentProps {
  title: string;
  description: string;
  highlight: string;
  icon: any;
  dotPosition: { x: number; y: number };
  progress: any;
  index: number; // Hinzugefügt für Debug
}

interface StepDotProps {
  progress: any;
  position: { x: number; y: number };
  icon: any;
  index: number; // Hinzugefügt für Debug
}

const StepContent = ({ 
  title, 
  description, 
  highlight,
  icon: Icon,
  dotPosition,
  progress,
  index
}: StepContentProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      console.log(`Card ${index} Position:`, {
        top: cardRect.top,
        left: cardRect.left,
        width: cardRect.width,
        height: cardRect.height,
        dotX: dotPosition.x,
        dotY: dotPosition.y
      });
    }
  }, [dotPosition, index]);

  return (
    <motion.div 
      ref={cardRef}
      className="absolute z-20 w-[280px]"
      style={{ 
        left: `${dotPosition.x}px`,
        top: `${dotPosition.y - (CARD_HEIGHT + CARD_SPACING)}px`,
        transform: 'translateX(-50%)',
        opacity: 1, // Temporär auf 1 gesetzt für Debug
      }}
    >
      <Card className="bg-white/5 backdrop-blur-sm border-accent/20">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <Icon className="w-6 h-6 text-accent mb-2" />
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-300 mb-1">{description}</p>
          <span className="text-sm text-accent">{highlight}</span>
          {/* Debug-Linie zum Dot */}
          <div 
            className="absolute bottom-0 left-1/2 w-0.5 bg-red-500" 
            style={{ 
              height: `${CARD_SPACING}px`,
              transform: 'translateX(-50%)'
            }} 
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const StepDot = ({ progress, position, icon: Icon, index }: StepDotProps) => {
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (dotRef.current) {
      const dotRect = dotRef.current.getBoundingClientRect();
      console.log(`Dot ${index} Position:`, {
        top: dotRect.top,
        left: dotRect.left,
        x: position.x,
        y: position.y
      });
    }
  }, [position, index]);

  return (
    <motion.circle
      ref={dotRef}
      cx={position.x}
      cy={position.y}
      r="6"
      fill="#C5A572"
      style={{
        opacity: 1 // Temporär auf 1 gesetzt für Debug
      }}
    />
  );
};

export const LeadPipeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (containerRef.current && svgRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();
      
      console.log('Container Dimensions:', {
        top: containerRect.top,
        left: containerRect.left,
        width: containerRect.width,
        height: containerRect.height
      });
      
      console.log('SVG Dimensions:', {
        top: svgRect.top,
        left: svgRect.left,
        width: svgRect.width,
        height: svgRect.height
      });
    }
  }, []);

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
    return useTransform(scrollYProgress, [start, end], [0, 1]);
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
                index={index}
              />
            ))}

            <svg
              ref={svgRef}
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
                  index={index}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};