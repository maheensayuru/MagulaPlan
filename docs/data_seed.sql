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
INSERT INTO vendors (vendor_id, category_id, business_name, district_location, contact_phone, contact_email, starting_price, image_url, rating, review_count, verified, featured, status) VALUES
(1, 1, 'Cinnamon Grand Colombo', 'Colombo', '0712345678', 'events@cinnamonhotels.com', 250000, 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3', 4.9, 120, 1, 1, 'APPROVED'),
(2, 1, 'Heritance Kandalama', 'Dambulla', '0722345678', 'weddings@heritancehotels.com', 220000, 'https://images.unsplash.com/photo-1540555700478-4be289fbecef', 4.8, 95, 1, 1, 'APPROVED'),
(3, 2, 'Studio 3000DF', 'Colombo', '0732345678', 'info@studio3000df.com', 35000, 'https://images.unsplash.com/photo-1537633552985-df8429e8048b', 4.9, 210, 1, 1, 'APPROVED'),
(4, 2, 'Dhanushka Senanayake Photography', 'Colombo', '0742345678', 'contact@dhanushkasena.com', 30000, 'https://images.unsplash.com/photo-1606800052052-a08af7148866', 4.7, 85, 1, 0, 'APPROVED'),
(5, 3, 'Perera Caterers', 'Gampaha', '0752345678', 'orders@pereracaterers.lk', 1800, 'https://images.unsplash.com/photo-1555244162-803834f70033', 4.6, 75, 1, 0, 'APPROVED'),
(6, 3, 'Mount Lavinia Hotel Catering', 'Colombo', '0762345678', 'banquets@mlh.lk', 2000, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3', 4.8, 140, 1, 1, 'APPROVED'),
(7, 4, 'Lassana Flora', 'Colombo', '0772345678', 'info@lassanaflora.com', 50000, 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9', 4.9, 310, 1, 1, 'APPROVED'),
(8, 4, 'Poruwa Weddings & Events', 'Kandy', '0782345678', 'hello@poruwaweddings.lk', 45000, 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6', 4.7, 60, 1, 0, 'APPROVED'),
(9, 5, 'Chandani Bandara Salon', 'Colombo', '0713456789', 'salon@chandanibandara.com', 40000, 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f', 4.8, 180, 1, 1, 'APPROVED'),
(10, 6, 'Daddy Live Band', 'Colombo', '0723456789', 'booking@daddy.lk', 75000, 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7', 4.9, 150, 1, 1, 'APPROVED'),
(11, 6, 'DJ Kapila Entertainment', 'Galle', '0733456789', 'djkapila@gmail.com', 30000, 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', 4.5, 45, 1, 0, 'APPROVED'),
(12, 7, 'Vogue Jewellers', 'Colombo', '0743456789', 'info@voguejewellers.lk', 60000, 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908', 4.9, 290, 1, 1, 'APPROVED'),
(13, 8, 'Sri Lanka Classic Cars', 'Colombo', '0753456789', 'rentals@classiccars.lk', 45000, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70', 4.8, 80, 1, 0, 'APPROVED')
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
status = new.status;

-- Admin user (role=ADMIN) for the admin panel.
-- NOTE: password_hash is seeded as plain-text for the first login only;
-- AuthController upgrades it to BCrypt automatically on first successful login.
-- Credentials: admin@magulaplan.lk / Admin@123
INSERT INTO users (email, full_name, password_hash, phone_number, role, is_active) VALUES
('admin@magulaplan.lk', 'MagulaPlan Admin', 'Admin@123', '0770000000', 'ADMIN', 1)
AS new
ON DUPLICATE KEY UPDATE full_name = new.full_name, role = new.role, is_active = new.is_active;
