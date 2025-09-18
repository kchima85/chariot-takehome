import { vi } from 'vitest'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactElement } from 'react'
import type { PaymentResponseDto, PaginatedPaymentsResponse } from '../../types/payments.types'
import { createMockPaymentsResponse, createMultiplePayments, mockRecipients } from './testData'

// Mock the usePayments hook
export const createMockUsePayments = (
  data: PaginatedPaymentsResponse | null = null,
  isLoading = false,
  error: Error | null = null
) => {
  return {
    data: data || createMockPaymentsResponse(createMultiplePayments(3)),
    isLoading,
    error,
    refetch: vi.fn(),
    isRefetching: false,
  }
}

// Mock the useRecipients hook
export const createMockUseRecipients = (
  data: string[] = mockRecipients,
  isLoading = false,
  error: Error | null = null
) => {
  return {
    data,
    isLoading,
    error,
    refetch: vi.fn(),
  }
}

// Mock TanStack Query provider for tests
export const createMockQueryClient = () => {
  const { QueryClient } = require('@tanstack/react-query')
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })
}

// Test wrapper with React Query provider
export const renderWithQueryClient = (
  component: ReactElement,
  queryClient: QueryClient = createMockQueryClient()
) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

// Mock API responses for testing
export const mockApiResponses = {
  payments: {
    success: createMockPaymentsResponse(createMultiplePayments(5)),
    empty: createMockPaymentsResponse([]),
    error: new Error('Failed to fetch payments'),
  },
  recipients: {
    success: mockRecipients,
    empty: [],
    error: new Error('Failed to fetch recipients'),
  }
}
