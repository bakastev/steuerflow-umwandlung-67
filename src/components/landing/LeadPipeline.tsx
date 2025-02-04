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

// SVG-Pfad für Desktop - größer und mit mehr Platz für Cards
const desktopPath = "M100,100 C150,100 150,100 200,100 H700 C750,100 750,300 700,300 H200 C150,300 150,500 200,500 H700";

// SVG-Pfad für Mobile - vertikal mit genug Platz für Cards
const mobilePath = "M150,50 L150,800";

const StepCard = ({ title, description, highlight, className }: { 
  title: string;
  description: string;
  highlight: string;
  className: string;
}) => (
  <div className={`absolute ${className}`}>
    <Card className="w-[280px] bg-white/5 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300 mb-2">{description}</p>
        <p className="text-sm text-accent">{highlight}</p>
      </CardContent>
    </Card>
  </div>
);

export const LeadPipeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Desktop Positionen für die Cards
  const desktopPositions = [
    "left-[50px] top-[20px]",
    "left-[350px] top-[20px]",
    "right-[50px] top-[20px]",
    "right-[50px] top-[250px]",
    "left-[350px] top-[480px]",
    "right-[50px] top-[480px]"
  ];

  // Mobile Positionen für die Cards
  const mobilePositions = [
    "left-[180px] top-[50px]",
    "left-[180px] top-[180px]",
    "left-[180px] top-[310px]",
    "left-[180px] top-[440px]",
    "left-[180px] top-[570px]",
    "left-[180px] top-[700px]"
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
              viewBox={isMobile ? "0 0 300 850" : "0 0 800 600"}
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
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <StepCard
                  {...step}
                  className={isMobile ? mobilePositions[index] : desktopPositions[index]}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};