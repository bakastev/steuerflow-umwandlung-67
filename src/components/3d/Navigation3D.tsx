import { Button } from "@/components/ui/button";
import { sections } from "./SceneConfig";

interface Navigation3DProps {
  currentSection: number;
  onNavigate: (index: number) => void;
}

export const Navigation3D = ({ currentSection, onNavigate }: Navigation3DProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex gap-2 bg-black/20 backdrop-blur-lg p-4 rounded-lg">
        {sections.map((section, index) => (
          <Button
            key={section.id}
            variant={currentSection === index ? "default" : "secondary"}
            onClick={() => onNavigate(index)}
            className="text-sm"
            style={{
              backgroundColor: currentSection === index ? section.color : undefined,
              opacity: currentSection === index ? 1 : 0.7,
            }}
          >
            {section.title}
          </Button>
        ))}
      </div>
    </div>
  );
};