import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Phone, AlertCircle, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  // Phone validation (supports various formats)
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phone) return "";
    if (phone.length < 8) return "Phone number too short";
    if (phone.length > 15) return "Phone number too long";
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return "Please enter a valid phone number";
    }
    return "";
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePhoneChange = (value: string) => {
    // Allow only numbers, spaces, hyphens, parentheses, and plus sign
    const cleaned = value.replace(/[^\d\s\-\(\)\+]/g, '');
    setPhone(cleaned);
    setPhoneError(validatePhone(cleaned));
  };

  const handleEmailReset = (e: React.FormEvent) => {
    e.preventDefault();
    const emailValidationError = validateEmail(email);
    if (!email) {
      setEmailError("Please enter your email address");
      return;
    }
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }
    alert("Password reset link sent to your email! (Demo)");
    navigate("/login");
  };

  const handlePhoneReset = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneValidationError = validatePhone(phone);
    if (!phone) {
      setPhoneError("Please enter your phone number");
      return;
    }
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }
    // Navigate to OTP verification page
    navigate("/verify-otp", { state: { phone } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/login")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-foreground">
              Forgot Password
            </CardTitle>
            <p className="text-muted-foreground">
              Choose how you'd like to reset your password
            </p>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-4 mt-6">
                <form onSubmit={handleEmailReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className={`bg-background/50 pr-10 ${
                          emailError ? 'border-destructive' : email && !emailError ? 'border-success' : ''
                        }`}
                      />
                      {email && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {emailError ? (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </div>
                      )}
                    </div>
                    {emailError && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {emailError}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium"
                    disabled={!!emailError || !email}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Reset Link
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-4 mt-6">
                <form onSubmit={handlePhoneReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className={`bg-background/50 pr-10 ${
                          phoneError ? 'border-destructive' : phone && !phoneError ? 'border-success' : ''
                        }`}
                      />
                      {phone && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {phoneError ? (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </div>
                      )}
                    </div>
                    {phoneError && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {phoneError}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Format: +1234567890 or 1234567890
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium"
                    disabled={!!phoneError || !phone}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Send OTP
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Demo: No actual emails or SMS will be sent
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;