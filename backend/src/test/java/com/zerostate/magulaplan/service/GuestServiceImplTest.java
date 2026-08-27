package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.GuestRequestDto;
import com.zerostate.magulaplan.dto.GuestResponseDto;
import com.zerostate.magulaplan.dto.ShareInvitationResponse;
import com.zerostate.magulaplan.entity.Guest;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.GuestRepository;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.service.impl.GuestServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GuestServiceImplTest {

    @Mock
    private GuestRepository guestRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private GuestServiceImpl guestService;

    private final UUID GUEST_ID = UUID.randomUUID();

    private User buildUser() {
        return User.builder()
                .userId(1L)
                .fullName("Alice Perera")
                .partnerName("Bob")
                .email("alice@test.com")
                .passwordHash("pw")
                .phoneNumber("0711111111")
                .role("USER")
                .isActive(true)
                .weddingDate(LocalDate.of(2025, 12, 20))
                .budget(new BigDecimal("500000"))
                .createdAt(LocalDateTime.now())
                .build();
    }

    private Guest buildGuest(UUID id, User user) {
        return Guest.builder()
                .guestId(id)
                .user(user)
                .guestName("Nimal Silva")
                .contactNumber("0712345678")
                .sideOfFamily("Bride")
                .rsvpStatus("Pending")
                .whatsappStatus("Not Sent")
                .plusOnes(1)
                .mealPreference("Vegetarian")
                .build();
    }

    private GuestRequestDto buildRequest() {
        return new GuestRequestDto(1L, "Nimal Silva", "0712345678",
                "Bride", "Pending", "Not Sent", 1, "Vegetarian");
    }

    @Test
    @DisplayName("saveGuest() saves and returns guest DTO")
    void saveGuest_savesAndReturnsDto() {
        User user = buildUser();
        Guest guest = buildGuest(GUEST_ID, user);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(guestRepository.save(any(Guest.class))).thenReturn(guest);

        GuestResponseDto result = guestService.saveGuest(buildRequest());

        assertThat(result.getGuestName()).isEqualTo("Nimal Silva");
        assertThat(result.getGuestId()).isEqualTo(GUEST_ID);
        verify(guestRepository).save(any(Guest.class));
    }

    @Test
    @DisplayName("saveGuest() throws ResourceNotFoundException when user not found")
    void saveGuest_throwsResourceNotFoundException_whenUserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> guestService.saveGuest(buildRequest()))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("getAllGuests() returns list of all guests")
    void getAllGuests_returnsAllGuests() {
        User user = buildUser();
        when(guestRepository.findAll()).thenReturn(List.of(buildGuest(GUEST_ID, user)));

        List<GuestResponseDto> result = guestService.getAllGuests();

        assertThat(result).hasSize(1);
    }

    @Test
    @DisplayName("getGuestById() returns DTO when found")
    void getGuestById_returnsDtoWhenFound() {
        User user = buildUser();
        when(guestRepository.findById(GUEST_ID)).thenReturn(Optional.of(buildGuest(GUEST_ID, user)));

        GuestResponseDto result = guestService.getGuestById(GUEST_ID);

        assertThat(result.getGuestId()).isEqualTo(GUEST_ID);
    }

    @Test
    @DisplayName("getGuestById() throws ResourceNotFoundException when not found")
    void getGuestById_throwsResourceNotFoundException_whenNotFound() {
        when(guestRepository.findById(GUEST_ID)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> guestService.getGuestById(GUEST_ID))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("updateGuest() updates fields and returns updated DTO")
    void updateGuest_updatesAndReturnsDto() {
        User user = buildUser();
        Guest existing = buildGuest(GUEST_ID, user);
        Guest updated = buildGuest(GUEST_ID, user);
        updated.setGuestName("Updated Name");
        when(guestRepository.findById(GUEST_ID)).thenReturn(Optional.of(existing));
        when(guestRepository.save(any(Guest.class))).thenReturn(updated);

        GuestResponseDto result = guestService.updateGuest(GUEST_ID, buildRequest());

        assertThat(result.getGuestId()).isEqualTo(GUEST_ID);
        verify(guestRepository).save(existing);
    }

    @Test
    @DisplayName("updateGuest() throws ResourceNotFoundException when guest not found")
    void updateGuest_throwsResourceNotFoundException_whenNotFound() {
        when(guestRepository.findById(GUEST_ID)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> guestService.updateGuest(GUEST_ID, buildRequest()))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("deleteGuest() calls deleteById on repository")
    void deleteGuest_callsDeleteById() {
        guestService.deleteGuest(GUEST_ID);
        verify(guestRepository).deleteById(GUEST_ID);
    }

    @Test
    @DisplayName("getShareInvitation() returns ShareInvitationResponse when guest found")
    void getShareInvitation_returnsResponse_whenGuestFound() {
        User user = buildUser();
        Guest guest = buildGuest(GUEST_ID, user);
        when(guestRepository.findById(GUEST_ID)).thenReturn(Optional.of(guest));
        when(guestRepository.save(any(Guest.class))).thenReturn(guest);

        ShareInvitationResponse result = guestService.getShareInvitation(GUEST_ID);

        assertThat(result.getGuestName()).isEqualTo("Nimal Silva");
        assertThat(result.getRsvpUrl()).contains(GUEST_ID.toString());
        assertThat(result.getWhatsappStatus()).isEqualTo("SENT");
    }

    @Test
    @DisplayName("getShareInvitation() throws ResourceNotFoundException when guest not found")
    void getShareInvitation_throwsResourceNotFoundException_whenGuestNotFound() {
        when(guestRepository.findById(GUEST_ID)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> guestService.getShareInvitation(GUEST_ID))
                .isInstanceOf(ResourceNotFoundException.class);
    }


    @Test
    @DisplayName("updateRsvpStatus() updates status and returns DTO")
    void updateRsvpStatus_updatesStatus() {
        User user = buildUser();
        Guest guest = buildGuest(GUEST_ID, user);
        when(guestRepository.findById(GUEST_ID)).thenReturn(Optional.of(guest));
        when(guestRepository.save(any(Guest.class))).thenReturn(guest);

        GuestResponseDto result = guestService.updateRsvpStatus(GUEST_ID, "Accepted");

        assertThat(result.getRsvpStatus()).isEqualTo("Accepted");
        verify(guestRepository).save(guest);
    }
}
