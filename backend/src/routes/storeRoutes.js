const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { validateName, validateEmail, validateAddress } = require('../utils/validators');

// Public routes (authenticated users can view stores)
router.get('/', protect, storeController.getAllStores);
router.get('/:id', protect, storeController.getStoreById);

// Admin only routes
router.post('/', protect, isAdmin, [
  validateName,
  validateEmail,
  validateAddress,
  validate
], storeController.createStore);
router.put('/:id', protect, isAdmin, [
  validateName,
  validateEmail,
  validateAddress,
  validate
], storeController.updateStore);
router.delete('/:id', protect, isAdmin, storeController.deleteStore);

module.exports = router;