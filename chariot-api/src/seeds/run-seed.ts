import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import configuration from '../config/configuration';
import { Payment } from '../payments/payments.entity';

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
  entities: [Payment],
  synchronize: true,
  logging: false,
});

async function seed() {
  try {
    // Initialize the data source
    await dataSource.initialize();
    console.log('✅ Database connected successfully');

    // Clear existing data
    await dataSource.getRepository(Payment).clear();
    console.log('🧹 Cleared existing payment data');

    // Create payment seed data using Faker
    const paymentRepo = dataSource.getRepository(Payment);

    // Generate 20 payments with realistic data
    const payments = Array.from({ length: 20 }, () => {
      const scheduledDate = faker.date.between({
        from: '2025-07-01',
        to: '2025-12-31',
      });

      return {
        amount: faker.number.float({ min: 100, max: 50000, multipleOf: 0.01 }),
        currency: 'USD',
        scheduledDate,
        recipient: faker.person.fullName(),
        status: 'pending',
      };
    });

    // Add some specific test cases for better filtering tests
    payments.push(
      {
        amount: 5000,
        currency: 'USD',
        scheduledDate: new Date('2025-07-26'), // Matches example from prompt
        recipient: 'John Doe',
        status: 'pending',
      },
      {
        amount: 2500,
        currency: 'USD',
        scheduledDate: new Date('2025-09-15'),
        recipient: 'John Doe', // Same recipient for testing recipient filter
        status: 'pending',
      },
      {
        amount: 7500,
        currency: 'USD',
        scheduledDate: new Date('2025-07-25'), // Edge case for date filtering
        recipient: 'Jane Smith',
        status: 'pending',
      },
    );

    // Create Payment entities and save them
    const paymentEntities = payments.map((paymentData) => {
      const payment = new Payment();
      // Don't set ID - let TypeORM auto-generate UUID
      payment.amount = paymentData.amount;
      payment.currency = paymentData.currency;
      payment.scheduledDate = paymentData.scheduledDate;
      payment.recipient = paymentData.recipient;
      payment.status = paymentData.status;
      return payment;
    });

    await paymentRepo.save(paymentEntities);
    console.log(`💰 Created ${payments.length} payment records`);

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
