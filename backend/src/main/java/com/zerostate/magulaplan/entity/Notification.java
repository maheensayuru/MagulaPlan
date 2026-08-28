package com.zerostate.magulaplan.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long notificationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "message", length = 255, nullable = false)
    private String message;

    @Builder.Default
    @Column(name = "is_read", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean read = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
