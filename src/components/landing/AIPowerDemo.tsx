import { motion } from "framer-motion";
import { Brain, Activity, MousePointer, Timer } from "lucide-react";
import { useTFTracking } from "@/hooks/useTFTracking";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const AIPowerDemo = () => {
  const { behaviorRef, predictEngagement } = useTFTracking();
  const [engagementScore, setEngagementScore] = useState(0);
  const [insights, setInsights] = useState<string[]>([]);
  const [metrics, setMetrics] = useState({
    timeOnPage: 0,
    interactions: 0,
    scrollDepth: 0,
  });

  useEffect(() => {
    const updateMetrics = async () => {
      const result = await predictEngagement();
      setEngagementScore(result.score);
      
      const currentMetrics = {
        timeOnPage: Math.floor((Date.now() - behaviorRef.current.lastActivity) / 1000),
        interactions: Object.values(behaviorRef.current.elementInteractions).reduce((a, b) => a + b, 0),
        scrollDepth: Math.round(behaviorRef.current.scrollDepth),
      };
      setMetrics(currentMetrics);

      // Generate insights based on behavior
      const newInsights = [];
      if (result.score > 0.6) {
        newInsights.push("Hohes Engagement erkannt! 🎯");
      }
      if (behaviorRef.current.dwellTimes['benefits-section'] > 5000) {
        newInsights.push("Starkes Interesse an unseren Vorteilen 📈");
      }
      if (behaviorRef.current.scrollDepth > 70) {
        newInsights.push("Intensive Content-Exploration 🔍");
      }
      setInsights(newInsights);
    };

    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, [behaviorRef, predictEngagement]);

  return (
    <section className="py-20 bg-gradient-to-b from-primary-dark to-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      
      <div className="container relative mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
        >
          KI-Power Live erleben
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Engagement Score */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Brain className="w-6 h-6" />
                Engagement Score
              </h3>
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "text-3xl font-bold",
                  engagementScore > 0.7 ? "text-green-400" :
                  engagementScore > 0.4 ? "text-yellow-400" :
                  "text-red-400"
                )}
              >
                {Math.round(engagementScore * 100)}%
              </motion.div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-6">
              <motion.div 
                className="bg-accent h-2 rounded-full"
                animate={{ width: `${engagementScore * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Live Insights */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Live Insights
            </h3>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-white/90"
                >
                  {insight}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Timer className="w-5 h-5 text-accent" />
              <h4 className="text-sm font-medium text-white/80">Zeit auf Seite</h4>
            </div>
            <p className="text-2xl font-bold text-white">{metrics.timeOnPage}s</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <MousePointer className="w-5 h-5 text-accent" />
              <h4 className="text-sm font-medium text-white/80">Interaktionen</h4>
            </div>
            <p className="text-2xl font-bold text-white">{metrics.interactions}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-accent" />
              <h4 className="text-sm font-medium text-white/80">Scroll-Tiefe</h4>
            </div>
            <p className="text-2xl font-bold text-white">{metrics.scrollDepth}%</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};