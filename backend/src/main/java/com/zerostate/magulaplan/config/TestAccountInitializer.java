package com.zerostate.magulaplan.config;

import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.entity.Vendor;
import com.zerostate.magulaplan.entity.VendorCategory;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.repo.VendorCategoryRepository;
import com.zerostate.magulaplan.repo.VendorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class TestAccountInitializer {
    @Bean
    public CommandLineRunner initializeSeedData(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            VendorCategoryRepository vendorCategoryRepository) {
        return args -> {
            if (vendorCategoryRepository.count() == 0) {
                List<String> categories = List.of(
                        "Venue", "Photography", "Catering", "Decoration",
                        "Bridal Dressing", "Music & Entertainment", "Attire & Jewelry", "Transport"
                );
                for (String catName : categories) {
                    vendorCategoryRepository.save(new VendorCategory(null, catName, null));
                }
                System.out.println("Default vendor categories seeded successfully.");
            }

            // 2. Seed Admin Account
            seedUser(userRepository, passwordEncoder,
                    "admin@magulaplan.lk", "Admin@123", "MagulaPlan Admin", "ADMIN");

            // 3. Seed Couple Demo Account
            seedUser(userRepository, passwordEncoder,
                    "test@magulaplan.lk", "Password@123", "Kasun & Sandani", "USER");

            // 4. Seed Test Account
            seedUser(userRepository, passwordEncoder,
                    "test@example.com", "password123", "Test User", "USER");

            // 5. Seed Vendor Demo Account
            seedUser(userRepository, passwordEncoder,
                    "vendor@magulaplan.lk", "Vendor@123", "Royal Ceylon Studio", "VENDOR");

            System.out.println("==================================================");
            System.out.println("MagulaPlan Demo Accounts Ready:");
            System.out.println("Admin:  admin@magulaplan.lk  / Admin@123");
            System.out.println("Couple: test@magulaplan.lk   / Password@123");
            System.out.println("Vendor: vendor@magulaplan.lk / Vendor@123");
            System.out.println("==================================================");
        };
    }

    private User seedUser(UserRepository repo, PasswordEncoder encoder,
                          String email, String rawPassword, String name, String role) {
        return repo.findByEmailIgnoreCase(email).map(existing -> {
            // Ensure password and role are correct in case of schema reset or plain-text legacy
            if (!existing.getRole().equalsIgnoreCase(role)) {
                existing.setRole(role);
                repo.save(existing);
            }
            return existing;
        }).orElseGet(() -> {
            User user = User.builder()
                    .email(email)
                    .passwordHash(encoder.encode(rawPassword))
                    .fullName(name)
                    .role(role)
                    .isActive(true)
                    .createdAt(LocalDateTime.now())
                    .build();
            return repo.save(user);
        });
    }
}
