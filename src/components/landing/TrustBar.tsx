import { useEffect, useRef } from "react";

const logos = [
  "/DS FInanz  Logos für LP.png",
  "/DS FInanz  Logos für LP (2).png",
  "/DS FInanz  Logos für LP neu.png"
];

export const TrustBar = () => {
  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-lg text-gray-600 mb-8">
          Bekannt aus
        </h3>
        <div className="relative flex overflow-x-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="mx-8 flex items-center justify-center"
              >
                <img 
                  src={logo} 
                  alt={`Partner Logo ${index + 1}`}
                  className="h-12 object-contain"
                />
              </div>
            ))}
          </div>
          <div 
            className="flex absolute top-0 animate-marquee whitespace-nowrap"
            style={{ left: "100%" }}
          >
            {logos.map((logo, index) => (
              <div
                key={`duplicate-${index}`}
                className="mx-8 flex items-center justify-center"
              >
                <img 
                  src={logo} 
                  alt={`Partner Logo ${index + 1}`}
                  className="h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};