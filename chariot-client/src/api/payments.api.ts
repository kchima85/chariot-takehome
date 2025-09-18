import { PaymentsApi, Configuration } from '../lib/api'
import type { PaginatedPaymentsResponse } from '../types/payments.types'

// Create API configuration
const configuration = new Configuration({
  basePath: 'http://localhost:3000',
})

export const paymentApi = new PaymentsApi(configuration)

// API service functions
export const fetchPayments = async (
  recipients?: string,
  scheduledDate?: string,
  limit = 10,
  offset = 0
): Promise<PaginatedPaymentsResponse> => {
  const response = await paymentApi.paymentsControllerGetPayments(
    recipients,
    scheduledDate,
    undefined, // scheduledDateTo
    limit,
    offset
  )
  return response.data as unknown as PaginatedPaymentsResponse
}

export const fetchRecipients = async (): Promise<string[]> => {
  const response = await paymentApi.paymentsControllerGetUniqueRecipients()
  return response.data as string[]
}
