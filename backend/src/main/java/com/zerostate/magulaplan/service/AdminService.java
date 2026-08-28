package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.AdminStatsDto;
import com.zerostate.magulaplan.dto.AdminUserDto;

import java.util.List;

public interface AdminService {
    AdminStatsDto getStats();

    List<AdminUserDto> getAllUsers();

    AdminUserDto suspendUser(Long userId);

    AdminUserDto reinstateUser(Long userId);
}
