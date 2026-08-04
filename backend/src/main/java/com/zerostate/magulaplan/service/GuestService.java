package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.GuestRequestDto;
import com.zerostate.magulaplan.dto.GuestResponseDto;
import com.zerostate.magulaplan.entity.Guest;

import java.util.List;
import java.util.UUID;

public interface GuestService {
    GuestResponseDto saveGuest(GuestRequestDto guestRequestDto);
    List<GuestResponseDto> getAllGuests();
    GuestResponseDto getGuestById(UUID guestId);
    GuestResponseDto updateGuest(UUID guestId, GuestRequestDto guestRequestDto);
    Void deleteGuest(UUID guestId);
}
