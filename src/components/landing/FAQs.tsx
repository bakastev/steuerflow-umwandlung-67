import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Wie funktioniert die steuerfreie ETF-Investition?",
    answer: "Sie können monatlich bis zu 644€ steuerfrei aus Ihrer GmbH in ETFs investieren. Bei GmbHs, die älter als 3 Jahre sind, ist sogar eine Investition von bis zu 10.000€ monatlich möglich.",
  },
  {
    question: "Ist die Methode wirklich legal?",
    answer: "Ja, absolut. Wir nutzen ausschließlich vom Gesetzgeber vorgesehene Möglichkeiten und arbeiten eng mit Ihrem Steuerberater zusammen.",
  },
  {
    question: "Wie lange dauert die Implementierung?",
    answer: "Die Entscheidungsfindung dauert in der Regel nur eine Stunde. Die Implementierung erfolgt dann schnell und unkompliziert mit einem Telefonat und einer E-Mail an Ihren Steuerberater.",
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