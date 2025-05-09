import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaImage } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.1, duration: 0.6 }
    }
  };

  // Fetch artworks from API
  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      setError('');
      
      try {
        // In a real app, fetch from the API
        // For demo purpose, using mock data
        const mockArtworks = [
          {
            _id: '1',
            title: 'Urban Reflections',
            category: 'painting',
            medium: 'Oil on Canvas',
            year: 2023,
            forSale: true,
            price: 3800,
            image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2127&q=80',
            createdAt: '2023-04-15T10:30:00Z'
          },
          {
            _id: '2',
            title: 'Ethereal Dreams',
            category: 'digital',
            medium: 'Digital Art',
            year: 2022,
            forSale: true,
            price: 1200,
            image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            createdAt: '2023-04-10T14:20:00Z'
          },
          {
            _id: '3',
            title: 'Sculpted Emotions',
            category: 'sculpture',
            medium: 'Bronze',
            year: 2021,
            forSale: true,
            price: 5600,
            image: 'https://images.unsplash.com/photo-1544413164-5f1b361f5d8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
            createdAt: '2023-03-28T09:15:00Z'
          }
        ];
        
        setArtworks(mockArtworks);
      } catch (err) {
        setError('Failed to fetch artworks. Please try again.');
        console.error('Error fetching artworks:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtworks();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('jjAdminToken');
    localStorage.removeItem('jjAdminUser');
    navigate('/admin/login');
  };

  // Handle artwork deletion
  const handleDeleteArtwork = async (id) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      try {
        // In a real app, call the API
        // For demo purposes, just filter out the artwork
        setArtworks(artworks.filter(artwork => artwork._id !== id));
      } catch (err) {
        console.error('Error deleting artwork:', err);
        alert('Failed to delete artwork');
      }
    }
  };

  return (
    <motion.div 
      className="admin-dashboard"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="container">
        <div className="admin-dashboard__header">
          <div>
            <h1 className="admin-dashboard__title">Admin Dashboard</h1>
            <p className="admin-dashboard__subtitle">Manage your artwork portfolio</p>
          </div>
          
          <div className="admin-dashboard__actions">
            <Link to="/admin/artworks/new" className="btn btn--accent">
              <FaPlus /> Add New Artwork
            </Link>
            <button onClick={handleLogout} className="btn btn--secondary">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
        
        {error && (
          <div className="admin-dashboard__error">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="admin-dashboard__loading">
            <h3>Loading artworks...</h3>
          </div>
        ) : (
          <div className="admin-dashboard__content">
            <h2 className="admin-dashboard__section-title">Your Artworks</h2>
            
            <div className="admin-dashboard__artworks">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Medium</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artworks.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center">No artworks found</td>
                    </tr>
                  ) : (
                    artworks.map(artwork => (
                      <tr key={artwork._id}>
                        <td>
                          <div className="admin-table__image">
                            <img src={artwork.image} alt={artwork.title} />
                          </div>
                        </td>
                        <td>{artwork.title}</td>
                        <td>{artwork.category}</td>
                        <td>{artwork.medium}</td>
                        <td>{artwork.year}</td>
                        <td>{artwork.forSale ? `$${artwork.price}` : 'Not for sale'}</td>
                        <td>
                          <div className="admin-table__actions">
                            <Link to={`/admin/artworks/edit/${artwork._id}`} className="btn btn--sm">
                              <FaEdit />
                            </Link>
                            <button 
                              onClick={() => handleDeleteArtwork(artwork._id)} 
                              className="btn btn--sm btn--danger"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard; 