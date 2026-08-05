-- WARNING: The DROP DATABASE statement below will delete all data.
-- Remove this line before running on shared/staging/production environments.

DROP DATABASE IF EXISTS magulaplan_db;

-- Create Schema
CREATE DATABASE IF NOT EXISTS magulaplan_db;
USE magulaplan_db;

-- 1. Users Table (Couples / Dashboard Management)
CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    partner_name VARCHAR(100) DEFAULT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) DEFAULT NULL,
    role VARCHAR(50) DEFAULT 'ROLE_COUPLE',
    is_active BOOLEAN DEFAULT TRUE,
    wedding_date DATE DEFAULT NULL,
    total_budget DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Vendor Categories Table (Lookup Table)
CREATE TABLE IF NOT EXISTS vendor_categories (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE
);

-- 3. Vendors Table (Vendor Directory)
CREATE TABLE IF NOT EXISTS vendors (
    vendor_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    business_name VARCHAR(150) NOT NULL,
    description TEXT DEFAULT NULL,
    district_location VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(150) DEFAULT NULL,
    starting_price DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (category_id) REFERENCES vendor_categories(category_id) ON DELETE CASCADE
);

-- 4. Budget Items Table (Budget Tracker)
CREATE TABLE IF NOT EXISTS budget_items (
    budget_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    estimated_cost DECIMAL(10,2) DEFAULT 0.00,
    actual_cost DECIMAL(10,2) DEFAULT 0.00,
    deposit_paid DECIMAL(10,2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'Planned',
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 5. Guests Table (Guest List & WhatsApp RSVP Manager)
CREATE TABLE IF NOT EXISTS guests (
    guest_id VARCHAR(36) PRIMARY KEY, -- UUID
    user_id BIGINT NOT NULL,
    guest_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20) DEFAULT NULL,
    side_of_family VARCHAR(20) DEFAULT 'Bride',
    rsvp_status VARCHAR(20) DEFAULT 'Pending',
    whatsapp_status VARCHAR(20) DEFAULT 'Not Sent',
    plus_ones INT DEFAULT 0,
    meal_preference VARCHAR(50) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
