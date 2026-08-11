package com.zerostate.magulaplan.repo;

import com.zerostate.magulaplan.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    List<Vendor> findByCategory_CategoryId(Long categoryId);
}
