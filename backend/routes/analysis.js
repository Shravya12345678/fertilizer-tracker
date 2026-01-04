const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');


// const { analyzeThermalData } = require('../controllers/analysisController');
// UPDATE THIS LINE to include getAnalysisHistory
const { analyzeThermalData, getAnalysisHistory } = require('../controllers/analysisController');

// @route   GET /api/analysis/history
router.get('/history', protect, getAnalysisHistory);

// @route   POST /api/analysis/thermal/:thermalDataId
router.post('/thermal/:thermalDataId', protect, analyzeThermalData);

module.exports = router;