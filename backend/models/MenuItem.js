// models/MenuItem.js
import mongoose from 'mongoose';
import { categories } from './allMenuCategories.js';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: categories,
    required: true
  },
  imageUrl: { 
    type: String,
    default: ''
  }
});

export default mongoose.model('MenuItem', menuItemSchema);
