import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureSection } from "@/data/visionData";
import { CheckCircle, Clock, ExternalLink } from "lucide-react";

interface PhaseCardProps {
  section: FeatureSection;
  phaseStatus: 'live' | 'coming_soon';
  onLearnMore: (section: FeatureSection) => void;
}

export const PhaseCard = ({ section, phaseStatus, onLearnMore }: PhaseCardProps) => {
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md border border-border bg-gradient-to-br from-card to-secondary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground leading-tight">
            {section.title}
          </CardTitle>
          <Badge 
            variant={phaseStatus === 'live' ? 'default' : 'secondary'}
            className={`ml-2 flex items-center gap-1 ${
              phaseStatus === 'live' 
                ? 'bg-success text-success-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {phaseStatus === 'live' ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <Clock className="h-3 w-3" />
            )}
            {phaseStatus === 'live' ? 'Live' : 'Coming Soon'}
          </Badge>
        </div>
        {section.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {section.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {section.items.slice(0, 3).map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-sm text-foreground leading-relaxed">{item}</span>
            </li>
          ))}
          {section.items.length > 3 && (
            <li className="text-sm text-muted-foreground italic">
              +{section.items.length - 3} more features
            </li>
          )}
        </ul>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLearnMore(section)}
          className="w-full justify-between text-primary hover:text-primary-foreground hover:bg-primary"
          disabled={phaseStatus === 'coming_soon'}
        >
          <span>Learn more</span>
          <ExternalLink className="h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};