import { Button } from "@/components/ui/button";
import { Menu, Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img 
              src="/baka_logo.png" 
              alt="BAKA Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#vorteile" className="text-gray-600 hover:text-primary transition-colors scroll-smooth">Vorteile</a>
            <a href="#process" className="text-gray-600 hover:text-primary transition-colors scroll-smooth">Prozess</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors scroll-smooth">Über uns</a>
            <a href="#faqs" className="text-gray-600 hover:text-primary transition-colors scroll-smooth">FAQs</a>
            <Button 
              variant="default" 
              className="bg-accent hover:bg-accent-light text-primary-dark"
              onClick={() => scrollToSection('contact')}
            >
              Erstgespräch buchen
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => navigate('/3d-experience')}
            >
              <Box className="h-4 w-4" />
              3D Experience
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