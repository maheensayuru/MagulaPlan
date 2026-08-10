package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BudgetItemRequestDto {
    private Long userId;
    private String itemName;
    private String category;
    private BigDecimal estimatedCost;
    private BigDecimal actualCost;
    private BigDecimal depositPaid;
    private String status;
}
