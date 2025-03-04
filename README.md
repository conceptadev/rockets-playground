# Rockets Playground

A monorepo project containing frontend and backend applications.

## Project Structure

```
rockets-playground/
├── packages/
│   ├── frontend/     # React/Vite frontend application
│   └── backend/      # Backend application
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Start both services:

```bash
docker-compose up
```

2. Start services in detached mode:

```bash
docker-compose up -d
```

3. Access the applications:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Development

Each package can be run independently for development:

#### Frontend

```bash
cd packages/frontend
yarn install
yarn dev
```

#### Backend

```bash
cd packages/backend
yarn install
yarn start
```

## Docker Configuration

The project includes Docker configuration for both services:

- `packages/frontend/Dockerfile` - Frontend container configuration
- `packages/backend/Dockerfile` - Backend container configuration
- `docker-compose.yml` - Multi-container orchestration

## Environment Variables

### Frontend

- `NODE_ENV` - Development/production environment
- `VITE_API_URL` - Backend API URL

### Backend

- `NODE_ENV` - Development/production environment

## Contributing

1. Create a new branch
2. Make your changes
3. Submit a merge request

## Project Status

Active development
