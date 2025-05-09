# Backend Deployment Instructions for Jay and Jane Art Studio

This document provides step-by-step instructions for deploying the backend API for the Jay and Jane Art Studio website.

## Prerequisites

- MongoDB Atlas account (for database)
- Cloudinary account (for image hosting)
- A Node.js hosting provider account (Render.com, Heroku, Railway, etc.)

## Option 1: Deploying to Hostinger with Node.js Support

If your Hostinger plan supports Node.js applications:

1. Upload the `backend-deploy.zip` file to your Hostinger account using File Manager or FTP
2. Extract the zip file
3. Go to the Node.js section in your hPanel
4. Create a new Node.js application with the following settings:
   - Application name: jayandjane-backend
   - Node.js version: 14.x or higher
   - Root directory: backend
   - Start command: node server.js
5. Set up the environment variables based on your `env.example` file
6. Start the application

## Option 2: Deploying to Render.com

1. Create a Render.com account
2. Connect your GitHub repository or push the code to GitHub
3. On Render dashboard, click "New" and select "Web Service"
4. Connect your repository
5. Use the following settings:
   - Name: jayandjane-backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: node backend/server.js
6. Add the environment variables from your `.env` file
7. Click "Create Web Service"

## Option 3: Deploying to Heroku

1. Install the Heroku CLI: `npm install -g heroku`
2. Login to Heroku: `heroku login`
3. Create a new Heroku app: `heroku create jayandjane-backend`
4. Set environment variables:
   ```
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   heroku config:set CLOUDINARY_API_KEY=your_cloudinary_key
   heroku config:set CLOUDINARY_API_SECRET=your_cloudinary_secret
   heroku config:set EMAIL_SERVICE_URL=your_email_service
   heroku config:set ADMIN_EMAIL=admin@jayandjane.com
   heroku config:set SITE_URL=https://jayandjane.com
   ```
5. Push to Heroku: `git push heroku main`

## After Backend Deployment

Once your backend is deployed, you need to update your frontend to connect to it:

1. Run the update script: `node update-backend-url.js`
   - Set the `BACKEND_URL` environment variable to your deployed backend URL first
2. Rebuild your frontend: `cd frontend && npm run build`
3. Deploy the updated frontend to Hostinger

## Required Environment Variables

Create a `.env` file with the following variables:

```
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_SERVICE_URL=your_email_service_url
ADMIN_EMAIL=admin@jayandjane.com
SITE_URL=https://jayandjane.com
```

## Setting Up MongoDB Atlas

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Set up database access user
4. Whitelist all IP addresses (0.0.0.0/0)
5. Get your connection string and add it to your environment variables

## Setting Up Cloudinary

1. Create a Cloudinary account
2. Navigate to your Dashboard
3. Copy your Cloud name, API Key, and API Secret
4. Add them to your environment variables

## Testing Your Deployment

Once deployed, test the following endpoints:
- GET /api/artworks
- GET /api/seo/settings

If you receive proper JSON responses, your backend is working correctly. 