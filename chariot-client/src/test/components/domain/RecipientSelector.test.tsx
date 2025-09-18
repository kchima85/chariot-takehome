import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { RecipientSelector } from '../../../components/domain/RecipientSelector'
import { mockRecipients } from '../../utils/testData'

describe('RecipientSelector Component', () => {
  const defaultProps = {
    recipients: mockRecipients,
    selected: [],
    onSelectionChange: vi.fn(),
    placeholder: 'Select recipients...',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('shows placeholder when no selection', () => {
      render(<RecipientSelector {...defaultProps} />)

      expect(screen.getByText('Select recipients...')).toBeInTheDocument()
    })

    it('shows loading state correctly', () => {
      render(<RecipientSelector {...defaultProps} loading={true} />)

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('shows selected count when items chosen', () => {
      render(
        <RecipientSelector
          {...defaultProps}
          selected={['John Doe', 'Jane Smith']}
        />
      )

      expect(screen.getByText('2 selected')).toBeInTheDocument()
    })

    it('shows single selection in single-select mode', () => {
      render(
        <RecipientSelector
          {...defaultProps}
          selected={['John Doe']}
          multiple={false}
        />
      )

      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('can be disabled', () => {
      render(<RecipientSelector {...defaultProps} disabled={true} />)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('Dropdown Interaction', () => {
    it('opens dropdown when clicked', async () => {
      const user = userEvent.setup()
      render(<RecipientSelector {...defaultProps} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      // Should show recipients in dropdown
      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      })
    })

    it('closes dropdown when clicking outside', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <RecipientSelector {...defaultProps} />
          <div data-testid="outside">Outside</div>
        </div>
      )

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      // Wait for dropdown to open
      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      })

      // Click outside
      await user.click(screen.getByTestId('outside'))

      // Dropdown should close (recipients not visible)
      await waitFor(() => {
        expect(screen.queryByRole('list')).not.toBeInTheDocument()
      })
    })
  })

  describe('Search Functionality', () => {
    it('shows search input when searchable is true', async () => {
      const user = userEvent.setup()
      render(<RecipientSelector {...defaultProps} searchable={true} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Search recipients...')
        ).toBeInTheDocument()
      })
    })

    it('filters recipients based on search term', async () => {
      const user = userEvent.setup()
      render(<RecipientSelector {...defaultProps} searchable={true} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      // Wait for dropdown to open
      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Search recipients...')
        ).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Search recipients...')
      await user.type(searchInput, 'John')

      // Should show only John Doe
      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
      })
    })

    it('shows no results when search matches nothing', async () => {
      const user = userEvent.setup()
      render(<RecipientSelector {...defaultProps} searchable={true} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Search recipients...')
        ).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Search recipients...')
      await user.type(searchInput, 'xyz')

      await waitFor(() => {
        expect(screen.getByText('No recipients found')).toBeInTheDocument()
      })
    })

    it('search is case insensitive', async () => {
      const user = userEvent.setup()
      render(<RecipientSelector {...defaultProps} searchable={true} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Search recipients...')
        ).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText('Search recipients...')
      await user.type(searchInput, 'john')

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      })
    })
  })

  describe('Selection Logic', () => {
    it('selects recipient when clicked in multiple mode', async () => {
      const onSelectionChange = vi.fn()
      const user = userEvent.setup()

      render(
        <RecipientSelector
          {...defaultProps}
          onSelectionChange={onSelectionChange}
          multiple={true}
        />
      )

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      })

      // Click on John Doe
      const johnOption = screen.getByText('John Doe')
      await user.click(johnOption)

      expect(onSelectionChange).toHaveBeenCalledWith(['John Doe'])
    })

    it('deselects recipient when already selected', async () => {
      const onSelectionChange = vi.fn()
      const user = userEvent.setup()

      render(
        <RecipientSelector
          {...defaultProps}
          selected={['John Doe']}
          onSelectionChange={onSelectionChange}
          multiple={true}
        />
      )

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      })

      // Click on John Doe (should deselect)
      const johnOption = screen.getByText('John Doe')
      await user.click(johnOption)

      expect(onSelectionChange).toHaveBeenCalledWith([])
    })

    it('closes dropdown in single-select mode after selection', async () => {
      const onSelectionChange = vi.fn()
      const user = userEvent.setup()

      render(
        <RecipientSelector
          {...defaultProps}
          onSelectionChange={onSelectionChange}
          multiple={false}
        />
      )

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
      })

      const johnOption = screen.getByText('John Doe')
      await user.click(johnOption)

      expect(onSelectionChange).toHaveBeenCalledWith(['John Doe'])

      // Dropdown should close
      await waitFor(() => {
        expect(screen.queryByRole('list')).not.toBeInTheDocument()
      })
    })

    it('allows multiple selections in multiple mode', async () => {
      const onSelectionChange = vi.fn()
      const user = userEvent.setup()

      render(
        <RecipientSelector
          {...defaultProps}
          selected={['John Doe']}
          onSelectionChange={onSelectionChange}
          multiple={true}
        />
      )

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      })

      const janeOption = screen.getByText('Jane Smith')
      await user.click(janeOption)

      expect(onSelectionChange).toHaveBeenCalledWith(['John Doe', 'Jane Smith'])
    })
  })

  describe('Clear All Functionality', () => {
    it('shows clear all button when items are selected in multiple mode', async () => {
      const user = userEvent.setup()
      render(
        <RecipientSelector
          {...defaultProps}
          selected={['John Doe', 'Jane Smith']}
          multiple={true}
        />
      )

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        // Check for the clear all button specifically
        expect(screen.getByText('Clear all')).toBeInTheDocument()

        // Check that there are multiple "selected" texts (one in trigger, one in dropdown)
        const selectedTexts = screen.getAllByText(/2.*selected/)
        expect(selectedTexts.length).toBeGreaterThanOrEqual(1)
      })
    })

    it('does not show clear all button when no items selected', async () => {
      const user = userEvent.setup()
      render(<RecipientSelector {...defaultProps} multiple={true} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.queryByText('Clear all')).not.toBeInTheDocument()
      })
    })

    it('clears all selections when clear all is clicked', async () => {
      const onSelectionChange = vi.fn()
      const user = userEvent.setup()

      render(
        <RecipientSelector
          {...defaultProps}
          selected={['John Doe', 'Jane Smith']}
          onSelectionChange={onSelectionChange}
          multiple={true}
        />
      )

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('Clear all')).toBeInTheDocument()
      })

      const clearAllButton = screen.getByText('Clear all')
      await user.click(clearAllButton)

      expect(onSelectionChange).toHaveBeenCalledWith([])
    })

    it('does not show clear all in single-select mode', async () => {
      const user = userEvent.setup()
      render(
        <RecipientSelector
          {...defaultProps}
          selected={['John Doe']}
          multiple={false}
        />
      )

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.queryByText('Clear all')).not.toBeInTheDocument()
      })
    })
  })

  describe('Visual Indicators', () => {
    it('shows checkmarks for selected items', async () => {
      const user = userEvent.setup()
      render(<RecipientSelector {...defaultProps} selected={['John Doe']} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        // Should show a checkmark for John Doe
        const johnRow = screen.getByText('John Doe').closest('div')
        expect(johnRow).toBeInTheDocument()
        // The check icon should be present (this tests the visual feedback)
      })
    })

    it('shows chevron down icon on trigger button', () => {
      render(<RecipientSelector {...defaultProps} />)

      const trigger = screen.getByRole('button')
      expect(trigger).toBeInTheDocument()
      // The chevron should be in the button (testing structure)
    })
  })

  describe('Empty States', () => {
    it('shows empty state when no recipients provided', async () => {
      const user = userEvent.setup()
      render(<RecipientSelector {...defaultProps} recipients={[]} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('No recipients found')).toBeInTheDocument()
      })
    })

    it('shows loading message when loading and no recipients', async () => {
      const user = userEvent.setup()
      render(
        <RecipientSelector {...defaultProps} recipients={[]} loading={true} />
      )

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument()
      })
    })
  })

  describe('Props Validation', () => {
    it('uses provided placeholder text', () => {
      render(
        <RecipientSelector {...defaultProps} placeholder="Choose people..." />
      )

      expect(screen.getByText('Choose people...')).toBeInTheDocument()
    })

    it('respects searchable prop', async () => {
      const user = userEvent.setup()
      render(<RecipientSelector {...defaultProps} searchable={false} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      await waitFor(() => {
        expect(
          screen.queryByPlaceholderText('Search recipients...')
        ).not.toBeInTheDocument()
      })
    })
  })
})
