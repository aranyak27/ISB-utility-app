import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, LogIn, User, Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const persona = location.state?.persona || 'user';
  
  const [credentials, setCredentials] = useState({
    id: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!credentials.id || !credentials.password) {
      alert('Please enter both ID and password');
      return;
    }

    // In a real app, this would validate credentials against a backend
    // For demo purposes, we'll accept any non-empty credentials
    console.log('Login attempt:', { persona, credentials: credentials.id });
    
    // Navigate to vision screen
    navigate('/vision', { state: { persona } });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Persona Selection
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              {persona === 'admin' ? (
                <Shield className="h-12 w-12 text-primary" />
              ) : (
                <User className="h-12 w-12 text-primary" />
              )}
            </div>
            <CardTitle className="text-2xl text-foreground">
              {persona === 'admin' ? 'Admin Login' : 'User Login'}
            </CardTitle>
            <p className="text-muted-foreground">
              Enter your credentials to access OneISB
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id" className="text-foreground">
                  {persona === 'admin' ? 'Admin ID' : 'User ID'}
                </Label>
                <Input
                  id="id"
                  type="text"
                  placeholder={persona === 'admin' ? 'Enter admin ID' : 'Enter user ID'}
                  value={credentials.id}
                  onChange={(e) => setCredentials(prev => ({ ...prev, id: e.target.value }))}
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-background/50"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              
              <div className="text-center">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => navigate("/forgot-password")}
                  className="text-primary hover:text-primary/80"
                >
                  Forgot Password?
                </Button>
              </div>
            </form>
            
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Demo credentials: Any non-empty ID and password
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;