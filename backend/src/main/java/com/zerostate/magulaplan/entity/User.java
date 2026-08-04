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
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    Long userId;

    @Column(name = "full_name", length = 100)
    String fullName;

    @Column(name = "partner_name", length = 100)
    String partnerName;

    @Column(name = "email", length = 100, unique = true, nullable = false)
    String email;

    @Column(name = "password_hash", length = 150, nullable = false)
    String passwordHash;

    @Column(name = "phone_number", length = 20)
    String phoneNumber;

    @Column(name = "role", length = 50)
    String role;

    @Column(name = "is_active")
    Boolean isActive;

    @Column(name = "wedding_date")
    LocalDate weddingDate;

    @Column(name = "total_budget", precision = 12, scale = 2)
    BigDecimal budget;

    @Column(name = "created_at")
    LocalDateTime createdAt;
}
