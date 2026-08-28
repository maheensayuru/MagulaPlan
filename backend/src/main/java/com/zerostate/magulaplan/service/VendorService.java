package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.VendorRequestDto;
import com.zerostate.magulaplan.dto.VendorResponseDto;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;

public interface VendorService {
    VendorResponseDto saveVendor(VendorRequestDto requestDto);
    List<VendorResponseDto> getAllVendors();
    List<VendorResponseDto> getVendorsByCategoryId(Long categoryId);
    VendorResponseDto getVendorById(Long vendorId);
    VendorResponseDto updateVendor(Long vendorId, VendorRequestDto requestDto);
    void deleteVendor(Long vendorId);
    Page<VendorResponseDto> searchVendors(String search, String district, BigDecimal minPrice, BigDecimal maxPrice, int page, int size);
    List<VendorResponseDto> getPendingVendors();

    VendorResponseDto approveVendor(Long vendorId);

    VendorResponseDto rejectVendor(Long vendorId);
}
