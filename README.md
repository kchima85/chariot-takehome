# Chariot Takehome

A full-stack web application built with NestJS backend and React frontend, showcasing modern web development practices and user management capabilities.

## 🏗️ Project Structure

This monorepo contains two main applications:

```
chariot-takehome/
├── chariot-api/          # NestJS backend API
└── chariot-client/       # React frontend client
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- Git

### Backend Setup (chariot-api)

1. Navigate to the API directory:
   ```bash
   cd chariot-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env
   ```

4. Start the development environment with Docker:
   ```bash
   make build-up
   # or
   docker-compose up --build
   ```

5. Run database migrations:
   ```bash
   make migration-run
   # or
   docker-compose exec api npm run migration:run
   ```

6. (Optional) Seed the database:
   ```bash
   make seed
   # or
   docker-compose exec api npm run seed:run
   ```

The API will be available at:
- **API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api

### Frontend Setup (chariot-client)

1. Navigate to the client directory:
   ```bash
   cd chariot-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The client will be available at:
- **Frontend**: http://localhost:5173

## 🔧 Backend (chariot-api)

### Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest (Unit & E2E)
- **Containerization**: Docker & Docker Compose

### Features

- ✅ Users CRUD operations
- ✅ Database migrations and seeding
- ✅ API documentation with Swagger
- ✅ Comprehensive testing setup
- ✅ Docker development environment
- ✅ Health check endpoints
- ✅ Input validation and error handling

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health` | Health check |
| POST   | `/users` | Create user |
| GET    | `/users` | Get all users |
| GET    | `/users/:id` | Get user by ID |
| PUT    | `/users/:id` | Update user |
| DELETE | `/users/:id` | Soft delete user |

### Database Schema

**Users Table**:
- `id` (UUID, Primary Key)
- `username` (String, Required)
- `email` (String, Required, Unique)
- `password` (String, Required)
- `firstName` (String, Optional)
- `lastName` (String, Optional)
- `bio` (Text, Optional)
- `avatar` (String, Optional)
- `isVerified` (Boolean, Default: false)
- `isActive` (Boolean, Default: true)
- `createdAt`, `updatedAt`, `deletedAt` (Timestamps)

### Development Commands

```bash
# Start development server
npm run start:dev

# Run tests
npm run test              # Unit tests
npm run test:e2e         # E2E tests
npm run test:cov         # Coverage

# Database operations
npm run migration:generate -- -n CreateUsersTable
npm run migration:run
npm run migration:revert
npm run seed:run

# Docker commands (via Makefile)
make build-up            # Start with Docker
make logs-api            # View API logs
make logs-db             # View database logs
make connect-db          # Connect to database
```

## 🎨 Frontend (chariot-client)

### Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Radix UI)
- **Routing**: React Router
- **State Management**: TanStack Query
- **Testing**: Vitest + Testing Library

### Features

- ✅ Modern React setup with TypeScript
- ✅ Responsive design with Tailwind CSS
- ✅ Component library with shadcn/ui
- ✅ Theme verification system
- ✅ Comprehensive testing setup
- ✅ Code quality tools (ESLint, Prettier)

### Pages & Components

- **HomePage**: Welcome page with feature overview
- **VerificationComponent**: Theme and component testing page
- **UI Components**: Button, Card, Badge (shadcn/ui)

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test             # Watch mode
npm run test:run         # Single run
npm run test:coverage    # With coverage
npm run test:ui          # UI mode

# Code quality
npm run lint             # Lint code
npm run lint:fix         # Fix linting issues
npm run format           # Format code
npm run type-check       # TypeScript check
```

## 🧪 Testing

### Backend Testing
- **Unit Tests**: Service and controller testing with Jest
- **E2E Tests**: Full application flow testing
- **Database Testing**: In-memory database for isolated tests

### Frontend Testing
- **Component Tests**: React component testing with Testing Library
- **Unit Tests**: Utility and hook testing
- **Mocking**: Comprehensive mocking utilities

## 🐳 Docker Development

The backend includes a complete Docker development environment:

```yaml
# Services
- api: NestJS application
- postgres: PostgreSQL database

# Features
- Hot reload for development
- Persistent database volume
- Environment variable configuration
```

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=chariot_takehome
```

## 🚀 Deployment

### Backend
1. Build the Docker image
2. Set production environment variables
3. Run database migrations
4. Start the container

### Frontend
1. Build the production bundle: `npm run build`
2. Serve the `dist` folder with a web server
3. Configure API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is part of a coding challenge/takehome assignment.