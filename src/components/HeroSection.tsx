import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plane, Search, MapPin, Calendar, Zap, RefreshCw } from "lucide-react";
import heroAirplane from "@/assets/hero-airplane.jpg";
import FlightSearchForm from "./FlightSearchForm";
import FlightSearchResults from "./FlightSearchResults";

interface HeroSectionProps {
  onFlightSearch?: (data: any) => void;
}

const HeroSection = ({ onFlightSearch }: HeroSectionProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);

  const handleSearch = async (data: any) => {
    setIsSearching(true);
    setSearchData(data);
    setShowResults(false);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
      onFlightSearch?.(data);
    }, 2000);
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroAirplane})` }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/30 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-accent-light/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo & Brand */}
        <div className="flex items-center justify-center mb-8 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">SkyFare</h1>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto mb-12 animate-slide-up">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Real-Time
            <span className="block bg-gradient-premium bg-clip-text text-transparent">
              Flight Search
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Search live flights with auto-updating prices. Real airlines, real prices, instant results.
          </p>
        </div>

        {/* Flight Search Form */}
        <div className="max-w-6xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <FlightSearchForm onSearch={handleSearch} isLoading={isSearching} />
        </div>

        {/* Auto Update Toggle */}
        <div className="max-w-4xl mx-auto mt-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <RefreshCw className={`w-5 h-5 text-white ${autoUpdate ? 'animate-spin' : ''}`} />
            <Label htmlFor="auto-update" className="text-white font-medium">
              Auto-update prices every 5 seconds
            </Label>
            <Switch
              id="auto-update"
              checked={autoUpdate}
              onCheckedChange={setAutoUpdate}
              className="data-[state=checked]:bg-accent"
            />
            <Zap className="w-4 h-4 text-accent" />
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-2xl mx-auto mt-12 grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-white/80">Airlines</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1000+</div>
            <div className="text-white/80">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">Live</div>
            <div className="text-white/80">Updates</div>
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      {(showResults || isSearching) && (
        <div className="mt-16 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-12">
            <FlightSearchResults 
              isLoading={isSearching} 
              searchData={searchData} 
              autoUpdate={autoUpdate}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;