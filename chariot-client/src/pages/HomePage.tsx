import type { FC } from 'react'
import PaymentsList from '../components/PaymentsList'

const HomePage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        Payment Management
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        View and manage payments with real-time data from the backend API.
      </p>

      <PaymentsList />
    </div>
  )
}

export default HomePage
