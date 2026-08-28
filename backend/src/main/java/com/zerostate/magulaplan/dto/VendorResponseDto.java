package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
