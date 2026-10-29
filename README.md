# Student Management System

A full-stack Student Management application with a React frontend and a Spring Boot REST API, using MySQL for database persistence.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite

### Backend
- Java 21
- Spring Boot 3.5.7
- Spring Web
- Spring Data JPA
- Spring Validation
- Maven
- Springdoc OpenAPI / Swagger UI

### Database
- MySQL

## Project Structure

```text
student-management/
├── frontend/
│   └── React + TypeScript + Vite application
├── backend/
│   ├── src/
│   │   ├── main/
│   │   └── test/
│   ├── pom.xml
│   └── ...
└── README.md
```

## Prerequisites

Install the following before running the project:

- Java 21
- Maven
- Node.js and npm
- MySQL

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Build the application:

```bash
mvn clean package
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### Database Configuration

Create the MySQL database and configure the database connection in the backend's application configuration.

Example database creation:

```sql
CREATE DATABASE student_management;
```

Configure the following properties with the credentials used in your environment:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Ensure that the configured MySQL user has permission to access the database.

## API Documentation

The project uses Springdoc OpenAPI to generate API documentation and provide Swagger UI.

The Maven dependency used with Spring Boot 3.5.7 is:

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.8.17</version>
</dependency>
```

Once the backend is running, access:

- **Swagger UI:** http://localhost:8080/swagger-ui/index.html
- **OpenAPI JSON:** http://localhost:8080/v3/api-docs

## Frontend Setup

Open a separate terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local URL in the terminal, usually:

```text
http://localhost:5173
```

## Running the Full-Stack Application

1. Start the MySQL server.
2. Create the `student_management` database and configure the backend credentials.
3. Start the Spring Boot backend on port `8080`.
4. Start the React frontend using Vite.
5. Configure the frontend API base URL to point to the backend.
6. Open the frontend URL displayed by Vite.

## Development Notes

- The backend is a Maven-based Spring Boot application.
- The frontend is built with React, TypeScript, and Vite.
- Spring Data JPA handles database persistence.
- Spring Validation supports request validation.
- Springdoc OpenAPI provides API documentation and Swagger UI.
- Keep database credentials out of version control.

## Future Improvements

Potential additions as development progresses:

- Authentication and authorization
- Search, filtering, and pagination
- Improved form validation and error handling
- Automated backend and frontend tests
- Docker-based deployment
- CI/CD integration

