import { Award, Briefcase, Users } from "lucide-react";

export const Expert = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center">
              {/* Placeholder für Ricardo's Bild */}
              <Users className="w-24 h-24 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-primary mb-4">Ricardo Di Sabatino</h2>
              <p className="text-lg text-gray-700 mb-4">
                Experte für steueroptimierte Vermögensumwandlung und Geschäftsführerstrategien
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-600">Steuerexperte</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-accent" />
                  <span className="text-sm text-gray-600">Unternehmensberater</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};