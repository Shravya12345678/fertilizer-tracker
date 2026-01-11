

const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const { protect } = require('../middleware/auth');
// Note: Ensure your validation.js has validateCrop; if not, you can remove validateCrop and checkValidation
const { validateCrop, checkValidation } = require('../utils/validation');

// @route   GET /api/crops
router.get('/', protect, async (req, res) => {
  try {
    const { status, cropType, page = 1, limit = 10 } = req.query;
    const query = { userId: req.user.id };
    
    if (status) query.status = status;
    if (cropType) query.cropType = cropType.toLowerCase();

    const skip = (page - 1) * limit;
    const crops = await Crop.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Crop.countDocuments(query);

    res.json({
      success: true,
      count: crops.length,
      total,
      page: parseInt(page),
      data: { crops }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching crops', error: error.message });
  }
});




// @route   POST /api/crops
router.post('/', protect, async (req, res) => {
  try {
    // We add the userId from the logged-in user to the request body
    const crop = await Crop.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Crop created successfully',
      data: { crop }
    });
  } catch (error) {
    console.error('Create crop error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating crop',
      error: error.message
    });
  }
});


// Standard GET/PUT/DELETE routes (kept same but cleaner)
router.get('/:id', protect, async (req, res) => {
  try {
    const crop = await Crop.findOne({ _id: req.params.id, userId: req.user.id });
    if (!crop) return res.status(404).json({ success: false, message: 'Crop not found' });
    res.json({ success: true, data: { crop } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching crop', error: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    // We use findOneAndDelete to ensure the user can only delete their OWN crops
    const crop = await Crop.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.id 
    });

    if (!crop) {
      return res.status(404).json({ 
        success: false, 
        message: 'Crop not found or unauthorized' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Crop deleted successfully' 
    });
  } catch (error) {
    console.error('Delete crop error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting crop', 
      error: error.message 
    });
  }
});

module.exports = router;