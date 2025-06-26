
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Décrivez votre besoin",
    description: "Partagez-nous votre projet et vos exigences en quelques minutes."
  },
  {
    number: "02", 
    title: "Nous sélectionnons",
    description: "Notre équipe identifie les profils parfaits dans notre réseau premium."
  },
  {
    number: "03",
    title: "Vous collaborez",
    description: "Recevez 2-3 profils qualifiés, prêts à commencer rapidement."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 px-6 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-normal mb-6 tracking-tight">Comment ça marche ?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">Simple, rapide, efficace - en seulement 3 étapes</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={step.number}
              className="p-8 border-2 border-border bg-card rounded-2xl hover:shadow-premium transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium mx-auto mb-6 bg-primary text-primary-foreground">
                  {step.number}
                </div>
                
                <h3 className="text-xl font-medium mb-4 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
