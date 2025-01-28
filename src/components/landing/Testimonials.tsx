import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

interface Testimonial {
  name: string;
  videoUrl: string;
  description: string;
  thumbnailText: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Melanie Fuchs",
    videoUrl: "https://youtu.be/R1nqdAY63Bc",
    description: "Melanie bekam eine Komplettlösung für Ihren Betrieb und für Ihre private Situation. BU - ETFs und auch die Mitarbeiter profitieren bei Melanie Fuchs.",
    thumbnailText: "WARUM ICH JEMANDEN BRAUCHE, DEM ICH BLIND VERTRAUEN KANN"
  },
  {
    name: "Danny Eckert",
    videoUrl: "https://youtu.be/YYwhM66CsjE",
    description: "Danny hat sich trotz eines Bürojobs für eine Berufsunfähigkeitsversicherung entschieden. Darüber hinaus investiert er jeden Monat 150 Euro in ETF.",
    thumbnailText: "VON DER 08/15 BERATUNG ZU PREMIUM FINANZKONZEPTEN"
  },
  {
    name: "Lorenzo Di Natale",
    videoUrl: "https://youtu.be/FZ_NPsrmCFw",
    description: "Lorenzo hat sowohl privat als auch geschäftlich alles bei Riccardo abgeschlossen und hat nun das Gefühl komplett richtig versichert zu sein.",
    thumbnailText: "ICH HABE JEMANDEN GEBRAUCHT DEM ICH VERTRAUEN KANN UND WILL UND DAS GEHT NUR WENN"
  },
  {
    name: "Violetta Leongardt",
    videoUrl: "https://youtu.be/A67LI3YBLMY",
    description: "Berufsunfähigkeitsversicherung, Private Krankenversicherung und investieren in ETFs sind nur ein Teil der Produkte die Violetta bei uns abgeschlossen hat.",
    thumbnailText: "RICCARDO HAT MICH VON EINER FATALEN FEHLENTSCHEIDUNG BEWAHRT"
  },
  {
    name: "Natalie Scherer",
    videoUrl: "https://youtu.be/8vcAolSR5NQ",
    description: "Natalie legt auch schon in jungen Jahren jeden Monat Geld an um sich was auf die Seite zu legen. Dank Strategie wird Sie steuerfrei Geld anlegen.",
    thumbnailText: "WIE DIE BERATUNG MIR UND DER GMBH WEITERGEHOLFEN HAT"
  },
  {
    name: "Nico Sica",
    videoUrl: "https://youtu.be/TUtQNZTmj7A",
    description: "Nico hat seine Firma komplett bei Riccardo versichert und legt ebenfalls 500 Euro im Monat ETFs für seine Zukunft an.",
    thumbnailText: "VON VORURTEILEN ZUM UNTERNEHMER DER DIE FINANZDIENSTLEISTUNG FÜR SEIN UNTERNEHMEN NUTZT"
  }
];

const getYouTubeEmbedUrl = (url: string) => {
  const videoId = url.split('/').pop();
  return `https://www.youtube.com/embed/${videoId}`;
};

export const Testimonials = () => {
  return (
    <section className="py-20 bg-primary-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Präzedenzfälle
          </h2>
          <p className="text-xl text-accent">
            Echte Ergebnisse erzeugen echte Testimonials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-primary-light border-accent/20 overflow-hidden h-full">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-black/50 group cursor-pointer">
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYouTubeEmbedUrl(testimonial.videoUrl)}
                      title={`Testimonial von ${testimonial.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 group-hover:bg-black/40 transition-colors">
                      <div className="text-center p-4">
                        <div className="mb-4">
                          <img 
                            src="/DSFInanzLogosfurLP.png" 
                            alt="DS Finanz Logo" 
                            className="h-8 mx-auto mb-2"
                          />
                          <h3 className="text-white font-bold mb-1">{testimonial.name}</h3>
                          <p className="text-xs text-accent uppercase font-bold">
                            Erfahrungsbericht
                          </p>
                        </div>
                        <p className="text-sm text-white font-bold leading-tight">
                          {testimonial.thumbnailText}
                        </p>
                        <PlayCircle className="w-12 h-12 text-accent mx-auto mt-4 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-300 text-sm">
                      {testimonial.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};