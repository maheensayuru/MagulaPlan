package com.zerostate.magulaplan.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "full_name", length = 100)
    private String fullName;

    @Column(name = "partner_name", length = 100)
    private String partnerName;

    @Column(name = "email", length = 150, unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", length = 255, nullable = false)
    private String passwordHash;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "role", length = 50)
    private String role;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "wedding_date")
    private LocalDate weddingDate;

    @Column(name = "total_budget", precision = 12, scale = 2)
    private BigDecimal budget;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
