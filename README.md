# Subscription Management System

A real-world full stack Subscription Management application built using React and Spring Boot.  
This project focuses on practical engineering concerns such as backend–frontend integration, validation, logging, debugging, and clean architecture rather than just feature implementation.

---

## Tech Stack

### Frontend
- React
- JavaScript (ES6)
- Axios

### Backend
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Jakarta Validation
- H2 In-Memory Database
- SLF4J Logging

---

## Architecture Overview

The application follows a layered architecture:

- **Controller Layer** – Handles HTTP requests and responses
- **Service Layer** – Contains business logic
- **Repository Layer** – Handles database interactions
- **Entity Layer** – Defines data models

Frontend and backend run as independent services and communicate via REST APIs.

---

## Features

- Create subscriptions
- View all subscriptions
- Delete subscriptions
- Backend validation with meaningful error responses
- Global exception handling
- Structured logging for debugging
- Global CORS configuration
- Clean service-based backend architecture

---

## Project Structure



---

## How to Run the Application

### Prerequisites
- Java 17
- Node.js (v16+ recommended)
- npm
- Git

---

### Backend Setup

```bash
cd subscriptionservice
./mvnw clean spring-boot:run
http://localhost:8081/subscriptions
cd frontend
npm install
npm start
http://localhost:3000

