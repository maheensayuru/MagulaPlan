package com.zerostate.magulaplan.config;

import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.repo.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SessionTokenAuthenticationFilterTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        userRepository.save(User.builder()
                .email("auth@test.com")
                .passwordHash("pw")
                .role("USER")
                .isActive(true)
                .sessionToken("valid-token")
                .build());
    }

    @Test
    @DisplayName("protected endpoint rejects request without token")
    void rejectsWithoutToken() throws Exception {
        mockMvc.perform(post("/api/v1/vendor-categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"categoryName\":\"NoToken\"}"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("protected endpoint rejects request with invalid token")
    void rejectsInvalidToken() throws Exception {
        mockMvc.perform(post("/api/v1/vendor-categories")
                        .header("Authorization", "Bearer bogus-token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"categoryName\":\"BadToken\"}"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("protected endpoint accepts request with valid token")
    void acceptsValidToken() throws Exception {
        mockMvc.perform(post("/api/v1/vendor-categories")
                        .header("Authorization", "Bearer valid-token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"categoryName\":\"ValidToken\"}"))
                .andExpect(status().isCreated());
    }
}
