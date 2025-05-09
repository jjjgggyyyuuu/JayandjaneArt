import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaUpload } from 'react-icons/fa';
import axios from 'axios';

const ArtworkForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'painting',
    medium: '',
    dimensions: '',
    year: new Date().getFullYear(),
    forSale: false,
    price: '',
  });
  
  // State for image file
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // State for form submission
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.1, duration: 0.6 }
    }
  };
  
  // Fetch artwork data if in edit mode
  useEffect(() => {
    const fetchArtwork = async () => {
      if (!isEditMode) return;
      
      setLoading(true);
      setError('');
      
      try {
        // In a real app, you would fetch from API
        // This is a mockup for demo purposes
        const mockArtworks = {
          '1': {
            title: 'Urban Reflections',
            description: 'A contemporary exploration of city life and urban landscapes.',
            category: 'painting',
            medium: 'Oil on Canvas',
            dimensions: '36 x 48 inches',
            year: 2023,
            forSale: true,
            price: 3800,
            image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2127&q=80'
          },
          '2': {
            title: 'Ethereal Dreams',
            description: 'Digital artwork exploring the boundary between reality and dreams.',
            category: 'digital',
            medium: 'Digital Art',
            dimensions: '24 x 36 inches (print)',
            year: 2022,
            forSale: true,
            price: 1200,
            image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
          },
          '3': {
            title: 'Sculpted Emotions',
            description: 'A bronze sculpture that captures the complexity of human emotions.',
            category: 'sculpture',
            medium: 'Bronze',
            dimensions: '18 x 12 x 8 inches',
            year: 2021,
            forSale: true,
            price: 5600,
            image: 'https://images.unsplash.com/photo-1544413164-5f1b361f5d8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
          }
        };
        
        if (mockArtworks[id]) {
          setFormData(mockArtworks[id]);
          setImagePreview(mockArtworks[id].image);
        } else {
          setError('Artwork not found');
        }
      } catch (err) {
        setError('Failed to fetch artwork details');
        console.error('Error fetching artwork:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtwork();
  }, [id, isEditMode]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setImageFile(file);
    
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validate form
    if (!formData.title || !formData.description || !formData.medium || !formData.dimensions) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }
    
    if (!imageFile && !isEditMode) {
      setError('Please upload an image');
      setLoading(false);
      return;
    }
    
    if (formData.forSale && !formData.price) {
      setError('Please enter a price if the artwork is for sale');
      setLoading(false);
      return;
    }
    
    try {
      // In a real app, you would send this to your API
      // Create FormData object for file upload
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      // Append image file if selected
      if (imageFile) {
        submitData.append('image', imageFile);
      }
      
      // Log the data that would be sent
      console.log('Form data to be sent:', Object.fromEntries(submitData));
      
      // In a real app, this would be an API call:
      // if (isEditMode) {
      //   await axios.put(`/api/artworks/${id}`, submitData);
      // } else {
      //   await axios.post('/api/artworks', submitData);
      // }
      
      // Show success message
      setSuccess(isEditMode ? 'Artwork updated successfully!' : 'Artwork created successfully!');
      
      // Redirect after short delay
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } catch (err) {
      setError('Failed to save artwork. Please try again.');
      console.error('Error saving artwork:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Available artwork categories
  const categories = [
    'painting',
    'sculpture',
    'digital',
    'photography',
    'drawing',
    'mixed-media',
    'installation',
    'other'
  ];
  
  return (
    <motion.div 
      className="artwork-form"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="container">
        <div className="artwork-form__header">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="artwork-form__back-btn"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1 className="artwork-form__title">
            {isEditMode ? 'Edit Artwork' : 'Add New Artwork'}
          </h1>
        </div>
        
        {error && (
          <div className="artwork-form__error">
            {error}
          </div>
        )}
        
        {success && (
          <div className="artwork-form__success">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="artwork-form__form">
          <div className="row">
            <div className="col-8">
              <div className="form-group">
                <label htmlFor="title" className="form-label">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description" className="form-label">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                ></textarea>
              </div>
              
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="category" className="form-label">Category *</label>
                    <select
                      id="category"
                      name="category"
                      className="form-control"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="medium" className="form-label">Medium *</label>
                    <input
                      type="text"
                      id="medium"
                      name="medium"
                      className="form-control"
                      value={formData.medium}
                      onChange={handleChange}
                      required
                      placeholder="E.g., Oil on Canvas"
                    />
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="dimensions" className="form-label">Dimensions *</label>
                    <input
                      type="text"
                      id="dimensions"
                      name="dimensions"
                      className="form-control"
                      value={formData.dimensions}
                      onChange={handleChange}
                      required
                      placeholder="E.g., 24 x 36 inches"
                    />
                  </div>
                </div>
                
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="year" className="form-label">Year *</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      className="form-control"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="forSale"
                    name="forSale"
                    checked={formData.forSale}
                    onChange={handleChange}
                  />
                  <label htmlFor="forSale" className="checkbox-label">
                    Artwork is for sale
                  </label>
                </div>
              </div>
              
              {formData.forSale && (
                <div className="form-group">
                  <label htmlFor="price" className="form-label">Price *</label>
                  <div className="price-input">
                    <span className="price-input__currency">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="form-control"
                      value={formData.price}
                      onChange={handleChange}
                      required={formData.forSale}
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="col-4">
              <div className="form-group">
                <label className="form-label">Artwork Image *</label>
                <div className="image-upload">
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Artwork Preview" />
                    </div>
                  ) : (
                    <div className="image-placeholder">
                      <FaUpload />
                      <p>Upload Image</p>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="file-input"
                  />
                  
                  <label htmlFor="image" className="btn btn--secondary btn--block">
                    {imagePreview ? 'Change Image' : 'Select Image'}
                  </label>
                </div>
                <small className="image-help">
                  Supported formats: JPG, PNG, GIF, WEBP. Max size: 5MB.
                </small>
              </div>
            </div>
          </div>
          
          <div className="artwork-form__submit">
            <button 
              type="submit" 
              className="btn btn--lg btn--accent"
              disabled={loading}
            >
              <FaSave /> {loading ? 'Saving...' : (isEditMode ? 'Update Artwork' : 'Save Artwork')}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ArtworkForm; 