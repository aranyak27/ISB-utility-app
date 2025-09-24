import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FeatureSection } from "@/data/visionData";
import { CheckCircle, Clock } from "lucide-react";

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: FeatureSection | null;
  phaseStatus: 'live' | 'coming_soon';
  phaseTitle: string;
}

export const FeatureModal = ({ isOpen, onClose, feature, phaseStatus, phaseTitle }: FeatureModalProps) => {
  if (!feature) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-foreground">
              {feature.title}
            </DialogTitle>
            <Badge variant={phaseStatus === 'live' ? 'default' : 'secondary'} className="ml-2">
              <div className="flex items-center gap-1">
                {phaseStatus === 'live' ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <Clock className="h-3 w-3" />
                )}
                {phaseStatus === 'live' ? 'Live' : 'Coming Soon'}
              </div>
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-sm text-muted-foreground">
            Part of {phaseTitle}
          </div>
          
          {feature.description && (
            <p className="text-foreground leading-relaxed">
              {feature.description}
            </p>
          )}
          
          <div>
            <h4 className="font-medium mb-3 text-foreground">Key Features:</h4>
            <ul className="space-y-2">
              {feature.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {phaseStatus === 'coming_soon' && (
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This feature is planned for future release. 
                The timeline may be subject to change based on development priorities and user feedback.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};