import type {
  PaymentResponseDto,
  PaginatedPaymentsResponse,
} from '../../types/payments.types'

// Test data factories
export const createMockPayment = (
  overrides: Partial<PaymentResponseDto> = {}
): PaymentResponseDto => ({
  id: 'payment-1',
  recipient: 'John Doe',
  amount: '100.00',
  currency: 'USD',
  status: 'pending',
  scheduledDate: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
})

// Create payment scheduled within next 24 hours
export const createUpcomingPayment = (
  hoursFromNow: number = 12
): PaymentResponseDto => {
  const scheduledDate = new Date()
  scheduledDate.setHours(scheduledDate.getHours() + hoursFromNow)

  return createMockPayment({
    id: 'upcoming-payment',
    recipient: 'Jane Smith',
    amount: '250.00',
    scheduledDate: scheduledDate.toISOString(),
  })
}

// Create payment scheduled beyond 24 hours
export const createFuturePayment = (
  hoursFromNow: number = 48
): PaymentResponseDto => {
  const scheduledDate = new Date()
  scheduledDate.setHours(scheduledDate.getHours() + hoursFromNow)

  return createMockPayment({
    id: 'future-payment',
    recipient: 'Bob Johnson',
    amount: '75.50',
    scheduledDate: scheduledDate.toISOString(),
  })
}

// Create past payment
export const createPastPayment = (
  hoursAgo: number = 24
): PaymentResponseDto => {
  const scheduledDate = new Date()
  scheduledDate.setHours(scheduledDate.getHours() - hoursAgo)

  return createMockPayment({
    id: 'past-payment',
    recipient: 'Alice Brown',
    amount: '300.00',
    status: 'completed',
    scheduledDate: scheduledDate.toISOString(),
  })
}

export const createMockPaymentsResponse = (
  payments: PaymentResponseDto[] = [],
  overrides: Partial<PaginatedPaymentsResponse> = {}
): PaginatedPaymentsResponse => ({
  data: payments,
  total: payments.length,
  limit: 10,
  offset: 0,
  ...overrides,
})

export const mockRecipients = [
  'John Doe',
  'Jane Smith',
  'Bob Johnson',
  'Alice Brown',
  'Charlie Wilson',
  'Diana Prince',
]

export const createMultiplePayments = (
  count: number = 3
): PaymentResponseDto[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockPayment({
      id: `payment-${index + 1}`,
      recipient: mockRecipients[index % mockRecipients.length],
      amount: (Math.random() * 1000).toFixed(2),
    })
  )
}
