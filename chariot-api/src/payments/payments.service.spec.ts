import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { PaymentsRepository } from './payments.repo';
import { GetPaymentsQueryDto, PaymentResponseDto } from './payments.dto';
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
    it('should return transformed payment data', async () => {
      const mockPayments = [mockPayment];
      const queryDto: GetPaymentsQueryDto = {};

      repository.findAll.mockResolvedValue(mockPayments);

      const result = await service.getAllPayments(queryDto);

      expect(repository.findAll).toHaveBeenCalledWith(queryDto);
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(PaymentResponseDto);
      expect(result[0].id).toBe(mockPayment.id);
      expect(result[0].amount).toBe(mockPayment.amount);
    });

    it('should pass filters to repository', async () => {
      const mockPayments = [mockPayment];
      const queryDto: GetPaymentsQueryDto = {
        recipient: 'john',
        scheduledDateFrom: '2025-01-01',
      };

      repository.findAll.mockResolvedValue(mockPayments);

      await service.getAllPayments(queryDto);

      expect(repository.findAll).toHaveBeenCalledWith(queryDto);
    });

    it('should handle empty results from repository', async () => {
      const queryDto: GetPaymentsQueryDto = {};

      repository.findAll.mockResolvedValue([]);

      const result = await service.getAllPayments(queryDto);

      expect(repository.findAll).toHaveBeenCalledWith(queryDto);
      expect(result).toEqual([]);
    });
  });
});
