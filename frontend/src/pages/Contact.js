import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';
import axios from 'axios';
import SeoHead from '../components/SeoHead';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });
  
  const [validation, setValidation] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [formRef, formInView] = useInView({
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
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error when user starts typing
    if (validation[name]) {
      setValidation({
        ...validation,
        [name]: ''
      });
    }
  };
  
  // Validate form data
  const validateForm = () => {
    let isValid = true;
    const newValidation = { name: '', email: '', message: '' };
    
    if (!formData.name.trim()) {
      newValidation.name = 'Please enter your name';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newValidation.email = 'Please enter your email';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newValidation.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newValidation.message = 'Please enter your message';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newValidation.message = 'Message must be at least 10 characters';
      isValid = false;
    }
    
    setValidation(newValidation);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setFormStatus({
      submitting: true,
      success: false,
      error: null
    });
    
    try {
      // In a real app, we would send to the API
      // This is a mockup for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setFormStatus({
        submitting: false,
        success: true,
        error: null
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prevState => ({
          ...prevState,
          success: false
        }));
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      setFormStatus({
        submitting: false,
        success: false,
        error: 'Failed to send your message. Please try again later.'
      });
    }
  };
  
  return (
    <>
      <SeoHead 
        title="Contact Us"
        description="Get in touch with Jay and Jane Art Studio. We're here to answer your questions about our artworks, commissions, or exhibition opportunities."
      />
      
      <div className="contact">
        <div className="container">
          <div className="contact__header">
            <h1>Contact Us</h1>
            <p>
              We'd love to hear from you! Whether you have questions about our artworks,
              are interested in commissioning a piece, or want to discuss exhibition opportunities,
              please get in touch.
            </p>
          </div>
          
          <div className="contact__content">
            <motion.div 
              className="contact__info"
              ref={infoRef}
              initial="hidden"
              animate={infoInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div className="contact__info-item" variants={fadeInUp}>
                <div className="contact__info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact__info-content">
                  <h3>Our Location</h3>
                  <p>
                    123 Art Lane<br />
                    Art City, AC 12345<br />
                    United States
                  </p>
                </div>
              </motion.div>
              
              <motion.div className="contact__info-item" variants={fadeInUp}>
                <div className="contact__info-icon">
                  <FaEnvelope />
                </div>
                <div className="contact__info-content">
                  <h3>Email Us</h3>
                  <p>
                    <a href="mailto:info@jayandjane.com">info@jayandjane.com</a><br />
                    <a href="mailto:sales@jayandjane.com">sales@jayandjane.com</a>
                  </p>
                </div>
              </motion.div>
              
              <motion.div className="contact__info-item" variants={fadeInUp}>
                <div className="contact__info-icon">
                  <FaPhone />
                </div>
                <div className="contact__info-content">
                  <h3>Call Us</h3>
                  <p>
                    <a href="tel:+15551234567">+1 (555) 123-4567</a><br />
                    <a href="tel:+15559876543">+1 (555) 987-6543</a>
                  </p>
                </div>
              </motion.div>
              
              <motion.div className="contact__info-item" variants={fadeInUp}>
                <div className="contact__info-icon">
                  <FaClock />
                </div>
                <div className="contact__info-content">
                  <h3>Gallery Hours</h3>
                  <p>
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </motion.div>
              
              <motion.div className="contact__map" variants={fadeInUp}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9914406081493!2d2.292292615201654!3d48.85837360866272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1586539498133!5m2!1sen!2sus"
                  title="Jay and Jane Studio Location"
                  width="100%"
                  height="350"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="contact__form-container"
              ref={formRef}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <div className="contact__form-header">
                <h2>Send Us A Message</h2>
                <p>We'll get back to you as soon as possible.</p>
              </div>
              
              {formStatus.success && (
                <div className="contact__form-success">
                  <p>Thank you for your message! We'll be in touch soon.</p>
                </div>
              )}
              
              {formStatus.error && (
                <div className="contact__form-error">
                  <p>{formStatus.error}</p>
                </div>
              )}
              
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${validation.name ? 'is-invalid' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                    disabled={formStatus.submitting}
                  />
                  {validation.name && (
                    <div className="invalid-feedback">{validation.name}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${validation.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    disabled={formStatus.submitting}
                  />
                  {validation.email && (
                    <div className="invalid-feedback">{validation.email}</div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={formStatus.submitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-control ${validation.message ? 'is-invalid' : ''}`}
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    disabled={formStatus.submitting}
                  ></textarea>
                  {validation.message && (
                    <div className="invalid-feedback">{validation.message}</div>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="btn btn--lg"
                  disabled={formStatus.submitting}
                >
                  {formStatus.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact; 