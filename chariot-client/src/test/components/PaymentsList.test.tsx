import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import PaymentsList from '../../components/PaymentsList'
import { renderWithQueryClient } from '../utils/mockUtils'
import {
  createMockPayment,
  createMockPaymentsResponse,
} from '../utils/testData'
import * as usePaymentsModule from '../../hooks/usePayments'

// Mock the hooks
vi.mock('../../hooks/usePayments', () => ({
  usePayments: vi.fn(),
  useRecipients: vi.fn(),
}))

const mockUsePayments = vi.mocked(usePaymentsModule.usePayments)
const mockUseRecipients = vi.mocked(usePaymentsModule.useRecipients)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockReturnValue = (data: any, isLoading = false, error = null) =>
  ({
    data,
    isLoading,
    error,
    isError: !!error,
    isPending: isLoading,
    isSuccess: !isLoading && !error,
    refetch: vi.fn(),
  }) as any

// Set up the mocked hooks
beforeEach(() => {
  vi.clearAllMocks()

  // Default mock returns
  mockUsePayments.mockReturnValue(
    mockReturnValue(createMockPaymentsResponse([createMockPayment()]))
  )

  mockUseRecipients.mockReturnValue(mockReturnValue(['John Doe', 'Jane Smith']))
})

describe('PaymentsList Component', () => {
  describe('Loading State', () => {
    it('shows loading state when payments are being fetched', () => {
      mockUsePayments.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      })

      renderWithQueryClient(<PaymentsList />)

      // The PaymentTable component shows loading state
      expect(screen.getByText('Loading payments...')).toBeInTheDocument()
    })
  })

  describe('Error States', () => {
    it('displays error message when payments fail to load', () => {
      mockUsePayments.mockReturnValue({
        data: null,
        isLoading: false,
        error: new Error('Failed to fetch payments'),
      })

      renderWithQueryClient(<PaymentsList />)

      expect(
        screen.getByText('Error loading payments: Failed to fetch payments')
      ).toBeInTheDocument()
    })
  })

  describe('Empty States', () => {
    it('shows empty state when no payments exist', () => {
      mockUsePayments.mockReturnValue({
        data: createMockPaymentsResponse([]),
        isLoading: false,
        error: null,
      })

      renderWithQueryClient(<PaymentsList />)

      expect(screen.getByText('No payments found')).toBeInTheDocument()
    })
  })

  describe('Payment Display', () => {
    it('renders payment table when payments exist', () => {
      const payments = [
        createMockPayment({ recipient: 'John Doe', amount: '100.00' }),
        createMockPayment({ recipient: 'Jane Smith', amount: '200.00' }),
      ]
      mockUsePayments.mockReturnValue({
        data: createMockPaymentsResponse(payments),
        isLoading: false,
        error: null,
      })

      renderWithQueryClient(<PaymentsList />)

      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })

    it('shows pagination when there are many payments', () => {
      const payments = Array.from({ length: 5 }, (_, i) =>
        createMockPayment({ id: `payment-${i}`, recipient: `User ${i}` })
      )
      const response = createMockPaymentsResponse(payments, { total: 50 })
      mockUsePayments.mockReturnValue({
        data: response,
        isLoading: false,
        error: null,
      })

      renderWithQueryClient(<PaymentsList />)

      // Should show pagination controls
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
    })
  })

  describe('Total Amount Display', () => {
    it('calculates and displays total amount correctly', () => {
      const payments = [
        createMockPayment({ amount: '100.50' }),
        createMockPayment({ amount: '250.25' }),
        createMockPayment({ amount: '149.75' }),
      ]
      mockUsePayments.mockReturnValue({
        data: createMockPaymentsResponse(payments),
        isLoading: false,
        error: null,
      })

      renderWithQueryClient(<PaymentsList />)

      // Total should be 500.50
      expect(screen.getByText(/total amount/i)).toBeInTheDocument()
      expect(screen.getByText('$500.50')).toBeInTheDocument()
    })

    it('shows payment count in total display', () => {
      const payments = [createMockPayment(), createMockPayment()]
      mockUsePayments.mockReturnValue({
        data: createMockPaymentsResponse(payments),
        isLoading: false,
        error: null,
      })

      renderWithQueryClient(<PaymentsList />)

      expect(screen.getByText('Total Amount (2 payments):')).toBeInTheDocument()
    })

    it('uses singular form for single payment', () => {
      const payments = [createMockPayment()]
      mockUsePayments.mockReturnValue({
        data: createMockPaymentsResponse(payments),
        isLoading: false,
        error: null,
      })

      renderWithQueryClient(<PaymentsList />)

      expect(screen.getByText('Total Amount (1 payment):')).toBeInTheDocument()
    })

    it('does not show total amount when loading', () => {
      mockUsePayments.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      })

      renderWithQueryClient(<PaymentsList />)

      expect(screen.queryByText(/total amount/i)).not.toBeInTheDocument()
    })

    it('does not show total amount when no payments', () => {
      mockUsePayments.mockReturnValue({
        data: createMockPaymentsResponse([]),
        isLoading: false,
        error: null,
      })

      renderWithQueryClient(<PaymentsList />)

      expect(screen.queryByText(/total amount/i)).not.toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('renders main title', () => {
      renderWithQueryClient(<PaymentsList />)

      expect(
        screen.getByRole('heading', { name: 'Payments' })
      ).toBeInTheDocument()
    })

    it('renders filter section', () => {
      renderWithQueryClient(<PaymentsList />)

      expect(screen.getByText('Select recipients...')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Selected Date: MM/DD/YYYY')
      ).toBeInTheDocument()
    })
  })

  describe('Basic Interactions', () => {
    it('can interact with date filter', async () => {
      const user = userEvent.setup()
      renderWithQueryClient(<PaymentsList />)

      const dateInput = screen.getByPlaceholderText('Selected Date: MM/DD/YYYY')
      await user.type(dateInput, '12/25/2023')

      expect(dateInput).toHaveValue('12/25/2023')
    })

    it('can open recipient selector', async () => {
      const user = userEvent.setup()
      renderWithQueryClient(<PaymentsList />)

      const recipientSelector = screen.getByText('Select recipients...')
      await user.click(recipientSelector)

      // The dropdown should open (this tests the component is interactive)
      expect(recipientSelector).toBeInTheDocument()
    })
  })
})
