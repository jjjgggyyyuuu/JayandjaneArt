const mongoose = require('mongoose');
const slugify = require('slugify');

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the artwork'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Please provide an image for the artwork']
  },
  // Additional images (optional)
  additionalImages: [String],
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: {
      values: ['painting', 'sculpture', 'digital', 'photography', 'drawing', 'mixed-media', 'installation', 'other'],
      message: 'Please select a valid category'
    }
  },
  medium: {
    type: String,
    required: [true, 'Please specify medium used'],
    trim: true
  },
  dimensions: {
    type: String,
    required: [true, 'Please provide dimensions'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Please provide the year of creation'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  forSale: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: function() { return this.forSale === true; }
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
  },
  featured: {
    type: Boolean,
    default: false
  },
  sold: {
    type: Boolean,
    default: false
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  metaTitle: String,
  metaDescription: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Middleware to create slug before saving
artworkSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = slugify(this.title, {
    lower: true,
    strict: true
  });
  
  next();
});

// Virtual for formatted price
artworkSchema.virtual('formattedPrice').get(function() {
  if (!this.price) return null;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: this.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  return formatter.format(this.price);
});

// Index for faster queries
artworkSchema.index({ slug: 1 });
artworkSchema.index({ category: 1 });
artworkSchema.index({ featured: 1 });
artworkSchema.index({ forSale: 1, sold: 1 });
artworkSchema.index({ tags: 1 });

const Artwork = mongoose.model('Artwork', artworkSchema);
module.exports = Artwork; 