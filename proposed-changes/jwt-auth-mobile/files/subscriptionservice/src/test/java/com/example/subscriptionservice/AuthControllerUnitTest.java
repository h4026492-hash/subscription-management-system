package com.example.subscriptionservice;

import com.example.subscriptionservice.controller.AuthController;
import com.example.subscriptionservice.security.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class AuthControllerUnitTest {

    @Test
    void loginReturnsToken() {
        JwtService jwt = new JwtService() {
            @Override
            public String generateToken(String email) {
                return "dummy-token-for-" + email;
            }

            @Override
            public String extractEmail(String token) {
                return null;
            }
        };

        AuthController controller = new AuthController(jwt);
        LoginRequest req = new LoginRequest();
        req.setEmail("test@test.com");
        req.setPassword("test");

        Map<String, String> res = controller.login(req);
        assertEquals("dummy-token-for-test@test.com", res.get("token"));
    }

    @Test
    void meReturnsEmail() {
        JwtService jwt = new JwtService() {
            @Override
            public String generateToken(String email) {
                return null;
            }

            @Override
            public String extractEmail(String token) {
                return "test@test.com";
            }
        };

        AuthController controller = new AuthController(jwt);
        Map<String, String> res = controller.me("Bearer some-token");
        assertEquals("test@test.com", res.get("email"));
    }

    @Test
    void meWithoutAuthThrows() {
        JwtService jwt = new JwtService() {
            @Override
            public String generateToken(String email) { return null; }
            @Override
            public String extractEmail(String token) { return null; }
        };

        AuthController controller = new AuthController(jwt);
        assertThrows(ResponseStatusException.class, () -> controller.me(null));
    }
}
