const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const ThermalData = require('../models/ThermalData');

// @route   POST /api/upload/thermal-image/:thermalDataId
router.post('/thermal-image/:thermalDataId', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const thermalData = await ThermalData.findById(req.params.thermalDataId);

    if (!thermalData) {
      return res.status(404).json({
        success: false,
        message: 'Thermal data not found'
      });
    }

    if (thermalData.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    thermalData.images.push({
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      type: req.body.imageType || 'thermal',
      uploadDate: new Date()
    });

    await thermalData.save();

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: req.file.filename,
        url: `/uploads/${req.file.filename}`,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message
    });
  }
});

module.exports = router;