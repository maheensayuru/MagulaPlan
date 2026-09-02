package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.BookingCheckoutRequestDto;
import com.zerostate.magulaplan.dto.BookingResponseDto;
import com.zerostate.magulaplan.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // 1. Finalize the cart into bookings (checkout)
    @PostMapping("/checkout")
    public ResponseEntity<List<BookingResponseDto>> checkout(@RequestBody BookingCheckoutRequestDto requestDto) {
        List<BookingResponseDto> bookings = bookingService.checkout(requestDto);
        return new ResponseEntity<>(bookings, HttpStatus.CREATED);
    }

    // 2. List bookings for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponseDto>> getBookingsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }

    // 3. List bookings/leads for a vendor
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<BookingResponseDto>> getBookingsByVendorId(@PathVariable Long vendorId) {
        return ResponseEntity.ok(bookingService.getBookingsByVendorId(vendorId));
    }
}
