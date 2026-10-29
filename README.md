# Student Management System

A Spring Boot REST API for managing student records, deployed on Ubuntu Server using Docker and MySQL.

## Tech Stack

- Java 21
- Spring Boot 3.5.7
- Spring Data JPA / Hibernate
- MySQL 9.7
- Maven
- Docker
- Swagger UI / OpenAPI

## Project Structure

```text
student-management/
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── .dockerignore
└── README.md
```

## 1. Create the Dockerfile

Create `backend/Dockerfile`:

```dockerfile
# Build stage
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/student-management-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

Create `backend/.dockerignore`:

```text
target/
.git/
.idea/
.vscode/
*.iml
```

## 2. Configure the Database Connection

In `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://mysql:3306/student_management
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.open-in-view=false
```

The hostname `mysql` refers to the MySQL container on the shared Docker network.

## 3. Build the Docker Image

Navigate to the backend directory:

```bash
cd ~/hosted-apps/student-management/backend
```

Build the image:

```bash
docker build --no-cache -t student-management:1.0 .
```

Verify the image:

```bash
docker images
```

## 4. Check the Existing MySQL Container

```bash
docker ps
```

Check its port mapping:

```bash
docker port mysql
```

Example:

```text
3306/tcp -> 0.0.0.0:3307
```

In this example, port `3307` is exposed on the Ubuntu host, while MySQL listens on port `3306` inside Docker.

## 5. Create the Database

Connect to MySQL from the Ubuntu host:

```bash
mysql -h 127.0.0.1 -P 3307 -u root -p
```

Enter your MySQL root password.

Create the database:

```sql
CREATE DATABASE student_management;

SHOW DATABASES;

EXIT;
```

## 6. Create the Docker Network

Create a network so the Spring Boot and MySQL containers can communicate:

```bash
docker network create student-network
```

Connect the existing MySQL container to it:

```bash
docker network connect student-network mysql
```

Verify the network:

```bash
docker network inspect student-network
```

If the network already exists or MySQL is already connected, do not recreate or reconnect it.

## 7. Run the Spring Boot Container

Read the MySQL root password without displaying it in the terminal:

```bash
read -rsp "MySQL root password: " DB_PASSWORD
echo
```

Run the application:

```bash
docker run -d \
  --name student-management \
  --network student-network \
  -p 8080:8080 \
  -e DB_PASSWORD \
  student-management:1.0
```

Clear the shell variable:

```bash
unset DB_PASSWORD
```

## 8. Verify the Application

Check the running container:

```bash
docker ps
```

View application logs:

```bash
docker logs -f student-management
```

Look for messages indicating that Hibernate connected to MySQL and Tomcat started on port `8080`.

Press `Ctrl+C` to stop following the logs. This does not stop the container.

## 9. Access Swagger UI

Open this URL in your browser:

```text
http://SERVER-IP:8080/swagger-ui/index.html
```

Replace `SERVER-IP` with your Ubuntu Server's IP address.

OpenAPI specification:

```text
http://SERVER-IP:8080/v3/api-docs
```

## 10. Database and Port Reference

| Component | Value |
|---|---|
| Docker image | `student-management:1.0` |
| Application container | `student-management` |
| MySQL container | `mysql` |
| Docker network | `student-network` |
| Database | `student_management` |
| MySQL host port | `3307` |
| MySQL container port | `3306` |
| Spring Boot port | `8080` |
| Container-to-container DB URL | `jdbc:mysql://mysql:3306/student_management` |

**Important:** Host port `3307` is for connecting from the Ubuntu host. The Spring Boot container uses `mysql:3306` through the shared Docker network.

## Current Deployment Status

- [x] Docker image built
- [x] MySQL database created
- [x] Docker network configured
- [x] Spring Boot container started
- [x] Application connected to MySQL
- [x] Swagger UI accessible
