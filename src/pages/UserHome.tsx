import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Users, Clock, MapPin, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();
  const [selectedSports, setSelectedSports] = useState<{ [key: number]: string }>({});

  const sports = [
    { value: "badminton", label: "Badminton" },
    { value: "squash", label: "Squash" },
    { value: "swimming", label: "Swimming" },
    { value: "chess", label: "Chess" }
  ];

  // Handle QR scanning
  const handleScanToEnter = (facilityId: number, facilityName: string) => {
    // Check if it's Recreation Center and sport is selected
    if (facilityName === "Recreation Center A" && !selectedSports[facilityId]) {
      alert("Please select a sport before scanning to enter Recreation Center.");
      return;
    }
    
    // In a real app, this would trigger camera/QR scanner
    // For demo, we'll simulate the scanning process
    const sportInfo = selectedSports[facilityId] ? ` for ${sports.find(s => s.value === selectedSports[facilityId])?.label}` : '';
    alert(`QR Scanner opened for ${facilityName}${sportInfo}. In a real app, this would open the camera to scan QR codes.`);
  };
  
  // Mock facility data
  const facilities = [
    {
      id: 1,
      name: "Recreation Center A",
      status: "Open",
      occupancy: { current: 8, max: 20 },
      location: "Block A, Ground Floor"
    },
    {
      id: 2,
      name: "Gym & Fitness",
      status: "Full",
      occupancy: { current: 15, max: 15 },
      location: "Block B, First Floor"
    },
    {
      id: 3,
      name: "Study Hall",
      status: "Open",
      occupancy: { current: 12, max: 30 },
      location: "Block C, Second Floor"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-success text-success-foreground';
      case 'Full': return 'bg-warning text-warning-foreground';
      case 'Closed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to OneISB</h1>
          <p className="text-muted-foreground">Scan QR codes to check in/out of facilities</p>
        </div>

        {/* Facilities Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {facilities.map((facility) => (
            <Card key={facility.id} className="bg-gradient-to-br from-card to-secondary/30 border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-foreground">{facility.name}</CardTitle>
                  <Badge className={getStatusColor(facility.status)}>
                    {facility.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {facility.location}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-foreground">
                      {facility.occupancy.current}/{facility.occupancy.max}
                    </span>
                    <span className="text-muted-foreground">people</span>
                  </div>
                  {!["Recreation Center A", "Gym & Fitness"].includes(facility.name) && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      2h max
                    </div>
                  )}
                </div>
                
                {/* Sports Selection for Recreation Center */}
                {facility.name === "Recreation Center A" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Select Sport <span className="text-destructive">*</span>
                    </label>
                    <Select 
                      value={selectedSports[facility.id] || ""} 
                      onValueChange={(value) => setSelectedSports(prev => ({ ...prev, [facility.id]: value }))}
                    >
                      <SelectTrigger className="w-full bg-background border-border">
                        <SelectValue placeholder="Choose a sport" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border shadow-lg z-50">
                        {sports.map((sport) => (
                          <SelectItem 
                            key={sport.value} 
                            value={sport.value}
                            className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
                          >
                            {sport.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <Button 
                  className="w-full" 
                  disabled={facility.status === 'Closed'}
                  variant="default"
                  onClick={() => handleScanToEnter(facility.id, facility.name)}
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan to Enter
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              View My Sessions
            </Button>
            <Button variant="outline" size="sm">
              Report Issue
            </Button>
            <Button variant="outline" size="sm">
              Facility Guide
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserHome;