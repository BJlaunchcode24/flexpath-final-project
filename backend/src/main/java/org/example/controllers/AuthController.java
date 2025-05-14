package org.example.controllers;

import java.util.List;

import org.example.daos.UserDao;
import org.example.models.LoginRequest;
import org.example.models.User;
import org.example.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") 
public class AuthController {

    @Autowired
    private final UserDao userDao;

    @Autowired
    private final JwtUtil jwtUtil;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("[AuthController] login() method triggered");
        try {
            User user = userDao.getUserByUsername(loginRequest.getUsername());

            if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                List<String> roles = userDao.getRoles(user.getUsername());
                String role = roles.isEmpty() ? "USER" : roles.get(0);
                String token = jwtUtil.generateToken(user.getUsername(), role);

                return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), role, user.getId()));
            } else {
                return ResponseEntity.status(401).body("Invalid username or password");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    public AuthController(UserDao userDao, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    static class AuthResponse {
        private final String token;
        private final String username;
        private final String role;
        private final Long id;

        public AuthResponse(String token, String username, String role, Long id) {
            this.token = token;
            this.username = username;
            this.role = role;
            this.id = id;
        }

        public String getToken() {
            return token;
        }

        public String getUsername() {
            return username;
        }

        public String getRole() {
            return role;
        }

        public Long getId() {
            return id;
        }
    }
}