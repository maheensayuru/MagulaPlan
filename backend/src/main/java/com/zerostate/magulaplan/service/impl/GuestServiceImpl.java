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
        Long targetUserId = guestRequestDto.getUserId();
        if (targetUserId == null) {
            org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getPrincipal() instanceof Long authId) {
                targetUserId = authId;
            }
        }
        
        User user;
        if (targetUserId != null) {
            user = userRepository.findById(targetUserId)
                    .orElseGet(() -> userRepository.findAll().stream().findFirst()
                            .orElseThrow(() -> new ResourceNotFoundException("User Not Found with ID: " + guestRequestDto.getUserId())));
        } else {
            user = userRepository.findAll().stream().findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("No users found in database to associate guest."));
        }

        Guest savedGuest = guestRepository.save(
                Guest.builder()
                        .user(user)
                        .guestName(guestRequestDto.getGuestName())
                        .contactNumber(guestRequestDto.getContactNumber())
                        .sideOfFamily(guestRequestDto.getSideOfFamily() != null ? guestRequestDto.getSideOfFamily() : "Bride")
                        .rsvpStatus(guestRequestDto.getRsvpStatus() != null ? guestRequestDto.getRsvpStatus() : "Pending")
                        .whatsappStatus(guestRequestDto.getWhatsappStatus() != null ? guestRequestDto.getWhatsappStatus() : "Not Sent")
                        .plusOnes(guestRequestDto.getPlusOnes() != null ? guestRequestDto.getPlusOnes() : 0)
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
                .orElseThrow(() -> new ResourceNotFoundException("Guest Not Found with ID: " + guestId));

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

    @Override
    public GuestResponseDto updateRsvpStatus(UUID guestId, String rsvpStatus) {
        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest Not Found with ID: " + guestId));

        guest.setRsvpStatus(rsvpStatus);
        return mapToResponseDto(guestRepository.save(guest));
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
