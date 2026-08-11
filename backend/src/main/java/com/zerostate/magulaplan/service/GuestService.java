package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.GuestRequestDto;
import com.zerostate.magulaplan.dto.GuestResponseDto;
import com.zerostate.magulaplan.dto.ShareInvitationResponse;

import java.util.List;
import java.util.UUID;

public interface GuestService {
    GuestResponseDto saveGuest(GuestRequestDto guestRequestDto);
    List<GuestResponseDto> getAllGuests();
    GuestResponseDto getGuestById(UUID guestId);
    GuestResponseDto updateGuest(UUID guestId, GuestRequestDto guestRequestDto);
    void deleteGuest(UUID guestId);
    ShareInvitationResponse getShareInvitation(UUID guestId);
}
