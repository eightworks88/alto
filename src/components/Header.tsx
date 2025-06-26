
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background border-b-2 border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/37a0cb75-77c0-48df-b4fc-3c84e1d7cffb.png" 
            alt="Alto Logo" 
            className="h-8 w-auto"
          />
        </Link>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild className="text-foreground hover:bg-muted font-medium">
            <Link to="/signin">Connexion</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            <Link to="/signup">Inscription</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
