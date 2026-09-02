package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.VendorRequestDto;
import com.zerostate.magulaplan.dto.VendorResponseDto;
import com.zerostate.magulaplan.service.VendorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/vendors")
public class VendorController {

    private final VendorService vendorService;

    @Autowired
    public VendorController(VendorService vendorService) {
        this.vendorService = vendorService;
    }

    // 1. Create a new vendor (self-registration or authenticated)
    @PostMapping
    public ResponseEntity<VendorResponseDto> createVendor(
            @Valid @RequestBody VendorRequestDto requestDto,
            @AuthenticationPrincipal Long authenticatedUserId) {
        VendorResponseDto responseDto = (authenticatedUserId != null)
                ? vendorService.saveVendor(requestDto, authenticatedUserId)
                : vendorService.saveVendor(requestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    // 1.1 Retrieve the authenticated vendor's own business profile
    @GetMapping("/me")
    public ResponseEntity<VendorResponseDto> getMyVendor(@AuthenticationPrincipal Long authenticatedUserId) {
        if (authenticatedUserId == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        VendorResponseDto responseDto = vendorService.getVendorByUserId(authenticatedUserId);
        return ResponseEntity.ok(responseDto);
    }

    // 2. Retrieve all vendors
    @GetMapping
    public ResponseEntity<List<VendorResponseDto>> getAllVendors() {
        List<VendorResponseDto> vendors = vendorService.getAllVendors();
        return new ResponseEntity<>(vendors, HttpStatus.OK);
    }

    // 2.1 Search / filter / paginate vendors
    @GetMapping("/search")
    public ResponseEntity<Page<VendorResponseDto>> searchVendors(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<VendorResponseDto> vendors = vendorService.searchVendors(search, district, minPrice, maxPrice, page, size);
        return new ResponseEntity<>(vendors, HttpStatus.OK);
    }

    // 3. Retrieve vendors by category ID
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<VendorResponseDto>> getVendorsByCategoryId(@PathVariable Long categoryId) {
        List<VendorResponseDto> vendors = vendorService.getVendorsByCategoryId(categoryId);
        return new ResponseEntity<>(vendors, HttpStatus.OK);
    }

    // 4. Retrieve a specific vendor by ID
    @GetMapping("/{vendorId}")
    public ResponseEntity<VendorResponseDto> getVendorById(@PathVariable Long vendorId) {
        VendorResponseDto responseDto = vendorService.getVendorById(vendorId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 5. Update an existing vendor with IDOR protection
    @PutMapping("/{vendorId}")
    public ResponseEntity<VendorResponseDto> updateVendor(
            @PathVariable Long vendorId,
            @Valid @RequestBody VendorRequestDto requestDto,
            @AuthenticationPrincipal Long authenticatedUserId,
            Authentication authentication) {
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        VendorResponseDto responseDto = (authenticatedUserId != null || isAdmin)
                ? vendorService.updateVendor(vendorId, requestDto, authenticatedUserId, isAdmin)
                : vendorService.updateVendor(vendorId, requestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 6. Delete a vendor by ID with authorization check
    @DeleteMapping("/{vendorId}")
    public ResponseEntity<Void> deleteVendor(
            @PathVariable Long vendorId,
            @AuthenticationPrincipal Long authenticatedUserId,
            Authentication authentication) {
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (authenticatedUserId != null || isAdmin) {
            vendorService.deleteVendor(vendorId, authenticatedUserId, isAdmin);
        } else {
            vendorService.deleteVendor(vendorId);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
