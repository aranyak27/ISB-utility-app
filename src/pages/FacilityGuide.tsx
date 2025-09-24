import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Clock, Users, Wifi, Car, Phone, Search } from "lucide-react";

const FacilityGuide = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const facilities = [
    {
      id: 1,
      name: "Recreation Center A",
      description: "Multi-purpose recreation facility with various sports options",
      location: "Block A, Ground Floor",
      hours: "6:00 AM - 10:00 PM",
      capacity: 20,
      amenities: ["Badminton Courts", "Squash Courts", "Swimming Pool", "Chess Area"],
      contact: "+65 6123 4567",
      features: ["Air Conditioning", "Locker Rooms", "WiFi", "Parking"],
      rules: [
        "Proper sports attire required",
        "Book sessions in advance",
        "Maximum 2-hour sessions",
        "Clean up after use"
      ]
    },
    {
      id: 2,
      name: "Gym & Fitness",
      description: "Fully equipped fitness center with modern equipment",
      location: "Block B, First Floor", 
      hours: "5:00 AM - 11:00 PM",
      capacity: 15,
      amenities: ["Cardio Equipment", "Weight Training", "Free Weights", "Functional Training Area"],
      contact: "+65 6123 4568",
      features: ["Air Conditioning", "Shower Facilities", "Towel Service", "Personal Training"],
      rules: [
        "Workout attire and proper footwear required",
        "Wipe down equipment after use",
        "Maximum 90-minute sessions during peak hours",
        "No food or drinks except water"
      ]
    },
    {
      id: 3,
      name: "LRC (Learning Resource Center)",
      description: "Quiet study spaces and learning facilities",
      location: "Block C, Second Floor",
      hours: "24/7 Access",
      capacity: 30,
      amenities: ["Individual Study Desks", "Group Study Rooms", "Computer Lab", "Printing Services"],
      contact: "+65 6123 4569",
      features: ["Silent Zones", "WiFi", "Power Outlets", "Air Conditioning"],
      rules: [
        "Maintain silence in designated areas",
        "No food allowed, drinks permitted",
        "Book group rooms in advance",
        "Return chairs to original position"
      ]
    }
  ];

  const emergencyContacts = [
    { title: "Security", number: "+65 6123 4500", available: "24/7" },
    { title: "Maintenance", number: "+65 6123 4501", available: "6 AM - 10 PM" },
    { title: "Medical Emergency", number: "995", available: "24/7" },
    { title: "ISB Main Office", number: "+65 6123 4502", available: "8 AM - 6 PM" }
  ];

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Facility Guide</h1>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search facilities, amenities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
        </div>

        <Tabs defaultValue="facilities" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>
          
          <TabsContent value="facilities" className="space-y-6 mt-6">
            {filteredFacilities.map((facility) => (
              <Card key={facility.id} className="bg-gradient-to-br from-card to-secondary/30 border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-foreground mb-2">{facility.name}</CardTitle>
                      <p className="text-muted-foreground mb-2">{facility.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {facility.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {facility.hours}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Max {facility.capacity} people
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Phone className="h-3 w-3" />
                        {facility.contact}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Amenities */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Available Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {facility.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {facility.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/50 rounded px-2 py-1">
                          {getStatusIcon(feature)}
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rules */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Rules & Guidelines</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {facility.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="policies" className="space-y-6 mt-6">
            <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">General Policies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Booking & Reservations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Bookings can be made up to 7 days in advance</li>
                    <li>• Cancellations must be made at least 2 hours before the session</li>
                    <li>• No-shows will result in booking privileges suspension</li>
                    <li>• Maximum 2 active bookings per user</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Access & Security</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Valid ISB ID required for facility access</li>
                    <li>• QR code scanning required for check-in/out</li>
                    <li>• Guests must be accompanied by ISB members</li>
                    <li>• Lost property should be reported to security</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Conduct & Behavior</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Respectful behavior towards staff and other users</li>
                    <li>• Appropriate attire required in all facilities</li>
                    <li>• No smoking or alcohol consumption</li>
                    <li>• Keep noise levels appropriate for the facility</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emergency" className="space-y-6 mt-6">
            <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Emergency Contacts</CardTitle>
                <p className="text-muted-foreground">
                  Keep these numbers handy for emergencies and assistance
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-foreground">{contact.title}</h4>
                        <p className="text-sm text-muted-foreground">Available: {contact.available}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-foreground">{contact.number}</p>
                        <Button variant="outline" size="sm" className="mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  Emergency Procedures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold text-foreground">Fire Emergency</h4>
                    <p className="text-muted-foreground">1. Sound alarm  2. Evacuate immediately  3. Proceed to assembly point  4. Call 995</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Medical Emergency</h4>
                    <p className="text-muted-foreground">1. Call 995  2. Provide first aid if trained  3. Contact security  4. Stay with patient</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Security Issues</h4>
                    <p className="text-muted-foreground">1. Contact security immediately  2. Do not confront  3. Report details  4. Follow instructions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacilityGuide;