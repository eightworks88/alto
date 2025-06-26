
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Euro, Clock } from "lucide-react";

interface Mission {
  id: number;
  title: string;
  status: string;
  budget?: string;
  deadline?: string;
  createdAt?: string;
  company?: string;
  duration?: string;
  skills?: string[];
  urgency?: string;
}

interface MissionCardProps {
  mission: Mission;
  variant?: "default" | "featured";
}

const statusConfig = {
  profile_proposed: { label: "Profil proposé", color: "default" },
  in_progress: { label: "En cours", color: "default" },
  completed: { label: "Terminée", color: "secondary" },
  available: { label: "Disponible", color: "secondary" },
  pending: { label: "En attente", color: "outline" }
};

export const MissionCard = ({ mission, variant = "default" }: MissionCardProps) => {
  const status = statusConfig[mission.status as keyof typeof statusConfig] || statusConfig.pending;
  
  if (variant === "featured") {
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{mission.title}</h3>
            {mission.company && (
              <p className="text-sm text-muted-foreground">chez {mission.company}</p>
            )}
          </div>
          <Badge variant={status.color as any}>{status.label}</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {mission.budget && (
            <div className="flex items-center gap-2">
              <Euro className="h-4 w-4 text-muted-foreground" />
              <span>{mission.budget}</span>
            </div>
          )}
          {mission.deadline && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(mission.deadline).toLocaleDateString('fr-FR')}</span>
            </div>
          )}
          {mission.duration && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{mission.duration}</span>
            </div>
          )}
        </div>

        {mission.skills && (
          <div className="flex flex-wrap gap-2">
            {mission.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm">Voir détails</Button>
          <Button size="sm">Gérer la mission</Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-medium">{mission.title}</h3>
            {mission.company && (
              <p className="text-sm text-muted-foreground">chez {mission.company}</p>
            )}
          </div>
          <Badge variant={status.color as any} className="text-xs">{status.label}</Badge>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          {mission.budget && (
            <div className="flex items-center gap-2">
              <Euro className="h-3 w-3" />
              <span>{mission.budget}</span>
            </div>
          )}
          {mission.deadline && (
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>Échéance: {new Date(mission.deadline).toLocaleDateString('fr-FR')}</span>
            </div>
          )}
          {mission.duration && (
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>{mission.duration}</span>
            </div>
          )}
        </div>

        {mission.skills && (
          <div className="flex flex-wrap gap-1 mt-3">
            {mission.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
            ))}
            {mission.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">+{mission.skills.length - 3}</Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
