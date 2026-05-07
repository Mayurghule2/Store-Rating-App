const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password, address, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, address || null, role]
    );
    
    return result.insertId;
  }
  
  static async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }
  
  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT id, name, email, address, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }
  
  static async findAll(filters = {}) {
    let query = 'SELECT id, name, email, address, role, created_at FROM users WHERE 1=1';
    const params = [];
    
    if (filters.name) {
      query += ' AND name LIKE ?';
      params.push(`%${filters.name}%`);
    }
    if (filters.email) {
      query += ' AND email LIKE ?';
      params.push(`%${filters.email}%`);
    }
    if (filters.address) {
      query += ' AND address LIKE ?';
      params.push(`%${filters.address}%`);
    }
    if (filters.role) {
      query += ' AND role = ?';
      params.push(filters.role);
    }
    
    query += ' ORDER BY name ASC';
    
    const [rows] = await db.execute(query, params);
    return rows;
  }
  
  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await db.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows > 0;
  }
  
  static async update(id, userData) {
    const { name, address, role } = userData;
    const [result] = await db.execute(
      'UPDATE users SET name = ?, address = ?, role = ? WHERE id = ?',
      [name, address, role, id]
    );
    return result.affectedRows > 0;
  }
  
  static async getStoreOwnerWithRating(storeOwnerId) {
    const [rows] = await db.execute(`
      SELECT u.id, u.name, u.email, u.address, u.role,
             COALESCE(AVG(r.rating), 0) as average_rating
      FROM users u
      LEFT JOIN stores s ON u.id = s.owner_id
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE u.id = ? AND u.role = 'store_owner'
      GROUP BY u.id
    `, [storeOwnerId]);
    return rows[0];
  }
}

module.exports = User;