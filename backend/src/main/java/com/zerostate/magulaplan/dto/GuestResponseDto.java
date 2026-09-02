package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuestResponseDto {

    private UUID guestId;
    private String guestName;
    private String contactNumber;
    private String sideOfFamily;
    private String rsvpStatus;
    private String whatsappStatus;
    private Integer plusOnes;
    private String mealPreference;
    private Long userId;

    public GuestResponseDto(UUID guestId, String guestName, String contactNumber,
                            String sideOfFamily, String rsvpStatus, String whatsappStatus,
                            Integer plusOnes, String mealPreference) {
        this.guestId = guestId;
        this.guestName = guestName;
        this.contactNumber = contactNumber;
        this.sideOfFamily = sideOfFamily;
        this.rsvpStatus = rsvpStatus;
        this.whatsappStatus = whatsappStatus;
        this.plusOnes = plusOnes;
        this.mealPreference = mealPreference;
    }
}
