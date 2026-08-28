package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.AdminStatsDto;
import com.zerostate.magulaplan.dto.AdminUserDto;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.BookingRepository;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.repo.VendorRepository;
import com.zerostate.magulaplan.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public AdminServiceImpl(VendorRepository vendorRepository, UserRepository userRepository, BookingRepository bookingRepository) {
        this.vendorRepository = vendorRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public AdminStatsDto getStats() {
        return new AdminStatsDto(
                vendorRepository.count(),
                userRepository.count(),
                vendorRepository.countByStatus("PENDING"),
                bookingRepository.count());
    }

    @Override
    public List<AdminUserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToAdminUser).collect(Collectors.toList());
    }

    @Override
    public AdminUserDto suspendUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found " + userId));
        user.setIsActive(false);
        return mapToAdminUser(userRepository.save(user));
    }

    @Override
    public AdminUserDto reinstateUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found " + userId));
        user.setIsActive(true);
        return mapToAdminUser(userRepository.save(user));
    }

    private AdminUserDto mapToAdminUser(User user) {
        String status = Boolean.FALSE.equals(user.getIsActive()) ? "SUSPENDED" : "ACTIVE";
        return new AdminUserDto(user.getUserId(), user.getFullName(), user.getEmail(), status);
    }
}
