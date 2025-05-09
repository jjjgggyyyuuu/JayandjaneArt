import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.1, duration: 0.6 }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // For demo purposes, using a simple check
      // In production, you'd authenticate against your backend
      if (email === 'admin@jayandjane.com' && password === 'admin123') {
        // Create a local storage token to simulate authentication
        localStorage.setItem('jjAdminToken', 'demo-token-12345');
        localStorage.setItem('jjAdminUser', JSON.stringify({
          name: 'Admin',
          email: 'admin@jayandjane.com',
          role: 'admin'
        }));
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="admin-login"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="container">
        <div className="admin-login__wrapper">
          <h1 className="admin-login__title">Admin Login</h1>
          <p className="admin-login__subtitle">Access the Jay and Jane Studio admin area</p>
          
          {error && (
            <div className="admin-login__error">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="admin-login__form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn--lg"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLogin; 