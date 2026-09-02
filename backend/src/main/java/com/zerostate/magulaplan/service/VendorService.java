package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.VendorRequestDto;
import com.zerostate.magulaplan.dto.VendorResponseDto;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;

public interface VendorService {
    VendorResponseDto saveVendor(VendorRequestDto requestDto);
    VendorResponseDto saveVendor(VendorRequestDto requestDto, Long authenticatedUserId);
    List<VendorResponseDto> getAllVendors();
    List<VendorResponseDto> getVendorsByCategoryId(Long categoryId);
    VendorResponseDto getVendorById(Long vendorId);
    VendorResponseDto getVendorByUserId(Long userId);
    VendorResponseDto updateVendor(Long vendorId, VendorRequestDto requestDto);
    VendorResponseDto updateVendor(Long vendorId, VendorRequestDto requestDto, Long authenticatedUserId, boolean isAdmin);
    void deleteVendor(Long vendorId);
    void deleteVendor(Long vendorId, Long authenticatedUserId, boolean isAdmin);
    Page<VendorResponseDto> searchVendors(String search, String district, BigDecimal minPrice, BigDecimal maxPrice, int page, int size);
    List<VendorResponseDto> getPendingVendors();

    VendorResponseDto approveVendor(Long vendorId);

    VendorResponseDto rejectVendor(Long vendorId);
}
