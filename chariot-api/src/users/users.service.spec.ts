import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repo';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from './users.entity';
import { mock } from 'jest-mock-extended';

describe('UsersService', () => {
  let service: UsersService;
  let repository: ReturnType<typeof mock<UsersRepository>>;

  const mockUser: User = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword',
    firstName: 'Test',
    lastName: 'User',
    bio: 'Test bio',
    avatar: 'avatar.jpg',
    isVerified: false,
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    deletedAt: null,
  };

  const mockCreateUserDto: CreateUserDto = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    bio: 'Test bio',
    avatar: 'avatar.jpg',
  };

  const mockUpdateUserDto: UpdateUserDto = {
    firstName: 'Updated',
    lastName: 'Name',
  };

  beforeEach(async () => {
    repository = mock<UsersRepository>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      repository.createUser.mockResolvedValue(mockUser);

      const result = await service.create(mockCreateUserDto);

      expect(repository.createUser).toHaveBeenCalledWith(mockCreateUserDto);
      expect(result).toEqual({
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        bio: mockUser.bio,
        avatar: mockUser.avatar,
        isVerified: mockUser.isVerified,
        isActive: mockUser.isActive,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });
    });
  });

  describe('findById', () => {
    it('should return a user when found', async () => {
      repository.findById.mockResolvedValue(mockUser);

      const result = await service.findById(mockUser.id);

      expect(repository.findById).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual({
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        bio: mockUser.bio,
        avatar: mockUser.avatar,
        isVerified: mockUser.isVerified,
        isActive: mockUser.isActive,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });
    });

    it('should throw NotFoundException when user not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('nonexistent-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findById).toHaveBeenCalledWith('nonexistent-id');
    });
  });

  describe('findAll', () => {
    it('should return all active users', async () => {
      const mockUsers = [mockUser];
      repository.findAll.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        bio: mockUser.bio,
        avatar: mockUser.avatar,
        isVerified: mockUser.isVerified,
        isActive: mockUser.isActive,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
      });
    });

    it('should return empty array when no users found', async () => {
      repository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updatedUser = { ...mockUser, ...mockUpdateUserDto };
      repository.updateUser.mockResolvedValue(updatedUser);

      const result = await service.update(mockUser.id, mockUpdateUserDto);

      expect(repository.updateUser).toHaveBeenCalledWith(
        mockUser.id,
        mockUpdateUserDto,
      );
      expect(result).toEqual({
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
        isVerified: updatedUser.isVerified,
        isActive: updatedUser.isActive,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      });
    });

    it('should throw NotFoundException when user not found', async () => {
      repository.updateUser.mockResolvedValue(null);

      await expect(
        service.update('nonexistent-id', mockUpdateUserDto),
      ).rejects.toThrow(NotFoundException);
      expect(repository.updateUser).toHaveBeenCalledWith(
        'nonexistent-id',
        mockUpdateUserDto,
      );
    });
  });

  describe('softDelete', () => {
    it('should soft delete a user successfully', async () => {
      repository.softDeleteUser.mockResolvedValue(true);

      const result = await service.softDelete(mockUser.id);

      expect(repository.softDeleteUser).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual({ message: 'User soft deleted successfully' });
    });

    it('should throw NotFoundException when user not found', async () => {
      repository.softDeleteUser.mockResolvedValue(false);

      await expect(service.softDelete('nonexistent-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.softDeleteUser).toHaveBeenCalledWith('nonexistent-id');
    });
  });
});
