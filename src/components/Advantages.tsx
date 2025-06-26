
import { Card, CardContent } from "@/components/ui/card";
import { Clock, PiggyBank, Shield } from "lucide-react";

const advantages = [
  {
    title: "Gain de temps",
    description: "Fini les semaines de recherche et de tri de CV. Nous vous livrons les bons profils directement.",
    icon: Clock
  },
  {
    title: "Économies réalisées", 
    description: "En temps homme sur votre processus de recrutement. Notre service se rentabilise dès le premier freelance.",
    icon: PiggyBank
  },
  {
    title: "Qualité garantie",
    description: "Tous nos freelances sont testés sur leurs compétences techniques et leurs soft skills.",
    icon: Shield
  }
];

const Advantages = () => {
  return (
    <section id="advantages" className="py-24 px-6 bg-gradient-to-b from-background to-slate-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground tracking-tight">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Des résultats mesurables pour votre entreprise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <Card 
                key={advantage.title}
                className="group p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-0 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{advantage.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
