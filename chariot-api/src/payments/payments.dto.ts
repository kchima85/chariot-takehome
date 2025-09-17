import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

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
  id: string;
  amount: number;
  currency: string;
  scheduledDate: Date;
  recipient: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(payment: any) {
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
