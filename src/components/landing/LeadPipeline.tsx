import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

const LeadPipeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border-accent/20 h-full">
                      <CardContent className="p-6 flex flex-col items-center text-center h-full">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
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

            {/* Progress Line */}
            <motion.div 
              className="absolute left-0 bottom-0 h-0.5 bg-accent"
              style={{
                width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1])
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadPipeline;