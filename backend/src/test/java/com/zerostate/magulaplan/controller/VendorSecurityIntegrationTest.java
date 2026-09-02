package com.zerostate.magulaplan.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zerostate.magulaplan.dto.BudgetItemRequestDto;
import com.zerostate.magulaplan.dto.VendorRequestDto;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.entity.Vendor;
import com.zerostate.magulaplan.entity.VendorCategory;
import com.zerostate.magulaplan.repo.BudgetItemRepository;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.repo.VendorCategoryRepository;
import com.zerostate.magulaplan.repo.VendorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class VendorSecurityIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private VendorCategoryRepository vendorCategoryRepository;

    @Autowired
    private BudgetItemRepository budgetItemRepository;

    private ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());


    private VendorCategory category;
    private User coupleA;
    private User coupleB;

    @BeforeEach
    void setUp() {
        budgetItemRepository.deleteAll();
        vendorRepository.deleteAll();
        userRepository.deleteAll();
        vendorCategoryRepository.deleteAll();

        category = vendorCategoryRepository.save(new VendorCategory(null, "Photography", null));

        coupleA = userRepository.save(User.builder()
                .email("coupleA@test.com")
                .fullName("Couple A")
                .passwordHash("pw")
                .role("USER")
                .isActive(true)
                .sessionToken("token-couple-a")
                .build());

        coupleB = userRepository.save(User.builder()
                .email("coupleB@test.com")
                .fullName("Couple B")
                .passwordHash("pw")
                .role("USER")
                .isActive(true)
                .sessionToken("token-couple-b")
                .build());
    }

    @Test
    @DisplayName("Unauthenticated prospective vendor can register with plan selection and credentials")
    void unauthenticatedVendor_canSelfRegister_withPlan() throws Exception {
        VendorRequestDto request = VendorRequestDto.builder()
                .categoryId(category.getCategoryId())
                .businessName("Royal Ceylon Photography")
                .description("Luxury wedding photography")
                .districtLocation("Colombo")
                .contactPhone("0771234567")
                .contactEmail("royal@ceylon.lk")
                .startingPrice(new BigDecimal("75000.00"))
                .subscriptionTier("PRO")
                .password("VendorSecret@123")
                .build();

        mockMvc.perform(post("/api/v1/vendors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.businessName").value("Royal Ceylon Photography"))
                .andExpect(jsonPath("$.subscriptionTier").value("PRO"))
                .andExpect(jsonPath("$.verified").value(true))
                .andExpect(jsonPath("$.sessionToken").isNotEmpty());
    }

    @Test
    @DisplayName("Non-owner couple cannot update another vendor's listing (IDOR protection -> 403)")
    void coupleCannotUpdate_anotherVendorListing() throws Exception {
        Vendor vendor = vendorRepository.save(Vendor.builder()
                .category(category)
                .user(coupleA) // owned by couple A
                .businessName("Studio A")
                .districtLocation("Colombo")
                .contactPhone("0711111111")
                .contactEmail("studioA@test.com")
                .startingPrice(new BigDecimal("30000.00"))
                .status("APPROVED")
                .build());

        VendorRequestDto attackRequest = VendorRequestDto.builder()
                .categoryId(category.getCategoryId())
                .businessName("Hacked Studio Name")
                .districtLocation("Colombo")
                .contactPhone("0722222222")
                .contactEmail("hacker@test.com")
                .startingPrice(new BigDecimal("1000.00"))
                .build();

        // Couple B attempts to update Couple A's vendor listing
        mockMvc.perform(put("/api/v1/vendors/" + vendor.getVendorId())
                        .header("Authorization", "Bearer token-couple-b")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(attackRequest)))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Couple data IDOR protection: GET /budget-items returns only authenticated user's items")
    void getBudgetItems_returnsOnlyCallerItems() throws Exception {
        // Create budget item for Couple A
        BudgetItemRequestDto itemA = new BudgetItemRequestDto(
                coupleA.getUserId(), "Flowers", "Floral",
                new BigDecimal("50000"), new BigDecimal("50000"), new BigDecimal("10000"), "Planned");

        mockMvc.perform(post("/api/v1/budget-items")
                        .header("Authorization", "Bearer token-couple-a")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(itemA)))
                .andExpect(status().isCreated());

        // Couple B queries /api/v1/budget-items -> receives empty list, not Couple A's items!
        mockMvc.perform(get("/api/v1/budget-items")
                        .header("Authorization", "Bearer token-couple-b"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        // Couple A queries /api/v1/budget-items -> receives their 1 item
        mockMvc.perform(get("/api/v1/budget-items")
                        .header("Authorization", "Bearer token-couple-a"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].itemName").value("Flowers"));
    }
}
