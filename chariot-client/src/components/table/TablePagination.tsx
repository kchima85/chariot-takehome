import type { FC } from 'react'
import { Button } from '../ui/button'
import type { PaginationState } from '../../types/payments.types'

interface TablePaginationProps {
  pagination: PaginationState
  total: number
  onPaginationChange: (newPagination: PaginationState) => void
}

export const TablePagination: FC<TablePaginationProps> = ({
  pagination,
  total,
  onPaginationChange,
}) => {
  const handlePrevious = () => {
    onPaginationChange({
      ...pagination,
      offset: Math.max(0, pagination.offset - pagination.limit),
    })
  }

  const handleNext = () => {
    onPaginationChange({
      ...pagination,
      offset: pagination.offset + pagination.limit,
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">
        Showing {pagination.offset + 1} to{' '}
        {Math.min(pagination.offset + pagination.limit, total)} of {total}{' '}
        payments
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.offset === 0}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.offset + pagination.limit >= total}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
