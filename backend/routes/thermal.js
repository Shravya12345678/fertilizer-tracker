const express = require('express');
const router = express.Router();
const ThermalData = require('../models/ThermalData');
const Crop = require('../models/Crop');
const { protect } = require('../middleware/auth');
const { validateThermalData, checkValidation } = require('../utils/validation');

// @route   GET /api/thermal
router.get('/', protect, async (req, res) => {
  try {
    const { cropId, processed, page = 1, limit = 20 } = req.query;
    const query = { userId: req.user.id };
    
    if (cropId) query.cropId = cropId;
    if (processed !== undefined) query.processed = processed === 'true';

    const skip = (page - 1) * limit;
    const thermalData = await ThermalData.find(query)
      .populate('cropId', 'cropName cropType')
      .sort({ measurementDate: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await ThermalData.countDocuments(query);

    res.json({
      success: true,
      count: thermalData.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: { thermalData }
    });
  } catch (error) {
    console.error('Get thermal data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching thermal data',
      error: error.message
    });
  }
});

// // @route   POST /api/thermal
// router.post('/', protect, validateThermalData, checkValidation, async (req, res) => {
//   try {
//     const crop = await Crop.findById(req.body.cropId);

//     if (!crop) {
//       return res.status(404).json({
//         success: false,
//         message: 'Crop not found'
//       });
//     }

//     if (crop.userId.toString() !== req.user.id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to add data to this crop'
//       });
//     }

//     const thermalData = await ThermalData.create({
//       ...req.body,
//       userId: req.user.id
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Thermal data created successfully',
//       data: { thermalData }
//     });
//   } catch (error) {
//     console.error('Create thermal data error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error creating thermal data',
//       error: error.message
//     });
//   }
// });

// @route    POST /api/thermal
// REMOVED: validateThermalData and checkValidation for the test
router.post('/', protect, async (req, res) => {
  try {
    const crop = await Crop.findById(req.body.cropId);

    if (!crop) {
      return res.status(404).json({ success: false, message: 'Crop not found' });
    }

    // Create the data and explicitly attach the userId from the token
    const thermalData = await ThermalData.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Thermal data created successfully',
      data: { thermalData }
    });
  } catch (error) {
    console.error('THERMAL CRASH ERROR:', error); // Look at your backend terminal for this!
    res.status(500).json({
      success: false,
      message: 'Error creating thermal data',
      error: error.message
    });
  }
});

// @route   GET /api/thermal/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const thermalData = await ThermalData.findById(req.params.id)
      .populate('cropId', 'cropName cropType soilData');

    if (!thermalData) {
      return res.status(404).json({
        success: false,
        message: 'Thermal data not found'
      });
    }

    if (thermalData.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this data'
      });
    }

    res.json({
      success: true,
      data: { thermalData }
    });
  } catch (error) {
    console.error('Get thermal data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching thermal data',
      error: error.message
    });
  }
});

module.exports = router;