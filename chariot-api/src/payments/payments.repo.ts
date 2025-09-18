import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payments.entity';
import { GetPaymentsQueryDto } from './payments.dto';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
  ) {}

  async findAll(queryDto: GetPaymentsQueryDto): Promise<{
    data: Payment[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const query = this.paymentsRepository.createQueryBuilder('payment');

    // Filter by recipient if provided
    if (queryDto.recipient) {
      query.andWhere('payment.recipient ILIKE :recipient', {
        recipient: `%${queryDto.recipient}%`,
      });
    }

    // Filter by date range if provided
    if (queryDto.scheduledDateFrom) {
      query.andWhere('payment.scheduledDate >= :dateFrom', {
        dateFrom: queryDto.scheduledDateFrom,
      });
    }

    if (queryDto.scheduledDateTo) {
      query.andWhere('payment.scheduledDate <= :dateTo', {
        dateTo: queryDto.scheduledDateTo,
      });
    }

    // Order by scheduled date (most recent first)
    query.orderBy('payment.scheduledDate', 'DESC');

    // Apply pagination
    const limit = queryDto.limit || 10;
    const offset = queryDto.offset || 0;

    query.limit(limit);
    query.offset(offset);

    // Get both data and total count
    const [data, total] = await query.getManyAndCount();

    return { data, total, limit, offset };
  }
}
