package com.zerostate.magulaplan.config;

import com.zerostate.magulaplan.repo.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.cors.allowed-origins:http://localhost:5173,http://localhost:3000}")
    private List<String> allowedOrigins;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, UserRepository userRepository) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public auth endpoints
                .requestMatchers("/api/v1/auth/**").permitAll()
                // Public vendor/category read endpoints (for browsing without login)
                .requestMatchers(HttpMethod.GET, "/api/v1/vendors/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/vendor-categories/**").permitAll()
                // Allow prospective vendors to self-register
                .requestMatchers(HttpMethod.POST, "/api/v1/vendors").permitAll()
                // Allow invited guests to view invitations and submit digital RSVPs without couple login
                .requestMatchers(HttpMethod.GET, "/api/v1/guests/*/share").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/guests/*").permitAll()
                .requestMatchers(HttpMethod.PATCH, "/api/v1/guests/*/rsvp").permitAll()
                // Admin endpoints are gated on the ADMIN role
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                // Everything else requires authentication
                .anyRequest().authenticated()
            )
            // Validate the bearer session token before username/password auth
            .addFilterBefore(new SessionTokenAuthenticationFilter(userRepository), UsernamePasswordAuthenticationFilter.class)
            // Disable the browser login form / HTTP Basic — we use token auth
            .httpBasic(basic -> basic.disable())
            .formLogin(form -> form.disable());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        if (allowedOrigins != null && !allowedOrigins.isEmpty()) {
            config.setAllowedOrigins(allowedOrigins);
        }
        config.setAllowedOriginPatterns(List.of(
            "http://localhost:*",
            "https://localhost:*",
            "https://*.netlify.app",
            "http://*.infinityfreeapp.com",
            "https://*.infinityfreeapp.com",
            "http://*.great-site.net",
            "https://*.great-site.net",
            "http://*.epizy.com",
            "https://*.epizy.com",
            "http://*.rf.gd",
            "https://*.rf.gd"
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
