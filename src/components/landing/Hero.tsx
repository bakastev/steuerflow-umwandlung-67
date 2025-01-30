import { Hero } from "@/components/blocks/hero";
import { Brain, ChartBar, Target } from "lucide-react";

export const HeroComponent = () => {
  return (
    <Hero
      title="Steigern Sie Ihren Online-Umsatz durch verkaufspsychologisch optimierte Webseiten"
      subtitle={
        <>
          Wissenschaftlich fundierte Conversion-Optimierung für B2B Unternehmen
          <br />
          <div className="mt-4 flex flex-col sm:flex-row items-start gap-2 sm:gap-4 text-accent text-sm">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>KI-gestützt</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              <span>Datenbasiert</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>ROI-fokussiert</span>
            </div>
          </div>
        </>
      }
      actions={[
        {
          label: "Kostenloses Website-Audit anfordern",
          href: "#contact",
          variant: "default"
        }
      ]}
      titleClassName="text-white text-left"
      subtitleClassName="text-gray-200 text-left"
      actionsClassName="mt-8"
      image="/DSFinanzfreigestelltesBild.png"
    />
  );
};

export { HeroComponent as Hero };