import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Close mobile nav when route changes
    setMobileNavOpen(false);
  }, [location]);
  
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };
  
  return (
    <header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      style={scrolled ? { padding: '1.5rem 0', boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)' } : {}}
    >
      <div className="container header__container">
        <div className="header__logo">
          <Link to="/">Jay & Jane</Link>
        </div>
        
        <nav className={`header__nav ${mobileNavOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/gallery" 
                className={location.pathname.includes('/gallery') ? 'active' : ''}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={location.pathname === '/contact' ? 'active' : ''}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        <button 
          className="header__toggle" 
          onClick={toggleMobileNav}
          aria-label="Toggle navigation menu"
        >
          {mobileNavOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Header; 