package com.zerostate.magulaplan.repo;

import com.zerostate.magulaplan.entity.BudgetItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetItemRepository extends JpaRepository<BudgetItem, Long> {
    List<BudgetItem> findByUser_UserId(Long userId);
}
