const User = require('../models/User');
const { ROLES } = require('../utils/constants');

exports.getAllUsers = async (req, res, next) => {
  try {
    const { name, email, address, role } = req.query;
    
    const users = await User.findAll({ name, email, address, role });
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    let user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // If user is store owner, get their rating
    if (user.role === ROLES.STORE_OWNER) {
      user = await User.getStoreOwnerWithRating(id);
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, address, role } = req.body;
    
    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    const userId = await User.create({
      name,
      email,
      password,
      address,
      role
    });
    
    const user = await User.findById(userId);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, address, role } = req.body;
    
    const updated = await User.update(id, { name, address, role });
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};