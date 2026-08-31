package com.zerostate.magulaplan.config;

import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDateTime;

@Configuration
public class TestAccountInitializer {

    @Bean
    public CommandLineRunner createTestAccount(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String testEmail = "test@example.com";
            if (userRepository.findByEmail(testEmail).isEmpty()) {
                User testUser = User.builder()
                        .email(testEmail)
                        .passwordHash(passwordEncoder.encode("password123"))
                        .fullName("Test User")
                        .role("USER")
                        .isActive(true)
                        .createdAt(LocalDateTime.now())
                        .build();
                userRepository.save(testUser);
                System.out.println("==================================================");
                System.out.println("Test account created: test@example.com / password123");
                System.out.println("==================================================");
            }
        };
    }
}
