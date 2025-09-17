import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './users.dto';
import { mock } from 'jest-mock-extended';

describe('UsersController', () => {
  let controller: UsersController;
  let service: ReturnType<typeof mock<UsersService>>;

  const mockUserResponse: UserResponseDto = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    bio: 'Test bio',
    avatar: 'avatar.jpg',
    isVerified: false,
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
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
    service = mock<UsersService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      service.create.mockResolvedValue(mockUserResponse);

      const result = await controller.create(mockCreateUserDto);

      expect(service.create).toHaveBeenCalledWith(mockCreateUserDto);
      expect(result).toEqual(mockUserResponse);
    });
  });

  describe('findById', () => {
    it('should return a user when found', async () => {
      service.findById.mockResolvedValue(mockUserResponse);

      const result = await controller.findById(mockUserResponse.id);

      expect(service.findById).toHaveBeenCalledWith(mockUserResponse.id);
      expect(result).toEqual(mockUserResponse);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [mockUserResponse];
      service.findAll.mockResolvedValue(mockUsers);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it('should return empty array when no users found', async () => {
      service.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updatedUser = { ...mockUserResponse, ...mockUpdateUserDto };
      service.update.mockResolvedValue(updatedUser);

      const result = await controller.update(
        mockUserResponse.id,
        mockUpdateUserDto,
      );

      expect(service.update).toHaveBeenCalledWith(
        mockUserResponse.id,
        mockUpdateUserDto,
      );
      expect(result).toEqual(updatedUser);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a user successfully', async () => {
      const deleteResponse = { message: 'User soft deleted successfully' };
      service.softDelete.mockResolvedValue(deleteResponse);

      const result = await controller.softDelete(mockUserResponse.id);

      expect(service.softDelete).toHaveBeenCalledWith(mockUserResponse.id);
      expect(result).toEqual(deleteResponse);
    });
  });
});
