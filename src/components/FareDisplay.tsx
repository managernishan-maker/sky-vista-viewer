import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, Zap, Star } from "lucide-react";

interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  originalPrice?: number;
  stops: number;
  aircraft: string;
  class: "Economy" | "Business" | "First";
  popular?: boolean;
}

const FareDisplay = () => {
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: "1",
      airline: "SkyLine Airways",
      from: "NYC",
      to: "NRT",
      departure: "14:30",
      arrival: "18:45+1",
      duration: "14h 15m",
      price: 899,
      originalPrice: 1299,
      stops: 1,
      aircraft: "Boeing 787",
      class: "Economy",
      popular: true
    },
    {
      id: "2",
      airline: "Pacific Express",
      from: "NYC",
      to: "NRT",
      departure: "22:15",
      arrival: "02:30+2",
      duration: "16h 15m",
      price: 1249,
      stops: 0,
      aircraft: "Airbus A350",
      class: "Business"
    },
    {
      id: "3",
      airline: "Global Wings",
      from: "NYC",
      to: "NRT",
      departure: "08:45",
      arrival: "12:30+1",
      duration: "15h 45m",
      price: 749,
      originalPrice: 999,
      stops: 1,
      aircraft: "Boeing 777",
      class: "Economy"
    }
  ]);

  const [updating, setUpdating] = useState(false);

  // Auto-update prices simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdating(true);
      setTimeout(() => {
        setFlights(prev => prev.map(flight => ({
          ...flight,
          price: Math.floor(flight.price + (Math.random() - 0.5) * 100)
        })));
        setUpdating(false);
      }, 1000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-cloud">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-accent mr-2" />
            <Badge variant="secondary" className="px-4 py-2">
              Auto-Updating Fares
            </Badge>
          </div>
          <h2 className="text-4xl font-bold mb-4">Live Flight Prices</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our intelligent system continuously monitors and updates flight prices to bring you the best deals
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {flights.map((flight, index) => (
            <Card key={flight.id} className={`p-6 shadow-card transition-all duration-500 hover:shadow-premium ${updating ? 'animate-pulse' : 'animate-slide-up'}`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Flight Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Plane className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{flight.airline}</h3>
                        <p className="text-sm text-muted-foreground">{flight.aircraft}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {flight.popular && (
                        <Badge variant="default" className="bg-accent text-accent-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      <Badge variant="outline">{flight.class}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{flight.departure}</p>
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
                      <p className="text-2xl font-bold">{flight.arrival}</p>
                      <p className="text-sm text-muted-foreground font-medium">{flight.to}</p>
                    </div>
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
                  <Button variant={flight.popular ? "hero" : "default"} size="lg" className="w-full lg:w-auto">
                    Select Flight
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View More Flights
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FareDisplay;