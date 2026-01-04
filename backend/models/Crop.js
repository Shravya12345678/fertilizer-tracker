// const mongoose = require('mongoose');

// const cropSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   cropName: {
//     type: String,
//     required: [true, 'Crop name is required'],
//     trim: true
//   },
//   cropType: {
//     type: String,
//     enum: [
//       'rice', 'wheat', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
//       'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
//       'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
//       'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee',
//       'tomato', 'potato', 'pepper', 'corn'  // Added for image dataset
//     ],
//     required: true
//   },
//   plantingDate: {
//     type: Date,
//     required: true
//   },
//   expectedHarvestDate: {
//     type: Date
//   },
//   location: {
//     latitude: Number,
//     longitude: Number,
//     address: String,
//     fieldName: String
//   },
//   soilData: {
//     N: {
//       type: Number,
//       required: true,
//       min: 0,
//       max: 200
//     },
//     P: {
//       type: Number,
//       required: true,
//       min: 0,
//       max: 200
//     },
//     K: {
//       type: Number,
//       required: true,
//       min: 0,
//       max: 300
//     },
//     pH: {
//       type: Number,
//       required: true,
//       min: 3,
//       max: 10
//     }
//   },
//   fieldSize: {
//     type: Number,
//     default: 1,
//     min: 0
//   },
//   status: {
//     type: String,
//     enum: ['planning', 'active', 'harvested', 'abandoned'],
//     default: 'active'
//   },
//   notes: String,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Update timestamp on save
// cropSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// // Index for faster queries
// cropSchema.index({ userId: 1, status: 1 });

// module.exports = mongoose.model('Crop', cropSchema);

const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cropName: { type: String, required: [true, 'Crop name is required'], trim: true },
  cropType: {
    type: String,
    enum: [
      'rice', 'wheat', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
      'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
      'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
      'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee',
      'tomato', 'potato', 'pepper', 'corn'
    ],
    required: true,
    lowercase: true
  },
  plantingDate: { type: Date, required: true },
  expectedHarvestDate: { type: Date },
  location: { latitude: Number, longitude: Number, address: String, fieldName: String },
  soilData: {
    N: { type: Number, required: true, min: 0, max: 200 },
    P: { type: Number, required: true, min: 0, max: 200 },
    K: { type: Number, required: true, min: 0, max: 300 },
    pH: { type: Number, required: true, min: 3, max: 10 }
  },
  fieldSize: { type: Number, default: 1 },
  status: { type: String, enum: ['planning', 'active', 'harvested', 'abandoned'], default: 'active' },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// FIXED: Using the modern syntax without 'next' to avoid the TypeError
cropSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

cropSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('Crop', cropSchema);