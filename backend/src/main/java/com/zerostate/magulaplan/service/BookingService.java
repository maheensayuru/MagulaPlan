package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.BookingCheckoutRequestDto;
import com.zerostate.magulaplan.dto.BookingResponseDto;

import java.util.List;

public interface BookingService {
    List<BookingResponseDto> checkout(BookingCheckoutRequestDto requestDto);
    List<BookingResponseDto> getBookingsByUserId(Long userId);
}
