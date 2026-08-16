package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.BudgetItemRequestDto;
import com.zerostate.magulaplan.dto.BudgetItemResponseDto;
import com.zerostate.magulaplan.entity.BudgetItem;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.BudgetItemRepository;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.service.BudgetItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetItemServiceImpl implements BudgetItemService {

    private final BudgetItemRepository budgetItemRepository;
    private final UserRepository userRepository;

    @Autowired
    public BudgetItemServiceImpl(BudgetItemRepository budgetItemRepository, UserRepository userRepository) {
        this.budgetItemRepository = budgetItemRepository;
        this.userRepository = userRepository;
    }

    @Override
    public BudgetItemResponseDto saveBudgetItem(BudgetItemRequestDto budgetItemRequestDto) {
        User user = userRepository.findById(budgetItemRequestDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + budgetItemRequestDto.getUserId()));
        BudgetItem budgetItem = BudgetItem.builder()
                .itemName(budgetItemRequestDto.getItemName())
                .category(budgetItemRequestDto.getCategory())
                .estimatedCost(budgetItemRequestDto.getEstimatedCost())
                .actualCost(budgetItemRequestDto.getActualCost())
                .depositPaid(budgetItemRequestDto.getDepositPaid())
                .status(budgetItemRequestDto.getStatus() != null ? budgetItemRequestDto.getStatus() : "Planned") // Default status
                .user(user)
                .build();
        BudgetItem savedBudgetItem = budgetItemRepository.save(budgetItem);
        return mapToResponseDto(savedBudgetItem);
    }

    @Override
    public List<BudgetItemResponseDto> getAllBudgetItems() {
        return budgetItemRepository.findAll().stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    @Override
    public List<BudgetItemResponseDto> getBudgetItemsByUserId(Long userId) {
        return budgetItemRepository.findByUser_UserId(userId).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public BudgetItemResponseDto getBudgetItemById(Long budgetItemId) {
        BudgetItem budgetItem = budgetItemRepository.findById(budgetItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Budget Item not found with ID: " + budgetItemId));


        return mapToResponseDto(budgetItem);
    }

    @Override
    public BudgetItemResponseDto updateBudgetItem(Long budgetItemId, BudgetItemRequestDto budgetItemRequestDto) {
        BudgetItem existingBudgetItem = budgetItemRepository.findById(budgetItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Budget Item not found with ID: " + budgetItemId));

        existingBudgetItem.setItemName(budgetItemRequestDto.getItemName());
        existingBudgetItem.setCategory(budgetItemRequestDto.getCategory());
        existingBudgetItem.setEstimatedCost(budgetItemRequestDto.getEstimatedCost());
        existingBudgetItem.setActualCost(budgetItemRequestDto.getActualCost());
        existingBudgetItem.setDepositPaid(budgetItemRequestDto.getDepositPaid());

        if (budgetItemRequestDto.getStatus() != null && !budgetItemRequestDto.getStatus().isEmpty()) {
            existingBudgetItem.setStatus(budgetItemRequestDto.getStatus());
        }

        BudgetItem updatedBudgetItem = budgetItemRepository.save(existingBudgetItem);
        return mapToResponseDto(updatedBudgetItem);
    }

    @Override
    public void deleteBudgetItem(Long budgetItemId) {
        budgetItemRepository.deleteById(budgetItemId);
    }

    private BudgetItemResponseDto mapToResponseDto(BudgetItem budgetItem) {
        return new BudgetItemResponseDto(
                budgetItem.getBudgetItemId(),
                budgetItem.getItemName(),
                budgetItem.getCategory(),
                budgetItem.getEstimatedCost(),
                budgetItem.getActualCost(),
                budgetItem.getDepositPaid(),
                budgetItem.getStatus()
        );
    }
}
