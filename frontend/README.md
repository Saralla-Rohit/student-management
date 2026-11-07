# Student Management – Frontend

A React + TypeScript frontend for the Student Management application.

The frontend communicates with the Spring Boot backend through its public REST API. It is built using Vite and packaged into a Docker image using a multi-stage Docker build. The production build is served using Nginx.

## 1. Technology Stack

- React
- TypeScript
- Vite
- HTML
- CSS
- Fetch API
- Docker
- Nginx

## 2. Project Structure

```text
frontend/
├── public/
├── src/
│   ├── api/
│   │   └── studentApi.ts
│   ├── components/
│   │   └── Navbar.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Students.tsx
│   │   └── StudentForm.tsx
│   ├── types/
│   │   └── Student.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .dockerignore
├── Dockerfile
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## 3. Backend API Configuration

The frontend communicates with the deployed Spring Boot backend.

**API base URL:**

```typescript
const API_URL = "https://student-mgmt.rohitnet.dpdns.org/api/students";
```

The frontend uses the Fetch API to perform CRUD operations:

- `GET` – Retrieve all students.
- `GET /{id}` – Retrieve a student by ID.
- `POST` – Add a student.
- `PUT /{id}` – Update a student.
- `DELETE /{id}` – Delete a student.

The API implementation is located in:

```text
src/api/studentApi.ts
```

## 4. Run Frontend Locally on Fedora

Navigate to the frontend project directory.

```bash
cd ~/Downloads/student-management/frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the frontend:

```text
http://localhost:5173
```

## 5. Build the Frontend

Before creating the Docker image, generate the production build.

```bash
npm run build
```

The build command executes:

```text
tsc -b && vite build
```

This performs TypeScript project compilation and generates the optimized production frontend.

The generated files are stored in:

```text
dist/
```

Preview the production build locally if required:

```bash
npm run preview
```

## 6. Docker Configuration

The frontend uses a multi-stage Docker build.

### Dockerfile

```dockerfile
# Stage 1: Build React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY . .

# Generate production build
RUN npm run build


# Stage 2: Serve application using Nginx
FROM nginx:alpine

# Copy production build into Nginx web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### .dockerignore

```dockerignore
node_modules
dist
.git
.env
.env.*
```

The `.dockerignore` file prevents unnecessary files from being included in the Docker build context.

## 7. Build Docker Image

Navigate to the frontend directory:

```bash
cd ~/Downloads/student-management/frontend
```

Build the Docker image:

```bash
docker build -t student-frontend:1.0 .
```

Check the generated image:

```bash
docker images
```

Expected image:

```text
student-frontend   1.0
```

## 8. Run Frontend Container

Run the frontend container:

```bash
docker run -d \
  --name student-frontend \
  -p 5173:80 \
  student-frontend:1.0
```

### Port Mapping

```text
Host Port:      5173
Container Port: 80
```

The production frontend is served by Nginx inside the container on port `80`.

The host port `5173` forwards requests to the container's port `80`.

**Important:** The container does not run the Vite development server. It serves the optimized production build through Nginx.

## 9. Verify Docker Container

Check running containers:

```bash
docker ps
```

Check frontend container logs:

```bash
docker logs student-frontend
```

Open the frontend in the browser:

```text
http://localhost:5173
```

The React application should now be accessible through the Nginx container.

## 10. Docker Container Management

Stop the frontend container:

```bash
docker stop student-frontend
```

Start it again:

```bash
docker start student-frontend
```

Remove the container:

```bash
docker rm -f student-frontend
```

Remove the Docker image:

```bash
docker rmi student-frontend:1.0
```

## 11. Current Deployment Status

| Component | Status |
|---|---|
| React frontend development | Completed |
| TypeScript configuration | Completed |
| Backend REST API integration | Configured |
| Production build using Vite | Completed |
| Multi-stage Dockerfile | Completed |
| Docker image creation | Completed |
| Nginx production server | Completed |
| Local Docker container execution | Completed |
| Docker Hub image push | Pending |
| Kubernetes frontend deployment | Pending |
| Kubernetes frontend service | Pending |
| Cloudflare public frontend hostname | Pending |
| Jenkins CI/CD integration | Pending |

## 12. Architecture

```text
                 Fedora Laptop
                      |
                      |
               React + TypeScript
                      |
                      |
                 npm run build
                      |
                      |
                 Vite dist/
                      |
                      |
                Docker Build
                      |
             Multi-stage Dockerfile
                      |
                      |
                Nginx Container
                      |
                Host Port 5173
                      |
                      |
              http://localhost:5173
                      |
                      |
              Fetch API Requests
                      |
                      |
           Spring Boot Backend API
                      |
                      |
          student-mgmt.rohitnet.dpdns.org
```

## 13. Future Deployment Plan

The next steps for frontend deployment are:

1. Push the frontend Docker image to Docker Hub.
2. Create a Kubernetes Deployment for the frontend.
3. Create a Kubernetes Service to expose the frontend inside the cluster.
4. Configure Cloudflare Tunnel to expose the frontend publicly.
5. Verify frontend-to-backend communication.
6. Configure Jenkins to automate frontend build and deployment.

**Note:** The frontend has currently been built and tested locally using Docker and Nginx. Kubernetes and public frontend deployment are not yet completed.
