import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { PaymentsRepository } from './payments.repo';
import { GetPaymentsQueryDto } from './payments.dto';
import { Payment } from './payments.entity';
import { mock, MockProxy } from 'jest-mock-extended';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let repository: MockProxy<PaymentsRepository>;

  const mockPayment: Payment = {
    id: 'test-uuid',
    amount: 2500,
    currency: 'USD',
    scheduledDate: new Date('2025-09-15'),
    recipient: 'John Doe',
    status: 'pending',
    createdAt: new Date('2025-09-17T05:04:13.397Z'),
    updatedAt: new Date('2025-09-17T05:04:13.397Z'),
  } as Payment;

  beforeEach(async () => {
    repository = mock<PaymentsRepository>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: PaymentsRepository,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPayments', () => {
    it('should return transformed payment data with pagination metadata', async () => {
      const mockPayments = [mockPayment];
      const mockRepositoryResult = {
        data: mockPayments,
        total: 1,
        limit: 10,
        offset: 0,
      };
      const queryDto: GetPaymentsQueryDto = {};

      repository.findAll.mockResolvedValue(mockRepositoryResult);

      const result = await service.getAllPayments(queryDto);

      expect(repository.findAll).toHaveBeenCalledWith(queryDto);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe(mockPayment.id);
      expect(result.data[0].amount).toBe(mockPayment.amount);
      expect(result.total).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.offset).toBe(0);
    });

    it('should pass filters to repository', async () => {
      const mockPayments = [mockPayment];
      const mockRepositoryResult = {
        data: mockPayments,
        total: 1,
        limit: 10,
        offset: 0,
      };
      const queryDto: GetPaymentsQueryDto = {
        recipient: 'john',
        scheduledDateFrom: '2025-01-01',
      };

      repository.findAll.mockResolvedValue(mockRepositoryResult);

      await service.getAllPayments(queryDto);

      expect(repository.findAll).toHaveBeenCalledWith(queryDto);
    });

    it('should handle empty results from repository', async () => {
      const queryDto: GetPaymentsQueryDto = {};
      const mockEmptyResult = { data: [], total: 0, limit: 10, offset: 0 };

      repository.findAll.mockResolvedValue(mockEmptyResult);

      const result = await service.getAllPayments(queryDto);

      expect(repository.findAll).toHaveBeenCalledWith(queryDto);
      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.limit).toBe(10);
      expect(result.offset).toBe(0);
    });
  });
});
