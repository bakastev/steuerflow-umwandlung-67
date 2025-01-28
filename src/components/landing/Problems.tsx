import { AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";

const problems = [
  "Ihre Gewinne bleiben in der GmbH gefangen und Sie zahlen unnötig hohe Steuern.",
  "Ihr Steuerberater ist nur ein 'Steuerbegleiter' - ohne proaktive Strategieberatung.",
  "Steuern sind Chefsache, aber Sie haben keine Zeit sich damit zu beschäftigen.",
];

export const Problems = () => {
  const problemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    problemRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add('opacity-0');
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
          Die größten Herausforderungen für Geschäftsführer
        </h2>
        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index}
              ref={el => problemRefs.current[index] = el}
              className="flex items-start gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-2xl transform transition-all duration-500 animate-fadeInScroll"
              style={{ 
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <p className="text-gray-700 text-lg">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};