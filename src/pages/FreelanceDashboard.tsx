import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ActiveMissionCard } from "@/components/freelance/ActiveMissionCard";
import { AvailableMissionsList } from "@/components/freelance/AvailableMissionsList";
import { FreelanceHeader } from "@/components/freelance/FreelanceHeader";
import { FreelanceStats } from "@/components/freelance/FreelanceStats";
import { ProfileStatus } from "@/components/freelance/ProfileStatus";
import { useFreelanceDashboard } from "@/hooks/useFreelanceData";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const FreelanceDashboard = () => {
  // Utilisation de Redux et React Query
  const { isLoading, error } = useFreelanceDashboard();
  const availableMissions = useSelector(
    (state: RootState) => state.freelance.availableMissions
  );
  const activeMissions = useSelector(
    (state: RootState) => state.freelance.activeMissions
  );
  const stats = useSelector((state: RootState) => state.freelance.stats);

  const sidebarItems = [
    { label: "Dashboard", href: "/freelance", icon: "dashboard" },
    { label: "Mes missions", href: "/freelance/missions", icon: "list" },
    { label: "Profil", href: "/freelance/profile", icon: "user" },
    { label: "Paiements", href: "/freelance/payments", icon: "wallet" },
  ];

  if (isLoading) {
    return (
      <DashboardLayout
        sidebarItems={sidebarItems}
        userType="freelance"
        userName="Marie Dubois"
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Chargement du dashboard...</p>
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
        <FreelanceHeader />
        <FreelanceStats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ActiveMissionCard missions={activeMissions} />
            <AvailableMissionsList missions={availableMissions} />
          </div>

          <div className="space-y-6">
            <ProfileStatus />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FreelanceDashboard;
