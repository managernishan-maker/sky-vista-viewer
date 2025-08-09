import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Plane } from "lucide-react";

interface Destination {
  id: string;
  city: string;
  country: string;
  price: number;
  discount?: number;
  trending?: boolean;
  image: string;
  description: string;
}

const PopularDestinations = () => {
  const destinations: Destination[] = [
    {
      id: "1",
      city: "Tokyo",
      country: "Japan",
      price: 899,
      discount: 30,
      trending: true,
      image: "🏯",
      description: "Experience ancient traditions and modern innovation"
    },
    {
      id: "2",
      city: "Paris",
      country: "France",
      price: 649,
      image: "🗼",
      description: "The city of love and timeless elegance"
    },
    {
      id: "3",
      city: "Dubai",
      country: "UAE",
      price: 799,
      discount: 25,
      image: "🏙️",
      description: "Luxury shopping and architectural marvels"
    },
    {
      id: "4",
      city: "London",
      country: "UK",
      price: 599,
      trending: true,
      image: "🎡",
      description: "Rich history meets vibrant culture"
    },
    {
      id: "5",
      city: "Sydney",
      country: "Australia",
      price: 1299,
      image: "🏛️",
      description: "Stunning harbors and beautiful beaches"
    },
    {
      id: "6",
      city: "Bangkok",
      country: "Thailand",
      price: 749,
      discount: 20,
      image: "🛕",
      description: "Street food paradise and golden temples"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-primary mr-2" />
            <Badge variant="outline" className="px-4 py-2">
              Top Destinations
            </Badge>
          </div>
          <h2 className="text-4xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the world's most amazing destinations with unbeatable flight deals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {destinations.map((destination, index) => (
            <Card key={destination.id} className="group overflow-hidden shadow-card hover:shadow-premium transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative">
                <div className="h-48 bg-gradient-sky flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {destination.image}
                </div>
                {destination.trending && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {destination.discount && (
                  <Badge variant="destructive" className="absolute top-4 right-4">
                    {destination.discount}% OFF
                  </Badge>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h3 className="text-xl font-bold">{destination.city}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">{destination.country}</span>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm">
                  {destination.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">From</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-primary">
                        ${destination.price}
                      </span>
                    </div>
                  </div>
                  <Button variant="sky" size="sm">
                    <Plane className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            Explore All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;