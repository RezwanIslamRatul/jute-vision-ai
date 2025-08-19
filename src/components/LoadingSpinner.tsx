import React from 'react';
import { Loader2, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Analyzing image...",
  className
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4 p-8", className)}>
      {/* Animated icon container */}
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-pulse">
          <Brain className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>

      {/* Loading text */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <p className="text-lg font-medium text-foreground">{message}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Deep learning model is processing your image
        </p>
      </div>

      {/* Loading dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};