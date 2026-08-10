package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorRequestDto {
    private Long categoryId;
    private String businessName;
    private String description;
    private String districtLocation;
    private String contactPhone;
    private String contactEmail;
    private BigDecimal startingPrice;
}
