
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6">
      {/* Flat background */}
      <div className="absolute inset-0 bg-background -z-10"></div>

      <div className="container mx-auto text-center max-w-6xl relative z-10">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-8 border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Talents vérifiés</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal leading-[0.9] mb-8 tracking-tight">
            <span className="text-primary">
              Alto
            </span>
          </h1>
        </div>

        <div className="animate-fade-in-up animate-delay-100">
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed font-light max-w-4xl mx-auto">
            Testé. Briefé. Prêt à travailler.<br />
            <span className="text-lg">Trouvez le profil qualifié qui vous correspond rapidement</span>
          </p>
        </div>

        <div className="animate-fade-in-up animate-delay-200 flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
          <Button size="default" className="text-base px-8 py-3 font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
            Trouver mon freelance
          </Button>
          <Button variant="outline" size="default" className="text-base px-8 py-3 font-medium rounded-lg border-2">
            Rejoindre le club Alto
          </Button>
        </div>

        <div className="animate-fade-in-up animate-delay-300">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-8 font-normal tracking-wide uppercase">
              Découvrez notre processus
            </p>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
