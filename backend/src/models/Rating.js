const db = require('../config/database');

class Rating {
  static async create(ratingData) {
    const { user_id, store_id, rating } = ratingData;
    const [result] = await db.execute(
      'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
      [user_id, store_id, rating]
    );
    return result.insertId;
  }
  
  static async findByUserAndStore(userId, storeId) {
    const [rows] = await db.execute(
      'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
      [userId, storeId]
    );
    return rows[0];
  }
  
  static async update(id, rating) {
    const [result] = await db.execute(
      'UPDATE ratings SET rating = ? WHERE id = ?',
      [rating, id]
    );
    return result.affectedRows > 0;
  }
  
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM ratings WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
  
  static async getStoreRatingsWithUsers(storeId) {
    const [rows] = await db.execute(`
      SELECT r.*, u.name as user_name, u.email as user_email
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = ?
      ORDER BY r.created_at DESC
    `, [storeId]);
    return rows;
  }
  
  static async getUserRatings(userId) {
    const [rows] = await db.execute(`
      SELECT r.*, s.name as store_name, s.address as store_address
      FROM ratings r
      JOIN stores s ON r.store_id = s.id
      WHERE r.user_id = ?
    `, [userId]);
    return rows;
  }
}

module.exports = Rating;