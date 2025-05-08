import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import SeoHead from '../components/SeoHead';

const Gallery = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(category || 'all');
  const [visibleCount, setVisibleCount] = useState(9);
  
  const [ref, inView] = useInView({
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
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 3,
    1200: 3,
    992: 2,
    576: 1
  };
  
  // Fetch artworks
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        // In a real app, we would fetch from the API
        // This is a mockup with dummy data for now
        const dummyArtworks = [
          {
            _id: '1',
            title: 'Urban Reflections',
            slug: 'urban-reflections',
            description: 'A contemporary exploration of city life and urban landscapes.',
            category: 'painting',
            medium: 'Oil on Canvas',
            dimensions: '36 x 48 inches',
            year: 2023,
            image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2127&q=80'
          },
          {
            _id: '2',
            title: 'Ethereal Dreams',
            slug: 'ethereal-dreams',
            description: 'Digital artwork exploring the boundary between reality and dreams.',
            category: 'digital',
            medium: 'Digital Art',
            dimensions: '24 x 36 inches (print)',
            year: 2022,
            image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
          },
          {
            _id: '3',
            title: 'Sculpted Emotions',
            slug: 'sculpted-emotions',
            description: 'A bronze sculpture that captures the complexity of human emotions.',
            category: 'sculpture',
            medium: 'Bronze',
            dimensions: '18 x 12 x 8 inches',
            year: 2021,
            image: 'https://images.unsplash.com/photo-1544413164-5f1b361f5d8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
          },
          {
            _id: '4',
            title: 'Abstract Harmony',
            slug: 'abstract-harmony',
            description: 'Abstract composition exploring color and form in harmony.',
            category: 'painting',
            medium: 'Acrylic on Canvas',
            dimensions: '30 x 40 inches',
            year: 2023,
            image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1258&q=80'
          },
          {
            _id: '5',
            title: 'Timeless Moment',
            slug: 'timeless-moment',
            description: 'Black and white photography capturing a fleeting, yet timeless moment.',
            category: 'photography',
            medium: 'Silver Gelatin Print',
            dimensions: '20 x 24 inches',
            year: 2022,
            image: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1240&q=80'
          },
          {
            _id: '6',
            title: 'Geometric Exploration',
            slug: 'geometric-exploration',
            description: 'A mixed media piece exploring geometric patterns and textures.',
            category: 'mixed-media',
            medium: 'Mixed Media on Wood Panel',
            dimensions: '24 x 24 inches',
            year: 2023,
            image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1266&q=80'
          },
          {
            _id: '7',
            title: 'Nature\'s Whisper',
            slug: 'natures-whisper',
            description: 'An impressionistic painting inspired by the subtle beauty of nature.',
            category: 'painting',
            medium: 'Oil on Canvas',
            dimensions: '36 x 48 inches',
            year: 2022,
            image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
          },
          {
            _id: '8',
            title: 'Digital Revolution',
            slug: 'digital-revolution',
            description: 'Digital artwork exploring technology and its impact on society.',
            category: 'digital',
            medium: 'Digital Art',
            dimensions: '30 x 30 inches (print)',
            year: 2023,
            image: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1264&q=80'
          },
          {
            _id: '9',
            title: 'Urban Wilderness',
            slug: 'urban-wilderness',
            description: 'Photography exploring the intersection of urban spaces and nature.',
            category: 'photography',
            medium: 'Archival Pigment Print',
            dimensions: '24 x 36 inches',
            year: 2022,
            image: 'https://images.unsplash.com/photo-1469817291684-6fc417bfbf8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1285&q=80'
          },
          {
            _id: '10',
            title: 'Floating Elements',
            slug: 'floating-elements',
            description: 'A sculpture that creates the illusion of elements floating in space.',
            category: 'sculpture',
            medium: 'Stainless Steel and Glass',
            dimensions: '24 x 18 x 18 inches',
            year: 2023,
            image: 'https://images.unsplash.com/photo-1554188572-9d184b57d8e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1286&q=80'
          },
          {
            _id: '11',
            title: 'Vibrant Dialogue',
            slug: 'vibrant-dialogue',
            description: 'A bold, colorful painting creating a visual dialogue between shapes and hues.',
            category: 'painting',
            medium: 'Acrylic on Canvas',
            dimensions: '48 x 60 inches',
            year: 2022,
            image: 'https://images.unsplash.com/photo-1579541592774-7a15e9371a3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1285&q=80'
          },
          {
            _id: '12',
            title: 'Conceptual Framework',
            slug: 'conceptual-framework',
            description: 'A conceptual piece that challenges perceptions of structure and meaning.',
            category: 'mixed-media',
            medium: 'Found Objects and Acrylic',
            dimensions: 'Variable',
            year: 2023,
            image: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          }
        ];
        
        setArtworks(dummyArtworks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        setError('Failed to load artworks. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchArtworks();
  }, []);
  
  // Filter artworks when category changes
  useEffect(() => {
    if (category && category !== 'all') {
      setFilter(category);
    }
  }, [category]);
  
  // Apply filters
  useEffect(() => {
    if (filter === 'all') {
      setFilteredArtworks(artworks);
    } else {
      setFilteredArtworks(artworks.filter(artwork => artwork.category === filter));
    }
    
    // Reset visible count when filter changes
    setVisibleCount(9);
  }, [filter, artworks]);
  
  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    
    // Update URL without reloading
    if (newFilter === 'all') {
      navigate('/gallery');
    } else {
      navigate(`/gallery/${newFilter}`);
    }
  };
  
  // Load more artworks
  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };
  
  return (
    <>
      <SeoHead 
        title="Gallery"
        description="Explore our curated collection of fine art, including paintings, sculptures, photography, and digital art from talented artists."
      />
      
      <div className="gallery" ref={ref}>
        <div className="container">
          <motion.div 
            className="gallery__header"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h1>Our Gallery</h1>
            <p>
              Explore our curated collection of exceptional artworks. Each piece tells a unique story and represents the pinnacle of artistic expression.
            </p>
          </motion.div>
          
          <motion.div 
            className="gallery__filters"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => handleFilterChange('all')}
            >
              All Works
            </button>
            <button 
              className={filter === 'painting' ? 'active' : ''}
              onClick={() => handleFilterChange('painting')}
            >
              Paintings
            </button>
            <button 
              className={filter === 'sculpture' ? 'active' : ''}
              onClick={() => handleFilterChange('sculpture')}
            >
              Sculptures
            </button>
            <button 
              className={filter === 'photography' ? 'active' : ''}
              onClick={() => handleFilterChange('photography')}
            >
              Photography
            </button>
            <button 
              className={filter === 'digital' ? 'active' : ''}
              onClick={() => handleFilterChange('digital')}
            >
              Digital Art
            </button>
            <button 
              className={filter === 'mixed-media' ? 'active' : ''}
              onClick={() => handleFilterChange('mixed-media')}
            >
              Mixed Media
            </button>
          </motion.div>
          
          {loading ? (
            <div className="gallery__loading">
              <p>Loading artworks...</p>
            </div>
          ) : error ? (
            <div className="gallery__error">
              <p>{error}</p>
            </div>
          ) : filteredArtworks.length === 0 ? (
            <div className="gallery__empty">
              <h3>No artworks found</h3>
              <p>
                We couldn't find any artworks in this category.
                Please try another category or check back later.
              </p>
              <button 
                className="btn" 
                onClick={() => handleFilterChange('all')}
              >
                View All Works
              </button>
            </div>
          ) : (
            <>
              <motion.div 
                className="gallery__grid"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
              >
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="gallery__grid-masonry"
                  columnClassName="gallery__grid-col"
                >
                  <AnimatePresence>
                    {filteredArtworks.slice(0, visibleCount).map((artwork) => (
                      <motion.div
                        key={artwork._id}
                        className="gallery__item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        layout
                      >
                        <img 
                          src={artwork.image} 
                          alt={artwork.title} 
                          className="gallery__item-img"
                          loading="lazy"
                        />
                        <div className="gallery__item-overlay">
                          <h3>{artwork.title}</h3>
                          <p>{artwork.medium}, {artwork.year}</p>
                          <Link 
                            to={`/artwork/${artwork.slug}`} 
                            className="btn"
                          >
                            View Details
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Masonry>
              </motion.div>
              
              {visibleCount < filteredArtworks.length && (
                <div className="gallery__load-more">
                  <button className="btn btn--lg" onClick={loadMore}>
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery; 