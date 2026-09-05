package com.zerostate.magulaplan.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorRequestDto {

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotBlank(message = "Business name is required")
    @Size(max = 150, message = "Business name cannot exceed 150 characters")
    private String businessName;

    private String description;

    @NotBlank(message = "District location is required")
    private String districtLocation;

    @NotBlank(message = "Contact phone is required")
    private String contactPhone;

    @Email(message = "Invalid contact email address")
    private String contactEmail;

    @DecimalMin(value = "0.0", inclusive = true, message = "Starting price must be non-negative")
    private BigDecimal startingPrice;

    private String imageUrl;
    private BigDecimal rating;
    private Integer reviewCount;
    private Boolean verified;
    private Boolean featured;

    private String subscriptionTier;
    private String paymentStatus;
    private String password;
    private Long userId;
    private String status;
    // Retain legacy 12-arg constructor so existing unit tests compile and run unchanged
    public VendorRequestDto(Long categoryId, String businessName, String description,
                            String districtLocation, String contactPhone, String contactEmail,
                            BigDecimal startingPrice, String imageUrl, BigDecimal rating,
                            Integer reviewCount, Boolean verified, Boolean featured) {
        this.categoryId = categoryId;
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
    }
}
