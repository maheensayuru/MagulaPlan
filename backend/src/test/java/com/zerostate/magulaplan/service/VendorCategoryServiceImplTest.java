package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.VendorCategoryRequestDto;
import com.zerostate.magulaplan.dto.VendorCategoryResponseDto;
import com.zerostate.magulaplan.entity.VendorCategory;
import com.zerostate.magulaplan.repo.VendorCategoryRepository;
import com.zerostate.magulaplan.service.impl.VendorCategoryServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VendorCategoryServiceImplTest {

    @Mock
    private VendorCategoryRepository vendorCategoryRepository;

    @InjectMocks
    private VendorCategoryServiceImpl vendorCategoryService;

    private VendorCategory buildCategory(Long id) {
        return new VendorCategory(id, "Photography", null);
    }

    private VendorCategoryRequestDto buildRequest() {
        return new VendorCategoryRequestDto("Photography");
    }

    @Test
    @DisplayName("saveVendorCategory() saves and returns DTO")
    void saveVendorCategory_savesAndReturnsDto() {
        VendorCategory saved = buildCategory(1L);
        when(vendorCategoryRepository.save(any(VendorCategory.class))).thenReturn(saved);

        VendorCategoryResponseDto result = vendorCategoryService.saveVendorCategory(buildRequest());

        assertThat(result.getCategoryId()).isEqualTo(1L);
        assertThat(result.getCategoryName()).isEqualTo("Photography");
        verify(vendorCategoryRepository).save(any(VendorCategory.class));
    }

    @Test
    @DisplayName("getAllVendorCategories() returns list of all categories")
    void getAllVendorCategories_returnsAllCategories() {
        when(vendorCategoryRepository.findAll())
                .thenReturn(List.of(buildCategory(1L), buildCategory(2L)));

        List<VendorCategoryResponseDto> result = vendorCategoryService.getAllVendorCategories();

        assertThat(result).hasSize(2);
    }

    // NOTE: getVendorCategoryById throws plain RuntimeException (NOT ResourceNotFoundException)
    // when the category is not found — a known inconsistency with other services.
    // TODO: fix for consistency — should throw ResourceNotFoundException like other services.
    @Test
    @DisplayName("getVendorCategoryById() returns DTO when found")
    void getVendorCategoryById_returnsDtoWhenFound() {
        when(vendorCategoryRepository.findById(1L)).thenReturn(Optional.of(buildCategory(1L)));

        VendorCategoryResponseDto result = vendorCategoryService.getVendorCategoryById(1L);

        assertThat(result.getCategoryId()).isEqualTo(1L);
    }

    // NOTE: This throws plain RuntimeException (not ResourceNotFoundException) — documents
    // current inconsistent behavior. HTTP response is 500, not 404. Worth fixing for consistency.
    @Test
    @DisplayName("getVendorCategoryById() throws plain RuntimeException (not ResourceNotFoundException) when not found — known inconsistency")
    void getVendorCategoryById_throwsRuntimeException_whenNotFound() {
        when(vendorCategoryRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> vendorCategoryService.getVendorCategoryById(99L))
                .isInstanceOf(RuntimeException.class);
    }

    // NOTE: updateVendorCategory throws plain RuntimeException (NOT ResourceNotFoundException)
    // when the category is not found — same inconsistency as getVendorCategoryById.
    // TODO: fix for consistency — should throw ResourceNotFoundException.
    @Test
    @DisplayName("updateVendorCategory() updates and returns DTO when found")
    void updateVendorCategory_updatesAndReturnsDto() {
        VendorCategory existing = buildCategory(1L);
        VendorCategory updated = new VendorCategory(1L, "Videography", null);
        when(vendorCategoryRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(vendorCategoryRepository.save(any(VendorCategory.class))).thenReturn(updated);

        VendorCategoryResponseDto result = vendorCategoryService.updateVendorCategory(1L, buildRequest());

        assertThat(result.getCategoryId()).isEqualTo(1L);
        verify(vendorCategoryRepository).save(existing);
    }

    // NOTE: Throws plain RuntimeException (not ResourceNotFoundException) — current inconsistency.
    // HTTP response will be 500, not 404. Worth fixing for API consistency.
    @Test
    @DisplayName("updateVendorCategory() throws plain RuntimeException (not ResourceNotFoundException) when not found — known inconsistency")
    void updateVendorCategory_throwsRuntimeException_whenNotFound() {
        when(vendorCategoryRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> vendorCategoryService.updateVendorCategory(99L, buildRequest()))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    @DisplayName("deleteVendorCategory() calls deleteById on repository")
    void deleteVendorCategory_callsDeleteById() {
        vendorCategoryService.deleteVendorCategory(1L);
        verify(vendorCategoryRepository).deleteById(1L);
    }
}
