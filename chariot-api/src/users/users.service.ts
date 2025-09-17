import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repo';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersRepository.createUser(createUserDto);
    return this.mapToResponseDto(user);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.mapToResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.findAll();
    return users.map((user) => this.mapToResponseDto(user));
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.updateUser(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.mapToResponseDto(user);
  }

  async softDelete(id: string): Promise<{ message: string }> {
    const deleted = await this.usersRepository.softDeleteUser(id);
    if (!deleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: 'User soft deleted successfully' };
  }

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      avatar: user.avatar,
      isVerified: user.isVerified,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
