// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  // For local development, use: 'http://localhost:8000''https://your-render-app.onrender.com'
  
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
