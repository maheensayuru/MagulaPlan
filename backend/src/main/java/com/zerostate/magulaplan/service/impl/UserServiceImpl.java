package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.UserRequestDto;
import com.zerostate.magulaplan.dto.UserResponseDto;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserResponseDto saveUser(UserRequestDto userRequestDto) {
        return null;
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        return List.of();
    }

    @Override
    public UserResponseDto getUserById(Long userId) {
        return null;
    }

    @Override
    public UserResponseDto updateUser(Long userId, UserRequestDto userRequestDto) {
        return null;
    }

    @Override
    public void deleteUser(Long userId) {

    }
}
