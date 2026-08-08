package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.UserRequestDto;
import com.zerostate.magulaplan.dto.UserResponseDto;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponseDto saveUser(UserRequestDto userRequestDto) {

        User user = User.builder().fullName(userRequestDto.getFullName()).partnerName(userRequestDto.getPartnerName())
                .email(userRequestDto.getEmail()).passwordHash(userRequestDto.getPassword())
                .phoneNumber(userRequestDto.getPhoneNumber())
                .role(userRequestDto.getRole() != null ? userRequestDto.getRole() : "USER").isActive(true)
                .weddingDate(userRequestDto.getWeddingDate()).budget(userRequestDto.getTotalBudget())
                .createdAt(LocalDateTime.from(LocalTime.now())).build();
        User savedUser = userRepository.save(user);

        return mapToResponseDto(savedUser);
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

    private UserResponseDto mapToResponseDto(User user){
        return new UserResponseDto(user.getUserId(),user.getFullName(),user.getPartnerName(),user.getEmail(),user.getPhoneNumber(),user.getRole(),user.getIsActive(),user.getWeddingDate(),user.getBudget(),user.getCreatedAt()
        );
    }
}
