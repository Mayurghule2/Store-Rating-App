const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { validateName, validateEmail, validateAddress, validatePassword } = require('../utils/validators');

// Admin only routes
router.get('/', protect, isAdmin, userController.getAllUsers);
router.get('/:id', protect, isAdmin, userController.getUserById);
router.post('/', protect, isAdmin, [
  validateName,
  validateEmail,
  validateAddress,
  validatePassword,
  validate
], userController.createUser);
router.put('/:id', protect, isAdmin, [
  validateName,
  validateAddress,
  validate
], userController.updateUser);

module.exports = router;