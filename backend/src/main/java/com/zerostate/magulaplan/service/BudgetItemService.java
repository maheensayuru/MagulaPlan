package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.BudgetItemRequestDto;
import com.zerostate.magulaplan.dto.BudgetItemResponseDto;
import com.zerostate.magulaplan.dto.BudgetSummaryResponseDto;

import java.util.List;

public interface BudgetItemService {
    BudgetItemResponseDto saveBudgetItem(BudgetItemRequestDto budgetItemRequestDto);
    List<BudgetItemResponseDto> getAllBudgetItems();
    List<BudgetItemResponseDto> getBudgetItemsByUserId(Long userId);
    BudgetItemResponseDto getBudgetItemById(Long budgetItemId);
    BudgetItemResponseDto updateBudgetItem(Long budgetItemId, BudgetItemRequestDto budgetItemRequestDto);
    void deleteBudgetItem(Long budgetItemId);
    BudgetSummaryResponseDto getBudgetSummary(Long userId);
}
