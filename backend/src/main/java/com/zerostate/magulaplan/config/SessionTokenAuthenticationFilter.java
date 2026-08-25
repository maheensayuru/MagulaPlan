package com.zerostate.magulaplan.config;

import com.zerostate.magulaplan.repo.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Validates the bearer session token issued by {@code AuthController} against
 * the {@code users.session_token} column. On a match, populates the Spring
 * Security context so protected endpoints authenticate.
 *
 * <p>The principal is the user id (not the JPA entity) to avoid leaking the
 * lazy {@code guests} collection into the security context.
 */
public class SessionTokenAuthenticationFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";

    private final UserRepository userRepository;

    public SessionTokenAuthenticationFilter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith(BEARER_PREFIX)) {
            String token = header.substring(BEARER_PREFIX.length()).trim();
            userRepository.findBySessionToken(token)
                    .filter(user -> Boolean.TRUE.equals(user.getIsActive()))
                    .ifPresent(user -> {
                        String role = user.getRole() != null ? user.getRole() : "USER";
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        user.getUserId(),
                                        null,
                                        List.of(new SimpleGrantedAuthority("ROLE_" + role)));
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    });
        }

        filterChain.doFilter(request, response);
    }
}
