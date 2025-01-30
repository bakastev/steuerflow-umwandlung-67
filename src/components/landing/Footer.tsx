export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <img 
            src="/BakaLogoWeiß.png" 
            alt="BAKA Logo" 
            className="h-16 w-auto"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <p className="mb-2">Di Sabatino Finanzkonzepte</p>
            <p className="mb-2">Bahnhofplatz 2a</p>
            <p className="mb-2">76646 Bruchsal</p>
            <p className="mb-2">Email: info@disabatino.de</p>
            <p>Tel: +49 162 4929833</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-sm leading-relaxed">
            This website is not part of the Facebook website or Facebook Inc. Additionally, this site is not endorsed by Facebook in any way. 
            Facebook is a trademark of Facebook, Inc. We use Google remarketing pixels/cookies on this site to re-communicate with people who 
            visit our site and ensure that we are able to reach them in the future with relevant messages and information. Google shows our 
            ads across third party sites across the internet to help communicate our message and reach the right people who have shown 
            interest in our information in the past.
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Geschäftsführer-Strategie. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};