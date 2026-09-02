package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponseDto {
    private Long bookingId;
    private Long userId;
    private Long vendorId;
    private String vendorName;
    private String status;
    private LocalDateTime bookedAt;
    private String customerName;
    private String customerEmail;
    private String customerPhone;

    // Retain 6-arg constructor so existing unit tests compile and run unchanged
    public BookingResponseDto(Long bookingId, Long userId, Long vendorId, String vendorName,
                              String status, LocalDateTime bookedAt) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.vendorId = vendorId;
        this.vendorName = vendorName;
        this.status = status;
        this.bookedAt = bookedAt;
    }
}
