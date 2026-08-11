package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.VendorCategoryRequestDto;
import com.zerostate.magulaplan.dto.VendorCategoryResponseDto;
import com.zerostate.magulaplan.entity.VendorCategory;
import com.zerostate.magulaplan.repo.VendorCategoryRepository;
import com.zerostate.magulaplan.service.VendorCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendorCategoryServiceImpl implements VendorCategoryService {

    private final VendorCategoryRepository vendorCategoryRepository;

    @Autowired
    public VendorCategoryServiceImpl(VendorCategoryRepository vendorCategoryRepository) {
        this.vendorCategoryRepository = vendorCategoryRepository;
    }

    @Override
    public VendorCategoryResponseDto saveVendorCategory(VendorCategoryRequestDto requestDto) {
        VendorCategory vendorCategory = new VendorCategory();
        vendorCategory.setCategoryName(requestDto.getCategoryName());

        VendorCategory savedCategory = vendorCategoryRepository.save(vendorCategory);
        return mapToResponseDto(savedCategory);
    }

    @Override
    public List<VendorCategoryResponseDto> getAllVendorCategories() {
        return vendorCategoryRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public VendorCategoryResponseDto getVendorCategoryById(Long categoryId) {
        VendorCategory category = vendorCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Vendor Category not found with id: " + categoryId));
        return mapToResponseDto(category);
    }

    @Override
    public VendorCategoryResponseDto updateVendorCategory(Long categoryId, VendorCategoryRequestDto requestDto) {
        VendorCategory category = vendorCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Vendor Category not found with id: " + categoryId));

        category.setCategoryName(requestDto.getCategoryName());
        VendorCategory updatedCategory = vendorCategoryRepository.save(category);
        return mapToResponseDto(updatedCategory);
    }

    @Override
    public void deleteVendorCategory(Long categoryId) {
        vendorCategoryRepository.deleteById(categoryId);
    }

    private VendorCategoryResponseDto mapToResponseDto(VendorCategory category) {
        VendorCategoryResponseDto responseDto = new VendorCategoryResponseDto();
        responseDto.setCategoryId(category.getCategoryId());
        responseDto.setCategoryName(category.getCategoryName());
        return responseDto;
    }
}
