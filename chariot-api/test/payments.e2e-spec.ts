import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PaymentsModule } from '../src/payments/payments.module';
import { Payment } from '../src/payments/payments.entity';
import { TypeOrmConfigService } from '../src/config/typeorm.config';
import configuration from '../src/config/configuration';
import { DataSource } from 'typeorm';

describe('Payments E2E', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
          load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: TypeOrmConfigService,
        }),
        PaymentsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();

    dataSource = app.get(DataSource);
  });

  beforeEach(async () => {
    // Clean and seed test data
    await dataSource.getRepository(Payment).clear();

    const testPayments = [
      {
        amount: 2500,
        currency: 'USD',
        scheduledDate: new Date('2025-09-15'),
        recipient: 'John Doe',
        status: 'pending',
      },
      {
        amount: 5000,
        currency: 'USD',
        scheduledDate: new Date('2025-07-26'),
        recipient: 'John Doe',
        status: 'pending',
      },
      {
        amount: 7500,
        currency: 'USD',
        scheduledDate: new Date('2025-07-25'),
        recipient: 'Jane Smith',
        status: 'pending',
      },
      {
        amount: 1000,
        currency: 'USD',
        scheduledDate: new Date('2024-12-01'),
        recipient: 'Bob Wilson',
        status: 'pending',
      },
    ];

    await dataSource.getRepository(Payment).save(testPayments);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  describe('GET /payments', () => {
    it('should return all pending payments', () => {
      return request(app.getHttpServer())
        .get('/payments')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(4);
          expect(res.body[0]).toHaveProperty('id');
          expect(res.body[0]).toHaveProperty('amount');
          expect(res.body[0]).toHaveProperty('currency');
          expect(res.body[0]).toHaveProperty('scheduledDate');
          expect(res.body[0]).toHaveProperty('recipient');
          expect(res.body[0]).toHaveProperty('status');
        });
    });

    it('should filter by recipient', () => {
      return request(app.getHttpServer())
        .get('/payments?recipient=john')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(2);
          expect(
            res.body.every((payment) =>
              payment.recipient.toLowerCase().includes('john'),
            ),
          ).toBe(true);
        });
    });

    it('should filter by date range', () => {
      return request(app.getHttpServer())
        .get(
          '/payments?scheduledDateFrom=2025-01-01&scheduledDateTo=2025-12-31',
        )
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(3);
          expect(
            res.body.every((payment) => {
              const date = new Date(payment.scheduledDate);
              return (
                date >= new Date('2025-01-01') && date <= new Date('2025-12-31')
              );
            }),
          ).toBe(true);
        });
    });

    it('should combine filters', () => {
      return request(app.getHttpServer())
        .get('/payments?recipient=john&scheduledDateFrom=2025-01-01')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(2);
          expect(
            res.body.every(
              (payment) =>
                payment.recipient.toLowerCase().includes('john') &&
                new Date(payment.scheduledDate) >= new Date('2025-01-01'),
            ),
          ).toBe(true);
        });
    });

    it('should return empty array for non-existent recipient', () => {
      return request(app.getHttpServer())
        .get('/payments?recipient=nonexistent')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBe(0);
        });
    });

    it('should return 400 for invalid date format', () => {
      return request(app.getHttpServer())
        .get('/payments?scheduledDateFrom=invalid-date')
        .expect(400);
    });

    it('should return proper JSON structure', () => {
      return request(app.getHttpServer())
        .get('/payments')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          const payment = res.body[0];
          expect(typeof payment.id).toBe('string');
          expect(typeof payment.amount).toBe('string');
          expect(payment.currency).toBe('USD');
          expect(typeof payment.scheduledDate).toBe('string');
          expect(typeof payment.recipient).toBe('string');
          expect(payment.status).toBe('pending');
          expect(typeof payment.createdAt).toBe('string');
          expect(typeof payment.updatedAt).toBe('string');
        });
    });
  });
});
