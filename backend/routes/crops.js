// const express = require('express');
// const router = express.Router();
// const Crop = require('../models/Crop');
// const { protect } = require('../middleware/auth');
// const { validateCrop, checkValidation } = require('../utils/validation');

// // @route   GET /api/crops
// router.get('/', protect, async (req, res) => {
//   try {
//     const { status, cropType, page = 1, limit = 10 } = req.query;
//     const query = { userId: req.user.id };
    
//     if (status) query.status = status;
//     if (cropType) query.cropType = cropType;

//     const skip = (page - 1) * limit;
//     const crops = await Crop.find(query)
//       .sort({ createdAt: -1 })
//       .limit(parseInt(limit))
//       .skip(skip);

//     const total = await Crop.countDocuments(query);

//     res.json({
//       success: true,
//       count: crops.length,
//       total,
//       page: parseInt(page),
//       pages: Math.ceil(total / limit),
//       data: { crops }
//     });
//   } catch (error) {
//     console.error('Get crops error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching crops',
//       error: error.message
//     });
//   }
// });

// // @route   POST /api/crops
// router.post('/', protect, validateCrop, checkValidation, async (req, res) => {
//   try {
//     const cropData = { ...req.body, userId: req.user.id };
//     const crop = await Crop.create(cropData);

//     res.status(201).json({
//       success: true,
//       message: 'Crop created successfully',
//       data: { crop }
//     });
//   } catch (error) {
//     console.error('Create crop error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error creating crop',
//       error: error.message
//     });
//   }
// });

// // @route   GET /api/crops/:id
// router.get('/:id', protect, async (req, res) => {
//   try {
//     const crop = await Crop.findById(req.params.id);

//     if (!crop) {
//       return res.status(404).json({
//         success: false,
//         message: 'Crop not found'
//       });
//     }

//     if (crop.userId.toString() !== req.user.id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to access this crop'
//       });
//     }

//     res.json({
//       success: true,
//       data: { crop }
//     });
//   } catch (error) {
//     console.error('Get crop error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching crop',
//       error: error.message
//     });
//   }
// });

// // @route   PUT /api/crops/:id
// router.put('/:id', protect, async (req, res) => {
//   try {
//     let crop = await Crop.findById(req.params.id);

//     if (!crop) {
//       return res.status(404).json({
//         success: false,
//         message: 'Crop not found'
//       });
//     }

//     if (crop.userId.toString() !== req.user.id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to update this crop'
//       });
//     }

//     crop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     });

//     res.json({
//       success: true,
//       message: 'Crop updated successfully',
//       data: { crop }
//     });
//   } catch (error) {
//     console.error('Update crop error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating crop',
//       error: error.message
//     });
//   }
// });

// // @route   DELETE /api/crops/:id
// router.delete('/:id', protect, async (req, res) => {
//   try {
//     const crop = await Crop.findById(req.params.id);

//     if (!crop) {
//       return res.status(404).json({
//         success: false,
//         message: 'Crop not found'
//       });
//     }

//     if (crop.userId.toString() !== req.user.id) {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to delete this crop'
//       });
//     }

//     await crop.deleteOne();

//     res.json({
//       success: true,
//       message: 'Crop deleted successfully'
//     });
//   } catch (error) {
//     console.error('Delete crop error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error deleting crop',
//       error: error.message
//     });
//   }
// });

// module.exports = router;

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

// // @route   POST /api/crops
// router.post('/', protect, async (req, res) => {
//   try {
//     // We explicitly map the body to ensure all required fields from the model are there
//     const crop = await Crop.create({
//       ...req.body,
//       userId: req.user.id
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Crop created successfully',
//       data: { crop }
//     });
//   } catch (error) {
//     console.error('Create crop backend error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error creating crop',
//       error: error.message
//     });
//   }
// });


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