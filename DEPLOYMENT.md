# SmartJute Deployment Guide

## Backend Deployment (Render)

### 1. Prepare your FastAPI backend

1. Create a `requirements.txt` file with all dependencies:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
pillow==10.1.0
tensorflow==2.15.0
numpy==1.24.3
```

2. Create a `Dockerfile` (optional but recommended):
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 2. Deploy to Render

1. **Create a new Web Service on Render**:
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository containing the FastAPI code

2. **Configure the service**:
   - **Name**: `smartjute-api` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables**:
   - Add any environment variables your ML models need
   - Set `PORT` to `8000` (Render will override this automatically)

4. **Upload your model files**:
   - Make sure your `.h5` model files and `.pkl` label files are in your repository
   - Or upload them to Render's persistent disk if they're too large for git

### 3. Update Frontend Configuration

1. **Get your Render URL**:
   - After deployment, Render will provide a URL like: `https://smartjute-api.onrender.com`

2. **Update the frontend**:
   - Open `src/config/api.ts`
   - Replace `'https://your-render-app.onrender.com'` with your actual Render URL

Example:
```typescript
export const API_CONFIG = {
  BASE_URL: 'https://smartjute-api.onrender.com', // Your actual Render URL
  // ...
};
```

## Frontend Deployment (Vercel)

### 1. Deploy to Vercel

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure build settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Deploy**: Vercel will automatically build and deploy your frontend

### 2. Custom Domain (Optional)

1. **Add custom domain**:
   - Go to your project settings in Vercel
   - Add your custom domain
   - Configure DNS as instructed

## Testing the Connection

1. **Test Backend**:
   ```bash
   curl https://your-render-url.onrender.com/health
   ```

2. **Test Frontend**:
   - Visit your Vercel URL
   - Try uploading an image and making a prediction

## Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Make sure your FastAPI has the correct CORS configuration
   - Update `allow_origins` in your FastAPI middleware to include your Vercel domain

2. **Model Loading Issues**:
   - Ensure model files are included in your deployment
   - Check Render logs for any file not found errors

3. **Timeout Issues**:
   - Render free tier has request timeouts
   - Consider optimizing model inference or upgrading to a paid plan

### Render Free Tier Limitations:
- Services sleep after 15 minutes of inactivity
- First request after sleeping takes longer (cold start)
- Consider using a paid plan for production use

## Environment Variables for Production

Update your FastAPI CORS settings for production:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-vercel-app.vercel.app",  # Your Vercel URL
        "https://your-custom-domain.com"       # Your custom domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```