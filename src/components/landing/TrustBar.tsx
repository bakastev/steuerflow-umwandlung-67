import { useEffect, useRef } from "react";

const logos = [
  "Logo 1", "Logo 2", "Logo 3", "Logo 4", "Logo 5", 
  // Hier können weitere Logos hinzugefügt werden
];

export const TrustBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const scroll = () => {
      if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
        scrollElement.scrollLeft = 0;
      } else {
        scrollElement.scrollLeft += 1;
      }
    };

    const timer = setInterval(scroll, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-lg text-gray-600 mb-8">
          Bekannt aus
        </h3>
        <div className="overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex whitespace-nowrap"
            style={{ width: "200%" }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-none mx-8 w-32 h-12 bg-white rounded shadow-sm flex items-center justify-center"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};