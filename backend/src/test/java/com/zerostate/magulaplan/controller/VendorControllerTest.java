package com.zerostate.magulaplan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zerostate.magulaplan.dto.VendorRequestDto;
import com.zerostate.magulaplan.dto.VendorResponseDto;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.service.VendorService;
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
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(VendorController.class)
@AutoConfigureMockMvc(addFilters = false)
class VendorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @MockitoBean
    private VendorService vendorService;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }



    private VendorResponseDto buildResponse() {
        VendorResponseDto dto = new VendorResponseDto();
        dto.setVendorId(1L);
        dto.setCategoryId(1L);
        dto.setCategoryName("Photography");
        dto.setBusinessName("Sunset Studios");
        dto.setDescription("Wedding photography");
        dto.setDistrictLocation("Colombo");
        dto.setContactPhone("0711111111");
        dto.setContactEmail("studio@test.com");
        dto.setStartingPrice(new BigDecimal("25000.00"));
        return dto;
    }

    private VendorRequestDto buildRequest() {
        return new VendorRequestDto(1L, "Sunset Studios", "Wedding photography",
                "Colombo", "0711111111", "studio@test.com", new BigDecimal("25000.00"));
    }

    @Test
    @DisplayName("POST /api/v1/vendors -> 201 Created with vendor body")
    void createVendor_returns201() throws Exception {
        when(vendorService.saveVendor(any(VendorRequestDto.class))).thenReturn(buildResponse());

        mockMvc.perform(post("/api/v1/vendors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildRequest())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.vendorId").value(1))
                .andExpect(jsonPath("$.businessName").value("Sunset Studios"));
    }

    @Test
    @DisplayName("GET /api/v1/vendors -> 200 OK with all vendors")
    void getAllVendors_returns200() throws Exception {
        when(vendorService.getAllVendors()).thenReturn(List.of(buildResponse()));

        mockMvc.perform(get("/api/v1/vendors"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].businessName").value("Sunset Studios"));
    }

    @Test
    @DisplayName("GET /api/v1/vendors/category/{categoryId} -> 200 OK with vendors for category")
    void getVendorsByCategoryId_returns200() throws Exception {
        when(vendorService.getVendorsByCategoryId(1L)).thenReturn(List.of(buildResponse()));

        mockMvc.perform(get("/api/v1/vendors/category/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].vendorId").value(1));
    }

    @Test
    @DisplayName("GET /api/v1/vendors/{vendorId} -> 200 OK when vendor found")
    void getVendorById_returns200_whenFound() throws Exception {
        when(vendorService.getVendorById(1L)).thenReturn(buildResponse());

        mockMvc.perform(get("/api/v1/vendors/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.vendorId").value(1));
    }

    @Test
    @DisplayName("GET /api/v1/vendors/{vendorId} -> 404 when vendor not found")
    void getVendorById_returns404_whenNotFound() throws Exception {
        when(vendorService.getVendorById(99L))
                .thenThrow(new ResourceNotFoundException("Vendor not found with id: 99"));

        mockMvc.perform(get("/api/v1/vendors/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("PUT /api/v1/vendors/{vendorId} -> 200 OK with updated vendor body")
    void updateVendor_returns200() throws Exception {
        when(vendorService.updateVendor(eq(1L), any(VendorRequestDto.class))).thenReturn(buildResponse());

        mockMvc.perform(put("/api/v1/vendors/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildRequest())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.vendorId").value(1));
    }

    @Test
    @DisplayName("DELETE /api/v1/vendors/{vendorId} -> 204 No Content")
    void deleteVendor_returns204() throws Exception {
        doNothing().when(vendorService).deleteVendor(1L);

        mockMvc.perform(delete("/api/v1/vendors/1"))
                .andExpect(status().isNoContent());
    }
}
