import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { PhaseCard } from "@/components/PhaseCard";
import { FeatureModal } from "@/components/FeatureModal";
import { visionData, FeatureSection } from "@/data/visionData";
import { ArrowRight, BookOpen, Target, ArrowLeft } from "lucide-react";

const Vision = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<FeatureSection | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleLearnMore = (feature: FeatureSection, phaseId: string) => {
    setSelectedFeature(feature);
    setSelectedPhase(phaseId);
    setIsModalOpen(true);
  };

  const handleContinueToApp = () => {
    if (dontShowAgain) {
      // Save preference to localStorage with today's date
      const today = new Date().toDateString();
      localStorage.setItem('hideVisionUntil', today);
    }
    
    // In a real app, this would check the user's role from auth context
    // For demo purposes, we'll navigate to a default route
    navigate('/user/home');
  };

  const currentPhase = visionData.find(p => p.id === selectedPhase);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Ribbon */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-medium">
            Phase 1 is live. Later phases are for demo/vision only.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
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
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">OneISB</h1>
          </div>
          <h2 className="text-xl text-muted-foreground mb-2">Product Vision & Roadmap</h2>
          <p className="text-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our comprehensive facility management solution. See what's available now 
            and what's coming next in our product roadmap.
          </p>
        </div>

        {/* Phase Tabs */}
        <Tabs defaultValue="phase1" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-secondary/60">
            {visionData.map((phase) => (
              <TabsTrigger 
                key={phase.id} 
                value={phase.id}
                className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="font-medium">{phase.title}</span>
                <Badge 
                  variant={phase.status === 'live' ? 'default' : 'secondary'}
                  className={`text-xs ${
                    phase.status === 'live' 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {phase.badge}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Phase Content */}
          {visionData.map((phase) => (
            <TabsContent key={phase.id} value={phase.id} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {phase.sections.map((section, index) => (
                  <PhaseCard
                    key={index}
                    section={section}
                    phaseStatus={phase.status}
                    onLearnMore={(section) => handleLearnMore(section, phase.id)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Footer CTAs */}
        <div className="flex flex-col gap-6 justify-center items-center mt-12 pt-8 border-t border-border">
          {/* Don't Show Again Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="dont-show-again" 
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
            />
            <label 
              htmlFor="dont-show-again" 
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Don't show again today
            </label>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleContinueToApp}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium px-8"
            >
              Continue to App
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-border hover:bg-secondary"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Modal */}
      <FeatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feature={selectedFeature}
        phaseStatus={currentPhase?.status || 'coming_soon'}
        phaseTitle={currentPhase?.title || ''}
      />
    </div>
  );
};

export default Vision;