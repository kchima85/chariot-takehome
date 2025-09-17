import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { GetPaymentsQueryDto, PaymentResponseDto } from './payments.dto';
import { mock, MockProxy } from 'jest-mock-extended';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: MockProxy<PaymentsService>;

  const mockPaymentResponse: PaymentResponseDto = {
    id: 'test-uuid',
    amount: 2500,
    currency: 'USD',
    scheduledDate: new Date('2025-09-15'),
    recipient: 'John Doe',
    status: 'pending',
    createdAt: new Date('2025-09-17T05:04:13.397Z'),
    updatedAt: new Date('2025-09-17T05:04:13.397Z'),
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
      const mockPayments = [mockPaymentResponse];
      const queryDto: GetPaymentsQueryDto = {};

      service.getAllPayments.mockResolvedValue(mockPayments);

      const result = await controller.getPayments(queryDto);

      expect(service.getAllPayments).toHaveBeenCalledWith(queryDto);
      expect(result).toEqual(mockPayments);
    });

    it('should pass recipient filter to service', async () => {
      const mockPayments = [mockPaymentResponse];
      const queryDto: GetPaymentsQueryDto = { recipient: 'john' };

      service.getAllPayments.mockResolvedValue(mockPayments);

      const result = await controller.getPayments(queryDto);

      expect(service.getAllPayments).toHaveBeenCalledWith(queryDto);
      expect(result).toEqual(mockPayments);
    });

    it('should pass date range filters to service', async () => {
      const mockPayments = [mockPaymentResponse];
      const queryDto: GetPaymentsQueryDto = {
        scheduledDateFrom: '2025-01-01',
        scheduledDateTo: '2025-12-31',
      };

      service.getAllPayments.mockResolvedValue(mockPayments);

      const result = await controller.getPayments(queryDto);

      expect(service.getAllPayments).toHaveBeenCalledWith(queryDto);
      expect(result).toEqual(mockPayments);
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
