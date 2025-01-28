import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl font-bold text-primary">
            Steuerflow
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#vorteile" className="text-gray-600 hover:text-primary transition-colors">Vorteile</a>
            <a href="#process" className="text-gray-600 hover:text-primary transition-colors">Prozess</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors">Über uns</a>
            <Button variant="default" className="bg-accent hover:bg-accent-light text-primary-dark">
              Erstgespräch buchen
            </Button>
          </nav>
          
          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};