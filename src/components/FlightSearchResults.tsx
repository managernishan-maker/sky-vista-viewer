import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plane, Clock, Wifi, Utensils, Monitor, RefreshCw, Filter } from "lucide-react";

interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  originalPrice?: number;
  stops: number;
  aircraft: string;
  class: string;
  amenities: string[];
  seats: number;
  priceChange?: number;
  lastUpdated: Date;
}

interface SearchResultsProps {
  isLoading: boolean;
  searchData: any;
  autoUpdate: boolean;
}

const FlightSearchResults = ({ isLoading, searchData, autoUpdate }: SearchResultsProps) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [sortBy, setSortBy] = useState<"price" | "duration" | "departure">("price");

  // Simulate flight data generation
  const generateFlights = () => {
    const airlines = [
      { name: "Nepal Airlines", code: "RA" },
      { name: "Buddha Air", code: "U4" },
      { name: "Yeti Airlines", code: "YT" },
      { name: "Emirates", code: "EK" },
      { name: "Qatar Airways", code: "QR" },
      { name: "Singapore Airlines", code: "SQ" },
      { name: "Thai Airways", code: "TG" },
      { name: "Air India", code: "AI" }
    ];

    const aircraft = ["Boeing 737", "Airbus A320", "Boeing 777", "Airbus A350", "Boeing 787"];
    const amenities = [
      ["Wifi", "Meals", "Entertainment"],
      ["Wifi", "Snacks"],
      ["Meals", "Entertainment", "Extra Legroom"],
      ["Wifi", "Meals", "Entertainment", "Lounge Access"]
    ];

    return Array.from({ length: 8 }, (_, i) => {
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const basePrice = 300 + Math.floor(Math.random() * 1200);
      const priceVariation = Math.floor((Math.random() - 0.5) * 100);
      
      return {
        id: `flight-${i + 1}`,
        airline: airline.name,
        airlineCode: airline.code,
        from: searchData?.from?.split(' ')[0] || "KTM",
        to: searchData?.to?.split(' ')[0] || "JFK",
        departureTime: `${String(6 + Math.floor(Math.random() * 16)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        arrivalTime: `${String(8 + Math.floor(Math.random() * 14)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}${Math.random() > 0.5 ? '+1' : ''}`,
        duration: `${5 + Math.floor(Math.random() * 15)}h ${Math.floor(Math.random() * 60)}m`,
        price: basePrice + priceVariation,
        originalPrice: Math.random() > 0.6 ? basePrice + priceVariation + 150 : undefined,
        stops: Math.floor(Math.random() * 3),
        aircraft: aircraft[Math.floor(Math.random() * aircraft.length)],
        class: searchData?.class || "economy",
        amenities: amenities[Math.floor(Math.random() * amenities.length)],
        seats: 5 + Math.floor(Math.random() * 20),
        priceChange: priceVariation,
        lastUpdated: new Date()
      };
    });
  };

  // Initial load
  useEffect(() => {
    if (searchData && !isLoading) {
      const newFlights = generateFlights();
      setFlights(newFlights);
      setLastUpdate(new Date());
    }
  }, [searchData, isLoading]);

  // Auto-update prices
  useEffect(() => {
    if (!autoUpdate || flights.length === 0) return;

    const interval = setInterval(() => {
      setFlights(prevFlights => 
        prevFlights.map(flight => {
          const priceChange = Math.floor((Math.random() - 0.5) * 50);
          return {
            ...flight,
            price: Math.max(200, flight.price + priceChange),
            priceChange: priceChange,
            lastUpdated: new Date()
          };
        })
      );
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [autoUpdate, flights.length]);

  // Sort flights
  const sortedFlights = [...flights].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "duration":
        return parseInt(a.duration) - parseInt(b.duration);
      case "departure":
        return a.departureTime.localeCompare(b.departureTime);
      default:
        return 0;
    }
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi": return <Wifi className="w-4 h-4" />;
      case "meals": return <Utensils className="w-4 h-4" />;
      case "entertainment": return <Monitor className="w-4 h-4" />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex justify-between items-center">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-60" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!searchData || flights.length === 0) {
    return (
      <div className="text-center py-12">
        <Plane className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Search for Flights</h3>
        <p className="text-muted-foreground">Use the search form above to find available flights</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {searchData.from.split(' ')[0]} → {searchData.to.split(' ')[0]}
          </h2>
          <p className="text-muted-foreground">
            {flights.length} flights found • Last updated: {lastUpdate.toLocaleTimeString()}
            {autoUpdate && (
              <span className="ml-2 inline-flex items-center">
                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                Auto-updating
              </span>
            )}
          </p>
        </div>
        
        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="price">Sort by Price</option>
            <option value="duration">Sort by Duration</option>
            <option value="departure">Sort by Departure</option>
          </select>
        </div>
      </div>

      {/* Flight Results */}
      <div className="space-y-4">
        {sortedFlights.map((flight, index) => (
          <Card 
            key={flight.id} 
            className={`p-6 shadow-card hover:shadow-premium transition-all duration-300 animate-slide-up ${
              flight.priceChange && flight.priceChange < 0 ? 'ring-2 ring-green-200' : 
              flight.priceChange && flight.priceChange > 0 ? 'ring-2 ring-red-200' : ''
            }`} 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Flight Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Plane className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{flight.airline}</h3>
                      <p className="text-sm text-muted-foreground">{flight.airlineCode} • {flight.aircraft}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {flight.stops === 0 && (
                      <Badge variant="default" className="bg-green-600">Direct</Badge>
                    )}
                    <Badge variant="outline" className="capitalize">{flight.class}</Badge>
                    {flight.priceChange && (
                      <Badge variant={flight.priceChange < 0 ? "default" : "destructive"} className="text-xs">
                        {flight.priceChange < 0 ? '↓' : '↑'} ${Math.abs(flight.priceChange)}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{flight.departureTime}</p>
                    <p className="text-sm text-muted-foreground font-medium">{flight.from}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{flight.duration}</span>
                    </div>
                    <div className="w-full h-px bg-border relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary w-2 h-2 rounded-full" />
                      {flight.stops > 0 && (
                        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-muted-foreground w-1 h-1 rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{flight.arrivalTime}</p>
                    <p className="text-sm text-muted-foreground font-medium">{flight.to}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {flight.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center space-x-1">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                  <span>• {flight.seats} seats left</span>
                </div>
              </div>

              {/* Price & Booking */}
              <div className="lg:text-right">
                <div className="mb-4">
                  {flight.originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">
                      ${flight.originalPrice}
                    </p>
                  )}
                  <div className="flex items-baseline justify-end space-x-1">
                    <span className="text-3xl font-bold text-primary">
                      ${flight.price}
                    </span>
                    <span className="text-sm text-muted-foreground">per person</span>
                  </div>
                  {flight.originalPrice && (
                    <Badge variant="destructive" className="mt-2">
                      Save ${flight.originalPrice - flight.price}
                    </Badge>
                  )}
                </div>
                <Button variant="hero" size="lg" className="w-full lg:w-auto">
                  Select Flight
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Updated: {flight.lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightSearchResults;