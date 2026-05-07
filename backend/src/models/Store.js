const db = require('../config/database');

class Store {
  static async create(storeData) {
    const { name, email, address, owner_id } = storeData;
    const [result] = await db.execute(
      'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
      [name, email, address, owner_id || null]
    );
    return result.insertId;
  }
  
  static async findAll(filters = {}) {
    let query = `
      SELECT s.*, 
             COALESCE(AVG(r.rating), 0) as overall_rating,
             COUNT(r.id) as rating_count
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE 1=1
    `;
    const params = [];
    
    if (filters.name) {
      query += ' AND s.name LIKE ?';
      params.push(`%${filters.name}%`);
    }
    if (filters.email) {
      query += ' AND s.email LIKE ?';
      params.push(`%${filters.email}%`);
    }
    if (filters.address) {
      query += ' AND s.address LIKE ?';
      params.push(`%${filters.address}%`);
    }
    
    query += ' GROUP BY s.id ORDER BY s.name ASC';
    
    const [rows] = await db.execute(query, params);
    return rows;
  }
  
  static async findById(id) {
    const [rows] = await db.execute(`
      SELECT s.*, 
             COALESCE(AVG(r.rating), 0) as overall_rating,
             COUNT(r.id) as rating_count
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.id = ?
      GROUP BY s.id
    `, [id]);
    return rows[0];
  }
  
  static async findByOwnerId(ownerId) {
    const [rows] = await db.execute(`
      SELECT s.*, 
             COALESCE(AVG(r.rating), 0) as overall_rating,
             COUNT(r.id) as rating_count
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      WHERE s.owner_id = ?
      GROUP BY s.id
    `, [ownerId]);
    return rows[0];
  }
  
  static async update(id, storeData) {
    const { name, email, address, owner_id } = storeData;
    const [result] = await db.execute(
      'UPDATE stores SET name = ?, email = ?, address = ?, owner_id = ? WHERE id = ?',
      [name, email, address, owner_id, id]
    );
    return result.affectedRows > 0;
  }
  
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM stores WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
  
  static async getAverageRating(storeId) {
    const [rows] = await db.execute(
      'SELECT COALESCE(AVG(rating), 0) as average_rating FROM ratings WHERE store_id = ?',
      [storeId]
    );
    return rows[0].average_rating;
  }
}

module.exports = Store;