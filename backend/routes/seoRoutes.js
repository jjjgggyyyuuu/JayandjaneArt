const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const axios = require('axios');
const SeoSettings = require('../models/seoModel');

// Get SEO settings
router.get('/settings', async (req, res) => {
  try {
    let seoSettings = await SeoSettings.findOne();
    
    if (!seoSettings) {
      // Create default settings if none exist
      seoSettings = await SeoSettings.create({
        title: 'Jay and Jane Art Studio | Fine Art Portfolio',
        description: 'Explore the incredible art collection of Jay and Jane Studio. Original paintings, sculptures, and digital art available for viewing and purchase.',
        keywords: 'art, fine art, paintings, sculptures, art portfolio, art gallery, art studio, jay and jane',
        ogTitle: 'Jay and Jane Art Studio | Exceptional Fine Art',
        ogDescription: 'Discover unique artworks from Jay and Jane Studio. Contemporary art with a bold vision.',
        twitterCard: 'summary_large_image',
        twitterTitle: 'Jay and Jane Studio | Art That Inspires',
        twitterDescription: 'Explore our collection of fine art pieces that push boundaries and inspire emotions.',
        canonicalUrl: 'https://jayandjane.com',
        structuredData: JSON.stringify({
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
      });
    }
    
    res.json(seoSettings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update SEO settings
router.put('/settings', async (req, res) => {
  try {
    const {
      title,
      description,
      keywords,
      ogTitle,
      ogDescription,
      twitterCard,
      twitterTitle,
      twitterDescription,
      canonicalUrl,
      structuredData
    } = req.body;
    
    let seoSettings = await SeoSettings.findOne();
    
    if (!seoSettings) {
      seoSettings = new SeoSettings({});
    }
    
    // Update fields
    seoSettings.title = title || seoSettings.title;
    seoSettings.description = description || seoSettings.description;
    seoSettings.keywords = keywords || seoSettings.keywords;
    seoSettings.ogTitle = ogTitle || seoSettings.ogTitle;
    seoSettings.ogDescription = ogDescription || seoSettings.ogDescription;
    seoSettings.twitterCard = twitterCard || seoSettings.twitterCard;
    seoSettings.twitterTitle = twitterTitle || seoSettings.twitterTitle;
    seoSettings.twitterDescription = twitterDescription || seoSettings.twitterDescription;
    seoSettings.canonicalUrl = canonicalUrl || seoSettings.canonicalUrl;
    seoSettings.structuredData = structuredData || seoSettings.structuredData;
    
    const updatedSettings = await seoSettings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Generate sitemap
router.get('/generate-sitemap', async (req, res) => {
  try {
    const baseUrl = process.env.SITE_URL || 'https://jayandjane.com';
    const sitemapXml = await generateSitemap(baseUrl);
    res.header('Content-Type', 'text/xml').send(sitemapXml);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check SEO score
router.get('/analyze', async (req, res) => {
  try {
    const url = req.query.url || 'https://jayandjane.com';
    const seoAnalysis = await analyzeSeo(url);
    res.json(seoAnalysis);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper functions
async function generateSitemap(baseUrl) {
  // Get all artworks for sitemap
  const Artwork = require('../models/artworkModel');
  const artworks = await Artwork.find({}, 'slug updatedAt');
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add homepage
  xml += `  <url>\n    <loc>${baseUrl}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
  
  // Add standard pages
  const pages = ['gallery', 'about', 'contact'];
  pages.forEach(page => {
    xml += `  <url>\n    <loc>${baseUrl}/${page}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });
  
  // Add artwork pages
  artworks.forEach(artwork => {
    const lastmod = artwork.updatedAt ? artwork.updatedAt.toISOString().split('T')[0] : '';
    xml += `  <url>\n    <loc>${baseUrl}/artwork/${artwork.slug || artwork._id}</loc>\n`;
    if (lastmod) {
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
    }
    xml += `    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });
  
  xml += '</urlset>';
  return xml;
}

async function analyzeSeo(url) {
  try {
    // Launch headless browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Collect SEO metrics
    const seoData = await page.evaluate(() => {
      const getMetaContent = (name) => {
        const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        return meta ? meta.getAttribute('content') : null;
      };
      
      const title = document.title;
      const description = getMetaContent('description');
      const ogTitle = getMetaContent('og:title');
      const ogDescription = getMetaContent('og:description');
      const ogImage = getMetaContent('og:image');
      const canonical = document.querySelector('link[rel="canonical"]')?.href;
      const h1Tags = document.querySelectorAll('h1');
      const h2Tags = document.querySelectorAll('h2');
      const imgTags = document.querySelectorAll('img');
      const imgWithAlt = Array.from(imgTags).filter(img => img.hasAttribute('alt') && img.getAttribute('alt').trim() !== '').length;
      
      // Analyze title and description
      const titleLength = title ? title.length : 0;
      const descriptionLength = description ? description.length : 0;
      
      return {
        title,
        titleLength,
        titleScore: titleLength > 10 && titleLength < 70 ? 'Good' : 'Needs improvement',
        description,
        descriptionLength,
        descriptionScore: descriptionLength > 50 && descriptionLength < 160 ? 'Good' : 'Needs improvement',
        h1Count: h1Tags.length,
        h2Count: h2Tags.length,
        h1Score: h1Tags.length === 1 ? 'Good' : 'Needs improvement',
        hasOgTitle: !!ogTitle,
        hasOgDescription: !!ogDescription,
        hasOgImage: !!ogImage,
        hasCanonical: !!canonical,
        imgCount: imgTags.length,
        imgWithAlt,
        imgAltScore: imgTags.length > 0 ? (imgWithAlt / imgTags.length) * 100 : 0
      };
    });
    
    await browser.close();
    
    // Calculate overall score
    let score = 0;
    let maxScore = 0;
    
    if (seoData.titleScore === 'Good') score += 15;
    maxScore += 15;
    
    if (seoData.descriptionScore === 'Good') score += 15;
    maxScore += 15;
    
    if (seoData.h1Score === 'Good') score += 10;
    maxScore += 10;
    
    if (seoData.hasOgTitle) score += 5;
    maxScore += 5;
    
    if (seoData.hasOgDescription) score += 5;
    maxScore += 5;
    
    if (seoData.hasOgImage) score += 10;
    maxScore += 10;
    
    if (seoData.hasCanonical) score += 10;
    maxScore += 10;
    
    // Image alt tags score (percentage-based)
    const altScore = Math.min(10, Math.round((seoData.imgAltScore / 100) * 10));
    score += altScore;
    maxScore += 10;
    
    // Speed and mobile-friendliness are mocked for this example
    // In a real app, you'd use Lighthouse or other API
    const mockSpeedScore = 85;
    score += Math.round(mockSpeedScore / 10);
    maxScore += 10;
    
    const mockMobileScore = 90;
    score += Math.round(mockMobileScore / 10);
    maxScore += 10;
    
    const overallPercentage = Math.round((score / maxScore) * 100);
    
    return {
      url,
      ...seoData,
      speedScore: mockSpeedScore,
      mobileScore: mockMobileScore,
      overallScore: overallPercentage,
      grade: getScoreGrade(overallPercentage),
      summary: getSeoSummary(seoData, overallPercentage),
      recommendations: getSeoRecommendations(seoData)
    };
  } catch (error) {
    console.error('SEO analysis error:', error);
    return { error: error.message };
  }
}

function getScoreGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function getSeoSummary(data, score) {
  if (score >= 90) {
    return 'Excellent! Your site has strong SEO optimization.';
  } else if (score >= 70) {
    return 'Good work, but there\'s room for improvement in your SEO.';
  } else {
    return 'Your site needs significant SEO improvements to rank better.';
  }
}

function getSeoRecommendations(data) {
  const recommendations = [];
  
  if (data.titleScore !== 'Good') {
    recommendations.push(`Optimize your title tag (currently ${data.titleLength} characters). Aim for 50-60 characters.`);
  }
  
  if (data.descriptionScore !== 'Good') {
    recommendations.push(`Improve meta description (currently ${data.descriptionLength} characters). Aim for 120-155 characters.`);
  }
  
  if (data.h1Score !== 'Good') {
    if (data.h1Count === 0) {
      recommendations.push('Add an H1 heading to your page.');
    } else {
      recommendations.push(`You have ${data.h1Count} H1 tags. Use exactly one H1 tag per page.`);
    }
  }
  
  if (!data.hasOgTitle || !data.hasOgDescription || !data.hasOgImage) {
    recommendations.push('Add missing Open Graph tags for better social media sharing.');
  }
  
  if (!data.hasCanonical) {
    recommendations.push('Add a canonical URL to prevent duplicate content issues.');
  }
  
  if (data.imgAltScore < 80) {
    recommendations.push(`Only ${Math.round(data.imgAltScore)}% of images have alt tags. Add descriptive alt tags to all images.`);
  }
  
  return recommendations;
}

module.exports = router; 