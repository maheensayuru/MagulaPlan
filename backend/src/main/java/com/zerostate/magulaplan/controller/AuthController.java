package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.AuthResponseDto;
import com.zerostate.magulaplan.dto.UserRequestDto;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserRepository userRepository;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // POST /api/v1/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequestDto dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "An account with this email already exists."));
        }

        String token = UUID.randomUUID().toString();

        User user = User.builder()
                .fullName(dto.getFullName())
                .partnerName(dto.getPartnerName())
                .email(dto.getEmail())
                .passwordHash(dto.getPassword())   // plain text for now — hash in future
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
        String email = body.get("email");
        String password = body.get("password");

        return userRepository.findByEmail(email)
                .filter(u -> password != null && password.equals(u.getPasswordHash()))
                .map(u -> {
                    // Refresh token on each login
                    String token = UUID.randomUUID().toString();
                    u.setSessionToken(token);
                    userRepository.save(u);
                    return ResponseEntity.ok(
                            new AuthResponseDto(token, u.getUserId(), u.getFullName(), u.getEmail(), u.getRole())
                    );
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponseDto()));
    }
}
