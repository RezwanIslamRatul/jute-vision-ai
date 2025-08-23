import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Microscope, Smartphone } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  disabled?: boolean;
}

const models = [
  {
    value: 'micro',
    label: 'ResNet152V2 (Micro)',
    description: 'Micro dataset model',
    icon: Microscope
  },
  {
    value: 'phone',
    label: 'ResNet101V2 (Phone)',
    description: 'Phone dataset model',
    icon: Smartphone
  }
];

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
  disabled = false
}) => {
  const selectedModelData = models.find(m => m.value === selectedModel);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Select Deep Learning Model
      </label>
      <Select value={selectedModel} onValueChange={onModelChange} disabled={disabled}>
        <SelectTrigger className="w-full h-12 bg-card border-border hover:border-primary/50 transition-colors">
          <SelectValue placeholder="Choose a model for prediction">
            {selectedModelData && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-soft">
                  <selectedModelData.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">{selectedModelData.label}</p>
                  <p className="text-xs text-muted-foreground">{selectedModelData.description}</p>
                </div>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-popover border-border shadow-medium">
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value} className="py-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-soft">
                  <model.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{model.label}</p>
                  <p className="text-xs text-muted-foreground">{model.description}</p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
