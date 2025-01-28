import { Clock, CheckCircle, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Erstgespräch buchen",
    description: "In nur einer Stunde klären wir Ihre individuelle Situation und zeigen Ihnen Ihre Einsparpotentiale.",
    icon: Clock,
  },
  {
    title: "Strategie entwickeln",
    description: "Wir entwickeln gemeinsam Ihre maßgeschneiderte Geschäftsführerstrategie - einfach und effizient.",
    icon: CheckCircle,
  },
  {
    title: "Schnelle Umsetzung",
    description: "Ein Telefonat und eine E-Mail mit Ihrem Steuerberater genügen meist schon für die Implementierung.",
    icon: PhoneCall,
  },
];

export const Process = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-dark"
        >
          So einfach geht's
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-accent"></div>
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col md:flex-row items-start mb-12"
              >
                <div className="flex items-center md:w-1/2 md:justify-end md:pr-8">
                  <div className="w-8 h-8 rounded-full bg-accent text-primary-dark flex items-center justify-center font-bold z-10">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="w-5 h-5 text-accent" />
                    <h3 className="text-xl font-semibold text-primary-dark">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};