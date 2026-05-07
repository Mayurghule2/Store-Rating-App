const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { validateName, validateEmail, validateAddress, validatePassword } = require('../utils/validators');

router.post('/register', [
  validateName,
  validateEmail,
  validateAddress,
  validatePassword,
  validate
], authController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
], authController.login);

router.put('/change-password', protect, [
  body('oldPassword').notEmpty().withMessage('Current password is required'),
  validatePassword,
  validate
], authController.changePassword);

router.get('/me', protect, authController.getMe);

module.exports = router;