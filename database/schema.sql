-- Create database
CREATE DATABASE IF NOT EXISTS store_rating_db;
USE store_rating_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(400),
    role ENUM('admin', 'user', 'store_owner') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_name (name)
);

-- Stores table
CREATE TABLE IF NOT EXISTS stores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(400),
    owner_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_name (name),
    INDEX idx_owner (owner_id)
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_store (user_id, store_id),
    INDEX idx_store (store_id),
    INDEX idx_user (user_id)
);

-- Insert default admin user (password: Admin@123)
INSERT INTO users (name, email, password, address, role) VALUES 
('System Admin', 'admin@example.com', '$2a$10$rQKJqJqJqJqJqJqJqJqJqu', 'Admin Address', 'admin');

-- Insert sample store owner (password: Owner@123)
INSERT INTO users (name, email, password, address, role) VALUES 
('John Store', 'owner@example.com', '$2a$10$rQKJqJqJqJqJqJqJqJqJqu', 'Owner Address', 'store_owner');

-- Insert sample store
INSERT INTO stores (name, email, address, owner_id) VALUES 
('Sample Store', 'store@example.com', '123 Main Street, City', 2);

-- Insert sample normal user (password: User@123)
INSERT INTO users (name, email, password, address, role) VALUES 
('Normal User', 'user@example.com', '$2a$10$rQKJqJqJqJqJqJqJqJqJqu', 'User Address', 'user');

-- Insert sample rating
INSERT INTO ratings (user_id, store_id, rating) VALUES 
(3, 1, 4);