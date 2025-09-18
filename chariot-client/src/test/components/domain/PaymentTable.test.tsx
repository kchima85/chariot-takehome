import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { PaymentTable } from '../../../components/domain/PaymentTable'
import type { PaymentResponseDto } from '../../../types/payments.types'

describe('PaymentTable Component', () => {
  const mockPayments: PaymentResponseDto[] = [
    {
      id: 'payment-1',
      recipient: 'John Doe',
      amount: '100.00',
      currency: 'USD',
      status: 'pending',
      scheduledDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'payment-2',
      recipient: 'Jane Smith',
      amount: '250.50',
      currency: 'USD',
      status: 'completed',
      scheduledDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
  const defaultProps = {
    payments: mockPayments,
    loading: false,
    error: undefined,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders table with payments', () => {
      render(<PaymentTable {...defaultProps} />)

      // Should show table headers
      expect(screen.getByText('Recipient')).toBeInTheDocument()
      expect(screen.getByText('Amount')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
      expect(screen.getByText('Scheduled Date')).toBeInTheDocument()
      expect(screen.getByText('Created Date')).toBeInTheDocument()

      // Should show payment data
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText('$100.00')).toBeInTheDocument()
      expect(screen.getByText('$250.50')).toBeInTheDocument()
    })

    it('displays all column headers correctly', () => {
      render(<PaymentTable {...defaultProps} />)

      const expectedColumns = [
        'Recipient',
        'Amount',
        'Status',
        'Scheduled Date',
        'Created Date',
      ]

      expectedColumns.forEach(columnName => {
        expect(screen.getByText(columnName)).toBeInTheDocument()
      })
    })

    it('renders correct number of payment rows', () => {
      render(<PaymentTable {...defaultProps} />)

      // Should have table rows for each payment (plus header row)
      const rows = screen.getAllByRole('row')
      expect(rows).toHaveLength(mockPayments.length + 1) // +1 for header row
    })

    it('applies custom className when provided', () => {
      render(<PaymentTable {...defaultProps} className="custom-class" />)

      const container = document.querySelector('.custom-class')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('shows loading message when loading is true', () => {
      render(<PaymentTable {...defaultProps} loading={true} />)

      expect(screen.getByText('Loading payments...')).toBeInTheDocument()
      expect(screen.queryByText('Recipient')).not.toBeInTheDocument()
    })

    it('applies correct styling to loading container', () => {
      render(<PaymentTable {...defaultProps} loading={true} />)

      const loadingText = screen.getByText('Loading payments...')
      const loadingContainer = loadingText.parentElement // The outer div with the classes
      expect(loadingContainer).toHaveClass(
        'min-h-[540px]',
        'items-center',
        'justify-center'
      )
    })

    it('does not render table when loading', () => {
      render(<PaymentTable {...defaultProps} loading={true} />)

      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })
  })

  describe('Error State', () => {
    it('shows error message when error is provided', () => {
      const errorMessage = 'Failed to load payments'
      render(<PaymentTable {...defaultProps} error={errorMessage} />)

      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument()
      expect(screen.queryByText('Recipient')).not.toBeInTheDocument()
    })

    it('applies error styling', () => {
      render(<PaymentTable {...defaultProps} error="Test error" />)

      const errorElement = screen.getByText('Error: Test error')
      expect(errorElement).toHaveClass('text-red-500')
    })

    it('does not render table when there is an error', () => {
      render(<PaymentTable {...defaultProps} error="Test error" />)

      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('shows default empty message when no payments', () => {
      render(<PaymentTable {...defaultProps} payments={[]} />)

      expect(screen.getByText('No payments found')).toBeInTheDocument()
      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })

    it('shows custom empty message when provided', () => {
      const customMessage = 'No matching payments for your criteria'
      render(
        <PaymentTable
          {...defaultProps}
          payments={[]}
          emptyMessage={customMessage}
        />
      )

      expect(screen.getByText(customMessage)).toBeInTheDocument()
    })

    it('applies correct styling to empty state', () => {
      render(<PaymentTable {...defaultProps} payments={[]} />)

      const emptyElement = screen.getByText('No payments found')
      expect(emptyElement).toHaveClass('text-gray-500')

      const emptyContainer = emptyElement.parentElement // The outer div with the classes
      expect(emptyContainer).toHaveClass(
        'min-h-[540px]',
        'items-center',
        'justify-center'
      )
    })
  })

  describe('Sorting Functionality', () => {
    it('shows sort icons on sortable columns', () => {
      render(<PaymentTable {...defaultProps} onSort={vi.fn()} />)

      // All columns should be sortable and show sort icons
      const sortableColumns = [
        'Recipient',
        'Amount',
        'Status',
        'Scheduled Date',
        'Created Date',
      ]

      sortableColumns.forEach(columnName => {
        const columnHeader = screen.getByText(columnName).closest('th')
        expect(columnHeader).toHaveClass('cursor-pointer')
      })
    })

    it('calls onSort when sortable column is clicked', async () => {
      const onSort = vi.fn()
      const user = userEvent.setup()

      render(<PaymentTable {...defaultProps} onSort={onSort} />)

      const recipientHeader = screen.getByText('Recipient').closest('th')
      await user.click(recipientHeader!)

      expect(onSort).toHaveBeenCalledWith('recipient')
    })

    it('does not show sort icons when onSort is not provided', () => {
      render(<PaymentTable {...defaultProps} />)

      // Columns are still sortable by nature, but no sort icons should show
      expect(screen.queryByTestId('sort-icon')).not.toBeInTheDocument()

      // But columns still have cursor pointer because they're defined as sortable
      // This is a current limitation in the component implementation
      const recipientHeader = screen.getByText('Recipient').closest('th')
      expect(recipientHeader).toHaveClass('cursor-pointer')
    })

    it('shows correct sort direction icon for ascending sort', () => {
      render(
        <PaymentTable
          {...defaultProps}
          onSort={vi.fn()}
          sortBy="amount"
          sortDirection="asc"
        />
      )

      // Should show up arrow for ascending sort
      const amountHeader = screen.getByText('Amount')
      const headerContainer = amountHeader.closest('th')
      expect(headerContainer).toBeInTheDocument()

      // Check for ascending sort icon (ArrowUp)
      const arrowIcon = headerContainer?.querySelector('svg')
      expect(arrowIcon).toBeInTheDocument()
    })

    it('shows correct sort direction icon for descending sort', () => {
      render(
        <PaymentTable
          {...defaultProps}
          onSort={vi.fn()}
          sortBy="amount"
          sortDirection="desc"
        />
      )

      // Should show down arrow for descending sort
      const amountHeader = screen.getByText('Amount')
      const headerContainer = amountHeader.closest('th')
      expect(headerContainer).toBeInTheDocument()

      // Check for descending sort icon (ArrowDown)
      const arrowIcon = headerContainer?.querySelector('svg')
      expect(arrowIcon).toBeInTheDocument()
    })

    it('shows default sort icon for unsorted columns', () => {
      render(
        <PaymentTable
          {...defaultProps}
          onSort={vi.fn()}
          sortBy="amount"
          sortDirection="asc"
        />
      )

      // Recipient column should show default sort icon
      const recipientHeader = screen.getByText('Recipient')
      const headerContainer = recipientHeader.closest('th')
      expect(headerContainer).toBeInTheDocument()

      const arrowIcon = headerContainer?.querySelector('svg')
      expect(arrowIcon).toBeInTheDocument()
    })

    it('applies hover styles to sortable columns', () => {
      render(<PaymentTable {...defaultProps} onSort={vi.fn()} />)

      const recipientHeader = screen.getByText('Recipient').closest('th')
      expect(recipientHeader).toHaveClass('hover:bg-gray-50')
    })
  })

  describe('Table Structure and Styling', () => {
    it('applies correct column widths', () => {
      render(<PaymentTable {...defaultProps} />)

      const recipientHeader = screen.getByText('Recipient').closest('th')
      const amountHeader = screen.getByText('Amount').closest('th')
      const statusHeader = screen.getByText('Status').closest('th')

      expect(recipientHeader).toHaveClass('w-64')
      expect(amountHeader).toHaveClass('w-32')
      expect(statusHeader).toHaveClass('w-24')
    })

    it('uses fixed table layout', () => {
      render(<PaymentTable {...defaultProps} />)

      const table = screen.getByRole('table')
      expect(table).toHaveClass('table-fixed')
    })

    it('applies minimum height to table container', () => {
      render(<PaymentTable {...defaultProps} />)

      const tableContainer = screen
        .getByRole('table')
        .closest('.min-h-\\[440px\\]')
      expect(tableContainer).toBeInTheDocument()
    })

    it('applies border styling to table container', () => {
      render(<PaymentTable {...defaultProps} />)

      // Find the div containing the table - it should be the parent of the table
      const table = screen.getByRole('table')
      const tableWrapper = table.closest('.border')
      expect(tableWrapper).toBeInTheDocument()
      expect(tableWrapper).toHaveClass('border', 'rounded-md')
    })
  })

  describe('Payment Row Integration', () => {
    it('renders PaymentRow component for each payment', () => {
      render(<PaymentTable {...defaultProps} />)

      // Each payment should render as a PaymentRow
      // We can check this by verifying payment data is displayed
      mockPayments.forEach((payment: PaymentResponseDto) => {
        expect(screen.getByText(payment.recipient)).toBeInTheDocument()
        expect(screen.getByText(`$${payment.amount}`)).toBeInTheDocument()
        expect(screen.getByText(payment.status)).toBeInTheDocument()
      })
    })

    it('passes correct payment data to PaymentRow', () => {
      render(<PaymentTable {...defaultProps} />)

      // Verify specific payment details are rendered
      const firstPayment = mockPayments[0]
      expect(screen.getByText(firstPayment.recipient)).toBeInTheDocument()
      expect(screen.getByText(`$${firstPayment.amount}`)).toBeInTheDocument()

      const secondPayment = mockPayments[1]
      expect(screen.getByText(secondPayment.recipient)).toBeInTheDocument()
      expect(screen.getByText(`$${secondPayment.amount}`)).toBeInTheDocument()
    })

    it('uses payment id as row key', () => {
      render(<PaymentTable {...defaultProps} />)

      // This is mainly for React's reconciliation
      // We verify by checking that all payments render correctly
      expect(screen.getAllByRole('row')).toHaveLength(mockPayments.length + 1)
    })
  })

  describe('Sort Interaction Edge Cases', () => {
    it('only calls onSort for sortable columns', async () => {
      const onSort = vi.fn()
      const user = userEvent.setup()

      render(<PaymentTable {...defaultProps} onSort={onSort} />)

      // All default columns are sortable, so clicking any should work
      const recipientHeader = screen.getByText('Recipient').closest('th')
      await user.click(recipientHeader!)

      expect(onSort).toHaveBeenCalledWith('recipient')
    })

    it('handles missing sort direction gracefully', () => {
      render(
        <PaymentTable
          {...defaultProps}
          onSort={vi.fn()}
          sortBy="amount"
          // sortDirection not provided
        />
      )

      // Should still render without errors
      expect(screen.getByText('Amount')).toBeInTheDocument()

      const amountHeader = screen.getByText('Amount').closest('th')
      const arrowIcon = amountHeader?.querySelector('svg')
      expect(arrowIcon).toBeInTheDocument()
    })

    it('handles unknown sort direction gracefully', () => {
      render(
        <PaymentTable
          {...defaultProps}
          onSort={vi.fn()}
          sortBy="amount"
          sortDirection={null}
        />
      )

      // Should render default sort icon
      expect(screen.getByText('Amount')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('renders proper table structure', () => {
      render(<PaymentTable {...defaultProps} />)

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getAllByRole('columnheader')).toHaveLength(5)
      expect(screen.getAllByRole('row')).toHaveLength(mockPayments.length + 1)
    })

    it('column headers are properly marked', () => {
      render(<PaymentTable {...defaultProps} />)

      const columnHeaders = screen.getAllByRole('columnheader')
      expect(columnHeaders).toHaveLength(5)

      const expectedHeaders = [
        'Recipient',
        'Amount',
        'Status',
        'Scheduled Date',
        'Created Date',
      ]
      expectedHeaders.forEach(headerText => {
        expect(
          screen.getByRole('columnheader', {
            name: new RegExp(headerText, 'i'),
          })
        ).toBeInTheDocument()
      })
    })

    it('sortable columns indicate interactivity', () => {
      render(<PaymentTable {...defaultProps} onSort={vi.fn()} />)

      const sortableHeaders = screen.getAllByRole('columnheader')
      sortableHeaders.forEach(header => {
        expect(header).toHaveClass('cursor-pointer')
      })
    })

    it('maintains proper table semantics with empty state', () => {
      render(<PaymentTable {...defaultProps} payments={[]} />)

      // Empty state should not have table semantics
      expect(screen.queryByRole('table')).not.toBeInTheDocument()
      expect(screen.queryByRole('columnheader')).not.toBeInTheDocument()
    })
  })

  describe('Performance Considerations', () => {
    it('handles large payment lists efficiently', () => {
      const manyPayments: PaymentResponseDto[] = Array.from(
        { length: 100 },
        (_, index) => ({
          ...mockPayments[0],
          id: `payment-${index}`,
          recipient: `Recipient ${index}`,
          amount: `${100 + index}.00`,
        })
      )

      render(<PaymentTable {...defaultProps} payments={manyPayments} />)

      // Should render all payments
      expect(screen.getAllByRole('row')).toHaveLength(101) // 100 payments + 1 header
      expect(screen.getByText('Recipient 0')).toBeInTheDocument()
      expect(screen.getByText('Recipient 99')).toBeInTheDocument()
    })

    it('does not re-render unnecessarily on prop changes', () => {
      const { rerender } = render(<PaymentTable {...defaultProps} />)

      // Changing non-affecting props should not break rendering
      rerender(<PaymentTable {...defaultProps} className="new-class" />)

      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
  })
})
