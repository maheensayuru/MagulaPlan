package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.VendorCategoryRequestDto;
import com.zerostate.magulaplan.dto.VendorCategoryResponseDto;
import com.zerostate.magulaplan.service.VendorCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vendor-categories")
public class VendorCategoryController {

    private final VendorCategoryService vendorCategoryService;

    @Autowired
    public VendorCategoryController(VendorCategoryService vendorCategoryService) {
        this.vendorCategoryService = vendorCategoryService;
    }

    // 1. Create a new vendor category
    @PostMapping
    public ResponseEntity<VendorCategoryResponseDto> createVendorCategory(@RequestBody VendorCategoryRequestDto requestDto) {
        VendorCategoryResponseDto responseDto = vendorCategoryService.saveVendorCategory(requestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    // 2. Retrieve all vendor categories
    @GetMapping
    public ResponseEntity<List<VendorCategoryResponseDto>> getAllVendorCategories() {
        List<VendorCategoryResponseDto> categories = vendorCategoryService.getAllVendorCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    // 3. Retrieve a specific vendor category by ID
    @GetMapping("/{categoryId}")
    public ResponseEntity<VendorCategoryResponseDto> getVendorCategoryById(@PathVariable Long categoryId) {
        VendorCategoryResponseDto responseDto = vendorCategoryService.getVendorCategoryById(categoryId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 4. Update an existing vendor category
    @PutMapping("/{categoryId}")
    public ResponseEntity<VendorCategoryResponseDto> updateVendorCategory(
            @PathVariable Long categoryId,
            @RequestBody VendorCategoryRequestDto requestDto) {
        VendorCategoryResponseDto responseDto = vendorCategoryService.updateVendorCategory(categoryId, requestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 5. Delete a vendor category by ID
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteVendorCategory(@PathVariable Long categoryId) {
        vendorCategoryService.deleteVendorCategory(categoryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
