package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.VendorRequestDto;
import com.zerostate.magulaplan.dto.VendorResponseDto;
import com.zerostate.magulaplan.entity.Vendor;
import com.zerostate.magulaplan.entity.VendorCategory;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.VendorCategoryRepository;
import com.zerostate.magulaplan.repo.VendorRepository;
import com.zerostate.magulaplan.service.impl.VendorServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VendorServiceImplTest {

    @Mock
    private VendorRepository vendorRepository;

    @Mock
    private VendorCategoryRepository vendorCategoryRepository;

    @InjectMocks
    private VendorServiceImpl vendorService;

    private VendorCategory buildCategory() {
        return new VendorCategory(1L, "Photography", null);
    }

    private Vendor buildVendor(Long id) {
        return Vendor.builder()
                .vendorId(id)
                .category(buildCategory())
                .businessName("Sunset Studios")
                .description("Wedding photography")
                .districtLocation("Colombo")
                .contactPhone("0711111111")
                .contactEmail("studio@test.com")
                .startingPrice(new BigDecimal("25000.00"))
                .imageUrl("https://cdn.example.com/sunset.jpg")
                .rating(new BigDecimal("4.5"))
                .reviewCount(120)
                .verified(true)
                .featured(true)
                .build();
    }

    private VendorRequestDto buildRequest() {
        return new VendorRequestDto(1L, "Sunset Studios", "Wedding photography",
                "Colombo", "0711111111", "studio@test.com", new BigDecimal("25000.00"),
                "https://cdn.example.com/sunset.jpg", new BigDecimal("4.5"), 120, true, true);
    }

    @Test
    @DisplayName("saveVendor() saves and returns DTO")
    void saveVendor_savesAndReturnsDto() {
        VendorCategory category = buildCategory();
        Vendor vendor = buildVendor(1L);
        when(vendorCategoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(vendorRepository.save(any(Vendor.class))).thenReturn(vendor);

        VendorResponseDto result = vendorService.saveVendor(buildRequest());

        assertThat(result.getVendorId()).isEqualTo(1L);
        assertThat(result.getBusinessName()).isEqualTo("Sunset Studios");
        assertThat(result.getImageUrl()).isEqualTo("https://cdn.example.com/sunset.jpg");
        assertThat(result.getRating()).isEqualByComparingTo("4.5");
        assertThat(result.getReviewCount()).isEqualTo(120);
        assertThat(result.getVerified()).isTrue();
        assertThat(result.getFeatured()).isTrue();
        verify(vendorRepository).save(any(Vendor.class));
    }

    @Test
    @DisplayName("saveVendor() throws ResourceNotFoundException when category not found")
    void saveVendor_throwsResourceNotFoundException_whenCategoryNotFound() {
        when(vendorCategoryRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> vendorService.saveVendor(buildRequest()))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("getAllVendors() returns list of all vendors")
    void getAllVendors_returnsAllVendors() {
        when(vendorRepository.findAll()).thenReturn(List.of(buildVendor(1L), buildVendor(2L)));

        List<VendorResponseDto> result = vendorService.getAllVendors();

        assertThat(result).hasSize(2);
    }

    @Test
    @DisplayName("getVendorsByCategoryId() returns vendors for matching category")
    void getVendorsByCategoryId_returnsVendorsForCategory() {
        when(vendorRepository.findByCategory_CategoryId(1L))
                .thenReturn(List.of(buildVendor(1L), buildVendor(2L)));

        List<VendorResponseDto> result = vendorService.getVendorsByCategoryId(1L);

        assertThat(result).hasSize(2);
        assertThat(result).allMatch(v -> v.getCategoryId().equals(1L));
    }

    @Test
    @DisplayName("getVendorsByCategoryId() returns empty list for unknown category")
    void getVendorsByCategoryId_returnsEmptyForUnknownCategory() {
        when(vendorRepository.findByCategory_CategoryId(99L)).thenReturn(List.of());

        List<VendorResponseDto> result = vendorService.getVendorsByCategoryId(99L);

        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("getVendorById() returns DTO when found")
    void getVendorById_returnsDtoWhenFound() {
        when(vendorRepository.findById(1L)).thenReturn(Optional.of(buildVendor(1L)));

        VendorResponseDto result = vendorService.getVendorById(1L);

        assertThat(result.getVendorId()).isEqualTo(1L);
    }

    @Test
    @DisplayName("getVendorById() throws ResourceNotFoundException when not found")
    void getVendorById_throwsResourceNotFoundException_whenNotFound() {
        when(vendorRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> vendorService.getVendorById(99L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("updateVendor() updates and returns DTO")
    void updateVendor_updatesAndReturnsDto() {
        VendorCategory category = buildCategory();
        Vendor existing = buildVendor(1L);
        Vendor updated = buildVendor(1L);
        when(vendorRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(vendorCategoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(vendorRepository.save(any(Vendor.class))).thenReturn(updated);

        VendorResponseDto result = vendorService.updateVendor(1L, buildRequest());

        assertThat(result.getVendorId()).isEqualTo(1L);
        verify(vendorRepository).save(existing);
    }

    @Test
    @DisplayName("updateVendor() throws ResourceNotFoundException when vendor not found")
    void updateVendor_throwsResourceNotFoundException_whenVendorNotFound() {
        when(vendorRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> vendorService.updateVendor(99L, buildRequest()))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("deleteVendor() calls deleteById on repository")
    void deleteVendor_callsDeleteById() {
        vendorService.deleteVendor(1L);
        verify(vendorRepository).deleteById(1L);
    }


    @Test
    @DisplayName("searchVendors() returns paged results via repository")
    void searchVendors_returnsPagedResults() {
        Vendor vendor = buildVendor(1L);
        Page<Vendor> page = new PageImpl<>(List.of(vendor));
        when(vendorRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(page);

        Page<VendorResponseDto> result = vendorService.searchVendors("Sunset", "Colombo", null, null, 0, 10);

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getBusinessName()).isEqualTo("Sunset Studios");
    }
}
