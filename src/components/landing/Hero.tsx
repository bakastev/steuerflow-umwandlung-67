import { Hero } from "@/components/blocks/hero"

export const HeroComponent = () => {
  return (
    <Hero
      title="Geschäftsvermögen in Privatvermögen umwandeln"
      subtitle="Leicht, legal und steueroptimiert!"
      actions={[
        {
          label: "Kostenloses Erstgespräch sichern",
          href: "#contact",
          variant: "default"
        }
      ]}
      titleClassName="text-white"
      subtitleClassName="text-gray-200"
      actionsClassName="mt-8"
    />
  );
};

export { HeroComponent as Hero }