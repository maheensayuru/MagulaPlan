package com.zerostate.magulaplan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zerostate.magulaplan.dto.GuestRequestDto;
import com.zerostate.magulaplan.dto.GuestResponseDto;
import com.zerostate.magulaplan.dto.ShareInvitationResponse;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.service.GuestService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GuestController.class)
@AutoConfigureMockMvc(addFilters = false)
class GuestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @MockitoBean
    private GuestService guestService;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }



    private final UUID GUEST_ID = UUID.fromString("11111111-1111-1111-1111-111111111111");

    private GuestResponseDto buildResponse() {
        return new GuestResponseDto(GUEST_ID, "Nimal Silva", "0712345678",
                "Bride", "Pending", "Not Sent", 1, "Vegetarian");
    }

    private GuestRequestDto buildRequest() {
        return new GuestRequestDto(1L, "Nimal Silva", "0712345678",
                "Bride", "Pending", "Not Sent", 1, "Vegetarian");
    }

    @Test
    @DisplayName("POST /api/v1/guests -> 201 Created with guest body")
    void createGuest_returns201() throws Exception {
        when(guestService.saveGuest(any(GuestRequestDto.class))).thenReturn(buildResponse());

        mockMvc.perform(post("/api/v1/guests")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildRequest())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.guestName").value("Nimal Silva"));
    }

    @Test
    @DisplayName("GET /api/v1/guests -> 200 OK with list of guests")
    void getAllGuests_returns200() throws Exception {
        when(guestService.getAllGuests()).thenReturn(List.of(buildResponse()));

        mockMvc.perform(get("/api/v1/guests"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].guestName").value("Nimal Silva"));
    }

    @Test
    @DisplayName("GET /api/v1/guests/{guestId} -> 200 OK when guest found")
    void getGuestById_returns200_whenFound() throws Exception {
        when(guestService.getGuestById(GUEST_ID)).thenReturn(buildResponse());

        mockMvc.perform(get("/api/v1/guests/" + GUEST_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.guestName").value("Nimal Silva"));
    }

    @Test
    @DisplayName("GET /api/v1/guests/{guestId} -> 404 when guest not found")
    void getGuestById_returns404_whenNotFound() throws Exception {
        when(guestService.getGuestById(GUEST_ID))
                .thenThrow(new ResourceNotFoundException("Guest Not Found with ID: " + GUEST_ID));

        mockMvc.perform(get("/api/v1/guests/" + GUEST_ID))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("PUT /api/v1/guests/{guestId} -> 200 OK with updated guest body")
    void updateGuest_returns200() throws Exception {
        when(guestService.updateGuest(eq(GUEST_ID), any(GuestRequestDto.class))).thenReturn(buildResponse());

        mockMvc.perform(put("/api/v1/guests/" + GUEST_ID)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildRequest())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.guestName").value("Nimal Silva"));
    }

    @Test
    @DisplayName("DELETE /api/v1/guests/{guestId} -> 204 No Content")
    void deleteGuest_returns204() throws Exception {
        doNothing().when(guestService).deleteGuest(GUEST_ID);

        mockMvc.perform(delete("/api/v1/guests/" + GUEST_ID))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("GET /api/v1/guests/{guestId}/share -> 200 OK when guest found")
    void getShareInvitation_returns200_whenGuestFound() throws Exception {
        ShareInvitationResponse shareResponse = new ShareInvitationResponse(
                "Wedding Invitation",
                "You're invited! Alice request the pleasure of your company.",
                "https://magulaplan.com/rsvp/" + GUEST_ID,
                "Nimal Silva",
                "SENT");
        when(guestService.getShareInvitation(GUEST_ID)).thenReturn(shareResponse);

        mockMvc.perform(get("/api/v1/guests/" + GUEST_ID + "/share"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.guestName").value("Nimal Silva"))
                .andExpect(jsonPath("$.whatsappStatus").value("SENT"));
    }

    @Test
    @DisplayName("GET /api/v1/guests/{guestId}/share -> 404 when guest not found")
    void getShareInvitation_returns404_whenGuestNotFound() throws Exception {
        when(guestService.getShareInvitation(GUEST_ID))
                .thenThrow(new ResourceNotFoundException("Guest Not Found with ID: " + GUEST_ID));

        mockMvc.perform(get("/api/v1/guests/" + GUEST_ID + "/share"))
                .andExpect(status().isNotFound());
    }
}
