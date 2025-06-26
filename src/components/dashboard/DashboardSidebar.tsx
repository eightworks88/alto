
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Plus, 
  FileText, 
  Receipt, 
  User, 
  Wallet,
  Building2,
  Users
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  userType: "company" | "freelance";
}

const iconMap = {
  dashboard: LayoutDashboard,
  plus: Plus,
  list: FileText,
  receipt: Receipt,
  user: User,
  wallet: Wallet,
};

export const DashboardSidebar = ({ items, userType }: DashboardSidebarProps) => {
  return (
    <div className="flex flex-col h-full bg-card border-r">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">A</span>
        </div>
        <div>
          <h1 className="font-bold text-lg">Alto</h1>
          <p className="text-xs text-muted-foreground">
            {userType === "company" ? "Dashboard Entreprise" : "Dashboard Freelance"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`
              }
            >
              {IconComponent && <IconComponent className="h-4 w-4" />}
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Status Badge */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg">
          {userType === "company" ? (
            <Building2 className="h-4 w-4 text-primary" />
          ) : (
            <Users className="h-4 w-4 text-primary" />
          )}
          <div className="flex-1 text-xs">
            <p className="font-medium">
              {userType === "company" ? "Compte Entreprise" : "Profil Freelance"}
            </p>
            <p className="text-muted-foreground">
              {userType === "company" ? "Plan Premium" : "Vérifié"}
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {userType === "company" ? "Pro" : "✓"}
          </Badge>
        </div>
      </div>
    </div>
  );
};
