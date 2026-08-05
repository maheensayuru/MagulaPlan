package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.GuestRequestDto;
import com.zerostate.magulaplan.dto.GuestResponseDto;
import com.zerostate.magulaplan.repo.GuestRepository;
import com.zerostate.magulaplan.service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GuestServiceImpl implements GuestService {

    @Autowired
    private GuestRepository guestRepository;

    @Override
    public GuestResponseDto saveGuest(GuestRequestDto guestRequestDto) {
        return null;
    }

    @Override
    public List<GuestResponseDto> getAllGuests() {
        return List.of();
    }

    @Override
    public GuestResponseDto getGuestById(UUID guestId) {
        return null;
    }

    @Override
    public GuestResponseDto updateGuest(UUID guestId, GuestRequestDto guestRequestDto) {
        return null;
    }

    @Override
    public Void deleteGuest(UUID guestId) {
        return null;
    }
}
