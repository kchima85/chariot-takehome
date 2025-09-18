import type { FC } from 'react'
import { useState, useCallback, useMemo } from 'react'
import { usePayments, useRecipients } from '../hooks/usePayments'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { RecipientSelector, DatePicker, PaymentTable } from './domain'
import { TablePagination } from './table/TablePagination'
import { formatAmount } from '../utils/currencyUtils'
import type {
  PaymentsTableFilters,
  PaginationState,
} from '../types/payments.types'

// Main PaymentsList component
const PaymentsList: FC = () => {
  const [filters, setFilters] = useState<PaymentsTableFilters>({
    recipients: [],
    scheduledDate: '',
  })
  const [pagination, setPagination] = useState<PaginationState>({
    limit: 10,
    offset: 0,
  })

  const { data, isLoading, error } = usePayments(
    filters,
    pagination.limit,
    pagination.offset
  )
  const { data: recipients = [], isLoading: recipientsLoading } =
    useRecipients()

  const payments = data?.data || []
  const total = data?.total || 0

  // Calculate total amount of filtered payments
  const totalAmount = useMemo(() => {
    return payments.reduce((sum, payment) => {
      const amount = parseFloat(payment.amount) || 0
      return sum + amount
    }, 0)
  }, [payments])

  // Get the most common currency for display (assuming most payments use the same currency)
  const primaryCurrency = useMemo(() => {
    if (payments.length === 0) return 'USD'

    const currencyCount = payments.reduce(
      (acc, payment) => {
        acc[payment.currency] = (acc[payment.currency] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    return Object.keys(currencyCount).reduce((a, b) =>
      currencyCount[a] > currencyCount[b] ? a : b
    )
  }, [payments])

  const handleRecipientsChange = useCallback((recipients: string[]) => {
    setFilters(prev => ({ ...prev, recipients }))
    setPagination(prev => ({ ...prev, offset: 0 })) // Reset to first page
  }, [])

  const handleScheduledDateChange = useCallback((scheduledDate: string) => {
    setFilters(prev => ({ ...prev, scheduledDate }))
    setPagination(prev => ({ ...prev, offset: 0 })) // Reset to first page
  }, [])

  const hasFilters = filters.recipients.length > 0 || filters.scheduledDate

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="text-red-800">
              Error loading payments: {(error as Error).message}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters - Now much simpler! */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-wrap items-center gap-6">
              <RecipientSelector
                recipients={recipients}
                selected={filters.recipients}
                onSelectionChange={handleRecipientsChange}
                loading={recipientsLoading}
                placeholder="Select recipients..."
                searchable={true}
                multiple={true}
              />
              <DatePicker
                value={filters.scheduledDate}
                onChange={handleScheduledDateChange}
                placeholder="Selected Date: MM/DD/YYYY"
                label=""
              />
            </div>
          </div>

          {/* Total Amount Display */}
          {!isLoading && payments.length > 0 && (
            <div className="mb-4 rounded-lg border bg-blue-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  Total Amount ({payments.length} payment
                  {payments.length !== 1 ? 's' : ''}):
                </span>
                <span className="text-lg font-bold text-blue-900">
                  {formatAmount(totalAmount.toString(), primaryCurrency)}
                </span>
              </div>
              {hasFilters && (
                <p className="mt-1 text-xs text-blue-700">
                  * Based on filtered results
                </p>
              )}
            </div>
          )}

          {/* Payments Table - Simplified with better states */}
          <div className="space-y-4">
            <PaymentTable
              payments={payments}
              loading={isLoading}
              emptyMessage={
                hasFilters
                  ? 'No payments match your filters'
                  : 'No payments found'
              }
            />

            {/* Pagination */}
            {!isLoading && payments.length > 0 && (
              <TablePagination
                pagination={pagination}
                total={total}
                onPaginationChange={setPagination}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentsList
