import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Slider from 'react-slick';
import { FaArrowDown, FaQuoteLeft } from 'react-icons/fa';
import SeoHead from '../components/SeoHead';

// Import Slick slider CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Intersection Observer hooks for animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [featuredRef, featuredInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  // Fetch featured artworks
  useEffect(() => {
    const fetchFeaturedArtworks = async () => {
      try {
        // In a real app, we would filter by featured flag
        // This is a mockup with dummy data for now
        setFeaturedArtworks([
          {
            _id: '1',
            title: 'Urban Reflections',
            slug: 'urban-reflections',
            category: 'painting',
            medium: 'Oil on Canvas',
            year: 2023,
            image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2127&q=80'
          },
          {
            _id: '2',
            title: 'Ethereal Dreams',
            slug: 'ethereal-dreams',
            category: 'digital',
            medium: 'Digital Art',
            year: 2022,
            image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
          },
          {
            _id: '3',
            title: 'Sculpted Emotions',
            slug: 'sculpted-emotions',
            category: 'sculpture',
            medium: 'Bronze',
            year: 2021,
            image: 'https://images.unsplash.com/photo-1544413164-5f1b361f5d8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
          }
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured artworks:', error);
        setLoading(false);
      }
    };
    
    fetchFeaturedArtworks();
  }, []);
  
  // Testimonial slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    adaptiveHeight: true
  };
  
  // Scroll to featured section
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById('featured');
    featuredSection.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <>
      <SeoHead 
        title="Home"
        description="Welcome to Jay and Jane Art Studio - a contemporary art gallery showcasing exceptional original artworks, paintings, sculptures and digital art."
      />
      
      <section className="home__hero" ref={heroRef}>
        <div className="home__hero-bg">
          <img src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80" alt="Jay and Jane Art Studio" />
        </div>
        
        <motion.div 
          className="home__hero-content"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h1 className="home__hero-title" variants={fadeInUp}>
            Jay & Jane <br/> Art Studio
          </motion.h1>
          
          <motion.p className="home__hero-subtitle" variants={fadeInUp}>
            Where imagination meets canvas and creativity knows no bounds
          </motion.p>
          
          <motion.div className="home__hero-buttons" variants={fadeInUp}>
            <Link to="/gallery" className="btn btn--lg">
              Explore Gallery
            </Link>
            <Link to="/about" className="btn btn--lg btn--secondary">
              About Us
            </Link>
          </motion.div>
        </motion.div>
        
        <div className="home__hero-scroll" onClick={scrollToFeatured}>
          <span>Scroll Down</span>
          <FaArrowDown />
        </div>
      </section>
      
      <section id="featured" className="home__featured" ref={featuredRef}>
        <div className="container">
          <motion.div 
            className="home__featured-header"
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp}>Featured Artworks</motion.h2>
            <motion.p variants={fadeInUp}>
              Discover our curated selection of exceptional pieces that showcase our artistic vision and creative philosophy.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="home__featured-grid"
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {featuredArtworks.map((artwork, index) => (
              <motion.div 
                key={artwork._id}
                className="home__featured-item"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className="home__featured-img">
                  <img src={artwork.image} alt={artwork.title} loading="lazy" />
                </div>
                <div className="home__featured-overlay">
                  <h3>{artwork.title}</h3>
                  <p>{artwork.medium}, {artwork.year}</p>
                  <Link 
                    to={`/artwork/${artwork.slug}`} 
                    className="btn btn--sm"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="home__featured-view-all"
            initial={{ opacity: 0, y: 20 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link to="/gallery" className="btn">View All Artwork</Link>
          </motion.div>
        </div>
      </section>
      
      <section className="home__about" ref={aboutRef}>
        <div className="container">
          <div className="home__about-inner">
            <motion.div 
              className="home__about-image"
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80" alt="Jay and Jane at the studio" loading="lazy" />
            </motion.div>
            
            <motion.div 
              className="home__about-content"
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp}>About Our Studio</motion.h2>
              
              <motion.p variants={fadeInUp}>
                Founded in 2020, Jay & Jane Art Studio has quickly become a beacon for contemporary art enthusiasts. Our gallery showcases a curated collection of works from both established and emerging artists.
              </motion.p>
              
              <motion.p variants={fadeInUp}>
                We believe in the transformative power of art and its ability to evoke emotions, spark conversations, and challenge perspectives. Each piece in our collection tells a unique story and represents the pinnacle of artistic excellence.
              </motion.p>
              
              <motion.div variants={fadeInUp}>
                <Link to="/about" className="btn">Learn More About Us</Link>
              </motion.div>
              
              <motion.img 
                src="/images/signature.png" 
                alt="Signature" 
                className="signature"
                variants={fadeInUp}
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="home__testimonials" ref={testimonialsRef}>
        <div className="container">
          <motion.div 
            className="home__testimonials-header"
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp}>Client Testimonials</motion.h2>
            <motion.p variants={fadeInUp}>
              Hear what art collectors and enthusiasts have to say about their experiences with Jay & Jane Studio.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="home__testimonials-slider"
            initial={{ opacity: 0 }}
            animate={testimonialsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Slider {...sliderSettings}>
              <div className="home__testimonials-item">
                <blockquote>
                  The artwork I purchased from Jay & Jane Studio has transformed my living space. The attention to detail and emotional depth of the piece continue to inspire me daily.
                </blockquote>
                <div className="author">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" loading="lazy" />
                  <div className="info">
                    <h4>Sarah Johnson</h4>
                    <p>Art Collector</p>
                  </div>
                </div>
              </div>
              
              <div className="home__testimonials-item">
                <blockquote>
                  Working with Jay & Jane Studio was an absolute pleasure. Their expertise and passion for art made the acquisition process seamless and enjoyable.
                </blockquote>
                <div className="author">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Rodriguez" loading="lazy" />
                  <div className="info">
                    <h4>Michael Rodriguez</h4>
                    <p>Interior Designer</p>
                  </div>
                </div>
              </div>
              
              <div className="home__testimonials-item">
                <blockquote>
                  I've been collecting art for over 20 years, and Jay & Jane Studio offers some of the most innovative and thought-provoking pieces I've encountered. Truly exceptional.
                </blockquote>
                <div className="author">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Emily Chen" loading="lazy" />
                  <div className="info">
                    <h4>Emily Chen</h4>
                    <p>Art Enthusiast</p>
                  </div>
                </div>
              </div>
            </Slider>
          </motion.div>
        </div>
      </section>
      
      <section className="home__cta" ref={ctaRef}>
        <div className="container">
          <motion.div 
            className="home__cta-inner"
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp}>Ready to Begin Your Art Journey?</motion.h2>
            <motion.p variants={fadeInUp}>
              Whether you're a seasoned collector or new to the art world, we're here to guide you through the process of finding the perfect piece that resonates with your vision and space.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/contact" className="btn btn--accent btn--lg">Get in Touch</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home; 