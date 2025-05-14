package org.example.controllers;

import java.security.Principal;
import java.util.List;

import org.example.daos.UserDao;
import org.example.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/profile")
@PreAuthorize("isAuthenticated()")
public class ProfileController {

    @Autowired
    private UserDao userDao;

    public ProfileController() {}

    public ProfileController(UserDao userDao) {
        this.userDao = userDao;
    }

    @GetMapping
    public User getProfile(Principal principal) {
        String username = principal.getName();
        return userDao.getUserByUsername(username);
    }

    @GetMapping("/roles")
    public List<String> getRoles(Principal principal) {
        String username = principal.getName();
        return userDao.getRoles(username);
    }

    @PutMapping("/change-password")
    public User changePassword(Principal principal, @RequestBody String newPassword) {
        String username = principal.getName();
        User user = userDao.getUserByUsername(username);
        user.setPassword(newPassword);

        return userDao.updatePassword(user);
    }
}