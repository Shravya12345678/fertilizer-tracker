// const mongoose = require('mongoose');

// const thermalDataSchema = new mongoose.Schema({
//   cropId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Crop',
//     required: true
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   measurementDate: {
//     type: Date,
//     required: true,
//     default: Date.now
//   },
//   beforeTemp: {
//     type: Number,
//     required: true,
//     min: -10,
//     max: 60
//   },
//   afterTemp: {
//     type: Number,
//     required: true,
//     min: -10,
//     max: 60
//   },
//   thermalDelta: {
//     type: Number,
//     required: true
//   },
//   environmental: {
//     temperature: {
//       type: Number,
//       required: true,
//       min: -10,
//       max: 60
//     },
//     humidity: {
//       type: Number,
//       required: true,
//       min: 0,
//       max: 100
//     },
//     rainfall: {
//       type: Number,
//       required: true,
//       min: 0,
//       max: 500
//     },
//     soilMoisture: {
//       type: Number,
//       min: 0,
//       max: 100
//     }
//   },
//   fertilizer: {
//     type: {
//       type: String,
//       enum: ['NPK', 'Urea', 'DAP', 'MOP', 'SSP', 'Organic', 'Custom'],
//       default: 'NPK'
//     },
//     amount: {
//       type: Number,
//       min: 0
//     },
//     unit: {
//       type: String,
//       enum: ['kg', 'g', 'lbs'],
//       default: 'kg'
//     },
//     applicationDate: Date,
//     N_content: Number,
//     P_content: Number,
//     K_content: Number
//   },
//   analysis: {
//     efficiencyScore: {
//       type: Number,
//       min: 0,
//       max: 100
//     },
//     deficiencies: [String],
//     recommendations: String,
//     stressLevel: {
//       type: String,
//       enum: ['low', 'medium', 'high']
//     },
//     predictedYield: Number
//   },
//   images: [{
//     url: String,
//     filename: String,
//     type: {
//       type: String,
//       enum: ['thermal', 'visible', 'processed', 'other']
//     },
//     uploadDate: {
//       type: Date,
//       default: Date.now
//     }
//   }],
//   processed: {
//     type: Boolean,
//     default: false
//   },
//   processingDetails: {
//     processedAt: Date,
//     modelVersion: String,
//     confidence: Number
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Compute thermal delta before saving
// // thermalDataSchema.pre('save', function(next) {
// //   this.thermalDelta = this.afterTemp - this.beforeTemp;
// //   next();
// // });

// // // Indexes for faster queries
// // thermalDataSchema.index({ cropId: 1, measurementDate: -1 });
// // thermalDataSchema.index({ userId: 1, createdAt: -1 });

// // module.exports = mongoose.model('ThermalData', thermalDataSchema);


// thermalDataSchema.pre('save', function() {
//   this.thermalDelta = this.afterTemp - this.beforeTemp;
// });

// // Indexes for faster queries
// thermalDataSchema.index({ cropId: 1, measurementDate: -1 });
// thermalDataSchema.index({ userId: 1, createdAt: -1 });

// module.exports = mongoose.model('ThermalData', thermalDataSchema);

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