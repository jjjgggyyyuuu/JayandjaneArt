const express = require('express');
const router = express.Router();
const axios = require('axios');
const Contact = require('../models/contactModel');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Save contact to database
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });
    
    await newContact.save();
    
    // You can add email notification here using services like SendGrid, Mailgun, etc.
    // Example with a hypothetical email service:
    try {
      await axios.post(process.env.EMAIL_SERVICE_URL, {
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
        text: `
          Name: ${name}
          Email: ${email}
          Subject: ${subject || 'No Subject'}
          Message: ${message}
        `
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Continue with success response even if email fails
    }
    
    res.status(201).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all contacts (admin only - in a real app, add authentication middleware)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 