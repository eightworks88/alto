
import { useEffect, useState } from "react";

const companies = [
  {
    name: "Alan",
    logo: "https://logo.clearbit.com/alan.com"
  },
  {
    name: "Swile", 
    logo: "https://logo.clearbit.com/swile.co"
  },
  {
    name: "Qonto",
    logo: "https://logo.clearbit.com/qonto.com"
  },
  {
    name: "Station F",
    logo: "https://logo.clearbit.com/stationf.co"
  },
  {
    name: "Deezer",
    logo: "https://logo.clearbit.com/deezer.com"
  },
  {
    name: "Spendesk",
    logo: "https://logo.clearbit.com/spendesk.com"
  },
  {
    name: "Doctolib",
    logo: "https://logo.clearbit.com/doctolib.fr"
  },
  {
    name: "BlaBlaCar",
    logo: "https://logo.clearbit.com/blablacar.com"
  },
  {
    name: "PayFit",
    logo: "https://logo.clearbit.com/payfit.com"
  },
  {
    name: "Back Market",
    logo: "https://logo.clearbit.com/backmarket.com"
  }
];

const ClientLogos = () => {
  return (
    <section className="py-16 px-6 bg-gray-50/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-muted-foreground font-light">Ils nous font confiance</p>
        </div>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-continuous space-x-16 items-center">
            {/* First set */}
            {companies.map((company, index) => (
              <div 
                key={`first-${company.name}`}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`}
                  className="max-h-16 max-w-36 object-contain filter-none"
                  onError={(e) => {
                    // Fallback to text if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-muted-foreground font-medium text-lg">${company.name}</span>`;
                    }
                  }}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {companies.map((company, index) => (
              <div 
                key={`second-${company.name}`}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`}
                  className="max-h-16 max-w-36 object-contain filter-none"
                  onError={(e) => {
                    // Fallback to text if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-muted-foreground font-medium text-lg">${company.name}</span>`;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
