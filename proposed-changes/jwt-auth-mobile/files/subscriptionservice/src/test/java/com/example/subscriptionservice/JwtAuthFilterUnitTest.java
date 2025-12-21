package com.example.subscriptionservice;

import com.example.subscriptionservice.security.JwtAuthFilter;
import com.example.subscriptionservice.security.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.io.IOException;

import static org.mockito.Mockito.*;

public class JwtAuthFilterUnitTest {

    @Test
    void rejectsWhenNoAuthHeader() throws Exception {
        JwtService jwt = mock(JwtService.class);
        JwtAuthFilter filter = new JwtAuthFilter(jwt);

        HttpServletRequest req = mock(HttpServletRequest.class);
        HttpServletResponse res = mock(HttpServletResponse.class);
        FilterChain chain = mock(FilterChain.class);

        when(req.getRequestURI()).thenReturn("/subscriptions");

        filter.doFilter(req, res, chain);

        verify(res).sendError(HttpServletResponse.SC_UNAUTHORIZED);
        verify(chain, never()).doFilter(any(), any(ServletResponse.class));
    }

    @Test
    void allowsWhenTokenValid() throws Exception {
        JwtService jwt = mock(JwtService.class);
        when(jwt.extractEmail(anyString())).thenReturn("test@test.com");

        JwtAuthFilter filter = new JwtAuthFilter(jwt);

        HttpServletRequest req = mock(HttpServletRequest.class);
        HttpServletResponse res = mock(HttpServletResponse.class);
        FilterChain chain = mock(FilterChain.class);

        when(req.getRequestURI()).thenReturn("/subscriptions");
        when(req.getHeader("Authorization")).thenReturn("Bearer abc.token");

        filter.doFilter(req, res, chain);

        verify(chain).doFilter(req, res);
        verify(res, never()).sendError(anyInt());
    }
}
