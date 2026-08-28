package com.zerostate.magulaplan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsDto {
    private long totalVendors;
    private long totalUsers;
    private long pendingApprovals;
    private long totalBookings;
}
