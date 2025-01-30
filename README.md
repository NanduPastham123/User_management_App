# User_management_App
Assigning of roles for user based on RBAC system

## Overview

The User Management Application is a robust, feature-rich backend solution designed to manage  users efficiently. It includes modern features like JWT-based authentication, data validation,api caching using redis,models using SeqyelizeORM.
---

## Features

###### Core Functionality ########
#### User Management
- Register Users: Create new user accounts with validation.
- Login Authentication: Secure login with JSON Web Tokens (JWT).
- Admin Access: Fetch all users with role-based access (admin-only).

### Advanced Features

#### Authentication
- Secure login and access management with JWT tokens.
- Role-based authorization (admin, user).

#### Data Validation
- Middleware to validate incoming request payloads.

#### Error Handling
- Middleware for handling application errors and providing meaningful responses.

---

## Architecture

### Tech Stack
- **Backend Framework:** Node.js with Express.js
- **Database:** MYSQL Sequelize ORM (Database)
- **Authentication:** JSON Web Tokens (JWT)
- **Environment Configuration:** `dotenv`


### Installation 

# Prerequisites 
Node.js 
mysql 

# Steps 
 # Clone the repository: 
  - git clone https://github.com/NanduPastham123/User_management_App.git 
   
### Install dependencies: 

- npm install 
  
### Configure environment variables in a .env file: 
PORT=3000

# Database Configuration
DB_HOST=db
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=user_management

# JWT Secret Key
JWT_SECRET=supersecretkey

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379

### Ensure Redis is running before starting the application:
# run below command
redis-server

### Run Database Migrations
npx sequelize-cli db:migrate

6️⃣ Start the Application
### Start the application: 
- npm start 

