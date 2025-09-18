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
import { PaginatedResponse } from '../shared/pagination.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all payments with optional filtering and pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of payments',
    type: PaginatedResponse<PaymentResponseDto>,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getPayments(
    @Query() queryDto: GetPaymentsQueryDto,
  ): Promise<PaginatedResponse<PaymentResponseDto>> {
    const { data, total, limit, offset } =
      await this.paymentsService.getAllPayments(queryDto);

    // Map to DTOs in controller
    const paymentDtos = data.map((payment) => new PaymentResponseDto(payment));

    return new PaginatedResponse(paymentDtos, total, limit, offset);
  }
}
