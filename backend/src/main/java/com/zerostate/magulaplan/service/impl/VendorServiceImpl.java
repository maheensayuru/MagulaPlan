package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.VendorRequestDto;
import com.zerostate.magulaplan.dto.VendorResponseDto;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.entity.Vendor;
import com.zerostate.magulaplan.entity.VendorCategory;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.repo.VendorCategoryRepository;
import com.zerostate.magulaplan.repo.VendorRepository;
import com.zerostate.magulaplan.service.VendorService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VendorServiceImpl implements VendorService {

    private final VendorRepository vendorRepository;
    private final VendorCategoryRepository vendorCategoryRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired(required = false)
    private com.zerostate.magulaplan.repo.BookingRepository bookingRepository;
    @Autowired
    public VendorServiceImpl(VendorRepository vendorRepository,
                             VendorCategoryRepository vendorCategoryRepository,
                             @Autowired(required = false) UserRepository userRepository,
                             @Autowired(required = false) PasswordEncoder passwordEncoder) {
        this.vendorRepository = vendorRepository;
        this.vendorCategoryRepository = vendorCategoryRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public VendorServiceImpl(VendorRepository vendorRepository, VendorCategoryRepository vendorCategoryRepository) {
        this(vendorRepository, vendorCategoryRepository, null, null);
    }

    @Override
    public VendorResponseDto saveVendor(VendorRequestDto requestDto) {
        return saveVendor(requestDto, null);
    }

    @Override
    public VendorResponseDto saveVendor(VendorRequestDto requestDto, Long authenticatedUserId) {
        VendorCategory category = vendorCategoryRepository.findById(requestDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Vendor Category not found with id: " + requestDto.getCategoryId()));

        User user = null;
        String sessionToken = null;

        if (authenticatedUserId != null && userRepository != null) {
            user = userRepository.findById(authenticatedUserId).orElse(null);
        } else if (userRepository != null && requestDto.getContactEmail() != null && !requestDto.getContactEmail().isBlank()) {
            String email = requestDto.getContactEmail().trim();
            Optional<User> existing = userRepository.findByEmail(email);
            if (existing.isPresent()) {
                user = existing.get();
            } else if (requestDto.getPassword() != null && !requestDto.getPassword().isBlank()) {
                sessionToken = UUID.randomUUID().toString();
                String encodedPw = (passwordEncoder != null)
                        ? passwordEncoder.encode(requestDto.getPassword())
                        : requestDto.getPassword();
                User newUser = User.builder()
                        .email(email)
                        .fullName(requestDto.getBusinessName())
                        .passwordHash(encodedPw)
                        .phoneNumber(requestDto.getContactPhone())
                        .role("VENDOR")
                        .isActive(true)
                        .createdAt(LocalDateTime.now())
                        .sessionToken(sessionToken)
                        .build();
                user = userRepository.save(newUser);
            }
        }

        String tier = (requestDto.getSubscriptionTier() != null && !requestDto.getSubscriptionTier().isBlank())
                ? requestDto.getSubscriptionTier().toUpperCase()
                : "FREE";
        if (!tier.equals("PRO") && !tier.equals("FEATURED")) {
            tier = "FREE";
        }

        boolean isFeatured = tier.equals("FEATURED") || Boolean.TRUE.equals(requestDto.getFeatured());
        boolean isVerified = tier.equals("PRO") || tier.equals("FEATURED") || Boolean.TRUE.equals(requestDto.getVerified());
        String paymentStatus = tier.equals("FREE") ? "PAID"
                : (requestDto.getPaymentStatus() != null && !requestDto.getPaymentStatus().isBlank()
                ? requestDto.getPaymentStatus() : "PAID");

        Vendor vendor = Vendor.builder()
                .category(category)
                .user(user)
                .subscriptionTier(tier)
                .paymentStatus(paymentStatus)
                .businessName(requestDto.getBusinessName())
                .description(requestDto.getDescription())
                .districtLocation(requestDto.getDistrictLocation())
                .contactPhone(requestDto.getContactPhone())
                .contactEmail(requestDto.getContactEmail())
                .startingPrice(requestDto.getStartingPrice())
                .imageUrl(requestDto.getImageUrl())
                .rating(requestDto.getRating())
                .reviewCount(requestDto.getReviewCount())
                .verified(isVerified)
                .featured(isFeatured)
                .status("PENDING")
                .build();

        Vendor savedVendor = vendorRepository.save(vendor);
        VendorResponseDto responseDto = mapToResponseDto(savedVendor);
        if (sessionToken != null) {
            responseDto.setSessionToken(sessionToken);
        }
        return responseDto;
    }

    @Override
    public List<VendorResponseDto> getAllVendors() {
        return vendorRepository.findByStatus("APPROVED").stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<VendorResponseDto> getVendorsByCategoryId(Long categoryId) {
        return vendorRepository.findByCategory_CategoryIdAndStatus(categoryId, "APPROVED").stream()
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
    public VendorResponseDto getVendorByUserId(Long userId) {
        Vendor vendor = vendorRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No vendor listing found for user id: " + userId));
        return mapToResponseDto(vendor);
    }

    @Override
    public VendorResponseDto updateVendor(Long vendorId, VendorRequestDto requestDto) {
        return updateVendor(vendorId, requestDto, null, true);
    }

    @Override
    public VendorResponseDto updateVendor(Long vendorId, VendorRequestDto requestDto, Long authenticatedUserId, boolean isAdmin) {
        Vendor existingVendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + vendorId));

        // IDOR ownership protection: non-admin callers must own the vendor listing
        if (!isAdmin) {
            if (existingVendor.getUser() == null || !existingVendor.getUser().getUserId().equals(authenticatedUserId)) {
                throw new AccessDeniedException("You are not authorized to update this vendor listing");
            }
        }

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
        if (requestDto.getRating() != null) existingVendor.setRating(requestDto.getRating());
        if (requestDto.getReviewCount() != null) existingVendor.setReviewCount(requestDto.getReviewCount());

        if (isAdmin) {
            if (requestDto.getVerified() != null) existingVendor.setVerified(requestDto.getVerified());
            if (requestDto.getFeatured() != null) existingVendor.setFeatured(requestDto.getFeatured());
        }

        if (requestDto.getSubscriptionTier() != null && !requestDto.getSubscriptionTier().isBlank()) {
            String tier = requestDto.getSubscriptionTier().toUpperCase();
            existingVendor.setSubscriptionTier(tier);
            if (tier.equals("FEATURED")) existingVendor.setFeatured(true);
            if (tier.equals("PRO") || tier.equals("FEATURED")) existingVendor.setVerified(true);
        }

        if ("PENDING".equalsIgnoreCase(requestDto.getStatus())) {
            existingVendor.setStatus("PENDING");
        } else if (isAdmin && requestDto.getStatus() != null && !requestDto.getStatus().isBlank()) {
            existingVendor.setStatus(requestDto.getStatus());
        }

        Vendor updatedVendor = vendorRepository.save(existingVendor);
        return mapToResponseDto(updatedVendor);
    }

    @Override
    public void deleteVendor(Long vendorId) {
        vendorRepository.deleteById(vendorId);
    }

    @Override
    public void deleteVendor(Long vendorId, Long authenticatedUserId, boolean isAdmin) {
        Vendor existingVendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + vendorId));
        if (!isAdmin) {
            if (existingVendor.getUser() == null || !existingVendor.getUser().getUserId().equals(authenticatedUserId)) {
                throw new AccessDeniedException("You are not authorized to delete this vendor listing");
            }
        }
        if (bookingRepository != null) {
            List<com.zerostate.magulaplan.entity.Booking> bookings = bookingRepository.findByVendor_VendorId(vendorId);
            if (bookings != null && !bookings.isEmpty()) {
                bookingRepository.deleteAll(bookings);
            }
        }
        vendorRepository.delete(existingVendor);
    }

    @Override
    public List<VendorResponseDto> getPendingVendors() {
        return vendorRepository.findByStatus("PENDING").stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public VendorResponseDto approveVendor(Long vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + vendorId));
        vendor.setStatus("APPROVED");
        vendor.setVerified(true);
        return mapToResponseDto(vendorRepository.save(vendor));
    }

    @Override
    public VendorResponseDto rejectVendor(Long vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + vendorId));
        vendor.setStatus("REJECTED");
        return mapToResponseDto(vendorRepository.save(vendor));
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
            predicates.add(cb.equal(root.get("status"), "APPROVED"));
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
        responseDto.setStatus(vendor.getStatus());
        responseDto.setSubscriptionTier(vendor.getSubscriptionTier() != null ? vendor.getSubscriptionTier() : "FREE");
        responseDto.setPaymentStatus(vendor.getPaymentStatus() != null ? vendor.getPaymentStatus() : "PAID");
        if (vendor.getUser() != null) {
            responseDto.setUserId(vendor.getUser().getUserId());
        }
        return responseDto;
    }
}
