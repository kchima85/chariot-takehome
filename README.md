# Chariot Takehome

A full-stack payments management application built with NestJS backend and React frontend, showcasing modern web development practices with sophisticated UI components and database management.

## 🚀 One-Command Setup

To set up the entire project from scratch, simply run:

```bash
make setup
```

This single command will:

1. **📦 Install dependencies** for both API and client
2. **🐳 Start Docker containers** (API + PostgreSQL database)
3. **🗄️ Run database migrations** to create the required tables
4. **🌱 Seed the database** with sample payment data
5. **⚡ Start the frontend** development server

## 📍 Access URLs

After setup completes:

-   **API**: http://localhost:3000
-   **Frontend**: http://localhost:5173
-   **API Docs**: http://localhost:3000/api (Swagger/OpenAPI)

## 🛠️ Additional Commands

### Check Status

```bash
make status
```

Shows whether Docker containers and development servers are running.

### Stop All Services

```bash
make stop
```

Stops Docker containers and any running frontend processes.

### Complete Restart

```bash
make restart-setup
```

Stops everything and runs the complete setup again.

## 🏗️ Project Structure

This monorepo contains two main applications:

```
chariot-takehome/
├── chariot-api/          # NestJS backend API
├── chariot-client/       # React frontend client
├── Makefile             # Root commands
└── README.md            # This file
```

## 🧩 Manual Setup (Advanced)

If you prefer to run steps individually:

```bash
# 1. Install dependencies
make install

# 2. Start Docker (API + PostgreSQL)
make docker-up

# 3. Run migrations
make db-migrate

# 4. Seed database
make db-seed

# 5. Start frontend
make dev-client
```

## 🚀 Quick Start

### Prerequisites

-   Node.js (v18+)
-   Docker & Docker Compose
-   Git

## 🐛 Troubleshooting

### Port Already in Use

If you see port conflicts:

```bash
make stop
make setup
```

### Database Connection Issues

```bash
# Stop and restart Docker containers
make docker-down
make docker-up
# Wait a moment for PostgreSQL to start
make db-migrate
```

### Fresh Start

```bash
make clean
make setup
```

## 🎨 Features

### Frontend (React + TypeScript)

-   **Modern UI Components**: Domain-specific abstractions over shadcn/ui
-   **Payment Management**: Filter, sort, and paginate payments
-   **Real-time Highlighting**: Upcoming payments (24hr) are highlighted
-   **Smart Totals**: Dynamic calculation of filtered payment amounts
-   **Responsive Design**: Mobile-friendly interface
-   **Type Safety**: Full TypeScript coverage

### Backend (NestJS + PostgreSQL)

-   **RESTful API**: Clean, documented endpoints
-   **Database Migrations**: TypeORM with automated migrations
-   **Data Seeding**: Sample payment data for development
-   **Swagger Documentation**: Auto-generated API docs
-   **Docker Development**: Complete containerized environment

### Backend Setup (Manual)

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

-   **API**: http://localhost:3000
-   **Swagger Documentation**: http://localhost:3000/api

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

-   **Frontend**: http://localhost:5173

## 🔧 Backend (chariot-api)

### Tech Stack

-   **Framework**: NestJS with TypeScript
-   **Database**: PostgreSQL with TypeORM
-   **Documentation**: Swagger/OpenAPI
-   **Testing**: Jest (Unit & E2E)
-   **Containerization**: Docker & Docker Compose

### Features

-   ✅ Users CRUD operations
-   ✅ Database migrations and seeding
-   ✅ API documentation with Swagger
-   ✅ Comprehensive testing setup
-   ✅ Docker development environment
-   ✅ Health check endpoints
-   ✅ Input validation and error handling

### API Endpoints

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| GET    | `/health`              | Health check              |
| GET    | `/payments`            | Get paginated payments    |
| GET    | `/payments/recipients` | Get all unique recipients |

### Database Schema

**Payments Table**:

-   `id` (UUID, Primary Key)
-   `recipient` (String, Required)
-   `amount` (Decimal, Required)
-   `currency` (String, Required, Default: 'USD')
-   `status` (String, Required)
-   `scheduledDate` (Date, Required)
-   `createdAt`, `updatedAt` (Timestamps)

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

-   **Framework**: React 19 with TypeScript
-   **Build Tool**: Vite 7
-   **Styling**: Tailwind CSS v4
-   **Components**: shadcn/ui (Radix UI)
-   **Routing**: React Router
-   **State Management**: TanStack Query
-   **Testing**: Vitest + Testing Library

### Features

-   ✅ Modern React setup with TypeScript
-   ✅ Responsive design with Tailwind CSS
-   ✅ Component library with shadcn/ui
-   ✅ Theme verification system
-   ✅ Comprehensive testing setup
-   ✅ Code quality tools (ESLint, Prettier)

### Pages & Components

-   **HomePage**: Welcome page with feature overview
-   **VerificationComponent**: Theme and component testing page
-   **UI Components**: Button, Card, Badge (shadcn/ui)

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

Run all tests:

```bash
make test-all
```

Individual test suites:

```bash
make test-api      # Backend unit tests
make test-client   # Frontend tests
make test-e2e      # End-to-end tests
```

### Backend Testing

-   **Unit Tests**: Service and controller testing with Jest
-   **E2E Tests**: Full application flow testing
-   **Database Testing**: In-memory database for isolated tests

### Frontend Testing

-   **Component Tests**: React component testing with Testing Library
-   **Unit Tests**: Utility and hook testing
-   **Mocking**: Comprehensive mocking utilities

## 🧪 Testing

This project includes a comprehensive test suite with **127 total tests** across frontend, backend, and end-to-end testing:

### Test Coverage Summary

| Test Type | Command | Tests | Status |
|-----------|---------|-------|--------|
| **Frontend Tests** | `make test-client` | 111 tests | ✅ React components, hooks, utilities |
| **Backend Unit Tests** | `make test-api` | 9 tests | ✅ Services, controllers, business logic |
| **End-to-End Tests** | `make test-e2e` | 7 tests | ✅ Full API integration with database |
| **All Unit Tests** | `make test-all` | 120 tests | ✅ Frontend + Backend combined |

### Quick Testing Commands

```bash
# Run individual test suites
make test-client    # Frontend tests (React components, domain logic)
make test-api       # Backend unit tests (services, controllers)
make test-e2e       # End-to-end tests (full stack integration)

# Run multiple test suites
make test-all       # All unit tests (frontend + backend)
```

### Test Features

-   **🎯 Domain Component Testing**: Comprehensive tests for RecipientSelector, DatePicker, and PaymentTable components
-   **🔄 Integration Testing**: PaymentsList component with API mocking and state management
-   **🏗️ Infrastructure Testing**: Mock data factories, React Query provider wrappers
-   **🌐 End-to-End Testing**: Full API testing with Docker database integration
-   **♿ Accessibility Testing**: ARIA roles, semantic HTML validation
-   **⚡ Performance Testing**: Large dataset handling, re-render optimization

### E2E Test Infrastructure

The `make test-e2e` command automatically:

1. **🐳 Starts Docker containers** (API + PostgreSQL)
2. **⏳ Waits for services** to be ready
3. **🗄️ Runs database migrations** 
4. **🧪 Executes integration tests** against live API
5. **📊 Validates API responses** and database state

No manual setup required - just run `make test-e2e` and everything is handled automatically!

## 🔍 Code Quality

```bash
make lint-all      # Lint both projects
make lint-api      # Lint backend only
make lint-client   # Lint frontend only
```

## � Available Commands

Run `make help` to see all available commands:

-   **Setup & Control**: `setup`, `status`, `stop`, `restart-setup`
-   **Development**: `dev-api`, `dev-client`, `dev-docker`
-   **Building**: `build-api`, `build-client`, `build-all`
-   **Testing**: `test-api`, `test-client`, `test-e2e`, `test-all`
-   **Code Quality**: `lint-api`, `lint-client`, `lint-all`
-   **Database**: `db-migrate`, `db-seed`, `db-connect`
-   **Docker**: `docker-up`, `docker-down`, `docker-logs`

## �🐳 Docker Development

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

---

**Need help?** Run `make help` to see all available commands.
