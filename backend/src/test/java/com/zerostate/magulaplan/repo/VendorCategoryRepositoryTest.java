package com.zerostate.magulaplan.repo;

import com.zerostate.magulaplan.entity.VendorCategory;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class VendorCategoryRepositoryTest {

    @Autowired
    private VendorCategoryRepository vendorCategoryRepository;

    private VendorCategory buildCategory(String name) {
        return new VendorCategory(null, name, null);
    }

    @Test
    @DisplayName("save() persists vendor category and assigns ID")
    void save_persistsCategoryWithId() {
        VendorCategory saved = vendorCategoryRepository.save(buildCategory("Catering"));
        assertThat(saved.getCategoryId()).isNotNull();
        assertThat(saved.getCategoryName()).isEqualTo("Catering");
    }

    @Test
    @DisplayName("findById() returns saved category")
    void findById_returnsSavedCategory() {
        VendorCategory saved = vendorCategoryRepository.save(buildCategory("Flowers"));
        Optional<VendorCategory> found = vendorCategoryRepository.findById(saved.getCategoryId());
        assertThat(found).isPresent();
        assertThat(found.get().getCategoryName()).isEqualTo("Flowers");
    }

    @Test
    @DisplayName("findById() returns empty for unknown ID")
    void findById_returnsEmptyForUnknownId() {
        Optional<VendorCategory> found = vendorCategoryRepository.findById(999L);
        assertThat(found).isEmpty();
    }

    @Test
    @DisplayName("findAll() returns all saved categories")
    void findAll_returnsAllSavedCategories() {
        vendorCategoryRepository.save(buildCategory("Music"));
        vendorCategoryRepository.save(buildCategory("Transport"));
        List<VendorCategory> categories = vendorCategoryRepository.findAll();
        assertThat(categories).hasSizeGreaterThanOrEqualTo(2);
    }

    @Test
    @DisplayName("deleteById() removes the category")
    void deleteById_removesCategory() {
        VendorCategory saved = vendorCategoryRepository.save(buildCategory("Invitations"));
        vendorCategoryRepository.deleteById(saved.getCategoryId());
        assertThat(vendorCategoryRepository.findById(saved.getCategoryId())).isEmpty();
    }
}
