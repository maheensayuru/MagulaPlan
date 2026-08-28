package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.NotificationResponseDto;
import com.zerostate.magulaplan.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<NotificationResponseDto>> getNotifications(@AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(notificationService.getNotificationsForUser(userId));
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationResponseDto> markRead(@AuthenticationPrincipal Long userId,
                                                            @PathVariable Long notificationId) {
        return ResponseEntity.ok(notificationService.markRead(userId, notificationId));
    }

    @PutMapping("/read-all")
    public ResponseEntity<List<NotificationResponseDto>> markAllRead(@AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(notificationService.markAllRead(userId));
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@AuthenticationPrincipal Long userId,
                                                   @PathVariable Long notificationId) {
        notificationService.deleteNotification(userId, notificationId);
        return ResponseEntity.noContent().build();
    }
}
