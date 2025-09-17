import { DataSource } from 'typeorm';
import configuration from '../config/configuration';
import { User } from '../users/users.entity';

// Get configuration
const config = configuration();

// Database configuration
const dataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [User], // Add entities here when they're created
  synchronize: true,
  logging: false,
});

async function seed() {
  try {
    // Initialize the data source
    await dataSource.initialize();
    console.log('✅ Database connected successfully');

    // TODO: Add seeding logic when entities are created
    // Example:
    // const userRepo = dataSource.getRepository(UserEntity);
    // const users = Array.from({ length: 10 }, () => {
    //   const user = new UserEntity();
    //   user.name = faker.person.fullName();
    //   user.email = faker.internet.email();
    //   return user;
    // });
    // await userRepo.save(users);

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

// Run the seeder
seed();
