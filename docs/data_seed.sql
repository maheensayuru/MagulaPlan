-- Category Data Seeding (8 Categories)
INSERT INTO vendor_categories (category_id, name, description) VALUES
(1, 'Venue', 'Luxury banquet halls, beachside resorts, and wedding gardens'),
(2, 'Photography', 'Professional wedding photography and videography services'),
(3, 'Catering', 'Delicious traditional and international wedding menus'),
(4, 'Decoration', 'Floral arrangements, stage design, and lighting setups'),
(5, 'Bridal Dressing', 'Bridal makeup, hair styling, and saree draping services'),
(6, 'Music & Entertainment', 'Live bands, DJs, and traditional dancing troupes'),
(7, 'Attire & Jewelry', 'Groom wear, bridal sarees, and custom jewelry'),
(8, 'Transport', 'Luxury wedding cars and vintage vehicles')
ON DUPLICATE KEY UPDATE 
name=VALUES(name), description=VALUES(description);

-- Real Vendor Data Seeding (13 Vendors with Unsplash Photos)
INSERT INTO vendors (vendor_id, category_id, business_name, district_location, contact_email, image_url, rating, review_count, verified, featured) VALUES
(1, 1, 'Cinnamon Grand Colombo', 'Colombo', 'events@cinnamonhotels.com', 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3', 4.9, 120, 1, 1),
(2, 1, 'Heritance Kandalama', 'Dambulla', 'weddings@heritancehotels.com', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef', 4.8, 95, 1, 1),
(3, 2, 'Studio 3000DF', 'Colombo', 'info@studio3000df.com', 'https://images.unsplash.com/photo-1537633552985-df8429e8048b', 4.9, 210, 1, 1),
(4, 2, 'Dhanushka Senanayake Photography', 'Colombo', 'contact@dhanushkasena.com', 'https://images.unsplash.com/photo-1606800052052-a08af7148866', 4.7, 85, 1, 0),
(5, 3, 'Perera Caterers', 'Gampaha', 'orders@pereracaterers.lk', 'https://images.unsplash.com/photo-1555244162-803834f70033', 4.6, 75, 1, 0),
(6, 3, 'Mount Lavinia Hotel Catering', 'Colombo', 'banquets@mlh.lk', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3', 4.8, 140, 1, 1),
(7, 4, 'Lassana Flora', 'Colombo', 'info@lassanaflora.com', 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9', 4.9, 310, 1, 1),
(8, 4, 'Poruwa Weddings & Events', 'Kandy', 'hello@poruwaweddings.lk', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6', 4.7, 60, 1, 0),
(9, 5, 'Chandani Bandara Salon', 'Colombo', 'salon@chandanibandara.com', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f', 4.8, 180, 1, 1),
(10, 6, 'Daddy Live Band', 'Colombo', 'booking@daddy.lk', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7', 4.9, 150, 1, 1),
(11, 6, 'DJ Kapila Entertainment', 'Galle', 'djkapila@gmail.com', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', 4.5, 45, 1, 0),
(12, 7, 'Vogue Jewellers', 'Colombo', 'info@voguejewellers.lk', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908', 4.9, 290, 1, 1),
(13, 8, 'Sri Lanka Classic Cars', 'Colombo', 'rentals@classiccars.lk', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70', 4.8, 80, 1, 0)
ON DUPLICATE KEY UPDATE 
category_id=VALUES(category_id),
business_name=VALUES(business_name),
district_location=VALUES(district_location),
contact_email=VALUES(contact_email),
image_url=VALUES(image_url),
rating=VALUES(rating),
review_count=VALUES(review_count),
verified=VALUES(verified),
featured=VALUES(featured);
