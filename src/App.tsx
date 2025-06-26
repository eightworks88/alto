import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyPostNeed from "./pages/CompanyPostNeed";
import CompanyMissions from "./pages/CompanyMissions";
import CompanyInvoices from "./pages/CompanyInvoices";
import FreelanceDashboard from "./pages/FreelanceDashboard";
import FreelanceMissions from "./pages/FreelanceMissions";
import FreelanceProfile from "./pages/FreelanceProfile";
import FreelancePayments from "./pages/FreelancePayments";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { Provider } from "react-redux";
import { store } from "./store/store";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/company" element={<CompanyDashboard />} />
            <Route path="/company/post-need" element={<CompanyPostNeed />} />
            <Route path="/company/missions" element={<CompanyMissions />} />
            <Route path="/company/invoices" element={<CompanyInvoices />} />
            <Route path="/freelance" element={<FreelanceDashboard />} />
            <Route path="/freelance/missions" element={<FreelanceMissions />} />
            <Route path="/freelance/profile" element={<FreelanceProfile />} />
            <Route path="/freelance/payments" element={<FreelancePayments />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
