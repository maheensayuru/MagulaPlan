package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.AuthResponseDto;
import com.zerostate.magulaplan.dto.UserRequestDto;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // POST /api/v1/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequestDto dto) {
        String cleanEmail = dto.getEmail() != null ? dto.getEmail().trim() : "";
        if (userRepository.findByEmailIgnoreCase(cleanEmail).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "An account with this email already exists."));
        }
        String token = UUID.randomUUID().toString();

        User user = User.builder()
                .fullName(dto.getFullName())
                .partnerName(dto.getPartnerName())
                .email(dto.getEmail())
                .passwordHash(passwordEncoder.encode(dto.getPassword()))
                .phoneNumber(dto.getPhoneNumber())
                .role("USER")
                .isActive(true)
                .weddingDate(dto.getWeddingDate())
                .budget(dto.getTotalBudget())
                .createdAt(LocalDateTime.now())
                .sessionToken(token)
                .build();

        User saved = userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new AuthResponseDto(token, saved.getUserId(), saved.getFullName(), saved.getEmail(), saved.getRole())
        );
    }

    // POST /api/v1/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body != null ? body.get("email") : null;
        String password = body != null ? body.get("password") : null;

        if (email == null || email.isBlank() || password == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password. Please check your credentials and try again."));
        }

        String trimmedEmail = email.trim();
        Optional<User> userOpt = userRepository.findByEmailIgnoreCase(trimmedEmail);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByEmail(trimmedEmail);
        }

        if (userOpt.isPresent()) {
            User u = userOpt.get();
            if (Boolean.TRUE.equals(u.getIsActive()) && credentialsMatch(password, u)) {
                if (isLegacyPlainText(u)) {
                    u.setPasswordHash(passwordEncoder.encode(password));
                }
                String token = UUID.randomUUID().toString();
                u.setSessionToken(token);
                userRepository.save(u);
                return ResponseEntity.ok(
                        new AuthResponseDto(token, u.getUserId(), u.getFullName(), u.getEmail(), u.getRole())
                );
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid email or password. Please check your credentials and try again."));
    }
    private boolean credentialsMatch(String rawPassword, User user) {
        if (isLegacyPlainText(user)) {
            return rawPassword.equals(user.getPasswordHash());
        }
        return passwordEncoder.matches(rawPassword, user.getPasswordHash());
    }

    private boolean isLegacyPlainText(User user) {
        String stored = user.getPasswordHash();
        return stored != null && !stored.startsWith("$2");
    }
}
