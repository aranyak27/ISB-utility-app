import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MessageSquare, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Feedback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [feedback, setFeedback] = useState({
    facility: "",
    rating: "",
    category: "",
    message: "",
    name: "",
    email: ""
  });

  const facilities = [
    "Recreation Center A",
    "Gym & Fitness", 
    "LRC",
    "General"
  ];

  const categories = [
    "Facility Cleanliness",
    "Equipment Quality",
    "Staff Service",
    "Booking System",
    "Safety & Security",
    "Accessibility",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.facility || !feedback.rating || !feedback.category || !feedback.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate feedback submission
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your feedback. We'll review it and get back to you.",
    });
    
    // Reset form
    setFeedback({
      facility: "",
      rating: "",
      category: "",
      message: "",
      name: "",
      email: ""
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 cursor-pointer transition-colors ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
        }`}
        onClick={() => setFeedback(prev => ({ ...prev, rating: (i + 1).toString() }))}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
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
          <h1 className="text-3xl font-bold text-foreground">Feedback</h1>
        </div>

        <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <CardTitle className="text-foreground">Share Your Experience</CardTitle>
            </div>
            <p className="text-muted-foreground">
              Help us improve our facilities and services
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Facility Selection */}
              <div className="space-y-2">
                <Label htmlFor="facility" className="text-foreground">
                  Facility <span className="text-destructive">*</span>
                </Label>
                <Select 
                  value={feedback.facility} 
                  onValueChange={(value) => setFeedback(prev => ({ ...prev, facility: value }))}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select a facility" />
                  </SelectTrigger>
                  <SelectContent>
                    {facilities.map((facility) => (
                      <SelectItem key={facility} value={facility}>
                        {facility}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label className="text-foreground">
                  Overall Rating <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center gap-1">
                  {renderStars(parseInt(feedback.rating) || 0)}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {feedback.rating ? `${feedback.rating} star${feedback.rating !== '1' ? 's' : ''}` : 'No rating'}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground">
                  Feedback Category <span className="text-destructive">*</span>
                </Label>
                <Select 
                  value={feedback.category} 
                  onValueChange={(value) => setFeedback(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">
                  Your Feedback <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Please share your detailed feedback..."
                  value={feedback.message}
                  onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
                  className="bg-background/50 min-h-[120px]"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Name (Optional)
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={feedback.name}
                    onChange={(e) => setFeedback(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={feedback.email}
                    onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Feedback
              </Button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Your feedback helps us improve our facilities and services for everyone.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;