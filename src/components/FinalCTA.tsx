import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Prêt à trouver votre prochain freelance ?
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Décrivez-nous votre besoin et recevez des profils qualifiés en 48h
          </p>
        </div>

        <div className="animate-fade-in-up animate-delay-200 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="text-lg px-10 py-4 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform  font-semibold rounded-xl"
          >
            Trouvez votre freelance
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-10 py-4 border-2 border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform font-semibold rounded-xl backdrop-blur-sm"
          >
            Rejoindre le club Alto
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex justify-center items-center gap-8 opacity-70">
          <div className="text-center">
            <div className="text-2xl font-bold">48h</div>
            <div className="text-sm">Délai moyen</div>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
          <div className="text-center">
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm">Taux de satisfaction</div>
          </div>
          <div className="w-px h-12 bg-white/30"></div>
          <div className="text-center">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm">Freelances qualifiés</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
