import { Marquee } from "@/components/ui/marquee"

const logos = [
  "/DSFInanzLogosfurLP.png",
  "/DSFInanzLogosfurLP2.png",
  "/DSFInanzLogosfurLPneu.png"
];

export const TrustBar = () => {
  return (
    <section className="py-12 bg-white relative">
      <div className="container mx-auto">
        <h3 className="text-center text-lg text-gray-600 mb-8">
          Bekannt aus
        </h3>
        <div className="w-full overflow-hidden relative">
          {/* Linker Verlauf */}
          <div className="absolute left-0 top-0 w-32 h-full z-10 bg-gradient-to-r from-white to-transparent" />
          
          <Marquee speed={40}>
            {logos.map((logo, index) => (
              <div
                key={index}
                className="mx-24 flex items-center justify-center"
              >
                <img 
                  src={logo} 
                  alt={`Partner Logo ${index + 1}`}
                  className="h-24 w-auto object-contain"
                  style={{ maxWidth: 'none' }}
                />
              </div>
            ))}
          </Marquee>

          {/* Rechter Verlauf */}
          <div className="absolute right-0 top-0 w-32 h-full z-10 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
};