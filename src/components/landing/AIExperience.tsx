import { motion, AnimatePresence } from "framer-motion";
import { Brain, Clock, MousePointer, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  tooltip: string;
}

const Metric = ({ icon: Icon, label, value, color, tooltip }: MetricProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${color}`} />
          <div>
            <p className="text-sm text-gray-200">{label}</p>
            <p className="font-semibold text-white">{value}</p>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const InsightCard = ({ insight }: { insight: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20"
  >
    <p className="text-sm text-white">{insight}</p>
  </motion.div>
);

interface AIExperienceProps {
  engagementScore: number;
  insights: string[];
  dwellTime: number;
  interactionDepth: number;
}

export const AIExperience = ({ 
  engagementScore, 
  insights, 
  dwellTime,
  interactionDepth 
}: AIExperienceProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scoreColor = engagementScore > 0.7 
    ? 'from-blue-500 to-yellow-500' 
    : engagementScore > 0.4 
    ? 'from-blue-400 to-blue-600' 
    : 'from-blue-300 to-blue-500';

  return (
    <section className="py-20 bg-primary-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-primary-dark to-primary-dark" />
      </div>
      
      <div className="container relative mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
        >
          Erlebe deine KI-Power live
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Score Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className={`w-64 h-64 mx-auto rounded-full bg-gradient-to-r ${scoreColor} p-1 animate-pulse`}>
              <div className="w-full h-full rounded-full bg-primary-dark flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-2">
                    {Math.round(engagementScore * 100)}%
                  </p>
                  <p className="text-sm text-gray-300">Engagement Score</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Insight Cards */}
          <div className="space-y-4">
            <AnimatePresence>
              {insights.slice(0, 3).map((insight, index) => (
                <InsightCard key={index} insight={insight} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Metrics Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-white/5 backdrop-blur-md rounded-xl p-6 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Metric 
              icon={Clock}
              label="Verweildauer"
              value={`${Math.round(dwellTime / 1000)}s`}
              color="text-blue-400"
              tooltip="Misst die Gesamtzeit aktiver Interaktion mit der Seite. Berechnet durch Tracking von Mausbewegungen, Scrollen und Klicks, wobei inaktive Zeiten herausgefiltert werden."
            />
            <Metric 
              icon={MousePointer}
              label="Interaktionstiefe"
              value={`${Math.round(interactionDepth * 100)}%`}
              color="text-green-400"
              tooltip="Zeigt, wie intensiv Sie mit den interaktiven Elementen interagieren. Beinhaltet Mausbewegungen, Klicks, Textmarkierungen und Scroll-Tiefe im Verhältnis zum Gesamtinhalt."
            />
            <Metric 
              icon={TrendingUp}
              label="Engagement-Trend"
              value={engagementScore > 0.5 ? "Steigend" : "Stabil"}
              color="text-yellow-400"
              tooltip="Zeigt die Entwicklung des Engagements über Zeit. Wird durch Vergleich aktueller Engagement-Metriken mit vorherigen Messungen berechnet."
            />
            <Metric 
              icon={Brain}
              label="KI-Prognose"
              value={engagementScore > 0.7 ? "Sehr Hoch" : engagementScore > 0.4 ? "Hoch" : "Moderat"}
              color="text-purple-400"
              tooltip="KI-gestützte Vorhersage der Gesamtqualität des Nutzer-Engagements. Kombiniert alle Metriken mittels TensorFlow zur Verhaltensvorhersage."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};