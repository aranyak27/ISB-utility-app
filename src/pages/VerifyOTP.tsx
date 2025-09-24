import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, RefreshCw } from "lucide-react";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "";
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    alert("OTP verified successfully! (Demo)\nRedirecting to reset password...");
    navigate("/reset-password", { state: { phone, verified: true } });
  };

  const handleResendOTP = () => {
    setTimeLeft(300);
    setCanResend(false);
    setOtp("");
    alert("New OTP sent to your phone! (Demo)");
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/forgot-password")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">
              Verify OTP
            </CardTitle>
            <p className="text-muted-foreground">
              Enter the 6-digit code sent to
            </p>
            <p className="text-foreground font-medium">
              {phone}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-foreground">
                  OTP Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  className="bg-background/50 text-center text-2xl tracking-[0.5em] font-mono"
                  maxLength={6}
                />
              </div>
              
              {timeLeft > 0 && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Code expires in: <span className="font-mono text-foreground">{formatTime(timeLeft)}</span>
                  </p>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium"
                disabled={otp.length !== 6}
              >
                <Shield className="mr-2 h-4 w-4" />
                Verify OTP
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResendOTP}
                disabled={!canResend}
                className="text-primary hover:text-primary/80"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {canResend ? "Resend OTP" : "Resend OTP"}
              </Button>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Demo: Use any 6-digit code for verification
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOTP;