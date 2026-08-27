package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.UserRequestDto;
import com.zerostate.magulaplan.dto.UserResponseDto;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.service.impl.UserServiceImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    private UserRequestDto buildRequest() {
        return new UserRequestDto(
                "Alice Perera", "Bob Perera", "alice@test.com",
                "secret", "0711234567", "USER",
                LocalDate.of(2025, 12, 20), new BigDecimal("500000.00"));
    }

    private User buildUser(Long id) {
        return User.builder()
                .userId(id)
                .fullName("Alice Perera")
                .partnerName("Bob Perera")
                .email("alice@test.com")
                .passwordHash("secret")
                .phoneNumber("0711234567")
                .role("USER")
                .isActive(true)
                .weddingDate(LocalDate.of(2025, 12, 20))
                .budget(new BigDecimal("500000.00"))
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    @DisplayName("saveUser() saves user with default role USER and isActive=true")
    void saveUser_savesUserWithDefaults() {
        User savedUser = buildUser(1L);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        UserResponseDto response = userService.saveUser(buildRequest());

        assertThat(response.getUserId()).isEqualTo(1L);
        assertThat(response.getEmail()).isEqualTo("alice@test.com");
        assertThat(response.getIsActive()).isTrue();
        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("saveUser() defaults role to USER when request role is null")
    void saveUser_defaultsRoleToUser_whenRoleIsNull() {
        UserRequestDto req = new UserRequestDto(
                "Alice", "Bob", "a@test.com", "pw", "0700000000",
                null, LocalDate.now(), BigDecimal.TEN);
        User savedUser = buildUser(2L);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        userService.saveUser(req);
        verify(userRepository).save(argThat(u -> "USER".equals(u.getRole())));
    }
    @Test
    @DisplayName("saveUser() hashes the password before persisting")
    void saveUser_hashesPassword() {
        when(passwordEncoder.encode("secret")).thenReturn("$2a$10$hashedvalue");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        userService.saveUser(buildRequest());

        verify(passwordEncoder).encode("secret");
        verify(userRepository).save(argThat(u -> "$2a$10$hashedvalue".equals(u.getPasswordHash())));
    }

    @Test
    @DisplayName("getAllUsers() returns list of all users")
    void getAllUsers_returnsAllUsers() {
        when(userRepository.findAll()).thenReturn(List.of(buildUser(1L), buildUser(2L)));

        List<UserResponseDto> result = userService.getAllUsers();

        assertThat(result).hasSize(2);
    }

    @Test
    @DisplayName("getUserById() returns user DTO when found")
    void getUserById_returnsUserDto_whenFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(buildUser(1L)));

        UserResponseDto result = userService.getUserById(1L);

        assertThat(result.getUserId()).isEqualTo(1L);
    }

    @Test
    @DisplayName("getUserById() throws ResourceNotFoundException when not found")
    void getUserById_throwsResourceNotFoundException_whenNotFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.getUserById(99L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("updateUser() updates and returns updated user DTO")
    void updateUser_updatesAndReturnsDto() {
        User existing = buildUser(1L);
        User updated = buildUser(1L);
        updated.setFullName("Updated Name");
        when(userRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(userRepository.save(any(User.class))).thenReturn(updated);

        UserResponseDto result = userService.updateUser(1L, buildRequest());

        assertThat(result.getUserId()).isEqualTo(1L);
        verify(userRepository).save(existing);
    }

    @Test
    @DisplayName("updateUser() throws ResourceNotFoundException when user not found")
    void updateUser_throwsResourceNotFoundException_whenNotFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.updateUser(99L, buildRequest()))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("deleteUser() calls deleteById on repository")
    void deleteUser_callsDeleteById() {
        userService.deleteUser(1L);
        verify(userRepository).deleteById(1L);
    }
}
