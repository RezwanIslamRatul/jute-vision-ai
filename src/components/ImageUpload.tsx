import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  onClearImage: () => void;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  selectedImage,
  onClearImage,
  disabled = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [onImageSelect, disabled]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [onImageSelect]);

  const handleClear = () => {
    onClearImage();
    setPreview(null);
  };

  React.useEffect(() => {
    if (!selectedImage) {
      setPreview(null);
    }
  }, [selectedImage]);

  return (
    <div className="w-full">
      {!selectedImage ? (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 transition-all duration-200",
            "bg-upload-bg border-upload-border hover:bg-upload-hover",
            isDragOver && "border-primary bg-primary/5 scale-[1.02]",
            disabled && "opacity-50 cursor-not-allowed",
            !disabled && "cursor-pointer hover:border-primary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={disabled}
          />
          <div className="flex flex-col items-center justify-center space-y-4">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            "bg-gradient-primary shadow-soft animate-float"
          )}>
            <Upload className="w-8 h-8 text-primary-foreground" />
          </div>
            <div className="text-center">
              <p className="text-lg font-medium text-foreground mb-2">
                Upload Jute Fiber Image
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop your image here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports microscope and phone captured images
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden shadow-medium bg-card animate-scale-in">
          {preview && (
            <div className="relative group">
              <img
                src={preview}
                alt="Selected jute fiber"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button
                onClick={handleClear}
                className={cn(
                  "absolute top-3 right-3 w-8 h-8 rounded-full",
                  "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                  "flex items-center justify-center transition-colors",
                  "shadow-soft hover:shadow-medium"
                )}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground truncate">
                {selectedImage.name}
              </span>
              <span className="text-xs text-muted-foreground">
                ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};