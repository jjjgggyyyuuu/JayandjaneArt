import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import SeoHead from './components/SeoHead';

// Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ArtworkDetail from './pages/ArtworkDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [seoSettings, setSeoSettings] = useState(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Fetch SEO settings
    const fetchSeoSettings = async () => {
      try {
        const { data } = await axios.get('/api/seo/settings');
        setSeoSettings(data);
      } catch (error) {
        console.error('Error fetching SEO settings:', error);
      }
    };

    fetchSeoSettings();

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <SeoHead settings={seoSettings} />
      <Header />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:category" element={<Gallery />} />
            <Route path="/artwork/:slug" element={<ArtworkDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </>
  );
};

export default App; 