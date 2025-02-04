import { Hero } from "@/components/blocks/hero";
import { Brain, ChartBar, Target } from "lucide-react";
import { GrowthGraph } from "@/components/3d/GrowthGraph";

export const HeroComponent = () => {
  return (
    <Hero
      title={
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
          Steigere deine Conversion mit intelligenten Webseiten und automatisierter Lead-Gewinnung
        </span>
      }
      subtitle={
        <>
          <span className="text-base sm:text-lg md:text-xl">
            Nutze die Kraft von KI und Verkaufspsychologie für mehr Anfragen und effiziente Lead-Bearbeitung
          </span>
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-accent text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>KI-gestützt</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              <span>Automatisiert</span>
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
          label: "Dein kostenloses Website-Audit anfordern",
          href: "#contact",
          variant: "default"
        }
      ]}
      titleClassName="text-white text-left"
      subtitleClassName="text-gray-200 text-left"
      actionsClassName="mt-8"
      customContent={<GrowthGraph />}
    />
  );
};

export { HeroComponent as Hero };