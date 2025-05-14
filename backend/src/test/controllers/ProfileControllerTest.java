package org.example.controllers;

import java.security.Principal;
import java.util.List;

import org.example.daos.UserDao;
import org.example.models.User;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ProfileControllerTest {

    private UserDao userDao;
    private ProfileController controller;
    private Principal principal;

    @BeforeEach
    void setUp() {
        userDao = mock(UserDao.class);
        controller = new ProfileController(userDao);
        principal = mock(Principal.class);
        when(principal.getName()).thenReturn("testuser");
}

    @Test
    void getProfile_returnsUser() {
        User user = new User("testuser", "pass");
        when(userDao.getUserByUsername("testuser")).thenReturn(user);

        User result = controller.getProfile(principal);

        assertEquals(user, result);
    }

    @Test
    void getRoles_returnsRoles() {
        List<String> roles = List.of("USER");
        when(userDao.getRoles("testuser")).thenReturn(roles);

        List<String> result = controller.getRoles(principal);

        assertEquals(roles, result);
    }

    @Test
    void changePassword_updatesPassword() {
        User user = new User("testuser", "oldpass");
        User updatedUser = new User("testuser", "newpass");
        when(userDao.getUserByUsername("testuser")).thenReturn(user);
        when(userDao.updatePassword(any(User.class))).thenReturn(updatedUser);

        User result = controller.changePassword(principal, "newpass");

        assertEquals(updatedUser, result);
        assertEquals("newpass", result.getPassword());
    }
}