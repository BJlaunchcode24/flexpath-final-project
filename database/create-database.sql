-- Create database and use it
CREATE DATABASE IF NOT EXISTS flexpath_final;
USE flexpath_final;

-- Drop tables if they exist
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER'
);

-- Recipes table
CREATE TABLE recipes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients TEXT,
    instructions TEXT,
    cooking_time INT,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Seed users (with role)


insert into users (username, password, role) values ('admin', '$2a$10$tBTfzHzjmQVKza3VSa5lsOX6/iL93xPVLlLXYg2FhT6a.jb1o6VDq', 'ADMIN');
insert into users (username, password, role) values ('user', '$2a$10$tBTfzHzjmQVKza3VSa5lsOX6/iL93xPVLlLXYg2FhT6a.jb1o6VDq', 'USER');

