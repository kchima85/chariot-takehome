import { screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import HomePage from '../pages/HomePage'
import { renderWithQueryClient } from './utils/mockUtils'

const renderWithRouterAndQuery = (component: React.ReactElement) => {
  return renderWithQueryClient(<BrowserRouter>{component}</BrowserRouter>)
}

describe('HomePage', () => {
  it('renders main heading', () => {
    renderWithRouterAndQuery(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Payment Management')).toBeInTheDocument()
  })

  it('renders description', () => {
    renderWithRouterAndQuery(<HomePage />)
    expect(
      screen.getByText(/view and manage payments with real-time data/i)
    ).toBeInTheDocument()
  })

  it('renders PaymentsList component', () => {
    renderWithRouterAndQuery(<HomePage />)
    expect(screen.getByText('Payments')).toBeInTheDocument()
    expect(screen.getByText('Loading payments...')).toBeInTheDocument()
  })

  it('renders page structure correctly', () => {
    renderWithRouterAndQuery(<HomePage />)
    expect(
      screen.getByRole('heading', { name: 'Payment Management' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Payments' })
    ).toBeInTheDocument()
  })
})
