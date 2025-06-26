
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, User, Settings, LogOut } from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: Array<{
    label: string;
    href: string;
    icon: string;
  }>;
  userType: "company" | "freelance";
  userName: string;
}

export const DashboardLayout = ({ 
  children, 
  sidebarItems, 
  userType, 
  userName 
}: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <DashboardSidebar items={sidebarItems} userType={userType} />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <DashboardSidebar items={sidebarItems} userType={userType} />
            </SheetContent>
          </Sheet>
          
          <div className="text-xl font-bold">Alto</div>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between h-16 px-8 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div></div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">
                  {userType === "company" ? "Entreprise" : "Freelance"}
                </p>
              </div>
              <Badge variant={userType === "company" ? "default" : "secondary"}>
                {userType === "company" ? "💼" : "👨‍💻"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
