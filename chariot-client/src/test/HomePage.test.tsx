import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import HomePage from '../pages/HomePage'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('HomePage', () => {
  it('renders welcome message', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Welcome to React Boilerplate')).toBeInTheDocument()
  })

  it('renders verification component link', () => {
    renderWithRouter(<HomePage />)
    expect(
      screen.getByRole('link', { name: /view theme & component verification/i })
    ).toBeInTheDocument()
  })

  it('displays feature list', () => {
    renderWithRouter(<HomePage />)
    expect(
      screen.getByRole('heading', { name: 'TypeScript' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Tailwind CSS v4' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'shadcn/ui' })
    ).toBeInTheDocument()
  })

  it('contains description text', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByText(/modern React boilerplate/i)).toBeInTheDocument()
  })
})
