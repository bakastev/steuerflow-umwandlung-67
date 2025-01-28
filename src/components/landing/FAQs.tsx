import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section className="py-20 bg-gray-50" id="faqs">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Häufig gestellte Fragen
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};