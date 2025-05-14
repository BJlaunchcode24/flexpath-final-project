package org.example.daos;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.example.exceptions.DaoException;
import org.example.models.User;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Data access object for users.
 */
@Component
public class UserDao {
    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;

    public UserDao(DataSource dataSource, PasswordEncoder passwordEncoder) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getUsers() {
        return jdbcTemplate.query("SELECT * FROM users ORDER BY username;", this::mapToUser);
    }

    public User getUserByUsername(String username) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM users WHERE username = ?", this::mapToUser, username);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public User createUser(User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        String role = (user.getRole() != null && !user.getRole().isBlank()) ? user.getRole() : "USER";
        String sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?);";
        try {
            jdbcTemplate.update(sql, user.getUsername(), hashedPassword, role);
            user.setRole(role);
            return getUserByUsername(user.getUsername());
        } catch (DataAccessException e) {
            throw new DaoException("Failed to create user.");
        }
    }

    public User updatePassword(User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        String sql = "UPDATE users SET password = ? WHERE username = ?";
        int rowsAffected = jdbcTemplate.update(sql, hashedPassword, user.getUsername());
        if (rowsAffected == 0) {
            throw new DaoException("Zero rows affected, expected at least one.");
        } else {
            return getUserByUsername(user.getUsername());
        }
    }

    public int deleteUser(String username) {
        String sql = "DELETE FROM users WHERE username = ? ";
        return jdbcTemplate.update(sql, username);
    }

    public List<String> getRoles(String username) {
        return jdbcTemplate.queryForList("SELECT role FROM roles WHERE username = ?", String.class, username);
    }

    public List<String> addRole(String username, String role) {
        try {
            String sql = "INSERT INTO roles (username, role) VALUES (?,?)";
            jdbcTemplate.update(sql, username, role);
        } catch (DataAccessException e) {
        }
        return getRoles(username);
    }

    public boolean passwordMatches(String rawPassword, String encodedPassword) {
         return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public int deleteRole(String username, String role) {
        String sql = "DELETE FROM roles WHERE username = ? AND role = ?";
        return jdbcTemplate.update(sql, username, role);
    }


    private User mapToUser(ResultSet resultSet, int rowNumber) throws SQLException {
        Long id = resultSet.getLong("id");
        String username = resultSet.getString("username");
        String password = resultSet.getString("password");
        String role = resultSet.getString("role");

        User user = new User(username, password);
        user.setRole(role);
        user.setId(id);
        return user;
    }
}