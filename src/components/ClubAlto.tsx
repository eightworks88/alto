
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const features = [
  {
    icon: Check,
    title: "Processus de validation",
    description: "Nous validons les compétences de chaque candidat pour garantir la qualité de nos services."
  },
  {
    icon: Check,
    title: "Missions premium",
    description: "Accédez à des projets exclusifs avec des entreprises tech de renom."
  },
  {
    icon: Check,
    title: "Accompagnement personnalisé",
    description: "Notre équipe vous aide à optimiser votre profil et vos performances."
  },
  {
    icon: Check,
    title: "Tarifs valorisés",
    description: "Nos clients reconnaissent la qualité et paient en conséquence."
  }
];

const ClubAlto = () => {
  return (
    <section id="club" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">Le Club Alto</h2>
          <p className="text-xl text-muted-foreground">Un club privé réservé aux freelances d'excellence</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h3 className="text-3xl font-medium mb-6">Rejoignez l'élite</h3>
            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-primary text-primary-foreground">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{feature.title}</p>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-200">
            <div className="p-8 rounded-2xl border-2 border-border bg-card">
              <h4 className="text-2xl font-medium mb-4 text-foreground">Candidater au Club</h4>
              <p className="text-muted-foreground mb-6">
                Présentez votre expertise et rejoignez notre réseau de freelances triés sur le volet.
              </p>
              <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                Rejoindre le club Alto
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubAlto;
