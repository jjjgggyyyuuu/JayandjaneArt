import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div 
      className="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="loader__logo"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Jay & Jane
      </motion.div>
      
      <div className="loader__spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      <motion.div 
        className="loader__text"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Loading your experience<span>.</span><span>.</span><span>.</span>
      </motion.div>
    </motion.div>
  );
};

export default Loader; 