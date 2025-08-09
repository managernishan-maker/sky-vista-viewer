import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Clock, Globe, CreditCard, Headphones } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Auto Price Updates",
      description: "Our intelligent system monitors prices 24/7 and automatically finds the best deals for you",
      badge: "Smart Technology"
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Book with confidence using our secure payment system and comprehensive travel protection",
      badge: "Protected"
    },
    {
      icon: Clock,
      title: "Instant Confirmation",
      description: "Get immediate booking confirmation and e-tickets delivered to your email instantly",
      badge: "Fast"
    },
    {
      icon: Globe,
      title: "Worldwide Coverage",
      description: "Access flights to over 1000 destinations with 500+ airlines worldwide",
      badge: "Global"
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Multiple payment options including installments and cryptocurrency",
      badge: "Convenient"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our expert travel team is available around the clock to assist you",
      badge: "Always Available"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="px-4 py-2 mb-4">
            Why Choose SkyFare
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Premium Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of flight booking with our advanced features and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center shadow-card hover:shadow-sky transition-all duration-300 animate-slide-up group" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-gradient-sky rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <Badge variant="secondary" className="mb-3">
                  {feature.badge}
                </Badge>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;