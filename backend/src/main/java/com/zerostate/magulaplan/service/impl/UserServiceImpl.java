package com.zerostate.magulaplan.service.impl;

import com.zerostate.magulaplan.dto.UserRequestDto;
import com.zerostate.magulaplan.dto.UserResponseDto;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponseDto saveUser(UserRequestDto userRequestDto) {

        User user = User.builder().fullName(userRequestDto.getFullName()).partnerName(userRequestDto.getPartnerName())
                .email(userRequestDto.getEmail()).passwordHash(passwordEncoder.encode(userRequestDto.getPassword()))
                .phoneNumber(userRequestDto.getPhoneNumber())
                .role(userRequestDto.getRole() != null ? userRequestDto.getRole() : "USER").isActive(true)
                .weddingDate(userRequestDto.getWeddingDate()).budget(userRequestDto.getTotalBudget())
                .createdAt(LocalDateTime.now())
                .build();
        User savedUser = userRepository.save(user);

        return mapToResponseDto(savedUser);
    }

    @Override
    public List<UserResponseDto> getAllUsers() {

            return userRepository.findAll().stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    @Override
    public UserResponseDto getUserById(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not found " + userId));

        return mapToResponseDto(user);
    }

    @Override
    public UserResponseDto updateUser(Long userId, UserRequestDto userRequestDto) {

        User existingUser = userRepository.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User not found " + userId));
        existingUser.setFullName(userRequestDto.getFullName());
        existingUser.setPartnerName(userRequestDto.getPartnerName());

        if (userRequestDto.getEmail() != null && !userRequestDto.getEmail().isEmpty()) {
            existingUser.setEmail(userRequestDto.getEmail());
        }

        if (userRequestDto.getPassword() != null && !userRequestDto.getPassword().isEmpty()) {
            existingUser.setPasswordHash(passwordEncoder.encode(userRequestDto.getPassword()));
        }

        existingUser.setPhoneNumber(userRequestDto.getPhoneNumber());
        existingUser.setRole(userRequestDto.getRole());
        existingUser.setWeddingDate(userRequestDto.getWeddingDate());
        existingUser.setBudget(userRequestDto.getTotalBudget());

        User updatedUser = userRepository.save(existingUser);
        return mapToResponseDto(updatedUser);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    private UserResponseDto mapToResponseDto(User user){
        return new UserResponseDto(user.getUserId(),user.getFullName(),user.getPartnerName(),user.getEmail(),user.getPhoneNumber(),user.getRole(),user.getIsActive(),user.getWeddingDate(),user.getBudget(),user.getCreatedAt()
        );
    }
}
