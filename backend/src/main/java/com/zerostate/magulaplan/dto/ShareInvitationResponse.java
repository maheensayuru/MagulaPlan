package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShareInvitationResponse {
    private String title;
    private String message;
    private String rsvpUrl;
    private String guestName;
    private String whatsappStatus;
}
