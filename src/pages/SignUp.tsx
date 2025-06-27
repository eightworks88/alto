import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Building2, Github, Mail } from "lucide-react";
import { apiCall } from "@/config/api";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"freelance" | "company">(
    "freelance"
  );
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.fullName.trim()) newErrors.push("Le nom complet est requis");
    if (!formData.email.includes("@")) newErrors.push("Email invalide");
    if (formData.password.length < 8)
      newErrors.push("Le mot de passe doit contenir au moins 8 caractères");
    if (formData.password !== formData.confirmPassword)
      newErrors.push("Les mots de passe ne correspondent pas");
    if (!formData.acceptTerms)
      newErrors.push("Vous devez accepter les conditions générales");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      try {
        const payload = {
          email: formData.email,
          password: formData.password,
          role: userType,
          ...(userType === "company"
            ? {
                companyName: formData.fullName,
                siret: "12345678900012", // À ajouter dans le formulaire si nécessaire
              }
            : {
                firstName: formData.fullName.split(" ")[0] || "",
                lastName: formData.fullName.split(" ")[1] || "",
              }),
        };

        const response = await apiCall("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        // Stocker le token et les infos user
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        toast({
          title: "Inscription réussie",
          description: "Bienvenue sur Alto !",
        });

        // Redirection selon le rôle
        if (response.user.role === "company") {
          navigate("/company");
        } else {
          navigate("/freelance");
        }
      } catch (error) {
        setErrors([
          error instanceof Error
            ? error.message
            : "Erreur lors de l'inscription",
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-display font-bold text-primary">
              Alto
            </h1>
          </Link>
          <p className="text-muted-foreground mt-2">Créez votre compte</p>
        </div>

        <Card className="border-border/50 shadow-lg backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-display">Inscription</CardTitle>
            <CardDescription>
              Choisissez votre type de compte pour commencer
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Type de compte</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={userType === "freelance" ? "default" : "outline"}
                  className="h-16 flex-col gap-2 relative"
                  onClick={() => setUserType("freelance")}
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">Freelance</span>
                  {userType === "freelance" && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      ✓
                    </Badge>
                  )}
                </Button>
                <Button
                  type="button"
                  variant={userType === "company" ? "default" : "outline"}
                  className="h-16 flex-col gap-2 relative"
                  onClick={() => setUserType("company")}
                >
                  <Building2 className="w-5 h-5" />
                  <span className="text-sm">Entreprise</span>
                  {userType === "company" && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      ✓
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  {userType === "freelance"
                    ? "Nom complet"
                    : "Nom de l'entreprise"}
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder={
                    userType === "freelance" ? "John Doe" : "Mon Entreprise SAS"
                  }
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("acceptTerms", checked as boolean)
                  }
                />
                <Label htmlFor="terms" className="text-sm leading-none">
                  J'accepte les{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    conditions générales
                  </Link>
                </Label>
              </div>

              {errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-11 font-medium transition-all duration-200 hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Création...
                  </div>
                ) : (
                  `Créer mon compte ${
                    userType === "freelance" ? "freelance" : "entreprise"
                  }`
                )}
              </Button>
            </form>

            {/* Social Login */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">ou</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-10" disabled>
                  <Mail className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button variant="outline" className="h-10" disabled>
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Déjà inscrit ?{" "}
                <Link
                  to="/signin"
                  className="text-primary hover:underline font-medium"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
