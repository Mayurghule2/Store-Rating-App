const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create connection pool with valid options only
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'store_rating_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify pool
const promisePool = pool.promise();

// Export the pool with promise support
module.exports = promisePool;