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
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Long authId) {
            boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
            if (!isAdmin || targetUserId == null) {
                targetUserId = authId;
            }
        }

        User user;
        if (targetUserId != null) {
            final Long uid = targetUserId;
            user = userRepository.findById(targetUserId)
                    .orElseGet(() -> userRepository.findAll().stream().findFirst()
                            .orElseThrow(() -> new ResourceNotFoundException("User Not Found with ID: " + uid)));
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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Long authId) {
            boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
            if (!isAdmin) {
                return guestRepository.findByUser_UserId(authId).stream()
                        .map(this::mapToResponseDto)
                        .collect(Collectors.toList());
            }
        }
        return guestRepository.findAll().stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    @Override
    public GuestResponseDto getGuestById(UUID guestId) {
        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest Not Found with ID: " + guestId));
        checkGuestOwnership(guest);
        return mapToResponseDto(guest);
    }

    @Override
    public GuestResponseDto updateGuest(UUID guestId, GuestRequestDto guestRequestDto) {
        Guest existingGuest = guestRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest Not Found with ID: " + guestId));
        checkGuestOwnership(existingGuest);

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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Long) {
            Guest existingGuest = guestRepository.findById(guestId)
                    .orElseThrow(() -> new ResourceNotFoundException("Guest Not Found with ID: " + guestId));
            checkGuestOwnership(existingGuest);
            guestRepository.delete(existingGuest);
        } else {
            guestRepository.deleteById(guestId);
        }
    }

    @Override
    public ShareInvitationResponse getShareInvitation(UUID guestId) {
        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest Not Found with ID: " + guestId));
        String baseUrl = System.getenv("FRONTEND_URL");
        if (baseUrl == null || baseUrl.isBlank()) {
            baseUrl = "https://magulaplan.infinityfreeapp.com";
        }
        if (baseUrl.endsWith("/")) {
            baseUrl = baseUrl.substring(0, baseUrl.length() - 1);
        }
        String rsvpUrl = baseUrl + "/rsvp/" + guest.getGuestId();
        String coupleName = (guest.getUser() != null && guest.getUser().getFullName() != null)
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
        Guest existingGuest = guestRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest Not Found with ID: " + guestId));

        existingGuest.setRsvpStatus(rsvpStatus);
        Guest updatedGuest = guestRepository.save(existingGuest);
        return mapToResponseDto(updatedGuest);
    }

    private void checkGuestOwnership(Guest guest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Long authId) {
            boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
            if (!isAdmin && guest.getUser() != null && !guest.getUser().getUserId().equals(authId)) {
                throw new AccessDeniedException("You are not authorized to access this guest.");
            }
        }
    }

    private GuestResponseDto mapToResponseDto(Guest guest) {
        GuestResponseDto guestResponseDto = new GuestResponseDto();
        guestResponseDto.setGuestId(guest.getGuestId());
        guestResponseDto.setGuestName(guest.getGuestName());
        guestResponseDto.setContactNumber(guest.getContactNumber());
        guestResponseDto.setSideOfFamily(guest.getSideOfFamily());
        guestResponseDto.setRsvpStatus(guest.getRsvpStatus());
        guestResponseDto.setWhatsappStatus(guest.getWhatsappStatus());
        guestResponseDto.setPlusOnes(guest.getPlusOnes());
        guestResponseDto.setMealPreference(guest.getMealPreference());
        if (guest.getUser() != null) {
            guestResponseDto.setUserId(guest.getUser().getUserId());
        }
        return guestResponseDto;
    }
}
