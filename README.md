# User Authentication System

A secure REST API authentication system built with Node.js, Express, and MongoDB. This system provides user registration, login, and JWT-based authentication.

## Features

- User registration with secure password hashing
- User login with JWT token generation
- MongoDB for data persistence
- Express middleware for routing
- Custom error handling

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt.js

## API Endpoints

### Authentication Routes

- **POST /api/auth/signup** - Register a new user
  - Request body: `{ "name": "string", "email": "string", "password": "string" }`
  - Returns: User object and JWT token

- **POST /api/auth/login** - Authenticate a user
  - Request body: `{ "email": "string", "password": "string" }`
  - Returns: User object and JWT token

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bhagavath-rugvedi/auth-system.git
   cd auth-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure MongoDB is running on your system

4. Start the server:
   ```bash
   npm run dev
   ```

The server will be running at `http://localhost:3000`.

## Environment Setup

Make sure MongoDB is installed and running on your system. The application connects to a local MongoDB instance at `mongodb://127.0.0.1:27017/authentication-system`.

## Future Enhancements

- Add user logout functionality
- Implement route protection middleware for authenticated routes
- Add password reset capabilities
- Implement email verification

## Author

Bhagavath Rugvedi