import { Button } from "@/components/ui/button";
import { Plane, Search, MapPin, Calendar } from "lucide-react";
import heroAirplane from "@/assets/hero-airplane.jpg";

const HeroSection = () => {
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
            Find Your
            <span className="block bg-gradient-premium bg-clip-text text-transparent">
              Perfect Flight
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover amazing flight deals with our auto fare system. Best prices, instant booking, worldwide destinations.
          </p>
        </div>

        {/* Quick Search Card */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-premium animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-semibold">New York</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-semibold">Tokyo</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Departure</p>
                <p className="font-semibold">Dec 25</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Return</p>
                <p className="font-semibold">Jan 5</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="flex-1">
              <Search className="w-5 h-5" />
              Search Flights
            </Button>
            <Button variant="outline" size="lg">
              Advanced Search
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-2xl mx-auto mt-12 grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-white/80">Airlines</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1000+</div>
            <div className="text-white/80">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/80">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;