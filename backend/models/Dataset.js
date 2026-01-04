const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  N: {
    type: Number,
    required: true,
    min: 0
  },
  P: {
    type: Number,
    required: true,
    min: 0
  },
  K: {
    type: Number,
    required: true,
    min: 0
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  ph: {
    type: Number,
    required: true,
    min: 0,
    max: 14
  },
  rainfall: {
    type: Number,
    required: true,
    min: 0
  },
  label: {
    type: String,
    required: true
  }
}, {
  collection: 'training_dataset'
});

// Index for faster queries
datasetSchema.index({ label: 1 });

module.exports = mongoose.model('Dataset', datasetSchema);