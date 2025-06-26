
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import DashboardPreview from "@/components/DashboardPreview";
import Advantages from "@/components/Advantages";
import TechShowcase from "@/components/TechShowcase";
import ClubAlto from "@/components/ClubAlto";
import ClientLogos from "@/components/ClientLogos";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <DashboardPreview />
      <Advantages />
      <TechShowcase />
      <ClubAlto />
      <ClientLogos />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
