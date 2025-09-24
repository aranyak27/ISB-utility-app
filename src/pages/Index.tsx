import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Shield, Building2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handlePersonaSelect = (persona: 'user' | 'admin') => {
    navigate('/login', { state: { persona } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">OneISB</h1>
          </div>
          <p className="text-muted-foreground">Recreation Facility Management</p>
          <p className="text-sm text-muted-foreground mt-1">Select your role to continue</p>
        </div>

        {/* Persona Selection */}
        <div className="space-y-4">
          <Card 
            className="bg-gradient-to-br from-card to-secondary/30 border-border cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => handlePersonaSelect('user')}
          >
            <CardHeader className="text-center pb-3">
              <User className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-xl text-foreground">User</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Access facility information and scan QR codes to check in/out
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePersonaSelect('user');
                }}
              >
                Continue as User
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-card to-secondary/30 border-border cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => handlePersonaSelect('admin')}
          >
            <CardHeader className="text-center pb-3">
              <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-xl text-foreground">Admin</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Manage facilities, monitor usage, and access administrative tools
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePersonaSelect('admin');
                }}
              >
                Continue as Admin
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Secure access to ISB recreation facilities
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;