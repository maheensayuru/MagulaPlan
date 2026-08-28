package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.NotificationResponseDto;
import com.zerostate.magulaplan.entity.Notification;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.NotificationRepository;
import com.zerostate.magulaplan.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<NotificationResponseDto> getNotificationsForUser(Long userId) {
        return notificationRepository.findByUser_UserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public NotificationResponseDto markRead(Long userId, Long notificationId) {
        Notification notification = notificationRepository
                .findByNotificationIdAndUser_UserId(notificationId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + notificationId));
        notification.setRead(true);
        return mapToResponseDto(notificationRepository.save(notification));
    }

    @Override
    public List<NotificationResponseDto> markAllRead(Long userId) {
        List<Notification> notifications = notificationRepository.findByUser_UserIdOrderByCreatedAtDesc(userId);
        notifications.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(notifications);
        return notifications.stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    @Override
    public void deleteNotification(Long userId, Long notificationId) {
        Notification notification = notificationRepository
                .findByNotificationIdAndUser_UserId(notificationId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + notificationId));
        notificationRepository.delete(notification);
    }

    private NotificationResponseDto mapToResponseDto(Notification n) {
        return new NotificationResponseDto(n.getNotificationId(), n.getMessage(), n.getRead(), n.getCreatedAt());
    }
}
