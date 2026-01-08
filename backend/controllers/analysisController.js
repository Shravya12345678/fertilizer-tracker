//1
// const axios = require('axios');
// const ThermalData = require('../models/ThermalData');
// const Crop = require('../models/Crop');

// // const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';
// const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:5001';

// const analyzeThermalData = async (req, res) => {
//   try {
//     const { thermalDataId } = req.params;

//     const thermalData = await ThermalData.findById(thermalDataId)
//       .populate('cropId', 'soilData cropType');

//     if (!thermalData) {
//       return res.status(404).json({
//         success: false,
//         message: 'Thermal data not found'
//       });
//     }

//     if (thermalData.userId.toString() !== req.user.id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized'
//       });
//     }

//     const mlInput = {
//       N: thermalData.cropId.soilData.N,
//       P: thermalData.cropId.soilData.P,
//       K: thermalData.cropId.soilData.K,
//       temperature: thermalData.environmental.temperature,
//       humidity: thermalData.environmental.humidity,
//       ph: thermalData.cropId.soilData.pH,
//       rainfall: thermalData.environmental.rainfall,
//       thermal_delta: thermalData.thermalDelta,
//       green_ratio: 0.7
//     };

//     console.log('Calling ML service...');
//     const mlResponse = await axios.post(
//       `${ML_SERVICE_URL}/api/predict`,
//       mlInput,
//       { timeout: 10000 }
//     );

//     if (!mlResponse.data.success) {
//       throw new Error('ML prediction failed');
//     }

//     const mlResult = mlResponse.data;

//     thermalData.analysis = {
//       efficiencyScore: mlResult.efficiency_score,
//       deficiencies: [mlResult.deficiency],
//       recommendations: mlResult.recommendations.join('\n'),
//       stressLevel: mlResult.stress_level
//     };
//     thermalData.processed = true;
//     thermalData.processingDetails = {
//       processedAt: new Date(),
//       modelVersion: '1.0.0',
//       confidence: mlResult.deficiency_probabilities[mlResult.deficiency] * 100
//     };

//     await thermalData.save();

//     res.json({
//       success: true,
//       message: 'Analysis completed successfully',
//       data: {
//         thermalData,
//         mlAnalysis: mlResult
//       }
//     });
//   } catch (error) {
//     console.error('Analysis error:', error);
    
//     if (error.code === 'ECONNREFUSED') {
//       return res.status(503).json({
//         success: false,
//         message: 'ML service is not available. Please ensure ML service is running on port 5001'
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Error analyzing thermal data',
//       error: error.message
//     });
//   }
// };

// module.exports = { analyzeThermalData };



//2
// const axios = require('axios');
// const ThermalData = require('../models/ThermalData');
// const Crop = require('../models/Crop');

// const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:5001';

// const analyzeThermalData = async (req, res) => {
//   try {
//     const { id } = req.params; // Using 'id' to match standard route params

//     // 1. Fetch data using your original 'populate' logic
//     const thermalData = await ThermalData.findById(id)
//       .populate('cropId', 'soilData cropType');

//     if (!thermalData) {
//       return res.status(404).json({ success: false, message: 'Thermal data not found' });
//     }

//     if (thermalData.userId.toString() !== req.user.id) {
//       return res.status(403).json({ success: false, message: 'Not authorized' });
//     }

//     // 2. Map data exactly as you had it
//     const mlInput = {
//       N: thermalData.cropId.soilData.N,
//       P: thermalData.cropId.soilData.P,
//       K: thermalData.cropId.soilData.K,
//       temperature: thermalData.environmental.temperature,
//       humidity: thermalData.environmental.humidity,
//       ph: thermalData.cropId.soilData.pH,
//       rainfall: thermalData.environmental.rainfall,
//       thermal_delta: thermalData.thermalDelta,
//       green_ratio: 0.7
//     };

//     console.log('📡 Calling ML service at:', `${ML_SERVICE_URL}/api/predict`);

//     // 3. THE FIX: Increased timeout to 30 seconds
//     const mlResponse = await axios.post(
//       `${ML_SERVICE_URL}/api/predict`,
//       mlInput,
//       { timeout: 30000 } 
//     );

//     const mlResult = mlResponse.data;

//     // 4. Update the record
//     thermalData.analysis = {
//       efficiencyScore: mlResult.efficiency_score,
//       deficiencies: [mlResult.deficiency],
//       // Safety: Join array if it's an array, or just use the string
//       recommendations: Array.isArray(mlResult.recommendations) 
//                        ? mlResult.recommendations.join('\n') 
//                        : mlResult.recommendations,
//       stressLevel: mlResult.stress_level
//     };

//     thermalData.processed = true;
//     thermalData.processingDetails = {
//       processedAt: new Date(),
//       modelVersion: '1.0.0',
//       // Safety: check if deficiency_probabilities exists
//       confidence: mlResult.deficiency_probabilities 
//                   ? mlResult.deficiency_probabilities[mlResult.deficiency] * 100 
//                   : 0
//     };

//     await thermalData.save();

//     res.json({
//       success: true,
//       message: 'Analysis completed successfully',
//       data: {
//         thermalData,
//         mlAnalysis: mlResult
//       }
//     });

//   } catch (error) {
//     console.error('❌ Analysis error:', error.message);
    
//     // Handle the timeout specifically
//     if (error.code === 'ECONNABORTED') {
//       return res.status(504).json({
//         success: false,
//         message: 'The AI model took too long to respond. Please try again.'
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Error analyzing thermal data',
//       error: error.message
//     });
//   }
// };

// module.exports = { analyzeThermalData };

// const axios = require('axios');
// const ThermalData = require('../models/ThermalData');
// const Crop = require('../models/Crop');

// // Use the IPv4 address to ensure compatibility with your Python service
// const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:5001';

// const analyzeThermalData = async (req, res) => {
//   try {
//     // FIXED: Must match ':thermalDataId' from your analysis.js route
//     const { thermalDataId } = req.params;

//     console.log('🔍 Searching for Thermal Data ID:', thermalDataId);

//     // 1. Fetch data and populate crop info (NPK values)
//     const thermalData = await ThermalData.findById(thermalDataId)
//       .populate('cropId', 'soilData cropType');

//     if (!thermalData) {
//       console.log('❌ Data not found in Database');
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Thermal data not found' 
//       });
//     }

//     // Security check: ensure the data belongs to the logged-in user
//     if (thermalData.userId.toString() !== req.user.id) {
//       return res.status(403).json({ 
//         success: false, 
//         message: 'Not authorized to analyze this data' 
//       });
//     }

//     // 2. Prepare the payload exactly as the Python AI expects it
//     const mlInput = {
//       N: thermalData.cropId.soilData.N,
//       P: thermalData.cropId.soilData.P,
//       K: thermalData.cropId.soilData.K,
//       temperature: thermalData.environmental.temperature,
//       humidity: thermalData.environmental.humidity,
//       ph: thermalData.cropId.soilData.pH,
//       rainfall: thermalData.environmental.rainfall,
//       thermal_delta: thermalData.thermalDelta,
//       green_ratio: 0.7 // Default for current testing phase
//     };
    
//     console.log('📡 Sending to AI Service at:', `${ML_SERVICE_URL}/api/predict`);
    
//     // 3. Call ML Service with explicit IPv4 family and timeout
//     const mlResponse = await axios.post(
//       `${ML_SERVICE_URL}/api/predict`,
//       mlInput,
//       { 
//         timeout: 30000,
//         family: 4 // <--- ADD THIS LINE. It forces Node to use IPv4.
//         } 
//       );

//     // 3. Call ML Service with explicit IPv4 family and timeout
//     // const mlResponse = await axios.post(
//     //   `${ML_SERVICE_URL}/api/predict`,
//     //   mlInput,
//     //   { 
//     //     timeout: 30000,
//     //     // This forces Node to use IPv4, solving the ECONNREFUSED on Windows
//     //     family: 4 
//     //   } 
//     // );

//     const mlResult = mlResponse.data;
//     console.log('🤖 AI Response Received successfully');

//     // 4. Update the record with results from the AI
//     thermalData.analysis = {
//       efficiencyScore: mlResult.efficiency_score,
//       deficiencies: [mlResult.deficiency],
//       // Handle both array or string recommendations
//       recommendations: Array.isArray(mlResult.recommendations) 
//                        ? mlResult.recommendations.join('\n') 
//                        : mlResult.recommendations,
//       stressLevel: mlResult.stress_level
//     };

//     thermalData.processed = true;
//     thermalData.processingDetails = {
//       processedAt: new Date(),
//       modelVersion: '1.0.0',
//       // Safely calculate confidence percentage
//       confidence: mlResult.deficiency_probabilities 
//                   ? mlResult.deficiency_probabilities[mlResult.deficiency] * 100 
//                   : 0
//     };

//     await thermalData.save();

//     // 5. Final success response
//     res.json({
//       success: true,
//       message: 'Analysis completed successfully',
//       data: {
//         thermalData,
//         mlAnalysis: mlResult
//       }
//     });

//   } catch (error) {
//     console.error('❌ ANALYSIS ERROR:', error.message);
    
//     // Custom error for Service Timeouts
//     if (error.code === 'ECONNABORTED') {
//       return res.status(504).json({
//         success: false,
//         message: 'The AI model took too long to respond. Please try again.'
//       });
//     }

//     // Custom error for Python Service being offline
//     if (error.code === 'ECONNREFUSED') {
//       return res.status(503).json({
//         success: false,
//         message: 'ML Service is offline. Please check port 5001.'
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Error during thermal data analysis',
//       error: error.message
//     });
//   }
// };


// // @desc    Get all analyses for the logged-in user
// // @route   GET /api/analysis/history
// const getAnalysisHistory = async (req, res) => {
//   try {
//     const history = await ThermalData.find({ userId: req.user.id, processed: true })
//       .populate('cropId', 'cropName cropType')
//       .sort({ 'processingDetails.processedAt': -1 });

//     res.json({
//       success: true,
//       count: history.length,
//       data: history
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching analysis history',
//       error: error.message
//     });
//   }
// };

// // UPDATED EXPORTS: Make sure both functions are here!
// module.exports = { analyzeThermalData, getAnalysisHistory };





// const axios = require('axios');
// const ThermalData = require('../models/ThermalData');
// const Crop = require('../models/Crop');

// /**
//  * @desc    Analyze thermal data using the Python ML service
//  * @route   POST /api/analysis/thermal/:thermalDataId
//  */
// const analyzeThermalData = async (req, res) => {
//   try {
//     const { thermalDataId } = req.params;

//     console.log('🔍 Searching for Thermal Data ID:', thermalDataId);

//     // 1. Fetch data and populate crop info (to get NPK and pH values)
//     const thermalData = await ThermalData.findById(thermalDataId)
//       .populate('cropId', 'soilData cropType');

//     if (!thermalData) {
//       console.log('❌ Data not found in Database');
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Thermal data not found' 
//       });
//     }

//     // Security check: ensure the data belongs to the logged-in user
//     if (thermalData.userId.toString() !== req.user.id) {
//       return res.status(403).json({ 
//         success: false, 
//         message: 'Not authorized to analyze this data' 
//       });
//     }

//     // 2. Prepare the payload exactly as the Python AI expects it
//     // Note: Python ML models are very sensitive to field names (N, P, K, etc.)
    
//     const mlInput = {
//       N: Number(thermalData.cropId.soilData.N) || 0,
//       P: Number(thermalData.cropId.soilData.P) || 0,
//       K: Number(thermalData.cropId.soilData.K) || 0,
//       temperature: Number(thermalData.environmental.temperature) || 0,
//       humidity: Number(thermalData.environmental.humidity) || 0,
//       ph: Number(thermalData.cropId.soilData.pH) || 7.0, // Default to neutral pH
//       rainfall: Number(thermalData.environmental.rainfall) || 0,
//       thermal_delta: Number(thermalData.thermalDelta) || 0,
//       green_ratio: 0.7 
//     };
//     // const mlInput = {
//     //   N: thermalData.cropId.soilData.N,
//     //   P: thermalData.cropId.soilData.P,
//     //   K: thermalData.cropId.soilData.K,
//     //   temperature: thermalData.environmental.temperature,
//     //   humidity: thermalData.environmental.humidity,
//     //   ph: thermalData.cropId.soilData.pH,
//     //   rainfall: thermalData.environmental.rainfall,
//     //   thermal_delta: thermalData.thermalDelta,
//     //   green_ratio: 0.7 // Default ratio for current thermal-only analysis
//     // };

//     // Use the Render URL from Env Vars, or fallback to local port 5001 for development
//     const ML_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:5001';
    
//     console.log('📡 Sending request to AI Service at:', `${ML_URL}/api/predict`);

//     // 3. Call ML Service
//     // Increased timeout to 45s to account for Render Free Tier "spinning up"
//     const mlResponse = await axios.post(
//       `${ML_URL}/api/predict`,
//       mlInput,
//       { 
//         timeout: 45000, 
//         family: 4 // Forces IPv4 to prevent connection issues on Render/Localhost
//       }
//     );

//     const mlResult = mlResponse.data;
//     console.log('🤖 AI Response Received successfully');

//     // 4. Update the MongoDB record with results from the AI
//     thermalData.analysis = {
//       efficiencyScore: mlResult.efficiency_score,
//       deficiencies: [mlResult.deficiency],
//       // Safely handle both array and string recommendations
//       recommendations: Array.isArray(mlResult.recommendations) 
//                         ? mlResult.recommendations.join('\n') 
//                         : mlResult.recommendations,
//       stressLevel: mlResult.stress_level
//     };

//     thermalData.processed = true;
//     thermalData.processingDetails = {
//       processedAt: new Date(),
//       modelVersion: '1.0.0',
//       // Calculate confidence percentage if probabilities are provided
//       confidence: mlResult.deficiency_probabilities 
//                   ? mlResult.deficiency_probabilities[mlResult.deficiency] * 100 
//                   : 0
//     };

//     await thermalData.save();

//     // 5. Success response to Frontend
//     res.json({
//       success: true,
//       message: 'Analysis completed successfully',
//       data: {
//         thermalData,
//         mlAnalysis: mlResult
//       }
//     });

//   } catch (error) {
//     console.error('❌ ANALYSIS ERROR:', error.message);
    
//     // Check if the error is a timeout (common on Render Free Tier)
//     if (error.code === 'ECONNABORTED') {
//       return res.status(504).json({
//         success: false,
//         message: 'The AI model took too long to respond. It may be starting up. Please try again in 30 seconds.'
//       });
//     }

//     // Check if the ML service is completely unreachable
//     if (error.code === 'ECONNREFUSED') {
//       return res.status(503).json({
//         success: false,
//         message: 'ML Service is currently offline or the URL is incorrect.'
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Error during thermal data analysis',
//       error: error.message
//     });
//   }
// };

// /**
//  * @desc    Get all completed analyses for the logged-in user
//  * @route   GET /api/analysis/history
//  */
// const getAnalysisHistory = async (req, res) => {
//   try {
//     const history = await ThermalData.find({ userId: req.user.id, processed: true })
//       .populate('cropId', 'cropName cropType')
//       .sort({ 'processingDetails.processedAt': -1 });

//     res.json({
//       success: true,
//       count: history.length,
//       data: history
//     });
//   } catch (error) {
//     // This logs the SPECIFIC error message coming from Python
//     const errorMessage = error.response?.data?.error || error.message;
//     console.error('❌ ANALYSIS ERROR:', errorMessage);
    
//     if (error.code === 'ECONNABORTED') {
//       return res.status(504).json({ success: false, message: 'AI model timeout. Try again.' });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Error during thermal data analysis',
//       error: errorMessage // Now this will show the Python error (e.g., "KeyError: 'pH'")
//     });
//   }
//   // } catch (error) {
//   //   res.status(500).json({
//   //     success: false,
//   //     message: 'Error fetching analysis history',
//   //     error: error.message
//   //   });
//   // }
// };

// module.exports = { analyzeThermalData, getAnalysisHistory };


// const axios = require('axios');
// const ThermalData = require('../models/ThermalData');
// const Crop = require('../models/Crop');

// /**
//  * @desc    Analyze thermal data using the Python ML service
//  * @route   POST /api/analysis/thermal/:thermalDataId
//  */
// const analyzeThermalData = async (req, res) => {
//   try {
//     const { thermalDataId } = req.params;

//     console.log('🔍 Searching for Thermal Data ID:', thermalDataId);

//     // 1. Fetch data and populate crop info
//     const thermalData = await ThermalData.findById(thermalDataId)
//       .populate('cropId', 'soilData cropType');

//     if (!thermalData) {
//       return res.status(404).json({ success: false, message: 'Thermal data not found' });
//     }

//     // Security check
//     if (thermalData.userId.toString() !== req.user.id) {
//       return res.status(403).json({ success: false, message: 'Not authorized' });
//     }

//     // 2. Prepare the payload exactly as predict.py test_input expects
//     const mlInput = {
//       N: Number(thermalData.cropId.soilData.N) || 0,
//       P: Number(thermalData.cropId.soilData.P) || 0,
//       K: Number(thermalData.cropId.soilData.K) || 0,
//       temperature: Number(thermalData.environmental.temperature) || 0,
//       humidity: Number(thermalData.environmental.humidity) || 0,
//       ph: Number(thermalData.cropId.soilData.pH) || 7.0, 
//       rainfall: Number(thermalData.environmental.rainfall) || 0,
//       thermal_delta: Number(thermalData.thermalDelta) || 0,
//       green_ratio: 0.75 // Standard ratio from your test script
//     };

//     const ML_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:10000';
    
//     console.log('📡 Sending request to AI Service:', `${ML_URL}/api/predict`);

//     // 3. Call ML Service
//     const mlResponse = await axios.post(
//       `${ML_URL}/api/predict`,
//       mlInput,
//       { timeout: 45000 }
//     );

//     const mlResult = mlResponse.data;
//     console.log('🤖 AI Response Received');

//     // 4. Update the MongoDB record
//     thermalData.analysis = {
//       efficiencyScore: mlResult.efficiency_score,
//       deficiencies: [mlResult.deficiency],
//       recommendations: Array.isArray(mlResult.recommendations) 
//                         ? mlResult.recommendations.join('\n') 
//                         : mlResult.recommendations,
//       stressLevel: mlResult.stress_level
//     };

//     thermalData.processed = true;
//     thermalData.processingDetails = {
//       processedAt: new Date(),
//       modelVersion: '1.0.0',
//       confidence: mlResult.deficiency_probabilities 
//                   ? mlResult.deficiency_probabilities[mlResult.deficiency] * 100 
//                   : 0
//     };

//     await thermalData.save();

//     res.json({
//       success: true,
//       message: 'Analysis completed successfully',
//       data: thermalData
//     });

//   } catch (error) {
//     // CAPTURE THE PYTHON ERROR MESSAGE
//     const pythonError = error.response?.data?.error || error.message;
//     console.error('❌ ANALYSIS ERROR:', pythonError);

//     res.status(500).json({
//       success: false,
//       message: 'AI Service Error',
//       error: pythonError
//     });
//   }
// };

// /**
//  * @desc    Get all completed analyses
//  */
// const getAnalysisHistory = async (req, res) => {
//   try {
//     const history = await ThermalData.find({ userId: req.user.id, processed: true })
//       .populate('cropId', 'cropName cropType')
//       .sort({ 'processingDetails.processedAt': -1 });

//     res.json({
//       success: true,
//       count: history.length,
//       data: history
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching history',
//       error: error.message
//     });
//   }
// };

// module.exports = { analyzeThermalData, getAnalysisHistory };



// const axios = require('axios');
// const ThermalData = require('../models/ThermalData');
// const Crop = require('../models/Crop');

// /**
//  * @desc    Analyze thermal data using the Python ML service
//  */
// const analyzeThermalData = async (req, res) => {
//   try {
//     const { thermalDataId } = req.params;
//     const thermalData = await ThermalData.findById(thermalDataId).populate('cropId', 'soilData cropType');

//     if (!thermalData) {
//       return res.status(404).json({ success: false, message: 'Thermal data not found' });
//     }

//     // Security check
//     if (thermalData.userId.toString() !== req.user.id) {
//       return res.status(403).json({ success: false, message: 'Not authorized' });
//     }

//     const mlInput = {
//       N: Number(thermalData.cropId.soilData.N) || 0,
//       P: Number(thermalData.cropId.soilData.P) || 0,
//       K: Number(thermalData.cropId.soilData.K) || 0,
//       temperature: Number(thermalData.environmental.temperature) || 0,
//       humidity: Number(thermalData.environmental.humidity) || 0,
//       ph: Number(thermalData.cropId.soilData.pH) || 7.0, 
//       rainfall: Number(thermalData.environmental.rainfall) || 0,
//       thermal_delta: Number(thermalData.thermalDelta) || 0,
//       green_ratio: 0.75 
//     };

//     const ML_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:10000';
    
//     const mlResponse = await axios.post(`${ML_URL}/api/predict`, mlInput, { timeout: 45000 });
//     const mlResult = mlResponse.data;

//     // Save all results back to MongoDB
//     thermalData.analysis = {
//       efficiencyScore: mlResult.efficiency_score,
//       deficiencies: [mlResult.deficiency],
//       recommendations: Array.isArray(mlResult.recommendations) 
//                         ? mlResult.recommendations.join('\n') 
//                         : mlResult.recommendations,
//       stressLevel: mlResult.stress_level,
//       heatmapImage: mlResult.heatmap_image // NEW: Stores the Base64 string
//     };

//     thermalData.processed = true;
//     thermalData.processingDetails = {
//       processedAt: new Date(),
//       modelVersion: '1.0.0',
//       confidence: mlResult.deficiency_probabilities 
//                   ? mlResult.deficiency_probabilities[mlResult.deficiency] * 100 
//                   : 0
//     };

//     await thermalData.save();

//     res.json({
//       success: true,
//       message: 'Analysis completed successfully',
//       data: thermalData
//     });

//   } catch (error) {
//     const pythonError = error.response?.data?.error || error.message;
//     console.error('❌ ANALYSIS ERROR:', pythonError);
//     res.status(500).json({ success: false, message: 'AI Service Error', error: pythonError });
//   }
// };

// /**
//  * @desc    Get all completed analyses for the history tab
//  */
// const getAnalysisHistory = async (req, res) => {
//   try {
//     const history = await ThermalData.find({ userId: req.user.id, processed: true })
//       .populate('cropId', 'cropName cropType')
//       .sort({ 'processingDetails.processedAt': -1 });

//     res.json({
//       success: true,
//       count: history.length,
//       data: history
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error fetching history', error: error.message });
//   }
// };

// module.exports = { analyzeThermalData, getAnalysisHistory };


// const axios = require('axios');
// const ThermalData = require('../models/ThermalData');

// exports.analyzeThermalData = async (req, res) => {
//   try {
//     const data = await ThermalData.findById(req.params.thermalDataId).populate('cropId');
//     if (!data) return res.status(404).json({ success: false, message: 'Not found' });

//     const payload = {
//       N: data.cropId.soilData.N, P: data.cropId.soilData.P, K: data.cropId.soilData.K,
//       temperature: data.environmental.temperature, humidity: data.environmental.humidity,
//       ph: data.cropId.soilData.pH, rainfall: data.environmental.rainfall,
//       thermal_delta: data.thermalDelta, green_ratio: 0.75
//     };

//     const mlRes = await axios.post(`${process.env.ML_SERVICE_URL}/api/predict`, payload);
    
//     data.analysis = {
//       efficiencyScore: mlRes.data.efficiency_score,
//       deficiencies: [mlRes.data.deficiency],
//       recommendations: mlRes.data.recommendations,
//       stressLevel: mlRes.data.stress_level,
//       heatmapImage: mlRes.data.heatmap_image
//     };
//     data.processed = true;
//     await data.save();

//     res.json({ success: true, data });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// exports.getAnalysisHistory = async (req, res) => {
//   const history = await ThermalData.find({ userId: req.user.id, processed: true }).sort({ createdAt: -1 });
//   res.json({ success: true, data: history });
// };


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