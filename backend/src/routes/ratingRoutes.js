const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');
const { isUser } = require('../middleware/roleMiddleware');
const { validateRating } = require('../utils/validators');
const { validate } = require('../middleware/validationMiddleware');

router.post('/', protect, isUser, [
  validateRating,
  validate
], ratingController.submitRating);
router.get('/store/:storeId', protect, ratingController.getUserRating);
router.get('/store/:storeId/all', protect, isUser, ratingController.getStoreRatings);

module.exports = router;