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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useFreelanceProfile } from "@/hooks/useFreelanceProfile";
import type { RootState } from "@/store/store";
import { Camera, Loader2, Plus, Star, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  bio: string;
  rate: string;
  location: string;
  experience: string;
  availability: string;
}

const FreelanceProfile = () => {
  const { toast } = useToast();
  const { isLoading, error, updateProfile, isUpdating } = useFreelanceProfile();
  const profile = useSelector((state: RootState) => state.freelance.profile);

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [profileData, setProfileData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "",
    bio: "",
    rate: "",
    location: "",
    experience: "",
    availability: "",
  });

  // TODO: Ces données devraient venir du backend
  const portfolio = [
    {
      id: 1,
      title: "Application E-commerce",
      description: "Développement d'une plateforme e-commerce complète",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://exemple.com",
    },
    {
      id: 2,
      title: "Dashboard Analytics",
      description: "Interface de visualisation de données en temps réel",
      technologies: ["React", "D3.js", "TypeScript"],
      link: "https://exemple.com",
    },
  ];

  const reviews = [
    {
      id: 1,
      client: "TechCorp",
      rating: 5,
      comment:
        "Excellent développeur, très professionnel et livraison dans les temps.",
      project: "Refonte application web",
      date: "2024-12-15",
    },
    {
      id: 2,
      client: "StartupXYZ",
      rating: 5,
      comment:
        "Code de qualité, communication parfaite tout au long du projet.",
      project: "Développement MVP",
      date: "2024-11-20",
    },
  ];

  // Charger les données du profil depuis Redux
  useEffect(() => {
    if (profile) {
      setProfileData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        title: profile.title || "",
        bio: profile.bio || "",
        rate: profile.rate || "",
        location: profile.location || "",
        experience: profile.experience || "",
        availability: profile.availability || "",
      });
      setSkills(profile.skills || []);
      setIsAvailable(profile.isAvailable ?? true);
    }
  }, [profile]);

  const sidebarItems = [
    { label: "Dashboard", href: "/freelance", icon: "dashboard" },
    { label: "Mes missions", href: "/freelance/missions", icon: "list" },
    { label: "Profil", href: "/freelance/profile", icon: "user" },
    { label: "Paiements", href: "/freelance/payments", icon: "wallet" },
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

  const handleInputChange =
    (field: keyof ProfileFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProfileData({ ...profileData, [field]: e.target.value });
    };

  const handleSelectChange =
    (field: keyof ProfileFormData) => (value: string) => {
      setProfileData({ ...profileData, [field]: value });
    };

  const handleSave = async () => {
    try {
      await updateProfile({
        ...profileData,
        skills,
        isAvailable,
      });

      toast({
        title: "Succès",
        description: "Profil mis à jour avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpload = () => {
    // TODO: Implémenter l'upload de photo
    console.log("Upload photo");
  };

  if (isLoading) {
    return (
      <DashboardLayout
        sidebarItems={sidebarItems}
        userType="freelance"
        userName="Marie Dubois"
      >
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Chargement du profil...</p>
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mon profil</h1>
            <p className="text-muted-foreground">
              Gérez vos informations professionnelles
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                Visible aux entreprises
              </span>
              <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
            </div>
            <Button onClick={handleSave} disabled={isUpdating}>
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sauvegarder
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Vos informations de base</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePhotoUpload}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Changer la photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange("firstName")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange("lastName")}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Titre professionnel</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={handleInputChange("title")}
                    placeholder="Ex: Développeur React Senior"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={handleInputChange("bio")}
                    placeholder="Décrivez votre expérience et vos spécialités..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange("email")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={handleInputChange("phone")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations professionnelles</CardTitle>
                <CardDescription>Tarifs et disponibilité</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="rate">Tarif journalier (€)</Label>
                    <Input
                      id="rate"
                      value={profileData.rate}
                      onChange={handleInputChange("rate")}
                      placeholder="550"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Expérience (années)</Label>
                    <Input
                      id="experience"
                      value={profileData.experience}
                      onChange={handleInputChange("experience")}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Localisation</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={handleInputChange("location")}
                      placeholder="Paris, France"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="availability">Disponibilité</Label>
                  <Select
                    value={profileData.availability}
                    onValueChange={handleSelectChange("availability")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner votre disponibilité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disponible immédiatement">
                        Disponible immédiatement
                      </SelectItem>
                      <SelectItem value="Disponible dans 1 semaine">
                        Disponible dans 1 semaine
                      </SelectItem>
                      <SelectItem value="Disponible dans 2 semaines">
                        Disponible dans 2 semaines
                      </SelectItem>
                      <SelectItem value="Disponible dans 1 mois">
                        Disponible dans 1 mois
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compétences</CardTitle>
                <CardDescription>
                  Vos technologies et expertises
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
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
                  <Button type="button" onClick={addSkill}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
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
              </CardContent>
            </Card>
          </div>

          {/* Sidebar droite */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aperçu du profil</CardTitle>
                <CardDescription>
                  Votre profil vu par les entreprises
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {profileData.title}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tarif:</span>
                    <span className="font-medium">
                      {profileData.rate}€/jour
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expérience:</span>
                    <span className="font-medium">
                      {profileData.experience} ans
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Localisation:</span>
                    <span className="font-medium">{profileData.location}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Compétences:</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{skills.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Évaluations</CardTitle>
                <CardDescription>Retours de vos clients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">5.0</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {reviews.length} évaluations
                  </p>
                </div>

                {reviews.slice(0, 2).map((review) => (
                  <div
                    key={review.id}
                    className="border-t pt-4 first:border-t-0 first:pt-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">{review.client}</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {review.project}
                    </p>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FreelanceProfile;
