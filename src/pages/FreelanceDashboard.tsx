
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FreelanceHeader } from "@/components/freelance/FreelanceHeader";
import { FreelanceStats } from "@/components/freelance/FreelanceStats";
import { ActiveMissionCard } from "@/components/freelance/ActiveMissionCard";
import { AvailableMissionsList } from "@/components/freelance/AvailableMissionsList";
import { ProfileStatus } from "@/components/freelance/ProfileStatus";

const FreelanceDashboard = () => {
  const [availableMissions] = useState([
    {
      id: 1,
      title: "Développeur React Senior",
      company: "TechCorp",
      budget: "550€/jour",
      duration: "3 mois",
      status: "available",
      skills: ["React", "TypeScript", "Node.js"],
      urgency: "high"
    },
    {
      id: 2,
      title: "Consultant DevOps",
      company: "StartupXYZ", 
      budget: "600€/jour",
      duration: "6 mois",
      status: "available",
      skills: ["AWS", "Docker", "Kubernetes"],
      urgency: "medium"
    }
  ]);

  const [activeMissions] = useState([
    {
      id: 3,
      title: "Lead Developer Frontend",
      company: "DigitalCorp",
      status: "in_progress",
      progress: 65,
      endDate: "2025-02-15"
    }
  ]);

  const sidebarItems = [
    { label: "Dashboard", href: "/freelance", icon: "dashboard" },
    { label: "Mes missions", href: "/freelance/missions", icon: "list" },
    { label: "Profil", href: "/freelance/profile", icon: "user" },
    { label: "Paiements", href: "/freelance/payments", icon: "wallet" }
  ];

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userType="freelance"
      userName="Marie Dubois"
    >
      <div className="space-y-8">
        <FreelanceHeader />
        <FreelanceStats />

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
