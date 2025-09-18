import { useState, useCallback } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import { ChevronDown, Check, X } from 'lucide-react'

interface RecipientSelectorProps {
  recipients: string[]
  selected: string[]
  onSelectionChange: (selected: string[]) => void
  placeholder?: string
  searchable?: boolean
  multiple?: boolean
  disabled?: boolean
  loading?: boolean
}

export const RecipientSelector = ({
  recipients,
  selected,
  onSelectionChange,
  placeholder = 'Select recipients...',
  searchable = true,
  multiple = true,
  disabled = false,
  loading = false,
}: RecipientSelectorProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredRecipients = searchable
    ? recipients.filter(recipient =>
        recipient.toLowerCase().includes(search.toLowerCase())
      )
    : recipients

  const handleToggle = useCallback(
    (recipient: string) => {
      if (multiple) {
        const isSelected = selected.includes(recipient)
        if (isSelected) {
          onSelectionChange(selected.filter(r => r !== recipient))
        } else {
          onSelectionChange([...selected, recipient])
        }
      } else {
        onSelectionChange([recipient])
        setOpen(false)
      }
    },
    [selected, onSelectionChange, multiple]
  )

  const handleClearAll = useCallback(() => {
    onSelectionChange([])
  }, [onSelectionChange])

  const displayText = () => {
    if (loading) return 'Loading...'
    if (selected.length === 0) return placeholder
    if (multiple) return `${selected.length} selected`
    return selected[0]
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled || loading}
            className="h-10 w-[300px] justify-between"
          >
            <span>{displayText()}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] border border-gray-200 bg-white p-0 shadow-lg">
          <div className="space-y-3 bg-white p-3">
            {/* Search Input */}
            {searchable && (
              <Input
                placeholder="Search recipients..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-9"
              />
            )}

            {/* Clear All Button */}
            {multiple && selected.length > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {selected.length} selected
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="h-auto p-1"
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear all
                </Button>
              </div>
            )}

            {/* Recipients List */}
            <div className="max-h-48 space-y-1 overflow-y-auto bg-white">
              {filteredRecipients.length === 0 ? (
                <div className="bg-white py-6 text-center text-sm text-gray-500">
                  {loading ? 'Loading...' : 'No recipients found'}
                </div>
              ) : (
                filteredRecipients.map(recipient => (
                  <div
                    key={recipient}
                    className="flex cursor-pointer items-center space-x-2 rounded bg-white p-2 transition-colors hover:bg-gray-50"
                    onClick={() => handleToggle(recipient)}
                  >
                    <Checkbox
                      checked={selected.includes(recipient)}
                      onChange={() => {}} // Handled by parent div onClick
                    />
                    <span className="flex-1 text-sm">{recipient}</span>
                    {selected.includes(recipient) && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Reserve space for alignment with DatePicker error messages */}
      <div className="h-5"></div>
    </div>
  )
}
