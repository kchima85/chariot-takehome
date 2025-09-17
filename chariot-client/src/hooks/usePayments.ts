import { useQuery } from '@tanstack/react-query'
import { paymentsApi } from '../api/client'
import type { GetPaymentsQuery, PaymentResponseDto } from '../api/client'

// Query keys for cache management
export const paymentKeys = {
  all: ['payments'] as const,
  lists: () => [...paymentKeys.all, 'list'] as const,
  list: (filters: GetPaymentsQuery) =>
    [...paymentKeys.lists(), { filters }] as const,
}

/**
 * Hook to fetch payments with optional filtering
 */
export function usePayments(query: GetPaymentsQuery = {}) {
  return useQuery({
    queryKey: paymentKeys.list(query),
    queryFn: async (): Promise<PaymentResponseDto[]> => {
      const { data } = await paymentsApi.paymentsControllerGetPayments(
        query.recipient,
        query.scheduledDateFrom,
        query.scheduledDateTo
      )
      return data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
