# flexpath-final-project

## Project Overview

This is a full-stack application built with **Spring Boot (Java)**, **React**, and **MySQL**.  
Users can register, log in, view,search and manage recipes for public or private consumption.  
Administrators can create, search, delete recepies and manage users.

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

- **Backend API:** [http://localhost:8080](http://localhost:8080)
- **Frontend:** [http://localhost:5173](http://localhost:5173)



## Quick Start

### 1. Clone the Repository

```sh
git clone https://github.com/BJlaunchcode24
cd your-repo


2. Database Setup

•	Make sure MySQL is running.
•	Run the provided SQL script to create all tables and seed data:

mysql -u <youruser> -p < database/create-database.sql

•	This will create the flexpath_final database, all tables, relationships, and insert default users and recipes.



3. Backend Setup

•	Edit backend/src/main/resources/application.properties and set your MySQL username and password:

spring.datasource.url=jdbc:mysql://localhost:3306/flexpath_final
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=none

• Start the backend:

cd backend
./mvnw spring-boot:run

The backend server will be available at:  
http://localhost:8080

	(On Windows, use mvnw spring-boot:run)



4. Frontend Setup

•	Start the frontend:
cd frontend
npm install
npm run dev

•	Open http://localhost:5173 in your browser.


 
5. Default Users

The SQL script creates these users:
Username	    Password (bcrypt hash)	        Role
admin	           (see SQL file)	              ADMIN
user	           (see SQL file)	              USER


Note: Passwords are stored as bcrypt hashes. You may want to update them to known values for testing, or use your backend to register new users.


Features

•	User Registration & Login (with roles: USER, ADMIN)
•	View Public Recipes
•	Admin can Create, Search, Delete Recipes (public/private)
•	Admin can manage all users
•	SQL file includes all table creation, relationships, and seed data
________________________________________

Testing
•	Backend: Run ./mvnw test in /backend
•	Frontend: Run npm test in /frontend
________________________________________

Troubleshooting
•	Ensure MySQL is running and credentials are correct.
•	If you get a database error, check that you ran the SQL script and are using the correct database name.
•	Check backend logs for errors if the API does not respond.
________________________________________

SQL Code
All SQL code to create the initial models, table relationships, and seed data is in database/create-database.sql.
________________________________________

License
MIT
________________________________________

Contact
For questions, please open an issue or contact the project maintainer.
