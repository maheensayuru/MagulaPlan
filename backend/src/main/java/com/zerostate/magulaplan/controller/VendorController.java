package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.VendorRequestDto;
import com.zerostate.magulaplan.dto.VendorResponseDto;
import com.zerostate.magulaplan.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // 1. Create a new vendor
    @PostMapping
    public ResponseEntity<VendorResponseDto> createVendor(@RequestBody VendorRequestDto requestDto) {
        VendorResponseDto responseDto = vendorService.saveVendor(requestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
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

    // 5. Update an existing vendor
    @PutMapping("/{vendorId}")
    public ResponseEntity<VendorResponseDto> updateVendor(
            @PathVariable Long vendorId,
            @RequestBody VendorRequestDto requestDto) {
        VendorResponseDto responseDto = vendorService.updateVendor(vendorId, requestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 6. Delete a vendor by ID
    @DeleteMapping("/{vendorId}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long vendorId) {
        vendorService.deleteVendor(vendorId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
