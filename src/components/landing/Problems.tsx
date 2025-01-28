import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const problems = [
  "Ihre Gewinne bleiben in der GmbH gefangen und Sie zahlen unnötig hohe Steuern.",
  "Ihr Steuerberater ist nur ein 'Steuerbegleiter' - ohne proaktive Strategieberatung.",
  "Steuern sind Chefsache, aber Sie haben keine Zeit sich damit zu beschäftigen.",
];

export const Problems = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
          Die größten Herausforderungen für Geschäftsführer
        </h2>
        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut"
              }}
              className="flex items-start gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-2xl"
            >
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <p className="text-gray-700 text-lg">{problem}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};