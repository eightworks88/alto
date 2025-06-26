
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Eye, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const CompanyInvoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const invoices = [
    {
      id: "INV-2025-001",
      mission: "Développeur React Senior",
      freelance: "Marie Dubois",
      amount: 11000,
      period: "Janvier 2025",
      status: "paid",
      dueDate: "2025-01-31",
      paidDate: "2025-01-28"
    },
    {
      id: "INV-2024-012",
      mission: "Designer UX/UI",
      freelance: "Thomas Martin",
      amount: 9600,
      period: "Décembre 2024",
      status: "pending",
      dueDate: "2025-01-15",
      paidDate: null
    },
    {
      id: "INV-2024-011",
      mission: "Consultant DevOps",
      freelance: "Lucas Bernard",
      amount: 12000,
      period: "Novembre 2024",
      status: "paid",
      dueDate: "2024-12-31",
      paidDate: "2024-12-28"
    },
    {
      id: "INV-2024-010",
      mission: "Data Scientist",
      freelance: "Sophie Leroy",
      amount: 10400,
      period: "Octobre 2024",
      status: "overdue",
      dueDate: "2024-11-30",
      paidDate: null
    }
  ];

  const sidebarItems = [
    { label: "Dashboard", href: "/company", icon: "dashboard" },
    { label: "Poster un besoin", href: "/company/post-need", icon: "plus" },
    { label: "Missions", href: "/company/missions", icon: "list" },
    { label: "Factures", href: "/company/invoices", icon: "receipt" }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: "Payée", variant: "secondary" as const },
      pending: { label: "En attente", variant: "default" as const },
      overdue: { label: "En retard", variant: "destructive" as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.mission.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.freelance.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = filteredInvoices
    .filter(invoice => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems}
      userType="company"
      userName="TechCorp"
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Factures</h1>
          <p className="text-muted-foreground">Gérez vos factures et paiements</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{totalAmount.toLocaleString('fr-FR')}€</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">€</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payé</p>
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
                  <span className="text-orange-600 font-bold">⏳</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher une facture..."
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
              <SelectItem value="paid">Payées</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="overdue">En retard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Liste des factures */}
        <div className="grid gap-4">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{invoice.id}</h3>
                      {getStatusBadge(invoice.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {invoice.mission} • {invoice.freelance}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Période: {invoice.period}
                    </p>
                  </div>

                  <div className="text-right space-y-2">
                    <p className="text-2xl font-bold">{invoice.amount.toLocaleString('fr-FR')}€</p>
                    <p className="text-sm text-muted-foreground">
                      Échéance: {new Date(invoice.dueDate).toLocaleDateString('fr-FR')}
                    </p>
                    {invoice.paidDate && (
                      <p className="text-sm text-green-600">
                        Payée le {new Date(invoice.paidDate).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInvoices.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Aucune facture trouvée</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CompanyInvoices;
