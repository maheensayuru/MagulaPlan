package com.zerostate.magulaplan.repo;

import com.zerostate.magulaplan.entity.Vendor;
import com.zerostate.magulaplan.entity.VendorCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class VendorRepositoryTest {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private VendorCategoryRepository vendorCategoryRepository;

    private VendorCategory savedCategory;

    @BeforeEach
    void setUp() {
        savedCategory = vendorCategoryRepository.save(new VendorCategory(null, "Photography", null));
    }

    private Vendor buildVendor(String businessName) {
        return Vendor.builder()
                .category(savedCategory)
                .businessName(businessName)
                .description("A great vendor")
                .districtLocation("Colombo")
                .contactPhone("0711111111")
                .contactEmail("vendor@test.com")
                .startingPrice(new BigDecimal("25000.00"))
                .build();
    }

    @Test
    @DisplayName("save() persists vendor and assigns ID")
    void save_persistsVendorWithId() {
        Vendor saved = vendorRepository.save(buildVendor("Sunset Studios"));
        assertThat(saved.getVendorId()).isNotNull();
        assertThat(saved.getBusinessName()).isEqualTo("Sunset Studios");
    }

    @Test
    @DisplayName("findById() returns saved vendor")
    void findById_returnsSavedVendor() {
        Vendor saved = vendorRepository.save(buildVendor("Star Photos"));
        Optional<Vendor> found = vendorRepository.findById(saved.getVendorId());
        assertThat(found).isPresent();
        assertThat(found.get().getBusinessName()).isEqualTo("Star Photos");
    }

    @Test
    @DisplayName("findById() returns empty for unknown ID")
    void findById_returnsEmptyForUnknownId() {
        Optional<Vendor> found = vendorRepository.findById(999L);
        assertThat(found).isEmpty();
    }

    @Test
    @DisplayName("findAll() returns all saved vendors")
    void findAll_returnsAllSavedVendors() {
        vendorRepository.save(buildVendor("Vendor A"));
        vendorRepository.save(buildVendor("Vendor B"));
        List<Vendor> vendors = vendorRepository.findAll();
        assertThat(vendors).hasSizeGreaterThanOrEqualTo(2);
    }

    @Test
    @DisplayName("deleteById() removes the vendor")
    void deleteById_removesVendor() {
        Vendor saved = vendorRepository.save(buildVendor("To Delete"));
        vendorRepository.deleteById(saved.getVendorId());
        assertThat(vendorRepository.findById(saved.getVendorId())).isEmpty();
    }

    @Test
    @DisplayName("findByCategory_CategoryId() returns vendors for matching category")
    void findByCategoryCategoryId_returnsVendorsForCategory() {
        vendorRepository.save(buildVendor("Lens Masters"));
        vendorRepository.save(buildVendor("Click Studios"));
        List<Vendor> vendors = vendorRepository.findByCategory_CategoryId(savedCategory.getCategoryId());
        assertThat(vendors).hasSizeGreaterThanOrEqualTo(2);
        assertThat(vendors).allMatch(v -> v.getCategory().getCategoryId().equals(savedCategory.getCategoryId()));
    }

    @Test
    @DisplayName("findByCategory_CategoryId() returns empty for unknown category ID")
    void findByCategoryCategoryId_returnsEmptyForUnknownCategoryId() {
        List<Vendor> vendors = vendorRepository.findByCategory_CategoryId(999L);
        assertThat(vendors).isEmpty();
    }
}
