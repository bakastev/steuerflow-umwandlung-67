export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <img 
            src="/DS FInanz  Logos für LP (3).png" 
            alt="DS Finanz Logo" 
            className="h-16 w-auto"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <p>Email: info@geschaeftsfuehrer-strategie.de</p>
            <p>Tel: +49 (0) 123 456789</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Folgen Sie uns</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">XING</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Geschäftsführer-Strategie. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};