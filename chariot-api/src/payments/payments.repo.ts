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

  async findUniqueRecipients(): Promise<string[]> {
    const result = await this.paymentsRepository
      .createQueryBuilder('payment')
      .select('DISTINCT payment.recipient', 'recipient')
      .orderBy('payment.recipient', 'ASC')
      .getRawMany();

    return result.map((row) => row.recipient);
  }

  async findAll(queryDto: GetPaymentsQueryDto): Promise<{
    data: Payment[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const query = this.paymentsRepository.createQueryBuilder('payment');

    // Filter by recipient if provided (supports comma-separated values)
    if (queryDto.recipient) {
      const recipients = queryDto.recipient
        .split(',')
        .map((r) => r.trim())
        .filter((r) => r);
      if (recipients.length > 0) {
        if (recipients.length === 1) {
          query.andWhere('payment.recipient ILIKE :recipient', {
            recipient: `%${recipients[0]}%`,
          });
        } else {
          const conditions = recipients.map(
            (_, index) => `payment.recipient ILIKE :recipient${index}`,
          );
          query.andWhere(`(${conditions.join(' OR ')})`);
          recipients.forEach((recipient, index) => {
            query.setParameter(`recipient${index}`, `%${recipient}%`);
          });
        }
      }
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
