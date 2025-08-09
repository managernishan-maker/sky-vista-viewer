import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import FareDisplay from "@/components/FareDisplay";
import PopularDestinations from "@/components/PopularDestinations";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  const [currentSearch, setCurrentSearch] = useState<any>(null);

  const handleFlightSearch = (searchData: any) => {
    setCurrentSearch(searchData);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onFlightSearch={handleFlightSearch} />
      {!currentSearch && (
        <>
          <FareDisplay />
          <PopularDestinations />
          <Features />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Index;
