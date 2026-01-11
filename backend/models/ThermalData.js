

const mongoose = require('mongoose');

const thermalDataSchema = new mongoose.Schema({
  cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  measurementDate: { type: Date, default: Date.now },
  beforeTemp: { type: Number, required: true },
  afterTemp: { type: Number, required: true },
  thermalDelta: { type: Number },
  environmental: {
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    rainfall: { type: Number, required: true },
    soilMoisture: { type: Number }
  },
  fertilizer: {
    type: { type: String, default: 'NPK' },
    amount: Number,
    unit: { type: String, default: 'kg' },
    N_content: Number,
    P_content: Number,
    K_content: Number
  },
  analysis: {
    efficiencyScore: Number,
    deficiencies: [String],
    recommendations: String,
    stressLevel: String
  },
  processed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// FIXED: Removed 'next' parameter to prevent the 500 crash
thermalDataSchema.pre('save', function() {
  if (this.afterTemp !== undefined && this.beforeTemp !== undefined) {
    this.thermalDelta = this.afterTemp - this.beforeTemp;
  }
});

thermalDataSchema.index({ cropId: 1, measurementDate: -1 });
thermalDataSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('ThermalData', thermalDataSchema);