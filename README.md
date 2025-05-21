# flexpath-final-project

## Project Overview

This is a full-stack Recipe web application built with **Spring Boot (Java)**, **React**, and **MySQL**.  
Users can register, log in, view, search, and delete recipes.  
Administrators can create, search and delete recipes.

---

## Tech Stack

- Java 17+, Spring Boot
- React (Vite)
- MySQL
- Bootstrap (for styling)

---

## Folder Structure

- `/backend` – Spring Boot REST API
- `/frontend` – React application
- `/database` – SQL scripts for database setup

---

## URLs Summary

- **Backend API:** (http://localhost:8080)
- **Frontend:** (http://localhost:5173)

---

## Quick Start




1. Clone the Repository
- git clone https://github.com/BJlaunchcode24/flexpath-final-project.git
- cd flexpath-final-project


2. Database Setup
- Make sure MySQL is running.

- Run the provided SQL script to create all tables and seed data:

- mysql -u <youruser> -p < database/create-database.sql

     (Replace <youruser> with your MySQL username, for example, root.)

This will create the mealplanner database, all tables, relationships, and insert default users and recipes.


3. Backend Setup
- Edit application.properties and set your MySQL username and password
- Replace YOUR_DB_USER, YOUR_DB_PASSWORD, and YOUR_SECRET_KEY with your own values.

- Start the backend server:
cd backend
./mvn spring-boot:run


- The backend server will be available at:
http://localhost:8080

4. Frontend Setup

- Start the frontend:
cd frontend
npm run dev

- Open http://localhost:5173 in your browser.



Default Users

- The SQL script creates these users:

Username	Password (bcrypt hash)	Role
admin	          (see SQL file)	ADMIN
user	           (see SQL file)	USER

Note: Passwords are stored as bcrypt hashes. You may want to update them to known values for testing, or use your backend to register new users.


Features

- User Registration & Login (with roles: USER, ADMIN)
- View Public Recipes
- Admin can Create, Search, Delete Recipes (public/private)
- Admin can manage all Recipes
- SQL file includes all table creation, relationships, and seed data




Troubleshooting

- Ensure MySQL is running and credentials are correct.
- If you get a database error, check that you ran the SQL script and are using the correct database name.
- Check backend logs for errors if the API does not respond.



License

- MIT

Contact

- For questions, please contact the project maintainer.

