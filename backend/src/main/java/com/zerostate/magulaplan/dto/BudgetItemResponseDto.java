package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BudgetItemResponseDto {
    private Long budgetItemId;
    private String itemName;
    private String category;
    private BigDecimal estimatedCost;
    private BigDecimal actualCost;
    private BigDecimal depositPaid;
    private String status;
    private Long userId;

    public BudgetItemResponseDto(Long budgetItemId, String itemName, String category,
                                 BigDecimal estimatedCost, BigDecimal actualCost,
                                 BigDecimal depositPaid, String status) {
        this.budgetItemId = budgetItemId;
        this.itemName = itemName;
        this.category = category;
        this.estimatedCost = estimatedCost;
        this.actualCost = actualCost;
        this.depositPaid = depositPaid;
        this.status = status;
    }
}
