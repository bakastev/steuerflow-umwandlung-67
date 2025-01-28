import { useEffect, useRef } from "react";

const logos = [
  "/DSFInanzLogosfurLP.png",
  "/DSFInanzLogosfurLP2.png",
  "/DSFInanzLogosfurLPneu.png"
];

export const TrustBar = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-lg text-gray-600 mb-8">
          Bekannt aus
        </h3>
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="mx-8 flex items-center justify-center"
              >
                <img 
                  src={logo} 
                  alt={`Partner Logo ${index + 1}`}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          <div 
            className="animate-marquee flex whitespace-nowrap"
            style={{ 
              position: 'absolute',
              left: '100%',
              top: 0
            }}
          >
            {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={`duplicate-${index}`}
                className="mx-8 flex items-center justify-center"
              >
                <img 
                  src={logo} 
                  alt={`Partner Logo ${index + 1}`}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};