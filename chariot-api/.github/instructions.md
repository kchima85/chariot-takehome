# .cursorrules - NestJS + TypeScript Backend Project

## General Guidelines

- Do not create or suggest anything unless explicitly instructed
- Do not assume requirements or specifications
- Ask for clarification before proceeding with any implementation
- Wait for explicit instructions before making changes
- Follow the established patterns and conventions in this project

## Project Structure

### Folder Organization

- Feature-focused folder structure in `src/`
- Each feature folder contains: `*.entity.ts`, `*.dto.ts`, `*.module.ts`, `*.controller.ts`, `*.service.ts`, `*.repo.ts`
- Core folders: `config/`, `health/`, `shared/`
- No subfolders within feature folders
- File naming: `feature-name.type.ts` (e.g., `users.controller.ts`)

### Core Folders

- `src/config/` - Configuration service and environment management
- `src/health/` - Health check endpoint (minimal: controller + module only)
- `src/shared/` - Base entity and shared utilities
- `src/seeds/` - Database seeding logic

## Architecture Patterns

### Layer Separation

- **Controllers**: Handle HTTP requests, validation, and response formatting
- **Services**: Business logic, orchestration, and data transformation
- **Repositories**: Data access layer with TypeORM operations
- **DTOs**: Data transfer objects with validation decorators
- **Entities**: Database models extending BaseEntity

### Dependency Injection

- Use constructor injection for all dependencies
- Register all components in their respective modules
- Export services that need to be used by other modules

## Database & TypeORM Patterns

### Base Entity

- All entities extend `BaseEntity` from `src/shared/base.entity.ts`
- Base entity includes: `id` (UUID), `createdAt`, `updatedAt`, `deletedAt`
- Use camelCase for entity properties, snake_case for database columns
- Map database columns using `@Column({ name: 'column_name' })` decorator

### Entity Structure

```typescript
@Entity('table_name')
export class EntityName extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  propertyName: string;
}
```

### Repository Pattern

- Create dedicated repository classes for each entity
- Use `@InjectRepository()` decorator
- Implement CRUD operations with proper error handling
- Use soft deletes by setting `deletedAt` timestamp

## API Design Patterns

### DTOs

- Create separate DTOs for: Create, Update, Response
- Use class-validator decorators for validation
- Include all necessary fields with proper validation rules
- Response DTOs should exclude sensitive data (e.g., passwords)

### Controller Patterns

- Use proper HTTP status codes (`@HttpCode()`)
- Implement all CRUD operations: POST, GET, PUT, DELETE
- Apply validation pipes globally
- Use consistent endpoint naming
- List endpoints require limit offset pagination
- Set up the list endpoints to support dynamic functionality
- Filtering, Sorting, and Pagination: Use query parameters for these common list endpoint operations. This allows clients to specify how they want the data returned
- **Filtering examples**: GET /orders?minCost=100&status=shipped
- **Pagination examples**: GET /orders?limit=25&offset=50

### Validation

- Use class-validator decorators in DTOs
- Apply validation at the controller layer
- Include meaningful error messages
- Validate both required and optional fields

## Testing Patterns

### Unit Tests

- Use `jest-mock-extended` for mocking dependencies
- Mock type: `ReturnType<typeof mock<ServiceType>>`
- Test all service methods with happy path scenarios
- Test error conditions (e.g., NotFoundException)
- Use descriptive test names and proper arrange/act/assert structure

### Integration (E2E) Tests

- Use real database connections for full integration testing
- Clean database before each test using `beforeEach` hook
- Create test data inside individual tests, not in `beforeAll`
- Use unique identifiers for each test to avoid conflicts
- Test complete request/response cycles with supertest

### Test Structure

```typescript
describe('Feature (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    // Setup app and get DataSource
  });

  beforeEach(async () => {
    // Clean all tables
    const entities = dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.query(`DELETE FROM "${entity.tableName}"`);
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
```

## Configuration Patterns

### Environment Management

- Use `@nestjs/config` with typed configuration service
- Create `configuration.ts` function for environment loading
- Use `AppConfigService` for type-safe config access
- Support multiple environments (development, production)

### Database Configuration

- Use TypeORM with PostgreSQL
- Configure separate data sources for CLI and runtime
- Enable migrations with proper entity registration
- Use `synchronize: false` in production

## Migration & Seeding

### Migration Setup

- Create `data-source.ts` at project root for CLI operations
- Use `ts-node` for TypeScript migration support
- Register all entities in data source configuration
- Use proper migration naming conventions

### Seeding

- Create seeder framework in `src/seeds/`
- Use Faker.js for realistic test data generation
- Support ordered seeding for related entities
- Include cleanup and error handling

## Code Style & Conventions

### TypeScript

- Use strict typing throughout the project
- Prefer interfaces over types for object shapes
- Use proper access modifiers (public, private, protected)
- Implement proper error handling with custom exceptions

### Naming Conventions

- **Files**: kebab-case (`user-profile.service.ts`)
- **Classes**: PascalCase (`UserService`)
- **Methods**: camelCase (`createUser`)
- **Properties**: camelCase (`firstName`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Database**: snake_case (`user_profiles`)

### Import Organization

- Group imports: external libraries, internal modules, relative imports
- Use absolute imports with `@/` alias when possible
- Import specific items rather than entire modules

## Error Handling

### Exception Patterns

- Use NestJS built-in exceptions (`NotFoundException`, `BadRequestException`)
- Create custom exceptions for domain-specific errors
- Implement proper error messages and status codes
- Log errors appropriately for debugging

### Validation Errors

- Use class-validator for input validation
- Provide meaningful error messages
- Handle validation errors at the controller level
- Return consistent error response format

## Security Patterns

### Data Protection

- Never expose sensitive data in responses (passwords, tokens)
- Use DTOs to control data exposure
- Implement proper input sanitization
- Use environment variables for sensitive configuration

### Authentication & Authorization

- Implement proper JWT handling (when needed)
- Use guards for route protection
- Validate user permissions at service level
- Implement proper session management

## Performance Patterns

### Database Optimization

- Use proper indexing strategies
- Implement pagination for list endpoints
- Use soft deletes instead of hard deletes
- Optimize queries with proper joins

## Development Workflow

### Git Practices

- Use meaningful commit messages
- Create feature branches for new development
- Review code before merging
- Keep commits atomic and focused

### Code Quality

- Use ESLint and Prettier for code formatting
- Run tests before committing
- Maintain high test coverage
- Use TypeScript strict mode

### Documentation

- Document complex business logic
- Use JSDoc for public methods
- Maintain up-to-date README

## Docker & Deployment

### Development Environment

- Use Docker Compose for local development
- Include both API and database services
- Use volume mounts for hot reloading
- Implement proper environment variable handling

## Package Management

### Dependencies

- Use `npm i --legacy-peer-deps` for installations
- Keep dependencies up to date
- Use exact versions for critical dependencies
- Document dependency purposes

### Scripts

- Maintain comprehensive npm scripts
- Include build, test, lint, and format commands
- Use Makefile for common development tasks
- Implement proper CI/CD pipeline scripts

## Monitoring & Logging

### Application Monitoring

- Implement proper logging throughout the application
- Use structured logging for better analysis
- Monitor application performance
- Implement health check endpoints

### Error Tracking

- Log errors with proper context
- Implement error reporting (when needed)
- Monitor application health
- Track performance metrics

This comprehensive set of rules ensures consistency, maintainability, and scalability across the entire NestJS backend project.
