package com.zerostate.magulaplan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zerostate.magulaplan.dto.VendorCategoryRequestDto;
import com.zerostate.magulaplan.dto.VendorCategoryResponseDto;
import com.zerostate.magulaplan.service.VendorCategoryService;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(VendorCategoryController.class)
@AutoConfigureMockMvc(addFilters = false)
class VendorCategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @MockitoBean
    private VendorCategoryService vendorCategoryService;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }



    private VendorCategoryResponseDto buildResponse() {
        return new VendorCategoryResponseDto(1L, "Photography");
    }

    private VendorCategoryRequestDto buildRequest() {
        return new VendorCategoryRequestDto("Photography");
    }

    @Test
    @DisplayName("POST /api/v1/vendor-categories -> 201 Created with category body")
    void createVendorCategory_returns201() throws Exception {
        when(vendorCategoryService.saveVendorCategory(any(VendorCategoryRequestDto.class)))
                .thenReturn(buildResponse());

        mockMvc.perform(post("/api/v1/vendor-categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildRequest())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.categoryId").value(1))
                .andExpect(jsonPath("$.categoryName").value("Photography"));
    }

    @Test
    @DisplayName("GET /api/v1/vendor-categories -> 200 OK with all categories")
    void getAllVendorCategories_returns200() throws Exception {
        when(vendorCategoryService.getAllVendorCategories()).thenReturn(List.of(buildResponse()));

        mockMvc.perform(get("/api/v1/vendor-categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].categoryName").value("Photography"));
    }

    @Test
    @DisplayName("GET /api/v1/vendor-categories/{categoryId} -> 200 OK when found")
    void getVendorCategoryById_returns200_whenFound() throws Exception {
        when(vendorCategoryService.getVendorCategoryById(1L)).thenReturn(buildResponse());

        mockMvc.perform(get("/api/v1/vendor-categories/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoryId").value(1));
    }

    // NOTE: VendorCategoryServiceImpl.getVendorCategoryById throws plain RuntimeException
    // (not ResourceNotFoundException) when not found. This falls through to the generic
    // Exception handler which returns 500. This is a known inconsistency vs other services
    // that correctly throw ResourceNotFoundException -> 404.
    // TODO: fix for API consistency.
    @Test
    @DisplayName("GET /api/v1/vendor-categories/{categoryId} -> 500 when not found (known inconsistency: throws RuntimeException, not ResourceNotFoundException)")
    void getVendorCategoryById_returns500_whenNotFound() throws Exception {
        when(vendorCategoryService.getVendorCategoryById(99L))
                .thenThrow(new RuntimeException("Vendor Category not found with id: 99"));

        mockMvc.perform(get("/api/v1/vendor-categories/99"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    @DisplayName("PUT /api/v1/vendor-categories/{categoryId} -> 200 OK with updated category body")
    void updateVendorCategory_returns200() throws Exception {
        when(vendorCategoryService.updateVendorCategory(eq(1L), any(VendorCategoryRequestDto.class)))
                .thenReturn(buildResponse());

        mockMvc.perform(put("/api/v1/vendor-categories/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildRequest())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoryId").value(1));
    }

    @Test
    @DisplayName("DELETE /api/v1/vendor-categories/{categoryId} -> 204 No Content")
    void deleteVendorCategory_returns204() throws Exception {
        doNothing().when(vendorCategoryService).deleteVendorCategory(1L);

        mockMvc.perform(delete("/api/v1/vendor-categories/1"))
                .andExpect(status().isNoContent());
    }
}
