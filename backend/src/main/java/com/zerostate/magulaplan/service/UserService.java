package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.UserRequestDto;
import com.zerostate.magulaplan.dto.UserResponseDto;

import java.util.List;

public interface UserService {
    UserResponseDto saveUser(UserRequestDto userRequestDto);
    List<UserResponseDto> getAllUsers();
    UserResponseDto getUserById(Long userId);
    UserResponseDto updateUser(Long userId, UserRequestDto userRequestDto);
    void deleteUser(Long userId);
}
