// API Configuration
export const API_CONFIG = {
  // Replace this with your actual Render deployment URL
  BASE_URL: 'https://smartjute-backend.onrender.com',
  // For local development, use: 'http://localhost:8000'
  
  ENDPOINTS: {
    PREDICT: (model: string) => `/predict/${model}`,
    HEALTH: '/health',
    MODELS: '/models',
    LABELS: (model: string) => `/labels/${model}`,
  }
};

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
