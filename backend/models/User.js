
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Corrected typo from 'beryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['farmer', 'agronomist', 'admin'],
    default: 'farmer'
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    location: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Modern Async Pre-save Hook (Removed 'next')
userSchema.pre('save', async function() {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return; // Just return; no next() needed in async hooks
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Corrected Password Comparison Method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);