import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('database.host'),
      port: this.configService.get('database.port'),
      username: this.configService.get('database.username'),
      password: this.configService.get('database.password'),
      database: this.configService.get('database.name'),
      entities: [User],
      synchronize: false,
      autoLoadEntities: true,
      logging: this.configService.get('environment') === 'development',
    };
  }
}
