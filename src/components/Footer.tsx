import { Plane, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-primary rounded-full">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">SkyFare</h3>
            </div>
            <p className="text-background/80 mb-4">
              Your trusted partner for finding the best flight deals worldwide with auto-updating prices and premium service.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">
                Download App
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-primary transition-colors">Search Flights</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Travel Deals</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Travel Insurance</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <div className="space-y-3 text-background/80">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span>support@skyfare.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>&copy; 2024 SkyFare. All rights reserved. | Auto fare technology by SkyFare Systems</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;