
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AvailableMission {
  id: number;
  title: string;
  company: string;
  budget: string;
  duration: string;
  status: string;
  skills: string[];
  urgency: string;
}

interface AvailableMissionsListProps {
  missions: AvailableMission[];
}

export const AvailableMissionsList = ({ missions }: AvailableMissionsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nouvelles opportunités</CardTitle>
        <CardDescription>Missions recommandées pour votre profil</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {missions.map((mission) => (
          <div key={mission.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{mission.title}</h3>
                <p className="text-sm text-muted-foreground">chez {mission.company}</p>
              </div>
              <Badge variant={mission.urgency === 'high' ? 'destructive' : 'secondary'}>
                {mission.urgency === 'high' ? 'Urgent' : 'Normal'}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {mission.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">{mission.budget}</span> • {mission.duration}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Refuser</Button>
                <Button size="sm">Accepter</Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
