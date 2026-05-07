<div align="center">
  <img src="https://img.icons8.com/color/96/000000/star--v1.png" width="100" alt="StoreRating Logo"/>
  <h1>⭐ StoreRating App</h2>
  <p>A comprehensive store rating platform with role-based access control</p>
  
  ![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
  ![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs)
  ![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)
  ![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss)
  ![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens)
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [User Roles](#user-roles)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Database Schema](#database-schema)
- [Testing Credentials](#testing-credentials)
- [Project Structure](#project-structure)
- [Validation Rules](#validation-rules)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**StoreRating App** is a full-stack web application that allows users to discover, rate, and review stores. The platform implements a sophisticated role-based access control system with three distinct user roles, each with specific functionalities.

### Key Highlights
- ✅ **Secure Authentication** with JWT tokens
- ✅ **Role-based Authorization** (Admin, Store Owner, Normal User)
- ✅ **Real-time Rating System** (1-5 stars)
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **Form Validations** on both frontend & backend
- ✅ **Interactive Dashboard** for each role

---

## ✨ Features

### 👑 System Administrator
- **User Management**
  - Add new users (Admin, Store Owner, Normal User)
  - View all users with filtering (Name, Email, Address, Role)
  - View user details including ratings for store owners
  
- **Store Management**
  - Add new stores
  - View all stores with ratings
  - Filter stores by name, email, address

- **Dashboard Analytics**
  - Total number of users
  - Total number of stores
  - Total number of ratings submitted

### 👤 Normal User
- **Account Management**
  - Self-registration with validation
  - Login/Logout functionality
  - Update password

- **Store Interaction**
  - Browse all registered stores
  - Search stores by name or address
  - View store details (Name, Address, Overall Rating)
  - Submit ratings (1-5 stars)
  - Modify existing ratings
  - See personal rating for each store

### 🏪 Store Owner
- **Store Dashboard**
  - View store's average rating
  - See list of users who rated their store
  - Track rating history

- **Account Management**
  - Update password

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.x | UI Framework |
| Tailwind CSS | 3.x | Styling |
| React Router DOM | 6.x | Navigation |
| Axios | 1.x | API Calls |
| Lucide React | Latest | Icons |
| React Hot Toast | Latest | Notifications |
| React Hook Form | 7.x | Form Handling |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | Runtime |
| Express.js | 4.x | Web Framework |
| MySQL | 8.x | Database |
| JWT | 9.x | Authentication |
| Bcryptjs | 2.x | Password Hashing |
| Express Validator | 7.x | Input Validation |
| Cors | 2.x | Cross-Origin Support |
| Helmet | 7.x | Security Headers |

---

## 👥 User Roles

<div align="center">
  <table>
    <tr>
      <th>Role</th>
      <th>Permissions</th>
      <th>Dashboard Access</th>
    </tr>
    <tr>
      <td>👑 Admin</td>
      <td>Full system control</td>
      <td>Analytics & Management</td>
    </tr>
    <tr>
      <td>👤 User</td>
      <td>Rate stores, view listings</td>
      <td>Store browsing & ratings</td>
    </tr>
    <tr>
      <td>🏪 Store Owner</td>
      <td>View store ratings</td>
      <td>Store performance metrics</td>
    </tr>
  </table>
</div>

---

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/store-rating-app.git
cd store-rating-app
Step 2: Backend Setup
bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your database credentials
Step 3: Database Setup
bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE store_rating_db;

# Import schema
mysql -u root -p store_rating_db < database/schema.sql

# Or run fix-passwords script to seed data
node fix-passwords.js
Step 4: Frontend Setup
bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the application
npm start
⚙️ Configuration
Backend Environment Variables (.env)
env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_db
DB_POOL_SIZE=10

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
Frontend Environment Variables (.env)
env
REACT_APP_API_URL=http://localhost:5000/api
🏃 Running the Application
Development Mode
Terminal 1 - Backend:

bash
cd backend
npm run dev
# Server running on http://localhost:5000
Terminal 2 - Frontend:

bash
cd frontend
npm start
# App running on http://localhost:3000
Production Mode
Backend:

bash
cd backend
npm start
Frontend:

bash
cd frontend
npm run build
# Serve the build folder with a static server
📚 API Documentation
Authentication Endpoints
Method	Endpoint	Description	Access
POST	/api/auth/register	User registration	Public
POST	/api/auth/login	User login	Public
PUT	/api/auth/change-password	Change password	Authenticated
GET	/api/auth/me	Get current user	Authenticated
User Endpoints
Method	Endpoint	Description	Access
GET	/api/users	Get all users	Admin only
GET	/api/users/:id	Get user by ID	Admin only
POST	/api/users	Create user	Admin only
PUT	/api/users/:id	Update user	Admin only
Store Endpoints
Method	Endpoint	Description	Access
GET	/api/stores	Get all stores	Authenticated
GET	/api/stores/:id	Get store by ID	Authenticated
POST	/api/stores	Create store	Admin only
PUT	/api/stores/:id	Update store	Admin only
DELETE	/api/stores/:id	Delete store	Admin only
Rating Endpoints
Method	Endpoint	Description	Access
POST	/api/ratings	Submit/Update rating	User, Store Owner
GET	/api/ratings/store/:storeId	Get user's rating for store	Authenticated
Dashboard Endpoints
Method	Endpoint	Description	Access
GET	/api/dashboard/admin	Admin statistics	Admin only
GET	/api/dashboard/owner	Store owner stats	Store Owner only
📸 Screenshots
Login Page
https://via.placeholder.com/800x400?text=Login+Page

Admin Dashboard
https://via.placeholder.com/800x400?text=Admin+Dashboard

Store Listing
https://via.placeholder.com/800x400?text=Store+Listing

Rating Modal
https://via.placeholder.com/800x400?text=Rating+Modal

🗄️ Database Schema
sql
-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(400),
    role ENUM('admin', 'user', 'store_owner') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Stores Table
CREATE TABLE stores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(400),
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ratings Table
CREATE TABLE ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    UNIQUE KEY unique_user_store (user_id, store_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🔑 Testing Credentials
Role	Email	Password
Administrator	admin@example.com	Admin@123
Store Owner	owner@example.com	Owner@123
Normal User	user@example.com	User@123
Test Accounts Features
Admin: Full access to user/store management and analytics

Store Owner: View store ratings and user feedback

Normal User: Browse and rate stores

📁 Project Structure
text
store-rating-app/
│
├── backend/
│   ├── src/
│   │   ├── config/         # Database & env config
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth & validation
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helper functions
│   ├── database/           # SQL schema
│   ├── server.js           # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React Context
│   │   ├── services/       # API services
│   │   ├── utils/          # Helper functions
│   │   ├── App.js          # Main component
│   │   └── index.js        # Entry point
│   ├── public/             # Static files
│   └── package.json
│
└── README.md
✅ Validation Rules
Name
Min Length: 20 characters

Max Length: 60 characters

Password
Min Length: 8 characters

Max Length: 16 characters

Must contain: At least 1 uppercase letter

Must contain: At least 1 special character (!@#$%^&*)

Email
Standard email format validation

Address
Max Length: 400 characters (optional)

Rating
Range: 1 to 5 stars

🔒 Security Features
✅ JWT Authentication with expiration

✅ Password Hashing using bcrypt

✅ Role-based Authorization middleware

✅ Input Validation on both frontend & backend

✅ SQL Injection Prevention (parameterized queries)

✅ CORS Protection

✅ Helmet.js for secure HTTP headers

🐛 Troubleshooting
Common Issues & Solutions
Issue 1: Database Connection Error

bash
Error: ER_ACCESS_DENIED_ERROR
Solution: Check DB_PASSWORD in .env file
Issue 2: Port Already in Use

bash
Error: EADDRINUSE
Solution: Change PORT in .env or kill process using the port
Issue 3: JWT Invalid Token

bash
Error: JsonWebTokenError
Solution: Clear localStorage and login again
Issue 4: CORS Error

bash
Error: CORS policy blocked
Solution: Check CORS_ORIGIN in backend .env
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

Development Guidelines
Follow ESLint configuration

Write meaningful commit messages

Update documentation for major changes

Add tests for new features

📞 Support
For support, email: support@storerating.com

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
React Team for amazing framework

Tailwind CSS for utility-first CSS

Express.js for robust backend

MySQL for reliable database

<div align="center"> <sub>Built with ❤️ by StoreRating Team</sub> <br/> <sub>⭐ If this project helped you, please give it a star! ⭐</sub> </div> ```
