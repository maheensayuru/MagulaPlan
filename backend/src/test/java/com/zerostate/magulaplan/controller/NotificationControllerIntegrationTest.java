package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.entity.Notification;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.repo.NotificationRepository;
import com.zerostate.magulaplan.repo.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class NotificationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @BeforeEach
    void setUp() {
        notificationRepository.deleteAll();
        userRepository.deleteAll();

        User user = userRepository.save(User.builder()
                .email("n@test.com")
                .fullName("N User")
                .passwordHash("pw")
                .role("USER")
                .isActive(true)
                .sessionToken("n-token")
                .build());

        notificationRepository.save(Notification.builder()
                .user(user)
                .message("Vendor approved")
                .read(false)
                .createdAt(LocalDateTime.now().minusHours(1))
                .build());
        notificationRepository.save(Notification.builder()
                .user(user)
                .message("Budget updated")
                .read(true)
                .createdAt(LocalDateTime.now())
                .build());
    }

    @Test
    @DisplayName("GET /notifications returns only the current user's notifications")
    void list_returnsCurrentUsersNotifications() throws Exception {
        mockMvc.perform(get("/api/v1/notifications").header("Authorization", "Bearer n-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    @DisplayName("PUT /notifications/{id}/read marks a notification read")
    void markRead_setsReadTrue() throws Exception {
        Long id = notificationRepository.findAll().stream()
                .filter(n -> !Boolean.TRUE.equals(n.getRead()))
                .findFirst().orElseThrow().getNotificationId();

        mockMvc.perform(put("/api/v1/notifications/" + id + "/read").header("Authorization", "Bearer n-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.read").value(true));
    }

    @Test
    @DisplayName("DELETE /notifications/{id} removes a notification")
    void delete_removesNotification() throws Exception {
        Long id = notificationRepository.findAll().get(0).getNotificationId();

        mockMvc.perform(delete("/api/v1/notifications/" + id).header("Authorization", "Bearer n-token"))
                .andExpect(status().isNoContent());
    }
}
