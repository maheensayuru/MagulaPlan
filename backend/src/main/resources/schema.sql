-- ============================================================
-- Schema: MagulaPlan
-- ============================================================

CREATE TABLE IF NOT EXISTS vendor_categories (
    category_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS vendors (
    vendor_id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id       BIGINT         NOT NULL,
    business_name     VARCHAR(150)   NOT NULL,
    description       TEXT,
    district_location VARCHAR(100),
    contact_phone     VARCHAR(20)    NOT NULL,
    contact_email     VARCHAR(150)   NOT NULL,
    starting_price    DECIMAL(10, 2),
    image_url         VARCHAR(255),
    rating            DECIMAL(2, 1),
    review_count      INT,
    verified          BOOLEAN,
    featured          BOOLEAN,
    CONSTRAINT fk_vendor_category FOREIGN KEY (category_id)
        REFERENCES vendor_categories (category_id)
);
