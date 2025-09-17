import { DataSource } from 'typeorm';
import configuration from './src/config/configuration';
import { Payment } from './src/payments/payments.entity';

const config = configuration();

export default new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [Payment],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
