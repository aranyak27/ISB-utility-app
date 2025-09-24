import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Shield, QrCode, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState<'user' | 'admin' | null>(null);

  const handleLogin = () => {
    // Simulate login flow - in real app this would handle authentication
    if (selectedPersona) {
      // Navigate to vision screen first as per requirements
      navigate('/vision');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Building2 className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">OneISB</h1>
          </div>
          <h2 className="text-2xl text-foreground mb-3">Recreation - Scan to Enter</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Seamless facility access management for modern spaces. 
            Choose your role to get started with our secure check-in system.
          </p>
        </div>

        {/* Persona Selection */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
              selectedPersona === 'user' 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedPersona('user')}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-foreground">User Access</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-muted-foreground">
                Access facilities, check in/out, and view occupancy
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">QR Scanning</Badge>
                <Badge variant="secondary">Live Occupancy</Badge>
                <Badge variant="secondary">Session Tracking</Badge>
              </div>
              {selectedPersona === 'user' && (
                <div className="mt-4">
                  <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
              selectedPersona === 'admin' 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedPersona('admin')}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-foreground">Admin Panel</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-muted-foreground">
                Manage facilities, view reports, and control access
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">Facility CRUD</Badge>
                <Badge variant="secondary">Live Dashboard</Badge>
                <Badge variant="secondary">QR Generation</Badge>
              </div>
              {selectedPersona === 'admin' && (
                <div className="mt-4">
                  <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Login Section */}
        {selectedPersona && (
          <Card className="max-w-md mx-auto bg-gradient-to-br from-card to-secondary/30">
            <CardHeader className="text-center">
              <CardTitle className="text-foreground">
                {selectedPersona === 'user' ? 'User Login' : 'Admin Login'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">User ID</label>
                <input 
                  type="text" 
                  placeholder="Enter your ID"
                  className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
                />
              </div>
              <Button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium"
                size="lg"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Continue to Vision
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Features Preview */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-6">Why Choose OneISB?</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-6 rounded-lg bg-gradient-to-br from-card to-secondary/30">
              <QrCode className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-medium text-foreground mb-2">Contactless Access</h4>
              <p className="text-sm text-muted-foreground">Quick QR code scanning for seamless facility entry</p>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-br from-card to-secondary/30">
              <Building2 className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-medium text-foreground mb-2">Real-time Monitoring</h4>
              <p className="text-sm text-muted-foreground">Live occupancy tracking and capacity management</p>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-br from-card to-secondary/30">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-medium text-foreground mb-2">Secure & Compliant</h4>
              <p className="text-sm text-muted-foreground">Role-based access with comprehensive audit trails</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
