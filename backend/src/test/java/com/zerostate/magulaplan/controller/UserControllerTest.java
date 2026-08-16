package com.zerostate.magulaplan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zerostate.magulaplan.dto.UserRequestDto;
import com.zerostate.magulaplan.dto.UserResponseDto;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }


    private UserResponseDto buildResponse() {
        return new UserResponseDto(1L, "Alice Perera", "Bob Perera",
                "alice@test.com", "0711234567", "USER", true,
                LocalDate.of(2025, 12, 20), new BigDecimal("500000.00"),
                LocalDateTime.of(2025, 1, 1, 10, 0));
    }

    private UserRequestDto buildRequest() {
        return new UserRequestDto("Alice Perera", "Bob Perera", "alice@test.com",
                "secret", "0711234567", "USER",
                LocalDate.of(2025, 12, 20), new BigDecimal("500000.00"));
    }

    @Test
    @DisplayName("POST /api/v1/users -> 201 Created with user body")
    void createUser_returns201() throws Exception {
        when(userService.saveUser(any(UserRequestDto.class))).thenReturn(buildResponse());

        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildRequest())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.userId").value(1))
                .andExpect(jsonPath("$.email").value("alice@test.com"));
    }

    @Test
    @DisplayName("GET /api/v1/users -> 200 OK with list of users")
    void getAllUsers_returns200() throws Exception {
        when(userService.getAllUsers()).thenReturn(List.of(buildResponse()));

        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].email").value("alice@test.com"));
    }

    @Test
    @DisplayName("GET /api/v1/users/{userId} -> 200 OK when user found")
    void getUserById_returns200_whenFound() throws Exception {
        when(userService.getUserById(1L)).thenReturn(buildResponse());

        mockMvc.perform(get("/api/v1/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(1));
    }

    @Test
    @DisplayName("GET /api/v1/users/{userId} -> 404 when user not found")
    void getUserById_returns404_whenNotFound() throws Exception {
        when(userService.getUserById(99L)).thenThrow(new ResourceNotFoundException("User not found 99"));

        mockMvc.perform(get("/api/v1/users/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("PUT /api/v1/users/{userId} -> 200 OK with updated user body")
    void updateUser_returns200() throws Exception {
        when(userService.updateUser(eq(1L), any(UserRequestDto.class))).thenReturn(buildResponse());

        mockMvc.perform(put("/api/v1/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildRequest())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(1));
    }

    @Test
    @DisplayName("DELETE /api/v1/users/{userId} -> 204 No Content")
    void deleteUser_returns204() throws Exception {
        doNothing().when(userService).deleteUser(1L);

        mockMvc.perform(delete("/api/v1/users/1"))
                .andExpect(status().isNoContent());
    }
}
