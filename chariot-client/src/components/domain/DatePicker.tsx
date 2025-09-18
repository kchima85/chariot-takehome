import { useState, useEffect, useMemo } from 'react'
import { Input } from '../ui/input'
import { cn } from '../../lib/utils'
import { debounce } from '../../utils'
import { validateDate, formatDateForInput } from '../../utils/dateUtils'

interface DatePickerProps {
  value: string // ISO date string
  onChange: (value: string) => void // ISO date string
  placeholder?: string
  format?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'
  disabled?: boolean
  error?: string
  label?: string
  debounceMs?: number
}

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'MM/DD/YYYY',
  format = 'MM/DD/YYYY',
  disabled = false,
  error,
  label,
  debounceMs = 500,
}: DatePickerProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [localError, setLocalError] = useState('')

  // Debounced onChange
  const debouncedOnChange = useMemo(
    () => debounce((value: unknown) => onChange(value as string), debounceMs),
    [onChange, debounceMs]
  )

  // Update local state when prop changes
  useEffect(() => {
    if (value) {
      setInputValue(formatDateForInput(value))
    } else {
      setInputValue('')
    }
    setLocalError('')
    setIsValid(true)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    // Validate
    const valid = validateDate(newValue)
    setIsValid(valid)

    if (valid) {
      setLocalError('')
      if (newValue.trim()) {
        try {
          const isoDateString = new Date(newValue).toISOString()
          debouncedOnChange(isoDateString)
        } catch {
          setLocalError('Invalid date')
          setIsValid(false)
        }
      } else {
        debouncedOnChange('')
      }
    } else {
      setLocalError(`Please enter a valid date (${format})`)
    }
  }

  const displayError = error || localError
  const hasError = !isValid || !!error

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'h-10 w-[225px]',
          hasError && 'border-red-500 focus:ring-red-500'
        )}
      />

      {/* Always reserve space for error message to prevent layout shift */}
      <div className="h-5">
        {displayError && <p className="text-sm text-red-500">{displayError}</p>}
      </div>
    </div>
  )
}
