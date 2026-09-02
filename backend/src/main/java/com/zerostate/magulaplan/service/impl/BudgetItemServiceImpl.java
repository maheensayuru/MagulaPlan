package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.BudgetItemRequestDto;
import com.zerostate.magulaplan.dto.BudgetItemResponseDto;
import com.zerostate.magulaplan.dto.BudgetSummaryResponseDto;
import com.zerostate.magulaplan.entity.BudgetItem;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.BudgetItemRepository;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.service.BudgetItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
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
        Long targetUserId = budgetItemRequestDto.getUserId();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Long authId) {
            boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
            if (!isAdmin || targetUserId == null) {
                targetUserId = authId;
            }
        }

        User user;
        if (targetUserId != null) {
            final Long uid = targetUserId;
            user = userRepository.findById(targetUserId)
                    .orElseGet(() -> userRepository.findAll().stream().findFirst()
                            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + uid)));
        } else {
            user = userRepository.findAll().stream().findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("No users found in database to associate budget item."));
        }

        BudgetItem budgetItem = BudgetItem.builder()
                .itemName(budgetItemRequestDto.getItemName())
                .category(budgetItemRequestDto.getCategory())
                .estimatedCost(budgetItemRequestDto.getEstimatedCost() != null ? budgetItemRequestDto.getEstimatedCost() : BigDecimal.ZERO)
                .actualCost(budgetItemRequestDto.getActualCost() != null ? budgetItemRequestDto.getActualCost() : BigDecimal.ZERO)
                .depositPaid(budgetItemRequestDto.getDepositPaid() != null ? budgetItemRequestDto.getDepositPaid() : BigDecimal.ZERO)
                .status(budgetItemRequestDto.getStatus() != null && !budgetItemRequestDto.getStatus().isEmpty() ? budgetItemRequestDto.getStatus() : "Planned")
                .user(user)
                .build();
        BudgetItem savedBudgetItem = budgetItemRepository.save(budgetItem);
        return mapToResponseDto(savedBudgetItem);
    }

    @Override
    public List<BudgetItemResponseDto> getAllBudgetItems() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Long authId) {
            boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
            if (!isAdmin) {
                return budgetItemRepository.findByUser_UserId(authId).stream()
                        .map(this::mapToResponseDto)
                        .collect(Collectors.toList());
            }
        }
        return budgetItemRepository.findAll().stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    @Override
    public List<BudgetItemResponseDto> getBudgetItemsByUserId(Long userId) {
        checkAccessToUserData(userId);
        return budgetItemRepository.findByUser_UserId(userId).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public BudgetItemResponseDto getBudgetItemById(Long budgetItemId) {
        BudgetItem budgetItem = budgetItemRepository.findById(budgetItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Budget Item not found with ID: " + budgetItemId));
        checkItemOwnership(budgetItem);
        return mapToResponseDto(budgetItem);
    }

    @Override
    public BudgetItemResponseDto updateBudgetItem(Long budgetItemId, BudgetItemRequestDto budgetItemRequestDto) {
        BudgetItem existingBudgetItem = budgetItemRepository.findById(budgetItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Budget Item not found with ID: " + budgetItemId));
        checkItemOwnership(existingBudgetItem);

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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Long) {
            BudgetItem existingBudgetItem = budgetItemRepository.findById(budgetItemId)
                    .orElseThrow(() -> new ResourceNotFoundException("Budget Item not found with ID: " + budgetItemId));
            checkItemOwnership(existingBudgetItem);
            budgetItemRepository.delete(existingBudgetItem);
        } else {
            budgetItemRepository.deleteById(budgetItemId);
        }
    }

    @Override
    public BudgetSummaryResponseDto getBudgetSummary(Long userId) {
        checkAccessToUserData(userId);
        List<BudgetItem> items = budgetItemRepository.findByUser_UserId(userId);

        BigDecimal totalEstimated = sum(items.stream().map(BudgetItem::getEstimatedCost));
        BigDecimal totalActual = sum(items.stream().map(BudgetItem::getActualCost));
        BigDecimal totalDepositPaid = sum(items.stream().map(BudgetItem::getDepositPaid));
        BigDecimal remaining = totalEstimated.subtract(totalActual);

        return new BudgetSummaryResponseDto(totalEstimated, totalActual, totalDepositPaid, remaining);
    }

    private void checkItemOwnership(BudgetItem item) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Long authId) {
            boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
            if (!isAdmin && item.getUser() != null && !item.getUser().getUserId().equals(authId)) {
                throw new AccessDeniedException("You are not authorized to access this budget item.");
            }
        }
    }

    private void checkAccessToUserData(Long targetUserId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Long authId) {
            boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
            if (!isAdmin && !authId.equals(targetUserId)) {
                throw new AccessDeniedException("You are not authorized to view this user's budget data.");
            }
        }
    }

    private BigDecimal sum(java.util.stream.Stream<BigDecimal> values) {
        return values.filter(Objects::nonNull).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BudgetItemResponseDto mapToResponseDto(BudgetItem budgetItem) {
        BudgetItemResponseDto responseDto = new BudgetItemResponseDto();
        responseDto.setBudgetItemId(budgetItem.getBudgetItemId());
        responseDto.setItemName(budgetItem.getItemName());
        responseDto.setCategory(budgetItem.getCategory());
        responseDto.setEstimatedCost(budgetItem.getEstimatedCost());
        responseDto.setActualCost(budgetItem.getActualCost());
        responseDto.setDepositPaid(budgetItem.getDepositPaid());
        responseDto.setStatus(budgetItem.getStatus());
        if (budgetItem.getUser() != null) {
            responseDto.setUserId(budgetItem.getUser().getUserId());
        }
        return responseDto;
    }
}
