-- Create Database for MagulaPlan Project
CREATE DATABASE IF NOT EXISTS magulaplan_db;
USE magulaplan_db;

-- 1. Users Table (Couples)
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    partner_name VARCHAR(100),
    wedding_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Vendor Categories Table
CREATE TABLE IF NOT EXISTS vendor_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- 3. Vendors Table
CREATE TABLE IF NOT EXISTS vendors (
    vendor_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    business_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    whatsapp_number VARCHAR(20),
    district VARCHAR(50) NOT NULL,
    starting_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES vendor_categories(category_id) ON DELETE CASCADE
);

-- 4. Budget Items Table
CREATE TABLE IF NOT EXISTS budget_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    category_name VARCHAR(50),
    estimated_cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    actual_cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    payment_status ENUM('PLANNED', 'DEPOSIT_PAID', 'FULLY_PAID') DEFAULT 'PLANNED',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 5. Guests Table
CREATE TABLE IF NOT EXISTS guests (
    guest_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    guest_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20),
    side ENUM('GROOM', 'BRIDE') NOT NULL,
    plus_ones INT DEFAULT 0,
    rsvp_status ENUM('ATTENDING', 'PENDING', 'DECLINED') DEFAULT 'PENDING',
    whatsapp_invite_status ENUM('NOT_SENT', 'SENT', 'FAILED') DEFAULT 'NOT_SENT',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
