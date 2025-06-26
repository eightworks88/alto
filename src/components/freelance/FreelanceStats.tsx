
import { StatsBlock } from "@/components/dashboard/StatsBlock";

export const FreelanceStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatsBlock 
        title="Missions actives"
        value="1"
        description="En cours"
        trend="neutral"
      />
      <StatsBlock 
        title="Missions disponibles"
        value="2"
        description="Nouvelles opportunités"
        trend="up"
      />
      <StatsBlock 
        title="Taux de matching"
        value="94%"
        description="Profil/missions"
        trend="up"
      />
      <StatsBlock 
        title="Gain estimé"
        value="12,500€"
        description="Ce mois-ci"
        trend="up"
      />
    </div>
  );
};
