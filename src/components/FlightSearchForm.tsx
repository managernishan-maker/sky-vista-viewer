import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, CalendarIcon, Users, Plane, ArrowLeftRight } from "lucide-react";
import { format } from "date-fns";

interface SearchData {
  from: string;
  to: string;
  departDate: Date | undefined;
  returnDate: Date | undefined;
  passengers: number;
  class: string;
  tripType: "one-way" | "round-trip";
}

interface FlightSearchFormProps {
  onSearch: (data: SearchData) => void;
  isLoading: boolean;
}

const FlightSearchForm = ({ onSearch, isLoading }: FlightSearchFormProps) => {
  const [searchData, setSearchData] = useState<SearchData>({
    from: "Kathmandu (KTM)",
    to: "New York (JFK)",
    departDate: new Date(),
    returnDate: undefined,
    passengers: 1,
    class: "economy",
    tripType: "round-trip"
  });

  const [departCalendarOpen, setDepartCalendarOpen] = useState(false);
  const [returnCalendarOpen, setReturnCalendarOpen] = useState(false);

  const airports = [
    "Kathmandu (KTM)", "New York (JFK)", "Tokyo (NRT)", "London (LHR)",
    "Paris (CDG)", "Dubai (DXB)", "Singapore (SIN)", "Sydney (SYD)",
    "Mumbai (BOM)", "Delhi (DEL)", "Bangkok (BKK)", "Hong Kong (HKG)"
  ];

  const handleSearch = () => {
    onSearch(searchData);
  };

  const swapAirports = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-premium">
      {/* Trip Type Toggle */}
      <div className="flex space-x-4 mb-6">
        <Button
          variant={searchData.tripType === "round-trip" ? "default" : "outline"}
          onClick={() => setSearchData(prev => ({ ...prev, tripType: "round-trip" }))}
          size="sm"
        >
          Round Trip
        </Button>
        <Button
          variant={searchData.tripType === "one-way" ? "default" : "outline"}
          onClick={() => setSearchData(prev => ({ ...prev, tripType: "one-way" }))}
          size="sm"
        >
          One Way
        </Button>
      </div>

      {/* Main Search Form */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-6">
        {/* From */}
        <div className="lg:col-span-2">
          <Label htmlFor="from">From</Label>
          <Select value={searchData.from} onValueChange={(value) => setSearchData(prev => ({ ...prev, from: value }))}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select departure city" />
            </SelectTrigger>
            <SelectContent>
              {airports.map(airport => (
                <SelectItem key={airport} value={airport}>{airport}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Swap Button */}
        <div className="flex items-end justify-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={swapAirports}
            className="h-12 w-12 rounded-full"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </Button>
        </div>

        {/* To */}
        <div className="lg:col-span-2">
          <Label htmlFor="to">To</Label>
          <Select value={searchData.to} onValueChange={(value) => setSearchData(prev => ({ ...prev, to: value }))}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select destination city" />
            </SelectTrigger>
            <SelectContent>
              {airports.map(airport => (
                <SelectItem key={airport} value={airport}>{airport}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Passengers */}
        <div>
          <Label htmlFor="passengers">Passengers</Label>
          <Select value={searchData.passengers.toString()} onValueChange={(value) => setSearchData(prev => ({ ...prev, passengers: parseInt(value) }))}>
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1,2,3,4,5,6].map(num => (
                <SelectItem key={num} value={num.toString()}>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date and Class Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Departure Date */}
        <div>
          <Label>Departure Date</Label>
          <Popover open={departCalendarOpen} onOpenChange={setDepartCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-12 justify-start text-left">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {searchData.departDate ? format(searchData.departDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={searchData.departDate}
                onSelect={(date) => {
                  setSearchData(prev => ({ ...prev, departDate: date }));
                  setDepartCalendarOpen(false);
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Return Date */}
        {searchData.tripType === "round-trip" && (
          <div>
            <Label>Return Date</Label>
            <Popover open={returnCalendarOpen} onOpenChange={setReturnCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full h-12 justify-start text-left">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {searchData.returnDate ? format(searchData.returnDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={searchData.returnDate}
                  onSelect={(date) => {
                    setSearchData(prev => ({ ...prev, returnDate: date }));
                    setReturnCalendarOpen(false);
                  }}
                  disabled={(date) => date < (searchData.departDate || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Class */}
        <div>
          <Label>Class</Label>
          <Select value={searchData.class} onValueChange={(value) => setSearchData(prev => ({ ...prev, class: value }))}>
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="premium-economy">Premium Economy</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="first">First Class</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Button */}
      <Button 
        onClick={handleSearch} 
        disabled={isLoading || !searchData.from || !searchData.to || !searchData.departDate}
        variant="hero" 
        size="lg" 
        className="w-full"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Searching Flights...
          </>
        ) : (
          <>
            <Search className="w-5 h-5 mr-2" />
            Search Flights
          </>
        )}
      </Button>

      {/* Quick Search Options */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
          Popular: KTM → DXB
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
          KTM → DEL
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
          KTM → BKK
        </Badge>
      </div>
    </Card>
  );
};

export default FlightSearchForm;