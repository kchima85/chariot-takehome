import { Configuration, PaymentsApi } from './generated'

// API client configuration
const configuration = new Configuration({
  basePath: 'http://localhost:3000',
})

// Create API instances
export const paymentsApi = new PaymentsApi(configuration)

// Re-export types for easy access
export type { PaymentResponseDto } from './generated'

// Query parameters type for payments
export interface GetPaymentsQuery {
  recipient?: string
  scheduledDateFrom?: string
  scheduledDateTo?: string
}
