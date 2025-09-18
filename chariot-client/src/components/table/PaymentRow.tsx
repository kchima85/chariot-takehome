import type { FC } from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import type { PaymentResponseDto } from '../../types/payments.types'
import { formatDate } from '../../utils/dateUtils'
import { formatAmount } from '../../utils/currencyUtils'
import { getStatusColor } from '../../utils/statusUtils'

interface PaymentRowProps {
  payment: PaymentResponseDto
}

export const PaymentRow: FC<PaymentRowProps> = ({ payment }) => {
  // Check if payment is scheduled within the next 24 hours
  const isUpcoming = () => {
    const now = new Date()
    const scheduledDate = new Date(payment.scheduledDate)
    const timeDiff = scheduledDate.getTime() - now.getTime()
    const hoursUntilPayment = timeDiff / (1000 * 60 * 60) // Convert to hours

    // Return true if payment is within next 24 hours and in the future
    return hoursUntilPayment > 0 && hoursUntilPayment <= 24
  }

  const upcoming = isUpcoming()

  return (
    <TableRow
      className={
        upcoming
          ? 'border-l-4 border-l-amber-400 bg-amber-50 hover:bg-amber-100'
          : undefined
      }
    >
      <TableCell className="w-64 truncate font-medium">
        {payment.recipient}
      </TableCell>
      <TableCell className="w-32">
        {formatAmount(payment.amount, payment.currency)}
      </TableCell>
      <TableCell className="w-24">
        <Badge className={getStatusColor(payment.status)}>
          {payment.status}
        </Badge>
      </TableCell>
      <TableCell className="w-36">
        <span className={upcoming ? 'font-semibold text-amber-700' : ''}>
          {formatDate(payment.scheduledDate)}
        </span>
      </TableCell>
      <TableCell className="w-36">{formatDate(payment.createdAt)}</TableCell>
    </TableRow>
  )
}
