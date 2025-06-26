
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Calendar, DollarSign, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const FreelancePayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const payments = [
    {
      id: "PAY-2025-001",
      mission: "Lead Developer Frontend",
      company: "DigitalCorp",
      amount: 11000,
      period: "Janvier 2025",
      status: "paid",
      paidDate: "2025-01-31",
      method: "Virement bancaire"
    },
    {
      id: "PAY-2024-012",
      mission: "Consultant React",
      company: "StartupXYZ",
      amount: 9600,
      period: "Décembre 2024",
      status: "pending",
      paidDate: null,
      method: "Virement bancaire"
    },
    {
      id: "PAY-2024-011",
      mission: "Développeur Full Stack",
      company: "TechCorp",
      amount: 8800,
      period: "Novembre 2024",
      status: "paid",
      paidDate: "2024-11-30",
      method: "Virement bancaire"
    }
  ];

  const bankAccount = {
    iban: "FR14 2004 1010 0505 0001 3M02 606",
    bic: "PSSTFRPPPAR",
    bank: "La Banque Postale"
  };

  const sidebarItems = [
    { label: "Dashboard", href: "/freelance", icon: "dashboard" },
    { label: "Mes missions", href: "/freelance/missions", icon: "list" },
    { label: "Profil", href: "/freelance/profile", icon: "user" },
    { label: "Paiements", href: "/freelance/payments", icon: "wallet" }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: "Payé", variant: "secondary" as const },
      pending: { label: "En attente", variant: "default" as const },
      processing: { label: "En cours", variant: "default" as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.mission.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalEarnings = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = payments
    .filter(payment => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = totalEarnings - paidAmount;

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userType="freelance"
      userName="Marie Dubois"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes paiements</h1>
          <p className="text-muted-foreground">Suivez vos revenus et gérez vos informations bancaires</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenus totaux</p>
                  <p className="text-2xl font-bold">{totalEarnings.toLocaleString('fr-FR')}€</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reçus</p>
                  <p className="text-2xl font-bold text-green-600">{paidAmount.toLocaleString('fr-FR')}€</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En attente</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingAmount.toLocaleString('fr-FR')}€</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Historique des paiements */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Historique des paiements</h2>
            </div>

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher un paiement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="paid">Payés</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="processing">En cours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Liste des paiements */}
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{payment.id}</h3>
                          {getStatusBadge(payment.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {payment.mission} • {payment.company}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Période: {payment.period}
                        </p>
                        {payment.paidDate && (
                          <p className="text-sm text-green-600">
                            Payé le {new Date(payment.paidDate).toLocaleDateString('fr-FR')}
                          </p>
                        )}
                      </div>

                      <div className="text-right space-y-2">
                        <p className="text-2xl font-bold">{payment.amount.toLocaleString('fr-FR')}€</p>
                        <p className="text-sm text-muted-foreground">{payment.method}</p>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Reçu
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPayments.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">Aucun paiement trouvé</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Informations bancaires */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations bancaires</CardTitle>
                <CardDescription>Compte de réception des paiements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Banque</p>
                  <p className="font-medium">{bankAccount.bank}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">IBAN</p>
                  <p className="font-mono text-sm">{bankAccount.iban}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">BIC</p>
                  <p className="font-mono text-sm">{bankAccount.bic}</p>
                </div>

                <Button variant="outline" className="w-full">
                  Modifier les informations
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paramètres de facturation</CardTitle>
                <CardDescription>Informations pour vos factures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Statut</p>
                  <p className="font-medium">Micro-entrepreneur</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SIRET</p>
                  <p className="font-mono text-sm">123 456 789 00012</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">TVA</p>
                  <p className="font-medium">Non applicable</p>
                </div>

                <Button variant="outline" className="w-full">
                  Modifier les paramètres
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FreelancePayments;
