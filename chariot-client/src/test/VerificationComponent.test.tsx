import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import VerificationComponent from '../components/VerificationComponent'

describe('VerificationComponent', () => {
  it('renders main theme verification heading', () => {
    render(<VerificationComponent />)

    expect(
      screen.getByText(/theme & component verification/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/testing shadcn\/ui components/i)
    ).toBeInTheDocument()
  })

  it('renders themed buttons', () => {
    render(<VerificationComponent />)

    // Check for buttons (there are multiple "Primary Button" texts)
    const primaryButtons = screen.getAllByText('Primary Button')
    expect(primaryButtons.length).toBeGreaterThan(0)

    expect(screen.getByText('Secondary Button')).toBeInTheDocument()
    expect(screen.getByText('Destructive Button')).toBeInTheDocument()
  })

  it('renders themed badges', () => {
    render(<VerificationComponent />)

    expect(screen.getByText('Primary Badge')).toBeInTheDocument()
    expect(screen.getByText('Outline Badge')).toBeInTheDocument()
    expect(screen.getByText('Secondary Badge')).toBeInTheDocument()
    expect(screen.getByText('Destructive Badge')).toBeInTheDocument()
  })

  it('displays themed cards with proper styling', () => {
    render(<VerificationComponent />)

    // Find cards by their theme headings
    expect(screen.getByText('Primary Theme')).toBeInTheDocument()
    expect(screen.getByText('Secondary Theme')).toBeInTheDocument()
    expect(screen.getByText('Accent Theme')).toBeInTheDocument()
    expect(screen.getByText('Warning Theme')).toBeInTheDocument()
    expect(screen.getByText('Danger Theme')).toBeInTheDocument()
  })
})
