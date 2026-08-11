package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.GuestRequestDto;
import com.zerostate.magulaplan.dto.GuestResponseDto;
import com.zerostate.magulaplan.entity.Guest;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.repo.GuestRepository;
import com.zerostate.magulaplan.service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GuestServiceImpl implements GuestService {

    private GuestRepository guestRepository;

    @Autowired
    public GuestServiceImpl(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    @Override
    public GuestResponseDto saveGuest(GuestRequestDto guestRequestDto) {
        User user = new User();
        user.setUserId(guestRequestDto.getUserId());
        Guest savedGuest = guestRepository.save(
                Guest.builder()
                        .user(user)
                        .guestName(guestRequestDto.getGuestName())
                        .contactNumber(guestRequestDto.getContactNumber())
                        .sideOfFamily(guestRequestDto.getSideOfFamily())
                        .rsvpStatus(guestRequestDto.getRsvpStatus())
                        .whatsappStatus(guestRequestDto.getWhatsappStatus())
                        .plusOnes(guestRequestDto.getPlusOnes())
                        .mealPreference(guestRequestDto.getMealPreference())
                        .build());
        return mapToResponseDto(savedGuest);
    }

    @Override
    public List<GuestResponseDto> getAllGuests() {

        return guestRepository.findAll().stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    @Override
    public GuestResponseDto getGuestById(UUID guestId) {

        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new RuntimeException("Guest Not Found with ID: " + guestId));
        return mapToResponseDto(guest);
    }

    @Override
    public GuestResponseDto updateGuest(UUID guestId, GuestRequestDto guestRequestDto) {
        Guest existingGuest = guestRepository.findById(guestId).orElseThrow(() -> new RuntimeException("Guest Not Found with ID: " + guestId));

        existingGuest.setGuestName(guestRequestDto.getGuestName());
        existingGuest.setContactNumber(guestRequestDto.getContactNumber());
        existingGuest.setSideOfFamily(guestRequestDto.getSideOfFamily());
        existingGuest.setRsvpStatus(guestRequestDto.getRsvpStatus());
        existingGuest.setWhatsappStatus(guestRequestDto.getWhatsappStatus());
        existingGuest.setPlusOnes(guestRequestDto.getPlusOnes());
        existingGuest.setMealPreference(guestRequestDto.getMealPreference());

        Guest updatedGuest = guestRepository.save(existingGuest);
        return mapToResponseDto(updatedGuest);
    }

    @Override
    public void deleteGuest(UUID guestId) {
        guestRepository.deleteById(guestId);
    }

    private GuestResponseDto mapToResponseDto(Guest guest) {
        return new GuestResponseDto(
                guest.getGuestId(),
                guest.getGuestName(),
                guest.getContactNumber(),
                guest.getSideOfFamily(),
                guest.getRsvpStatus(),
                guest.getWhatsappStatus(),
                guest.getPlusOnes(),
                guest.getMealPreference());
    }
}
