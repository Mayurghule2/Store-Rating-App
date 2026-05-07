const Store = require('../models/Store');
const Rating = require('../models/Rating');

exports.getAllStores = async (req, res, next) => {
  try {
    const { name, email, address } = req.query;
    
    const stores = await Store.findAll({ name, email, address });
    
    res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (error) {
    next(error);
  }
};

exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const store = await Store.findById(id);
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: store
    });
  } catch (error) {
    next(error);
  }
};

exports.createStore = async (req, res, next) => {
  try {
    const { name, email, address, owner_id } = req.body;
    
    const storeId = await Store.create({
      name,
      email,
      address,
      owner_id
    });
    
    const store = await Store.findById(storeId);
    
    res.status(201).json({
      success: true,
      message: 'Store created successfully',
      data: store
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, address, owner_id } = req.body;
    
    const updated = await Store.update(id, { name, email, address, owner_id });
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Store updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteStore = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const deleted = await Store.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Store deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};