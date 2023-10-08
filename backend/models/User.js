// backend/models/User.js
import mongoose from 'mongoose';
import { roles } from './allRoles.js';  // importing all roles for 'role' value


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: roles,
    required: true
  }, 
  resetToken: {
    type: String,
    default: null
  },
  resetTokenExpiration: {
    type: Date,
    default: null
  }, 
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationTokenExpiration: Date, 
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  accountStatus: {
    type: String,
    enum: ['Active', 'Deactivated', 'Locked'],
    required: true,
    default: 'Active'
  }
});

export default mongoose.model('User', UserSchema);
