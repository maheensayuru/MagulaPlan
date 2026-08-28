package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.AdminStatsDto;
import com.zerostate.magulaplan.dto.AdminUserDto;
import com.zerostate.magulaplan.dto.VendorResponseDto;
import com.zerostate.magulaplan.service.AdminService;
import com.zerostate.magulaplan.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminService adminService;
    private final VendorService vendorService;

    @Autowired
    public AdminController(AdminService adminService, VendorService vendorService) {
        this.adminService = adminService;
        this.vendorService = vendorService;
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDto> getStats() {
        return ResponseEntity.ok(adminService.getStats());
    }

    @GetMapping("/vendors/pending")
    public ResponseEntity<List<VendorResponseDto>> getPendingVendors() {
        return ResponseEntity.ok(vendorService.getPendingVendors());
    }

    @PutMapping("/vendors/{vendorId}/approve")
    public ResponseEntity<VendorResponseDto> approveVendor(@PathVariable Long vendorId) {
        return ResponseEntity.ok(vendorService.approveVendor(vendorId));
    }

    @PutMapping("/vendors/{vendorId}/reject")
    public ResponseEntity<VendorResponseDto> rejectVendor(@PathVariable Long vendorId) {
        return ResponseEntity.ok(vendorService.rejectVendor(vendorId));
    }

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserDto>> getUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/users/{userId}/suspend")
    public ResponseEntity<AdminUserDto> suspendUser(@PathVariable Long userId) {
        return ResponseEntity.ok(adminService.suspendUser(userId));
    }

    @PutMapping("/users/{userId}/reinstate")
    public ResponseEntity<AdminUserDto> reinstateUser(@PathVariable Long userId) {
        return ResponseEntity.ok(adminService.reinstateUser(userId));
    }
}
