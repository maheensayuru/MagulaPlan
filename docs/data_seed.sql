USE defaultdb;

-- Category Data Seeding (8 Categories)
INSERT IGNORE INTO vendor_categories (category_id, category_name) VALUES
(1, 'Venue'),
(2, 'Photography'),
(3, 'Catering'),
(4, 'Decoration'),
(5, 'Bridal Dressing'),
(6, 'Music & Entertainment'),
(7, 'Attire & Jewelry'),
(8, 'Transport');

-- Real Vendor Data Seeding (13 Vendors)
INSERT IGNORE INTO vendors (vendor_id, category_id, business_name, district_location, contact_email, contact_phone, image_url, rating, review_count, verified, featured) VALUES
(1, 1, 'Cinnamon Grand Colombo', 'Colombo', 'events@cinnamonhotels.com', '0112437437', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80', 4.8, 124, true, true),
(2, 1, 'Jetwing Blue', 'Negombo', 'weddings@jetwinghotels.com', '0312279000', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', 4.7, 98, true, true),
(3, 1, 'Earls Regency', 'Kandy', 'banquets@earlsregency.lk', '0812421100', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', 4.6, 85, true, false),
(4, 2, 'Dhanushka Senanayake Photography', 'Colombo', 'info@dhanushkasena.com', '0773010300', 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80', 4.9, 210, true, true),
(5, 2, 'Studio 3000DF', 'Colombo', 'contact@studio3000df.com', '0112805805', 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80', 4.5, 142, true, false),
(6, 3, 'Perera Caterers', 'Colombo', 'orders@pereracaterers.lk', '0112588588', 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80', 4.6, 115, true, false),
(7, 3, 'Lassana Caterers', 'Gampaha', 'sales@lassanacaterers.com', '0332221100', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80', 4.4, 76, true, false),
(8, 4, 'Lassana Flora', 'Colombo', 'info@lassanaflora.com', '0112001122', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', 4.8, 310, true, true),
(9, 4, 'Poru Events', 'Colombo', 'hello@poruevents.com', '0777123456', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80', 4.7, 165, true, true),
(10, 5, 'Chandimal Jayasinghe Bridal', 'Colombo', 'booking@chandimal.lk', '0773112233', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80', 4.9, 180, true, true),
(11, 6, 'Doctor Band', 'Colombo', 'contact@doctorband.lk', '0777998877', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80', 4.8, 95, true, false),
(12, 7, 'Vogue Jewellers', 'Colombo', 'info@voguejewellers.lk', '0112422222', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', 4.9, 240, true, true),
(13, 8, 'Wedding Cars Sri Lanka', 'Colombo', 'reserve@weddingcars.lk', '0772223344', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', 4.7, 62, true, false);