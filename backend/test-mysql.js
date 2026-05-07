const mysql = require('mysql2/promise');
require('dotenv').config();

async function testMySQL() {
  console.log('🔍 Testing MySQL Connection...');
  console.log('📋 Connection Config:');
  console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`   User: ${process.env.DB_USER || 'root'}`);
  console.log(`   Password: ${process.env.DB_PASSWORD ? '***' : '(empty)'}`);
  console.log(`   Database: ${process.env.DB_NAME || 'store_rating_db'}`);
  console.log('');

  try {
    // Try connection without database first
    console.log('1️⃣ Attempting to connect to MySQL server...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: 3306
    });
    
    console.log('✅ Connected to MySQL server successfully!');
    
    // Check if database exists
    console.log('\n2️⃣ Checking if database exists...');
    const [databases] = await connection.execute(
      'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
      [process.env.DB_NAME || 'store_rating_db']
    );
    
    if (databases.length === 0) {
      console.log(`⚠️  Database '${process.env.DB_NAME}' does not exist`);
      console.log('   Creating database now...');
      await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
      console.log(`✅ Database '${process.env.DB_NAME}' created successfully!`);
    } else {
      console.log(`✅ Database '${process.env.DB_NAME}' exists`);
    }
    
    // Switch to the database
    await connection.changeUser({ database: process.env.DB_NAME });
    
    // Check tables
    console.log('\n3️⃣ Checking tables...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`   Found ${tables.length} tables`);
    
    if (tables.length === 0) {
      console.log('⚠️  No tables found! You need to run the schema.sql');
    } else {
      tables.forEach(table => {
        console.log(`   - ${Object.values(table)[0]}`);
      });
    }
    
    await connection.end();
    console.log('\n✅ MySQL is working correctly!');
    
  } catch (error) {
    console.error('\n❌ MySQL Connection Failed!');
    console.error(`Error Code: ${error.code}`);
    console.error(`Error Message: ${error.message}`);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n🔧 SOLUTION: MySQL server is not running');
      console.error('   Start MySQL:');
      console.error('   - Windows: net start MySQL');
      console.error('   - macOS: brew services start mysql');
      console.error('   - Linux: sudo systemctl start mysql');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n🔧 SOLUTION: Wrong username or password');
      console.error('   Check your .env file DB_USER and DB_PASSWORD');
    }
    
    process.exit(1);
  }
}

testMySQL();