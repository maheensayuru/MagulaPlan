package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.repo.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserRepository userRepository;

    @TestConfiguration
    static class PasswordConfig {
        @Bean
        PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    }

    private User buildUser(String email, String passwordHash) {
        return User.builder()
                .userId(1L)
                .fullName("Alice")
                .email(email)
                .passwordHash(passwordHash)
                .role("USER")
                .isActive(true)
                .build();
    }

    @Test
    @DisplayName("register() stores a BCrypt hash, never the raw password")
    void register_hashesPassword() throws Exception {
        when(userRepository.findByEmail(any())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"fullName\":\"Alice\",\"email\":\"a@test.com\",\"password\":\"secret\"}"))
                .andExpect(status().isCreated());

        verify(userRepository).save(argThat(u ->
                u.getPasswordHash().startsWith("$2")
                        && !"secret".equals(u.getPasswordHash())
                        && new BCryptPasswordEncoder().matches("secret", u.getPasswordHash())));
    }

    @Test
    @DisplayName("login() returns 200 + token when BCrypt password matches")
    void login_succeedsWithHashedPassword() throws Exception {
        String hash = new BCryptPasswordEncoder().encode("secret");
        when(userRepository.findByEmail("a@test.com")).thenReturn(Optional.of(buildUser("a@test.com", hash)));

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"a@test.com\",\"password\":\"secret\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    @DisplayName("login() returns 401 when password is wrong")
    void login_rejectsWrongPassword() throws Exception {
        String hash = new BCryptPasswordEncoder().encode("secret");
        when(userRepository.findByEmail("a@test.com")).thenReturn(Optional.of(buildUser("a@test.com", hash)));

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"a@test.com\",\"password\":\"wrong\"}"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("login() accepts legacy plain-text password and upgrades it to BCrypt")
    void login_upgradesLegacyPlainText() throws Exception {
        when(userRepository.findByEmail("old@test.com"))
                .thenReturn(Optional.of(buildUser("old@test.com", "plainpw")));

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"old@test.com\",\"password\":\"plainpw\"}"))
                .andExpect(status().isOk());

        verify(userRepository).save(argThat(u ->
                u.getPasswordHash().startsWith("$2")
                        && new BCryptPasswordEncoder().matches("plainpw", u.getPasswordHash())));
    }
}
