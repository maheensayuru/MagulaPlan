package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuestRequestDto {

    private Long userId;
    private String guestName;
    private String contactNumber;
    private String sideOfFamily;
    private String rsvpStatus;
    private String whatsappStatus;
    private Integer plusOnes;
    private String mealPreference;
}
