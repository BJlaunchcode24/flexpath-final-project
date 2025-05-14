package org.example.controllers;

import java.util.List;

import org.example.daos.UserDao;
import org.example.models.User;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import org.springframework.web.server.ResponseStatusException;

class UserControllerTest {

    private UserDao userDao;
    private UserController controller;

    @BeforeEach
    void setUp() {
        userDao = mock(UserDao.class);
        controller = new UserController(userDao); 
}
    @Test
    void getAll_returnsUserList() {
        List<User> users = List.of(new User("user1", "pass1"), new User("user2", "pass2"));
        when(userDao.getUsers()).thenReturn(users);

        List<User> result = controller.getAll();

        assertEquals(users, result);
    }

    @Test
    void create_conflictIfUsernameExists() {
        User user = new User("existing", "pass");
        when(userDao.getUserByUsername("existing")).thenReturn(user);

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () -> controller.create(user));
        assertEquals(409, ex.getStatusCode().value());
    }

    @Test
    void create_setsDefaultRoleIfMissing() {
        User user = new User("newuser", "pass");
        user.setRole(null);
        when(userDao.getUserByUsername("newuser")).thenReturn(null);
        when(userDao.createUser(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User result = controller.create(user);

        assertEquals("USER", result.getRole());
        assertEquals("newuser", result.getUsername());
    }

    @Test
    void create_returnsCreatedUser() {
        User user = new User("newuser", "pass");
        user.setRole("ADMIN");
        when(userDao.getUserByUsername("newuser")).thenReturn(null);
        when(userDao.createUser(any(User.class))).thenReturn(user);

        User result = controller.create(user);

        assertEquals(user, result);
    }
}