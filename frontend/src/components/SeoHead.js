import React from 'react';
import { Helmet } from 'react-helmet-async';

const SeoHead = ({ settings, title, description, keywords, image, url, type }) => {
  const siteTitle = settings?.title || 'Jay and Jane Art Studio | Fine Art Portfolio';
  const siteDescription = settings?.description || 'Explore the incredible art collection of Jay and Jane Studio. Original paintings, sculptures, and digital art available for viewing and purchase.';
  const siteKeywords = settings?.keywords || 'art, fine art, paintings, sculptures, art portfolio, art gallery, art studio, jay and jane';
  const siteImage = image || settings?.ogImage || '/images/og-image.jpg';
  const siteUrl = url || settings?.canonicalUrl || 'https://jayandjane.com';
  const pageType = type || 'website';
  
  // Use custom meta values if provided, otherwise fall back to site defaults
  const pageTitle = title ? `${title} | Jay and Jane Studio` : siteTitle;
  const pageDescription = description || siteDescription;
  const pageKeywords = keywords || siteKeywords;
  
  // Format structured data
  const structuredData = settings?.structuredData 
    ? JSON.parse(settings.structuredData) 
    : {
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
      };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={siteUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={settings?.ogTitle || pageTitle} />
      <meta property="og:description" content={settings?.ogDescription || pageDescription} />
      <meta property="og:image" content={siteImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content={settings?.twitterCard || 'summary_large_image'} />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={settings?.twitterTitle || pageTitle} />
      <meta property="twitter:description" content={settings?.twitterDescription || pageDescription} />
      <meta property="twitter:image" content={settings?.twitterImage || siteImage} />
      
      {/* Robots */}
      <meta name="robots" content={settings?.robots || 'index, follow'} />
      
      {/* Verification */}
      {settings?.googleVerification && (
        <meta name="google-site-verification" content={settings.googleVerification} />
      )}
      {settings?.bingVerification && (
        <meta name="msvalidate.01" content={settings.bingVerification} />
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Custom Head Tags */}
      {settings?.customHeadTags && (
        <div dangerouslySetInnerHTML={{ __html: settings.customHeadTags }} />
      )}
      
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&family=Space+Mono&display=swap" rel="stylesheet" />
    </Helmet>
  );
};

export default SeoHead; 