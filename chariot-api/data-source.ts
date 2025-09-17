import { DataSource } from 'typeorm';
import configuration from './src/config/configuration';
import { User } from './src/users/users.entity';

const config = configuration();

export default new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
