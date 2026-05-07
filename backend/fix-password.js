const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixPasswords() {
  let connection;
  try {
    console.log('🔧 Starting password fix...\n');
    
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'store_rating_db'
    });

    console.log('✅ Connected to database\n');

    // Hash passwords correctly
    const adminHash = await bcrypt.hash('Admin@123', 10);
    const ownerHash = await bcrypt.hash('Owner@123', 10);
    const userHash = await bcrypt.hash('User@123', 10);

    console.log('Generated password hashes:');
    console.log(`Admin: ${adminHash.substring(0, 30)}...`);
    console.log(`Owner: ${ownerHash.substring(0, 30)}...`);
    console.log(`User: ${userHash.substring(0, 30)}...\n`);

    // First, check if users exist
    const [existingAdmins] = await connection.execute(
      'SELECT id, email FROM users WHERE email = ?',
      ['admin@example.com']
    );

    if (existingAdmins.length === 0) {
      // Insert new users
      console.log('Inserting new users...');
      await connection.execute(`
        INSERT INTO users (name, email, password, address, role) VALUES 
        ('System Admin', 'admin@example.com', ?, '123 Admin Street, New York, NY 10001', 'admin'),
        ('John Store Owner', 'owner@example.com', ?, '456 Owner Avenue, Los Angeles, CA 90001', 'store_owner'),
        ('Normal User', 'user@example.com', ?, '789 User Boulevard, Chicago, IL 60601', 'user')
      `, [adminHash, ownerHash, userHash]);
      console.log('✅ Users inserted successfully\n');
    } else {
      // Update existing users
      console.log('Updating existing users...');
      await connection.execute(
        'UPDATE users SET password = ?, address = ? WHERE email = ?',
        [adminHash, '123 Admin Street, New York, NY 10001', 'admin@example.com']
      );
      await connection.execute(
        'UPDATE users SET password = ?, address = ? WHERE email = ?',
        [ownerHash, '456 Owner Avenue, Los Angeles, CA 90001', 'owner@example.com']
      );
      await connection.execute(
        'UPDATE users SET password = ?, address = ? WHERE email = ?',
        [userHash, '789 User Boulevard, Chicago, IL 60601', 'user@example.com']
      );
      console.log('✅ Users updated successfully\n');
    }

    // Verify the passwords work
    console.log('Verifying passwords...');
    
    const [admin] = await connection.execute(
      'SELECT email, password FROM users WHERE email = ?',
      ['admin@example.com']
    );
    
    const isAdminValid = await bcrypt.compare('Admin@123', admin[0].password);
    console.log(`Admin password check: ${isAdminValid ? '✅ Valid' : '❌ Invalid'}`);
    
    const [owner] = await connection.execute(
      'SELECT email, password FROM users WHERE email = ?',
      ['owner@example.com']
    );
    
    const isOwnerValid = await bcrypt.compare('Owner@123', owner[0].password);
    console.log(`Owner password check: ${isOwnerValid ? '✅ Valid' : '❌ Invalid'}`);
    
    const [user] = await connection.execute(
      'SELECT email, password FROM users WHERE email = ?',
      ['user@example.com']
    );
    
    const isUserValid = await bcrypt.compare('User@123', user[0].password);
    console.log(`User password check: ${isUserValid ? '✅ Valid' : '❌ Invalid'}\n`);

    if (isAdminValid && isOwnerValid && isUserValid) {
      console.log('🎉 All passwords fixed successfully!\n');
      console.log('You can now login with:');
      console.log('┌─────────────────┬──────────────────────────┬─────────────┐');
      console.log('│ Role            │ Email                    │ Password    │');
      console.log('├─────────────────┼──────────────────────────┼─────────────┤');
      console.log('│ Admin           │ admin@example.com        │ Admin@123   │');
      console.log('│ Store Owner     │ owner@example.com        │ Owner@123   │');
      console.log('│ Normal User     │ user@example.com         │ User@123    │');
      console.log('└─────────────────┴──────────────────────────┴─────────────┘');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixPasswords();