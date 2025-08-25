# 🌿 Jute Fiber Variety Identification System

An AI-powered web application for automated classification of jute fiber varieties using deep learning and computer vision technologies.

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue)

## 🎯 Project Overview

This capstone project implements a comprehensive system for identifying different varieties of jute fibers using advanced deep learning models. The application supports both microscopic and smartphone-captured images, providing real-time classification with confidence scoring.

### 🏆 Key Achievements
- **High Accuracy**: Specialized models trained for different image types
- **Real-time Processing**: Instant classification with confidence scores
- **User-Friendly Interface**: Intuitive drag-and-drop functionality
- **Scalable Architecture**: Cloud-native design with modern technologies

## 🚀 Live Demo

**URL**: [https://lovable.dev/projects/c73a358c-7c99-4c17-8324-1f8e92524300](https://lovable.dev/projects/c73a358c-7c99-4c17-8324-1f8e92524300)

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern component-based architecture
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Shadcn/UI** - Beautiful, accessible component library
- **Lucide React** - Comprehensive icon library
- **React Router** - Client-side routing
- **Vite** - Fast development and build tool

### Backend
- **FastAPI** - High-performance Python web framework
- **TensorFlow/Keras** - Deep learning model inference
- **PIL (Pillow)** - Image processing and preprocessing
- **NumPy** - Numerical computations
- **Uvicorn** - ASGI server for production deployment

### Database & Authentication
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database (via Supabase)
- **Row Level Security (RLS)** - Secure data access

### AI/ML Models
- **ResNet152V2** - Deep residual network for microscopic images
- **NASNetMobile** - Neural Architecture Search model for mobile images

## 🧠 Deep Learning Models

### Model Architecture

#### 1. ResNet152V2 (Micro Model)
- **Purpose**: Optimized for microscopic jute fiber images
- **Architecture**: 152-layer residual neural network
- **Input Size**: 122×122×3 pixels
- **Strengths**: 
  - Excellent performance on high-resolution microscopic images
  - Deep feature extraction for fine-grained classification
  - Robust to image variations and noise

#### 2. NASNetMobile (Phone Model)
- **Purpose**: Optimized for smartphone-captured images
- **Architecture**: Neural Architecture Search optimized network
- **Input Size**: 122×122×3 pixels
- **Strengths**:
  - Mobile-optimized inference speed
  - High accuracy on consumer-grade photos
  - Efficient memory usage

### Jute Varieties Classified
- **Bangladeshi White** - Premium quality white jute
- **Kenaf** - Alternative bast fiber variety
- **Mesta** - High-strength jute variety
- **Tossa** - Most common commercial jute type

## 🎨 Design System

The application features a comprehensive design system built with:

- **Color Palette**: Green-themed agricultural aesthetic
- **Typography**: Inter font family for optimal readability
- **Shadows**: Layered shadow system for depth
- **Animations**: Smooth transitions and micro-interactions
- **Responsive Design**: Mobile-first approach

### Key Design Features
- 🎭 **Gradient Backgrounds**: Beautiful green gradients
- ⚡ **Smooth Animations**: Float, shimmer, and pulse effects
- 🌟 **Interactive Elements**: Hover states and transitions
- 📱 **Mobile Optimized**: Responsive across all devices

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Python 3.8+ (for backend)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Place model files**
   - `ResNet152v2.h5` - ResNet model file
   - `NasNetMobile.h5` - NASNet model file
   - `label_micro.pkl` - Labels for micro model
   - `label_phone.pkl` - Labels for phone model

4. **Start FastAPI server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## 🏗️ Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn UI components
│   │   ├── ImageUpload.tsx # Drag-and-drop image upload
│   │   ├── ModelSelector.tsx # Model selection interface
│   │   ├── PredictionResult.tsx # Results display
│   │   └── FeatureCard.tsx # Feature information cards
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Main application page
│   │   ├── About.tsx       # Project information page
│   │   ├── Auth.tsx        # Authentication page
│   │   └── NotFound.tsx    # 404 error page
│   ├── hooks/              # Custom React hooks
│   ├── config/             # Configuration files
│   ├── integrations/       # External service integrations
│   └── lib/                # Utility functions
├── backend/                # FastAPI backend
│   ├── main.py            # Main application file
│   ├── models/            # ML model files
│   └── requirements.txt   # Python dependencies
└── public/                # Static assets
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
VITE_API_BASE_URL=http://localhost:8000
```

### API Configuration

Update `src/config/api.ts` for your deployment:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000', // Development
  // BASE_URL: 'https://your-backend-url.com', // Production
  
  ENDPOINTS: {
    PREDICT: (model: string) => `/predict/${model}`,
    HEALTH: '/health'
  }
};
```

## 📊 Features

### ✨ Core Functionality
- **🖼️ Image Upload**: Drag-and-drop interface with preview
- **🤖 Model Selection**: Choose between ResNet152V2 and NASNetMobile
- **⚡ Real-time Prediction**: Instant classification with confidence scores
- **📱 Responsive Design**: Works seamlessly on all devices
- **🔐 User Authentication**: Secure login/logout with Supabase

### 🎯 Advanced Features
- **📈 Confidence Scoring**: Visual progress bars with accuracy indicators
- **🎨 Beautiful UI**: Modern design with smooth animations
- **⚙️ Model Switching**: Easy switching between specialized models
- **📊 Result Analytics**: Detailed prediction information
- **🌐 PWA Ready**: Progressive web app capabilities

## 🔒 Security

- **Authentication**: Supabase Auth integration
- **Row Level Security**: Database-level access control
- **Input Validation**: Server-side file type and size validation
- **CORS Protection**: Configured for secure cross-origin requests

## 🚀 Deployment

### Frontend Deployment (Lovable)
1. Open [Lovable Project](https://lovable.dev/projects/c73a358c-7c99-4c17-8324-1f8e92524300)
2. Click "Share" → "Publish"
3. Your app will be available at `yourapp.lovable.app`

### Backend Deployment Options

#### Option 1: Render
1. Connect your GitHub repository
2. Configure build settings
3. Deploy with automatic updates

#### Option 2: Railway
1. Connect repository
2. Configure environment variables
3. Deploy with one click

#### Option 3: Heroku
1. Create Heroku app
2. Configure buildpacks for Python
3. Deploy via Git

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

**Capstone Project Team**
- *Lead Developer* - Full-stack development and AI integration
- *ML Engineer* - Model training and optimization
- *UI/UX Designer* - Interface design and user experience

## 🙏 Acknowledgments

- **TensorFlow/Keras** - For powerful deep learning capabilities
- **Supabase** - For excellent backend-as-a-service platform
- **Shadcn/UI** - For beautiful, accessible components
- **Tailwind CSS** - For rapid UI development
- **Research Community** - For jute fiber classification research

## 📞 Support

If you have any questions or need support:

- 📧 **Email**: [support@yourproject.com](mailto:support@yourproject.com)
- 💬 **Discord**: [Join our community](#)
- 📖 **Documentation**: [Detailed docs](#)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/yourrepo/issues)

---

<div align="center">
  <p><strong>🌱 Built with ❤️ for sustainable agriculture and AI innovation</strong></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>