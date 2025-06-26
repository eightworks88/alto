
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const CompanyPostNeed = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    duration: "",
    urgency: "",
    location: ""
  });

  const sidebarItems = [
    { label: "Dashboard", href: "/company", icon: "dashboard" },
    { label: "Poster un besoin", href: "/company/post-need", icon: "plus" },
    { label: "Missions", href: "/company/missions", icon: "list" },
    { label: "Factures", href: "/company/invoices", icon: "receipt" }
  ];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mission postée:", { ...formData, skills });
    // Logique de soumission
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userType="company"
      userName="TechCorp"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Poster un besoin</h1>
          <p className="text-muted-foreground">Décrivez votre mission pour trouver le freelance idéal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de la mission</CardTitle>
                  <CardDescription>Décrivez votre besoin en détail</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titre de la mission</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Ex: Développeur React Senior"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Décrivez en détail la mission, les objectifs et les livrables attendus..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Budget (€/jour)</Label>
                      <Input
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        placeholder="Ex: 500-600"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="duration">Durée</Label>
                      <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
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
                      <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
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
                      <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
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
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" onClick={addSkill} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="gap-1">
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
                  <CardDescription>Votre mission apparaîtra ainsi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{formData.title || "Titre de la mission"}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.description ? formData.description.substring(0, 100) + "..." : "Description de la mission..."}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget:</span>
                      <span className="font-medium">{formData.budget || "Non défini"}€/jour</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Durée:</span>
                      <span className="font-medium">{formData.duration || "Non définie"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Urgence:</span>
                      <Badge variant={formData.urgency === 'high' ? 'destructive' : 'secondary'}>
                        {formData.urgency || "Non définie"}
                      </Badge>
                    </div>
                  </div>

                  {skills.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Compétences:</p>
                      <div className="flex flex-wrap gap-1">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Publier la mission
                </Button>
                <Button type="button" variant="outline" className="w-full">
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
