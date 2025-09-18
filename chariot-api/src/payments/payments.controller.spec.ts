import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { GetPaymentsQueryDto } from './payments.dto';
import { Payment } from './payments.entity';
import { mock, MockProxy } from 'jest-mock-extended';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: MockProxy<PaymentsService>;

  const mockPayment: Payment = {
    id: 'test-uuid',
    amount: 2500,
    currency: 'USD',
    scheduledDate: new Date('2025-09-15'),
    recipient: 'John Doe',
    status: 'pending',
    createdAt: new Date('2025-09-17T05:04:13.397Z'),
    updatedAt: new Date('2025-09-17T05:04:13.397Z'),
    deletedAt: null,
  };

  beforeEach(async () => {
    service = mock<PaymentsService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return all payments when no filters provided', async () => {
      const mockServiceResponse = {
        data: [mockPayment], // Service returns raw Payment entities
        total: 1,
        limit: 10,
        offset: 0,
      };
      const queryDto: GetPaymentsQueryDto = {};

      service.getAllPayments.mockResolvedValue(mockServiceResponse);

      const result = await controller.getPayments(queryDto);

      expect(service.getAllPayments).toHaveBeenCalledWith(queryDto);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.offset).toBe(0);
      expect(result.count).toBe(1);
    });

    it('should pass recipient filter to service', async () => {
      const mockServiceResponse = {
        data: [mockPayment],
        total: 1,
        limit: 10,
        offset: 0,
      };
      const queryDto: GetPaymentsQueryDto = { recipient: 'john' };

      service.getAllPayments.mockResolvedValue(mockServiceResponse);

      const result = await controller.getPayments(queryDto);

      expect(service.getAllPayments).toHaveBeenCalledWith(queryDto);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should pass date range filters to service', async () => {
      const mockServiceResponse = {
        data: [mockPayment],
        total: 1,
        limit: 10,
        offset: 0,
      };
      const queryDto: GetPaymentsQueryDto = {
        scheduledDateFrom: '2025-01-01',
        scheduledDateTo: '2025-12-31',
      };

      service.getAllPayments.mockResolvedValue(mockServiceResponse);

      const result = await controller.getPayments(queryDto);

      expect(service.getAllPayments).toHaveBeenCalledWith(queryDto);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should handle service errors gracefully', async () => {
      const queryDto: GetPaymentsQueryDto = {};
      const error = new Error('Database connection failed');

      service.getAllPayments.mockRejectedValue(error);

      await expect(controller.getPayments(queryDto)).rejects.toThrow(error);
      expect(service.getAllPayments).toHaveBeenCalledWith(queryDto);
    });
  });
});
