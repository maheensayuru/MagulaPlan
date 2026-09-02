package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorResponseDto {
    private Long vendorId;
    private Long categoryId;
    private String categoryName;
    private String businessName;
    private String description;
    private String districtLocation;
    private String contactPhone;
    private String contactEmail;
    private BigDecimal startingPrice;
    private String imageUrl;
    private BigDecimal rating;
    private Integer reviewCount;
    private Boolean verified;
    private Boolean featured;
    private String status;
    private String subscriptionTier;
    private String paymentStatus;
    private Long userId;
    private String sessionToken;

    // Retain legacy 15-arg constructor if needed by any existing tests/mappings
    public VendorResponseDto(Long vendorId, Long categoryId, String categoryName, String businessName,
                             String description, String districtLocation, String contactPhone,
                             String contactEmail, BigDecimal startingPrice, String imageUrl,
                             BigDecimal rating, Integer reviewCount, Boolean verified,
                             Boolean featured, String status) {
        this.vendorId = vendorId;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.businessName = businessName;
        this.description = description;
        this.districtLocation = districtLocation;
        this.contactPhone = contactPhone;
        this.contactEmail = contactEmail;
        this.startingPrice = startingPrice;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.verified = verified;
        this.featured = featured;
        this.status = status;
    }
}
