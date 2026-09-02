package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.BookingCheckoutRequestDto;
import com.zerostate.magulaplan.dto.BookingResponseDto;
import com.zerostate.magulaplan.entity.Booking;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.entity.Vendor;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.BookingRepository;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.repo.VendorRepository;
import com.zerostate.magulaplan.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository, UserRepository userRepository,
                              VendorRepository vendorRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.vendorRepository = vendorRepository;
    }

    @Override
    public List<BookingResponseDto> checkout(BookingCheckoutRequestDto requestDto) {
        Long targetUserId = requestDto.getUserId();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Long authId) {
            boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
            if (!isAdmin || targetUserId == null) {
                targetUserId = authId;
            }
        }

        User user = userRepository.findById(targetUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + requestDto.getUserId()));

        return requestDto.getVendorIds().stream()
                .map(vendorId -> {
                    Vendor vendor = vendorRepository.findById(vendorId)
                            .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + vendorId));
                    Booking booking = Booking.builder()
                            .user(user)
                            .vendor(vendor)
                            .status("PENDING")
                            .bookedAt(LocalDateTime.now())
                            .build();
                    return mapToResponseDto(bookingRepository.save(booking));
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponseDto> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUser_UserId(userId).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponseDto> getBookingsByVendorId(Long vendorId) {
        return bookingRepository.findByVendor_VendorId(vendorId).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    private BookingResponseDto mapToResponseDto(Booking booking) {
        BookingResponseDto dto = new BookingResponseDto(
                booking.getBookingId(),
                booking.getUser().getUserId(),
                booking.getVendor().getVendorId(),
                booking.getVendor().getBusinessName(),
                booking.getStatus(),
                booking.getBookedAt());
        if (booking.getUser() != null) {
            dto.setCustomerName(booking.getUser().getFullName());
            dto.setCustomerEmail(booking.getUser().getEmail());
            dto.setCustomerPhone(booking.getUser().getPhoneNumber());
        }
        return dto;
    }
}
