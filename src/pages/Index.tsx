import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ImageUpload';
import { ModelSelector } from '@/components/ModelSelector';
import { PredictionResult } from '@/components/PredictionResult';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Zap, AlertCircle, Github, LogOut, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import type { User, Session } from '@supabase/supabase-js';

interface PredictionResponse {
  prediction: string;
  confidence: number;
}

const Index = () => {
  const [selectedModel, setSelectedModel] = useState('ResNet152V2');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthLoading(false);
        
        if (!session?.user && !isAuthLoading) {
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
      
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, isAuthLoading]);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setResult(null); // Clear previous results
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setResult(null);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      });
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image before making a prediction.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('model', selectedModel);

      const response = await fetch('/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: PredictionResponse = await response.json();
      setResult(data);
      
      toast({
        title: "Prediction Complete",
        description: `Identified as ${data.prediction} with ${data.confidence.toFixed(1)}% confidence.`,
      });
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Prediction Failed",
        description: "Unable to connect to the prediction service. Please check your backend server.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <LoadingSpinner message="Loading..." />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center shadow-soft">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">
                  Jute Fiber Variety Identification
                </h1>
                <p className="text-primary-foreground/80 text-sm">
                  Welcome, {user?.email} • AI-powered classification
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/about')}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Info className="w-4 h-4 mr-2" />
                About
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Main Card */}
        <Card className="shadow-medium border-border/50 bg-card/80 backdrop-blur-sm">
          <div className="p-8 space-y-8">
            {/* Model Selection */}
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              disabled={isLoading}
            />

            {/* Image Upload */}
            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onClearImage={handleClearImage}
              disabled={isLoading}
            />

            {/* Predict Button */}
            <div className="flex justify-center">
              <Button
                onClick={handlePredict}
                disabled={!selectedImage || isLoading}
                size="lg"
                className="px-8 py-3 bg-gradient-primary hover:bg-primary-hover text-primary-foreground font-semibold shadow-medium hover:shadow-glow transition-all duration-200"
              >
                <Zap className="w-5 h-5 mr-2" />
                {isLoading ? 'Analyzing...' : 'Predict Variety'}
              </Button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="border-t border-border pt-8">
                <LoadingSpinner message="Processing your jute fiber image..." />
              </div>
            )}

            {/* Results */}
            {result && !isLoading && (
              <div className="border-t border-border pt-8">
                <PredictionResult
                  prediction={result.prediction}
                  confidence={result.confidence}
                  model={selectedModel}
                />
              </div>
            )}
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-soft border-border/50 bg-card/60 backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Image Requirements</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clear, well-lit images of jute fibers</li>
                  <li>• Microscope or high-quality phone images</li>
                  <li>• Supported formats: JPG, PNG, WEBP</li>
                  <li>• Recommended size: Less than 10MB</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft border-border/50 bg-card/60 backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-success" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Model Accuracy</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• ResNet152V2: Best overall performance</li>
                  <li>• EfficientNetV2B0: Optimized for microscope</li>
                  <li>• ResNet101V2: Designed for phone images</li>
                  <li>• Confidence scores indicate reliability</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Developed as a Capstone Project</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Jute Fiber Variety Identification using Deep Learning
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-border hover:border-primary/50 hover:bg-primary/5"
              asChild
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Github className="w-4 h-4" />
                <span>View Project</span>
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;