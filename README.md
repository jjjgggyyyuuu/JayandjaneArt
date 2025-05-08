# Jay and Jane Art Studio Portfolio

A modern, feature-rich art portfolio website for Jay and Jane Art Studio showcasing their artwork collection with advanced SEO optimization.

![Jay and Jane Art Studio](https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80)

## Features

- **Modern Design**: Clean, responsive interface optimized for all devices
- **Interactive Gallery**: Masonry grid layout with filtering by art category
- **Artwork Detail Pages**: High-quality image galleries with artwork information
- **Contact Form**: User-friendly contact form with validation
- **SEO Optimization**: Advanced SEO features including structured data, Open Graph, and Twitter Card support
- **Performance Optimized**: Fast loading times with optimized assets
- **Animation Effects**: Smooth animations using Framer Motion
- **Responsive Design**: Mobile-friendly across all devices

## Tech Stack

### Frontend
- React
- React Router
- Framer Motion (animations)
- SCSS (styling)
- React Helmet (SEO)
- React Slick (carousels)
- React Masonry CSS (gallery layout)

### Backend
- Node.js
- Express
- MongoDB (with Mongoose)
- Cloudinary (image hosting)
- JWT (authentication)

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or Atlas)

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/jay-and-jane-portfolio.git
cd jay-and-jane-portfolio
```

2. **Install dependencies**
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

3. **Environment Variables**
Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_SERVICE_URL=your_email_service_url
ADMIN_EMAIL=admin@example.com
SITE_URL=http://localhost:3000
```

4. **Start the development servers**
```bash
# Run both frontend and backend concurrently
npm run dev

# Or run separately
npm run server  # For backend only
npm run client  # For frontend only
```

## Project Structure

```
jay-and-jane-portfolio/
│
├── backend/             # Backend server code
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── models/          # MongoDB models
│   └── routes/          # API routes
│
├── frontend/            # React frontend
│   ├── public/          # Static files
│   └── src/             # React source code
│       ├── assets/      # Images, fonts, etc.
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       └── styles/      # SCSS styles
│
└── package.json         # Project dependencies
```

## Deployment

### Backend Deployment (Heroku)
```bash
heroku create
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
```bash
cd frontend
npm run build
```
Then deploy the build folder using Netlify/Vercel.

## SEO Optimization

The portfolio includes comprehensive SEO features:

- Custom meta tags for each page
- Open Graph tags for social sharing
- Structured data for rich search results
- XML sitemap generation
- Canonical URLs
- SEO analysis tool

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Jay and Jane Art Studio - info@jayandjane.com

Project Link: [https://github.com/yourusername/jay-and-jane-portfolio](https://github.com/yourusername/jay-and-jane-portfolio) 