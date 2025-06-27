import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { ArrowRight, Github, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.email.includes("@")) newErrors.push("Email invalide");
    if (formData.password.length < 6)
      newErrors.push("Le mot de passe doit contenir au moins 6 caractères");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Connexion:", formData);
        setIsLoading(false);
        // Handle authentication logic here
        // Redirect based on user type
      }, 1000);
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
          <p className="text-muted-foreground mt-2">
            Connectez-vous à votre compte
          </p>
        </div>

        <Card className="border-border/50 shadow-lg backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-display">Connexion</CardTitle>
            <CardDescription>Accédez à votre espace personnel</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="transition-all duration-200 focus:scale-[1.02]"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="transition-all duration-200 focus:scale-[1.02]"
                  autoComplete="current-password"
                />
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
                    Connexion...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Se connecter
                    <ArrowRight className="w-4 h-4" />
                  </div>
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
                <Button variant="outline" className="h-10">
                  <Mail className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button variant="outline" className="h-10">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Pas encore inscrit ?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:underline font-medium"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            En vous connectant, vous acceptez nos{" "}
            <Link to="/terms" className="text-primary hover:underline">
              conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
