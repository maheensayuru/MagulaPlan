package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.NotificationResponseDto;

import java.util.List;

public interface NotificationService {
    List<NotificationResponseDto> getNotificationsForUser(Long userId);

    NotificationResponseDto markRead(Long userId, Long notificationId);

    List<NotificationResponseDto> markAllRead(Long userId);

    void deleteNotification(Long userId, Long notificationId);
}
