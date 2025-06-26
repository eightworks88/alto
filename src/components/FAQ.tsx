
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Comment garantissez-vous la qualité des freelances ?",
    answer: "Tous nos freelances passent par un processus de sélection rigoureux incluant des tests techniques, des entretiens personnalisés et la vérification de références clients."
  },
  {
    question: "Combien coûte votre service ?",
    answer: "Nos tarifs sont transparents et compétitifs. Nous proposons différentes formules selon vos besoins. Contactez-nous pour un devis personnalisé."
  },
  {
    question: "Que se passe-t-il si le freelance ne convient pas ?",
    answer: "Nous garantissons une période d'essai. Si le profil ne correspond pas à vos attentes, nous vous proposons immédiatement des alternatives sans frais supplémentaires."
  },
  {
    question: "Dans quels domaines trouvez-vous des freelances ?",
    answer: "Nous couvrons tous les métiers du digital : développement, design, marketing, data, product management, cybersécurité, DevOps, et bien plus."
  },
  {
    question: "Comment rejoindre le Club Alto en tant que freelance ?",
    answer: "Candidatez via notre formulaire en ligne. Après étude de votre profil, nous vous inviterons à passer nos tests de qualification si votre expertise correspond à nos critères."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">Questions fréquentes</h2>
          <p className="text-xl text-muted-foreground">Tout ce que vous devez savoir</p>
        </div>

        <div className="bg-card border-2 border-border rounded-2xl p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="animate-fade-in-up border-b border-border last:border-b-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
