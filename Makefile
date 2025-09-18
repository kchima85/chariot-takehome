# Chariot Takehome - Root Makefile
# Manages both API and Client applications

.PHONY: help install dev build test lint clean docker-up docker-up-db docker-down docker-logs

# Default target
help:
	@echo "Chariot Takehome - Available commands:"
	@echo ""
	@echo "Quick Start:"
	@echo "  setup         Complete project setup (Docker + migrations + seed + frontend)"
	@echo "  status        Check if services are running"
	@echo "  stop          Stop all services (Docker + frontend)"
	@echo "  restart-setup Complete restart (stop + setup)"
	@echo ""
	@echo "Setup & Installation:"
	@echo "  install       Install dependencies for both API and client"
	@echo "  clean         Clean node_modules and build artifacts"
	@echo ""
	@echo "Development:"
	@echo "  dev-api       Start API in development mode"
	@echo "  dev-client    Start client in development mode"
	@echo "  dev-docker    Start API with Docker (includes PostgreSQL)"
	@echo ""
	@echo "Build:"
	@echo "  build-api     Build API for production"
	@echo "  build-client  Build client for production"
	@echo "  build-all     Build both API and client"
	@echo ""
	@echo "Testing:"
	@echo "  test-api      Run API unit tests"
	@echo "  test-client   Run client tests"
	@echo "  test-e2e      Run API e2e tests"
	@echo "  test-all      Run all tests"
	@echo ""
	@echo "Code Quality:"
	@echo "  lint-api      Lint API code"
	@echo "  lint-client   Lint client code"
	@echo "  lint-all      Lint both projects"
	@echo ""
	@echo "Docker (API):"
	@echo "  docker-up     Start API and PostgreSQL with Docker"
	@echo "  docker-up-db  Start PostgreSQL database only"
	@echo "  docker-down   Stop Docker containers"
	@echo "  docker-logs   View Docker logs"
	@echo ""
	@echo "Database (API):"
	@echo "  db-migrate    Run database migrations"
	@echo "  db-seed       Seed database with sample data"
	@echo "  db-connect    Connect to PostgreSQL database"
	@echo ""

# Setup & Installation
install:
	@echo "📦 Installing dependencies for API..."
	cd chariot-api && npm install
	@echo "📦 Installing dependencies for client..."
	cd chariot-client && npm install
	@echo "✅ All dependencies installed!"

# Complete Project Setup
setup: install
	@echo "🚀 Starting complete project setup..."
	@echo ""
	@echo "Step 1/4: Starting Docker containers (API + PostgreSQL)..."
	cd chariot-api && docker-compose up --build -d
	@echo "⏳ Waiting for containers to be ready..."
	@sleep 15
	@echo ""
	@echo "Step 2/4: Running database migrations..."
	@cd chariot-api && docker-compose exec -T api npm run migration:run
	@echo ""
	@echo "Step 3/4: Seeding database with sample data..."
	@cd chariot-api && docker-compose exec -T api npm run seed:run
	@echo ""
	@echo "Step 4/4: Starting frontend development server..."
	@echo "🎉 Setup complete! Frontend will start in a new terminal window..."
	@echo "📍 API running at: http://localhost:3000"
	@echo "📍 Frontend running at: http://localhost:5173"
	@echo ""
	@echo "Opening frontend..."
	cd chariot-client && npm run dev

# Project Status & Control
status:
	@echo "📊 Checking project status..."
	@echo ""
	@echo "Docker containers:"
	@cd chariot-api && docker-compose ps 2>/dev/null || echo "No containers running"
	@echo ""
	@echo "Ports in use:"
	@lsof -ti:3000 >/dev/null 2>&1 && echo "✅ Port 3000 (API): In use" || echo "❌ Port 3000 (API): Available"
	@lsof -ti:5173 >/dev/null 2>&1 && echo "✅ Port 5173 (Frontend): In use" || echo "❌ Port 5173 (Frontend): Available"

stop:
	@echo "🛑 Stopping all services..."
	@echo "Stopping Docker containers..."
	@cd chariot-api && docker-compose down 2>/dev/null || echo "No containers to stop"
	@echo "Stopping any processes on port 5173..."
	@lsof -ti:5173 | xargs kill -9 2>/dev/null || echo "No frontend processes to stop"
	@echo "✅ All services stopped!"

restart-setup: stop setup
	@echo "🔄 Complete restart finished!"

clean:
	@echo "🧹 Cleaning build artifacts and node_modules..."
	rm -rf chariot-api/node_modules chariot-api/dist
	rm -rf chariot-client/node_modules chariot-client/dist
	@echo "✅ Cleanup complete!"

# Development
dev-api:
	@echo "🚀 Starting API in development mode..."
	cd chariot-api && npm run start:dev

dev-client:
	@echo "🚀 Starting client in development mode..."
	cd chariot-client && npm run dev

dev-docker:
	@echo "🐳 Starting API with Docker (includes PostgreSQL)..."
	cd chariot-api && make build-up

# Build
build-api:
	@echo "🏗️ Building API..."
	cd chariot-api && npm run build

build-client:
	@echo "🏗️ Building client..."
	cd chariot-client && npm run build

build-all: build-api build-client
	@echo "✅ Both API and client built successfully!"

# Testing
test-api:
	@echo "🧪 Running API unit tests..."
	cd chariot-api && npm run test

test-client:
	@echo "🧪 Running client tests..."
	cd chariot-client && npm run test:run

test-e2e:
	@echo "🧪 Running API e2e tests..."
	@echo "🐳 Starting full application stack (API + PostgreSQL)..."
	@cd chariot-api && docker-compose up -d
	@echo "⏳ Waiting for services to be ready..."
	@sleep 10
	@echo "🗄️ Running database migrations..."
	@cd chariot-api && docker-compose exec -T api npm run migration:run
	@echo "🧪 Running e2e tests..."
	cd chariot-api && npm run test:e2e

test-all: test-api test-client
	@echo "✅ All tests completed!"

# Code Quality
lint-api:
	@echo "🔍 Linting API code..."
	cd chariot-api && npm run lint

lint-client:
	@echo "🔍 Linting client code..."
	cd chariot-client && npm run lint

lint-all: lint-api lint-client
	@echo "✅ All linting completed!"

# Docker (API)
docker-up:
	@echo "🐳 Starting Docker containers..."
	cd chariot-api && docker-compose up --build

docker-up-db:
	@echo "🐳 Starting PostgreSQL database only..."
	cd chariot-api && docker-compose up -d postgres

docker-down:
	@echo "🐳 Stopping Docker containers..."
	cd chariot-api && docker-compose down

docker-logs:
	@echo "📋 Viewing Docker logs..."
	cd chariot-api && docker-compose logs -f

# Database (API)
db-migrate:
	@echo "🗄️ Running database migrations..."
	cd chariot-api && make migration-run

db-seed:
	@echo "🌱 Seeding database..."
	cd chariot-api && make seed

db-connect:
	@echo "🔌 Connecting to database..."
	cd chariot-api && make connect-db

# Git helpers
git-status:
	@echo "📊 Git status for monorepo:"
	git status

git-add-all:
	@echo "➕ Adding all changes..."
	git add .

git-commit:
	@echo "💾 Committing changes..."
	@read -p "Enter commit message: " msg; \
	git commit -m "$$msg"

git-push:
	@echo "🚀 Pushing to GitHub..."
	git push origin main