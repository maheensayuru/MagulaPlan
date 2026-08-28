package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetSummaryResponseDto {
    private BigDecimal totalEstimated;
    private BigDecimal totalActual;
    private BigDecimal totalDepositPaid;
    private BigDecimal remaining;
}
