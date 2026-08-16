package com.zerostate.magulaplan.repo;

import com.zerostate.magulaplan.entity.User;
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

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private User buildUser(String email) {
        return User.builder()
                .fullName("Alice Perera")
                .partnerName("Bob Perera")
                .email(email)
                .passwordHash("hashed_pw")
                .phoneNumber("0711234567")
                .role("USER")
                .isActive(true)
                .weddingDate(LocalDate.of(2025, 12, 20))
                .budget(new BigDecimal("500000.00"))
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    @DisplayName("save() persists user and assigns an ID")
    void save_persistsUserAndAssignsId() {
        User saved = userRepository.save(buildUser("alice@test.com"));
        assertThat(saved.getUserId()).isNotNull();
        assertThat(saved.getEmail()).isEqualTo("alice@test.com");
    }

    @Test
    @DisplayName("findById() returns the saved user")
    void findById_returnsSavedUser() {
        User saved = userRepository.save(buildUser("bob@test.com"));
        Optional<User> found = userRepository.findById(saved.getUserId());
        assertThat(found).isPresent();
        assertThat(found.get().getFullName()).isEqualTo("Alice Perera");
    }

    @Test
    @DisplayName("findById() returns empty for unknown ID")
    void findById_returnsEmptyForUnknownId() {
        Optional<User> found = userRepository.findById(999L);
        assertThat(found).isEmpty();
    }

    @Test
    @DisplayName("findAll() returns all saved users")
    void findAll_returnsAllSavedUsers() {
        userRepository.save(buildUser("c1@test.com"));
        userRepository.save(buildUser("c2@test.com"));
        List<User> users = userRepository.findAll();
        assertThat(users).hasSizeGreaterThanOrEqualTo(2);
    }

    @Test
    @DisplayName("deleteById() removes the user")
    void deleteById_removesUser() {
        User saved = userRepository.save(buildUser("del@test.com"));
        userRepository.deleteById(saved.getUserId());
        assertThat(userRepository.findById(saved.getUserId())).isEmpty();
    }

    @Test
    @DisplayName("findByEmail() returns user when email matches")
    void findByEmail_returnsUserWhenEmailMatches() {
        userRepository.save(buildUser("unique@test.com"));
        Optional<User> found = userRepository.findByEmail("unique@test.com");
        assertThat(found).isPresent();
        assertThat(found.get().getEmail()).isEqualTo("unique@test.com");
    }

    @Test
    @DisplayName("findByEmail() returns empty for unknown email")
    void findByEmail_returnsEmptyForUnknownEmail() {
        Optional<User> found = userRepository.findByEmail("nobody@test.com");
        assertThat(found).isEmpty();
    }
}
