import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Mit der Geschäftsführerstrategie spare ich monatlich mehrere tausend Euro Steuern. Ich wünschte, ich hätte das früher gewusst!",
    author: "Thomas M., Geschäftsführer",
  },
  {
    quote: "Die Umsetzung war super einfach, und mein Steuerberater war beeindruckt.",
    author: "Sarah K., Unternehmerin",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-primary-dark">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          Das sagen unsere Kunden
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-accent/20"
            >
              <p className="text-lg text-gray-200 mb-4 italic">"{testimonial.quote}"</p>
              <p className="text-accent font-semibold">{testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};