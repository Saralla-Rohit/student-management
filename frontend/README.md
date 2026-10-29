# StudentHub frontend

React + TypeScript + Vite UI for the Spring Boot Student Management API.

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- npm
- The Spring Boot backend and MySQL database running separately

## Run on Fedora/Linux
1. Extract `student-management-ui.zip`.
2. Open a terminal in the extracted `student-management-ui` directory.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open http://localhost:5173

## Backend
The frontend expects the API at `http://localhost:8080/api/students`.

Endpoints:
- GET `/api/students`
- GET `/api/students/{id}`
- POST `/api/students`
- PUT `/api/students/{id}`
- DELETE `/api/students/{id}`

The backend must allow CORS from `http://localhost:5173`. In the Spring Boot controller, for example:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

## Build for production
```bash
npm run build
npm run preview
```

This ZIP contains only the frontend. It does not include the Spring Boot backend or MySQL database.
