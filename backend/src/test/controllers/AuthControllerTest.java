package org.example.controllers;

import java.util.List;

import org.example.daos.UserDao;
import org.example.models.LoginRequest;
import org.example.models.User;
import org.example.security.JwtUtil;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

class AuthControllerTest {

    private UserDao userDao;
    private JwtUtil jwtUtil;
    private PasswordEncoder passwordEncoder;
    private AuthController authController;

    @BeforeEach
    void setUp() {
        userDao = mock(UserDao.class);
        jwtUtil = mock(JwtUtil.class);
        passwordEncoder = mock(PasswordEncoder.class);
        authController = new AuthController(userDao, jwtUtil, passwordEncoder);
    }

    @Test
    void loginReturnsTokenForValidUser() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("admin");
        loginRequest.setPassword("password");

        User user = new User("admin", "hashed");
        when(userDao.getUserByUsername("admin")).thenReturn(user);
        when(passwordEncoder.matches("password", "hashed")).thenReturn(true);
        when(userDao.getRoles("admin")).thenReturn(List.of("ADMIN"));
        when(jwtUtil.generateToken("admin", "ADMIN")).thenReturn("jwt-token");

        ResponseEntity<?> response = authController.login(loginRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().toString().contains("jwt-token"));
    }

    @Test
    void loginReturns401ForInvalidPassword() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("admin");
        loginRequest.setPassword("wrong");

        User user = new User("admin", "hashed");
        when(userDao.getUserByUsername("admin")).thenReturn(user);
        when(passwordEncoder.matches("wrong", "hashed")).thenReturn(false);

        ResponseEntity<?> response = authController.login(loginRequest);

        assertEquals(401, response.getStatusCodeValue());
    }

    @Test
    void loginReturns401ForUnknownUser() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("nouser");
        loginRequest.setPassword("password");

        when(userDao.getUserByUsername("nouser")).thenReturn(null);

        ResponseEntity<?> response = authController.login(loginRequest);

        assertEquals(401, response.getStatusCodeValue());
    }
}