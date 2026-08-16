package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.AuthResponseDto;
import com.zerostate.magulaplan.dto.LoginRequestDto;
import com.zerostate.magulaplan.dto.UserRequestDto;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.exception.ResourceAlreadyExistsException;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody UserRequestDto dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new ResourceAlreadyExistsException("User with email " + dto.getEmail() + " already exists");
        }

        User user = User.builder()
                .fullName(dto.getFullName())
                .partnerName(dto.getPartnerName())
                .email(dto.getEmail())
                .passwordHash(passwordEncoder.encode(dto.getPassword()))
                .phoneNumber(dto.getPhoneNumber())
                .role(dto.getRole())
                .weddingDate(dto.getWeddingDate())
                .budget(dto.getTotalBudget())
                .isActive(true)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());
        AuthResponseDto responseDto = new AuthResponseDto(token, "User registered successfully");
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        String token = jwtUtil.generateToken(dto.getEmail());
        AuthResponseDto responseDto = new AuthResponseDto(token, "Login successful");
        return ResponseEntity.ok(responseDto);
    }
}
