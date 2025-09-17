import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatar?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
