import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
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
import { useFreelanceMissions } from "@/hooks/useFreelanceMissions";
import type { RootState } from "@/store/store";
import { Calendar, Clock, Filter, Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const FreelanceMissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Utilisation de Redux et React Query
  const { isLoading, error } = useFreelanceMissions();
  const activeMissions = useSelector(
    (state: RootState) => state.freelance.activeMissions
  );
  const completedMissions = useSelector(
    (state: RootState) => state.freelance.completedMissions
  );

  // Combiner toutes les missions pour le filtrage
  const allMissions = [...activeMissions, ...completedMissions];

  const sidebarItems = [
    { label: "Dashboard", href: "/freelance", icon: "dashboard" },
    { label: "Mes missions", href: "/freelance/missions", icon: "list" },
    { label: "Profil", href: "/freelance/profile", icon: "user" },
    { label: "Paiements", href: "/freelance/payments", icon: "wallet" },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      in_progress: {
        label: "En cours",
        variant: "default" as const,
        color: "bg-green-100 text-green-800",
      },
      completed: {
        label: "Terminée",
        variant: "secondary" as const,
        color: "bg-gray-100 text-gray-800",
      },
      upcoming: {
        label: "À venir",
        variant: "outline" as const,
        color: "bg-blue-100 text-blue-800",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.in_progress;
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const filteredMissions = allMissions.filter((mission) => {
    const matchesSearch =
      mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || mission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const calculateEarnings = (mission: any) => {
    if (mission.workedDays && mission.rate) {
      const dailyRate = parseInt(mission.rate.replace("€/jour", ""));
      return mission.workedDays * dailyRate;
    }
    return 0;
  };

  if (isLoading) {
    return (
      <DashboardLayout
        sidebarItems={sidebarItems}
        userType="freelance"
        userName="Marie Dubois"
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
        userType="freelance"
        userName="Marie Dubois"
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
      userType="freelance"
      userName="Marie Dubois"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes missions</h1>
          <p className="text-muted-foreground">
            Gérez vos missions actives et leur progression
          </p>
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
              <SelectItem value="all">Toutes les missions</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="completed">Terminées</SelectItem>
              <SelectItem value="upcoming">À venir</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Missions */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Mes missions</h2>
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
                        chez {mission.company}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{mission.rate}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Période</p>
                        <p className="text-sm text-muted-foreground">
                          {mission.startDate &&
                            new Date(mission.startDate).toLocaleDateString(
                              "fr-FR"
                            )}{" "}
                          -
                          {mission.endDate &&
                            new Date(mission.endDate).toLocaleDateString(
                              "fr-FR"
                            )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Jours travaillés</p>
                        <p className="text-sm text-muted-foreground">
                          {mission.workedDays || 0} / {mission.totalDays || 0}{" "}
                          jours
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Gain estimé</p>
                      <p className="text-lg font-semibold text-green-600">
                        {calculateEarnings(mission).toLocaleString("fr-FR")}€
                      </p>
                    </div>
                  </div>

                  {mission.status === "in_progress" &&
                    mission.progress !== undefined && (
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

export default FreelanceMissions;
