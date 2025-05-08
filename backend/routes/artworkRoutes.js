const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Artwork = require('../models/artworkModel');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'jay-and-jane-portfolio',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, crop: 'limit' }]
  }
});

const upload = multer({ storage: storage });

// Get all artworks
router.get('/', async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 });
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get artwork by ID
router.get('/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new artwork
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, dimensions, medium, year, forSale, price } = req.body;
    
    const newArtwork = new Artwork({
      title,
      description,
      category,
      dimensions,
      medium,
      year,
      forSale: forSale === 'true',
      price: forSale === 'true' ? price : null,
      image: req.file.path
    });
    
    const savedArtwork = await newArtwork.save();
    res.status(201).json(savedArtwork);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update artwork
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, dimensions, medium, year, forSale, price } = req.body;
    
    const artworkData = {
      title,
      description,
      category,
      dimensions,
      medium,
      year,
      forSale: forSale === 'true',
      price: forSale === 'true' ? price : null,
    };
    
    if (req.file) {
      artworkData.image = req.file.path;
    }
    
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      req.params.id,
      artworkData,
      { new: true }
    );
    
    if (!updatedArtwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    
    res.json(updatedArtwork);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete artwork
router.delete('/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    
    // Delete image from Cloudinary if exists
    if (artwork.image) {
      const publicId = artwork.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`jay-and-jane-portfolio/${publicId}`);
    }
    
    await artwork.remove();
    res.json({ message: 'Artwork removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get artworks by category
router.get('/category/:category', async (req, res) => {
  try {
    const artworks = await Artwork.find({ 
      category: req.params.category 
    }).sort({ createdAt: -1 });
    
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 