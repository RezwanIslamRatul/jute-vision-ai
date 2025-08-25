import React from 'react';
import { CheckCircle, TrendingUp, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PredictionResultProps {
  prediction: string;
  confidence: number;
  model: string;
  className?: string;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  prediction,
  confidence,
  model,
  className
}) => {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 90) return 'text-success';
    if (conf >= 70) return 'text-primary';
    return 'text-muted-foreground';
  };

  const getConfidenceLabel = (conf: number) => {
    if (conf >= 90) return 'High Confidence';
    if (conf >= 70) return 'Good Confidence';
    return 'Low Confidence';
  };

  return (
    <div className={cn("w-full animate-fade-in", className)}>
      <div className="bg-gradient-card rounded-lg border border-border shadow-elegant overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-success p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success-foreground/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-success-foreground">
                Prediction Complete
              </h3>
              <p className="text-sm text-success-foreground/80">
                Analysis using {model}
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="p-6 space-y-6">
          {/* Predicted Class */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-lg px-4 py-2 mb-2">
              <Info className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Identified Variety</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-1">
              {prediction}
            </h2>
            <p className="text-sm text-muted-foreground">
              Jute fiber variety classification
            </p>
          </div>

          {/* Confidence Score */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className={cn("w-4 h-4", getConfidenceColor(confidence))} />
                <span className="text-sm font-medium text-foreground">Confidence Score</span>
              </div>
              <span className={cn("text-sm font-medium", getConfidenceColor(confidence))}>
                {getConfidenceLabel(confidence)}
              </span>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="relative">
              <div className="w-full bg-muted rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className={cn(
                    "h-full transition-all duration-1000 ease-out rounded-full relative",
                    "before:content-[''] before:absolute before:inset-0 before:animate-shimmer",
                    confidence >= 90 ? "bg-gradient-success" : 
                    confidence >= 70 ? "bg-gradient-primary" : "bg-muted-foreground"
                  )}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-foreground mix-blend-difference">
                  {confidence.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Confidence Description */}
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {confidence >= 90 
                  ? "Excellent prediction accuracy. The model is highly confident in this classification."
                  : confidence >= 70 
                  ? "Good prediction accuracy. The model shows reasonable confidence in this result."
                  : "Lower prediction accuracy. Consider using a different model or capturing a clearer image."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};