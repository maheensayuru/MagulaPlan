package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.UserRequestDto;
import com.zerostate.magulaplan.dto.UserResponseDto;
import com.zerostate.magulaplan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

//    1. Create new user
    @PostMapping
    public ResponseEntity<UserResponseDto> saveUser(@RequestBody UserRequestDto userRequestDto){
        UserResponseDto userResponseDto = userService.saveUser(userRequestDto);
        return new ResponseEntity<>(userResponseDto, HttpStatus.CREATED);
//        201 Created
    }

//    2. Get all users
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUser(){
        List<UserResponseDto> users = userService.getAllUsers();
        return new ResponseEntity<> (users, HttpStatus.OK);
    }

//    3. Get User By ID
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDto> getUserById (@PathVariable Long userId, @RequestBody UserRequestDto userRequestDto){
        UserResponseDto user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

//    4. Update existing user
    @PutMapping("/{userId}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long userId, @RequestBody UserRequestDto userRequestDto){
        UserResponseDto updatedUser = userService.updateUser(userId, userRequestDto);
        return ResponseEntity.ok(updatedUser);
    }

//    5. Delete user
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId){
         userService.deleteUser(userId);
         return ResponseEntity.noContent().build();
    }
}
