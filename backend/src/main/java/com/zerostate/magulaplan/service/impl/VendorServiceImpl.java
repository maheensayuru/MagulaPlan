package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.VendorRequestDto;
import com.zerostate.magulaplan.dto.VendorResponseDto;
import com.zerostate.magulaplan.entity.Vendor;
import com.zerostate.magulaplan.entity.VendorCategory;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.VendorCategoryRepository;
import com.zerostate.magulaplan.repo.VendorRepository;
import com.zerostate.magulaplan.service.VendorService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendorServiceImpl implements VendorService {

    private final VendorRepository vendorRepository;
    private final VendorCategoryRepository vendorCategoryRepository;

    @Autowired
    public VendorServiceImpl(VendorRepository vendorRepository, VendorCategoryRepository vendorCategoryRepository) {
        this.vendorRepository = vendorRepository;
        this.vendorCategoryRepository = vendorCategoryRepository;
    }

    @Override
    public VendorResponseDto saveVendor(VendorRequestDto requestDto) {
        VendorCategory category = vendorCategoryRepository.findById(requestDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Vendor Category not found with id: " + requestDto.getCategoryId()));

        Vendor vendor = Vendor.builder()
                .category(category)
                .businessName(requestDto.getBusinessName())
                .description(requestDto.getDescription())
                .districtLocation(requestDto.getDistrictLocation())
                .contactPhone(requestDto.getContactPhone())
                .contactEmail(requestDto.getContactEmail())
                .startingPrice(requestDto.getStartingPrice())
                .imageUrl(requestDto.getImageUrl())
                .rating(requestDto.getRating())
                .reviewCount(requestDto.getReviewCount())
                .verified(requestDto.getVerified())
                .featured(requestDto.getFeatured())
                .build();

        Vendor savedVendor = vendorRepository.save(vendor);
        return mapToResponseDto(savedVendor);
    }

    @Override
    public List<VendorResponseDto> getAllVendors() {
        return vendorRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<VendorResponseDto> getVendorsByCategoryId(Long categoryId) {
        return vendorRepository.findByCategory_CategoryId(categoryId).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public VendorResponseDto getVendorById(Long vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + vendorId));
        return mapToResponseDto(vendor);
    }

    @Override
    public VendorResponseDto updateVendor(Long vendorId, VendorRequestDto requestDto) {
        Vendor existingVendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + vendorId));

        VendorCategory category = vendorCategoryRepository.findById(requestDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Vendor Category not found with id: " + requestDto.getCategoryId()));

        existingVendor.setCategory(category);
        existingVendor.setBusinessName(requestDto.getBusinessName());
        existingVendor.setDescription(requestDto.getDescription());
        existingVendor.setDistrictLocation(requestDto.getDistrictLocation());
        existingVendor.setContactPhone(requestDto.getContactPhone());
        existingVendor.setContactEmail(requestDto.getContactEmail());
        existingVendor.setStartingPrice(requestDto.getStartingPrice());
        existingVendor.setImageUrl(requestDto.getImageUrl());
        existingVendor.setRating(requestDto.getRating());
        existingVendor.setReviewCount(requestDto.getReviewCount());
        existingVendor.setVerified(requestDto.getVerified());
        existingVendor.setFeatured(requestDto.getFeatured());

        Vendor updatedVendor = vendorRepository.save(existingVendor);
        return mapToResponseDto(updatedVendor);
    }

    @Override
    public void deleteVendor(Long vendorId) {
        vendorRepository.deleteById(vendorId);
    }

    @Override
    public Page<VendorResponseDto> searchVendors(String search, String district, BigDecimal minPrice,
                                                 BigDecimal maxPrice, int page, int size) {
        Specification<Vendor> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (search != null && !search.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("businessName")), "%" + search.toLowerCase() + "%"));
            }
            if (district != null && !district.isBlank()) {
                predicates.add(cb.equal(cb.lower(root.get("districtLocation")), district.toLowerCase()));
            }
            if (minPrice != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("startingPrice"), minPrice));
            }
            if (maxPrice != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("startingPrice"), maxPrice));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<Vendor> vendorPage = vendorRepository.findAll(spec,
                PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "businessName")));
        return vendorPage.map(this::mapToResponseDto);
    }

    private VendorResponseDto mapToResponseDto(Vendor vendor) {
        VendorResponseDto responseDto = new VendorResponseDto();
        responseDto.setVendorId(vendor.getVendorId());
        if (vendor.getCategory() != null) {
            responseDto.setCategoryId(vendor.getCategory().getCategoryId());
            responseDto.setCategoryName(vendor.getCategory().getCategoryName());
        }
        responseDto.setBusinessName(vendor.getBusinessName());
        responseDto.setDescription(vendor.getDescription());
        responseDto.setDistrictLocation(vendor.getDistrictLocation());
        responseDto.setContactPhone(vendor.getContactPhone());
        responseDto.setContactEmail(vendor.getContactEmail());
        responseDto.setStartingPrice(vendor.getStartingPrice());
        responseDto.setImageUrl(vendor.getImageUrl());
        responseDto.setRating(vendor.getRating());
        responseDto.setReviewCount(vendor.getReviewCount());
        responseDto.setVerified(vendor.getVerified());
        responseDto.setFeatured(vendor.getFeatured());
        return responseDto;
    }
}
