import { Marquee } from "@/components/ui/marquee"

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
        <Marquee speed={40} className="py-4">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-16 flex items-center justify-center"
            >
              <img 
                src={logo} 
                alt={`Partner Logo ${index + 1}`}
                className="h-20 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
