import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { PaymentRow } from '../table/PaymentRow'
import type { PaymentResponseDto } from '../../types/payments.types'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

type SortDirection = 'asc' | 'desc' | null

interface Column {
  key: keyof PaymentResponseDto
  label: string
  width?: string
  sortable?: boolean
}

interface PaymentTableProps {
  payments: PaymentResponseDto[]
  loading?: boolean
  error?: string
  sortBy?: keyof PaymentResponseDto
  sortDirection?: SortDirection
  onSort?: (key: keyof PaymentResponseDto) => void
  emptyMessage?: string
  className?: string
}

const defaultColumns: Column[] = [
  { key: 'recipient', label: 'Recipient', width: 'w-64', sortable: true },
  { key: 'amount', label: 'Amount', width: 'w-32', sortable: true },
  { key: 'status', label: 'Status', width: 'w-24', sortable: true },
  {
    key: 'scheduledDate',
    label: 'Scheduled Date',
    width: 'w-36',
    sortable: true,
  },
  { key: 'createdAt', label: 'Created Date', width: 'w-36', sortable: true },
]

export const PaymentTable = ({
  payments,
  loading = false,
  error,
  sortBy,
  sortDirection,
  onSort,
  emptyMessage,
  className = '',
}: PaymentTableProps) => {
  const handleSort = (key: keyof PaymentResponseDto) => {
    if (onSort && defaultColumns.find(col => col.key === key)?.sortable) {
      onSort(key)
    }
  }

  const getSortIcon = (key: keyof PaymentResponseDto) => {
    if (sortBy !== key) return <ArrowUpDown className="ml-2 h-4 w-4" />
    if (sortDirection === 'asc') return <ArrowUp className="ml-2 h-4 w-4" />
    if (sortDirection === 'desc') return <ArrowDown className="ml-2 h-4 w-4" />
    return <ArrowUpDown className="ml-2 h-4 w-4" />
  }

  // Loading state
  if (loading) {
    return (
      <div
        className={`flex min-h-[540px] items-center justify-center rounded-md border ${className}`}
      >
        <div className="text-lg">Loading payments...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div
        className={`flex min-h-[540px] items-center justify-center rounded-md border ${className}`}
      >
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  // Empty state
  if (payments.length === 0) {
    return (
      <div
        className={`flex min-h-[540px] items-center justify-center rounded-md border ${className}`}
      >
        <div className="text-gray-500">
          {emptyMessage || 'No payments found'}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex min-h-[440px] flex-col rounded-md border ${className}`}
    >
      <Table className="w-full flex-1 table-fixed">
        <TableHeader>
          <TableRow>
            {defaultColumns.map(column => (
              <TableHead
                key={column.key}
                className={`${column.width} ${column.sortable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.label}
                  {column.sortable && onSort && getSortIcon(column.key)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map(payment => (
            <PaymentRow key={payment.id} payment={payment} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
