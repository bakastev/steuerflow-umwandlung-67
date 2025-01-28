import { Hero } from "@/components/blocks/hero"

export const HeroComponent = () => {
  return (
    <Hero
      title="Geschäftsvermögen in Privatvermögen umwandeln"
      subtitle={
        <>
          Wie du es als Geschäftsführer/Gesellschafter einer GmbH es schaffst, dein Betriebsvermögen in Privatvermögen umzuwandeln
          <br />
          <span className="mt-4 block">Leicht, legal und steueroptimiert!</span>
        </>
      }
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
      image="/public/DSFinanzfreigestelltesBild.png"
    />
  );
};

export { HeroComponent as Hero }
