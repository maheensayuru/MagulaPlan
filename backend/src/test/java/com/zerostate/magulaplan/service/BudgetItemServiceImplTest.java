package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.BudgetItemRequestDto;
import com.zerostate.magulaplan.dto.BudgetItemResponseDto;
import com.zerostate.magulaplan.entity.BudgetItem;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.BudgetItemRepository;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.service.impl.BudgetItemServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BudgetItemServiceImplTest {

    @Mock
    private BudgetItemRepository budgetItemRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private BudgetItemServiceImpl budgetItemService;

    private User buildUser() {
        return User.builder()
                .userId(1L)
                .fullName("Alice")
                .partnerName("Bob")
                .email("alice@test.com")
                .passwordHash("pw")
                .phoneNumber("0711111111")
                .role("USER")
                .isActive(true)
                .weddingDate(LocalDate.now())
                .budget(new BigDecimal("100000"))
                .createdAt(LocalDateTime.now())
                .build();
    }

    private BudgetItem buildBudgetItem(Long id) {
        return BudgetItem.builder()
                .budgetItemId(id)
                .itemName("Wedding Hall")
                .category("Venue")
                .estimatedCost(new BigDecimal("50000.00"))
                .actualCost(new BigDecimal("48000.00"))
                .depositPaid(new BigDecimal("10000.00"))
                .status("Planned")
                .user(buildUser())
                .build();
    }

    private BudgetItemRequestDto buildRequest() {
        return new BudgetItemRequestDto(1L, "Wedding Hall", "Venue",
                new BigDecimal("50000.00"), new BigDecimal("48000.00"),
                new BigDecimal("10000.00"), "Planned");
    }

    @Test
    @DisplayName("saveBudgetItem() saves and returns DTO")
    void saveBudgetItem_savesAndReturnsDto() {
        User user = buildUser();
        BudgetItem item = buildBudgetItem(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(budgetItemRepository.save(any(BudgetItem.class))).thenReturn(item);

        BudgetItemResponseDto result = budgetItemService.saveBudgetItem(buildRequest());

        assertThat(result.getBudgetItemId()).isEqualTo(1L);
        assertThat(result.getItemName()).isEqualTo("Wedding Hall");
        verify(budgetItemRepository).save(any(BudgetItem.class));
    }

    @Test
    @DisplayName("saveBudgetItem() defaults status to 'Planned' when status is null")
    void saveBudgetItem_defaultsStatusToPlanned_whenNull() {
        BudgetItemRequestDto req = new BudgetItemRequestDto(1L, "Cake", "Food",
                BigDecimal.TEN, BigDecimal.TEN, BigDecimal.ONE, null);
        User user = buildUser();
        BudgetItem item = buildBudgetItem(2L);
        item.setStatus("Planned");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(budgetItemRepository.save(any(BudgetItem.class))).thenReturn(item);

        budgetItemService.saveBudgetItem(req);
        verify(budgetItemRepository).save(argThat(bi -> "Planned".equals(bi.getStatus())));
    }

    @Test
    @DisplayName("saveBudgetItem() throws ResourceNotFoundException when user not found")
    void saveBudgetItem_throwsResourceNotFoundException_whenUserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> budgetItemService.saveBudgetItem(buildRequest()))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("getAllBudgetItems() returns list of all budget items")
    void getAllBudgetItems_returnsAllItems() {
        when(budgetItemRepository.findAll()).thenReturn(List.of(buildBudgetItem(1L), buildBudgetItem(2L)));

        List<BudgetItemResponseDto> result = budgetItemService.getAllBudgetItems();

        assertThat(result).hasSize(2);
    }

    @Test
    @DisplayName("getBudgetItemsByUserId() returns items for user")
    void getBudgetItemsByUserId_returnsItemsForUser() {
        when(budgetItemRepository.findByUser_UserId(1L)).thenReturn(List.of(buildBudgetItem(1L)));

        List<BudgetItemResponseDto> result = budgetItemService.getBudgetItemsByUserId(1L);

        assertThat(result).hasSize(1);
    }

    @Test
    @DisplayName("getBudgetItemById() returns DTO when found")
    void getBudgetItemById_returnsDtoWhenFound() {
        when(budgetItemRepository.findById(1L)).thenReturn(Optional.of(buildBudgetItem(1L)));

        BudgetItemResponseDto result = budgetItemService.getBudgetItemById(1L);

        assertThat(result.getBudgetItemId()).isEqualTo(1L);
    }

    @Test
    @DisplayName("getBudgetItemById() throws ResourceNotFoundException when not found")
    void getBudgetItemById_throwsResourceNotFoundException_whenNotFound() {
        when(budgetItemRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> budgetItemService.getBudgetItemById(99L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("updateBudgetItem() updates and returns DTO")
    void updateBudgetItem_updatesAndReturnsDto() {
        BudgetItem existing = buildBudgetItem(1L);
        BudgetItem updated = buildBudgetItem(1L);
        when(budgetItemRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(budgetItemRepository.save(any(BudgetItem.class))).thenReturn(updated);

        BudgetItemResponseDto result = budgetItemService.updateBudgetItem(1L, buildRequest());

        assertThat(result.getBudgetItemId()).isEqualTo(1L);
        verify(budgetItemRepository).save(existing);
    }

    @Test
    @DisplayName("updateBudgetItem() throws ResourceNotFoundException when not found")
    void updateBudgetItem_throwsResourceNotFoundException_whenNotFound() {
        when(budgetItemRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> budgetItemService.updateBudgetItem(99L, buildRequest()))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("deleteBudgetItem() calls deleteById on repository")
    void deleteBudgetItem_callsDeleteById() {
        budgetItemService.deleteBudgetItem(1L);
        verify(budgetItemRepository).deleteById(1L);
    }
}
