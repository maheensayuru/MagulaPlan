package com.zerostate.magulaplan.repo;

import com.zerostate.magulaplan.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUser_UserIdOrderByCreatedAtDesc(Long userId);

    Optional<Notification> findByNotificationIdAndUser_UserId(Long notificationId, Long userId);
}
