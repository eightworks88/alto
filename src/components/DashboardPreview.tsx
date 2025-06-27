import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building2,
  CheckCircle,
  Clock,
  Euro,
  Target,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const DashboardPreview = () => {
  const [activeView, setActiveView] = useState<"company" | "freelance">(
    "company"
  );

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Deux interfaces, une expérience optimale
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment Alto simplifie la gestion des missions freelance
            avec des dashboards pensés pour chaque utilisateur
          </p>
        </div>

        {/* Toggle buttons */}
        <div className="flex justify-center mb-16">
          <div className="bg-muted p-1 rounded-lg flex">
            <button
              onClick={() => setActiveView("company")}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 ${
                activeView === "company"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Dashboard Entreprise
            </button>
            <button
              onClick={() => setActiveView("freelance")}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 ${
                activeView === "freelance"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="w-4 h-4" />
              Dashboard Freelance
            </button>
          </div>
        </div>

        {/* Large Dashboard Preview */}
        <div className="relative mb-20">
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 shadow-2xl">
            <div className="aspect-[16/10] bg-background rounded-lg overflow-hidden">
              {activeView === "company" ? (
                <div
                  key="company"
                  className="w-full h-full p-6 space-y-4 animate-fade-in"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h4 className="font-bold text-xl">
                        Dashboard Entreprise
                      </h4>
                      <p className="text-muted-foreground">
                        TechCorp Solutions
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm">Nouveau besoin</Button>
                      <Button variant="outline" size="sm">
                        Voir tout
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-card border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        3
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Missions actives
                      </div>
                    </div>
                    <div className="bg-card border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        5
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Profils proposés
                      </div>
                    </div>
                    <div className="bg-card border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        94%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Taux matching
                      </div>
                    </div>
                    <div className="bg-card border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold mb-1">580€</div>
                      <div className="text-sm text-muted-foreground">
                        Budget moyen
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 flex-1">
                    <div className="col-span-2 bg-card border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="font-semibold">
                            Développeur React Senior
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            500-600€/jour • Remote
                          </p>
                        </div>
                        <Badge variant="secondary">Profil proposé</Badge>
                      </div>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          React
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          TypeScript
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Node.js
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Refuser
                        </Button>
                        <Button size="sm" className="flex-1">
                          Valider le profil
                        </Button>
                      </div>
                    </div>

                    <div className="bg-card border rounded-lg p-4">
                      <h6 className="font-semibold mb-3">
                        Top profil recommandé
                      </h6>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">MD</span>
                          </div>
                          <div>
                            <p className="font-medium">Marie Dubois</p>
                            <p className="text-sm text-muted-foreground">
                              550€/jour
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">
                            Disponible immédiatement
                          </span>
                        </div>
                        <Button size="sm" className="w-full">
                          Contacter
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key="freelance"
                  className="w-full h-full p-6 space-y-4 animate-fade-in"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h4 className="font-bold text-xl">Dashboard Freelance</h4>
                      <p className="text-muted-foreground">
                        Marie Dubois - React Developer
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Profil visible</span>
                      <div className="w-10 h-5 bg-primary rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-card border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        2
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Missions actives
                      </div>
                    </div>
                    <div className="bg-card border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        3
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Opportunités
                      </div>
                    </div>
                    <div className="bg-card border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        96%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Score matching
                      </div>
                    </div>
                    <div className="bg-card border rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold mb-1">15,2k€</div>
                      <div className="text-sm text-muted-foreground">
                        Ce mois
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 flex-1">
                    <div className="col-span-2 bg-card border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="font-semibold">
                            Lead Developer Frontend
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            chez DigitalCorp • Paris
                          </p>
                        </div>
                        <Badge variant="default">En cours</Badge>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progression du projet</span>
                          <span>68%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full w-[68%]"></div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Fin prévue: 18 février 2025
                      </p>
                    </div>

                    <div className="bg-card border rounded-lg p-4">
                      <h6 className="font-semibold mb-3">
                        Nouvelle opportunité
                      </h6>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium">Consultant DevOps</p>
                          <p className="text-sm text-muted-foreground">
                            650€/jour • Remote
                          </p>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            AWS
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Docker
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            K8s
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            Passer
                          </Button>
                          <Button size="sm" className="flex-1">
                            Postuler
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Dynamic description based on active view */}
        <div className="max-w-4xl mx-auto">
          {activeView === "company" ? (
            <div className="animate-fade-in">
              <Badge className="mb-4" variant="secondary">
                <Building2 className="w-4 h-4 mr-2" />
                Pour les entreprises
              </Badge>
              <h3 className="text-4xl font-bold mb-6">
                Gérez vos besoins en freelances
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Une interface claire pour poster vos missions, valider les
                profils proposés et suivre l'avancement de vos projets en temps
                réel.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <p className="font-medium mb-2">Missions centralisées</p>
                  <p className="text-sm text-muted-foreground">
                    Visualisez toutes vos missions actives en un coup d'œil
                  </p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <p className="font-medium mb-2">Profils pré-sélectionnés</p>
                  <p className="text-sm text-muted-foreground">
                    Recevez des propositions de freelances qualifiés
                    automatiquement
                  </p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <p className="font-medium mb-2">
                    Statistiques de performance
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Suivez vos taux de matching et budgets moyens
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button asChild size="lg" className="group">
                  <Link to="/signin">Rejoindre Alto</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <Badge className="mb-4" variant="secondary">
                <User className="w-4 h-4 mr-2" />
                Pour les freelances
              </Badge>
              <h3 className="text-4xl font-bold mb-6">
                Optimisez votre activité freelance
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Un espace personnalisé pour gérer vos missions actuelles,
                découvrir de nouvelles opportunités et suivre vos performances
                financières.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <p className="font-medium mb-2">Suivi en temps réel</p>
                  <p className="text-sm text-muted-foreground">
                    Progression, échéances et livrables en un coup d'œil
                  </p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <p className="font-medium mb-2">
                    Opportunités personnalisées
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Missions recommandées selon votre profil et compétences
                  </p>
                </div>
                <div className="text-center">
                  <Euro className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <p className="font-medium mb-2">Tableau de bord financier</p>
                  <p className="text-sm text-muted-foreground">
                    Revenus, projections et statistiques de performance
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button asChild size="lg" className="group">
                  <Link to="/signin">Rejoindre Alto</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-12 mt-20">
          <h3 className="text-3xl font-bold mb-4">Prêt à découvrir Alto ?</h3>
          <p className="text-muted-foreground mb-8 text-lg">
            Que vous soyez une entreprise ou un freelance, notre plateforme
            s'adapte à vos besoins
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild variant="outline" size="lg">
              <Link to="/signin">Se connecter</Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/signup">Commencer gratuitement</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
