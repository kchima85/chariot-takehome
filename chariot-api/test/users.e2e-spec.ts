import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../src/users/users.module';
import { User } from '../src/users/users.entity';
import { BaseEntity } from '../src/shared/base.entity';
import configuration from '../src/config/configuration';
import { DataSource } from 'typeorm';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('database.host'),
            port: configService.get('database.port'),
            username: configService.get('database.username'),
            password: configService.get('database.password'),
            database: configService.get('database.name'),
            entities: [BaseEntity, User],
            synchronize: true, // Use synchronize for testing
            logging: false,
          }),
          inject: [ConfigService],
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    dataSource = moduleFixture.get<DataSource>(DataSource);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  beforeEach(async () => {
    // Clean up users table before each test
    await dataSource.query('DELETE FROM users');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (POST)', () => {
    it('should create a user successfully', () => {
      const createUserDto = {
        username: 'testuser1',
        email: 'test1@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        bio: 'Test bio',
        avatar: 'avatar.jpg',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.username).toBe(createUserDto.username);
          expect(res.body.email).toBe(createUserDto.email);
          expect(res.body.firstName).toBe(createUserDto.firstName);
          expect(res.body.lastName).toBe(createUserDto.lastName);
          expect(res.body.bio).toBe(createUserDto.bio);
          expect(res.body.avatar).toBe(createUserDto.avatar);
          expect(res.body.isVerified).toBe(false);
          expect(res.body.isActive).toBe(true);
          expect(res.body).not.toHaveProperty('password');
          expect(res.body).toHaveProperty('createdAt');
          expect(res.body).toHaveProperty('updatedAt');
        });
    });

    it('should fail with invalid email', () => {
      const createUserDto = {
        username: 'testuser2',
        email: 'invalid-email',
        password: 'password123',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(400);
    });

    it('should fail with short password', () => {
      const createUserDto = {
        username: 'testuser3',
        email: 'test3@example.com',
        password: '123',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(400);
    });

    it('should fail with short username', () => {
      const createUserDto = {
        username: 'ab',
        email: 'test4@example.com',
        password: 'password123',
      };

      return request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(400);
    });
  });

  describe('/users (GET)', () => {
    it('should return all users', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          if (res.body.length > 0) {
            expect(res.body[0]).toHaveProperty('id');
            expect(res.body[0]).toHaveProperty('username');
            expect(res.body[0]).toHaveProperty('email');
            expect(res.body[0]).not.toHaveProperty('password');
          }
        });
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return a user by id', async () => {
      // Create a user to test with
      const createUserDto = {
        username: 'getuser',
        email: 'getuser@example.com',
        password: 'password123',
        firstName: 'Get',
        lastName: 'User',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto);

      const userId = createResponse.body.id;

      return request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(userId);
          expect(res.body.username).toBe('getuser');
          expect(res.body.email).toBe('getuser@example.com');
          expect(res.body.firstName).toBe('Get');
          expect(res.body.lastName).toBe('User');
          expect(res.body).not.toHaveProperty('password');
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .get('/users/123e4567-e89b-12d3-a456-426614174999')
        .expect(404);
    });
  });

  describe('/users/:id (PUT)', () => {
    it('should update a user successfully', async () => {
      // Create a user to test with
      const createUserDto = {
        username: 'updateuser',
        email: 'updateuser@example.com',
        password: 'password123',
        firstName: 'Update',
        lastName: 'User',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto);

      const userId = createResponse.body.id;

      const updateUserDto = {
        firstName: 'Updated',
        lastName: 'Name',
        bio: 'Updated bio',
      };

      return request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send(updateUserDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(userId);
          expect(res.body.firstName).toBe(updateUserDto.firstName);
          expect(res.body.lastName).toBe(updateUserDto.lastName);
          expect(res.body.bio).toBe(updateUserDto.bio);
          expect(res.body.username).toBe('updateuser'); // Should remain unchanged
        });
    });

    it('should return 404 for non-existent user', () => {
      const updateUserDto = {
        firstName: 'Updated',
      };

      return request(app.getHttpServer())
        .put('/users/123e4567-e89b-12d3-a456-426614174999')
        .send(updateUserDto)
        .expect(404);
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should soft delete a user successfully', async () => {
      // Create a user to test with
      const createUserDto = {
        username: 'deleteuser',
        email: 'deleteuser@example.com',
        password: 'password123',
        firstName: 'Delete',
        lastName: 'User',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto);

      const userId = createResponse.body.id;

      return request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('User soft deleted successfully');
        });
    });

    it('should return 404 for non-existent user', () => {
      return request(app.getHttpServer())
        .delete('/users/123e4567-e89b-12d3-a456-426614174999')
        .expect(404);
    });

    it('should not return soft deleted user in list', async () => {
      // Create a user to test with
      const createUserDto = {
        username: 'deleteuser2',
        email: 'deleteuser2@example.com',
        password: 'password123',
        firstName: 'Delete',
        lastName: 'User',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto);

      const userId = createResponse.body.id;

      // Soft delete the user
      await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);

      // Verify the user is not returned in the list after soft delete
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      const deletedUser = response.body.find((user: any) => user.id === userId);
      expect(deletedUser).toBeUndefined();
    });
  });
});
