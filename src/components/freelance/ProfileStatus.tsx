
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export const ProfileStatus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Statut du profil
          <Badge variant="default" className="bg-green-100 text-green-800 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Validé Alto
          </Badge>
        </CardTitle>
        <CardDescription>Votre visibilité sur la plateforme</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Profil complet</span>
          <Badge variant="default">95%</Badge>
        </div>
        <div className="space-y-2">
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-[95%]" />
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Photo de profil</span>
            <Badge variant="outline" className="text-green-600">✓</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Compétences</span>
            <Badge variant="outline" className="text-green-600">✓</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Portfolio</span>
            <Badge variant="secondary">À compléter</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Tests de compétences</span>
            <Badge variant="outline" className="text-green-600">✓</Badge>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Compléter le profil
        </Button>
      </CardContent>
    </Card>
  );
};
