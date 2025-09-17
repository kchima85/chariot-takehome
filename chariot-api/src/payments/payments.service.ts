import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repo';
import { GetPaymentsQueryDto, PaymentResponseDto } from './payments.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async getAllPayments(
    queryDto: GetPaymentsQueryDto,
  ): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentsRepository.findAll(queryDto);
    return payments.map((payment) => new PaymentResponseDto(payment));
  }
}
