
const AuthService = require('../services/authService');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, address } = req.body;
    
    const { user, token } = await AuthService.register({
      name,
      email,
      password,
      address
    });
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { user, token }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const { user, token } = await AuthService.login(email, password);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { user, token }
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    
    const user = await User.findByEmail(req.user.email);
    
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    await User.updatePassword(userId, newPassword);
    
    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id);
    
    if (user.role === 'store_owner') {
      user = await User.getStoreOwnerWithRating(req.user.id);
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};