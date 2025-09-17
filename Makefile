# Chariot Takehome - Root Makefile
# Manages both API and Client applications

.PHONY: help install dev build test lint clean docker-up docker-down docker-logs

# Default target
help:
	@echo "Chariot Takehome - Available commands:"
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