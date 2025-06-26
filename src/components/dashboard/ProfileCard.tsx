
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, Phone, Check } from "lucide-react";

interface Profile {
  id: number;
  name: string;
  rate: string;
  availability: string;
  skills: string[];
  experience: string;
  missionId?: number;
  missionTitle?: string;
}

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold">{profile.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">4.9 • {profile.experience}</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs self-start">Recommandé</Badge>
          </div>

          {/* Rate & Availability */}
          <div className="space-y-2 text-sm">
            <div className="font-medium text-primary">{profile.rate}</div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span className="text-xs">{profile.availability}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1">
            {profile.skills.slice(0, 2).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
            ))}
            {profile.skills.length > 2 && (
              <Badge variant="outline" className="text-xs">+{profile.skills.length - 2}</Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button size="sm" className="flex-1">
              <Check className="h-3 w-3 mr-1" />
              Accepter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
