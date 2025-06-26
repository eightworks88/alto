
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Edit, Users } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const CompanyMissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const missions = [
    {
      id: 1,
      title: "Développeur React Senior",
      status: "in_progress",
      budget: "550€/jour",
      duration: "3 mois",
      createdAt: "2025-01-02",
      applicants: 8,
      selectedFreelance: "Marie Dubois",
      progress: 45
    },
    {
      id: 2,
      title: "Designer UX/UI",
      status: "profile_proposed",
      budget: "480€/jour",
      duration: "2 mois",
      createdAt: "2024-12-20",
      applicants: 12,
      selectedFreelance: null,
      progress: 0
    },
    {
      id: 3,
      title: "Consultant DevOps",
      status: "completed",
      budget: "600€/jour",
      duration: "4 mois",
      createdAt: "2024-11-15",
      applicants: 6,
      selectedFreelance: "Thomas Martin",
      progress: 100
    },
    {
      id: 4,
      title: "Data Scientist",
      status: "draft",
      budget: "520€/jour",
      duration: "6 mois",
      createdAt: "2025-01-10",
      applicants: 0,
      selectedFreelance: null,
      progress: 0
    }
  ];

  const sidebarItems = [
    { label: "Dashboard", href: "/company", icon: "dashboard" },
    { label: "Poster un besoin", href: "/company/post-need", icon: "plus" },
    { label: "Missions", href: "/company/missions", icon: "list" },
    { label: "Factures", href: "/company/invoices", icon: "receipt" }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: "Brouillon", variant: "outline" as const },
      published: { label: "Publiée", variant: "secondary" as const },
      profile_proposed: { label: "Profils proposés", variant: "default" as const },
      in_progress: { label: "En cours", variant: "default" as const },
      completed: { label: "Terminée", variant: "secondary" as const },
      cancelled: { label: "Annulée", variant: "destructive" as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredMissions = missions.filter(mission => {
    const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || mission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userType="company"
      userName="TechCorp"
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mes missions</h1>
            <p className="text-muted-foreground">Gérez et suivez toutes vos missions</p>
          </div>
          <Button>
            Nouvelle mission
          </Button>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher une mission..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="published">Publiée</SelectItem>
              <SelectItem value="profile_proposed">Profils proposés</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="completed">Terminée</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Liste des missions */}
        <div className="grid gap-6">
          {filteredMissions.map((mission) => (
            <Card key={mission.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {mission.title}
                      {getStatusBadge(mission.status)}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Créée le {new Date(mission.createdAt).toLocaleDateString('fr-FR')}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Budget</p>
                    <p className="text-lg font-semibold">{mission.budget}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Durée</p>
                    <p className="text-lg font-semibold">{mission.duration}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Candidatures</p>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-lg font-semibold">{mission.applicants}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Freelance assigné</p>
                    <p className="text-lg font-semibold">
                      {mission.selectedFreelance || "Non assigné"}
                    </p>
                  </div>
                </div>

                {mission.status === "in_progress" && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{mission.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${mission.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMissions.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Aucune mission trouvée</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CompanyMissions;
