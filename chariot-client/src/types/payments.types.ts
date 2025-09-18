export interface PaymentResponseDto {
  id: string
  recipient: string
  amount: string // API returns decimal string
  currency: string
  status: string
  scheduledDate: string
  createdAt: string
  updatedAt: string
}

export interface PaginatedPaymentsResponse {
  data: PaymentResponseDto[]
  total: number
  limit: number
  offset: number
}

export interface PaymentsTableFilters {
  recipients: string[]
  scheduledDate: string
}

export interface PaginationState {
  limit: number
  offset: number
}
