import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Wie funktioniert die KI-gestützte Optimierung?",
    answer: "Unsere KI analysiert das Verhalten deiner Website-Besucher in Echtzeit und identifiziert Muster, die zu höheren oder niedrigeren Conversion-Raten führen. Diese Erkenntnisse werden automatisch genutzt, um deine Website kontinuierlich zu optimieren.",
  },
  {
    question: "Wie lange dauert es, bis ich erste Ergebnisse sehe?",
    answer: "Die ersten Optimierungen können bereits nach wenigen Tagen implementiert werden. Signifikante Verbesserungen deiner Conversion-Rate sind typischerweise nach 4-6 Wochen messbar.",
  },
  {
    question: "Ist die Implementierung kompliziert?",
    answer: "Nein, wir kümmern uns um die gesamte technische Implementierung. Du musst lediglich einen kleinen Code-Snippet auf deiner Website einbinden, den Rest erledigen wir.",
  },
];

export const FAQs = () => {
  return (
    <section className="py-20 bg-primary-dark" id="faqs">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          Häufig gestellte Fragen
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-accent/20 rounded-lg bg-white/10 backdrop-blur-md px-4"
              >
                <AccordionTrigger className="text-left text-white hover:text-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};