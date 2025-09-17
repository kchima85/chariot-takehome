import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: NestConfigService) {}

  get port(): number {
    return this.configService.get<number>('port');
  }

  get database() {
    return {
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      name: this.configService.get<string>('database.name'),
    };
  }

  get jwt() {
    return {
      secret: this.configService.get<string>('jwt.secret'),
      expiresIn: this.configService.get<string>('jwt.expiresIn'),
    };
  }

  get environment(): string {
    return this.configService.get<string>('environment');
  }

  get isDevelopment(): boolean {
    return this.environment === 'development';
  }

  get isProduction(): boolean {
    return this.environment === 'production';
  }
}
