import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface ExpertProps {
  id?: string;
}

export const Expert = ({ id }: ExpertProps) => {
  return (
    <section id={id} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/expert-image.jpg"
              alt="Steuerexperte"
              className="rounded-lg shadow-xl w-full"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-dark">
              Ihr Experte für Steueroptimierung
            </h2>
            <p className="text-gray-600 mb-6">
              Mit über 15 Jahren Erfahrung in der Steuerberatung und einem tiefen Verständnis für die Bedürfnisse von Unternehmern, unterstütze ich Sie dabei, Ihre Steuerlast legal zu optimieren.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-600">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Zertifizierter Steuerberater
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Spezialist für Unternehmenssteuern
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Über 500 erfolgreiche Beratungen
              </li>
            </ul>
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent-light text-primary-dark font-bold"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Beratungstermin vereinbaren
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};