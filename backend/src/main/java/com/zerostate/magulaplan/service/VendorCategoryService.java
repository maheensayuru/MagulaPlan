package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.VendorCategoryRequestDto;
import com.zerostate.magulaplan.dto.VendorCategoryResponseDto;

import java.util.List;

public interface VendorCategoryService {
    VendorCategoryResponseDto saveVendorCategory(VendorCategoryRequestDto requestDto);
    List<VendorCategoryResponseDto> getAllVendorCategories();
    VendorCategoryResponseDto getVendorCategoryById(Long categoryId);
    VendorCategoryResponseDto updateVendorCategory(Long categoryId, VendorCategoryRequestDto requestDto);
    void deleteVendorCategory(Long categoryId);
}
