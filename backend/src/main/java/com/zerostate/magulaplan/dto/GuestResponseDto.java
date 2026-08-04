package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuestResponseDto {

    private UUID guestId;
    private String guestName;
    private String contactNumber;
    private String sideOfFamily;
    private String rsvpStatus;
    private String whatsappStatus;
    private Integer plusOnes;
    private String mealPreference;
}
