import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Payment } from './payments.entity';

export class GetPaymentsQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by recipient name',
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsString()
  recipient?: string;

  @ApiPropertyOptional({
    description: 'Filter by scheduled date from (ISO date string)',
    example: '2024-01-01',
  })
  @IsOptional()
  @IsDateString()
  scheduledDateFrom?: string;

  @ApiPropertyOptional({
    description: 'Filter by scheduled date to (ISO date string)',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsDateString()
  scheduledDateTo?: string;
}

export class PaymentResponseDto {
  @ApiProperty({
    description: 'Unique payment identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Payment amount in cents',
    example: 2500,
  })
  amount: number;

  @ApiProperty({
    description: 'Payment currency code',
    example: 'USD',
  })
  currency: string;

  @ApiProperty({
    description: 'Scheduled payment date',
    example: '2025-09-15T00:00:00.000Z',
  })
  scheduledDate: Date;

  @ApiProperty({
    description: 'Payment recipient name',
    example: 'John Doe',
  })
  recipient: string;

  @ApiProperty({
    description: 'Payment status',
    example: 'pending',
  })
  status: string;

  @ApiProperty({
    description: 'Payment creation timestamp',
    example: '2025-09-17T05:04:13.397Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Payment last update timestamp',
    example: '2025-09-17T05:04:13.397Z',
  })
  updatedAt: Date;

  constructor(payment: Payment) {
    this.id = payment.id;
    this.amount = payment.amount;
    this.currency = payment.currency;
    this.scheduledDate = payment.scheduledDate;
    this.recipient = payment.recipient;
    this.status = payment.status;
    this.createdAt = payment.createdAt;
    this.updatedAt = payment.updatedAt;
  }
}
