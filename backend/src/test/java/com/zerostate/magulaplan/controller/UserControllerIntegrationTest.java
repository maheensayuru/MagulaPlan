package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.repo.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Full-context integration test for {@code GET /api/v1/users/me}, exercising the
 * real {@code SessionTokenAuthenticationFilter} + {@code @AuthenticationPrincipal}
 * resolution together (the {@code @WebMvcTest} slice does not register the
 * argument resolver, so a slice test cannot cover this path).
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        userRepository.save(User.builder()
                .email("me@test.com")
                .fullName("Alice Perera")
                .partnerName("Bob Perera")
                .passwordHash("pw")
                .phoneNumber("0711234567")
                .role("USER")
                .isActive(true)
                .sessionToken("me-token")
                .budget(new BigDecimal("500000.00"))
                .build());
    }

    @Test
    @DisplayName("GET /api/v1/users/me -> 200 OK with the authenticated user's profile")
    void getCurrentUser_returnsAuthenticatedUser() throws Exception {
        mockMvc.perform(get("/api/v1/users/me")
                        .header("Authorization", "Bearer me-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("me@test.com"))
                .andExpect(jsonPath("$.fullName").value("Alice Perera"))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    @DisplayName("GET /api/v1/users/me -> 403 without a token")
    void getCurrentUser_rejectsUnauthenticated() throws Exception {
        mockMvc.perform(get("/api/v1/users/me"))
                .andExpect(status().isForbidden());
    }
}
