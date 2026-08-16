package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.GuestRequestDto;
import com.zerostate.magulaplan.dto.GuestResponseDto;
import com.zerostate.magulaplan.dto.ShareInvitationResponse;
import com.zerostate.magulaplan.entity.Guest;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.GuestRepository;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GuestServiceImpl implements GuestService {

    private final GuestRepository guestRepository;
    private final UserRepository userRepository;

    @Autowired
    public GuestServiceImpl(GuestRepository guestRepository, UserRepository userRepository) {
        this.guestRepository = guestRepository;
        this.userRepository = userRepository;
    }

    @Override
    public GuestResponseDto saveGuest(GuestRequestDto guestRequestDto) {

        // 3. UPDATED: Fetch the real User from the database first
        User user = userRepository.findById(guestRequestDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found with ID: " + guestRequestDto.getUserId()));

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
                .orElseThrow(() -> new ResourceNotFoundException("Guest Not Found with ID: " + guestId));
        return mapToResponseDto(guest);
    }

    @Override
    public GuestResponseDto updateGuest(UUID guestId, GuestRequestDto guestRequestDto) {
        Guest existingGuest = guestRepository.findById(guestId).orElseThrow(() -> new ResourceNotFoundException("Guest Not Found with ID: " + guestId));

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

    @Override
    public ShareInvitationResponse getShareInvitation(UUID guestId) {
        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new RuntimeException("Guest Not Found with ID: " + guestId));

        String rsvpUrl = "https://magulaplan.com/rsvp/" + guest.getGuestId();
        String coupleName = guest.getUser().getFullName() != null
                ? guest.getUser().getFullName()
                : "Us";
        String message = "You're invited! " + coupleName
                + " request the pleasure of your company at our wedding. "
                + "Please RSVP here: " + rsvpUrl;

        guest.setWhatsappStatus("SENT");
        guestRepository.save(guest);

        return new ShareInvitationResponse(
                "Wedding Invitation",
                message,
                rsvpUrl,
                guest.getGuestName(),
                guest.getWhatsappStatus());
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
