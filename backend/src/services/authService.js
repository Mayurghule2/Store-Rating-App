const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/env');
const { ROLES } = require('../utils/constants');

class AuthService {
  static generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );
  }
  
  static async register(userData) {
    // Check if user exists
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    // Set default role as 'user' for registration
    const userId = await User.create({
      ...userData,
      role: ROLES.USER
    });
    
    const user = await User.findById(userId);
    const token = this.generateToken(user);
    
    return { user, token };
  }
  
  static async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    const token = this.generateToken(user);
    
    return { user: userWithoutPassword, token };
  }
}

module.exports = AuthService;