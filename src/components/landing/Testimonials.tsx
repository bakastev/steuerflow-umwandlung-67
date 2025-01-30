import { motion } from "framer-motion";

interface TestimonialsProps {
  id?: string;
}

export const Testimonials = ({ id }: TestimonialsProps) => {
  return (
    <section id={id}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-dark">
          Was unsere Kunden sagen
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-xl"
          >
            <p className="text-gray-300">
              "Die Zusammenarbeit mit diesem Team hat unsere Conversion-Rate erheblich gesteigert!"
            </p>
            <h4 className="text-lg font-semibold text-white mt-4">Max Mustermann</h4>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-xl"
          >
            <p className="text-gray-300">
              "Ich kann die Dienstleistungen nur empfehlen. Die Ergebnisse sprechen für sich!"
            </p>
            <h4 className="text-lg font-semibold text-white mt-4">Erika Mustermann</h4>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
