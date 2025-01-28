import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export const AnimatedStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Animiere bis 100 für die Prozentangabe
      const percentInterval = setInterval(() => {
        setCount(prev => {
          if (prev < 100) return prev + 1;
          clearInterval(percentInterval);
          return prev;
        });
      }, 20);

      // Animiere bis 724 für die Kundenanzahl
      const customersInterval = setInterval(() => {
        setCustomersCount(prev => {
          if (prev < 724) return prev + 7;
          clearInterval(customersInterval);
          return 724;
        });
      }, 20);

      return () => {
        clearInterval(percentInterval);
        clearInterval(customersInterval);
      };
    }
  }, [isInView]);

  return (
    <section className="py-12 bg-white" ref={ref}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {count}%
            </div>
            <p className="text-lg text-gray-600">
              unserer Kunden bewerten uns als "ausgezeichnet"
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              Über {customersCount}
            </div>
            <p className="text-lg text-gray-600">
              Kunden vertrauen uns bereits
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};