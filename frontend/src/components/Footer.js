import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaPinterestP, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend or email service
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          <div className="footer__col">
            <div className="footer__logo">Jay & Jane</div>
            <p className="footer__about">
              Jay & Jane Art Studio is a contemporary art studio dedicated to exploring the boundaries of visual expression. Established in 2020, we showcase original artworks from talented artists around the world.
            </p>
            <div className="footer__social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <FaPinterestP />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>
          
          <div className="footer__col">
            <h3 className="footer__heading">Quick Links</h3>
            <ul className="footer__nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer__col">
            <h3 className="footer__heading">Contact Us</h3>
            <div className="footer__contact">
              <p>
                <FaMapMarkerAlt />
                <span>123 Art Lane, Art City, AC 12345</span>
              </p>
              <p>
                <FaPhone />
                <span>+1 (555) 123-4567</span>
              </p>
              <p>
                <FaEnvelope />
                <span>info@jayandjane.com</span>
              </p>
            </div>
            
            <h3 className="footer__heading mt-4">Gallery Hours</h3>
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          
          <div className="footer__col">
            <h3 className="footer__heading">Newsletter</h3>
            <p>Subscribe to our newsletter to receive updates on new exhibitions, events, and featured artworks.</p>
            <div className="footer__newsletter">
              <form onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  required 
                  aria-label="Email for newsletter"
                />
                <button type="submit" aria-label="Subscribe">
                  <FaEnvelope />
                </button>
              </form>
              <p className="mt-2" style={{ fontSize: '1.3rem', opacity: 0.8 }}>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>&copy; {currentYear} Jay & Jane Art Studio. All rights reserved. | Website designed with ❤️ for art</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 