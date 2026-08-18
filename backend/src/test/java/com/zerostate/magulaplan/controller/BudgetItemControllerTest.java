package com.zerostate.magulaplan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.zerostate.magulaplan.dto.BudgetItemRequestDto;
import com.zerostate.magulaplan.dto.BudgetItemResponseDto;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.service.BudgetItemService;
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

@WebMvcTest(BudgetItemController.class)
@AutoConfigureMockMvc(addFilters = false)
class BudgetItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @MockitoBean
    private BudgetItemService budgetItemService;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }



    private BudgetItemResponseDto buildResponse() {
        return new BudgetItemResponseDto(1L, "Wedding Hall", "Venue",
                new BigDecimal("50000.00"), new BigDecimal("48000.00"),
                new BigDecimal("10000.00"), "Planned");
    }

    private BudgetItemRequestDto buildRequest() {
        return new BudgetItemRequestDto(1L, "Wedding Hall", "Venue",
                new BigDecimal("50000.00"), new BigDecimal("48000.00"),
                new BigDecimal("10000.00"), "Planned");
    }

    @Test
    @DisplayName("POST /api/v1/budget-items -> 201 Created with budget item body")
    void createBudgetItem_returns201() throws Exception {
        when(budgetItemService.saveBudgetItem(any(BudgetItemRequestDto.class))).thenReturn(buildResponse());

        mockMvc.perform(post("/api/v1/budget-items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildRequest())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.budgetItemId").value(1))
                .andExpect(jsonPath("$.itemName").value("Wedding Hall"));
    }

    @Test
    @DisplayName("GET /api/v1/budget-items -> 200 OK with all budget items")
    void getAllBudgetItems_returns200() throws Exception {
        when(budgetItemService.getAllBudgetItems()).thenReturn(List.of(buildResponse()));

        mockMvc.perform(get("/api/v1/budget-items"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].itemName").value("Wedding Hall"));
    }

    @Test
    @DisplayName("GET /api/v1/budget-items/user/{userId} -> 200 OK with items for user")
    void getBudgetItemsByUserId_returns200() throws Exception {
        when(budgetItemService.getBudgetItemsByUserId(1L)).thenReturn(List.of(buildResponse()));

        mockMvc.perform(get("/api/v1/budget-items/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].budgetItemId").value(1));
    }

    @Test
    @DisplayName("GET /api/v1/budget-items/{budgetItemId} -> 200 OK when item found")
    void getBudgetItemById_returns200_whenFound() throws Exception {
        when(budgetItemService.getBudgetItemById(1L)).thenReturn(buildResponse());

        mockMvc.perform(get("/api/v1/budget-items/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.budgetItemId").value(1));
    }

    @Test
    @DisplayName("GET /api/v1/budget-items/{budgetItemId} -> 404 when item not found")
    void getBudgetItemById_returns404_whenNotFound() throws Exception {
        when(budgetItemService.getBudgetItemById(99L))
                .thenThrow(new ResourceNotFoundException("Budget Item not found with ID: 99"));

        mockMvc.perform(get("/api/v1/budget-items/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("PUT /api/v1/budget-items/{budgetItemId} -> 200 OK with updated item body")
    void updateBudgetItem_returns200() throws Exception {
        when(budgetItemService.updateBudgetItem(eq(1L), any(BudgetItemRequestDto.class)))
                .thenReturn(buildResponse());

        mockMvc.perform(put("/api/v1/budget-items/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(buildRequest())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.budgetItemId").value(1));
    }

    @Test
    @DisplayName("DELETE /api/v1/budget-items/{budgetItemId} -> 204 No Content")
    void deleteBudgetItem_returns204() throws Exception {
        doNothing().when(budgetItemService).deleteBudgetItem(1L);

        mockMvc.perform(delete("/api/v1/budget-items/1"))
                .andExpect(status().isNoContent());
    }
}
