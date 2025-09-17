import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto);
    return await this.findById(id);
  }

  async softDeleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.update(id, { isActive: false });
    return result.affected > 0;
  }
}
