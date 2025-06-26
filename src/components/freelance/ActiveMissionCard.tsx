
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ActiveMission {
  id: number;
  title: string;
  company: string;
  status: string;
  progress: number;
  endDate: string;
}

interface ActiveMissionCardProps {
  missions: ActiveMission[];
}

export const ActiveMissionCard = ({ missions }: ActiveMissionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mission en cours</CardTitle>
        <CardDescription>Votre mission active du moment</CardDescription>
      </CardHeader>
      <CardContent>
        {missions.map((mission) => (
          <div key={mission.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{mission.title}</h3>
                <p className="text-sm text-muted-foreground">chez {mission.company}</p>
              </div>
              <Badge variant="default">En cours</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
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
            <p className="text-sm text-muted-foreground">
              Fin prévue : {new Date(mission.endDate).toLocaleDateString('fr-FR')}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
