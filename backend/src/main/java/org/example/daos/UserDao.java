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
    /**
     * The JDBC template for querying the database.
     */
    private final JdbcTemplate jdbcTemplate;

    /**
     * The password encoder for the DAO.
     */
    private final PasswordEncoder passwordEncoder;

    /**
     * Creates a new user data access object.
     *
     * @param dataSource The data source for the DAO.
     * @param passwordEncoder The password encoder for the DAO.
     */
    public UserDao(DataSource dataSource, PasswordEncoder passwordEncoder) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Gets all users.
     *
     * @return List of User
     */
    public List<User> getUsers() {
        return jdbcTemplate.query("SELECT * FROM users ORDER BY username;", this::mapToUser);
    }

    /**
     * Gets a user by username.
     *
     * @param username The username of the user.
     * @return User
     */
    public User getUserByUsername(String username) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM users WHERE username = ?", this::mapToUser, username);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    /**
     * Creates a new user.
     * @param user The user to create.
     * @return User The created user.
     */
    public User createUser(User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        String sql = "INSERT INTO users (username, password) VALUES (?, ?);";
        try {
            jdbcTemplate.update(sql, user.getUsername(), hashedPassword);

            // Set default role USER unless already set
            String role = (user.getRole() != null && !user.getRole().isBlank()) ? user.getRole() : "USER";
            jdbcTemplate.update("INSERT INTO roles (username, role) VALUES (?, ?);", user.getUsername(), role);

            user.setRole(role); // Set role for returning object
            return getUserByUsername(user.getUsername());
        } catch (DataAccessException e) {
            throw new DaoException("Failed to create user.");
        }
    }

    /**
     * Updates a user's password.
     *
     * @param user The user to update.
     * @return User
     */
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

    /**
     * Deletes a user.
     *
     * @param username The username of the user.
     */
    public int deleteUser(String username) {
        String sql = "DELETE FROM users WHERE username = ? ";
        return jdbcTemplate.update(sql, username);
    }

    /**
     * Gets all roles for a user.
     *
     * @param username The username of the user.
     * @return List of String
     */
    public List<String> getRoles(String username) {
        return jdbcTemplate.queryForList("SELECT role FROM roles WHERE username = ?;", String.class, username);
    }

    /**
     * Adds a role to a user.
     *
     * @param username The username of the user.
     * @param role The role to add.
     * @return List of String
     */
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

    /**
     * Deletes a role from a user.
     *
     * @param username The username of the user.
     * @param role The role to delete.
     */
    public int deleteRole(String username, String role) {
        String sql = "DELETE FROM roles WHERE username = ? AND role = ?";
        return jdbcTemplate.update(sql, username, role);
    }

    /**
     * Maps a row in the ResultSet to a User object.
     *
     * @param resultSet The result set to map.
     * @param rowNumber The row number.
     * @return User The user object.
     * @throws SQLException If an error occurs while mapping the result set.
     */
    private User mapToUser(ResultSet resultSet, int rowNumber) throws SQLException {
        String username = resultSet.getString("username");
        String password = resultSet.getString("password");

        // Fetch role
        String role = null;
        try {
            role = jdbcTemplate.queryForObject("SELECT role FROM roles WHERE username = ? LIMIT 1", String.class, username);
        } catch (EmptyResultDataAccessException ignored) {}

        User user = new User(username, password);
        user.setRole(role);
        return user;
    }
}