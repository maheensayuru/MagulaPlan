package com.zerostate.magulaplan.repo;

import com.zerostate.magulaplan.entity.BudgetItem;
import com.zerostate.magulaplan.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class BudgetItemRepositoryTest {

    @Autowired
    private BudgetItemRepository budgetItemRepository;

    @Autowired
    private UserRepository userRepository;

    private User savedUser;

    @BeforeEach
    void setUp() {
        savedUser = userRepository.save(User.builder()
                .fullName("Budget User")
                .partnerName("Partner")
                .email("budget@test.com")
                .passwordHash("pw")
                .phoneNumber("0720000000")
                .role("USER")
                .isActive(true)
                .weddingDate(LocalDate.of(2025, 8, 10))
                .budget(new BigDecimal("200000.00"))
                .createdAt(LocalDateTime.now())
                .build());
    }

    private BudgetItem buildItem(String name) {
        return BudgetItem.builder()
                .itemName(name)
                .category("Venue")
                .estimatedCost(new BigDecimal("50000.00"))
                .actualCost(new BigDecimal("48000.00"))
                .depositPaid(new BigDecimal("10000.00"))
                .status("Planned")
                .user(savedUser)
                .build();
    }

    @Test
    @DisplayName("save() persists budget item and assigns ID")
    void save_persistsBudgetItemWithId() {
        BudgetItem saved = budgetItemRepository.save(buildItem("Wedding Hall"));
        assertThat(saved.getBudgetItemId()).isNotNull();
        assertThat(saved.getItemName()).isEqualTo("Wedding Hall");
    }

    @Test
    @DisplayName("findById() returns saved budget item")
    void findById_returnsSavedBudgetItem() {
        BudgetItem saved = budgetItemRepository.save(buildItem("Flowers"));
        Optional<BudgetItem> found = budgetItemRepository.findById(saved.getBudgetItemId());
        assertThat(found).isPresent();
        assertThat(found.get().getItemName()).isEqualTo("Flowers");
    }

    @Test
    @DisplayName("findById() returns empty for unknown ID")
    void findById_returnsEmptyForUnknownId() {
        Optional<BudgetItem> found = budgetItemRepository.findById(999L);
        assertThat(found).isEmpty();
    }

    @Test
    @DisplayName("findAll() returns all saved budget items")
    void findAll_returnsAllSavedBudgetItems() {
        budgetItemRepository.save(buildItem("Catering"));
        budgetItemRepository.save(buildItem("Photography"));
        List<BudgetItem> items = budgetItemRepository.findAll();
        assertThat(items).hasSizeGreaterThanOrEqualTo(2);
    }

    @Test
    @DisplayName("deleteById() removes the budget item")
    void deleteById_removesBudgetItem() {
        BudgetItem saved = budgetItemRepository.save(buildItem("DJ"));
        budgetItemRepository.deleteById(saved.getBudgetItemId());
        assertThat(budgetItemRepository.findById(saved.getBudgetItemId())).isEmpty();
    }

    @Test
    @DisplayName("findByUser_UserId() returns items for matching user")
    void findByUserUserId_returnsItemsForUser() {
        budgetItemRepository.save(buildItem("Decorations"));
        budgetItemRepository.save(buildItem("Cake"));
        List<BudgetItem> items = budgetItemRepository.findByUser_UserId(savedUser.getUserId());
        assertThat(items).hasSizeGreaterThanOrEqualTo(2);
        assertThat(items).allMatch(i -> i.getUser().getUserId().equals(savedUser.getUserId()));
    }

    @Test
    @DisplayName("findByUser_UserId() returns empty for unknown user ID")
    void findByUserUserId_returnsEmptyForUnknownUserId() {
        List<BudgetItem> items = budgetItemRepository.findByUser_UserId(999L);
        assertThat(items).isEmpty();
    }
}
