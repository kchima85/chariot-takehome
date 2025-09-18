import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponse<T> {
  @ApiProperty({ description: 'Array of items' })
  data: T[];

  @ApiProperty({ description: 'Number of items to return', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Number of items to skip', example: 0 })
  offset: number;

  @ApiProperty({ description: 'Total number of items', example: 42 })
  total: number;

  @ApiProperty({ description: 'Number of items returned', example: 10 })
  count: number;

  constructor(data: T[], total: number, limit: number, offset: number) {
    this.data = data;
    this.total = total;
    this.limit = limit;
    this.offset = offset;
    this.count = data.length;
  }
}
