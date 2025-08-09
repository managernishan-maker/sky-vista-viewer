import HeroSection from "@/components/HeroSection";
import FareDisplay from "@/components/FareDisplay";
import PopularDestinations from "@/components/PopularDestinations";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FareDisplay />
      <PopularDestinations />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
