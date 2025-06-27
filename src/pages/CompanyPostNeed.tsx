import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useMissionsData } from "@/hooks/useMissionsData";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MissionFormData {
  title: string;
  description: string;
  budget: string;
  duration: string;
  urgency: string;
  location: string;
}

const CompanyPostNeed = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createMission, isCreating } = useMissionsData();

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [formData, setFormData] = useState<MissionFormData>({
    title: "",
    description: "",
    budget: "",
    duration: "",
    urgency: "",
    location: "",
  });

  const sidebarItems = [
    { label: "Dashboard", href: "/company", icon: "dashboard" },
    { label: "Poster un besoin", href: "/company/post-need", icon: "plus" },
    { label: "Missions", href: "/company/missions", icon: "list" },
    { label: "Factures", href: "/company/invoices", icon: "receipt" },
  ];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description || !formData.budget) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    try {
      await createMission({
        ...formData,
        skills,
        status: "published",
      });

      toast({
        title: "Succès",
        description: "Mission créée avec succès",
      });

      navigate("/company/missions");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la mission",
        variant: "destructive",
      });
    }
  };

  const handleSaveDraft = async () => {
    try {
      await createMission({
        ...formData,
        skills,
        status: "draft",
      });

      toast({
        title: "Succès",
        description: "Brouillon sauvegardé",
      });

      navigate("/company/missions");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le brouillon",
        variant: "destructive",
      });
    }
  };

  const handleInputChange =
    (field: keyof MissionFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSelectChange =
    (field: keyof MissionFormData) => (value: string) => {
      setFormData({ ...formData, [field]: value });
    };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      userType="company"
      userName="TechCorp"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Poster un besoin
          </h1>
          <p className="text-muted-foreground">
            Décrivez votre mission pour trouver le freelance idéal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de la mission</CardTitle>
                  <CardDescription>
                    Décrivez votre besoin en détail
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titre de la mission *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange("title")}
                      placeholder="Ex: Développeur React Senior"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange("description")}
                      placeholder="Décrivez en détail la mission, les objectifs et les livrables attendus..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Budget (€/jour) *</Label>
                      <Input
                        id="budget"
                        value={formData.budget}
                        onChange={handleInputChange("budget")}
                        placeholder="Ex: 500-600"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="duration">Durée</Label>
                      <Select
                        value={formData.duration}
                        onValueChange={handleSelectChange("duration")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner la durée" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-month">1 mois</SelectItem>
                          <SelectItem value="3-months">3 mois</SelectItem>
                          <SelectItem value="6-months">6 mois</SelectItem>
                          <SelectItem value="1-year">1 an</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="urgency">Urgence</Label>
                      <Select
                        value={formData.urgency}
                        onValueChange={handleSelectChange("urgency")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Niveau d'urgence" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Faible</SelectItem>
                          <SelectItem value="medium">Moyenne</SelectItem>
                          <SelectItem value="high">Élevée</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Localisation</Label>
                      <Select
                        value={formData.location}
                        onValueChange={handleSelectChange("location")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Mode de travail" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">100% Remote</SelectItem>
                          <SelectItem value="hybrid">Hybride</SelectItem>
                          <SelectItem value="onsite">Sur site</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Compétences requises</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Ajouter une compétence"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button type="button" onClick={addSkill} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="gap-1"
                        >
                          {skill}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => removeSkill(skill)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Aperçu */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Aperçu</CardTitle>
                  <CardDescription>
                    Votre mission apparaîtra ainsi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">
                      {formData.title || "Titre de la mission"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.description
                        ? formData.description.substring(0, 100) + "..."
                        : "Description de la mission..."}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget:</span>
                      <span className="font-medium">
                        {formData.budget || "Non défini"}€/jour
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Durée:</span>
                      <span className="font-medium">
                        {formData.duration === "1-month" && "1 mois"}
                        {formData.duration === "3-months" && "3 mois"}
                        {formData.duration === "6-months" && "6 mois"}
                        {formData.duration === "1-year" && "1 an"}
                        {!formData.duration && "Non définie"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Urgence:</span>
                      <Badge
                        variant={
                          formData.urgency === "high"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {formData.urgency === "low" && "Faible"}
                        {formData.urgency === "medium" && "Moyenne"}
                        {formData.urgency === "high" && "Élevée"}
                        {!formData.urgency && "Non définie"}
                      </Badge>
                    </div>
                  </div>

                  {skills.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Compétences:</p>
                      <div className="flex flex-wrap gap-1">
                        {skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isCreating}>
                  {isCreating && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Publier la mission
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleSaveDraft}
                  disabled={isCreating}
                >
                  Sauvegarder en brouillon
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CompanyPostNeed;
