const { body } = require('express-validator');
const { VALIDATION_RULES } = require('./constants');

const validateName = body('name')
  .trim()
  .isLength({ min: VALIDATION_RULES.NAME_MIN, max: VALIDATION_RULES.NAME_MAX })
  .withMessage(`Name must be between ${VALIDATION_RULES.NAME_MIN} and ${VALIDATION_RULES.NAME_MAX} characters`);

const validateEmail = body('email')
  .trim()
  .isEmail()
  .withMessage('Please provide a valid email')
  .normalizeEmail();

const validateAddress = body('address')
  .optional()
  .trim()
  .isLength({ max: VALIDATION_RULES.ADDRESS_MAX })
  .withMessage(`Address cannot exceed ${VALIDATION_RULES.ADDRESS_MAX} characters`);

const validatePassword = body('password')
  .isLength({ min: VALIDATION_RULES.PASSWORD_MIN, max: VALIDATION_RULES.PASSWORD_MAX })
  .withMessage(`Password must be between ${VALIDATION_RULES.PASSWORD_MIN} and ${VALIDATION_RULES.PASSWORD_MAX} characters`)
  .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, 'i')
  .withMessage('Password must contain at least one uppercase letter and one special character');

const validateRating = body('rating')
  .isInt({ min: 1, max: 5 })
  .withMessage('Rating must be between 1 and 5');

module.exports = {
  validateName,
  validateEmail,
  validateAddress,
  validatePassword,
  validateRating
};