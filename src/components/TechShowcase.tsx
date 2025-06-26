
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Interface simple",
    description: "Navigation intuitive pour tous les utilisateurs",
    accent: false
  },
  {
    title: "Plateforme sécurisée",
    description: "Vos données et paiements sont protégés",
    accent: false
  },
  {
    title: "Suivi en temps réel",
    description: "Notifications et mises à jour automatiques",
    accent: false
  },
  {
    title: "Matching précis",
    description: "Trouvez les bonnes missions ou profils facilement",
    accent: false
  }
];

const TechShowcase = () => {
  return (
    <section className="py-32 px-6 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <Badge className="mb-6 px-6 py-2 text-sm font-medium">
            Fonctionnalités
          </Badge>
          <h2 className="text-4xl md:text-5xl font-normal mb-6 tracking-tight">
            Une plateforme <span className="text-primary font-medium">complète</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Tout ce dont vous avez besoin pour gérer vos missions freelance efficacement
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-6 border-2 border-border bg-card rounded-2xl hover:shadow-premium transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <h3 className="font-medium mb-3 text-lg text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;
