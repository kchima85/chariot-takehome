import type { FC } from 'react'
import { usePayments } from '../hooks/usePayments'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import type { PaymentResponseDto } from '../types'

interface PaymentCardProps {
  payment: PaymentResponseDto
}

const PaymentCard: FC<PaymentCardProps> = ({ payment }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100) // Convert from cents
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{payment.recipient}</CardTitle>
          <Badge className={getStatusColor(payment.status)}>
            {payment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Amount:</span>
            <span className="font-semibold">
              {formatAmount(payment.amount, payment.currency)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Scheduled:</span>
            <span>{formatDate(payment.scheduledDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Created:</span>
            <span>{formatDate(payment.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const PaymentsList: FC = () => {
  const { data: payments, isLoading, error } = usePayments()

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-lg">Loading payments...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="text-red-800">
          Error loading payments: {(error as Error).message}
        </div>
      </div>
    )
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <div className="text-gray-500">No payments found</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Payments</h2>
        <Badge variant="secondary">
          {payments.length} payment{payments.length !== 1 ? 's' : ''}
        </Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {payments.map(payment => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  )
}

export default PaymentsList
