import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Search } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MissionCard } from "@/components/dashboard/MissionCard";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { StatsBlock } from "@/components/dashboard/StatsBlock";
import { useDashboardData } from "@/hooks/useDasboardData";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const CompanyDashboard = () => {
  const { isLoading, error } = useDashboardData(); // fetch avec TanStack Query
  const missions = useSelector((state: RootState) => state.dashboard.missions);
  const profiles = useSelector((state: RootState) => state.dashboard.profiles);

  const upcomingMissions = missions.filter(
    (m) => m.status === "profile_proposed"
  );
  const ongoingMissions = missions.filter((m) => m.status === "in_progress");

  const sidebarItems = [
    { label: "Dashboard", href: "/company", icon: "dashboard" },
    { label: "Missions", href: "/company/missions", icon: "list" },
    { label: "Factures", href: "/company/invoices", icon: "receipt" },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      userType="company"
      userName="TechCorp"
    >
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Gérez vos missions et trouvez les meilleurs freelances
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau besoin
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsBlock
            title="Missions actives"
            value={missions.length.toString()}
            description="En cours"
            trend="up"
          />
          <StatsBlock
            title="Profils proposés"
            value={profiles.length.toString()}
            description="En attente de validation"
            trend="neutral"
          />
          <StatsBlock
            title="Taux de matching"
            value="92%"
            description="Derniers 30 jours"
            trend="up"
          />
          <StatsBlock
            title="Budget moyen"
            value="520€"
            description="Par jour"
            trend="neutral"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Prochaines Missions */}
            {upcomingMissions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Prochaines missions
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      Profils proposés
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Missions nécessitant votre validation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {upcomingMissions.map((mission) => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      variant="featured"
                    />
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Missions En Cours */}
            {ongoingMissions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Missions en cours
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      En cours
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Suivi de vos missions actives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ongoingMissions.map((mission) => (
                    <MissionCard key={mission.id} mission={mission} />
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Profils Proposés */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profils proposés</CardTitle>
                <CardDescription>
                  Nouveaux talents sélectionnés pour vous
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profiles.map((profile) => (
                  <div key={profile.id} className="space-y-3">
                    <div className="text-xs text-muted-foreground font-medium">
                      Pour: {profile.missionTitle}
                    </div>
                    <ProfileCard profile={profile} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard;
