const Rating = require('../models/Rating');
const Store = require('../models/Store');

exports.submitRating = async (req, res, next) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;
    
    // Check if store exists
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
    
    // Check if user already rated this store
    const existingRating = await Rating.findByUserAndStore(userId, storeId);
    
    let ratingId;
    if (existingRating) {
      // Update existing rating
      await Rating.update(existingRating.id, rating);
      ratingId = existingRating.id;
    } else {
      // Create new rating
      ratingId = await Rating.create({ user_id: userId, store_id: storeId, rating });
    }
    
    const newRating = await Rating.findByUserAndStore(userId, storeId);
    const averageRating = await Store.getAverageRating(storeId);
    
    res.status(200).json({
      success: true,
      message: existingRating ? 'Rating updated successfully' : 'Rating submitted successfully',
      data: {
        rating: newRating,
        storeAverageRating: averageRating
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserRating = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const userId = req.user.id;
    
    const rating = await Rating.findByUserAndStore(userId, storeId);
    
    res.status(200).json({
      success: true,
      data: rating || null
    });
  } catch (error) {
    next(error);
  }
};

exports.getStoreRatings = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    
    const ratings = await Rating.getStoreRatingsWithUsers(storeId);
    
    res.status(200).json({
      success: true,
      count: ratings.length,
      data: ratings
    });
  } catch (error) {
    next(error);
  }
};