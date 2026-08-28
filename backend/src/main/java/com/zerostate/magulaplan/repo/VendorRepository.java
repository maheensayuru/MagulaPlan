package com.zerostate.magulaplan.repo;

import com.zerostate.magulaplan.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long>, JpaSpecificationExecutor<Vendor> {
    List<Vendor> findByCategory_CategoryId(Long categoryId);

    List<Vendor> findByStatus(String status);

    List<Vendor> findByCategory_CategoryIdAndStatus(Long categoryId, String status);

    long countByStatus(String status);
}
