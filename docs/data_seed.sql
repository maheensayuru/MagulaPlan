-- Category Data Seeding (8 Categories)
INSERT INTO vendor_categories (category_id, category_name) VALUES
(1, 'Venue'),
(2, 'Photography'),
(3, 'Catering'),
(4, 'Decoration'),
(5, 'Bridal Dressing'),
(6, 'Music & Entertainment'),
(7, 'Attire & Jewelry'),
(8, 'Transport')
AS new
ON DUPLICATE KEY UPDATE category_name = new.category_name;

-- Real Vendor Data Seeding (13 Vendors with Real Unsplash Direct Image URLs)
-- status: 'APPROVED' = live in the public directory; new vendor registrations
-- default to 'PENDING' until an admin approves them.
INSERT INTO vendors (vendor_id, category_id, business_name, district_location, contact_phone, contact_email, starting_price, image_url, rating, review_count, verified, featured, subscription_tier, payment_status, status) VALUES
(1, 1, 'Cinnamon Grand Colombo', 'Colombo', '0112497410', 'events@cinnamonhotels.com', 250000, 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3', 4.9, 120, 1, 1, 'FEATURED', 'PAID', 'APPROVED'),
(2, 1, 'Heritance Kandalama', 'Dambulla', '0665555000', 'weddings@heritancehotels.com', 220000, 'https://images.unsplash.com/photo-1540555700478-4be289fbecef', 4.8, 95, 1, 1, 'FEATURED', 'PAID', 'APPROVED'),
(3, 2, 'Studio 3000DF', 'Colombo', '0718223000', 'info@studio3000df.com', 35000, 'https://images.unsplash.com/photo-1537633552985-df8429e8048b', 4.9, 210, 1, 1, 'PRO', 'PAID', 'APPROVED'),
(4, 2, 'Dhanushka Senanayake Photography', 'Colombo', '0777123456', 'contact@dhanushkasena.com', 30000, 'https://images.unsplash.com/photo-1606800052052-a08af7148866', 4.7, 85, 1, 0, 'PRO', 'PAID', 'APPROVED'),
(5, 3, 'Perera Caterers', 'Gampaha', '0112911211', 'orders@pereracaterers.lk', 1800, 'https://images.unsplash.com/photo-1555244162-803834f70033', 4.6, 75, 1, 0, 'FREE', 'PAID', 'APPROVED'),
(6, 3, 'Mount Lavinia Hotel Catering', 'Colombo', '0112711711', 'banquets@mlh.lk', 2000, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3', 4.8, 140, 1, 1, 'FEATURED', 'PAID', 'APPROVED'),
(7, 4, 'Lassana Flora', 'Colombo', '0112001122', 'info@lassanaflora.com', 50000, 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9', 4.9, 310, 1, 1, 'FEATURED', 'PAID', 'APPROVED'),
(8, 4, 'Poruwa Weddings & Events', 'Kandy', '0812234567', 'hello@poruwaweddings.lk', 45000, 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6', 4.7, 60, 1, 0, 'FREE', 'PAID', 'APPROVED'),
(9, 5, 'Chandani Bandara Salon', 'Colombo', '0112026878', 'salon@chandanibandara.com', 40000, 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f', 4.8, 180, 1, 1, 'PRO', 'PAID', 'APPROVED'),
(10, 6, 'Daddy Live Band', 'Colombo', '0777555333', 'booking@daddy.lk', 75000, 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7', 4.9, 150, 1, 1, 'FEATURED', 'PAID', 'APPROVED'),
(11, 6, 'DJ Kapila Entertainment', 'Galle', '0912234567', 'djkapila@gmail.com', 30000, 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', 4.5, 45, 1, 0, 'FREE', 'PAID', 'APPROVED'),
(12, 7, 'Vogue Jewellers', 'Colombo', '0112414414', 'info@voguejewellers.lk', 60000, 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908', 4.9, 290, 1, 1, 'FEATURED', 'PAID', 'APPROVED'),
(13, 8, 'Sri Lanka Classic Cars', 'Colombo', '0112503503', 'rentals@classiccars.lk', 45000, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70', 4.8, 80, 1, 0, 'PRO', 'PAID', 'APPROVED')
AS new
ON DUPLICATE KEY UPDATE
category_id = new.category_id,
business_name = new.business_name,
district_location = new.district_location,
contact_phone = new.contact_phone,
contact_email = new.contact_email,
starting_price = new.starting_price,
image_url = new.image_url,
rating = new.rating,
review_count = new.review_count,
verified = new.verified,
featured = new.featured,
status = new.status,
subscription_tier = new.subscription_tier,
payment_status = new.payment_status;

-- Admin user (role=ADMIN) for the admin panel.
-- NOTE: password_hash is seeded as plain-text for the first login only;
-- AuthController upgrades it to BCrypt automatically on first successful login.
-- Credentials: admin@magulaplan.lk / Admin@123
INSERT INTO users (email, full_name, password_hash, phone_number, role, is_active) VALUES
('admin@magulaplan.lk', 'MagulaPlan Admin', 'Admin@123', '0770000000', 'ADMIN', 1)
AS new
ON DUPLICATE KEY UPDATE full_name = new.full_name, role = new.role, is_active = new.is_active;

-- Couple user (role=USER) for couple dashboard, budget tracker, and guest lists.
-- Credentials: test@magulaplan.lk / Password@123
INSERT INTO users (email, full_name, password_hash, phone_number, role, is_active) VALUES
('test@magulaplan.lk', 'Kasun & Sandani', 'Password@123', '0771234567', 'USER', 1)
AS new
ON DUPLICATE KEY UPDATE full_name = new.full_name, role = new.role, is_active = new.is_active;

-- Vendor user (role=VENDOR) for the commercial vendor portal and inquiry leads.
-- Credentials: vendor@magulaplan.lk / Vendor@123
INSERT INTO users (email, full_name, password_hash, phone_number, role, is_active) VALUES
('vendor@magulaplan.lk', 'Royal Ceylon Studio', 'Vendor@123', '0772345678', 'VENDOR', 1)
AS new
ON DUPLICATE KEY UPDATE full_name = new.full_name, role = new.role, is_active = new.is_active;
