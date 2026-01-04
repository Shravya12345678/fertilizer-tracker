const { body, validationResult } = require('express-validator');

// Validation rules
const validateRegister = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validateCrop = [
  body('cropName')
    .trim()
    .notEmpty()
    .withMessage('Crop name is required'),
  body('cropType')
    .notEmpty()
    .withMessage('Crop type is required'),
  body('soilData.N')
    .isFloat({ min: 0, max: 200 })
    .withMessage('N must be between 0 and 200'),
  body('soilData.P')
    .isFloat({ min: 0, max: 200 })
    .withMessage('P must be between 0 and 200'),
  body('soilData.K')
    .isFloat({ min: 0, max: 300 })
    .withMessage('K must be between 0 and 300'),
  body('soilData.pH')
    .isFloat({ min: 3, max: 10 })
    .withMessage('pH must be between 3 and 10')
];

const validateThermalData = [
  body('cropId')
    .notEmpty()
    .withMessage('Crop ID is required'),
  body('beforeTemp')
    .isFloat({ min: -10, max: 60 })
    .withMessage('Before temperature must be between -10 and 60'),
  body('afterTemp')
    .isFloat({ min: -10, max: 60 })
    .withMessage('After temperature must be between -10 and 60'),
  body('environmental.temperature')
    .isFloat({ min: -10, max: 60 })
    .withMessage('Environmental temperature must be between -10 and 60'),
  body('environmental.humidity')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Humidity must be between 0 and 100')
];

// Check validation results
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateCrop,
  validateThermalData,
  checkValidation
};