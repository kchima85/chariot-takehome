// Global TypeScript type definitions

// Re-export API types for global access
export type { PaymentResponseDto, GetPaymentsQuery } from '../api/client'

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code?: string | number
}
