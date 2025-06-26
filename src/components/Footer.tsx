
const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold mb-4">Alto</div>
            <p className="text-muted-foreground leading-relaxed">
              Le bon freelance, en 48h. Testé. Briefé. Prêt à travailler.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Entreprises</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Décrivez votre besoin</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Comment ça marche</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Tarifs</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Nos garanties</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Freelances</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Rejoindre le club</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Critères de sélection</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Avantages membres</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Témoignages</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">hello@alto.fr</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <div>© 2024 Alto. Tous droits réservés.</div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-foreground transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-foreground transition-colors">CGU</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
