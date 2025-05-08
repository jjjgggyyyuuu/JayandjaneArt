import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight, FaShare, FaHeart, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import SeoHead from '../components/SeoHead';

// Import Slick slider CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ArtworkDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [relatedArtworks, setRelatedArtworks] = useState([]);
  
  const [mainRef, mainInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [detailsRef, detailsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [relatedRef, relatedInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    prevArrow: <button className="slick-prev"><FaArrowLeft /></button>,
    nextArrow: <button className="slick-next"><FaArrowRight /></button>
  };
  
  // Related artworks slider settings
  const relatedSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <button className="slick-prev"><FaArrowLeft /></button>,
    nextArrow: <button className="slick-next"><FaArrowRight /></button>,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  
  // Fetch artwork data
  useEffect(() => {
    const fetchArtwork = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, we would fetch from the API
        // This is a mockup with dummy data for now
        const allArtworks = [
          {
            _id: '1',
            title: 'Urban Reflections',
            slug: 'urban-reflections',
            description: 'A contemporary exploration of city life and urban landscapes. This painting captures the essence of modern urban existence through a vibrant color palette and dynamic composition. The interplay of light and shadow creates a sense of movement and energy typical of bustling city streets.',
            category: 'painting',
            medium: 'Oil on Canvas',
            dimensions: '36 x 48 inches',
            year: 2023,
            price: 3800,
            forSale: true,
            featured: true,
            additionalImages: [
              'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
              'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
            ],
            image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2127&q=80',
            artist: 'Jane Smith',
            artistBio: 'Jane Smith is a contemporary artist known for her vibrant urban landscapes and abstract interpretations of city life.'
          },
          {
            _id: '2',
            title: 'Ethereal Dreams',
            slug: 'ethereal-dreams',
            description: 'Digital artwork exploring the boundary between reality and dreams. This piece invites viewers to question perceptions and explore the subconscious mind through surreal imagery and dreamlike elements.',
            category: 'digital',
            medium: 'Digital Art',
            dimensions: '24 x 36 inches (print)',
            year: 2022,
            price: 1200,
            forSale: true,
            featured: true,
            additionalImages: [
              'https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1264&q=80',
              'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
            ],
            image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            artist: 'Alex Johnson',
            artistBio: 'Alex Johnson is a digital artist pushing the boundaries of technology and art through innovative techniques and surreal compositions.'
          },
          {
            _id: '3',
            title: 'Sculpted Emotions',
            slug: 'sculpted-emotions',
            description: 'A bronze sculpture that captures the complexity of human emotions. This piece explores the depth and range of human feeling through abstract form and texture. The dynamic composition invites viewers to engage with the work from multiple perspectives.',
            category: 'sculpture',
            medium: 'Bronze',
            dimensions: '18 x 12 x 8 inches',
            year: 2021,
            price: 5600,
            forSale: true,
            featured: false,
            additionalImages: [
              'https://images.unsplash.com/photo-1576447070192-2c86ce9e468a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
              'https://images.unsplash.com/photo-1576769267415-6f8cd2376321?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1298&q=80'
            ],
            image: 'https://images.unsplash.com/photo-1544413164-5f1b361f5d8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            artist: 'Jay Roberts',
            artistBio: 'Jay Roberts is a sculptor whose work explores human emotion and experience through abstract forms in bronze and other materials.'
          }
        ];
        
        const foundArtwork = allArtworks.find(art => art.slug === slug);
        
        if (foundArtwork) {
          setArtwork(foundArtwork);
          
          // Get related artworks (same category but not the same artwork)
          const related = allArtworks.filter(
            art => art.category === foundArtwork.category && art._id !== foundArtwork._id
          );
          setRelatedArtworks(related);
        } else {
          setError('Artwork not found');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artwork:', error);
        setError('Failed to load artwork. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchArtwork();
  }, [slug]);
  
  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };
  
  // Toggle like
  const toggleLike = () => {
    setLiked(!liked);
  };
  
  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artwork?.title,
        text: `Check out "${artwork?.title}" at Jay & Jane Art Studio`,
        url: window.location.href
      }).catch(error => {
        console.log('Error sharing:', error);
      });
    } else {
      alert('Share feature not supported by your browser. Please copy the URL to share.');
    }
  };
  
  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  if (loading) {
    return (
      <div className="artwork-detail__loading">
        <p>Loading artwork details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="artwork-detail__error">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/gallery" className="btn">
          Return to Gallery
        </Link>
      </div>
    );
  }
  
  if (!artwork) {
    return (
      <div className="artwork-detail__not-found">
        <h2>Artwork Not Found</h2>
        <p>The artwork you're looking for doesn't exist or has been removed.</p>
        <Link to="/gallery" className="btn">
          Return to Gallery
        </Link>
      </div>
    );
  }
  
  const allImages = [artwork.image, ...artwork.additionalImages || []];
  
  return (
    <>
      <SeoHead 
        title={artwork.title}
        description={artwork.description}
        image={artwork.image}
        type="article"
      />
      
      <div className="artwork-detail">
        <div className="container">
          {/* Breadcrumb */}
          <div className="artwork-detail__breadcrumb">
            <button onClick={handleBack} className="artwork-detail__back">
              <FaArrowLeft /> Back
            </button>
            <div className="artwork-detail__nav">
              <Link to="/">Home</Link> / 
              <Link to="/gallery"> Gallery</Link> / 
              <Link to={`/gallery/${artwork.category}`}> {artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1)}</Link> / 
              <span> {artwork.title}</span>
            </div>
          </div>
          
          <div className="artwork-detail__main" ref={mainRef}>
            <motion.div 
              className="artwork-detail__gallery"
              initial="hidden"
              animate={mainInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <Slider {...sliderSettings}>
                {allImages.map((img, index) => (
                  <div key={index} className="artwork-detail__slide">
                    <img 
                      src={img} 
                      alt={`${artwork.title} - View ${index + 1}`} 
                      className="artwork-detail__image"
                    />
                  </div>
                ))}
              </Slider>
            </motion.div>
            
            <motion.div 
              className="artwork-detail__info"
              initial="hidden"
              animate={mainInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h1 className="artwork-detail__title">{artwork.title}</h1>
              
              <div className="artwork-detail__artist">
                <p>By {artwork.artist}</p>
              </div>
              
              <div className="artwork-detail__meta">
                <p><strong>Medium:</strong> {artwork.medium}</p>
                <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
                <p><strong>Year:</strong> {artwork.year}</p>
                {artwork.forSale && (
                  <p className="artwork-detail__price">
                    <strong>Price:</strong> {formatPrice(artwork.price)}
                  </p>
                )}
              </div>
              
              <div className="artwork-detail__description">
                <p>{artwork.description}</p>
              </div>
              
              <div className="artwork-detail__actions">
                {artwork.forSale && (
                  <button className="btn btn--lg">
                    <FaShoppingCart /> Purchase Inquiry
                  </button>
                )}
                
                <button 
                  className={`btn btn--secondary ${liked ? 'btn--liked' : ''}`}
                  onClick={toggleLike}
                  aria-label={liked ? 'Unlike artwork' : 'Like artwork'}
                >
                  <FaHeart /> {liked ? 'Saved' : 'Save'}
                </button>
                
                <button 
                  className="btn btn--secondary"
                  onClick={handleShare}
                  aria-label="Share artwork"
                >
                  <FaShare /> Share
                </button>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="artwork-detail__artist-info"
            ref={detailsRef}
            initial="hidden"
            animate={detailsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2>About the Artist</h2>
            <p>{artwork.artistBio}</p>
          </motion.div>
          
          {relatedArtworks.length > 0 && (
            <motion.div 
              className="artwork-detail__related"
              ref={relatedRef}
              initial="hidden"
              animate={relatedInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h2>Related Artworks</h2>
              
              <div className="artwork-detail__related-slider">
                <Slider {...relatedSliderSettings}>
                  {relatedArtworks.map(related => (
                    <div key={related._id} className="artwork-detail__related-item">
                      <Link to={`/artwork/${related.slug}`}>
                        <div className="artwork-detail__related-img">
                          <img src={related.image} alt={related.title} />
                        </div>
                        <div className="artwork-detail__related-info">
                          <h3>{related.title}</h3>
                          <p>{related.medium}, {related.year}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            </motion.div>
          )}
          
          <div className="artwork-detail__cta">
            <Link to="/gallery" className="btn">
              Explore More Artworks
            </Link>
            <Link to="/contact" className="btn btn--secondary">
              Contact for Inquiries
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtworkDetail; 