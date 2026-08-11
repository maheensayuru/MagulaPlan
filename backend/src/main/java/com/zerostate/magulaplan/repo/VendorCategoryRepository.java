package com.zerostate.magulaplan.repo;

import com.zerostate.magulaplan.entity.VendorCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorCategoryRepository extends JpaRepository<VendorCategory, Long> {
}
