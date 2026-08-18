package com.zerostate.magulaplan.repo;

import com.zerostate.magulaplan.entity.Guest;
import com.zerostate.magulaplan.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class GuestRepositoryTest {

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private UserRepository userRepository;

    private User savedUser;

    @BeforeEach
    void setUp() {
        savedUser = userRepository.save(User.builder()
                .fullName("Test User")
                .partnerName("Partner")
                .email("user@guest-test.com")
                .passwordHash("pw")
                .phoneNumber("0711111111")
                .role("USER")
                .isActive(true)
                .weddingDate(LocalDate.of(2025, 6, 15))
                .budget(new BigDecimal("100000.00"))
                .createdAt(LocalDateTime.now())
                .build());
    }

    private Guest buildGuest(String name) {
        return Guest.builder()
                .user(savedUser)
                .guestName(name)
                .contactNumber("0712345678")
                .sideOfFamily("Bride")
                .rsvpStatus("Pending")
                .whatsappStatus("Not Sent")
                .plusOnes(1)
                .mealPreference("Vegetarian")
                .build();
    }

    @Test
    @DisplayName("save() persists guest and generates a UUID")
    void save_persistsGuestWithUuid() {
        Guest saved = guestRepository.save(buildGuest("Nimal Silva"));
        assertThat(saved.getGuestId()).isNotNull();
        assertThat(saved.getGuestName()).isEqualTo("Nimal Silva");
    }

    @Test
    @DisplayName("findById() returns the saved guest")
    void findById_returnsSavedGuest() {
        Guest saved = guestRepository.save(buildGuest("Kamala"));
        Optional<Guest> found = guestRepository.findById(saved.getGuestId());
        assertThat(found).isPresent();
        assertThat(found.get().getGuestName()).isEqualTo("Kamala");
    }

    @Test
    @DisplayName("findById() returns empty for unknown UUID")
    void findById_returnsEmptyForUnknownUuid() {
        Optional<Guest> found = guestRepository.findById(UUID.randomUUID());
        assertThat(found).isEmpty();
    }

    @Test
    @DisplayName("findAll() returns all saved guests")
    void findAll_returnsAllSavedGuests() {
        guestRepository.save(buildGuest("Guest A"));
        guestRepository.save(buildGuest("Guest B"));
        List<Guest> guests = guestRepository.findAll();
        assertThat(guests).hasSizeGreaterThanOrEqualTo(2);
    }

    @Test
    @DisplayName("deleteById() removes the guest")
    void deleteById_removesGuest() {
        Guest saved = guestRepository.save(buildGuest("To Delete"));
        guestRepository.deleteById(saved.getGuestId());
        assertThat(guestRepository.findById(saved.getGuestId())).isEmpty();
    }
}
