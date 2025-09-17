import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { GetPaymentsQueryDto, PaymentResponseDto } from './payments.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all payments with optional filtering' })
  @ApiResponse({
    status: 200,
    description: 'List of payments',
    type: [PaymentResponseDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getPayments(
    @Query() queryDto: GetPaymentsQueryDto,
  ): Promise<PaymentResponseDto[]> {
    return this.paymentsService.getAllPayments(queryDto);
  }
}
