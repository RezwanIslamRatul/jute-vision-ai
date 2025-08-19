import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Brain, Microscope, Smartphone, ArrowLeft, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

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
                  About This Project
                </h1>
                <p className="text-primary-foreground/80 text-sm">
                  Deep Learning for Jute Fiber Classification
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Overview */}
        <Card className="shadow-medium border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>Project Overview</span>
            </CardTitle>
            <CardDescription>
              Automated classification of jute fiber varieties using deep learning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              This capstone project implements an AI-powered system for identifying different varieties 
              of jute fibers using advanced computer vision and deep learning techniques. The system 
              can analyze both microscopic and smartphone-captured images to classify jute fiber varieties 
              with high accuracy.
            </p>
            <p className="text-muted-foreground">
              Jute is one of the most important natural fibers globally, and accurate variety 
              identification is crucial for quality control, pricing, and agricultural planning. 
              Traditional manual identification methods are time-intensive and require expert knowledge.
            </p>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-soft border-border/50 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Microscope className="w-5 h-5 text-primary" />
                <span>Deep Learning Models</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">ResNet152V2</h4>
                <p className="text-sm text-muted-foreground">
                  Combined dataset model with the highest overall accuracy for general-purpose classification.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">EfficientNetV2B0</h4>
                <p className="text-sm text-muted-foreground">
                  Optimized for microscopic images with excellent precision for detailed fiber analysis.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">ResNet101V2</h4>
                <p className="text-sm text-muted-foreground">
                  Specialized for smartphone images, making field identification accessible.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border/50 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-primary" />
                <span>Technology Stack</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Frontend</h4>
                <p className="text-sm text-muted-foreground">
                  React, TypeScript, Tailwind CSS for a modern, responsive interface.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Backend</h4>
                <p className="text-sm text-muted-foreground">
                  Flask API with TensorFlow/Keras for model inference and prediction.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Database</h4>
                <p className="text-sm text-muted-foreground">
                  Supabase for user authentication and data management.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card className="shadow-medium border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>
              Comprehensive tools for jute fiber variety identification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Multi-Model Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose from three specialized models based on your image type and requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Real-time Prediction</h4>
                    <p className="text-sm text-muted-foreground">
                      Get instant classification results with confidence scores for reliability assessment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">User-Friendly Interface</h4>
                    <p className="text-sm text-muted-foreground">
                      Intuitive drag-and-drop interface suitable for both experts and beginners.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Secure & Scalable</h4>
                    <p className="text-sm text-muted-foreground">
                      Built with modern security practices and cloud-native architecture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact */}
        <Card className="shadow-medium border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Project Impact</CardTitle>
            <CardDescription>
              Advancing agricultural technology through AI innovation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              This project demonstrates the practical application of deep learning in agriculture, 
              providing a scalable solution that can significantly reduce the time and expertise 
              required for jute fiber classification. By automating this process, we can improve 
              quality control, streamline supply chains, and support better decision-making in 
              the jute industry.
            </p>
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <p className="text-sm text-muted-foreground italic">
                "This work represents a significant step forward in applying AI to agricultural 
                challenges, showcasing how modern technology can enhance traditional farming practices 
                and contribute to sustainable agriculture."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-8">
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
                <span>View on GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;