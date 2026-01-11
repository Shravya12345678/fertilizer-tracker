


const axios = require('axios');
const ThermalData = require('../models/ThermalData');

exports.analyzeThermalData = async (req, res) => {
  try {
    const { thermalDataId } = req.params;
    const thermalData = await ThermalData.findById(thermalDataId).populate('cropId');

    if (!thermalData) return res.status(404).json({ success: false, message: 'Data not found' });

    // Construct Payload for Python
    const mlPayload = {
      N: thermalData.cropId.soilData.N || 0,
      P: thermalData.cropId.soilData.P || 0,
      K: thermalData.cropId.soilData.K || 0,
      temperature: thermalData.environmental.temperature || 0,
      humidity: thermalData.environmental.humidity || 0,
      ph: thermalData.cropId.soilData.pH || 7.0,
      rainfall: thermalData.environmental.rainfall || 0,
      thermal_delta: thermalData.thermalDelta || 0,
      green_ratio: 0.75
    };

    const ML_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:10000';
    const mlResponse = await axios.post(`${ML_URL}/api/predict`, mlPayload);
    const result = mlResponse.data;

    // Save to Database
    thermalData.analysis = {
      efficiencyScore: result.efficiency_score,
      deficiencies: [result.deficiency],
      recommendations: result.recommendations,
      stressLevel: result.stress_level,
      heatmapImage: result.heatmap_image // Saving the Base64 string from Python
    };
    thermalData.processed = true;
    thermalData.processingDetails = { processedAt: new Date() };

    await thermalData.save();
    res.json({ success: true, data: thermalData });

  } catch (error) {
    console.error("Analysis Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAnalysisHistory = async (req, res) => {
  try {
    const history = await ThermalData.find({ userId: req.user.id, processed: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: history });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};