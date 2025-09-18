import type { FC } from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Input } from '../ui/input'
import { cn } from '../../lib/utils'
import { debounce } from '../../utils'
import { validateDate, formatDateForInput } from '../../utils/dateUtils'

interface DateFilterProps {
  scheduledDate: string
  onScheduledDateChange: (date: string) => void
}

export const DateFilter: FC<DateFilterProps> = ({
  scheduledDate,
  onScheduledDateChange,
}) => {
  const [inputValue, setInputValue] = useState(scheduledDate)
  const [isValidDate, setIsValidDate] = useState(true)

  // Create debounced function
  const debouncedOnScheduledDateChange = useMemo(
    () =>
      debounce((value: unknown) => onScheduledDateChange(value as string), 500),
    [onScheduledDateChange]
  )

  // Update local state when prop changes
  useEffect(() => {
    if (scheduledDate) {
      // Convert ISO string back to MM/DD/YYYY format for display
      setInputValue(formatDateForInput(scheduledDate))
    } else {
      setInputValue('')
    }
  }, [scheduledDate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    const isValid = validateDate(value)
    setIsValidDate(isValid)

    // Only update the filter if the date is valid or empty
    if (isValid) {
      if (value.trim()) {
        const isoDateString = new Date(value).toISOString()
        debouncedOnScheduledDateChange(isoDateString)
      } else {
        debouncedOnScheduledDateChange('')
      }
    }
  }

  return (
    <div className="space-y-2">
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={cn(
          'h-10 w-[225px]',
          !isValidDate && 'border-red-500 ring-red-500'
        )}
        placeholder="Selected Date: MM/DD/YYYY"
      />
      {!isValidDate && (
        <p className="text-sm text-red-500">
          Please enter a valid date (MM/DD/YYYY)
        </p>
      )}
    </div>
  )
}
