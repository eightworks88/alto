import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMissionsData } from "@/hooks/useMissionsData";
import type { RootState } from "@/store/store";
import { Edit, Eye, Filter, Search, Users } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyMissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  // Utilisation de Redux et React Query
  const { isLoading, error } = useMissionsData();
  const missions = useSelector((state: RootState) => state.missions.missions);

  const sidebarItems = [
    { label: "Dashboard", href: "/company", icon: "dashboard" },
    { label: "Poster un besoin", href: "/company/post-need", icon: "plus" },
    { label: "Missions", href: "/company/missions", icon: "list" },
    { label: "Factures", href: "/company/invoices", icon: "receipt" },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: "Brouillon", variant: "outline" as const },
      published: { label: "Publiée", variant: "secondary" as const },
      profile_proposed: {
        label: "Profils proposés",
        variant: "default" as const,
      },
      in_progress: { label: "En cours", variant: "default" as const },
      completed: { label: "Terminée", variant: "secondary" as const },
      cancelled: { label: "Annulée", variant: "destructive" as const },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredMissions = missions.filter((mission) => {
    const matchesSearch = mission.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || mission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleNewMission = () => {
    navigate("/company/post-need");
  };

  if (isLoading) {
    return (
      <DashboardLayout
        sidebarItems={sidebarItems}
        userType="company"
        userName="TechCorp"
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Chargement des missions...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout
        sidebarItems={sidebarItems}
        userType="company"
        userName="TechCorp"
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-destructive">Erreur: {error.message}</p>
        </div>
      </DashboardLayout>
    );
  }

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
            <p className="text-muted-foreground">
              Gérez et suivez toutes vos missions
            </p>
          </div>
          <Button onClick={handleNewMission}>Nouvelle mission</Button>
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
                      Créée le{" "}
                      {new Date(mission.createdAt).toLocaleDateString("fr-FR")}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/company/missions/${mission.id}`)
                      }
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Voir
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/company/missions/${mission.id}/edit`)
                      }
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Budget
                    </p>
                    <p className="text-lg font-semibold">{mission.budget}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Durée
                    </p>
                    <p className="text-lg font-semibold">{mission.duration}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Candidatures
                    </p>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-lg font-semibold">
                        {mission.applicants}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Freelance assigné
                    </p>
                    <p className="text-lg font-semibold">
                      {mission.selectedFreelance || "Non assigné"}
                    </p>
                  </div>
                </div>

                {mission.status === "in_progress" && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progression</span>
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
