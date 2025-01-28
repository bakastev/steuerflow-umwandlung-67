import { Marquee } from "@/components/ui/marquee"

const logos = [
  "/DSFInanzLogosfurLP.png",
  "/DSFInanzLogosfurLP2.png",
  "/DSFInanzLogosfurLPneu.png"
];

export const TrustBar = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <h3 className="text-center text-lg text-gray-600 mb-8">
          Bekannt aus
        </h3>
        <div className="w-full overflow-hidden">
          <Marquee speed={40}>
            {logos.map((logo, index) => (
              <div
                key={index}
                className="mx-24 flex items-center justify-center"
              >
                <img 
                  src={logo} 
                  alt={`Partner Logo ${index + 1}`}
                  className="h-28 w-auto object-contain"
                  style={{ maxWidth: 'none' }}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};