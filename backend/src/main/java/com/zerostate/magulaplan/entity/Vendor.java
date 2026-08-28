package com.zerostate.magulaplan.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vendors")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vendor_id")
    private Long vendorId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private VendorCategory category;

    @Column(name = "business_name", length = 150, nullable = false)
    private String businessName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "district_location", length = 100)
    private String districtLocation;

    @Column(name = "contact_phone", length = 20, nullable = false)
    private String contactPhone;

    @Column(name = "contact_email", length = 150, nullable = false)
    private String contactEmail;

    @Column(name = "starting_price", precision = 10, scale = 2)
    private BigDecimal startingPrice;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "rating", precision = 2, scale = 1)
    private BigDecimal rating;

    @Column(name = "review_count")
    private Integer reviewCount;

    @Builder.Default
    @Column(name = "verified", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean verified = false;

    @Builder.Default
    @Column(name = "featured", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean featured = false;

    @Builder.Default
    @Column(name = "status", length = 20)
    private String status = "PENDING";
}
