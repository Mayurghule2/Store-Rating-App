const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin, isStoreOwner } = require('../middleware/roleMiddleware');

router.get('/admin', protect, isAdmin, dashboardController.getAdminStats);
router.get('/owner', protect, isStoreOwner, dashboardController.getOwnerDashboard);

module.exports = router;