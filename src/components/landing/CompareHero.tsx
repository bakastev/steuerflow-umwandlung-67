import React from "react";
import { Compare } from "@/components/ui/compare";

export const CompareHero = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Verkaufspsychologie im Vergleich
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Sehen Sie den direkten Unterschied zwischen einer standard Webseite und einer verkaufspsychologisch optimierten Version für eine Anwaltskanzlei
        </p>
        
        <div className="flex flex-col items-center justify-center">
          <Compare
            firstImage="/hero-optimized.jpg"
            secondImage="/hero-standard.jpg"
            className="h-[300px] w-full md:h-[600px] md:w-[800px] rounded-xl shadow-2xl"
            slideMode="hover"
            showHandlebar={true}
          />
          
          <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Standard Version</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Generische Stockfotos</li>
                <li>• Allgemeine Aussagen</li>
                <li>• Keine klare Zielgruppenansprache</li>
                <li>• Schwache Call-to-Actions</li>
              </ul>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Optimierte Version</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Authentische Bilder der Kanzlei</li>
                <li>• Konkrete Leistungsversprechen</li>
                <li>• Direkte Ansprache der Zielgruppe</li>
                <li>• Psychologisch optimierte CTAs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};