import { motion } from "framer-motion";

interface FAQsProps {
  id?: string;
}

export const FAQs = ({ id }: FAQsProps) => {
  return (
    <section id={id}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-dark">
          Häufig gestellte Fragen
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-lg backdrop-blur-md bg-white/10 border border-white/20"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">Frage 1</h3>
            <p className="text-gray-300">Antwort auf Frage 1.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-lg backdrop-blur-md bg-white/10 border border-white/20"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">Frage 2</h3>
            <p className="text-gray-300">Antwort auf Frage 2.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 rounded-lg backdrop-blur-md bg-white/10 border border-white/20"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">Frage 3</h3>
            <p className="text-gray-300">Antwort auf Frage 3.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 rounded-lg backdrop-blur-md bg-white/10 border border-white/20"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">Frage 4</h3>
            <p className="text-gray-300">Antwort auf Frage 4.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
