import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './payments.repo';
import { GetPaymentsQueryDto } from './payments.dto';
import { Payment } from './payments.entity';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async getUniqueRecipients(): Promise<string[]> {
    return this.paymentsRepository.findUniqueRecipients();
  }

  async getAllPayments(queryDto: GetPaymentsQueryDto): Promise<{
    data: Payment[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const result = await this.paymentsRepository.findAll(queryDto);
    return result;
  }
}
