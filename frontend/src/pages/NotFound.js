import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '../components/SeoHead';

const NotFound = () => {
  return (
    <>
      <SeoHead 
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
      />
      
      <motion.div 
        className="not-found"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <motion.div 
            className="not-found__content"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            
            <div className="not-found__actions">
              <Link to="/" className="btn">
                Return to Home
              </Link>
              
              <Link to="/gallery" className="btn btn--secondary">
                View Gallery
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="not-found__image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2892&q=80" 
              alt="Artistic 404 representation" 
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default NotFound; 