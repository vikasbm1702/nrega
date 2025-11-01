const { query, param, body, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array().map(e => ({
        field: e.param,
        message: e.msg
      }))
    });
  }
  next();
};

// Validators for district routes
const validateStateParam = param('state')
  .trim()
  .notEmpty().withMessage('State is required')
  .isLength({ min: 2, max: 50 }).withMessage('State must be between 2 and 50 characters')
  .escape();

const validateDistrictParam = param('district')
  .trim()
  .notEmpty().withMessage('District is required')
  .isLength({ min: 2, max: 50 }).withMessage('District must be between 2 and 50 characters')
  .escape();

const validateReverseGeocodeBody = body('latitude')
  .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90')
  .custom((value) => {
    if (value === undefined || value === null) {
      throw new Error('Latitude is required');
    }
    return true;
  });

const validateReverseGeocodeBodyLongitude = body('longitude')
  .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180')
  .custom((value) => {
    if (value === undefined || value === null) {
      throw new Error('Longitude is required');
    }
    return true;
  });

const validateSyncBody = body('state')
  .trim()
  .notEmpty().withMessage('State is required')
  .isLength({ min: 2, max: 50 }).withMessage('State must be between 2 and 50 characters')
  .escape();

const validateSyncBodyDistrict = body('district')
  .trim()
  .notEmpty().withMessage('District is required')
  .isLength({ min: 2, max: 50 }).withMessage('District must be between 2 and 50 characters')
  .escape();

const validateSyncBodyYear = body('year')
  .optional()
  .isInt({ min: 2000, max: 2100 }).withMessage('Year must be a valid year');

const validateSyncBodyMonth = body('month')
  .optional()
  .isInt({ min: 1, max: 12 }).withMessage('Month must be between 1 and 12');

const validateDateRangeQuery = [
  query('startMonth')
    .optional()
    .matches(/^\d{4}-\d{2}$/).withMessage('startMonth must be in YYYY-MM format'),
  query('endMonth')
    .optional()
    .matches(/^\d{4}-\d{2}$/).withMessage('endMonth must be in YYYY-MM format'),
  query('range')
    .optional()
    .matches(/^(\d+[my])?$/).withMessage('range must be in format like 1m, 12m, 1y, etc.')
];

module.exports = {
  handleValidationErrors,
  validateStateParam,
  validateDistrictParam,
  validateReverseGeocodeBody,
  validateReverseGeocodeBodyLongitude,
  validateSyncBody,
  validateSyncBodyDistrict,
  validateSyncBodyYear,
  validateSyncBodyMonth,
  validateDateRangeQuery
};