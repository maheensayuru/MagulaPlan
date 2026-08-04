package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {

    private String fullName;
    private String partnerName;
    private String email;
    private String password;
    private String phoneNumber;
    private String role;
    private LocalDate weddingDate;
    private BigDecimal totalBudget;
}
