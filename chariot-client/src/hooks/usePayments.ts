import { useQuery } from '@tanstack/react-query'
import { fetchPayments, fetchRecipients } from '../api/payments.api'
import type {
  PaymentsTableFilters,
  PaginatedPaymentsResponse,
} from '../types/payments.types'

export const usePayments = (
  filters: PaymentsTableFilters,
  limit = 10,
  offset = 0
) => {
  return useQuery({
    queryKey: ['payments', filters, limit, offset],
    queryFn: async (): Promise<PaginatedPaymentsResponse> => {
      return fetchPayments(
        filters.recipients.length > 0
          ? filters.recipients.join(',')
          : undefined,
        filters.scheduledDate || undefined,
        limit,
        offset
      )
    },
  })
}

export const useRecipients = () => {
  return useQuery({
    queryKey: ['recipients'],
    queryFn: fetchRecipients,
  })
}
