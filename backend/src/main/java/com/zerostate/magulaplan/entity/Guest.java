package com.zerostate.magulaplan.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Data
@Table(name = "guests")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Column(name = "guest_id",updatable = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private UUID guestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",  nullable = false)
    private User user;

    @Column(name = "guest_name", length = 100, nullable = false)
    private String guestName;

    @Column(name = "contact_number", length = 20)
    private String contactNumber;

    @Column(name = "side_of_family" , length = 20)
    private String sideOfFamily;

    @Column(name = "rsvp_status" , length = 20)
    private String rsvpStatus;

    @Column(name = "whatsapp_status" , length = 20)
    private String whatsappStatus;

    @Column(name = "plus_ones")
    private Integer plusOnes;

    @Column(name = "meal_preference", length = 50)
    private String mealPreference;
}
