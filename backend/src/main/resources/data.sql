-- ============================================================
-- Seed Data: vendor_categories
-- ============================================================
INSERT IGNORE INTO vendor_categories (category_id, category_name) VALUES
    (1, 'Photography'),
    (2, 'Catering'),
    (3, 'Decoration');

-- ============================================================
-- Seed Data: vendors
-- ============================================================
INSERT INTO vendors (category_id, business_name, description, district_location, contact_phone, contact_email, starting_price, image_url, rating, review_count, verified, featured)
VALUES
    (
        1,
        'Lens & Light Studio',
        'Award-winning wedding and event photography studio with over 10 years of experience capturing precious moments across Sri Lanka.',
        'Colombo',
        '+94 77 123 4567',
        'info@lensandlight.lk',
        35000.00,
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
        4.9,
        128,
        TRUE,
        TRUE
    ),
    (
        2,
        'Royal Feast Catering',
        'Premium catering service specialising in traditional Sri Lankan cuisine and international buffet spreads for weddings, corporate events, and private parties.',
        'Kandy',
        '+94 71 987 6543',
        'bookings@royalfeast.lk',
        50000.00,
        'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
        4.7,
        85,
        TRUE,
        FALSE
    ),
    (
        3,
        'Bloom & Decor',
        'Creative event decoration and floral arrangement specialists. We transform ordinary venues into extraordinary experiences with custom themes and elegant designs.',
        'Gampaha',
        '+94 76 555 8899',
        'hello@bloomdecor.lk',
        20000.00,
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800',
        4.5,
        47,
        FALSE,
        TRUE
    );
