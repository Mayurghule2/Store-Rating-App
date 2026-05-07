const db = require('../config/database');
const Store = require('../models/Store');
const Rating = require('../models/Rating');

exports.getAdminStats = async (req, res, next) => {
  try {
    // Get total users
    const [userResult] = await db.execute('SELECT COUNT(*) as total FROM users');
    const totalUsers = userResult[0].total;
    
    // Get total stores
    const [storeResult] = await db.execute('SELECT COUNT(*) as total FROM stores');
    const totalStores = storeResult[0].total;
    
    // Get total ratings
    const [ratingResult] = await db.execute('SELECT COUNT(*) as total FROM ratings');
    const totalRatings = ratingResult[0].total;
    
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStores,
        totalRatings
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getOwnerDashboard = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    
    // Get owner's store
    const store = await Store.findByOwnerId(ownerId);
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'No store found for this owner'
      });
    }
    
    // Get users who rated this store
    const ratings = await Rating.getStoreRatingsWithUsers(store.id);
    const averageRating = await Store.getAverageRating(store.id);
    
    res.status(200).json({
      success: true,
      data: {
        store: {
          id: store.id,
          name: store.name,
          averageRating: parseFloat(averageRating)
        },
        ratings: ratings.map(r => ({
          id: r.id,
          rating: r.rating,
          user: {
            name: r.user_name,
            email: r.user_email
          },
          createdAt: r.created_at
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};