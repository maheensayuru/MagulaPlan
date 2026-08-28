package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.BudgetItemRequestDto;
import com.zerostate.magulaplan.dto.BudgetItemResponseDto;
import com.zerostate.magulaplan.dto.BudgetSummaryResponseDto;
import com.zerostate.magulaplan.service.BudgetItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/budget-items")
public class BudgetItemController {

    private final BudgetItemService budgetItemService;

    @Autowired
    public BudgetItemController(BudgetItemService budgetItemService) {
        this.budgetItemService = budgetItemService;
    }

    // 1. Create Budget Item
    @PostMapping
    public ResponseEntity<BudgetItemResponseDto> createBudgetItem(@RequestBody BudgetItemRequestDto requestDto) {
        BudgetItemResponseDto responseDto = budgetItemService.saveBudgetItem(requestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
//        201
    }

    // 2. Get All Budget Items
    @GetMapping
    public ResponseEntity<List<BudgetItemResponseDto>> getAllBudgetItems() {
        List<BudgetItemResponseDto> budgetItems = budgetItemService.getAllBudgetItems();
        return new ResponseEntity<>(budgetItems, HttpStatus.OK);
//        200 ok
    }

    // 3. Get Budget Items by User ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BudgetItemResponseDto>> getBudgetItemsByUserId(@PathVariable Long userId) {
        List<BudgetItemResponseDto> budgetItems = budgetItemService.getBudgetItemsByUserId(userId);
        return new ResponseEntity<>(budgetItems, HttpStatus.OK);
//        200 ok
    }

    // 3.1 Get budget summary for a user
    @GetMapping("/summary/{userId}")
    public ResponseEntity<BudgetSummaryResponseDto> getBudgetSummary(@PathVariable Long userId) {
        BudgetSummaryResponseDto summary = budgetItemService.getBudgetSummary(userId);
        return new ResponseEntity<>(summary, HttpStatus.OK);
    }

    // 4. Get Budget Item by ID
    @GetMapping("/{budgetItemId}")
    public ResponseEntity<BudgetItemResponseDto> getBudgetItemById(@PathVariable Long budgetItemId) {
        BudgetItemResponseDto responseDto = budgetItemService.getBudgetItemById(budgetItemId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 5. Update Budget Item
    @PutMapping("/{budgetItemId}")
    public ResponseEntity<BudgetItemResponseDto> updateBudgetItem(
            @PathVariable Long budgetItemId,
            @RequestBody BudgetItemRequestDto requestDto) {
        BudgetItemResponseDto responseDto = budgetItemService.updateBudgetItem(budgetItemId, requestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
//        200 ok
    }

    // 6. Delete Budget Item
    @DeleteMapping("/{budgetItemId}")
    public ResponseEntity<Void> deleteBudgetItem(@PathVariable Long budgetItemId) {
        budgetItemService.deleteBudgetItem(budgetItemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        204 No content
    }
}
