const mongoose = require('mongoose');

const seoSettingsSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Jay and Jane Art Studio | Fine Art Portfolio'
  },
  description: {
    type: String,
    default: 'Explore the incredible art collection of Jay and Jane Studio. Original paintings, sculptures, and digital art available for viewing and purchase.'
  },
  keywords: {
    type: String,
    default: 'art, fine art, paintings, sculptures, art portfolio, art gallery, art studio, jay and jane'
  },
  ogTitle: {
    type: String,
    default: 'Jay and Jane Art Studio | Exceptional Fine Art'
  },
  ogDescription: {
    type: String,
    default: 'Discover unique artworks from Jay and Jane Studio. Contemporary art with a bold vision.'
  },
  ogImage: {
    type: String,
    default: '/images/og-image.jpg'
  },
  twitterCard: {
    type: String,
    default: 'summary_large_image'
  },
  twitterTitle: {
    type: String,
    default: 'Jay and Jane Studio | Art That Inspires'
  },
  twitterDescription: {
    type: String,
    default: 'Explore our collection of fine art pieces that push boundaries and inspire emotions.'
  },
  twitterImage: {
    type: String,
    default: '/images/twitter-image.jpg'
  },
  canonicalUrl: {
    type: String,
    default: 'https://jayandjane.com'
  },
  structuredData: {
    type: String,
    default: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ArtGallery",
      "name": "Jay and Jane Art Studio",
      "url": "https://jayandjane.com",
      "image": "https://jayandjane.com/og-image.jpg",
      "description": "A contemporary art studio featuring original works by talented artists.",
      "telephone": "+1-555-123-4567",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Art Lane",
        "addressLocality": "Art City",
        "addressRegion": "AC",
        "postalCode": "12345",
        "addressCountry": "US"
      },
      "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
      "priceRange": "$$$"
    })
  },
  robots: {
    type: String,
    default: 'index, follow'
  },
  googleVerification: {
    type: String,
    default: ''
  },
  bingVerification: {
    type: String,
    default: ''
  },
  customHeadTags: {
    type: String,
    default: ''
  },
  sitemapFrequency: {
    type: String,
    default: 'weekly',
    enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save hook to update lastUpdated
seoSettingsSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

const SeoSettings = mongoose.model('SeoSettings', seoSettingsSchema);
module.exports = SeoSettings; 