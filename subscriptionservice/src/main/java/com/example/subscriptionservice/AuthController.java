package com.example.subscriptionservice;

import com.example.subscriptionservice.security.JwtService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtService jwtService;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        String token = jwtService.generateToken(request.getEmail());
        return Map.of("token", token);
    }

    @GetMapping("/me")
    public Map<String, String> me(@RequestHeader(name = "Authorization", required = false) String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.UNAUTHORIZED);
        }

        String token = authorization.substring("Bearer ".length());
        String email = jwtService.extractEmail(token);
        return Map.of("email", email);
    }
}
