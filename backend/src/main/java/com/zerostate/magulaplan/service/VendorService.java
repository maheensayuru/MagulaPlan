package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.VendorRequestDto;
import com.zerostate.magulaplan.dto.VendorResponseDto;

import java.util.List;

public interface VendorService {
    VendorResponseDto saveVendor(VendorRequestDto requestDto);
    List<VendorResponseDto> getAllVendors();
    List<VendorResponseDto> getVendorsByCategoryId(Long categoryId);
    VendorResponseDto getVendorById(Long vendorId);
    VendorResponseDto updateVendor(Long vendorId, VendorRequestDto requestDto);
    void deleteVendor(Long vendorId);
}
