package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.entity.Vendor;
import com.zerostate.magulaplan.entity.VendorCategory;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.repo.VendorCategoryRepository;
import com.zerostate.magulaplan.repo.VendorRepository;
import com.zerostate.magulaplan.repo.NotificationRepository;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Full-context integration tests for the admin endpoints, exercising the real
 * {@code SessionTokenAuthenticationFilter} + role gating ({@code hasRole("ADMIN")}).
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AdminControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private VendorCategoryRepository vendorCategoryRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @BeforeEach
    void setUp() {
        vendorRepository.deleteAll();
        notificationRepository.deleteAll();
        userRepository.deleteAll();
        vendorCategoryRepository.deleteAll();

        VendorCategory category = vendorCategoryRepository.save(new VendorCategory(null, "Photography", null));

        userRepository.save(User.builder()
                .email("admin@test.com")
                .fullName("Admin User")
                .passwordHash("pw")
                .role("ADMIN")
                .isActive(true)
                .sessionToken("admin-token")
                .build());
        userRepository.save(User.builder()
                .email("user@test.com")
                .fullName("Regular User")
                .passwordHash("pw")
                .role("USER")
                .isActive(true)
                .sessionToken("user-token")
                .build());

        vendorRepository.save(Vendor.builder()
                .category(category)
                .businessName("Pending Studio")
                .districtLocation("Colombo")
                .contactPhone("0711111111")
                .contactEmail("pending@test.com")
                .startingPrice(new BigDecimal("10000.00"))
                .status("PENDING")
                .build());
        vendorRepository.save(Vendor.builder()
                .category(category)
                .businessName("Approved Studio")
                .districtLocation("Colombo")
                .contactPhone("0722222222")
                .contactEmail("approved@test.com")
                .startingPrice(new BigDecimal("20000.00"))
                .status("APPROVED")
                .build());
    }

    @Test
    @DisplayName("admin endpoints reject a non-admin user")
    void adminEndpoints_rejectNonAdmin() throws Exception {
        mockMvc.perform(get("/api/v1/admin/stats").header("Authorization", "Bearer user-token"))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("GET /admin/stats returns counts for an admin")
    void stats_returnsCounts() throws Exception {
        mockMvc.perform(get("/api/v1/admin/stats").header("Authorization", "Bearer admin-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalUsers").value(2))
                .andExpect(jsonPath("$.pendingApprovals").value(1));
    }

    @Test
    @DisplayName("GET /admin/vendors/pending returns only PENDING vendors")
    void pendingVendors_returnsPendingOnly() throws Exception {
        mockMvc.perform(get("/api/v1/admin/vendors/pending").header("Authorization", "Bearer admin-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].businessName").value("Pending Studio"));
    }

    @Test
    @DisplayName("PUT approve changes vendor status to APPROVED")
    void approveVendor_changesStatus() throws Exception {
        Long pendingId = vendorRepository.findByStatus("PENDING").get(0).getVendorId();
        mockMvc.perform(put("/api/v1/admin/vendors/" + pendingId + "/approve")
                        .header("Authorization", "Bearer admin-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("APPROVED"));
    }

    @Test
    @DisplayName("GET /admin/users returns users with name/email/status")
    void users_returnsAdminShape() throws Exception {
        mockMvc.perform(get("/api/v1/admin/users").header("Authorization", "Bearer admin-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].status").value("ACTIVE"));
    }
}
