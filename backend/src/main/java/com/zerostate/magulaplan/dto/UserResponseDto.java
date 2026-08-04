package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {


    private Long userId;
    private String fullName;
    private String partnerName;
    private String email;
    private String phoneNumber;
    private String role;
    private Boolean isActive;
    private LocalDate weddingDate;
    private BigDecimal totalBudget;
    private LocalDateTime createdAt;
}
