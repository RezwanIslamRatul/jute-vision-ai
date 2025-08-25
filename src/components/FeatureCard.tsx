import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string | React.ReactNode;
  className?: string;
  animated?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  className,
  animated = true
}) => {
  return (
    <Card className={cn(
      "p-6 shadow-soft border-border/50 bg-card/60 backdrop-blur-sm",
      "transition-all duration-300 hover:shadow-medium hover:scale-105",
      animated && "animate-fade-in",
      className
    )}>
      <div className="flex items-start space-x-3">
        <div className={cn(
          "w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center",
          "shadow-soft group-hover:shadow-medium transition-shadow duration-300"
        )}>
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-2 flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            {typeof description === 'string' ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};