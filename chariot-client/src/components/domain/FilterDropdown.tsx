import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Check, ChevronDown } from 'lucide-react'

interface FilterDropdownProps {
  trigger: React.ReactNode | string
  options: string[]
  selected: string[]
  onSelect: (selected: string[]) => void
  multiple?: boolean
  searchable?: boolean
  placeholder?: string
  disabled?: boolean
  maxHeight?: string
}

export const FilterDropdown = ({
  trigger,
  options,
  selected,
  onSelect,
  multiple = false,
  searchable = false,
  placeholder = 'Search...',
  disabled = false,
  maxHeight = 'max-h-48',
}: FilterDropdownProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredOptions = searchable
    ? options.filter(option =>
        option.toLowerCase().includes(search.toLowerCase())
      )
    : options

  const handleOptionClick = (option: string) => {
    if (multiple) {
      const isSelected = selected.includes(option)
      if (isSelected) {
        onSelect(selected.filter(s => s !== option))
      } else {
        onSelect([...selected, option])
      }
    } else {
      onSelect([option])
      setOpen(false)
    }
  }

  const getTriggerContent = () => {
    if (typeof trigger === 'string') {
      return (
        <>
          <span>{trigger}</span>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </>
      )
    }
    return trigger
  }

  const getDisplayText = () => {
    if (selected.length === 0)
      return typeof trigger === 'string' ? trigger : 'Select...'
    if (multiple) return `${selected.length} selected`
    return selected[0]
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className="justify-between"
        >
          {typeof trigger === 'string' ? getDisplayText() : getTriggerContent()}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-0">
        <div className="space-y-2 p-2">
          {searchable && (
            <Input
              placeholder={placeholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-8"
            />
          )}

          <div className={`overflow-y-auto ${maxHeight}`}>
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                No options found
              </div>
            ) : (
              <div className="space-y-1">
                {filteredOptions.map(option => (
                  <div
                    key={option}
                    className="flex cursor-pointer items-center justify-between rounded px-2 py-1.5 text-sm hover:bg-gray-100"
                    onClick={() => handleOptionClick(option)}
                  >
                    <span>{option}</span>
                    {selected.includes(option) && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {multiple && selected.length > 0 && (
            <div className="border-t pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelect([])}
                className="w-full"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
