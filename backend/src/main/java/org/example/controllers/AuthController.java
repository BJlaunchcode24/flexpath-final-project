package org.example.controllers;

import java.util.List;

import org.example.daos.UserDao;
import org.example.models.LoginRequest;
import org.example.models.User;
import org.example.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend to access the API
public class AuthController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("[AuthController] login() method triggered"); // ✅ Logging at the start

        User user = userDao.getUserByUsername(loginRequest.getUsername());

        if (user != null && userDao.passwordMatches(loginRequest.getPassword(), user.getPassword())) {
            List<String> roles = userDao.getRoles(user.getUsername());
            String role = roles.isEmpty() ? "USER" : roles.get(0); // default role if none
            String token = jwtUtil.generateToken(user.getUsername(), role);

            System.out.println("[AuthController] login() SUCCESS for user: " + user.getUsername());

            return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), role));
        } else {
            System.out.println("[AuthController] login() FAILED for username: " + loginRequest.getUsername());
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    static class AuthResponse {
        private final String token;
        private final String username;
        private final String role;

        public AuthResponse(String token, String username, String role) {
            this.token = token;
            this.username = username;
            this.role = role;
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
    }
}
